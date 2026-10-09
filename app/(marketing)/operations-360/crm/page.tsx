import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

/**
 * BITScrm — the CRM module of Operations 360.
 *
 * Consolidated from /bitscrm (CPO decision, Rev 2: CRM is a module of the
 * platform, not a rival product). /bitscrm 301s here to preserve its
 * accumulated authority while removing the self-cannibalisation against
 * /products/crm and /products/collections.
 */

const CAPABILITIES = [
  {
    title: "Recover the accounts",
    body: "Collections-native pipeline with DPD aging, co-maker tracking and an automated interest ledger — not a generic sales CRM retrofitted for debt.",
  },
  {
    title: "Predictive dialing built in",
    body: "The softphone is not an integration. Screen-pop, dispositioning and PTP scheduling happen inside the same record the dialer opened.",
  },
  {
    title: "PTP to settlement",
    body: "Countdown to the promise window, single-use QR Ph links, and Maya/GCash settlement webhooks that close the loop without a manual reconciliation.",
  },
  {
    title: "Supervisor oversight",
    body: "Silent listen, coaching whisper and barge-in from the same command view the floor manager already runs.",
  },
] as const;

export const metadata: Metadata = {
  title: "BITScrm — Collections CRM Module of Operations 360 | BITS",
  description:
    "BITScrm is the collections CRM module inside Operations 360: pipeline, PTP automation, predictive dialing and supervisor oversight on one shared database. Zero per-seat licensing.",
  keywords: [
    "bitscrm",
    "collections crm software philippines",
    "debt collection software philippines",
    "predictive dialer crm",
    "supervisory call monitoring crm",
    "bsp collections compliance software",
    "omnichannel contact center crm",
  ],
  alternates: { canonical: `${site.url}/operations-360/crm` },
  openGraph: {
    title: "BITScrm — Collections CRM Module of Operations 360",
    description:
      "Recover the accounts. Collections-native CRM on the Operations 360 database.",
    url: `${site.url}/operations-360/crm`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITScrm — Collections CRM Module" }],
  },
};

export default function BitsCrmModulePage() {
  return (
    <main id="content" className="bg-navy-950 text-white">
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
              Recover the accounts.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-skywash/80">
              BITScrm is a collections CRM, not a sales CRM with debt bolted on.
              It ships inside Operations 360 and runs on the same database — so
              there is nothing to integrate and no second system to reconcile.
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
                  "One shared database",
                  "Zero duplicated infrastructure",
                  "Zero per-seat licensing",
                  "One compliance posture",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="size-3.5 shrink-0 text-signal-300" aria-hidden />
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