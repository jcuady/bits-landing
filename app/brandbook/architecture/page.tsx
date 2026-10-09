import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandbookShell } from "@/components/brandbook/brandbook-shell";
import { CopyButton } from "@/components/brandbook/copy-button";

export const metadata: Metadata = {
  title: "Chapter 05 — Spatial Architecture · BITS Brandbook",
  description:
    "The 4-Layer Spatial Canvas: Bedrock Foundation, Database Dot Lattice, Atmospheric Cloud Vapor, Double-Bezel Glass Cockpit. Code recipes for each layer.",
  alternates: { canonical: "https://www.boundlessits.com/brandbook/architecture" },
  openGraph: {
    title: "BITS Spatial Architecture",
    description: "The 4-Layer Spatial Canvas: code recipes for every BITS surface.",
    url: "https://www.boundlessits.com/brandbook/architecture",
    siteName: "BITS — Boundless IT Solutions",
    type: "article",
    images: [{ url: "/og-brandbook.svg", width: 1200, height: 630, alt: "BITS Spatial Architecture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS Spatial Architecture",
    images: ["/og-brandbook.svg"],
  },
};

const layers: {
  index: string;
  name: string;
  description: string;
  recipe: string;
  language: string;
}[] = [
  {
    index: "0",
    name: "Bedrock Foundation",
    description: "Solid #030B18 (navy-950) or #06162F (navy-900) backdrop. Every BITS surface starts here.",
    recipe: `/* Layer 0 — base background */
.bits-surface {
  background-color: var(--color-navy-950); /* #030B18 */
  color: var(--color-cloud);
  min-height: 100vh;
}`,
    language: "css",
  },
  {
    index: "1",
    name: "Database Dot Lattice",
    description: "Subdued 20–22px dot lattice representing discrete SQL database records. The brand's infrastructure motif.",
    recipe: `/* Layer 1 — database dot lattice */
.bits-dots {
  background-color: var(--color-navy-950);
  background-image: radial-gradient(
    circle,
    rgba(92, 200, 255, 0.10) 1px,
    transparent 1.6px
  );
  background-size: 22px 22px;
  background-position: 0 0;
}`,
    language: "css",
  },
  {
    index: "2",
    name: "Atmospheric Cloud Vapor",
    description: "Soft radial sky gradient creating an ethereal sense of altitude. The brand's high-altitude clarity.",
    recipe: `/* Layer 2 — atmospheric cloud vapor */
.bits-vapor {
  background:
    radial-gradient(
      ellipse 60% 35% at 50% 0%,
      rgba(255, 255, 255, 0.22),
      transparent 65%
    ),
    radial-gradient(
      ellipse 75% 50% at 50% 24%,
      rgba(10, 50, 135, 0.28),
      transparent 75%
    );
  pointer-events: none;
}`,
    language: "css",
  },
  {
    index: "3",
    name: "Double-Bezel Glass Cockpit",
    description: "Nested floating cards: outer hairline ring + concentric inner core. The brand's hardware feel.",
    recipe: `/* Layer 3 — double-bezel glass cockpit */
.bits-cockpit {
  border-radius: 2rem;
  padding: 0.625rem;            /* outer shell */
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(24px);
  box-shadow: 0 30px 80px rgba(3, 13, 28, 0.5);
}
.bits-cockpit__core {
  border-radius: calc(2rem - 0.5rem);
  background: rgba(255, 255, 255, 0.85);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(16px);
}`,
    language: "css",
  },
];

const nextChapter = { title: "Components", href: "/brandbook/components" };

export default function BrandbookArchitecturePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.boundlessits.com/brandbook/architecture",
    url: "https://www.boundlessits.com/brandbook/architecture",
    name: "BITS Spatial Architecture",
    description: "The 4-Layer Spatial Canvas: Bedrock, Dot Lattice, Cloud Vapor, Double-Bezel.",
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": "https://www.boundlessits.com/brandbook#hub" },
  };

  return (
    <BrandbookShell currentChapter="architecture">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CHAPTER HERO ── */}
      <section className="relative px-6 pt-8 pb-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Chapter 05 · Architecture
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The 4-layer canvas.
            <span className="block font-serif italic font-normal tracking-wide text-sky-100">
              Atmosphere is not decoration.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            BITS interfaces reject flat, lifeless digital surfaces. Every surface composes four
            layers — Bedrock, Dot Lattice, Cloud Vapor, Double-Bezel — in that order. Removing one breaks
            the brand.
          </p>
        </div>
      </section>

      {/* ── LAYER STACK ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl space-y-5">
          {layers.map((layer) => (
            <article
              key={layer.index}
              className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-2.5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl"
            >
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-white p-7 sm:p-9">
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <div>
                    <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-blue-600">
                      Layer {layer.index}
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      {layer.name}
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      {layer.description}
                    </p>
                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-2 rounded-t-xl border border-b-0 border-slate-200 bg-slate-100 px-4 py-2">
                        <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                          {layer.language}
                        </span>
                        <CopyButton value={layer.recipe} label="Copy" />
                      </div>
                      <pre className="overflow-x-auto rounded-b-xl border border-slate-200 bg-slate-950 p-5 text-[0.78rem] leading-relaxed text-sky-100">
                        <code>{layer.recipe}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── STACKED VISUAL ── */}
      <section className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/85 p-7 shadow-xl shadow-blue-950/10 backdrop-blur-2xl sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              The full stack, composed
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
              The same layers your surface will use
            </p>

            <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
              <div className="relative h-full w-full">
                {/* Layer 0 */}
                <div className="absolute inset-0 bg-[#030B18]" />
                {/* Layer 1 — Dot Lattice */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(92,200,255,0.10) 1px, transparent 1.6px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                {/* Layer 2 — Cloud Vapor */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(255,255,255,0.22), transparent 65%), radial-gradient(ellipse 75% 50% at 50% 24%, rgba(10,50,135,0.32), transparent 75%)",
                  }}
                />
                {/* Layer 3 — Double-Bezel Cockpit */}
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="relative w-full max-w-md rounded-3xl border border-white/30 bg-white/12 p-2.5 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
                    <div className="rounded-[1.4rem] border border-white/30 bg-white/85 p-7 backdrop-blur-xl">
                      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Layer 3 — Double-Bezel
                      </p>
                      <p className="mt-2 text-lg font-extrabold tracking-tight text-slate-900">
                        The cockpit inside the canvas.
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        A nested floating card, glassmorphic, hardware-feel.
                      </p>
                    </div>
                  </div>
                </div>
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
