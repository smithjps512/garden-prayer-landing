import { NextResponse } from "next/server";
import { adminKey, keyMatches, listSignups } from "@/lib/db";
import { toCsv } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (!keyMatches(key, adminKey())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const club = url.searchParams.get("club");
  const rows = (await listSignups(key!, false)).filter((r) => !club || r.club === club);
  const name = `bms-club-night-${club || "all"}-signups-${new Date().toISOString().slice(0, 10)}.csv`;
  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}
