"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {label && (
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="accent-line" />
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            {label}
          </span>
          <span className="accent-line" />
        </div>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${
          light ? "text-midnight" : "text-cream"
        } text-balance`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-body text-lg max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-midnight/60" : "text-cream/50"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
