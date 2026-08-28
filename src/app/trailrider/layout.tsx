import type { Metadata } from "next";
import TrailRiderNav from "@/components/trailrider/TrailRiderNav";

export const metadata: Metadata = {
  title: "TrailRider — trails, gear and coaching for mountain bikers",
  description:
    "A student-built prototype: find trails near you, buy and sell gear, and get training advice.",
};

export default function TrailRiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="trailrider-app min-h-screen bg-zinc-950 font-body text-zinc-100">
      <TrailRiderNav />
      <div className="border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-200/90">
        Prototype {"·"} accounts and listings are stored in this browser only, and
        the coach is a demo, not a doctor.
      </div>
      {children}
    </div>
  );
}
