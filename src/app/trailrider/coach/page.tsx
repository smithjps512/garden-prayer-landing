"use client";

import { useEffect, useRef, useState } from "react";
import AuthGate from "@/components/trailrider/AuthGate";
import {
  useDB,
  availability,
  coachStateFor,
  recordCoachExchange,
  resetCoach,
  QUESTION_LIMIT,
  WINDOW_MS,
} from "@/lib/trailrider/store";
import type { DB, User } from "@/lib/trailrider/types";

const SUGGESTIONS = [
  "What should I eat before a long ride?",
  "How do I get stronger at climbing?",
  "Build me a training week",
  "My knees hurt after riding — what do I check?",
  "How do I corner faster on descents?",
];

function countdown(ms: number) {
  const totalMinutes = Math.max(0, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours >= 1) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * The Health & Training Coach — Drew's user story.
 *
 * The rate limit is the interesting part and comes straight from the story:
 * five questions, then the coach stops answering, then 48 hours later you get
 * five more and the process starts over.
 *
 * Note that the limit is enforced here in the browser, which is fine for a
 * prototype and not fine for a real product — anyone could clear their storage
 * and get five more. Real limits are counted on the server, against the
 * account, where the user cannot reach them.
 */
function Coach({ user, db }: { user: User; db: DB }) {
  const { update } = useDB();
  const state = coachStateFor(db, user.id);

  const [now, setNow] = useState(() => Date.now());
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keeps the "unlocks in" countdown honest without a refresh.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages.length, thinking]);

  const avail = availability(state, now);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking || avail.locked) return;

    setError(null);
    setThinking(true);
    setQuestion("");

    try {
      const response = await fetch("/api/trailrider/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "The coach is unavailable.");

      update((current) =>
        recordCoachExchange(current, user.id, trimmed, data.answer)
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setQuestion(trimmed);
    } finally {
      setThinking(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Health &amp; training coach
          </h1>
          <p className="mt-2 text-zinc-400">
            Training, fueling, recovery and technique — ask anything.
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            {Array.from({ length: QUESTION_LIMIT }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${
                  i < avail.used ? "bg-zinc-700" : "bg-emerald-500"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            {avail.remaining} of {QUESTION_LIMIT} questions left
          </p>
        </div>
      </div>

      {avail.locked && avail.unlocksAt && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="font-medium text-amber-200">
            You have used all {QUESTION_LIMIT} questions
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-amber-200/80">
            The coach opens back up in{" "}
            <strong className="tabular-nums">
              {countdown(avail.unlocksAt - now)}
            </strong>
            , and you will have {QUESTION_LIMIT} more. In the meantime, everything
            it already told you is still below.
          </p>
        </div>
      )}

      <div className="mt-6 min-h-[280px] space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        {state.messages.length === 0 && !thinking && (
          <div className="py-8 text-center">
            <p className="text-zinc-500">Ask your first question.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-emerald-500/40 hover:bg-white/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-emerald-500 text-zinc-950"
                  : "border border-white/10 bg-white/[0.04] text-zinc-200"
              }`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {message.body}
              </p>
            </div>
          </div>
        ))}

        {thinking && (
          <p className="text-sm text-zinc-500">The coach is thinking{"…"}</p>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") ask(question);
          }}
          disabled={avail.locked || thinking}
          placeholder={
            avail.locked ? "Come back when the timer runs out" : "Ask the coach…"
          }
          className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-3 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60 disabled:opacity-50"
        />
        <button
          onClick={() => ask(question)}
          disabled={avail.locked || thinking || !question.trim()}
          className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-zinc-950 transition-colors hover:bg-emerald-400 disabled:opacity-40"
        >
          Ask
        </button>
      </div>

      <details className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <summary className="cursor-pointer text-sm font-medium text-zinc-400">
          Demo controls
        </summary>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          For showing the 48-hour rule without waiting two days.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() =>
              update((current) => {
                const s = coachStateFor(current, user.id);
                if (s.windowStartedAt === null) return current;
                return {
                  ...current,
                  coach: {
                    ...current.coach,
                    // Rewind the window so it reads as expired.
                    [user.id]: { ...s, windowStartedAt: Date.now() - WINDOW_MS - 1000 },
                  },
                };
              })
            }
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/5"
          >
            Skip ahead 48 hours
          </button>
          <button
            onClick={() => update((current) => resetCoach(current, user.id))}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/5"
          >
            Clear this conversation
          </button>
        </div>
      </details>

      <p className="mt-6 text-xs leading-relaxed text-zinc-600">
        The coach answers from a set of written responses rather than a real AI
        model, so the prototype costs nothing to run. Swapping in a real model
        means changing one file:{" "}
        <code className="text-zinc-500">src/app/api/trailrider/coach/route.ts</code>.
      </p>
    </main>
  );
}

export default function CoachPage() {
  return (
    <AuthGate title="Health & training coach">
      {({ user, db }) => <Coach user={user} db={db} />}
    </AuthGate>
  );
}
