import type { Metadata } from "next";
import TrailRiderNav from "@/components/trailrider/TrailRiderNav";

const TITLE = "TrailRider — trails, gear and coaching for mountain bikers";
const DESCRIPTION =
  "A student-built prototype: find trails near you, buy and sell gear, and get training advice.";

/**
 * The root layout's Open Graph tags describe Garden Prayer, which is wrong for
 * a link a student texts to a friend. These override them under /trailrider.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "TrailRider",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
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
