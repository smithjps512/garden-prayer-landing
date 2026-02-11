"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ScrollReveal from "@/components/ScrollReveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function GameViewPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

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
                  Sports & Entertainment Technology
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-[0.95] mb-4"
              >
                Game View
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-cream/40 text-sm font-body mb-6"
              >
                Game View Sports & Entertainment Corporation
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-body text-lg text-cream/60 leading-relaxed"
              >
                A breakthrough 3D/4D video reconstruction platform that
                transforms how sports teams and entertainment venues create
                immersive fan experiences. Using Gaussian Splatting technology
                combined with multi-camera video processing, Game View converts
                standard video footage into navigable 3D environments.
              </motion.p>
            </div>

            {/* Hero video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* YOUTUBE VIDEO EMBED: Replace with Game View demo video URL */}
              <YouTubeEmbed
                placeholder="Game View Demo Video — Replace with YouTube video ID"
                title="Game View Demo"
              />
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
                Key Capabilities
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "2D-to-3D Conversion",
                description:
                  "Automated Gaussian Splatting technology converts standard 2D video footage into fully navigable 3D environments.",
                icon: "🔄",
              },
              {
                title: "Multi-Camera Processing",
                description:
                  "Volumetric content processing from multiple camera angles to create comprehensive 3D scene reconstructions.",
                icon: "📸",
              },
              {
                title: "Game View Studio",
                description:
                  "Proprietary software platform with AI assistant 'Spark' for streamlined 3D content creation and management.",
                icon: "🎬",
              },
              {
                title: "Object Extraction",
                description:
                  "Advanced object extraction and behavior training systems for creating interactive 3D assets.",
                icon: "🎯",
              },
              {
                title: "Sports & Entertainment",
                description:
                  "Built for major sports organizations (MLS, NFL-level) and entertainment companies (Live Nation-caliber).",
                icon: "🏟️",
              },
              {
                title: "Patent-Pending Technology",
                description:
                  "Protected innovations (GameView.302 and GameView.303) pushing the boundaries of 3D reconstruction.",
                icon: "📋",
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

      {/* ===== VIDEO GALLERY ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                See It In Action
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* YOUTUBE VIDEO EMBED: Replace with Game View video 1 URL */}
            <ScrollReveal delay={0}>
              <YouTubeEmbed
                placeholder="Game View Video 1 — Replace with YouTube video ID"
                title="Game View Demo 1"
              />
            </ScrollReveal>
            {/* YOUTUBE VIDEO EMBED: Replace with Game View video 2 URL */}
            <ScrollReveal delay={0.1}>
              <YouTubeEmbed
                placeholder="Game View Video 2 — Replace with YouTube video ID"
                title="Game View Demo 2"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SCREENSHOT GALLERY ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Platform Screenshots
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <ImagePlaceholder
                label="Game View Studio Interface — Replace with screenshot"
                gradient="from-blue-900/50 to-midnight-50"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ImagePlaceholder
                label="3D Reconstruction Output — Replace with screenshot"
                gradient="from-indigo-900/50 to-midnight-50"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== LEGACY CONNECTION ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,169,98,0.04),transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="accent-line mx-auto block mb-8" />
            <p className="font-body text-cream/50 text-lg leading-relaxed italic">
              Building on our pioneering work in live entertainment experiences
              (iGoHD), Game View represents the next evolution — from 2D
              streaming to fully immersive 3D reconstruction.
            </p>
            <Link
              href="/work/igohd"
              className="inline-flex items-center gap-2 mt-6 text-accent text-sm font-body font-semibold hover:text-accent-light transition-colors duration-300"
            >
              <span>Explore Our Legacy: iGoHD</span>
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
