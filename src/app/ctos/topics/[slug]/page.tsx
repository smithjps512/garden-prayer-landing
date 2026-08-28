import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOPICS, topicBySlug } from "@/lib/ctos/topics";
import TopicIllustration from "@/components/ctos/TopicIllustration";
import TopicQuizzes from "@/components/ctos/TopicQuizzes";

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const topic = topicBySlug(params.slug);
  if (!topic) return { title: "Topic not found — CTOS" };
  return { title: `${topic.title} — CTOS`, description: topic.summary };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = topicBySlug(params.slug);
  if (!topic) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
      <TopicIllustration
        hue={topic.hue}
        className="mt-6 h-32 w-full rounded-2xl sm:h-40"
      />

      <Link
        href="/ctos/encyclopedia"
        className="mt-6 inline-block text-sm text-slate-500 transition-colors hover:text-slate-300"
      >
        {"←"} Encyclopedia
      </Link>

      <h1 className="mt-3 text-3xl leading-tight tracking-tight text-white sm:text-5xl">
        {topic.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-400">
        {topic.summary}
      </p>

      <article className="mt-8 space-y-5">
        {topic.body.map((paragraph, i) => (
          <p key={i} className="text-[17px] leading-[1.75] text-slate-300">
            {paragraph}
          </p>
        ))}
      </article>

      <section className="mt-10 border-t border-white/10 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Sources
        </h2>
        <ul className="mt-3 space-y-1.5">
          {topic.sources.map((source) => (
            <li key={source.name} className="text-sm text-slate-400">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-indigo-400 underline-offset-4 hover:underline"
                >
                  {source.name}
                </a>
              ) : (
                source.name
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Quiz yourself
          </h2>
          <Link
            href={`/ctos/quiz/new?topic=${topic.slug}`}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            + Make a quiz on this topic
          </Link>
        </div>
        <TopicQuizzes topicSlug={topic.slug} />
      </section>
    </main>
  );
}
