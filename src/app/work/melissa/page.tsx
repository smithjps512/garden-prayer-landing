"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function MelissaPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
                <span className="text-[11px] font-body text-cream/40 tracking-wider uppercase">
                  Education Technology / AI
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-[0.95] mb-6"
              >
                Melissa for
                <br />
                <span className="gradient-text">Educators</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-body text-lg text-cream/60 leading-relaxed mb-8"
              >
                An AI-powered K-12 teaching platform that gives teachers their
                time back. Named after a school administrator who inspires the
                mission daily, Melissa generates lesson plans, worksheets,
                assignments, and materials in minutes — with AI guardrails built
                in for academic integrity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <a
                  href="https://melissaforeducators.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit melissaforeducators.ai
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image
                  src="/images/MelissaForEducatorsScreenShot.jpg"
                  alt="Melissa for Educators Platform Screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Key Features
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Generation",
                description:
                  "Generate lesson plans, worksheets, and assignments in minutes using advanced AI — saving teachers hours every week.",
                icon: "✨",
              },
              {
                title: "Complete Workflow",
                description:
                  "Full teacher-to-student assignment delivery workflow — from creation to distribution to submission.",
                icon: "📋",
              },
              {
                title: "COPPA Compliant",
                description:
                  "Built-in COPPA-compliant student data handling — protecting children's privacy by design.",
                icon: "🛡️",
              },
              {
                title: "Academic Integrity",
                description:
                  "Three-Zone Framework for creating assignments with clear AI policies — guardrails that work.",
                icon: "✅",
              },
              {
                title: "Modern Tech Stack",
                description:
                  "Built with Next.js 14, Supabase, and Claude API for a fast, reliable, and intelligent experience.",
                icon: "⚡",
              },
              {
                title: "Teacher-First Design",
                description:
                  "Every feature designed from the perspective of a real educator — intuitive, fast, and focused on what matters.",
                icon: "❤️",
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="glass-card p-8 h-full">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-display text-lg font-bold text-cream mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-cream/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION CONNECTION ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.04),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-10 md:p-14 text-center">
              <span className="accent-line mx-auto block mb-8" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-6">
                Born From a Family of Educators
              </h2>
              <div className="space-y-4 text-cream/50 font-body leading-relaxed max-w-2xl mx-auto">
                <p>
                  Melissa was born from a Texas family of educators who believe
                  in the transformative power of teaching. Rooted in the
                  philosophy:{" "}
                  <span className="text-accent italic">
                    &ldquo;Stop banning what you should be teaching.&rdquo;
                  </span>
                </p>
                <p>
                  Technology that amplifies teachers, not replaces them. Every
                  feature is designed to give educators more time for what
                  matters most — connecting with students.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://melissaforeducators.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Try Melissa
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <Link href="/work/domain-u" className="btn-outline">
                  See the Origin Story: Domain-U
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
