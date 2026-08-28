"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  useDB,
  recordAttempt,
  QUESTION_SECONDS,
  scoreAnswer,
} from "@/lib/ctos/store";
import { bandFor, percentFor } from "@/lib/ctos/grading";
import { topicBySlug } from "@/lib/ctos/topics";
import type { PlayMode, Quiz } from "@/lib/ctos/types";

type Stage = "choose" | "traditional" | "gamified" | "result";

type Outcome = {
  mode: PlayMode;
  correct: number;
  total: number;
  points: number;
  bestStreak: number;
};

function QuizPage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const { db } = useDB();

  if (!db) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-sm text-slate-500 sm:px-6">
        Loading{"…"}
      </main>
    );
  }

  const quiz = db.quizzes.find((q) => q.id === params.id) ?? null;

  if (!quiz) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl text-white">Quiz not found</h1>
        <p className="mt-2 text-slate-400">
          Quizzes are saved in the browser they were made in, so a link from
          someone else{"'"}s device will not find one here.
        </p>
        <Link
          href="/ctos/quizzes"
          className="mt-6 inline-block rounded-lg bg-indigo-500 px-5 py-2.5 font-medium text-white hover:bg-indigo-400"
        >
          See all quizzes
        </Link>
      </main>
    );
  }

  return <QuizRunner quiz={quiz} justCreated={search.get("created") === "1"} />;
}

