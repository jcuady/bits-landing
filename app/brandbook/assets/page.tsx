import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileCode, FileImage, FileJson, FileType } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";

export const metadata: Metadata = {
  title: "Chapter 07 — Asset Library · BITS Brandbook",
  description:
    "The full BITS brand asset library: emblems, hero imagery, regulatory seals, color tokens as CSS/JSON, Tailwind v4 preset, sample product UI.",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/assets" },
  openGraph: {
    title: "BITS Asset Library",
    description: "The full BITS brand asset library: emblems, hero imagery, regulatory seals, tokens, sample UI.",
    url: "https://www.boundlessits.com/brandbook/assets",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Asset Library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Asset Library",
    images: ["/og-brandbook.svg"],
  },
};

const logos = [
  { name: "Official monogram (B + ∞)", file: "/brand/bits-monogram-official.png", size: "435 KB", format: "PNG" },
  { name: "Mark — sapphire tile", file: "/brand/mark-tile.png", size: "12 KB", format: "PNG" },
  { name: "Horizontal — dark on light", file: "/brand/logo-horizontal.png", size: "18 KB", format: "PNG" },
  { name: "Horizontal — reverse", file: "/brand/logo-reverse.png", size: "18 KB", format: "PNG" },
  { name: "Stacked — icon + text", file: "/brand/logo-stacked.png", size: "24 KB", format: "PNG" },
  { name: "Mark — transparent", file: "/brand/mark.png", size: "16 KB", format: "PNG" },
];

const hero = [
  { name: "Azure sky backdrop", file: "/images/hero-sky-bg.jpg", size: "320 KB", format: "JPG" },
  { name: "Brandbook showcase HTML", file: "/bits-emblem-showcase.html", size: "12 KB", format: "HTML" },
];

const tokens = [
  { name: "Color tokens — CSS", file: "/brand-tokens/bits-tokens.css", size: "1.2 KB", format: "CSS", icon: FileCode },
  { name: "Color tokens — JSON", file: "/brand-tokens/bits-tokens.json", size: "1.4 KB", format: "JSON", icon: FileJson },
  { name: "Tailwind v4 preset", file: "/brand-tokens/bits-tailwind-preset.css", size: "2.1 KB", format: "CSS", icon: FileCode },
  { name: "Token README", file: "/brandbook/README.md", size: "2.8 KB", format: "MD", icon: FileType },
];

const seals = [
  { name: "BSP Regulatory Alignment", file: "/brand/bsp-seal.svg", size: "2.1 KB", format: "SVG" },
  { name: "NPC Privacy Principles", file: "/brand/npc-logo.svg", size: "2.0 KB", format: "SVG" },
  { name: "SEC Operational Guidelines", file: "/brand/sec-logo.svg", size: "1.9 KB", format: "SVG" },
  { name: "CIC Credit Reporting", file: "/brand/cic-logo.svg", size: "1.8 KB", format: "SVG" },
  { name: "ISO/IEC 27001 Aligned", file: "/brand/iso-logo.svg", size: "2.0 KB", format: "SVG" },
  { name: "DICT Cloud Cybersecurity", file: "/brand/dict-logo.svg", size: "1.7 KB", format: "SVG" },
];

const references = [
  { name: "Social media brand reference", file: "/brand-tokens/social-media-guide.md", size: "16 KB", format: "MD" },
  { name: "Brandbook README & integration guide", file: "/brandbook/README.md", size: "2.8 KB", format: "MD" },
];

export default function BrandbookAssetsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/assets",
    url: "https://www.boundlessits.com/brandbook/assets",
    name: "BITS Asset Library",
    description: "BITS brand asset library: emblems, hero imagery, regulatory seals, color tokens, Tailwind v4 preset.",
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": "https://www.boundlessits.com/brandbook#hub" },
  };

  return (
    <BrandbookShell currentChapter="assets">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 07 · Asset Library
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Download the system.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              Every file the brand needs.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Emblems, hero imagery, color tokens, the Tailwind v4 preset, regulatory seals, and a
            sample of the BITS product UI built on the system. Drop into your repo.
          </p>
        </div>
      </section>

      <AssetSection
        index="01"
        name="Official monogram & companion marks"
        note="The official monogram is PNG. Companion marks for legacy contexts."
        items={logos}
      />

      <AssetSection
        index="02"
        name="Hero imagery"
        note="Atmospheric sky + emblem showcase. Public / Brand Guidelines."
        items={hero}
      />

      <AssetSection
        index="03"
        name="Color tokens"
        note="CSS variables, JSON, Tailwind v4 preset. Drop in, ship the brand."
        items={tokens}
      />

      <AssetSection
        index="04"
        name="Regulatory seals"
        note="Six statutory alignments. Use in compliance surfaces and trust strips."
        items={seals}
      />

      <AssetSection
        index="05"
        name="Brand references"
        note="Spec documentation for partners, agencies, and AI design tools."
        items={references}
      />

      {/* ── CLOSING BACK TO HUB ── */}
      <section className="relative px-6 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/25 bg-white/10 px-6 py-4 shadow-lg shadow-blue-950/20 backdrop-blur-md">
          <div>
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-signal-300">
              End of brandbook
            </p>
            <p className="text-base font-bold text-white sm:text-lg">Back to the hub</p>
          </div>
          <Link
            href="/brandbook"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Hub
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </BrandbookShell>
  );
}

function AssetSection({
  index,
  name,
  note,
  items,
}: {
  index: string;
  name: string;
  note: string;
  items: { name: string; file: string; size: string; format: string; icon?: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <section className="relative px-6 pb-12 sm:px-8 sm:pb-16 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
          <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-blue-600">
                Asset pack {index}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {name}
              </h2>
            </div>
            <p className="max-w-md font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">
              {note}
            </p>
          </header>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => {
              const Icon = a.icon ?? FileImage;
              return (
                <li key={a.name}>
                  <a
                    href={a.file}
                    className="group flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-500/50 hover:shadow-md"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-700 transition-colors group-hover:bg-blue-600/10 group-hover:text-blue-600">
                      <Icon className="size-4" />
                    </span>
                    <div className="flex-1 leading-snug">
                      <p className="text-sm font-bold text-slate-900">{a.name}</p>
                      <p className="font-mono text-[0.66rem] text-slate-500">
                        {a.format} · {a.size}
                      </p>
                      <p className="font-mono text-[0.62rem] text-slate-400 truncate">{a.file}</p>
                    </div>
                    <Download className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-y-0.5 group-hover:text-blue-600" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
