"use client";

import Link from "next/link";
import { useState } from "react";
import { useDB, publicQuizzes, deleteQuiz } from "@/lib/ctos/store";
import { topicBySlug } from "@/lib/ctos/topics";
import { bandFor, percentFor } from "@/lib/ctos/grading";

/**
 * Everything public, plus this browser's own private quizzes so the person who
 * made one can still find it. Someone else's private quiz never appears here —
 * it needs its link.
 */
export default function QuizzesPage() {
  const { db, update } = useDB();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (!db) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-sm text-slate-500 sm:px-6">
        Loading{"…"}
      </main>
    );
  }

  const listed = publicQuizzes(db);
  const mine = db.quizzes.filter((q) => q.visibility === "private");
  const recent = db.attempts.slice(0, 5);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-white">Quizzes</h1>
          <p className="mt-2 text-slate-400">
            Play one, or build your own from the Create tab.
          </p>
        </div>
        <Link
          href="/ctos/quiz/new"
          className="rounded-lg bg-indigo-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-400"
        >
          + Create a quiz
        </Link>
      </div>

      {recent.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your recent scores
          </h2>
          <ul className="mt-3 space-y-2">
            {recent.map((attempt) => {
              const percent = percentFor(attempt.correct, attempt.total);
              const band = bandFor(percent);
              return (
                <li
                  key={attempt.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-white">
                      {attempt.quizTitle}
                    </span>
                    <span className="text-xs text-slate-500">
                      {attempt.mode === "gamified" ? "Gamified" : "Traditional"}{" "}
                      {"·"} {attempt.correct}/{attempt.total}
                      {attempt.mode === "gamified" &&
                        ` · ${attempt.points} pts`}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${band.tone}`}
                  >
                    {percent}% {band.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Public
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {listed.map((quiz) => {
            const topic = quiz.topicSlug ? topicBySlug(quiz.topicSlug) : null;
            return (
              <li key={quiz.id}>
                <Link
                  href={`/ctos/quiz/${quiz.id}`}
                  className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.06]"
                >
                  <span className="block font-medium text-white">
                    {quiz.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    {quiz.questions.length} question
                    {quiz.questions.length === 1 ? "" : "s"} {"·"}{" "}
                    {quiz.authorName}
                  </span>
                  {topic && (
                    <span className="mt-3 inline-block rounded-full border border-white/15 px-2.5 py-1 text-xs text-slate-400">
                      {topic.title}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {listed.length === 0 && (
          <p className="mt-3 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
            No public quizzes yet.
          </p>
        )}
      </section>

      {mine.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Private {"—"} yours, link only
          </h2>
          <ul className="mt-3 space-y-2">
            {mine.map((quiz) => (
              <li
                key={quiz.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <Link href={`/ctos/quiz/${quiz.id}`} className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white">
                    {quiz.title}
                  </span>
                  <span className="text-xs text-slate-500">
                    {quiz.questions.length} question
                    {quiz.questions.length === 1 ? "" : "s"}
                  </span>
                </Link>
                {confirmId === quiz.id ? (
                  <span className="flex shrink-0 gap-2">
                    <button
                      onClick={() => {
                        update((db2) => deleteQuiz(db2, quiz.id));
                        setConfirmId(null);
                      }}
                      className="rounded-lg border border-rose-400/40 px-2.5 py-1.5 text-xs text-rose-300 hover:bg-rose-400/10"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-slate-400 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    onClick={() => setConfirmId(quiz.id)}
                    className="shrink-0 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
