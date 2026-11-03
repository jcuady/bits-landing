"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { getPlatform, CATALOG_CLAIM } from "@/lib/products/platform";

/**
 * PlatformIndex — the Operations 360 hub.
 *
 * STRUCTURE (CPO decision, Rev 5):
 *   Static   Collections CRM & PTP · Predictive Dialer
 *            The operational baseline every recovery floor runs on.
 *   Pinned   BITS FILO · BITS AIQA
 *            The two differentiators. Scroll is spent only here,
 *            because this is what separates Operations 360 from any
 *            other collections CRM.
 *
 * The pinned cards are deliberately minimal — title, one line, stat. No
 * feature lists. A pin that costs two screenfuls only reads as
 * confidence if the card carries a single claim.
 *
 * Which pillars are pinned is data, not layout: PINNED_IDS below,
 * matched against pillar ids in lib/products/platform.ts.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Pillar ids that earn the pinned treatment. */
const PINNED_IDS = ["field", "qa"] as const;

export function PlatformIndex() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const platform = getPlatform();
  const isPinned = (id: string) => (PINNED_IDS as readonly string[]).includes(id);
  const pinned = platform.pillars.filter((p) => isPinned(p.id));
  const baseline = platform.pillars.filter((p) => !isPinned(p.id));

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Respect prefers-reduced-motion: the stack degrades to a plain
      // stacked list, with no pinning and no scroll hijacking.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      });

      return () => mm.revert();
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
        {/* A4 — a slow drifting light form. Kept low-contrast so it reads
            as atmosphere behind the glass, never as content. */}
        <div
          className="pointer-events-none absolute -left-24 top-1/3 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28),transparent_65%)] blur-3xl animate-[bits-orb-swoosh_9s_ease-in-out_infinite]"
          aria-hidden
        />
      </div>

      {/* ── Beat 1: the operational core ── */}
      <Container className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1">
            <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
              The platform
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Operations 360
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            {CATALOG_CLAIM}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {baseline.map((pillar, i) => (
            <Reveal key={pillar.id} delay={0.06 * i}>
              <GlassCard
                as="article"
                className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                innerClassName="relative flex h-full flex-col p-8"
              >
                {/* accent hairline across the top edge */}
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-300/70 to-transparent"
                  aria-hidden
                />
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  {pillar.stat}
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {pillar.line}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/60 pt-5">
                  {pillar.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-slate-200/70 pt-8">
            <p className="text-sm text-slate-600">
              See what it costs to run your floor on one platform.
            </p>
            <Link
              href="/pricing"
              onClick={() =>
                track("cta_click", { section: "platform-index", label: "Request a quote" })
              }
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5"
            >
              Request a quote
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* ── Beat 2: the differentiators, pinned ── */}
      <div className="relative border-t border-slate-200/60 bg-white">
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

          <div className="relative w-full max-w-6xl h-[50vh] sm:h-[56vh]">
            {pinned.map((pillar, idx) => (
              <div
                key={pillar.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute inset-0 flex w-full flex-col items-center justify-center rounded-[2rem] border border-white/80 bg-white/75 p-6 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl sm:p-9"
                style={{ zIndex: idx, transformOrigin: "top center" }}
              >
                {pillar.image ? (
                  <div className="grid w-full items-center gap-6 text-left sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] sm:gap-8">
                    <div className="order-2 sm:order-1">
                      <span className="font-mono text-sm uppercase tracking-[0.2em] text-blue-600">
                        {pillar.stat}
                      </span>
                      <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {pillar.line}
                      </p>
                    </div>
                    <div className="order-1 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-blue-900/10 sm:order-2">
                      <Image
                        src={pillar.image.src}
                        alt={pillar.image.alt}
                        width={pillar.image.width}
                        height={pillar.image.height}
                        quality={82}
                        priority
                        sizes="(max-width: 640px) 92vw, 42vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="font-mono text-sm uppercase tracking-[0.2em] text-blue-600">
                      {pillar.stat}
                    </span>
                    <h3 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600">
                      {pillar.line}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
