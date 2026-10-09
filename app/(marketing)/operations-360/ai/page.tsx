import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
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
    <main id="content" className="bg-navy-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="bg-navy-950">
        <Container>
          <Reveal>
            <Link
              href="/operations-360"
              className="inline-flex items-center gap-2 text-sm font-medium text-mist transition hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Operations 360
            </Link>
          </Reveal>

          <Reveal>
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-signal-300">
              Module of Operations 360
            </p>
          </Reveal>

          <Reveal>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Automate the floor.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-skywash/80">
              BITSagent AI is not a separate product bolted on the side. It
              operates on the Operations 360 record, so the agent, the agent
              floor, and the compliance trail are the same system.
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

      <Section className="bg-navy-900" tight>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map((capability) => (
              <Reveal key={capability.title}>
                <article className="h-full rounded-2xl border border-white/10 bg-navy-800/60 p-7">
                  <h2 className="text-lg font-semibold text-white">
                    {capability.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {capability.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-navy-950" tight>
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-navy-800/60 px-8 py-14 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Runs on Operations 360
              </h2>
              <ul className="mx-auto mt-7 grid max-w-2xl gap-3 text-left text-sm text-mist sm:grid-cols-2">
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
                className="mt-9 inline-flex items-center gap-2 font-semibold text-white transition hover:text-signal-300"
              >
                See the platform
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}