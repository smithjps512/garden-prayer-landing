import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CLUBS } from "@/lib/clubs";
import { config, formatLongDate } from "@/lib/config";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const clubNight = config.clubNightDate;
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative isolate overflow-hidden">
        <Image
          src="/brand/bruin-pride.png"
          alt=""
          fill
          priority
          className="-z-10 object-cover opacity-[0.16]"
        />
        <div className="container-x flex min-h-screen flex-col py-10">
          <header className="flex items-center justify-between text-sm">
            <span className="font-semibold tracking-wide">Blacksburg Middle School</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">Club Night</span>
          </header>

          <main className="my-auto py-12">
            <p className="eyebrow text-amber-300">Welcome, Bruins</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-6xl">
              Pick a club. Learn what it&apos;s about. Sign up in a minute.
            </h1>
            {clubNight && (
              <p className="mt-4 text-lg text-white/70">Club Night · {formatLongDate(clubNight)}</p>
            )}

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <ClubCard
                href="/tsa"
                club="tsa"
                title={CLUBS.tsa.chapter}
                subtitle={CLUBS.tsa.name}
                emblem={CLUBS.tsa.emblem}
                emblemAlt={CLUBS.tsa.emblemAlt}
                blurb="Technology, engineering, leadership and spring competitions."
              />
              <ClubCard
                href="/ffa"
                club="ffa"
                title={CLUBS.ffa.chapter}
                subtitle={CLUBS.ffa.name}
                emblem={CLUBS.ffa.emblem}
                emblemAlt={CLUBS.ffa.emblemAlt}
                blurb="Agriculture, leadership, the spring plant sale and field trips."
              />
            </div>
          </main>

          <footer className="text-xs text-white/50">
            Blacksburg Middle School · Montgomery County Public Schools · For club information only.
          </footer>
        </div>
      </div>
    </div>
  );
}

function ClubCard(props: {
  href: string;
  club: "tsa" | "ffa";
  title: string;
  subtitle: string;
  emblem: string;
  emblemAlt: string;
  blurb: string;
}) {
  return (
    <Link
      href={props.href}
      data-club={props.club}
      className="group relative overflow-hidden rounded-3xl bg-brand p-6 text-white shadow-lift ring-1 ring-white/10 transition hover:-translate-y-1 hover:brightness-110 sm:p-8"
    >
      <div className="hero-glow absolute inset-0" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-white/70">{props.subtitle}</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{props.title}</h2>
          <p className="mt-2 max-w-xs text-white/85">{props.blurb}</p>
        </div>
        <div className="shrink-0 rounded-2xl bg-white p-2 shadow">
          <Image src={props.emblem} alt={props.emblemAlt} width={88} height={88} className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
        </div>
      </div>
      <span className="relative mt-8 inline-flex items-center gap-2 font-semibold">
        Open {props.club.toUpperCase()} page
        <Icon name="arrow" className="h-5 w-5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
