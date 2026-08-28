"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { DB, User } from "@/lib/trailrider/types";
import { useDB, currentUser } from "@/lib/trailrider/store";

/**
 * Nearly every user story starts with "sign in" as an acceptance criterion.
 * This wraps the pages that require it so that rule lives in one place.
 */
export default function AuthGate({
  title,
  children,
}: {
  title: string;
  children: (ctx: { user: User; db: DB }) => ReactNode;
}) {
  const { db } = useDB();
  const user = db ? currentUser(db) : null;

  if (!db) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-zinc-500 sm:px-6">
        Loading{"…"}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-3 text-zinc-400">
          You need an account to use this part of TrailRider.
        </p>
        <Link
          href="/trailrider/login"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
        >
          Log in or sign up
        </Link>
      </div>
    );
  }

  return <>{children({ user, db })}</>;
}
