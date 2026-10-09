import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";
import { CopyButton } from "@/components/brandbook/copy-button";

export const metadata: Metadata = {
  title: "Chapter 06 — Components · BITS Brandbook",
  description:
    "Six copy-paste recipes built on the BITS design system: Atmospheric Backdrop, Glass Card, Double-Bezel Cockpit, Sapphire Badge, Pill Button, Stat Card.",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/components" },
  openGraph: {
    title: "BITS Components",
    description: "Six copy-paste recipes for the BITS design system.",
    url: "https://www.boundlessits.com/brandbook/components",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Components" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Components",
    images: ["/og-brandbook.svg"],
  },
};

const nextChapter = { title: "Asset Library", href: "/brandbook/assets" };

export default function BrandbookComponentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/components",
    url: "https://www.boundlessits.com/brandbook/components",
    name: "BITS Components",
    description: "Six copy-paste recipes for the BITS design system.",
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": "https://www.boundlessits.com/brandbook#hub" },
  };

  return (
    <BrandbookShell currentChapter="components">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 06 · Components
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Six recipes.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              Built from the system.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Every component on the BITS landing surface and the authenticated CRM is composed from
            these six recipes. Drop them in, copy the code, ship the brand.
          </p>
        </div>
      </section>

      {/* ── RECIPE 1: ATMOSPHERIC BACKDROP ── */}
      <Recipe
        index="01"
        name="Atmospheric Backdrop"
        description="The 4-layer canvas. Mounts as a fixed positioned container behind every BITS surface."
        language="tsx"
        recipe={`export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 0: Azure sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b
          from-[#1362df] via-[#2377f3] 45%
          via-[#3c8bf6] 75% to-[#5ea2f9]" />

        {/* Layer 1: Sky + clouds */}
        <Image src="/images/hero-sky-bg.jpg" alt="" fill priority />

        {/* Layer 2: Sunbreak bloom */}
        <div className="absolute inset-0 bg-[radial-gradient(
          ellipse_60%_35%_at_50%_0%,
          rgba(255,255,255,0.22),
          transparent_65%)]" />

        {/* Layer 3: Sapphire vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(
          ellipse_75%_50%_at_50%_24%,
          rgba(10,50,135,0.32),
          transparent_75%)]" />
      </div>
    </div>
  );
}`}
        preview={
          <div className="relative h-40 overflow-hidden rounded-2xl border border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1362df] via-[#2377f3] 45% via-[#3c8bf6] 75% to-[#5ea2f9]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1.4px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(255,255,255,0.22),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_24%,rgba(10,50,135,0.32),transparent_75%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white">
                Layer 0 · 1 · 2 · 3 composed
              </p>
            </div>
          </div>
        }
      />

      {/* ── RECIPE 2: GLASS CARD ── */}
      <Recipe
        index="02"
        name="Glass Card"
        description="Single-bezel frosted glass. Default surface for content."
        language="tsx"
        recipe={`export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/30
      bg-white/85 p-7 shadow-xl
      shadow-blue-950/10 backdrop-blur-2xl">
      {children}
    </div>
  );
}`}
        preview={
          <div className="rounded-3xl border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              Glass Card
            </p>
            <p className="mt-2 text-base font-extrabold tracking-tight text-slate-900">
              Single-bezel frosted surface.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              For content that should breathe — KPIs, narrative cards, hub tiles.
            </p>
          </div>
        }
      />

      {/* ── RECIPE 3: DOUBLE-BEZEL COCKPIT ── */}
      <Recipe
        index="03"
        name="Double-Bezel Glass Cockpit"
        description="The hub & hero card. Two nested bezels. The brand's hardware feel."
        language="tsx"
        recipe={`export function Cockpit({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/30
      bg-white/12 p-2.5 shadow-2xl
      shadow-blue-950/30 backdrop-blur-2xl">
      <div className="rounded-[1.75rem] border border-white/30
        bg-white/85 p-9 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}`}
        preview={
          <div className="rounded-[2rem] border border-white/30 bg-white/12 p-2.5 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
            <div className="rounded-[1.75rem] border border-white/30 bg-white/85 p-6 backdrop-blur-xl">
              <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Double-Bezel
              </p>
              <p className="mt-2 text-base font-extrabold tracking-tight text-slate-900">
                Cockpit inside cockpit.
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Two nested glass surfaces. The hero card pattern.
              </p>
            </div>
          </div>
        }
      />

      {/* ── RECIPE 4: SAPPHIRE BADGE ── */}
      <Recipe
        index="04"
        name="Sapphire Badge"
        description="Pill badge with cyan pulse + uppercase tracking. Section kickers, status indicators, license tags."
        language="tsx"
        recipe={`export function SapphireBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2
      rounded-full border border-white/30
      bg-white/15 px-4 py-1.5 shadow-sm
      backdrop-blur-md">
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full
          animate-ping rounded-full
          bg-cyan-300 opacity-75" />
        <span className="relative inline-flex
          size-2 rounded-full bg-cyan-400" />
      </span>
      <span className="font-mono text-[0.7rem]
        font-bold uppercase
        tracking-[0.2em] text-white">
        {children}
      </span>
    </div>
  );
}`}
        preview={
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
              </span>
              <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-900">
                OPERATIONS 360
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="size-2 rounded-full bg-blue-600" />
              <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-700">
                BSP CIRCULAR 454
              </span>
            </div>
          </div>
        }
      />

      {/* ── RECIPE 5: PILL BUTTON ── */}
      <Recipe
        index="05"
        name="Pill Button"
        description="Primary action with sapphire arrow. Reserved for the single most important action on a surface."
        language="tsx"
        recipe={`export function PillButton({ label, href }: { label: string; href: string }) {
  return (
    <a href={href}
      className="group inline-flex h-13 min-w-[200px]
        items-center justify-between gap-3
        rounded-full bg-white px-7
        font-bold text-slate-900
        shadow-xl shadow-blue-950/30
        transition-all duration-300
        hover:bg-slate-50 hover:shadow-2xl
        hover:scale-[1.02]">
      <span className="text-[0.95rem]
        tracking-tight">{label}</span>
      <span className="flex size-8 items-center
        justify-center rounded-full
        bg-blue-600 text-xs text-white
        shadow-sm transition-transform
        duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}`}
        preview={
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex h-13 min-w-[200px] items-center justify-between gap-3 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/30"
            >
              <span className="text-[0.95rem] tracking-tight">Book a Consultation</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-xs text-white shadow-sm">
                →
              </span>
            </a>
            <a
              href="#"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/40 bg-blue-600/90 px-6 font-bold text-white shadow-lg shadow-blue-900/30 backdrop-blur-md"
            >
              <span className="text-[0.95rem]">Explore OPERATIONS 360</span>
            </a>
          </div>
        }
      />

      {/* ── RECIPE 6: STAT CARD ── */}
      <Recipe
        index="06"
        name="Stat Card"
        description="Number + label tile. The Difference section, ROI calculator, hero stats."
        language="tsx"
        recipe={`export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200
      bg-white p-6 shadow-md">
      <p className="font-mono text-4xl font-extrabold
        leading-none text-slate-900">
        {value}
      </p>
      <p className="mt-2 font-mono text-[0.7rem]
        font-semibold uppercase
        tracking-[0.18em] text-slate-500">
        {label}
      </p>
    </div>
  );
}`}
        preview={
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "3.2×", label: "Right-party connect" },
              { value: "45%", label: "Broken-PTP reduction" },
              { value: "99.9%", label: "Telephony SLA" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                <p className="font-mono text-3xl font-extrabold leading-none text-slate-900">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        }
      />

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

function Recipe({
  index,
  name,
  description,
  language,
  recipe,
  preview,
}: {
  index: string;
  name: string;
  description: string;
  language: string;
  recipe: string;
  preview: React.ReactNode;
}) {
  return (
    <section className="relative px-6 pb-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-2.5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-white p-7 sm:p-9">
            <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-200 pb-5">
              <div>
                <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Recipe {index}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {name}
                </h2>
              </div>
            </header>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              {description}
            </p>

            {/* Preview */}
            <div className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-8">
              {preview}
            </div>

            {/* Recipe code */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-2 rounded-t-xl border border-b-0 border-slate-200 bg-slate-100 px-4 py-2">
                <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  {language}
                </span>
                <CopyButton value={recipe} label="Copy" />
              </div>
              <pre className="overflow-x-auto rounded-b-xl border border-slate-200 bg-slate-950 p-5 text-[0.78rem] leading-relaxed text-sky-100">
                <code>{recipe}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
