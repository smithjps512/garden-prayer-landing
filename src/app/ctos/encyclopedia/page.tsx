import Link from "next/link";
import type { Metadata } from "next";
import { TOPICS } from "@/lib/ctos/topics";
import TopicIllustration from "@/components/ctos/TopicIllustration";

export const metadata: Metadata = {
  title: "Encyclopedia — CTOS",
  description: "Topics to read, each with its sources.",
};

export default function EncyclopediaPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl tracking-tight text-white sm:text-4xl">
        Encyclopedia
      </h1>
      <p className="mt-2 max-w-2xl text-slate-400">
        Read a topic, then take its quiz — or build your own.
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {TOPICS.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/ctos/topics/${topic.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-indigo-400/40 hover:bg-white/[0.06]"
            >
              <TopicIllustration hue={topic.hue} className="h-28 w-full" />
              <div className="p-5">
                <h2 className="text-lg leading-snug text-white">
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {topic.summary}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-indigo-400">
                  Read {"→"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
