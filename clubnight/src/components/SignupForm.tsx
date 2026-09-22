"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import type { ClubId } from "@/lib/clubs";

interface Props {
  club: ClubId;
  clubShort: string;
  advisorName: string;
  interests: string[];
  closed: boolean;
}

type Status = "idle" | "sending" | "done" | "error";

const GRADES = ["6", "7", "8"];

export default function SignupForm({ club, clubShort, advisorName, interests, closed }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      club,
      student_first: String(fd.get("student_first") || "").trim(),
      student_last: String(fd.get("student_last") || "").trim(),
      grade: String(fd.get("grade") || ""),
      student_email: String(fd.get("student_email") || "").trim(),
      parent_name: String(fd.get("parent_name") || "").trim(),
      parent_email: String(fd.get("parent_email") || "").trim(),
      interests: fd.getAll("interests").map(String),
      comments: String(fd.get("comments") || "").trim(),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") || ""), // honeypot
    };
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (closed) {
    return (
      <div className="card p-6 text-center sm:p-8">
        <p className="text-lg font-semibold">Signups for Club Night have closed.</p>
        <p className="mt-2 text-slate-600">
          Still interested in {clubShort}? Email {advisorName} directly and they will get you connected.
        </p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="card p-8 text-center sm:p-10" role="status" aria-live="polite">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 text-2xl font-bold">You&apos;re on the list!</h3>
        <p className="mt-2 text-slate-600">
          Thanks for your interest in {clubShort}. {advisorName} will follow up after Club Night with next steps.
        </p>
        <button type="button" className="btn-brand mt-6" onClick={() => setStatus("idle")}>
          Sign up another student
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="student_first" className="label">Student first name</label>
          <input id="student_first" name="student_first" required autoComplete="given-name" className="input" />
        </div>
        <div>
          <label htmlFor="student_last" className="label">Student last name</label>
          <input id="student_last" name="student_last" required autoComplete="family-name" className="input" />
        </div>

        <fieldset>
          <legend className="label">Grade</legend>
          <div className="flex gap-2">
            {GRADES.map((g) => (
              <label
                key={g}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-slate-300 py-3 text-base font-semibold text-slate-700 has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white"
              >
                <input type="radio" name="grade" value={g} required className="sr-only" />
                {g}th
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="student_email" className="label">
            Student school email <span className="font-normal text-slate-500">(@mcps.org)</span>
          </label>
          <input id="student_email" name="student_email" type="email" inputMode="email" autoComplete="email" placeholder="name@mcps.org" className="input" />
        </div>

        <div>
          <label htmlFor="parent_name" className="label">Parent / guardian name</label>
          <input id="parent_name" name="parent_name" required className="input" />
        </div>
        <div>
          <label htmlFor="parent_email" className="label">Parent / guardian email</label>
          <input id="parent_email" name="parent_email" type="email" inputMode="email" required className="input" />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="label">What are you most interested in? <span className="font-normal text-slate-500">(pick any)</span></legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {interests.map((it) => (
              <label
                key={it}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 has-[:checked]:border-brand has-[:checked]:bg-brand-tint"
              >
                <input type="checkbox" name="interests" value={it} className="h-4 w-4 accent-[rgb(var(--brand))]" />
                {it}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="comments" className="label">
            Questions or comments <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <textarea id="comments" name="comments" rows={3} maxLength={1000} className="input" />
        </div>

        <label className="flex items-start gap-3 text-sm text-slate-700 sm:col-span-2">
          <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-[rgb(var(--brand))]" />
          <span>
            My parent or guardian knows I&apos;m signing up, and it&apos;s OK for {advisorName} to contact us about {clubShort}.
          </span>
        </label>

        {/* Honeypot: hidden from people, filled by bots */}
        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-brand mt-6 w-full py-4 text-lg disabled:opacity-60 sm:w-auto sm:px-10">
        {status === "sending" ? "Sending…" : `Sign me up for ${clubShort}`}
        {status !== "sending" && <Icon name="arrow" className="h-5 w-5" />}
      </button>
      <p className="mt-3 text-xs text-slate-500">
        Your info goes only to {advisorName} at Blacksburg Middle School and is used just for club communication.
      </p>
    </form>
  );
}
