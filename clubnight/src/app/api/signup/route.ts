import { NextResponse } from "next/server";
import { CLUBS, isClubId } from "@/lib/clubs";
import { config } from "@/lib/config";
import { insertSignup } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  if (config.isClosed) {
    return NextResponse.json({ error: "Signups for Club Night have closed." }, { status: 410 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without storing them.
  if (str(body.website, 10)) return NextResponse.json({ ok: true });

  const club = body.club;
  if (!isClubId(club)) return NextResponse.json({ error: "Unknown club." }, { status: 400 });

  const student_first = str(body.student_first, 80);
  const student_last = str(body.student_last, 80);
  const grade = str(body.grade, 2);
  const student_email = str(body.student_email, 160);
  const parent_name = str(body.parent_name, 120);
  const parent_email = str(body.parent_email, 160);
  const comments = str(body.comments, 1000);
  const consent = body.consent === true;

  const allowed = new Set(CLUBS[club].interests);
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((i): i is string => typeof i === "string" && allowed.has(i))
    : [];

  if (!student_first || !student_last) return NextResponse.json({ error: "Please enter the student's first and last name." }, { status: 400 });
  if (!["6", "7", "8"].includes(grade)) return NextResponse.json({ error: "Please pick a grade." }, { status: 400 });
  if (student_email && !EMAIL_RE.test(student_email)) return NextResponse.json({ error: "That student email doesn't look right." }, { status: 400 });
  if (!parent_name) return NextResponse.json({ error: "Please enter a parent or guardian name." }, { status: 400 });
  if (!EMAIL_RE.test(parent_email)) return NextResponse.json({ error: "Please enter a valid parent or guardian email." }, { status: 400 });
  if (!consent) return NextResponse.json({ error: "Please check the box confirming a parent or guardian knows you're signing up." }, { status: 400 });

  try {
    await insertSignup({
      club,
      student_first,
      student_last,
      grade,
      student_email: student_email || null,
      parent_name,
      parent_email,
      interests,
      comments: comments || null,
    });
  } catch (err) {
    console.error("signup insert failed", err);
    return NextResponse.json({ error: "We couldn't save your signup. Please try again in a moment." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
