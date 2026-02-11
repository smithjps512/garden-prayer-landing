"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function IGoHDPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto">
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

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Pioneering Work
              </span>
              <span className="text-[11px] font-body text-cream/40 tracking-wider uppercase">
                ~2013
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[0.95] mb-6"
            >
              iGoHD
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg md:text-xl text-cream/50 max-w-3xl mx-auto leading-relaxed"
            >
              A pioneering live HD interactive streaming platform that gave fans
              around the world an all-access pass to exclusive concerts and
              events. Integrated social sharing, live commerce, and branded
              experiences — years before these became industry standards.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== CASE STUDY: BSB20 ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.04),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-body font-semibold tracking-[0.15em] uppercase mb-6">
                Case Study
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream">
                Backstreet Boys
                <br />
                <span className="gradient-text">
                  20th Anniversary Celebration
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* The Story */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <ScrollReveal>
              <div className="glass-card p-8 h-full">
                <span className="text-accent font-display text-sm font-semibold tracking-wider uppercase mb-4 block">
                  The Setup
                </span>
                <p className="text-cream/60 font-body text-sm leading-relaxed">
                  Announced April 16th — just 4 days before show. Social media
                  only. Zero ad dollars spent. BSB&apos;s social reach: 8.7 million
                  fans. #BSB20 became the event hashtag.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 h-full">
                <span className="text-accent font-display text-sm font-semibold tracking-wider uppercase mb-4 block">
                  The Experience
                </span>
                <p className="text-cream/60 font-body text-sm leading-relaxed">
                  Live HD streaming from the Fonda Theatre in Hollywood. Full
                  branded page with large streaming video, real-time social feed,
                  live chat, and exclusive merchandise shopping. Compatible
                  across all major devices.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8 h-full">
                <span className="text-accent font-display text-sm font-semibold tracking-wider uppercase mb-4 block">
                  The Engagement
                </span>
                <p className="text-cream/60 font-body text-sm leading-relaxed">
                  #BSB20 trended worldwide. Over 2,000 fans chatting live at
                  peak. Fans from around the globe sharing photos of themselves
                  watching. Attendees at the venue invited friends at home to
                  watch along.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <ScrollReveal>
            <div className="glass-card p-10 md:p-14">
              <h3 className="text-center font-display text-2xl font-bold text-cream mb-10">
                By the Numbers
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                <StatCounter end={99} label="Countries Tuned In" />
                <StatCounter end={60000} suffix="+" label="Page Visits" />
                <StatCounter end={2000} suffix="+" label="Fans Chatting Live" />
                <StatCounter end={4000} suffix="+" label="#BSB20 Instagrams" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mt-8">
                <StatCounter end={10000} suffix="+" label="#BSB20 Tweets" />
                <StatCounter
                  end={10000}
                  suffix="+"
                  label="#BSB20 Facebook Shares"
                />
                <div className="col-span-2 md:col-span-1 text-center">
                  <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                    Millions
                  </div>
                  <div className="font-body text-sm text-cream/50 tracking-wide uppercase">
                    Social Footprint Reach
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRESS ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                Press Coverage
              </h3>
              <p className="text-cream/40 text-sm font-body">
                Featured across major entertainment outlets
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                "Los Angeles Magazine",
                "TMZ",
                "Perez Hilton",
                "Entertainment Weekly",
                "Reuters",
                "AOL Music Blog",
              ].map((outlet) => (
                <div
                  key={outlet}
                  className="px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <span className="font-body text-sm text-cream/40 font-medium">
                    {outlet}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== INNOVATIONS ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.04),transparent_70%)]" />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Interactive Live HD Streaming",
                description:
                  "High-definition live streaming with real-time social integration — a first in the industry.",
                icon: "📺",
              },
              {
                title: "Built-In Commerce",
                description:
                  "Merchandise and ticket sales directly during live events — seamless purchase flow without leaving the stream.",
                icon: "🛒",
              },
              {
                title: "Branded Takeover Pages",
                description:
                  "Fully customizable branded pages for artists and event organizers — immersive fan destinations.",
                icon: "🎨",
              },
              {
                title: "Viral Social Mechanics",
                description:
                  "'Unlock Access' sharing mechanics that turned viewers into promoters — share with friends to unlock exclusive content.",
                icon: "🔗",
              },
              {
                title: "Pay-to-Play Model",
                description:
                  "Seamless $6.99 purchase flow for premium live events — simple, effective monetization.",
                icon: "💳",
              },
              {
                title: "Cross-Platform",
                description:
                  "Compatible across all major devices and browsers — meeting fans wherever they are.",
                icon: "📱",
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

      {/* ===== EVOLUTION CTA ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="accent-line mx-auto block mb-8" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-4">
              The Evolution Continues
            </h2>
            <p className="text-cream/50 font-body mb-8 max-w-xl mx-auto">
              The pioneering spirit behind iGoHD lives on. From live 2D
              streaming to fully immersive 3D reconstruction — see what came
              next.
            </p>
            <Link href="/work/game-view" className="btn-primary">
              Explore Game View
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
