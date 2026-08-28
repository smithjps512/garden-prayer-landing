import Link from "next/link";
import { TRAILS } from "@/lib/trailrider/seed";

const features = [
  {
    href: "/trailrider/map",
    title: "Trails near you",
    body: "See every trail on a map with its length, difficulty, reviews and what it builds — legs, core, cornering.",
    cta: "Open the map",
  },
  {
    href: "/trailrider/store",
    title: "Buy and sell gear",
    body: "List a bike or a helmet with a photo, message the seller, and meet up in person. No fees, no shipping.",
    cta: "Browse the store",
  },
  {
    href: "/trailrider/coach",
    title: "Health & training coach",
    body: "Ask about training plans, fueling and recovery. Five questions every 48 hours, so the answers stay worth asking for.",
    cta: "Ask the coach",
  },
];

export default function TrailRiderHome() {
  const totalMiles = TRAILS.reduce((sum, t) => sum + t.lengthMiles, 0);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          chicken.nugg
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
          Every trail, every part, every ride{" "}
          <span className="text-emerald-400">in one place.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          TrailRider is built for mountain bikers, road bikers and hikers. Find a
          trail that fits you, pick up gear from someone in your area, and get
          straight answers about training.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/trailrider/map"
            className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            Find trails near me
          </Link>
          <Link
            href="/trailrider/login"
            className="rounded-lg border border-white/15 px-5 py-3 font-medium text-zinc-200 transition-colors hover:bg-white/5"
          >
            Create an account
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            { label: "Trails mapped", value: TRAILS.length },
            { label: "Miles of singletrack", value: totalMiles.toFixed(1) },
            { label: "Riding areas", value: new Set(TRAILS.map((t) => t.area)).size },
            { label: "Coach questions / 48h", value: 5 },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-zinc-500">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/40 hover:bg-white/[0.06]"
            >
              <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.body}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-emerald-400">
                {feature.cta} {"→"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