function QuizRunner({
  quiz,
  justCreated,
}: {
  quiz: Quiz;
  justCreated: boolean;
}) {
  const { update } = useDB();
  const [stage, setStage] = useState<Stage>("choose");
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const topic = quiz.topicSlug ? topicBySlug(quiz.topicSlug) : null;

  const finish = useCallback(
    (result: Outcome) => {
      setOutcome(result);
      setStage("result");
      update((db) =>
        recordAttempt(db, {
          quiz,
          mode: result.mode,
          correct: result.correct,
          points: result.points,
          bestStreak: result.bestStreak,
        })
      );
    },
    [quiz, update]
  );

  function restart() {
    setOutcome(null);
    setStage("choose");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {stage === "choose" && (
        <>
          {justCreated && (
            <p className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              Your quiz is ready. Now choose how to play it.
            </p>
          )}

          <Link
            href={topic ? `/ctos/topics/${topic.slug}` : "/ctos/quizzes"}
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            {"←"} {topic ? topic.title : "All quizzes"}
          </Link>

          <h1 className="mt-3 text-3xl tracking-tight text-white sm:text-4xl">
            {quiz.title}
          </h1>
          <p className="mt-2 text-slate-400">
            {quiz.questions.length} question
            {quiz.questions.length === 1 ? "" : "s"} {"·"} by {quiz.authorName}{" "}
            {"·"}{" "}
            {quiz.visibility === "private" ? "Private — link only" : "Public"}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setStage("traditional")}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-colors hover:border-indigo-400/50 hover:bg-white/[0.06]"
            >
              <span className="block text-lg font-semibold text-white">
                Traditional
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-400">
                All the questions at once, no clock. Change your answers as much
                as you like, then submit.
              </span>
            </button>

            <button
              onClick={() => setStage("gamified")}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-colors hover:border-indigo-400/50 hover:bg-white/[0.06]"
            >
              <span className="block text-lg font-semibold text-white">
                Gamified
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-400">
                One question at a time, {QUESTION_SECONDS} seconds each. Faster
                answers and longer streaks score more.
              </span>
            </button>
          </div>

          <ShareBox quiz={quiz} />
        </>
      )}

      {stage === "traditional" && (
        <TraditionalPlay quiz={quiz} onDone={finish} />
      )}
      {stage === "gamified" && <GamifiedPlay quiz={quiz} onDone={finish} />}
      {stage === "result" && outcome && (
        <Result quiz={quiz} outcome={outcome} onRestart={restart} />
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Traditional — like a test                                           */
/* ------------------------------------------------------------------ */

function TraditionalPlay({
  quiz,
  onDone,
}: {
  quiz: Quiz;
  onDone: (o: Outcome) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const answered = Object.keys(answers).length;

  function submit() {
    const correct = quiz.questions.filter(
      (q) => q.correctChoiceId && answers[q.id] === q.correctChoiceId
    ).length;
    onDone({
      mode: "traditional",
      correct,
      total: quiz.questions.length,
      points: 0,
      bestStreak: 0,
    });
  }

  return (
    <>
      <h1 className="text-2xl tracking-tight text-white sm:text-3xl">
        {quiz.title}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Traditional {"·"} {answered} of {quiz.questions.length} answered
      </p>

      <ol className="mt-8 space-y-5">
        {quiz.questions.map((question, i) => (
          <li
            key={question.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="font-medium text-white">
              {i + 1}. {question.prompt}
            </p>
            <div className="mt-3 space-y-2">
              {question.choices.map((choice) => (
                <label
                  key={choice.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                    answers[question.id] === choice.id
                      ? "border-indigo-400/50 bg-indigo-400/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === choice.id}
                    onChange={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: choice.id,
                      }))
                    }
                    className="h-4 w-4 accent-indigo-400"
                  />
                  <span className="text-slate-200">{choice.text}</span>
                </label>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <button
        onClick={submit}
        className="mt-8 w-full rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-400"
      >
        Submit answers
      </button>
      {answered < quiz.questions.length && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Unanswered questions count as wrong.
        </p>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Gamified — like Blooket, Gimkit or Kahoot                           */
/* ------------------------------------------------------------------ */

function GamifiedPlay({
  quiz,
  onDone,
}: {
  quiz: Quiz;
  onDone: (o: Outcome) => void;
}) {
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const tally = useRef({ correct: 0, points: 0, streak: 0, bestStreak: 0 });
  const question = quiz.questions[index];

  const advance = useCallback(() => {
    if (index + 1 >= quiz.questions.length) {
      onDone({
        mode: "gamified",
        correct: tally.current.correct,
        total: quiz.questions.length,
        points: tally.current.points,
        bestStreak: tally.current.bestStreak,
      });
      return;
    }
    setIndex((i) => i + 1);
    setSecondsLeft(QUESTION_SECONDS);
    setPicked(null);
    setRevealed(false);
  }, [index, quiz.questions.length, onDone]);

  const settle = useCallback(
    (choiceId: string | null, remaining: number) => {
      if (revealed) return;
      const right = !!choiceId && choiceId === question.correctChoiceId;

      if (right) {
        tally.current.correct += 1;
        tally.current.streak += 1;
        tally.current.bestStreak = Math.max(
          tally.current.bestStreak,
          tally.current.streak
        );
        tally.current.points += scoreAnswer(remaining, tally.current.streak);
      } else {
        tally.current.streak = 0;
      }

      setPicked(choiceId);
      setRevealed(true);
    },
    [question, revealed]
  );

  // The clock. Runs only while the question is still open.
  useEffect(() => {
    if (revealed) return;
    if (secondsLeft <= 0) {
      settle(null, 0);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, revealed, settle]);

  // Short pause on the reveal before moving on.
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(advance, 1400);
    return () => clearTimeout(timer);
  }, [revealed, advance]);

  const urgent = secondsLeft <= 5 && !revealed;

  return (
    <>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          Question {index + 1} of {quiz.questions.length}
        </span>
        <span className="flex items-center gap-3">
          {tally.current.streak > 1 && (
            <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-xs font-medium text-amber-300">
              {tally.current.streak} streak
            </span>
          )}
          <span className="tabular-nums font-semibold text-white">
            {tally.current.points} pts
          </span>
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full transition-[width] duration-1000 ease-linear ${
            urgent ? "bg-rose-400" : "bg-indigo-400"
          }`}
          style={{ width: `${(secondsLeft / QUESTION_SECONDS) * 100}%` }}
        />
      </div>
      <p
        className={`mt-1.5 text-right text-xs tabular-nums ${
          urgent ? "text-rose-300" : "text-slate-500"
        }`}
      >
        {secondsLeft}s
      </p>

      <h1 className="mt-6 text-2xl leading-snug text-white sm:text-3xl">
        {question.prompt}
      </h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.choices.map((choice) => {
          const isCorrect = choice.id === question.correctChoiceId;
          const isPicked = choice.id === picked;

          let tone =
            "border-white/10 bg-white/[0.04] hover:border-indigo-400/50 hover:bg-white/[0.08]";
          if (revealed) {
            if (isCorrect)
              tone = "border-emerald-400/60 bg-emerald-400/15 text-emerald-100";
            else if (isPicked)
              tone = "border-rose-400/60 bg-rose-400/15 text-rose-100";
            else tone = "border-white/10 bg-white/[0.02] text-slate-500";
          }

          return (
            <button
              key={choice.id}
              onClick={() => settle(choice.id, secondsLeft)}
              disabled={revealed}
              className={`rounded-2xl border p-4 text-left text-[15px] leading-snug transition-colors ${tone}`}
            >
              {choice.text}
            </button>
          );
        })}
      </div>

      {revealed && (
        <p className="mt-5 text-center text-sm font-medium text-slate-400">
          {picked === question.correctChoiceId
            ? "Correct"
            : picked === null
            ? "Out of time"
            : "Not quite"}
        </p>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Result                                                              */
/* ------------------------------------------------------------------ */

function Result({
  quiz,
  outcome,
  onRestart,
}: {
  quiz: Quiz;
  outcome: Outcome;
  onRestart: () => void;
}) {
  const percent = percentFor(outcome.correct, outcome.total);
  const band = bandFor(percent);
  const topic = quiz.topicSlug ? topicBySlug(quiz.topicSlug) : null;

  return (
    <div className="py-6">
      <p className="text-center text-sm text-slate-500">
        {quiz.title} {"·"}{" "}
        {outcome.mode === "gamified" ? "Gamified" : "Traditional"}
      </p>

      <div
        className={`mx-auto mt-6 max-w-md rounded-3xl border p-8 text-center ${band.tone}`}
      >
        <p className="text-6xl font-semibold tabular-nums">{percent}%</p>
        <p className="mt-2 text-2xl font-semibold">
          {band.grade} {"·"} {band.label}
        </p>
        <p className="mt-1 text-sm opacity-80">{band.advice}</p>
      </div>

      <dl className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-center">
        <div className="bg-slate-950 px-3 py-4">
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Correct
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums text-white">
            {outcome.correct}/{outcome.total}
          </dd>
        </div>
        <div className="bg-slate-950 px-3 py-4">
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Points
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums text-white">
            {outcome.mode === "gamified" ? outcome.points : "—"}
          </dd>
        </div>
        <div className="bg-slate-950 px-3 py-4">
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Best streak
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums text-white">
            {outcome.mode === "gamified" ? outcome.bestStreak : "—"}
          </dd>
        </div>
      </dl>

      <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">
        <button
          onClick={onRestart}
          className="rounded-lg bg-indigo-500 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-400"
        >
          Play again
        </button>
        {topic && (
          <Link
            href={`/ctos/topics/${topic.slug}`}
            className="rounded-lg border border-white/15 px-5 py-2.5 font-medium text-slate-200 transition-colors hover:bg-white/5"
          >
            Re-read the topic
          </Link>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ShareBox({ quiz }: { quiz: Quiz }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/ctos/quiz/${quiz.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm font-medium text-slate-300">
        {quiz.visibility === "private"
          ? "Private quiz — only people with this link can find it"
          : "Share this quiz"}
      </p>
      <button
        onClick={copy}
        className="mt-3 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/5"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        In the prototype quizzes live in the browser that made them, so the link
        works on this device. A real version would keep quizzes on a server and
        check who is allowed to open a private one.
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <QuizPage />
    </Suspense>
  );
}
