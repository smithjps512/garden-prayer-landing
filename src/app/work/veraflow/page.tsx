"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function VeraflowPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_60%)]" />

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

          <div className="max-w-4xl">
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
                Manufacturing Execution System / AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-[0.95] mb-6"
            >
              <span className="gradient-text">Veraflow</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-xl md:text-2xl text-cream/70 mb-4"
            >
              Physical-Scan Manufacturing Execution for Precision Manufacturing
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg text-cream/60 leading-relaxed max-w-3xl"
            >
              Veraflow is a physical-scan-based Manufacturing Execution System
              (MES) designed for complex, compliance-driven precision
              manufacturing operations. Built by a team with deep hands-on
              experience across defense, aerospace, consumer packaged goods, and
              automotive sectors &mdash; Veraflow applies enterprise-grade
              traceability discipline to manufacturers of every size.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-body text-base text-cream/50 leading-relaxed max-w-3xl mt-4"
            >
              Built by Garden Prayer Publishing and operated as a platform
              business, Veraflow replaces manual, paper-based component tracking
              with a scan-driven workflow that creates an auditable digital
              thread from raw material to finished part.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="https://veraflow.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit veraflow.ai
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
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.04),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                The Problem
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4 text-cream/60 font-body leading-relaxed text-lg">
              <p>
                Precision manufacturers operate under strict traceability and
                quality requirements &mdash; every component, process step, and
                quality checkpoint must be documented. Whether you&apos;re
                supplying into defense and aerospace programs, automotive OEM
                lines, or CPG production runs, most mid-market shops still rely
                on spreadsheets, email chains, and manual data entry to meet
                these requirements.
              </p>
              <p>
                The result: costly rework, compliance risk, and limited
                visibility for program managers and customers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== THE PLATFORM ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                The Platform
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Veratrace",
                subtitle: "Component Traceability",
                description:
                  "Component traceability at the physical level. Scan-in / scan-out workflows create a complete, immutable record of every part's journey through production — operator, workstation, timestamp, quality hold status, and disposition. Full lot and serial traceability without manual entry.",
                icon: "📡",
              },
              {
                title: "Veraflow SA",
                subtitle: "AI Assistant",
                description:
                  "An embedded AI assistant that surfaces production insights in plain language. Program managers can ask natural-language questions about WIP status, on-time delivery risk, and quality holds without navigating complex ERP dashboards.",
                icon: "🤖",
              },
              {
                title: "Dashboard & Analytics",
                subtitle: "Real-Time Visibility",
                description:
                  "Real-time production visibility including line-of-balance, on-time delivery forecasting, open NCRs, and supplier performance — built to the same standard as enterprise MES tools, at a price point accessible to mid-market suppliers.",
                icon: "📊",
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="glass-card p-8 h-full">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-display text-lg font-bold text-cream mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-accent text-xs font-body font-semibold tracking-wider uppercase mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="font-body text-cream/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUSINESS MODEL ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.04),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Business Model
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card p-8 md:p-10">
              <p className="text-cream/60 font-body leading-relaxed text-lg">
                Garden Prayer builds and operates Veraflow as a SaaS platform.
                Enterprise distribution partnerships bring Veraflow to
                established supply chain networks, with a revenue-share model
                that aligns incentives between platform growth and partner
                success.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STATUS ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Status
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-sm font-body font-semibold">
                  In Active Development
                </span>
              </div>
              <p className="text-cream/60 font-body leading-relaxed text-lg max-w-2xl mx-auto">
                Platform in active development. Domain launch:{" "}
                <a
                  href="https://veraflow.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light transition-colors duration-300"
                >
                  veraflow.ai
                </a>
                . Seeking pilot supply chain partners.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
