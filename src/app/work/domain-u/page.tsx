"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function DomainUPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-left"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-cream/40 text-sm font-body hover:text-accent transition-colors duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Our Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Where It Started
            </span>
            <span className="text-[11px] font-body text-cream/40 tracking-wider uppercase">
              2017–2019
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[0.95] mb-4"
          >
            Domain-U
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-cream/30 text-sm font-body mb-6"
          >
            Valley Technical Academy → Domain Learning → Domain-U → Lumineo
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-lg text-cream/50 max-w-3xl mx-auto leading-relaxed"
          >
            What began as a coding academy in Mission, Texas teaching coding in
            economically disadvantaged communities evolved into a comprehensive
            enterprise learning management system. By teaching hands-on in a
            real-world manner, students advanced their skills in 12 weeks past
            what higher education accomplished in 2–4 years.
          </motion.p>
        </div>
      </section>

      {/* ===== THE JOURNEY ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                The Journey
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />

            {[
              {
                title: "Valley Technical Academy",
                description:
                  "A coding academy in Mission, Texas — the Rio Grande Valley — teaching programming to students in economically disadvantaged communities. Hands-on, real-world instruction that proved students could advance past 2-4 years of higher education in just 12 weeks.",
                side: "left",
              },
              {
                title: "Domain Learning",
                description:
                  "The discovery that this teaching approach could scale led to building technology around it. Domain Learning was born — a platform to bring immersive, hands-on education to the world.",
                side: "right",
              },
              {
                title: "Domain-U",
                description:
                  "A full enterprise learning management system with proprietary virtual studio technology, episodic learning tracks, and adaptive AI. Designed for mid-to-large employers for onboarding, training, advancement, and retention.",
                side: "left",
              },
              {
                title: "Lumineo",
                description:
                  "The final evolution — a polished enterprise platform carrying forward everything learned. Patent-pending technology that recreated the classroom experience online.",
                side: "right",
              },
            ].map((milestone, i) => (
              <ScrollReveal key={milestone.title} delay={i * 0.15}>
                <div
                  className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                    milestone.side === "right"
                      ? "md:flex-row-reverse md:text-right"
                      : ""
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-4 border-midnight -translate-x-1/2 mt-2 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      milestone.side === "right"
                        ? "md:mr-[calc(50%+2rem)]"
                        : "md:ml-[calc(50%+2rem)]"
                    }`}
                  >
                    <h3 className="font-display text-xl font-bold text-cream mb-2">
                      {milestone.title}
                    </h3>
                    <p className="font-body text-cream/50 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEY INNOVATIONS ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.04),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Key Innovations
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Proprietary LMS",
                description:
                  "Recreated the classroom experience online — users could see the instructor, their screen, and participate in hands-on activities simultaneously through a single interface.",
                icon: "🖥️",
              },
              {
                title: "Virtual Studio Technology",
                description:
                  "Proprietary tech that could create any classroom environment or animation in seconds, switching scenes and sets instantly. All virtual environments created on the same stage in one studio, saving thousands in production costs.",
                icon: "🎬",
              },
              {
                title: "Episodic Learning Tracks",
                description:
                  "Courses organized in sequential episodes, allowing users to learn in the intended order — like binge-watching a show, but for professional development.",
                icon: "📺",
              },
              {
                title: "Adaptive AI",
                description:
                  "Platform automatically detected device type and adapted the experience — mobile, classroom, or multi-screen — meeting learners wherever they are.",
                icon: "🤖",
              },
            ].map((innovation, i) => (
              <ScrollReveal key={innovation.title} delay={i * 0.1}>
                <div className="glass-card p-8 h-full">
                  <span className="text-3xl mb-4 block">
                    {innovation.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold text-cream mb-3">
                    {innovation.title}
                  </h3>
                  <p className="font-body text-cream/50 text-sm leading-relaxed">
                    {innovation.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-10 md:p-14 text-center">
              <span className="accent-line mx-auto block mb-8" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-6">
                &ldquo;Weapons of Mass Instruction&rdquo;
              </h2>
              <div className="space-y-4 text-cream/50 font-body leading-relaxed max-w-2xl mx-auto">
                <p>
                  Originating in the Rio Grande Valley, Domain-U pioneered
                  making expert training accessible anywhere. From economically
                  disadvantaged communities in South Texas to enterprise
                  organizations nationwide.
                </p>
                <p>
                  Patent-pending learning management technology that proved a
                  hands-on, real-world approach could accelerate learning beyond
                  anything traditional education offered.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== LEGACY CONNECTION ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,169,98,0.04),transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <blockquote className="font-display text-xl md:text-2xl text-cream/50 italic leading-relaxed mb-8">
              &ldquo;The mission that started in Mission, Texas lives on.
              Domain-U&apos;s vision of accessible, immersive education directly
              inspired Melissa for Educators — now powered by AI to reach every
              teacher and student.&rdquo;
            </blockquote>

            <Link href="/work/melissa" className="btn-primary">
              See the Mission Continue: Melissa
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
