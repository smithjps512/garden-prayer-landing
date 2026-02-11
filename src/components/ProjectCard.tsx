"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  large?: boolean;
}

export default function ProjectCard({
  project,
  index,
  large = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} ${
            large ? "aspect-[4/3]" : "aspect-[16/10]"
          } transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/10`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Icon/visual center piece */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <span
              className={`${
                large ? "text-8xl" : "text-6xl"
              } opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-110 transform`}
            >
              {project.icon}
            </span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase ${
                  project.status === "Active"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "Active"
                      ? "bg-emerald-400"
                      : "bg-purple-400"
                  }`}
                />
                {project.statusLabel || project.status}
              </span>
              <span className="text-[10px] font-body text-white/40 tracking-wider uppercase">
                {project.category}
              </span>
            </div>

            {/* Title & tagline */}
            <h3
              className={`font-display font-bold text-white mb-2 ${
                large ? "text-3xl" : "text-xl md:text-2xl"
              }`}
            >
              {project.name}
            </h3>
            <p className="text-white/60 text-sm font-body leading-relaxed line-clamp-2">
              {project.tagline}
            </p>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-white/50 group-hover:text-accent transition-colors duration-300">
              <span className="text-xs font-body font-semibold tracking-wider uppercase">
                View Project
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
