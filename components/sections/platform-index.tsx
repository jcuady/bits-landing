"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { track } from "@vercel/analytics";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getPlatform, CATALOG_CLAIM } from "@/lib/products/platform";

/**
 * PlatformIndex — the Operations 360 hub.
 *
 * STRUCTURE (CPO decision, Rev 5):
 *   Static   Collections CRM & PTP · Predictive Dialer
 *            Establishes the operational baseline.
 *   Pinned   BITS FILO · BITS AIQA
 *            The two differentiators. Scroll is spent on these because
 *            these are what separates Operations 360 from any other CRM.
 *
 * The pinned cards are deliberately minimal — title, one line, stat. No
 * feature lists. A pin that costs two screenfuls of scroll only reads as
 * confidence if the card is confident enough to carry one claim.
 *
 * Everything is driven by lib/products/platform.ts. Adding a pillar is a
 * data change; moving one between static and pinned is a data change too.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MODULE_COPY: Record<string, { line: string }> = {
  "crm-sales": { line: "Recover the accounts" },
  bitsagent: { line: "Automate the floor" },
};

/** Pillar ids that earn the pinned treatment. */
const PINNED_IDS = ["field", "qa"] as const;

export function PlatformIndex() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const platform = getPlatform();
  const modules = platform.modules;
  const portfolio = platform.portfolio;

  const pinned = platform.pillars.filter((p) =>
    (PINNED_IDS as readonly string[]).includes(p.id),
  );
  const baseline = platform.pillars.filter(
    (p) => !(PINNED_IDS as readonly string[]).includes(p.id),
  );

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.fromTo(
          card,
          { y: "100vh", opacity: 0.5, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "none" },
        );
        const previous = cards.slice(0, index);
        tl.to(
          previous,
          {
            scale: (i) => 1 - (index - i) * 0.04,
            y: (i) => -(index - i) * 20,
            opacity: (i) => 1 - (index - i) * 0.15,
            duration: 1,
            ease: "none",
          },
          "<",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="platform-index"
      className="scroll-mt-20 relative bg-slate-50 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-sky-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-top opacity-20 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]" />
      </div>

      {/* ── Baseline: the operational core ── */}
      <Container className="relative pt-20 md:pt-28 pb-16 md:pb-20">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Operations 360
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            {CATALOG_CLAIM}. The operational core every recovery floor runs on.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {baseline.map((pillar) => (
            <Reveal key={pillar.id}>
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur-md">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {pillar.stat}
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {pillar.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* ── Differentiators: pinned ── */}
      <div className="relative border-y border-slate-200/60 bg-white">
        <div
          ref={containerRef}
          className="relative h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6"
        >
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                What sets us apart
              </span>
            </span>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Two capabilities no collections CRM ships with.
            </h2>
          </div>

          <div className="relative w-full max-w-4xl h-[52vh] sm:h-[56vh]">
            {pinned.map((pillar, idx) => (
              <div
                key={pillar.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute inset-0 flex w-full flex-col items-center justify-center rounded-[2rem] border border-white/80 bg-white/75 p-8 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl sm:p-12"
                style={{ zIndex: idx, transformOrigin: "top center" }}
              >
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-blue-600">
                  {pillar.stat}
                </span>
                <h3 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600">
                  {pillar.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modules ── */}
      {modules.length > 0 ? (
        <div className="relative bg-white py-16 md:py-20">
          <Container>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Two modules ship with it
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                Capabilities inside the platform, on the same database — not
                separate products to integrate.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {modules.map((module) => (
                <Reveal key={module.id}>
                  <Link
                    href={module.marketingUrl}
                    onClick={() =>
                      track("cta_click", {
                        section: "platform-index",
                        label: module.id,
                      })
                    }
                    className="group flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur-md transition-all hover:border-blue-300 hover:shadow-md"
                  >
                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {module.id === "bitsagent" ? "BITSagent AI" : "BITScrm"}
                    </h3>
                    <p className="mt-1 font-medium text-blue-600">
                      {MODULE_COPY[module.id]?.line ?? module.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      Explore
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      {/* ── Portfolio ── */}
      <div className="relative border-t border-slate-200/60 bg-slate-50/80 py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  And {portfolio.length} more on the same database
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/deployment"
                  onClick={() =>
                    track("cta_click", {
                      section: "platform-index",
                      label: "Deployment options",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  Cloud or your own servers
                </Link>
                <Link
                  href="/products"
                  onClick={() =>
                    track("cta_click", {
                      section: "platform-index",
                      label: "Browse catalogue",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500"
                >
                  Browse all products
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ul className="mt-8 grid gap-x-8 gap-y-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
              {portfolio.map((product) => (
                <li key={product.id}>
                  <Link
                    href={product.marketingUrl}
                    className="group flex items-center gap-2"
                  >
                    <Check
                      className="size-3.5 shrink-0 text-blue-600"
                      aria-hidden
                    />
                    <span className="group-hover:text-blue-600 transition-colors">
                      {product.shortName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
