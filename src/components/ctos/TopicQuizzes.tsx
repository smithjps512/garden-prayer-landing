"use client";

import Link from "next/link";
import { useDB, quizzesForTopic } from "@/lib/ctos/store";

/** The quizzes attached to one topic. Private quizzes never appear here. */
export default function TopicQuizzes({ topicSlug }: { topicSlug: string }) {
  const { db } = useDB();

  if (!db) {
    return <p className="text-sm text-slate-600">Loading quizzes{"…"}</p>;
  }

  const quizzes = quizzesForTopic(db, topicSlug);

  if (quizzes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 p-6 text-center">
        <p className="text-sm text-slate-400">
          No quiz on this topic yet.
        </p>
        <Link
          href={`/ctos/quiz/new?topic=${topicSlug}`}
          className="mt-4 inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
        >
          Be the first to make one
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {quizzes.map((quiz) => (
        <li key={quiz.id}>
          <Link
            href={`/ctos/quiz/${quiz.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.06]"
          >
            <span>
              <span className="block font-medium text-white">{quiz.title}</span>
              <span className="mt-0.5 block text-sm text-slate-500">
                {quiz.questions.length} question
                {quiz.questions.length === 1 ? "" : "s"} {"·"} by{" "}
                {quiz.authorName}
              </span>
            </span>
            <span className="shrink-0 text-sm font-medium text-indigo-400">
              Play {"→"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
