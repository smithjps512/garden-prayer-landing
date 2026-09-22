import type { Metadata } from "next";
import { CLUBS, CLUB_IDS } from "@/lib/clubs";
import { config, formatLongDate } from "@/lib/config";
import { adminKey, keyMatches, listSignups, type Signup } from "@/lib/db";
import { fmtET } from "@/lib/email";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

type Search = Record<string, string | string[] | undefined>;

export default async function AdminPage({ searchParams }: { searchParams: Search }) {
  const key = typeof searchParams.key === "string" ? searchParams.key : "";
  const expected = process.env.ADMIN_KEY ? adminKey() : "";
  if (!expected || !keyMatches(key, expected)) {
    return (
      <main className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold">Not authorized</h1>
        <p className="mt-2 text-slate-600">Open this page with the admin link.</p>
      </main>
    );
  }

  let rows: Signup[] = [];
  let loadError = "";
  try {
    rows = await listSignups(key, false);
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Could not load signups.";
  }
  const sent = typeof searchParams.sent === "string" ? searchParams.sent : "";
  const error = typeof searchParams.error === "string" ? searchParams.error : "";

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-slate-500">BMS Club Night</p>
          <h1 className="text-3xl font-bold">Signups</h1>
        </div>
        <div className="text-right text-sm text-slate-600">
          <div>Club night: <b>{config.clubNightDate ? formatLongDate(config.clubNightDate) : "not set"}</b></div>
          <div>Site closes: <b>{config.siteClosesAt ? formatLongDate(config.siteClosesAt) : "never"}</b>{config.isClosed ? " (closed)" : ""}</div>
          <div>Auto digest: <b>{config.clubNightDate ? "the morning after club night, then daily for new signups" : "off (set CLUB_NIGHT_DATE)"}</b></div>
        </div>
      </header>

      {sent && (
        <pre className="mt-4 overflow-auto rounded-xl bg-emerald-50 p-4 text-xs text-emerald-900">{sent}</pre>
      )}
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      {loadError && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">{loadError}</p>}

      {CLUB_IDS.map((id) => {
        const club = CLUBS[id];
        const list = rows.filter((r) => r.club === id);
        const unsent = list.filter((r) => !r.digest_sent_at).length;
        return (
          <section key={id} className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                {club.chapter} <span className="text-slate-400">· {list.length}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <a className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50" href={`/api/admin/csv?key=${encodeURIComponent(key)}&club=${id}`}>
                  Download CSV
                </a>
                <a className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50" href={`/api/admin/preview?key=${encodeURIComponent(key)}&club=${id}${unsent === 0 ? "&sample=1" : ""}`} target="_blank" rel="noopener">
                  Preview email
                </a>
                <form method="post" action="/api/digest">
                  <input type="hidden" name="key" value={key} />
                  <input type="hidden" name="club" value={id} />
                  <button
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
                    disabled={unsent === 0}
                    title={unsent === 0 ? "Nothing new to send" : `Email ${unsent} unsent signup(s) to ${club.advisorEmail}`}
                  >
                    Email {unsent} new to {club.advisorName}
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <Th>Submitted</Th><Th>Student</Th><Th>Grade</Th><Th>Student email</Th><Th>Parent / guardian</Th><Th>Interests</Th><Th>Comments</Th><Th>Emailed</Th>
                  </tr>
                </thead>
                <tbody>
                  {list.length === 0 && (
                    <tr><td colSpan={8} className="p-6 text-center text-slate-500">No signups yet.</td></tr>
                  )}
                  {list.map((r) => (
                    <tr key={r.id} className="border-t border-slate-100 align-top">
                      <Td className="whitespace-nowrap text-slate-500">{fmtET(r.created_at)}</Td>
                      <Td className="font-semibold">{r.student_first} {r.student_last}</Td>
                      <Td>{r.grade}</Td>
                      <Td>{r.student_email || "—"}</Td>
                      <Td>{r.parent_name}<br /><span className="text-slate-500">{r.parent_email}</span></Td>
                      <Td>{r.interests.join(", ") || "—"}</Td>
                      <Td className="max-w-xs">{r.comments || "—"}</Td>
                      <Td className="whitespace-nowrap">{r.digest_sent_at ? fmtET(r.digest_sent_at) : <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">not yet</span>}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-semibold text-slate-600">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
