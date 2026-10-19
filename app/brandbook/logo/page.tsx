import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";
import { CopyButton } from "@/components/brandbook/copy-button";

export const metadata: Metadata = {
  title: "Chapter 02 — Official Monogram · BITS Brandbook",
  description:
    "BITS official monogram: the capital B above a horizontal interlocked infinity. Anatomy, clear-space rule, prohibited usage, and the official asset pack.",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/logo" },
  openGraph: {
    title: "BITS Official Monogram",
    description: "B above ∞. The official interlocked monogram, anatomy, and asset pack.",
    url: "https://www.boundlessits.com/brandbook/logo",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Official Monogram" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Official Monogram",
    images: ["/og-brandbook.svg"],
  },
};

const anatomy = [
  {
    label: "B spine",
    note: "Vertical line on the left. Anchors the B and defines the optical axis.",
  },
  {
    label: "B upper bowl",
    note: "D-shape, top. The institutional anchor — solid, sovereign, bank-grade.",
  },
  {
    label: "B lower bowl",
    note: "D-shape, middle. Flows continuously into the upper-left arc of the infinity below.",
  },
  {
    label: "Left ring",
    note: "Left lobe of the ∞. Wedding-band metallic finish.",
  },
  {
    label: "Right ring",
    note: "Right lobe of the ∞. Interlocks the left ring at the top crossing.",
  },
  {
    label: "Crossover",
    note: "Where the two rings weave through each other. Right ring is behind at the top, in front at the bottom — the 3D infinity is the brand.",
  },
  {
    label: "Metallic gradient",
    note: "Top-lit 3D wedding-band silver: bright white highlight, mid gray across the equator, deep shadow on the lower rim.",
  },
  {
    label: "Ground shadow",
    note: "Soft cast shadow beneath the rings. The form sits on a plane, never floats in void.",
  },
];

const doNot: { rule: string; reason: string }[] = [
  {
    rule: "Recolor the metallic finish",
    reason: "The wedding-band silver is the brand. Recolor destroys the institutional 3D weight.",
  },
  {
    rule: "Separate the B from the ∞",
    reason: "They are one form. Detaching them breaks the brandmark and reads as two unrelated marks.",
  },
  {
    rule: "Alter the proportions",
    reason: "B-over-∞ ratios are fixed. Stretching or skewing breaks the visual balance.",
  },
  {
    rule: "Recreate as monoline",
    reason: "The 3D rings require the official asset. A monoline redraw loses the metallic depth.",
  },
  {
    rule: "Add a drop shadow to the rings",
    reason: "The 3D metallic finish is the depth. A flat drop shadow layered on top is decoration, not depth.",
  },
  {
    rule: "Apply brand colors to the rings",
    reason: "Sapphire/cyan is the BITS palette — used in the atmosphere and the supporting system, never on the rings themselves.",
  },
];

const nextChapter = { title: "Color Tokens", href: "/brandbook/colors" };

export default function BrandbookLogoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/logo",
    url: "https://www.boundlessits.com/brandbook/logo",
    name: "BITS Official Monogram",
    description: "B above ∞. Anatomy, clear-space rule, prohibited usage, and asset pack.",
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": "https://www.boundlessits.com/brandbook#hub" },
  };

  return (
    <BrandbookShell currentChapter="logo">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-12 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 02 · Official Monogram
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            B above <span className="font-serif italic font-normal tracking-wide text-sky-100">∞</span>.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              One form. Sovereign.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            The capital B sits above a horizontal infinity loop formed by two interlocked wedding-band
            rings. The B is the institutional anchor. The ∞ is the unbroken operational cycle. The
            interlock is the brand — together, never separate, never recolored, never redrawn.
          </p>
        </div>
      </section>

      {/* ── ANATOMY DIAGRAM ── */}
      <section className="relative px-6 pb-12 sm:px-8 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <div className="grid gap-10 md:grid-cols-[280px_1fr]">
              {/* Emblem display — the ACTUAL official monogram */}
              <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-8">
                <Image
                  src="/brand/bits-monogram-official.png"
                  alt="BITS official monogram — capital B above a horizontal interlocked infinity, wedding-band metallic finish"
                  width={512}
                  height={512}
                  sizes="(max-width: 768px) 176px, 280px"
                  className="size-44"
                  priority
                />
              </div>

              {/* Anatomy labels */}
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Anatomy</h2>
                <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  8 named regions
                </p>
                <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {anatomy.map((a) => (
                    <div key={a.label} className="leading-snug">
                      <dt className="text-sm font-bold text-slate-900">{a.label}</dt>
                      <dd className="text-xs text-slate-600">{a.note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLEAR-SPACE RULE ── */}
      <section className="relative px-6 pb-12 sm:px-8 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Clear-space rule
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              50% emblem height · all four sides
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-blue-300 bg-blue-50/40 p-8">
                <div className="relative size-44">
                  <div className="absolute inset-0 grid place-items-center">
                    {/* The ACTUAL official monogram at 50% size */}
                    <Image
                      src="/brand/bits-monogram-official.png"
                      alt="BITS monogram shown at 50% of the available clear-space box"
                      width={256}
                      height={256}
                      sizes="112px"
                      className="size-28"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue-400/70" />
                </div>
              </div>

              <div>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  Maintain at least <strong>50% of the emblem&apos;s height</strong> as clear space on all
                  four sides. The clear space scales with the emblem — never absolute pixels. No
                  typography, no other marks, no edges of the layout may enter the clear space.
                </p>
                <div className="mt-4">
                  <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Copy the pattern
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <code className="font-mono text-[0.72rem] leading-snug text-slate-700">
                      padding = 0.5 × emblemHeight
                    </code>
                    <CopyButton value="padding: 0.5 * emblemHeight;" label="Copy CSS" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROHIBITED USAGE ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Prohibited usage
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              The emblem is the brand. Modifications break it.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {doNot.map((d) => (
                <li
                  key={d.rule}
                  className="flex items-start gap-3 rounded-xl border border-rose-200/60 bg-rose-50/40 p-4"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{d.rule}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{d.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── OFFICIAL EMBLEM ASSETS ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Official emblem assets
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              PNG · transparent background · scalable
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Official monogram (B + ∞)",
                  file: "/brand/bits-monogram-official.png",
                  size: "435 KB",
                },
                {
                  name: "Mark — sapphire tile",
                  file: "/brand/mark-tile.png",
                  size: "12 KB",
                },
                {
                  name: "Horizontal — dark on light",
                  file: "/brand/logo-horizontal.png",
                  size: "18 KB",
                },
                {
                  name: "Horizontal — reverse",
                  file: "/brand/logo-reverse.png",
                  size: "18 KB",
                },
                {
                  name: "Stacked — icon + text",
                  file: "/brand/logo-stacked.png",
                  size: "24 KB",
                },
                {
                  name: "Mark — transparent",
                  file: "/brand/mark.png",
                  size: "16 KB",
                },
              ].map((a) => (
                <a
                  key={a.name}
                  href={a.file}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-500/50 hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">{a.name}</p>
                    <p className="font-mono text-[0.66rem] text-slate-500">
                      {a.file} · {a.size}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              <Check className="mr-1 inline size-3.5 text-emerald-500" />
              All emblems ship as PNG. The official monogram is the canonical mark — use it as the
              primary brand asset.
            </p>
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
