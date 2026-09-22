import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import SignupForm from "./SignupForm";
import type { Club } from "@/lib/clubs";
import { config, formatLongDate } from "@/lib/config";

export default function ClubPage({ club, children }: { club: Club; children?: React.ReactNode }) {
  const closed = config.isClosed;
  const closesAt = config.siteClosesAt;
  const clubNight = config.clubNightDate;

  return (
    <div data-club={club.id} className="min-h-screen bg-brand-paper text-brand-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-deep/95 text-white backdrop-blur">
        <div className="container-x flex h-14 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs uppercase tracking-wider">BMS</span>
            <span className="hidden sm:inline">Club Night</span>
            <span className="text-white/60">/</span>
            <span>{club.short}</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <a href="#about" className="hidden rounded-full px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white md:inline">About</a>
            <a href="#meetings" className="hidden rounded-full px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white md:inline">Meetings</a>
            <a href="#signup" className="btn-accent px-4 py-1.5 text-sm">Sign up</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="hero-grid absolute inset-0 -z-10" />
        <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
          <div className="animate-rise">
            <p className="eyebrow text-white/75">Blacksburg Middle School · Club Night</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Join the <span className="whitespace-nowrap">{club.chapter}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">{club.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#signup" className="btn-accent text-base">
                Sign up now <Icon name="arrow" className="h-5 w-5" />
              </a>
              <a href="#about" className="btn-ghost text-base">What is {club.short}?</a>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <HeroFact icon="pin" label="Where" value={club.room} />
              <HeroFact icon="calendar" label="First meeting" value={club.firstMeeting} />
              <HeroFact icon="mail" label="Advisor" value={club.advisorName} />
            </dl>
          </div>
          <div className="animate-rise mx-auto w-full max-w-sm [animation-delay:120ms] lg:max-w-md">
            <div className="rounded-3xl bg-white p-6 shadow-lift sm:p-8">
              <Image
                src={club.emblem}
                alt={club.emblemAlt}
                width={640}
                height={club.id === "tsa" ? 385 : 640}
                priority
                className="mx-auto h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {closed && (
        <div className="bg-amber-100 text-amber-900">
          <div className="container-x py-3 text-sm font-medium">
            Club Night signups closed{closesAt ? ` on ${formatLongDate(closesAt)}` : ""}. You can still email {club.advisorName} at{" "}
            <a className="underline" href={`mailto:${club.advisorEmail}`}>{club.advisorEmail}</a>.
          </div>
        </div>
      )}

      {/* About */}
      <section id="about" className="scroll-mt-16 py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand">What is {club.short}?</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{club.name}</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">{club.what}</p>
              <div className="mt-6 rounded-2xl border-l-4 border-brand-accent bg-brand-tint p-5 text-slate-800">
                <p className="font-semibold">This year at BMS</p>
                <p className="mt-1 leading-relaxed">{club.membership}</p>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {club.features.map((f) => (
                <li key={f.title} className="card flex gap-4 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Club-specific content */}
      {children}

      {/* Stats */}
      <section className="bg-brand-deep py-14 text-white sm:py-16">
        <div className="container-x">
          <p className="eyebrow text-white/70">{club.short} by the numbers</p>
          <dl className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {club.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <dd className="font-display text-3xl font-extrabold text-brand-accent sm:text-4xl">{s.value}</dd>
                <dt className="mt-1 text-sm text-white/80">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Meetings + advisor */}
      <section id="meetings" className="scroll-mt-16 py-16 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow text-brand">Meetings</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">When &amp; where</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoCard icon="pin" title="Room" text={club.room} />
              <InfoCard icon="clock" title="Meeting times" text={club.meetingTimes} />
              <InfoCard icon="calendar" title="First meeting" text={club.firstMeeting} highlight />
            </div>
            {clubNight && (
              <p className="mt-5 text-sm text-slate-600">
                Club Night is {formatLongDate(clubNight)}. Stop by the {club.short} table to meet {club.advisorName} and current members.
              </p>
            )}
          </div>
          <div className="card flex flex-col justify-between p-6">
            <div>
              <p className="eyebrow text-brand">Questions?</p>
              <p className="mt-3 text-xl font-bold">{club.advisorName}</p>
              <p className="text-slate-600">{club.advisorTitle}</p>
            </div>
            <a href={`mailto:${club.advisorEmail}`} className="btn-brand mt-6 w-full">
              <Icon name="mail" className="h-5 w-5" /> Email {club.advisorName}
            </a>
            <p className="mt-3 break-all text-center text-sm text-slate-500">{club.advisorEmail}</p>
          </div>
        </div>
      </section>

      {/* Signup */}
      <section id="signup" className="scroll-mt-16 bg-brand-tint py-16 sm:py-20">
        <div className="container-x max-w-3xl">
          <p className="eyebrow text-brand">Sign up</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{club.formTitle}</h2>
          <p className="mt-3 text-lg text-slate-700">{club.formBlurb}</p>
          <div className="mt-8">
            <SignupForm
              club={club.id}
              clubShort={club.short}
              advisorName={club.advisorName}
              interests={club.interests}
              closed={closed}
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 text-sm text-slate-500">
        <div className="container-x flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Blacksburg Middle School · Montgomery County Public Schools · Club Night</p>
          <p className="max-w-md">
            {club.short} and the {club.short} emblem are trademarks of the {club.name}. This page is for BMS club information only.
          </p>
        </div>
      </footer>
    </div>
  );
}

function HeroFact({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
      <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
      <div>
        <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/60">{label}</dt>
        <dd className="text-sm font-semibold leading-snug">{value}</dd>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text, highlight = false }: { icon: string; title: string; text: string; highlight?: boolean }) {
  return (
    <div className={`card p-5 ${highlight ? "ring-2 ring-brand-accent" : ""}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tint text-brand">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</p>
      <p className="mt-1 font-semibold leading-snug">{text}</p>
    </div>
  );
}
