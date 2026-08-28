"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDB, currentUser, logOut } from "@/lib/trailrider/store";

const links = [
  { href: "/trailrider/map", label: "Trails" },
  { href: "/trailrider/store", label: "Store" },
  { href: "/trailrider/messages", label: "Messages" },
  { href: "/trailrider/coach", label: "Coach" },
];

export default function TrailRiderNav() {
  const pathname = usePathname();
  const { db, update } = useDB();
  const user = db ? currentUser(db) : null;

  return (
    <header className="sticky top-0 z-[1000] border-b border-white/10 bg-zinc-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-3 sm:gap-2 sm:px-6">
        <Link
          href="/trailrider"
          className="mr-2 flex shrink-0 items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-500 text-sm text-zinc-950">
            {"▲"}
          </span>
          <span className="hidden sm:inline">TrailRider</span>
        </Link>

        <div className="flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {links.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {db === null ? null : user ? (
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-sm text-zinc-400 sm:inline">{user.name}</span>
            <button
              onClick={() => update(logOut)}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            href="/trailrider/login"
            className="shrink-0 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
