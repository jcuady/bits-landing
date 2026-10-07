import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ConsultationButton } from "@/components/ui/consultation-button";
import { solutionTracks, sectorTrackMap } from "@/lib/solutions-data";
import { site, targetIndustrySectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions — What Are You Trying to Fix? | BITS",
  description:
    "Six operational problems BITS solves: collections and field recovery, automated voice AI, sales pipelines and support, accounting and payroll, inventory and dispatch, and bookings and queuing. Find the track that matches your bottleneck.",
  alternates: { canonical: `${site.url}/solutions` },
  openGraph: {
    title: "BITS Solutions — Six Operational Problems, Six Answers",
    description:
      "Pick the problem you are trying to fix and we route you to the BITS product that solves it — collections, voice AI, sales, payroll, logistics, or bookings.",
    url: `${site.url}/solutions`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Solutions" }],
  },
};

export default function SolutionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/solutions#webpage`,
        url: `${site.url}/solutions`,
        name: "BITS Solutions — Six Operational Problems, Six Answers",
        description:
          "Buyer-language solution tracks mapping common operational bottlenecks to the BITS product that resolves them.",
        publisher: { "@type": "Organization", name: site.legalName, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${site.url}/solutions` },
        ],
      },
      {
        "@type": "ItemList",
        name: "BITS Solution Tracks",
        itemListElement: solutionTracks.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.goal,
          url: `${site.url}/solutions#${t.id}`,
        })),
      },
    ],
  };

  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-cloud via-white to-white pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,99,219,0.08),transparent)]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-linelight bg-white px-3.5 py-1 shadow-2xs">
                <Target className="size-3 text-electric-600" />
                <span className="text-overline text-electric-600">Solutions</span>
              </div>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="text-display text-ink text-balance">
                Start With the Problem.{" "}
                <span className="text-gradient-brand">We Name the Product.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lede mx-auto mt-6 max-w-[58ch] text-slateblue text-pretty">
                Six operational problems account for most of what our clients come to us with.
                Find yours below. Each track shows what is going wrong, what we put in place, and
                exactly which BITS product does the work.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationButton
                  interest="Solutions Scoping — Free 20-Minute Technical Call"
                  label="Book a Free 20-Minute Call"
                />
                <Link
                  href="/products"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-linelight bg-white px-7 text-sm font-bold text-ink shadow-xs transition-all duration-200 hover:border-electric-400 hover:bg-skywash"
                >
                  Browse all 18 products
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 2. THE SIX SOLUTION TRACKS ── */}
      <Section className="relative border-t border-linelight bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">The six tracks</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">
                Six Problems. Six Answers.
              </h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                Every track below is written from the buyer&apos;s side: what breaks, what it costs,
                and what changes once BITS is running.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 space-y-5">
            {solutionTracks.map((track, idx) => (
              <Reveal key={track.id} delay={0.04}>
                <article
                  id={track.id}
                  className="scroll-mt-28 overflow-hidden rounded-3xl border border-linelight bg-white shadow-sm transition-all duration-300 hover:border-electric-400/60 hover:shadow-xl"
                >
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                    {/* The problem */}
                    <div className="border-b border-linelight bg-slate-50/60 p-7 sm:p-9 lg:border-b-0 lg:border-r">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-electric-600">
                          {track.track}
                        </span>
                        <span className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-mist">
                          {track.category}
                        </span>
                        <span className="ml-auto rounded-full border border-linelight bg-white px-2.5 py-0.5 font-mono text-[0.62rem] font-bold text-slate-600">
                          {track.badge}
                        </span>
                      </div>

                      <h3 className="text-h3 mt-4 text-ink text-pretty leading-snug">
                        &ldquo;{track.goal}&rdquo;
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-slate-600">
                        {track.problem}
                      </p>

                      <Link
                        href={track.href}
                        className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric-600 transition-colors hover:text-electric-500"
                      >
                        <span>See {track.product}</span>
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* What we put in place */}
                    <div className="p-7 sm:p-9">
                      <p className="text-overline text-slate-500">What BITS puts in place</p>
                      <ul className="mt-5 space-y-3">
                        {track.approach.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                            <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-linelight pt-4 text-xs leading-relaxed text-slate-500">
                        {track.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. WHO THESE SERVE ── */}
      <Section className="relative border-t border-linelight bg-cloud py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">Who we build for</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">
                Same Platform. Different Operating Floor.
              </h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                The products are shared. The configuration, the permissions, and the reporting are
                scoped to the way your organization actually operates.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {targetIndustrySectors.map((sector, idx) => {
              const linked = (sectorTrackMap[sector.id] ?? [])
                .map((id) => solutionTracks.find((t) => t.id === id))
                .filter((t): t is (typeof solutionTracks)[number] => Boolean(t));

              return (
                <Reveal key={sector.id} delay={0.04 + idx * 0.04}>
                  <div className="flex h-full flex-col rounded-3xl border border-linelight bg-white p-7 shadow-sm">
                    <span className="inline-flex w-fit rounded-full bg-skywash px-3 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-electric-600">
                      {sector.highlight}
                    </span>
                    <h3 className="text-lg font-bold text-ink mt-3">{sector.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {sector.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-linelight pt-4">
                      {linked.map((t) => (
                        <Link
                          key={t.id}
                          href={`#${t.id}`}
                          className="rounded-full border border-linelight bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-electric-400 hover:text-electric-600"
                        >
                          {t.track} · {t.product}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 4. CTA ── */}
      <Section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(0,166,255,0.18),transparent)]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="text-h2 text-white text-balance">
                Not Sure Which Track Fits?
              </h2>
              <p className="text-lede mt-5 text-sky-100/90 text-pretty">
                Book a free 20-minute technical call. We look at your current workflow, tell you
                honestly whether BITS fits, and scope the smallest deployment that solves the
                problem. No sales pitch.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationButton
                  interest="Solutions Scoping — Free 20-Minute Technical Call"
                  label="Book the 20-Minute Call"
                  variant="light"
                />
                <Link
                  href="/security"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                >
                  Review security & deployment
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}