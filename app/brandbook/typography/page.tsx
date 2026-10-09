import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";

export const metadata: Metadata = {
  title: "Chapter 04 — Typography · BITS Brandbook",
  description:
    "BITS typography stack: Geist Sans (primary), Instrument Serif italic (emphasis), Geist Mono (numerics). Type ramp, usage rules, and face pairings.",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/typography" },
  openGraph: {
    title: "BITS Typography",
    description: "Geist Sans, Instrument Serif italic, Geist Mono — face stack and ramp.",
    url: "https://www.boundlessits.com/brandbook/typography",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Typography" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Typography",
    images: ["/og-brandbook.svg"],
  },
};

const specimens: {
  face: string;
  role: string;
  weights: string;
  usage: string;
  cssFamily: string;
  specimens: { size: string; label: string; weight: string; sample: string }[];
}[] = [
  {
    face: "Geist Sans",
    role: "Primary — body, navigation, table cells, dashboard chrome",
    weights: "400, 500, 600",
    usage: "Default for everything except emphasis italics. Tabular figures, optical balance at small sizes.",
    cssFamily: "var(--font-jakarta), ui-sans-serif, system-ui",
    specimens: [
      { size: "0.68rem", label: "Kicker / micro", weight: "600", sample: "BRANDBOOK · v3.4" },
      { size: "0.85rem", label: "Caption", weight: "500", sample: "WCAG 2.1 AA · contrast verified" },
      { size: "1rem", label: "Body", weight: "400", sample: "The infinity loop integrated into the B is hand-drawn." },
      { size: "1.25rem", label: "Lead", weight: "500", sample: "Eight named colors, each with a specific job." },
      { size: "2rem", label: "H3", weight: "700", sample: "Spatial Architecture" },
      { size: "3rem", label: "H1 mobile", weight: "800", sample: "Cloud Horizon." },
    ],
  },
  {
    face: "Instrument Serif Italic",
    role: "Emphasis — italic line 3 of headlines, poetic accent",
    weights: "400 italic",
    usage: "Reserved for the third line of three-line headlines and editorial accent. Never the first line, never body copy, never UI chrome.",
    cssFamily: '"Instrument Serif", Georgia, Cambria, serif',
    specimens: [
      { size: "1.5rem", label: "Italic accent (small)", weight: "400 italic", sample: "The open sky has no ceiling." },
      { size: "2.5rem", label: "Italic accent (medium)", weight: "400 italic", sample: "One connected platform." },
      { size: "3.5rem", label: "Italic accent (large)", weight: "400 italic", sample: "The Grounded Bedrock." },
    ],
  },
  {
    face: "Geist Mono",
    role: "Numerics — financial sums, transaction IDs, telephone numbers, timestamps",
    weights: "500",
    usage: "For data that must align in columns. Tabular numerals. Reserved for code-adjacent surfaces and metrics.",
    cssFamily: '"Geist Mono", ui-monospace, monospace',
    specimens: [
      { size: "0.78rem", label: "Token / file path", weight: "500", sample: "/brand/bits-monogram-official.png · 435 KB" },
      { size: "0.95rem", label: "Metric", weight: "500", sample: "₱1,850 / seat / month" },
      { size: "1.5rem", label: "Headline metric", weight: "500", sample: "3.2× · 99.9% · sub-350ms" },
    ],
  },
];

const nextChapter = { title: "Spatial Architecture", href: "/brandbook/architecture" };

export default function BrandbookTypographyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/typography",
    url: "https://www.boundlessits.com/brandbook/typography",
    name: "BITS Typography",
    description: "BITS typography stack: Geist Sans, Instrument Serif italic, Geist Mono.",
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": "https://www.boundlessits.com/brandbook#hub" },
  };

  return (
    <BrandbookShell currentChapter="typography">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 04 · Typography
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Three faces.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              One voice.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Geist Sans for everything. Instrument Serif italic for the third line. Geist Mono for
            data. The face stack is deliberately narrow — three faces earn the brand, not a roster of
            styles that drift.
          </p>
        </div>
      </section>

      {/* ── SPECIMEN STACK ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl space-y-6">
          {specimens.map((s) => (
            <article
              key={s.face}
              className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-200 pb-5">
                <div>
                  <h2
                    className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
                    style={{ fontFamily: s.cssFamily }}
                  >
                    {s.face}
                  </h2>
                  <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {s.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[0.66rem] text-slate-500">Weights</p>
                  <p className="font-mono text-xs font-semibold text-slate-700">{s.weights}</p>
                </div>
              </header>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
                {s.usage}
              </p>

              <ul className="mt-7 space-y-5">
                {s.specimens.map((spec) => (
                  <li
                    key={spec.label}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b border-slate-100 pb-4 last:border-b-0"
                  >
                    <div>
                      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {spec.label}
                      </p>
                      <p className="font-mono text-[0.66rem] text-slate-400">
                        {spec.size} · {spec.weight}
                      </p>
                    </div>
                    <p
                      className="text-slate-900"
                      style={{
                        fontFamily: s.cssFamily,
                        fontSize: spec.size,
                        fontWeight: spec.weight,
                        lineHeight: 1.3,
                      }}
                    >
                      {spec.sample}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── PAIRING RULE ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              The pairing rule
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              Sans + italic serif · always on the third line
            </p>

            <div className="mt-7 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  ✓ Correct
                </p>
                <p
                  className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
                >
                  Your Field Team.
                  <br />
                  Your Call Floor.
                  <br />
                  <span className="font-serif italic font-normal tracking-wide text-blue-600">
                    One System.
                  </span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-rose-600">
                  ✗ Avoid
                </p>
                <p
                  className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
                >
                  <span className="font-serif italic font-normal tracking-wide text-rose-400">
                    Your Field
                  </span>{" "}
                  Team. Your Call Floor. One System.
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Italic serif on the first line or on body copy dilutes the brand.
                </p>
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
