"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Circle,
  useMap,
} from "react-leaflet";
import type { Trail } from "@/lib/trailrider/types";
import { DIFFICULTY } from "./DifficultyBadge";

/** Below this width there is no room for ten labels at once. */
const WIDE_ENOUGH_FOR_LABELS = 520;

/**
 * Leaflet's default marker images break under bundlers, so every pin is a
 * divIcon we draw ourselves. That also lets us colour pins by difficulty.
 */
function pinFor(trail: Trail, selected: boolean) {
  const color = DIFFICULTY[trail.difficulty].dot;
  const size = selected ? 30 : 22;
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;width:${size}px;height:${size}px;border-radius:9999px;
      background:${color};border:3px solid rgba(9,9,11,.85);
      box-shadow:0 0 0 ${selected ? 6 : 0}px ${color}33, 0 2px 6px rgba(0,0,0,.5);
      transition:all .15s ease;"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/**
 * Keeps the viewport useful: framed around whatever trails are showing, and
 * flown in on a trail once the rider picks one.
 */
function ViewController({
  center,
  zoom,
  bounds,
  boundsKey,
}: {
  center: [number, number] | null;
  zoom: number;
  bounds: [[number, number], [number, number]] | null;
  boundsKey: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 0.6 });
  }, [center, zoom, map]);

  // Re-frame whenever the visible set of trails changes and nothing is picked.
  useEffect(() => {
    if (!center && bounds) map.fitBounds(bounds, { padding: [60, 60] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundsKey, map]);

  return null;
}

/**
 * The pins and their labels.
 *
 * The map user story asks for the length to appear over the trail name, which
 * works nicely on a laptop. On a phone ten permanent labels cover the map and
 * run off the edge, so there labels belong to whichever trail you tapped —
 * and the list under the map still shows every name and length.
 */
function TrailMarkers({
  trails,
  selectedSlug,
  onSelect,
}: {
  trails: Trail[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const map = useMap();
  const [wide, setWide] = useState(true);
  const [centerLng, setCenterLng] = useState(() => map.getCenter().lng);

  useEffect(() => {
    const sync = () => {
      setWide(map.getSize().x >= WIDE_ENOUGH_FOR_LABELS);
      setCenterLng(map.getCenter().lng);
    };
    sync();
    map.on("resize moveend zoomend", sync);
    return () => {
      map.off("resize moveend zoomend", sync);
    };
  }, [map]);

  return (
    <>
      {trails.map((trail) => {
        const isSelected = trail.slug === selectedSlug;
        const alwaysOn = wide || isSelected;
        // Labels on the eastern half point inward so they stay on the map.
        const east = trail.lng > centerLng;

        return (
          <Marker
            key={trail.id}
            position={[trail.lat, trail.lng]}
            icon={pinFor(trail, isSelected)}
            eventHandlers={{ click: () => onSelect(trail.slug) }}
          >
            <Tooltip
              key={`${trail.id}-${alwaysOn}-${east}`}
              direction={east ? "left" : "right"}
              offset={east ? [-14, 0] : [14, 0]}
              permanent={alwaysOn}
              opacity={1}
            >
              <span className="font-medium">{trail.name}</span>
              <span className="text-zinc-500">
                {" "}
                {"·"} {trail.lengthMiles} mi
              </span>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

export default function TrailMap({
  trails,
  selectedSlug,
  onSelect,
  userLocation,
}: {
  trails: Trail[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  userLocation: { lat: number; lng: number } | null;
}) {
  const selected = trails.find((t) => t.slug === selectedSlug) ?? null;
  const focus: [number, number] | null = selected
    ? [selected.lat, selected.lng]
    : userLocation
    ? [userLocation.lat, userLocation.lng]
    : null;

  const bounds: [[number, number], [number, number]] | null =
    trails.length > 0
      ? [
          [
            Math.min(...trails.map((t) => t.lat)),
            Math.min(...trails.map((t) => t.lng)),
          ],
          [
            Math.max(...trails.map((t) => t.lat)),
            Math.max(...trails.map((t) => t.lng)),
          ],
        ]
      : null;

  return (
    <MapContainer
      center={[36.3766, -94.2088]}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full bg-zinc-900"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ViewController
        center={focus}
        zoom={selected ? 14 : 12}
        bounds={bounds}
        boundsKey={trails.map((t) => t.id).join(",")}
      />

      {userLocation && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={400}
          pathOptions={{ color: "#38bdf8", fillColor: "#38bdf8", fillOpacity: 0.15 }}
        />
      )}

      <TrailMarkers
        trails={trails}
        selectedSlug={selectedSlug}
        onSelect={onSelect}
      />
    </MapContainer>
  );
}
