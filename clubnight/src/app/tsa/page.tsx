import type { Metadata } from "next";
import Image from "next/image";
import ClubPage from "@/components/ClubPage";
import Icon from "@/components/Icon";
import { CLUBS } from "@/lib/clubs";

export const dynamic = "force-dynamic";

const club = CLUBS.tsa;

export const metadata: Metadata = {
  title: club.chapter,
  description: club.metaDescription,
};

export default function TsaPage() {
  return (
    <ClubPage club={club}>
      <section className="bg-brand-tint py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/brand/tsa-conference.jpg"
              alt="TSA students building, testing and presenting projects at a TSA conference"
              width={960}
              height={504}
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="eyebrow text-brand">Leadership Team</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Help plan what TSA does this year</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Leadership team members meet before school, brainstorm activities, and make them happen for the
              whole school: design challenges, build days, guest speakers, and getting BMS ready for spring
              competitions.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Plan and run TSA activities and events",
                "Represent BMS TSA at school events",
                "Learn how real teams organize a project",
                "Get first pick at spring competitive events",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-slate-800">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <p className="eyebrow text-brand">Virginia TSA</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">From BMS to the state stage</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Step n="1" title="Chapter" text="It starts in the Tech Ed room: activities, build days, and practice events at BMS." />
            <Step n="2" title="Regional fair" text="Virginia TSA middle school chapters compete at regional fairs in the spring." />
            <Step n="3" title="Technosphere" text="Virginia’s state conference, held every spring. Top finishers can advance to the National TSA Conference in June." />
          </div>
          <p className="mt-6 text-sm text-slate-500">
            TSA offers 37 competitive events for middle school students, from CAD and coding to flight, structural engineering,
            video game design and public speaking.
          </p>
        </div>
      </section>
    </ClubPage>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="card p-6">
      <span className="font-display text-4xl font-extrabold text-brand-accent">{n}</span>
      <p className="mt-2 text-lg font-bold">{title}</p>
      <p className="mt-1 text-slate-600">{text}</p>
    </div>
  );
}
