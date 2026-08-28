"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AuthGate from "@/components/trailrider/AuthGate";
import {
  useDB,
  sendMessage,
  threadsForUser,
  messagesInThread,
} from "@/lib/trailrider/store";
import type { DB, User } from "@/lib/trailrider/types";

function clock(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Messaging. Nobody wrote a user story for this one, but both the Buy and the
 * Sell story depend on it — "message the seller", "I receive a message and
 * coordinate with buyer" — so the prototype needs it.
 */
function Messages({ user, db }: { user: User; db: DB }) {
  const searchParams = useSearchParams();
  const { update } = useDB();
  const threads = threadsForUser(db, user.id).sort(
    (a, b) => b.createdAt - a.createdAt
  );

  const requested = searchParams.get("thread");
  const [activeId, setActiveId] = useState<string | null>(
    requested ?? threads[0]?.id ?? null
  );
  const [draft, setDraft] = useState("");

  const active = threads.find((t) => t.id === activeId) ?? null;
  const messages = active ? messagesInThread(db, active.id) : [];
  const otherName = active
    ? active.buyerId === user.id
      ? active.sellerName
      : active.buyerName
    : "";
  const otherIsDemoSeller = active
    ? !db.users.some((u) => u.id === (active.buyerId === user.id ? active.sellerId : active.buyerId))
    : false;

  function send() {
    if (!active || !draft.trim()) return;
    const body = draft;
    setDraft("");
    update((current) => {
      const me = current.users.find((u) => u.id === user.id);
      if (!me) return current;
      return sendMessage(current, active.id, me, body);
    });
  }

  if (threads.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-white">No messages yet</h1>
        <p className="mt-3 leading-relaxed text-zinc-400">
          When you message a seller about a listing, the conversation shows up
          here.
        </p>
        <Link
          href="/trailrider/store"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
        >
          Browse the store
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-white">Messages</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-[280px_1fr]">
        <ul className="space-y-2">
          {threads.map((thread) => {
            const them =
              thread.buyerId === user.id ? thread.sellerName : thread.buyerName;
            const last = messagesInThread(db, thread.id).slice(-1)[0];
            return (
              <li key={thread.id}>
                <button
                  onClick={() => setActiveId(thread.id)}
                  className={`w-full rounded-xl border p-3 text-left transition-colors ${
                    activeId === thread.id
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <p className="truncate text-sm font-medium text-white">
                    {thread.listingTitle}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    with {them}
                    {last ? ` · ${last.body}` : ""}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>

        {active && (
          <section className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-white/[0.02]">
            <header className="border-b border-white/10 px-4 py-3">
              <Link
                href={`/trailrider/store/${active.listingId}`}
                className="font-medium text-white hover:text-emerald-400"
              >
                {active.listingTitle}
              </Link>
              <p className="text-xs text-zinc-500">
                {active.buyerId === user.id
                  ? `You are buying from ${otherName}`
                  : `${active.buyerName} wants to buy this`}
              </p>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => {
                const mine = message.fromUserId === user.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2 ${
                        mine
                          ? "bg-emerald-500 text-zinc-950"
                          : "bg-white/10 text-zinc-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.body}</p>
                      <p
                        className={`mt-1 text-[11px] ${
                          mine ? "text-emerald-900/70" : "text-zinc-500"
                        }`}
                      >
                        {message.fromName} {"·"} {clock(message.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {otherIsDemoSeller && (
                <p className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-zinc-500">
                  {otherName} is a sample seller, so no reply is coming. To see
                  both sides of a conversation, log out, sign up a second
                  account, post a listing from it, then message that listing
                  from your first account.
                </p>
              )}
            </div>

            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type a message…"
                className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60"
              />
              <button
                onClick={send}
                className="rounded-lg bg-emerald-500 px-4 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
              >
                Send
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={null}>
      <AuthGate title="Messages">
        {({ user, db }) => <Messages user={user} db={db} />}
      </AuthGate>
    </Suspense>
  );
}
