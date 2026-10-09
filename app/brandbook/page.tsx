import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";

export const metadata: Metadata = {
  title: "BITS Brandbook — The Cloud Horizon, The Infinity Loop, The Grounded Bedrock",
  description:
    "The authoritative BITS brand identity and design system dossier. Logo anatomy, color tokens, typography, glassmorphism architecture, and the full asset library. Boundless IT Solutions · 2026 Edition.",
  keywords: [
    "BITS brandbook",
    "BITS brand guidelines",
    "BITS design system",
    "Boundless IT Solutions brand",
    "infinity B monogram",
    "glassmorphism design",
    "azure sky brand",
    "BITS color tokens",
    "BITS tailwind preset",
  ],
  alternates: { canonical: "https://www.boundlessits.com/brandbook" },
  openGraph: {
    title: "BITS Brandbook — The Cloud Horizon, The Infinity Loop, The Grounded Bedrock",
    description:
      "The authoritative BITS brand identity and design system dossier. Logo, colors, typography, architecture, components, assets.",
    url: "https://www.boundlessits.com/brandbook",
    siteName: "BITS — Boundless IT Solutions",
    type: "website",
    images: [
      {
        url: "/og-brandbook.svg",
        width: 1200,
        height: 630,
        alt: "BITS Brandbook — The Cloud Horizon, The Infinity Loop, The Grounded Bedrock",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Brandbook",
    description:
      "The authoritative BITS brand identity and design system dossier. Logo, colors, typography, architecture, components, assets.",
    images: ["/og-brandbook.svg"],
  },
};

const chapters: {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    id: "manifesto",
    number: "01",
    title: "Manifesto",
    description: "The Cloud Horizon, The Infinity Loop, The Grounded Bedrock — the brand's three promises.",
    href: "/brandbook/manifesto",
  },
  {
    id: "logo",
    number: "02",
    title: "Official Monogram",
    description: "B above ∞. Anatomy, clear-space, prohibited usage, and the official asset pack.",
    href: "/brandbook/logo",
  },
  {
    id: "colors",
    number: "03",
    title: "Color Tokens",
    description: "Eight named roles, copy-paste CSS variables, Tailwind v4 preset download.",
    href: "/brandbook/colors",
  },
  {
    id: "typography",
    number: "04",
    title: "Typography",
    description: "Geist Sans, Instrument Serif italic, Geist Mono — face stack and type ramp.",
    href: "/brandbook/typography",
  },
  {
    id: "architecture",
    number: "05",
    title: "Spatial Architecture",
    description: "The 4-Layer Spatial Canvas: Bedrock, Dot Lattice, Cloud Vapor, Double-Bezel.",
    href: "/brandbook/architecture",
  },
  {
    id: "components",
    number: "06",
    title: "Components",
    description: "Six copy-paste recipes built on the BITS design system.",
    href: "/brandbook/components",
  },
  {
    id: "assets",
    number: "07",
    title: "Asset Library",
    description: "Emblems, hero imagery, regulatory seals, color tokens, Tailwind preset, sample UI.",
    href: "/brandbook/assets",
  },
];

const hubJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.boundlessits.com/brandbook#hub",
  url: "https://www.boundlessits.com/brandbook",
  name: "BITS Brandbook — The Cloud Horizon, The Infinity Loop, The Grounded Bedrock",
  description:
    "The authoritative BITS brand identity and design system dossier covering logo, colors, typography, architecture, components, and the full asset library.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://www.boundlessits.com/#website",
    name: "BITS — Boundless IT Solutions",
  },
  hasPart: chapters.map((c) => ({
    "@type": "WebPage",
    name: `BITS Brandbook — ${c.title}`,
    url: `https://www.boundlessits.com${c.href}`,
  })),
};

export default function BrandbookHubPage() {
  return (
    <BrandbookShell currentChapter="hub">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
      />

      {/* ── HERO ── Atmospheric composition matching the reference image. */}
      <section className="relative px-6 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-28 lg:px-10 lg:pt-28 lg:pb-32">
        <div className="mx-auto flex max-w-7xl flex-col">
          {/* Pill kicker */}
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
            </span>
            <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white">
              Brandbook · 7 Chapters · v3.4
            </span>
          </div>

          {/* Headline — three lines, third in italic serif cyan */}
          <h1 className="max-w-5xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
            <span className="block">The Cloud Horizon.</span>
            <span className="block mt-1 sm:mt-2">The Infinity Loop.</span>
            <span className="block mt-1 sm:mt-2 font-serif italic font-normal tracking-wide text-sky-100">
              The Grounded Bedrock.
            </span>
          </h1>

          {/* Subhead — brand thesis, one sentence */}
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/95 sm:text-xl lg:text-2xl">
            The open sky has no ceiling. Your enterprise operations should have no limits.
          </p>

          <p className="mt-3 max-w-2xl text-sm font-normal leading-relaxed text-white/80 sm:text-base">
            BITS is a system, not a logo. The atmosphere, the engine, and the foundation are one product —
            documented here so partners, agencies, and press can produce work that holds the brand.
          </p>

          {/* Primary CTA: enter the brandbook */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/brandbook/manifesto"
              className="group inline-flex h-14 min-w-[260px] items-center justify-between gap-3 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/30 transition-all duration-300 hover:bg-slate-50 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-base tracking-tight">Enter the Brandbook</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-xs text-white shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              href="/brandbook/assets"
              className="inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 font-bold text-white shadow-lg shadow-blue-900/20 backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <span className="text-base">Jump to Asset Library</span>
            </Link>
          </div>

          {/* Back to main site */}
          <div className="mt-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white"
              aria-label="Back to BITS main website homepage"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to boundlessits.com</span>
            </Link>
          </div>

          {/* Canonical URL line */}
          <p className="mt-8 font-mono text-xs font-medium tracking-tight text-white/75 sm:text-sm">
            www.boundlessits.com<span className="text-signal-300">/brandbook</span>
          </p>
        </div>
      </section>

      {/* ── CHAPTER NAVIGATION CARD ── Double-bezel glassmorphic card,
            mirrors the reference image's "What is included" pattern. */}
      <section className="relative px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/12 p-2.5 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-3.5 lg:p-4"
          >
            {/* Inner core — concentric bezel */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/85 p-7 shadow-inner sm:rounded-[2rem] sm:p-9 lg:p-12 backdrop-blur-xl">
              <div className="mb-7 flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  What you&apos;ll find
                </h2>
                <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  7 chapters · 1 system
                </span>
              </div>

              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {chapters.map((c) => (
                  <li key={c.id} className="group/chapter flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <Link
                      href={c.href}
                      className="flex-1 leading-snug text-slate-700 transition-colors hover:text-blue-700"
                    >
                      <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Chapter {c.number}
                      </span>
                      <span className="block text-base font-bold text-slate-900 group-hover/chapter:text-blue-700">
                        {c.title}
                      </span>
                      <span className="block text-sm text-slate-600">{c.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING POSITIONING ── The brand is sovereign, the spec is open. */}
      <section className="relative px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Authoritative Brand Identity & Design System Dossier
          </p>
          <p className="mt-4 text-lg font-medium text-white sm:text-xl">
            BITS is sovereign software for high-velocity Philippine operations — 18 connected engines, one
            flat platform fee, 100% data residency. The brand is the system. The system is the brand.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Public / Brand Guidelines · 2026 Edition · Design System v3.4
          </p>
        </div>
      </section>
    </BrandbookShell>
  );
}
