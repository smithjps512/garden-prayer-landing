"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useDB,
  currentUser,
  openThread,
  sendMessage,
  markSold,
} from "@/lib/trailrider/store";

/**
 * Listing detail — the Buy story.
 *
 * "When I click on a listing it will bring you to a page, and message the
 * seller." Messaging is the piece both the Buy and Sell stories lean on, so it
 * is the centre of this page.
 */
export default function ListingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { db, update } = useDB();
  const [draft, setDraft] = useState(
    "Hi! Is this still available? I can meet up this week."
  );

  if (!db) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-sm text-zinc-500 sm:px-6">
        Loading{"…"}
      </main>
    );
  }

  const listing = db.listings.find((l) => l.id === params.id);
  if (!listing) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-white">Listing not found</h1>
        <p className="mt-2 text-zinc-400">
          It may have been removed, or it was posted in a different browser.
        </p>
        <Link
          href="/trailrider/store"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-zinc-950 hover:bg-emerald-400"
        >
          Back to the store
        </Link>
      </main>
    );
  }

  const user = currentUser(db);
  const isSeller = user?.id === listing.sellerId;

  function contactSeller() {
    if (!user) {
      router.push(`/trailrider/login?next=/trailrider/store/${listing!.id}`);
      return;
    }
    if (!draft.trim()) return;

    let threadId = "";
    update((current) => {
      const target = current.listings.find((l) => l.id === listing!.id);
      const me = current.users.find((u) => u.id === user.id);
      if (!target || !me) return current;
      const opened = openThread(current, target, me);
      threadId = opened.threadId;
      return sendMessage(opened.db, threadId, me, draft);
    });

    router.push(`/trailrider/messages?thread=${threadId}`);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/trailrider/store"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        {"←"} Back to the store
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <img
          src={listing.photo}
          alt={listing.title}
          className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
        />

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-white">
              {listing.title}
            </h1>
            <span className="shrink-0 text-2xl font-semibold tabular-nums text-emerald-400">
              ${listing.priceUsd}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-zinc-300">
              {listing.category}
            </span>
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-zinc-300">
              {listing.condition}
            </span>
            {listing.status === "sold" && (
              <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-rose-300">
                Sold
              </span>
            )}
          </div>

          {listing.description && (
            <p className="mt-5 leading-relaxed text-zinc-300">
              {listing.description}
            </p>
          )}

          <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Seller</dt>
              <dd className="text-zinc-200">{listing.sellerName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Email</dt>
              <dd className="text-zinc-200">
                {user ? listing.sellerEmail : "Log in to see"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Meet at</dt>
              <dd className="text-right text-zinc-200">{listing.meetupArea}</dd>
            </div>
          </dl>

          {isSeller ? (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-zinc-400">This is your listing.</p>
              {listing.status === "available" && (
                <button
                  onClick={() => update((c) => markSold(c, listing.id))}
                  className="mt-3 rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/5"
                >
                  Mark as sold
                </button>
              )}
            </div>
          ) : listing.status === "sold" ? (
            <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
              This one is gone. Check the store for something similar.
            </p>
          ) : (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-zinc-300">
                Message {listing.sellerName}
              </h2>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60"
              />
              <button
                onClick={contactSeller}
                className="mt-3 w-full rounded-lg bg-emerald-500 px-5 py-3 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
              >
                {user ? "Send message" : "Log in to message the seller"}
              </button>
            </div>
          )}

          <p className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200/90">
            <strong>Meeting up safely:</strong> pick a public place in daylight,
            bring someone with you, and tell an adult where you are going. Money
            changes hands in person — TrailRider never handles payments and
            cannot get your money back.
          </p>
        </div>
      </div>
    </main>
  );
}
