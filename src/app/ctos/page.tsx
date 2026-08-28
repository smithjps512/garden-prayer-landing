import Link from "next/link";
import { TOPICS } from "@/lib/ctos/topics";
import { BANDS } from "@/lib/ctos/grading";

export default function CtosHome() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
        CTOS
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] tracking-tight text-white sm:text-6xl">
        Read about it. Then find out if you actually know it.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
        Encyclopedia is the reading half of the CTOS app. Every topic can carry
        a quiz, and every quiz can be played two ways — like a test, or like a
        game.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/ctos/encyclopedia"
          className="rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-400"
        >
          Start reading
        </Link>
        <Link
          href="/ctos/quiz/new"
          className="rounded-lg border border-white/15 px-5 py-3 font-medium text-slate-200 transition-colors hover:bg-white/5"
        >
          Create a quiz
        </Link>
      </div>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg text-white">Traditional</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Every question on one page. Take as long as you like, change your
            mind, submit when you are ready. Like a test.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg text-white">Gamified</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            One question at a time against a 20-second clock. Answer fast for
            more points, and keep a streak going for more still.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          How scores are graded
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-500">
                <th className="pb-2 pr-4 font-medium">Score</th>
                <th className="pb-2 pr-4 font-medium">Grade</th>
                <th className="pb-2 pr-4 font-medium">Label</th>
                <th className="pb-2 font-medium">What to do</th>
              </tr>
            </thead>
            <tbody>
              {BANDS.map((band) => (
                <tr
                  key={`${band.grade}-${band.min}`}
                  className="border-b border-white/5"
                >
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    {band.min}{"–"}{band.max}
                  </td>
                  <td className="py-2.5 pr-4 font-semibold text-white">
                    {band.grade}
                  </td>
                  <td className="py-2.5 pr-4 text-slate-300">{band.label}</td>
                  <td className="py-2.5 text-slate-500">{band.advice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-600">
          This scale is the CTOS team{"'"}s own, from their quiz user story.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {TOPICS.length} topics to read
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/ctos/topics/${topic.slug}`}
                className="inline-block rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-indigo-400/50 hover:bg-white/5"
              >
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
