import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";
import { CopyButton } from "@/components/brandbook/copy-button";

export const metadata: Metadata = {
  title: "Chapter 03 — Color Tokens · BITS Brandbook",
  description:
    "BITS color system: Bedrock Navy, Boundless Horizon, Cloud Sky Cyan, Electric Action Blue, Sunrise Amber, and more. CSS variables, Tailwind v4 tokens, and the official preset.",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/colors" },
  openGraph: {
    title: "BITS Color Tokens",
    description: "Eight named color roles, CSS variables, Tailwind v4 preset.",
    url: "https://www.boundlessits.com/brandbook/colors",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Color Tokens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Color Tokens",
    images: ["/og-brandbook.svg"],
  },
};

interface ColorToken {
  name: string;
  hex: string;
  cssVar: string;
  tailwind: string;
  usage: string;
  contrast: string;
  foreground: "white" | "navy";
  rgb: string;
}

const tokens: ColorToken[] = [
  {
    name: "Bedrock Navy",
    hex: "#030B18",
    cssVar: "--color-navy-950",
    tailwind: "navy-950",
    usage: "Base background for dark mode, footers, sovereign surfaces.",
    contrast: "—",
    foreground: "white",
    rgb: "rgb(3, 11, 24)",
  },
  {
    name: "Space Navy",
    hex: "#06162F",
    cssVar: "--color-navy-900",
    tailwind: "navy-900",
    usage: "Primary headings, executive cards, cockpits, depth scrim.",
    contrast: "17.5 : 1",
    foreground: "white",
    rgb: "rgb(6, 22, 47)",
  },
  {
    name: "Boundless Horizon",
    hex: "#0284C7",
    cssVar: "--sky-top",
    tailwind: "sky-500",
    usage: "Atmospheric gradient anchors, section banners, sky upper register.",
    contrast: "7.2 : 1",
    foreground: "white",
    rgb: "rgb(2, 132, 199)",
  },
  {
    name: "Cloud Sky Cyan",
    hex: "#38BDF8",
    cssVar: "--color-signal-300",
    tailwind: "signal-300",
    usage: "Accent rings, focus indicators, active waveforms, infinity glow.",
    contrast: "10.4 : 1",
    foreground: "navy",
    rgb: "rgb(56, 189, 248)",
  },
  {
    name: "Electric Action Blue",
    hex: "#2563EB",
    cssVar: "--color-electric-500",
    tailwind: "electric-500",
    usage: "Primary interactive CTA pills, links, active state on the brand mark.",
    contrast: "4.6 : 1",
    foreground: "white",
    rgb: "rgb(37, 99, 235)",
  },
  {
    name: "Stratosphere Vapor",
    hex: "#E0F2FE",
    cssVar: "--color-skywash",
    tailwind: "skywash",
    usage: "Nested card borders, subtle highlight glow, atmospheric high-altitude tones.",
    contrast: "—",
    foreground: "navy",
    rgb: "rgb(224, 242, 254)",
  },
  {
    name: "Cirrus Cloud White",
    hex: "#F8FAFC",
    cssVar: "--color-cloud",
    tailwind: "cloud",
    usage: "Clean light surfaces, high-contrast text, glass card foregrounds.",
    contrast: "16.1 : 1",
    foreground: "navy",
    rgb: "rgb(248, 250, 252)",
  },
  {
    name: "Sunrise Amber",
    hex: "#F59E0B",
    cssVar: "--color-amber-500",
    tailwind: "amber-500",
    usage: "Focal metric, delinquency alerts, PTP metrics, attention badges.",
    contrast: "8.9 : 1",
    foreground: "navy",
    rgb: "rgb(245, 158, 11)",
  },
];

const nextChapter = { title: "Typography", href: "/brandbook/typography" };

const cssRoot = `:root {
  --color-navy-950: #030B18;
  --color-navy-900: #06162F;
  --color-sky-500:  #0284C7;
  --color-signal-300: #38BDF8;
  --color-electric-500: #2563EB;
  --color-skywash: #E0F2FE;
  --color-cloud:  #F8FAFC;
  --color-amber-500: #F59E0B;
}`;

export default function BrandbookColorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/colors",
    url: "https://www.boundlessits.com/brandbook/colors",
    name: "BITS Color Tokens",
    description: "BITS color system with eight named roles, CSS variables, and Tailwind v4 tokens.",
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": "https://www.boundlessits.com/brandbook#hub" },
  };

  return (
    <BrandbookShell currentChapter="colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 03 · Colors
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Eight named roles.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              Every color earns its place.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            The BITS palette bridges high-altitude sky atmosphere with grounded sovereign bedrock. Each
            role has a specific job — depth, action, accent, signal, surface, or alert. There is no
            decorative color.
          </p>
        </div>
      </section>

      {/* ── TOKEN SWATCH GRID ── */}
      <section className="relative px-6 pb-12 sm:px-8 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tokens.map((t) => (
              <article
                key={t.cssVar}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/85 shadow-lg shadow-blue-950/10 backdrop-blur-2xl"
              >
                <div
                  className="relative aspect-[5/3] w-full"
                  style={{ background: t.hex }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
                  <div
                    className={
                      "absolute bottom-3 left-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] " +
                      (t.foreground === "white" ? "text-white" : "text-slate-900")
                    }
                  >
                    {t.hex}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                    {t.name}
                  </h3>
                  <p className="mt-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-blue-600">
                    {t.tailwind} · {t.contrast}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{t.usage}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <CopyButton value={`${t.cssVar}: ${t.hex};`} label="Copy" />
                    <CopyButton value={t.hex} label="Hex" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CSS ROOT — copy-paste ── */}
      <section className="relative px-6 pb-12 sm:px-8 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  CSS root
                </h2>
                <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Drop into your stylesheet
                </p>
              </div>
              <CopyButton value={cssRoot} label="Copy all" />
            </div>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-5 text-[0.78rem] leading-relaxed text-sky-100">
              <code>{cssRoot}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── TAILWIND V4 PRESET ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Tailwind v4 preset
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              Brandbook tokens as Tailwind v4 utilities
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              The full preset ships as <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.78rem]">@preset bits-brand</code>{" "}
              in the asset library — drops into your <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.78rem]">@import "tailwindcss";</code> chain.
              Every token in this chapter becomes a Tailwind utility automatically:{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.78rem]">bg-navy-900</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.78rem]">text-signal-300</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.78rem]">border-cloud</code>.
            </p>
            <a
              href="/brand-tokens/bits-tailwind-preset.css"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800"
            >
              Download preset
              <ArrowRight className="size-4" />
            </a>
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
