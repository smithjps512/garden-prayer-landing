import { NextResponse } from "next/server";
import { CLUB_IDS, type ClubId } from "@/lib/clubs";
import { config } from "@/lib/config";
import { adminKey, keyMatches, listSignups, markSent } from "@/lib/db";
import { sendDigest, type DigestResult } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sends each advisor the signups that have not been emailed yet.
 * - GET  (Vercel cron, daily): only sends once today is after CLUB_NIGHT_DATE.
 * - POST (admin "Send now" button): sends immediately, regardless of date.
 * Signups that arrive after the first digest go out in a follow-up the next day.
 */
async function runDigest(force: boolean, clubFilter?: ClubId) {
  const key = adminKey();
  if (!force && !config.digestDue) {
    return { skipped: true, reason: config.clubNightDate ? "Club night has not happened yet." : "CLUB_NIGHT_DATE is not set." };
  }
  const unsent = await listSignups(key, true);
  const all = await listSignups(key, false);
  const results: DigestResult[] = [];
  for (const club of CLUB_IDS) {
    if (clubFilter && club !== clubFilter) continue;
    const rows = unsent.filter((r) => r.club === club);
    if (rows.length === 0) continue;
    const isFollowUp = all.some((r) => r.club === club && r.digest_sent_at);
    const result = await sendDigest(club, rows, isFollowUp);
    await markSent(key, rows.map((r) => r.id));
    results.push(result);
  }
  return { skipped: false, sent: results };
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET;
  if (!secret || !keyMatches(auth.replace(/^Bearer\s+/i, ""), secret)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await runDigest(false));
  } catch (err) {
    console.error("digest failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "digest failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const provided = form?.get("key");
  if (typeof provided !== "string" || !keyMatches(provided, adminKey())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const clubRaw = form?.get("club");
  const club = clubRaw === "tsa" || clubRaw === "ffa" ? clubRaw : undefined;
  try {
    const result = await runDigest(true, club);
    const url = new URL("/admin", req.url);
    url.searchParams.set("key", provided);
    url.searchParams.set("sent", JSON.stringify(result));
    return NextResponse.redirect(url, 303);
  } catch (err) {
    console.error("digest failed", err);
    const url = new URL("/admin", req.url);
    url.searchParams.set("key", provided);
    url.searchParams.set("error", err instanceof Error ? err.message : "digest failed");
    return NextResponse.redirect(url, 303);
  }
}
