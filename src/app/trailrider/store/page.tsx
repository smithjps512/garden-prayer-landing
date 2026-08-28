"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDB, currentUser } from "@/lib/trailrider/store";
import type { ListingCategory } from "@/lib/trailrider/types";

const CATEGORIES: Array<ListingCategory | "All"> = [
  "All",
  "Complete bike",
  "Frame",
  "Wheels & tires",
  "Helmet",
  "Gloves & apparel",
  "Components",
  "Other",
];

function timeAgo(ts: number) {
  const hours = Math.floor((Date.now() - ts) / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Store browse — the first step of the Buy story: "Click on a listing". */
export default function StorePage() {
  const { db } = useDB();
  const [category, setCategory] = useState<ListingCategory | "All">("All");
  const [showSold, setShowSold] = useState(false);

  const user = db ? currentUser(db) : null;

  const listings = useMemo(() => {
    if (!db) return [];
    return db.listings
      .filter((l) => category === "All" || l.category === category)
      .filter((l) => showSold || l.status === "available")
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [db, category, showSold]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Store</h1>
          <p className="mt-2 text-zinc-400">
            Gear from riders in your area. Message the seller, then meet up and
            pay in person.
          </p>
        </div>
        <Link
          href={user ? "/trailrider/store/new" : "/trailrider/login?next=/trailrider/store/new"}
          className="rounded-lg bg-emerald-500 px-4 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
        >
          + Add listing
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((option) => (
          <button
            key={option}
            onClick={() => setCategory(option)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              category === option
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={showSold}
            onChange={(e) => setShowSold(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Show sold
        </label>
      </div>

      {!db ? (
        <p className="mt-10 text-sm text-zinc-500">Loading listings{"…"}</p>
      ) : listings.length === 0 ? (
        <p className="mt-10 rounded-xl border border-white/10 p-8 text-center text-sm text-zinc-500">
          Nothing listed in that category yet.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <li key={listing.id}>
              <Link
                href={`/trailrider/store/${listing.id}`}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-emerald-500/40 hover:bg-white/[0.06]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={listing.photo}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {listing.status === "sold" && (
                    <span className="absolute left-3 top-3 rounded-full bg-zinc-950/90 px-2.5 py-1 text-xs font-medium text-zinc-300">
                      Sold
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-medium leading-snug text-white">
                      {listing.title}
                    </h2>
                    <span className="shrink-0 font-semibold tabular-nums text-emerald-400">
                      ${listing.priceUsd}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-zinc-500">
                    {listing.condition} {"·"} {listing.sellerName} {"·"}{" "}
                    {timeAgo(listing.createdAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
