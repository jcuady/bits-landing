import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";

export const metadata: Metadata = {
  title: "Chapter 01 — Brand Manifesto · BITS Brandbook",
  description:
    "The BITS brand trinity: the Cloud Horizon (atmosphere and vision), the Infinity Loop (continuous operational cycles), the Grounded Bedrock (sovereign infrastructure).",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/manifesto" },
  openGraph: {
    title: "BITS Brand Manifesto — The Cloud Horizon, The Infinity Loop, The Grounded Bedrock",
    description:
      "The BITS brand trinity and the operational thesis behind the brand.",
    url: "https://www.boundlessits.com/brandbook/manifesto",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Brand Manifesto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Brand Manifesto",
    images: ["/og-brandbook.svg"],
  },
};

const trinity: {
  id: string;
  symbol: string;
  title: string;
  subtitle: string;
  body: string;
}[] = [
  {
    id: "horizon",
    symbol: "↑",
    title: "The Cloud Horizon",
    subtitle: "Atmosphere & vision",
    body:
      "Clouds drift freely without borders. They represent boundless reach, breathability, and high-altitude clarity that rises above the messy day-to-day chaos of disconnected spreadsheets. The horizon is the promise that enterprise software can be as open as the sky it borrows from — the visual world a Floor Manager breathes inside at 2 AM during a campaign.",
  },
  {
    id: "infinity",
    symbol: "∞",
    title: "The Infinity Loop",
    subtitle: "Continuous operational cycles",
    body:
      "The mathematical infinity integrated into the letter B represents continuous automated cycles. In collections and enterprise operations, loops must never break: automated dialing → debtor negotiation → promise-to-pay → payment reconciliation → account rehabilitation → next loop. The brand's geometry encodes the engine's promise: zero dead ends, every transaction advancing through state machines.",
  },
  {
    id: "bedrock",
    symbol: "▮",
    title: "The Grounded Bedrock",
    subtitle: "Sovereign infrastructure",
    body:
      "While the technology scales into the boundless cloud horizon, the foundation is anchored to rock-solid infrastructure: bare-metal server deployments, zero customer PII leakage, strict compliance with the Philippine Data Privacy Act (NPC RA 10173) and Bangko Sentral ng Pilipinas (BSP) statutory regulations. The brand's restraint — no drop shadow on the glyph, fixed gradient angle, never stretched — is the same restraint that ships audit-ready infrastructure.",
  },
];

const mission =
  "To engineer bespoke, high-availability enterprise operating systems that eliminate manual bottlenecks, automate recovery cycles, and protect corporate integrity — without rigid templates or per-user seat penalties.";

const vision =
  "To be the benchmark operating infrastructure for high-scale enterprise — bridging cloud operational speed with sovereign bedrock data security so business scale has no ceiling.";

const nextChapter = { title: "Logo & Infinity B", href: "/brandbook/logo" };

export default function BrandbookManifestoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/manifesto",
    url: "https://www.boundlessits.com/brandbook/manifesto",
    name: "BITS Brand Manifesto",
    description: "The BITS brand trinity: Cloud Horizon, Infinity Loop, Grounded Bedrock.",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebPage",
      "@id": "https://www.boundlessits.com/brandbook#hub",
    },
  };

  return (
    <BrandbookShell currentChapter="manifesto">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-12 sm:px-8 sm:pt-12 sm:pb-16 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 01 · Manifesto
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The brand trinity.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              Three promises, one product.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Most enterprise software confines businesses inside rigid boxes, per-seat penalties, and
            fragmented spreadsheets. BITS operates under a different paradigm — <em>Boundless</em>. The
            brand is the system, and the system is the brand.
          </p>
        </div>
      </section>

      {/* ── TRINITY CARDS ── Three glassmorphic double-bezel cards. */}
      <section className="relative px-6 pb-12 sm:px-8 sm:pb-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {trinity.map((t) => (
            <article
              key={t.id}
              className="group relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/12 p-2.5 shadow-xl shadow-blue-950/20 backdrop-blur-2xl"
            >
              <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/90 p-7 shadow-sm backdrop-blur-xl">
                <div className="font-mono text-4xl font-light leading-none text-slate-300 transition-colors duration-300 group-hover:text-blue-600">
                  {t.symbol}
                </div>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
                  {t.title}
                </h2>
                <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {t.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── OPERATIONAL THESIS ── */}
      <section className="relative px-6 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-8 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              The operational thesis.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              OPERATIONS 360 is the proof. Eighteen connected engines — Collections CRM, sub-350ms
              WebRTC predictive dialer, GPS field tracking, AI speech QA, ERP, HRMS, payroll, warehouse,
              booking, RAG, AI voice agent, NFC, commerce, construction, inventory, logistics, queuing,
              white-label — running as one sovereign system with one flat platform fee.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              The manifesto is not aspirational copy. It is the engineering spec: loops that never break
              (the Infinity), reach that never runs out (the Horizon), infrastructure that never
              compromises (the Bedrock).
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── Editorial brand-essence display,
            mirrors the printed brand-guidelines design. */}
      <section className="relative px-6 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-2.5 shadow-xl shadow-blue-950/20 backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/95 p-8 shadow-sm sm:p-12">

              {/* Top divider with cyan gradient accent (mirroring the print design) */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-blue-500/80" />
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Brand Essence
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-400/70 to-blue-500/80" />
              </div>

              {/* MISSION */}
              <div className="mt-10 text-center">
                <h3 className="font-sans text-3xl font-light uppercase tracking-[0.32em] text-slate-900 sm:text-4xl">
                  Mission
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-slate-700 sm:text-lg">
                  {mission}
                </p>
              </div>

              {/* Mid divider */}
              <div className="my-12 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-blue-500/80" />
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  ∞
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-400/70 to-blue-500/80" />
              </div>

              {/* VISION */}
              <div className="text-center">
                <h3 className="font-sans text-3xl font-light uppercase tracking-[0.32em] text-slate-900 sm:text-4xl">
                  Vision
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-slate-700 sm:text-lg">
                  {vision}
                </p>
              </div>

              {/* Bottom divider */}
              <div className="mt-12 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-blue-500/80" />
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  BITS Brand Guidelines
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-400/70 to-blue-500/80" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CONTINUE TO NEXT CHAPTER ── */}
      <section className="relative px-6 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/25 bg-white/10 px-6 py-4 shadow-lg shadow-blue-950/20 backdrop-blur-md">
          <div>
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-signal-300">
              Next chapter
            </p>
            <p className="text-base font-bold text-white sm:text-lg">{nextChapter.title}</p>
          </div>
          <Link
            href={nextChapter.href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Continue
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </BrandbookShell>
  );
}
