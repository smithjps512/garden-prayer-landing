import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-midnight-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-cream"
            >
              Garden Prayer.
            </Link>
            <p className="mt-4 text-cream/50 text-sm leading-relaxed max-w-xs">
              Enlightening the world through applied experience and automation.
            </p>
            <p className="mt-3 text-cream/40 text-xs italic leading-relaxed max-w-xs">
              We teach, mentor, and enable — always in prayer, always seeking
              guidance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-accent mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/work", label: "Our Work" },
                { href: "/about", label: "About" },
                { href: "/work/game-view", label: "Game View" },
                { href: "/work/melissa", label: "Melissa for Educators" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/50 text-sm hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-accent mb-6">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@gardenprayerpublishing.com"
              className="text-cream/50 text-sm hover:text-accent transition-colors duration-300"
            >
              hello@gardenprayerpublishing.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">
            &copy; {new Date().getFullYear()} Garden Prayer Publishing LLC. All
            rights reserved.
          </p>
          <p className="text-cream/30 text-xs italic">
            Built with faith in Texas.
          </p>
        </div>
      </div>
    </footer>
  );
}
