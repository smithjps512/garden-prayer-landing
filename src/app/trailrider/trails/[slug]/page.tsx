import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TRAILS } from "@/lib/trailrider/seed";
import DifficultyBadge from "@/components/trailrider/DifficultyBadge";

export function generateStaticParams() {
  return TRAILS.map((trail) => ({ slug: trail.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const trail = TRAILS.find((t) => t.slug === params.slug);
  if (!trail) return { title: "Trail not found — TrailRider" };
  return {
    title: `${trail.name} — TrailRider`,
    description: trail.summary,
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-zinc-700">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

/**
 * Trail detail — the second scenario in the map user story: clicking a trail
 * shows its difficulty, its reviews, and what it improves.
 */
export default function TrailDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const trail = TRAILS.find((t) => t.slug === params.slug);
  if (!trail) notFound();

  const averageRating =
    trail.reviews.length > 0
      ? trail.reviews.reduce((sum, r) => sum + r.rating, 0) / trail.reviews.length
      : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/trailrider/map"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        {"←"} Back to the map
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {trail.name}
        </h1>
        <DifficultyBadge difficulty={trail.difficulty} />
      </div>
      <p className="mt-2 text-zinc-500">{trail.area}</p>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
        {[
          { label: "Length", value: `${trail.lengthMiles} mi` },
          { label: "Climbing", value: `${trail.elevationGainFt} ft` },
          {
            label: "Rating",
            value: averageRating ? `${averageRating.toFixed(1)} / 5` : "—",
          },
          { label: "Reviews", value: trail.reviews.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-950 px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">
              {stat.label}
            </dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums text-white">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-lg leading-relaxed text-zinc-300">{trail.summary}</p>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          What this trail improves
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {trail.improves.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Rider reviews
        </h2>
        <ul className="mt-4 space-y-3">
          {trail.reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-white">{review.author}</span>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {review.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-zinc-600">
          Riders cannot post their own reviews yet — nobody wrote a user story for
          that. It is the natural next one to write.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
        <Link
          href="/trailrider/coach"
          className="rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
        >
          Ask the coach how to train for this
        </Link>
        <Link
          href="/trailrider/store"
          className="rounded-lg border border-white/15 px-5 py-2.5 font-medium text-zinc-200 transition-colors hover:bg-white/5"
        >
          Find gear
        </Link>
      </div>
    </main>
  );
}
