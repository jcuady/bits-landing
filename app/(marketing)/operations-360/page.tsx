import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Zap, Radio, MapPin, BrainCircuit } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PlatformHero, PlatformSection } from "@/components/sections/platform-hero";
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
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/operations-360#software`,
      name: "Operations 360",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${site.url}/operations-360`,
      description:
        "Operations 360 is BITS' sovereign enterprise platform for collections agencies and recovery floors in the Philippines. It unifies collections CRM and promise-to-pay automation, a sub-350ms WebRTC predictive dialer, GPS-geofenced field proof-of-visit, and 100% real-time call QA scoring on a single database, with zero per-seat licensing. Pricing is provided on request through a consultation with a BITS representative.",
      featureList: [
        "Collections CRM & Promise-to-Pay (PTP) — 360° delinquent dossiers, DPD aging buckets, co-maker tracking, and automated broken-promise flagging",
        "Predictive Dialer — sub-350ms call pacing at approximately 98.4% live voice, WebRTC softphone in-browser with no desk phones or PBX hardware",
        "Field Agents App — GPS proof-of-visit within a 10-metre geofence, satellite-clock timestamping, watermarked photo evidence and debtor e-signature",
        "Real-time QA Scoring — 100% of calls audited for acoustic and semantic quality, prohibited-phrase detection and BSP Circulars 454/857 quiet-hour compliance",
      ],
      isPartOf: { "@type": "WebSite", url: site.url },
      provider: {
        "@type": "Organization",
        name: "Boundless IT Solutions",
        alternateName: ["BITS"],
        url: site.url,
        foundingDate: "2026",
        address: { "@type": "PostalAddress", addressCountry: "PH" },
        sameAs: [
          "https://www.linkedin.com/company/boundless-it-solutions-opc/",
          "https://www.facebook.com/p/Boundless-It-Solutions-61594430590134/",
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/operations-360#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Operations 360",
          item: `${site.url}/operations-360`,
        },
      ],
    },
  ],
};

export default function Operations360Page() {
  return (
    <main id="content" className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero: shared azure-sky treatment, matching the landing page ── */}
      <PlatformHero
        eyebrow="The BITS Platform"
        title="Operations 360"
        lede="The recovery floor, on one system. Collections, telephony, field enforcement and compliance — sharing a single database instead of four vendors."
        primaryCta={{ href: "/pricing", label: "Request a quote" }}
        secondaryCta={{ href: "/demo", label: "Book a live floor demo" }}
      />

      {/* ── Three pillars ── */}
      <PlatformSection
        eyebrow="Four pillars"
        title="Three capabilities. One deployment."
        lede="Everything a recovery floor needs, running on one database instead of four vendors."
      >
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Reveal key={pillar.title}>
              <article className="group h-full rounded-2xl border border-sky-100 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-sky-950/5">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-white shadow-sm ring-1 ring-slate-900/5 transition-transform duration-300 group-hover:scale-105">
                  <pillar.icon className="size-6 text-blue-600" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {pillar.line}
                </p>
                <p className="mt-5 border-t border-sky-100 pt-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-blue-700">
                  {pillar.stat}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </PlatformSection>

      {/* ── Modules: CRM + BITSagent ── */}
      <PlatformSection
        tint
        eyebrow="Included modules"
        title="Two modules ship with it."
        lede="They are not separate products you have to integrate. They run on the Operations 360 database from day one."
      >
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {MODULES.map((module) => (
            <Reveal key={module.name}>
              <article className="group flex h-full flex-col rounded-[1.75rem] border border-white/90 bg-white/90 p-8 shadow-sm backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10">
                <p className="w-fit rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-blue-700">
                  Module
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  {module.name}
                </h3>
                <p className="mt-1.5 font-semibold text-blue-700">{module.line}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {module.detail}
                </p>
                <Link
                  href={module.href}
                  className="mt-7 inline-flex min-h-[44px] items-center gap-2 font-bold text-slate-900 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Explore {module.name}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </PlatformSection>

      {/* ── The rest of the catalogue ── */}
      <PlatformSection>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              And 19 more on the same database
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Accounting, HRMS, logistics, booking, queuing and more — all
              connected to the platform you already run.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-sky-200 bg-white px-6 font-semibold text-slate-900 shadow-xs transition-all duration-300 hover:border-blue-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Browse the full catalog
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
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
              <Check className="size-3.5 shrink-0 text-blue-600" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </PlatformSection>

      {/* ── CTA ── */}
      <PlatformSection tint>
        <Reveal>
          <div className="rounded-[1.75rem] border border-white/90 bg-white/90 px-8 py-14 text-center shadow-sm backdrop-blur-2xl">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-white shadow-sm ring-1 ring-slate-900/5">
              <BrainCircuit className="size-7 text-blue-600" aria-hidden />
            </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
              Audit your floor benchmarks
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              We will benchmark your current talk-time, PTP fulfilment and
              dialer pacing against floors already running Operations 360.
            </p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Request a consultation
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </PlatformSection>
    </main>
  );
}