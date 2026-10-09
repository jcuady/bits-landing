import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Zap, Radio, MapPin, BrainCircuit } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

/**
 * Operations 360 — the platform. Canonical home for the flagship.
 *
 * Positioning (CPO decision, Rev 2): OMS 360 is the platform. BITScrm and
 * BITSagent AI are MODULES inside it, not rival products. This page owns the
 * "collections CRM / OMS" head term; /operations-360/crm and
 * /operations-360/ai own their narrower intents.
 *
 * Replaces /products/collections, which carried the flagship content but was
 * unreachable under a non-obvious slug and unlinked from its own homepage row.
 */

const PILLARS = [
  {
    icon: Radio,
    title: "Collections Command Center",
    line: "360° dossiers, DPD aging, co-maker tracking. 0.4s screen-pop.",
    stat: "0.4s screen-pop",
  },
  {
    icon: Zap,
    title: "Predictive Softphone",
    line: "Sub-350ms pacing, 98.4% live voice. No desk phones, no PBX.",
    stat: "98.4% live voice",
  },
  {
    icon: MapPin,
    title: "Field Agents + Speech AI QA",
    line: "GPS proof-of-visit inside a 10m geofence. 100% of calls audited.",
    stat: "100% call audit",
  },
] as const;

const MODULES = [
  {
    name: "BITScrm",
    href: "/operations-360/crm",
    line: "Recover the accounts.",
    detail:
      "Sales, support and service workflows on the same database as your collections floor — no second system to reconcile.",
  },
  {
    name: "BITSagent AI",
    href: "/operations-360/ai",
    line: "Automate the floor.",
    detail:
      "Autonomous voice agents handling outreach, negotiation and QA on infrastructure that already holds your data.",
  },
] as const;

export const metadata: Metadata = {
  title: "Operations 360 (OMS) — Top CRM & OMS for Collections Agencies | BITS",
  description:
    "Operations 360 is the BITS platform for collections agencies: CRM & PTP automation, sub-350ms predictive softphone, GPS field telemetry, and 100% Speech AI QA — on one sovereign database. Includes BITScrm and BITSagent AI modules.",
  keywords: [
    "operations 360",
    "operations 360 oms",
    "top oms",
    "top crm collections agency",
    "best oms",
    "collections agency software philippines",
    "debt recovery platform",
    "operations management system",
    "collections agency crm",
    "predictive dialer philippines",
    "sovereign debt recovery software",
  ],
  alternates: { canonical: `${site.url}/operations-360` },
  openGraph: {
    title: "Operations 360 (OMS) — The BITS Platform for Collections Agencies",
    description:
      "One platform for the entire recovery floor: CRM & PTP automation, predictive softphone, GPS field telemetry, and 100% Speech AI QA.",
    url: `${site.url}/operations-360`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Operations 360 Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operations 360 (OMS) — The BITS Platform",
    description: "One platform for the entire recovery floor. Zero per-seat tax.",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Operations 360",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Operations management system and collections CRM platform unifying PTP automation, predictive telephony, GPS field telemetry, and Speech AI compliance.",
  provider: { "@type": "Organization", name: "BITS — Boundless IT Solutions" },
  featureList: PILLARS.map((p) => `${p.title} — ${p.line}`),
};

export default function Operations360Page() {
  return (
    <main id="content" className="bg-navy-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <Section className="bg-navy-950">
        <Container>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-signal-300">
              <ShieldCheck className="size-3.5" aria-hidden />
              The BITS Platform
            </p>
          </Reveal>

          <Reveal>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Operations 360
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-skywash/80 sm:text-xl">
              The recovery floor, on one system. Collections, telephony, field
              enforcement and compliance — sharing a single database instead of
              four vendors.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-electric-500 px-7 py-3.5 font-semibold text-white transition hover:bg-electric-600"
              >
                See pricing
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Book a live floor demo
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Three pillars ── */}
      <Section className="bg-navy-900">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Three capabilities. One deployment.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <Reveal key={pillar.title}>
                <article className="h-full rounded-2xl border border-white/10 bg-navy-800/60 p-7">
                  <pillar.icon className="size-7 text-signal-300" aria-hidden />
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {pillar.line}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-electric-400">
                    {pillar.stat}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Modules: CRM + BITSagent ── */}
      <Section className="bg-navy-950">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Two modules ship with it.
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-skywash/70">
              They are not separate products you have to integrate. They run on
              the Operations 360 database from day one.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {MODULES.map((module) => (
              <Reveal key={module.name}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800/60 p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal-300">
                    Module
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {module.name}
                  </h3>
                  <p className="mt-2 font-medium text-electric-400">
                    {module.line}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">
                    {module.detail}
                  </p>
                  <Link
                    href={module.href}
                    className="mt-7 inline-flex items-center gap-2 font-semibold text-white transition hover:text-signal-300"
                  >
                    Explore {module.name}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The rest of the catalogue ── */}
      <Section className="bg-navy-900" tight>
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  And 19 more on the same database
                </h2>
                <p className="mt-3 max-w-xl text-skywash/70">
                  Accounting, HRMS, logistics, booking, queuing and more — all
                  connected to the platform you already run.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Browse the full catalog
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-3 text-sm text-mist sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Accounting & ERP",
                "HRMS & Payroll",
                "Inventory & Logistics",
                "Field Agents App",
                "Booking System",
                "Smart Queuing",
                "Sports & Venue Hub",
                "Smart NFC Card",
                "RAG Knowledge Engine",
                "White-Label",
                "Custom Engineering",
                "Plus 8 more",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-signal-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-navy-950" tight>
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-navy-800/60 px-8 py-14 text-center">
              <BrainCircuit className="mx-auto size-8 text-signal-300" aria-hidden />
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
                Audit your floor benchmarks
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-skywash/75">
                We will benchmark your current talk-time, PTP fulfilment and
                dialer pacing against floors already running Operations 360.
              </p>
              <Link
                href="/pricing"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-electric-500 px-7 py-3.5 font-semibold text-white transition hover:bg-electric-600"
              >
                Request a consultation
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}