"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function UnrealEnginePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />

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
                  3D Visualization / Game Engine
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-[0.95] mb-6"
              >
                Unreal Engine
                <br />
                <span className="gradient-text">Project</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-body text-lg text-cream/60 leading-relaxed"
              >
                A standalone project leveraging Unreal Engine 5 for advanced 3D
                visualization and immersive environment rendering. Pushing the
                boundaries of real-time 3D rendering to create photorealistic
                environments and experiences.
              </motion.p>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image
                  src="/images/UnrealEngineHero.png"
                  alt="Unreal Engine Project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Technical Capabilities
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Photorealistic Rendering",
                description:
                  "Leveraging Unreal Engine 5's Lumen and Nanite for cinematic-quality real-time rendering.",
                icon: "🎨",
              },
              {
                title: "Immersive Environments",
                description:
                  "Creating fully navigable 3D worlds with dynamic lighting, physics, and atmospheric effects.",
                icon: "🌍",
              },
              {
                title: "Real-Time Performance",
                description:
                  "Optimized for real-time interaction at high frame rates, enabling live walkthroughs and demonstrations.",
                icon: "⚡",
              },
              {
                title: "Advanced Materials",
                description:
                  "Physically-based material systems for accurate surface rendering and environmental detail.",
                icon: "💎",
              },
              {
                title: "Scalable Architecture",
                description:
                  "Built with modular systems that scale from small interactive demos to large-scale environments.",
                icon: "📐",
              },
              {
                title: "Cross-Platform Ready",
                description:
                  "Designed for deployment across multiple platforms — from desktop to VR to web streaming.",
                icon: "🔗",
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

      {/* ===== VISUALS ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Project Visuals
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          {/* Screenshot */}
          <ScrollReveal>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image
                src="/images/UnrealEngineProjectScreenShot.PNG"
                alt="Unreal Engine Project Screenshot"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
