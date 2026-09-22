import { Resend } from "resend";
import { CLUBS, type ClubId } from "./clubs";
import { config } from "./config";
import type { Signup } from "./db";

function esc(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function csvCell(v: string | null | undefined): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows: Signup[]): string {
  const header = [
    "Submitted (ET)",
    "Club",
    "Student first",
    "Student last",
    "Grade",
    "Student email",
    "Parent/guardian",
    "Parent email",
    "Interests",
    "Comments",
  ];
  const lines = rows.map((r) =>
    [
      fmtET(r.created_at),
      r.club.toUpperCase(),
      r.student_first,
      r.student_last,
      r.grade,
      r.student_email,
      r.parent_name,
      r.parent_email,
      r.interests.join("; "),
      r.comments,
    ]
      .map(csvCell)
      .join(","),
  );
  return [header.join(","), ...lines].join("\r\n");
}

export function fmtET(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function digestHtml(club: ClubId, rows: Signup[], isFollowUp: boolean): string {
  const c = CLUBS[club];
  const tr = rows
    .map(
      (r) => `<tr>
  <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;white-space:nowrap">${esc(r.student_first)} ${esc(r.student_last)}</td>
  <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">${esc(r.grade)}</td>
  <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb">${esc(r.student_email) || "—"}</td>
  <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb">${esc(r.parent_name)}<br><a href="mailto:${esc(r.parent_email)}" style="color:#004C97">${esc(r.parent_email)}</a></td>
  <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-size:13px">${esc(r.interests.join(", ")) || "—"}${r.comments ? `<div style="margin-top:4px;color:#4b5563;font-style:italic">“${esc(r.comments)}”</div>` : ""}</td>
</tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111827">
<div style="max-width:860px;margin:0 auto;padding:24px">
  <div style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)">
    <div style="padding:22px 26px;background:${club === "tsa" ? "#005DAA" : "#004C97"};color:#fff">
      <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.85">Blacksburg Middle School · Club Night</div>
      <h1 style="margin:6px 0 0;font-size:22px">${esc(c.chapter)} — ${rows.length} ${isFollowUp ? "new " : ""}signup${rows.length === 1 ? "" : "s"}</h1>
    </div>
    <div style="padding:22px 26px">
      <p style="margin:0 0 14px;line-height:1.5">Hi ${esc(c.advisorName)},<br>
      ${isFollowUp
        ? `Here ${rows.length === 1 ? "is a signup that" : "are signups that"} came in since the last digest.`
        : `Here is everyone who signed up for ${esc(c.short)} through the Club Night page.`}
      A CSV of the same list is attached.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <thead><tr style="background:#f9fafb;text-align:left">
          <th style="padding:8px 10px;border-bottom:2px solid #e5e7eb">Student</th>
          <th style="padding:8px 10px;border-bottom:2px solid #e5e7eb;text-align:center">Grade</th>
          <th style="padding:8px 10px;border-bottom:2px solid #e5e7eb">Student email</th>
          <th style="padding:8px 10px;border-bottom:2px solid #e5e7eb">Parent / guardian</th>
          <th style="padding:8px 10px;border-bottom:2px solid #e5e7eb">Interests &amp; comments</th>
        </tr></thead>
        <tbody>${tr}</tbody>
      </table>
      <p style="margin:18px 0 0;font-size:12px;color:#6b7280">Sent automatically by the BMS Club Night signup page. Reply to this email if anything looks off.</p>
    </div>
  </div>
</div></body></html>`;
}

export interface DigestResult {
  club: ClubId;
  count: number;
  to: string;
  emailId?: string;
}

export async function sendDigest(club: ClubId, rows: Signup[], isFollowUp: boolean): Promise<DigestResult> {
  const c = CLUBS[club];
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  const resend = new Resend(apiKey);
  const dateTag = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
  const { data, error } = await resend.emails.send({
    from: config.emailFrom,
    to: [c.advisorEmail],
    cc: config.digestCc.filter((e) => e.toLowerCase() !== c.advisorEmail.toLowerCase()),
    subject: `${c.short} Club Night signups — ${rows.length} ${isFollowUp ? "new " : ""}student${rows.length === 1 ? "" : "s"} (${dateTag})`,
    html: digestHtml(club, rows, isFollowUp),
    attachments: [
      {
        filename: `bms-${club}-signups-${new Date().toISOString().slice(0, 10)}.csv`,
        content: Buffer.from(toCsv(rows), "utf8").toString("base64"),
      },
    ],
  });
  if (error) throw new Error(error.message);
  return { club, count: rows.length, to: c.advisorEmail, emailId: data?.id };
}
