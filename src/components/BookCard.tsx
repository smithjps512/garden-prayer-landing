"use client";

import { motion } from "framer-motion";

interface BookCardProps {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  amazonUrl: string;
  index: number;
}

export default function BookCard({
  title,
  subtitle,
  description,
  gradient,
  amazonUrl,
  index,
}: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group"
    >
      <div className="glass-card-hover p-8 md:p-10 h-full flex flex-col">
        {/* Book cover placeholder */}
        <div
          className={`w-full aspect-[3/4] rounded-xl mb-8 bg-gradient-to-br ${gradient} flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-[1.02]`}
        >
          <div className="text-center">
            <div className="w-16 h-[2px] bg-white/30 mx-auto mb-6" />
            <h4 className="font-display text-xl md:text-2xl font-bold text-white leading-tight text-balance">
              {title}
            </h4>
            <div className="w-16 h-[2px] bg-white/30 mx-auto mt-6" />
            <p className="mt-4 text-white/60 text-xs font-body tracking-wider uppercase">
              James Smith
            </p>
          </div>
        </div>

        {/* Book info */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-xl font-bold text-cream mb-1">
            {title}
          </h3>
          <p className="text-accent text-sm font-body font-medium mb-3">
            {subtitle}
          </p>
          <p className="text-cream/50 text-sm font-body leading-relaxed flex-1">
            {description}
          </p>

          {/* Amazon CTA */}
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-accent text-sm font-body font-semibold hover:text-accent-light transition-colors duration-300 group/link"
          >
            <span>Available on Amazon</span>
            <svg
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
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
        </div>
      </div>
    </motion.div>
  );
}
