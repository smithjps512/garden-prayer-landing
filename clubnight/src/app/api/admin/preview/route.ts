import { NextResponse } from "next/server";
import { isClubId } from "@/lib/clubs";
import { adminKey, keyMatches, listSignups, type Signup } from "@/lib/db";
import { digestHtml } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAMPLE: Signup[] = [
  {
    id: "sample-1",
    created_at: new Date().toISOString(),
    club: "tsa",
    student_first: "Sample",
    student_last: "Student",
    grade: "7",
    student_email: "sample@mcps.org",
    parent_name: "Sample Parent",
    parent_email: "parent@example.com",
    interests: ["Spring competitions", "Hands-on building & design"],
    comments: "This is what a comment looks like.",
    digest_sent_at: null,
  },
  {
    id: "sample-2",
    created_at: new Date().toISOString(),
    club: "tsa",
    student_first: "Another",
    student_last: "Example",
    grade: "8",
    student_email: null,
    parent_name: "Second Parent",
    parent_email: "second@example.com",
    interests: [],
    comments: null,
    digest_sent_at: null,
  },
];

/** Shows the digest email exactly as the advisor will receive it. Add &sample=1 to preview with fake data. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (!keyMatches(key, adminKey())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const club = url.searchParams.get("club");
  if (!isClubId(club)) return NextResponse.json({ error: "club must be tsa or ffa" }, { status: 400 });
  const rows = url.searchParams.get("sample")
    ? SAMPLE.map((r) => ({ ...r, club }))
    : (await listSignups(key!, true)).filter((r) => r.club === club);
  return new NextResponse(digestHtml(club, rows, false), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
