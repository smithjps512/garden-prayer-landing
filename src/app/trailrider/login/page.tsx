"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useDB, currentUser, logIn, signUp, logOut } from "@/lib/trailrider/store";

/**
 * Log in / sign up — Lincoln's user story.
 *
 * Acceptance criteria from the story:
 *   1. Put in your username and password or email
 *   2. Submit
 *   3. Get approved and explore the app
 */
function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/trailrider/map";

  const { db, update } = useDB();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const user = db ? currentUser(db) : null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!db) return;
    setError(null);

    const result =
      mode === "signup"
        ? signUp(db, { name, email, password })
        : logIn(db, { email, password });

    if ("error" in result) {
      setError(result.error);
      return;
    }
    update(() => result.db);
    router.push(next);
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-white">
          You{"'"}re logged in as {user.name}
        </h1>
        <p className="mt-3 text-zinc-400">{user.email}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => router.push("/trailrider/map")}
            className="rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            Explore the app
          </button>
          <button
            onClick={() => update(logOut)}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-zinc-200 transition-colors hover:bg-white/5"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-zinc-400">
        {mode === "signup"
          ? "You need an account to post listings, message sellers and ask the coach."
          : "Log in to pick up where you left off."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "signup" && (
          <Field
            label="Name"
            value={name}
            onChange={setName}
            type="text"
            placeholder="Drew"
            autoComplete="name"
          />
        )}
        <Field
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Field
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          placeholder="At least 6 characters"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!db}
          className="w-full rounded-lg bg-emerald-500 px-5 py-3 font-medium text-zinc-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
        >
          {mode === "signup" ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-400">
        {mode === "signup" ? "Already have an account?" : "New to TrailRider?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setError(null);
          }}
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          {mode === "signup" ? "Log in" : "Sign up"}
        </button>
      </p>

      <p className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-zinc-500">
        <strong className="text-zinc-400">How this works in the prototype:</strong>{" "}
        your account is saved in this browser only, and the password is stored as
        plain text. That is fine for a demo and never acceptable in a real app —
        real sign-in sends the password to a server, which stores only a hashed
        version it cannot reverse. Do not reuse a password you use anywhere else.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500/60 focus:bg-white/[0.06]"
      />
    </label>
  );
}

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
