import type { Metadata } from "next";
import Image from "next/image";
import ClubPage from "@/components/ClubPage";
import { CLUBS } from "@/lib/clubs";

export const dynamic = "force-dynamic";

const club = CLUBS.ffa;

export const metadata: Metadata = {
  title: club.chapter,
  description: club.metaDescription,
};

const SYMBOLS = [
  { title: "Cross section of corn", text: "The foundation of the emblem. Corn is grown in every state, a symbol of unity." },
  { title: "Rising sun", text: "Progress, and the promise that a new day will be glowing with opportunity." },
  { title: "Plow", text: "Labor and tillage of the soil. The backbone of agriculture and the nation." },
  { title: "Eagle", text: "Freedom, and new horizons in the future of agriculture." },
  { title: "Owl", text: "Wisdom, and the knowledge it takes to succeed in agriculture." },
  { title: "Agricultural Education & FFA", text: "The words that tie the symbols to the program: learning by doing." },
];

export default function FfaPage() {
  return (
    <ClubPage club={club}>
      <section className="bg-brand-tint py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-full bg-brand-accent/30 blur-2xl" />
            <Image
              src="/brand/ffa-emblem.jpg"
              alt="FFA emblem"
              width={640}
              height={640}
              className="h-auto w-full rounded-3xl shadow-lift"
            />
          </div>
          <div>
            <p className="eyebrow text-brand">The emblem</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Five symbols, one story</h2>
            <p className="mt-4 text-lg text-slate-700">
              Every FFA member learns what the emblem means. Here is the short version.
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {SYMBOLS.map((s) => (
                <div key={s.title} className="card p-4">
                  <dt className="font-semibold">{s.title}</dt>
                  <dd className="mt-1 text-sm text-slate-600">{s.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Leadership Team</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Become a BMS FFA officer</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              FFA officer duties vary by office, but generally include serving as a role model, presiding over
              meetings, coordinating activities, managing chapter records, promoting the organization, and helping
              with public relations. Officers work together to build leadership, reach chapter goals, encourage
              member involvement, and grow school and community support for FFA.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              The leadership team gets opportunities for field trips and before/after school meetings.
            </p>
          </div>
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <Image src="/brand/ffa-owl.png" alt="" width={200} height={230} className="pointer-events-none absolute -right-6 -top-4 w-40 opacity-10" />
            <p className="eyebrow text-brand">Born in Blacksburg</p>
            <h3 className="mt-3 text-2xl font-bold">FFA&apos;s roots are right here</h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              In 1925, four agricultural educators at Virginia Tech started the Future Farmers of Virginia, the model
              for the National FFA Organization founded in 1928. Every June, about 3,000 students come to Blacksburg
              for the Virginia FFA State Convention on the Virginia Tech campus.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700">
              Today FFA has more than a million members in 9,400+ chapters, including more than 14,000 in Virginia.
            </p>
          </div>
        </div>
      </section>
    </ClubPage>
  );
}
