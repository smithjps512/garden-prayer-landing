"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TRAILS } from "@/lib/trailrider/seed";
import type { Difficulty } from "@/lib/trailrider/types";
import DifficultyBadge, {
  DIFFICULTY,
} from "@/components/trailrider/DifficultyBadge";

/** Leaflet touches window on import, so the map only loads in the browser. */
const TrailMap = dynamic(() => import("@/components/trailrider/TrailMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-zinc-900 text-sm text-zinc-500">
      Loading map{"…"}
    </div>
  ),
});

/** Great-circle distance in miles. */
function milesBetween(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const FILTERS: Array<{ value: Difficulty | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "green", label: "Easy" },
  { value: "blue", label: "Intermediate" },
  { value: "black", label: "Advanced" },
  { value: "double-black", label: "Expert" },
];

export default function MapPage() {
  const [filter, setFilter] = useState<Difficulty | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationState, setLocationState] = useState<
    "idle" | "asking" | "denied" | "unsupported"
  >("idle");

  /**
   * Acceptance criterion #1 of the map story: "Allow app to track your
   * location." The browser asks permission; if the rider says no, the map
   * still works, it just cannot sort by distance.
   */
  function findNearMe() {
    if (!("geolocation" in navigator)) {
      setLocationState("unsupported");
      return;
    }
    setLocationState("asking");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationState("idle");
      },
      () => setLocationState("denied"),
      { timeout: 10000 }
    );
  }

  const trails = useMemo(() => {
    const list = TRAILS.filter(
      (t) => filter === "all" || t.difficulty === filter
    ).map((t) => ({
      ...t,
      milesAway: location ? milesBetween(location, t) : null,
    }));

    return location
      ? list.sort((a, b) => (a.milesAway ?? 0) - (b.milesAway ?? 0))
      : list;
  }, [filter, location]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Trails near you
          </h1>
          <p className="mt-2 text-zinc-400">
            {location
              ? "Sorted by how far each trail is from you."
              : "Share your location to sort these by distance."}
          </p>
        </div>
        <button
          onClick={findNearMe}
          disabled={locationState === "asking"}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 disabled:opacity-50"
        >
          {locationState === "asking"
            ? "Locating…"
            : location
            ? "Update my location"
            : "Find trails near me"}
        </button>
      </div>

      {locationState === "denied" && (
        <p className="mt-4 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-200/90">
          Location is turned off, so trails are listed in their default order.
          You can still browse and open any of them.
        </p>
      )}
      {locationState === "unsupported" && (
        <p className="mt-4 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-200/90">
          This browser does not support location sharing.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              filter === option.value
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {option.value !== "all" && (
              <span aria-hidden="true" className="mr-1.5">
                {DIFFICULTY[option.value].shape}
              </span>
            )}
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="h-[420px] overflow-hidden rounded-2xl border border-white/10 lg:h-[600px]">
          <TrailMap
            trails={trails}
            selectedSlug={selected}
            onSelect={setSelected}
            userLocation={location}
          />
        </div>

        <ul className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
          {trails.map((trail) => (
            <li key={trail.id}>
              {/*
                The card selects the trail on the map; the link inside opens
                its detail page. A link cannot live inside a button, so the
                card is a div with keyboard handling of its own.
              */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelected(trail.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(trail.slug);
                  }
                }}
                className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-colors ${
                  selected === trail.slug
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-medium text-white">{trail.name}</h2>
                  <DifficultyBadge difficulty={trail.difficulty} />
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  {trail.area} {"·"} {trail.lengthMiles} mi {"·"}{" "}
                  {trail.elevationGainFt} ft gain
                  {trail.milesAway !== null && (
                    <span className="text-sky-400">
                      {" "}
                      {"·"} {trail.milesAway.toFixed(1)} mi away
                    </span>
                  )}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                  {trail.summary}
                </p>
                <Link
                  href={`/trailrider/trails/${trail.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Difficulty, reviews and what it improves {"→"}
                </Link>
              </div>
            </li>
          ))}
          {trails.length === 0 && (
            <li className="rounded-xl border border-white/10 p-6 text-center text-sm text-zinc-500">
              No trails at that difficulty yet.
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
