import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PlatformHero, PlatformSection } from "@/components/sections/platform-hero";
import { site } from "@/lib/site";

/**
 * BITSagent AI — the automation module of Operations 360.
 *
 * Consolidated from /bitsagent (CPO decision, Rev 2: AI is a module of the
 * platform, not a rival product). /bitsagent 301s here.
 */

const CAPABILITIES = [
  {
    title: "Autonomous outbound",
    body: "Voice agents that carry the opening, qualify the account and hand off to a human on context — not on a timer.",
  },
  {
    title: "Negotiation within policy",
    body: "Settlement framing and promise-to-pay capture drawn from the account record, inside the calling windows and tone rules your regulator requires.",
  },
  {
    title: "QA on every call",
    body: "Acoustic and semantic scoring across 100% of conversations, not a sampled few. Prohibited phrases and quiet-hour breaches flagged as they happen.",
  },
  {
    title: "No new data silo",
    body: "The agent reads and writes the Operations 360 record. Nothing is re-keyed, and nothing lives in a separate vendor's database.",
  },
] as const;

export const metadata: Metadata = {
  title: "BITSagent AI — Automation Module of Operations 360 | BITS",
  description:
    "BITSagent AI automates outreach, negotiation and QA inside Operations 360. Autonomous voice agents, 100% call auditing, and no separate data silo.",
  keywords: [
    "bitsagent",
    "voice ai agents philippines",
    "conversational ai collections",
    "autonomous support & collections ai",
    "webrtc voice ai agent",
    "enterprise ai operations",
    "ai debt negotiation",
    "speech-to-speech ai agent",
    "contact center ai automation",
  ],
  alternates: { canonical: `${site.url}/operations-360/ai` },
  openGraph: {
    title: "BITSagent AI — Automation Module of Operations 360",
    description: "Automate the floor. Autonomous voice and 100% call QA inside Operations 360.",
    url: `${site.url}/operations-360/ai`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITSagent AI — Automation Module" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/operations-360/ai#software`,
      name: "BITSagent AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${site.url}/operations-360/ai`,
      description:
        "BITSagent AI is the automation module of Operations 360, BITS' sovereign enterprise platform for collections agencies in the Philippines. It operates autonomous voice, SMS and email agents directly on the Operations 360 account record, with 100% real-time call QA scoring and prohibited-phrase detection aligned to BSP Circulars 454 and 857. Pricing is provided on request through a consultation with a BITS representative.",
      featureList: CAPABILITIES.map((c) => `${c.title} — ${c.body}`),
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
      "@id": `${site.url}/operations-360/ai#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Operations 360",
          item: `${site.url}/operations-360`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "BITSagent AI",
          item: `${site.url}/operations-360/ai`,
        },
      ],
    },
  ],
};

export default function BitsAgentModulePage() {
  return (
    <main id="content" className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero: shared azure-sky treatment, matching the landing page ── */}
      <PlatformHero
        eyebrow="Module of Operations 360"
        title="Automate the floor."
        lede="BITSagent AI is not a separate product bolted on the side. It operates on the Operations 360 record, so the agent, the agent floor, and the compliance trail are the same system."
        backHref="/operations-360"
        backLabel="Back to Operations 360"
        primaryCta={{ href: "/pricing", label: "Request a quote" }}
        secondaryCta={{ href: "/demo", label: "Book a live floor demo" }}
      />

      <PlatformSection
        eyebrow="Capabilities"
        title="Built on the platform record"
        lede="Every capability reads and writes the Operations 360 record — nothing is re-keyed and nothing lives in a separate vendor's database."
      >
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map((capability) => (
              <Reveal key={capability.title}>
                <article className="h-full rounded-2xl border border-sky-100 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-sky-950/5">
                  <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    {capability.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {capability.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
      </PlatformSection>

      <PlatformSection tint>
          <Reveal>
            <div className="rounded-[1.75rem] border border-white/90 bg-white/90 px-8 py-14 text-center shadow-sm backdrop-blur-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Runs on Operations 360
              </h2>
              <ul className="mx-auto mt-7 grid max-w-2xl gap-3 text-left text-sm text-slate-600 sm:grid-cols-2">
                {[
                  "Same account record",
                  "No re-keying",
                  "Auditable to BSP Circulars 454/857",
                  "Zero per-seat licensing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="size-5 shrink-0 text-signal-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/operations-360"
                className="mt-9 inline-flex min-h-[44px] items-center gap-2 font-bold text-slate-900 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                See the platform
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
      </PlatformSection>
    </main>
  );
}