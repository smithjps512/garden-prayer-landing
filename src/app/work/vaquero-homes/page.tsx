"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function VaqueroHomesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />

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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Launching Soon
                </span>
                <span className="text-[11px] font-body text-cream/40 tracking-wider uppercase">
                  Construction Technology
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-[0.95] mb-6"
              >
                Vaquero
                <br />
                <span className="gradient-text">Homes</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-body text-lg text-cream/60 leading-relaxed"
              >
                A Texas-based construction platform designed to modernize how
                homes are built, managed, and delivered. Bringing technology
                innovation to the homebuilding industry.
              </motion.p>
            </div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* IMAGE PLACEHOLDER: Replace with Vaquero Homes hero image/screenshot */}
              <ImagePlaceholder
                label="Vaquero Homes Platform — Replace with screenshot"
                gradient="from-amber-900/50 to-midnight-50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES PREVIEW ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                What&apos;s Coming
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Modern Project Management",
                description:
                  "Streamlined tools for managing construction projects from planning through delivery.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                ),
              },
              {
                title: "Texas-Built Solutions",
                description:
                  "Designed specifically for the Texas homebuilding market and its unique requirements.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                ),
              },
              {
                title: "Digital Transformation",
                description:
                  "Bringing construction into the digital age with smart tools and automation.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
              {
                title: "Quality Delivery",
                description:
                  "Technology-enabled quality control and delivery management for better homebuying experiences.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="glass-card p-8 h-full flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-body text-cream/50 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMING SOON CTA ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="glass-card p-10 md:p-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-300 text-xs font-body font-semibold tracking-wider uppercase">
                  Launching Soon
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-4">
                Stay Tuned
              </h2>
              <p className="text-cream/50 font-body mb-8 max-w-md mx-auto">
                Vaquero Homes is preparing for launch. Check back soon for more
                details on how we&apos;re modernizing Texas homebuilding.
              </p>
              <a
                href="mailto:hello@gardenprayerpublishing.com"
                className="btn-outline"
              >
                Get Notified
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
