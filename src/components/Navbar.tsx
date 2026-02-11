"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/work", label: "Our Work" },
  { href: "/#books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-midnight/90 backdrop-blur-xl border-b border-white/[0.06] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-bold text-cream hover:text-accent transition-colors duration-300"
          >
            Garden Prayer.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium tracking-wide text-cream/70 hover:text-accent transition-colors duration-300 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-midnight/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-semibold text-cream hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
