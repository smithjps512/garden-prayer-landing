"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import BookCard from "@/components/BookCard";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { currentProjects, legacyProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,98,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05),transparent_60%)]" />

        {/* Grid lines decoration */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-px h-full bg-cream" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-cream" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-cream" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-body font-semibold tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Faith-Guided Innovation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] tracking-tight"
          >
            We Build What
            <br />
            <span className="gradient-text">Matters.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 font-body text-lg md:text-xl text-cream/50 max-w-2xl mx-auto leading-relaxed"
          >
            Platforms that teach, entertain, and transform — guided by prayer
            and 20+ years of experience building for Disney, NASCAR, NFL,
            Samsung, and Live Nation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#work" className="btn-primary">
              See Our Work
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
            <a href="/about" className="btn-outline">
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-float">
            <div className="w-6 h-10 rounded-full border-2 border-cream/20 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-accent/60"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.04),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <SectionHeading
            label="Our Mission"
            title="Teach. Mentor. Enable."
            subtitle="Technology should serve people, not replace them. Every platform we build amplifies human capability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                title: "Teach",
                description:
                  "From AI-powered classrooms to industry books — we create tools and content that make expertise accessible to everyone.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Mentor",
                description:
                  "Real-world guidance rooted in decades of experience building products for the world's largest entertainment and technology brands.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
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
                title: "Enable",
                description:
                  "Platforms that give people superpowers — whether that's a teacher reclaiming hours or a sports team creating immersive fan experiences.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="glass-card p-8 md:p-10 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cream mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-cream/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Scripture quote */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <blockquote className="font-display text-xl md:text-2xl text-cream/40 italic max-w-2xl mx-auto">
                &ldquo;Commit to the Lord whatever you do, and he will establish
                your plans.&rdquo;
              </blockquote>
              <cite className="block mt-3 text-accent/60 text-sm font-body not-italic">
                Proverbs 16:3
              </cite>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CURRENT PROJECTS ===== */}
      <section id="work" className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Work"
            title="What We're Building"
            subtitle="Platforms across sports, education, construction, and immersive technology."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {currentProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          {/* Legacy */}
          <div className="mt-20">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="accent-line" />
                <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                  Our Track Record
                </h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {legacyProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOOKS ===== */}
      <section
        id="books"
        className="py-24 md:py-32 section-padding relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,169,98,0.04),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <SectionHeading
            label="Published Works"
            title="Books That Challenge & Enable"
            subtitle="Thought leadership for educators and entrepreneurs navigating the AI revolution."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BookCard
              title="Stop Banning What You Should Be Teaching"
              subtitle="The Educator's Handbook for the AI Age"
              description="Includes the Three-Zone Framework for creating assignments with clear AI policies. A practical guide for educators who want to embrace AI responsibly."
              gradient="from-rose-800 via-red-900 to-rose-950"
              amazonUrl="https://amazon.com"
              index={0}
            />
            <BookCard
              title="You Can't Automate What You Don't Understand"
              subtitle="Partnering AI with Process"
              description="For entrepreneurs and business leaders who want to leverage AI effectively. Understand the process before automating it."
              gradient="from-slate-700 via-slate-800 to-slate-900"
              amazonUrl="https://amazon.com"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section
        id="contact"
        className="py-24 md:py-32 section-padding relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-500 via-midnight to-midnight" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.06),transparent_60%)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-cream/60 italic leading-relaxed">
              &ldquo;Whatever you do, work at it with all your heart, as working
              for the Lord, not for human masters.&rdquo;
            </blockquote>
            <cite className="block mt-4 text-accent/60 text-sm font-body not-italic">
              Colossians 3:23
            </cite>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Let&apos;s Build Something Together
              </h2>
              <p className="text-cream/50 font-body mb-8">
                We&apos;re always seeking the next opportunity to teach, mentor,
                and enable.
              </p>
              <a
                href="mailto:hello@gardenprayerpublishing.com"
                className="btn-primary"
              >
                Get In Touch
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
