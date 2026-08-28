"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/ctos/encyclopedia", label: "Encyclopedia" },
  { href: "/ctos/quizzes", label: "Quizzes" },
  { href: "/ctos/quiz/new", label: "Create" },
];

export default function CtosNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 px-3 py-3 sm:gap-2 sm:px-6">
        <Link
          href="/ctos"
          className="mr-1 flex shrink-0 items-center gap-2 font-semibold tracking-tight text-white sm:mr-3"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-indigo-500 text-sm font-bold text-white">
            C
          </span>
          <span className="hidden sm:inline">CTOS</span>
        </Link>

        <div className="flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {links.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-2 py-1.5 text-[13px] transition-colors sm:px-3 sm:text-sm ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
