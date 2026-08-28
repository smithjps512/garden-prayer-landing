import type { Metadata } from "next";
import CtosNav from "@/components/ctos/CtosNav";

const TITLE = "CTOS — read a topic, then quiz yourself on it";
const DESCRIPTION =
  "A student-built prototype: an encyclopedia you can read, and quizzes you can build and play two ways.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "CTOS",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function CtosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 font-body text-slate-100">
      <CtosNav />
      <div className="border-b border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-center text-xs text-indigo-200/90">
        Prototype {"·"} quizzes you build are saved in this browser only.
      </div>
      {children}
    </div>
  );
}
