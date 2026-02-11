"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { currentProjects, legacyProjects } from "@/data/projects";

export default function WorkPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,98,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-body font-semibold tracking-[0.15em] uppercase mb-6">
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[0.95]"
          >
            Our <span className="gradient-text">Work</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 font-body text-lg text-cream/50 max-w-2xl mx-auto leading-relaxed"
          >
            20+ years of building platforms that teach, entertain, and
            transform. From live entertainment to AI-powered education to
            immersive 3D experiences.
          </motion.p>
        </div>
      </section>

      {/* ===== CURRENT PROJECTS ===== */}
      <section className="py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Current Projects
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                large
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEGACY PROJECTS ===== */}
      <section className="py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <h2 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Our Track Record
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legacyProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                large
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
