"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-midnight-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,98,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-body font-semibold tracking-[0.15em] uppercase mb-6">
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[0.95]"
          >
            Built on Faith.
            <br />
            <span className="gradient-text">Driven by Purpose.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 font-body text-lg text-cream/50 max-w-2xl mx-auto leading-relaxed"
          >
            Garden Prayer Publishing LLC is a faith-guided technology innovation
            studio founded on the belief that the best work comes when we seek
            guidance first.
          </motion.p>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <ScrollReveal>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image
                  src="/images/PeacefulGardenImage.png"
                  alt="Peaceful Garden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal delay={0.2}>
              <div>
                <span className="accent-line block mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                  Who We Are
                </h2>

                <div className="space-y-4 text-cream/60 font-body leading-relaxed">
                  <p>
                    Garden Prayer Publishing is a group of talented creators,
                    technologists, and problem solving innovators who believe in
                    building for a purpose. We genuinely care that our work
                    impacts lives in a meaningful and useful way, and that
                    humanity benefits from it.
                  </p>
                  <p>
                    With over 20 years building products and experiences for the
                    largest companies in the world such as Disney, NASCAR, NFL,
                    Samsung, Procter and Gamble, and Live Nation our teams have a
                    rare combination of enterprise technology expertise and
                    faith-guided leadership to every project.
                  </p>
                  <p>
                    Our teams have also started, launched, and succeeded in
                    technical and experiential businesses that have brought brand
                    names to our customers communities and homes. We have seen
                    first hand the impact that building quality products that do
                    good can have, and our purpose is to continue to impact lives
                    through meaningful work.
                  </p>
                  <p>
                    We are big believers in innovation! And we are bigger
                    believers in people and God&apos;s purpose for them, and we
                    strive to marry innovation with purpose in everything we do.
                  </p>
                </div>

                <blockquote className="mt-8 pl-6 border-l-2 border-accent/30">
                  <p className="font-display text-lg text-cream/50 italic">
                    &ldquo;The best work comes when we seek guidance first. Every
                    platform, every book, every line of code is built with prayer
                    and commitment to serving others.&rdquo;
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== COMPANY STORY ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.04),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto">
          <SectionHeading
            label="Our Story"
            title="Technology That Serves People"
          />

          <div className="space-y-6 text-cream/60 font-body leading-relaxed text-center max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-lg">
                Garden Prayer Publishing was founded on the belief that
                technology should amplify human capability, not replace human
                connection.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                Rooted in Texas education — a family of educators who understand
                that real learning happens when technology empowers rather than
                distracts. From the Rio Grande Valley to Hollywood, from sports
                arenas to K-12 classrooms, our work has always centered on the
                people being served.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                Every platform, every book, every line of code is built with
                prayer and commitment to serving others. That&apos;s not a
                tagline — it&apos;s how we operate, every single day.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="What We Do"
            title="Solution Capabilities"
            subtitle="From concept to launch, we build technology that makes a difference."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Platform Development",
                description:
                  "Web, mobile, and AI-powered applications built with modern architectures and scalable infrastructure.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                ),
              },
              {
                title: "Immersive Experience Design",
                description:
                  "3D environments, live streaming, virtual studios, and experiences that transport audiences.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                ),
              },
              {
                title: "Education Technology",
                description:
                  "LMS platforms, AI teaching tools, COPPA-compliant systems, and accessible learning solutions.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                ),
              },
              {
                title: "Content Production",
                description:
                  "Virtual studio technology, episodic learning content, and video production at scale.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                ),
              },
              {
                title: "Product Strategy & Design",
                description:
                  "From concept through launch — market research, UX design, and go-to-market execution.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                ),
              },
              {
                title: "AI Integration",
                description:
                  "Leveraging cutting-edge AI models responsibly — from natural language processing to 3D reconstruction.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                ),
              },
            ].map((capability, i) => (
              <ScrollReveal key={capability.title} delay={i * 0.1}>
                <div className="glass-card p-8 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-5">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {capability.icon}
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream mb-2">
                    {capability.title}
                  </h3>
                  <p className="font-body text-cream/50 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 md:py-32 section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,169,98,0.05),transparent_70%)]" />

        <div className="relative max-w-5xl mx-auto">
          <SectionHeading label="Our Values" title="What Guides Us" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Faith-Guided Decision Making",
                description:
                  "Every significant decision begins with prayer. We seek guidance before strategy, wisdom before execution.",
              },
              {
                title: "Excellence in Craft",
                description:
                  "We hold ourselves to the highest standard. Good enough isn't enough when you're building for people who depend on your work.",
              },
              {
                title: "Technology That Serves People",
                description:
                  "Tools should amplify human capability, not replace human connection. People first, always.",
              },
              {
                title: "Real-World, Hands-On Approach",
                description:
                  "Built in Texas, grounded in reality. We build practical solutions for real problems, not technology for technology's sake.",
              },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-display font-bold text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream mb-2">
                      {value.title}
                    </h3>
                    <p className="font-body text-cream/50 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING SCRIPTURE ===== */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <blockquote className="font-display text-2xl md:text-3xl text-cream/40 italic leading-relaxed">
              &ldquo;For I know the plans I have for you, declares the Lord,
              plans to prosper you and not to harm you, plans to give you hope
              and a future.&rdquo;
            </blockquote>
            <cite className="block mt-4 text-accent/60 text-sm font-body not-italic">
              Jeremiah 29:11
            </cite>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
