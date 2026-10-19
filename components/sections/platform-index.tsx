"use client";

import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
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
      <Container className="relative pt-20 pb-14 md:pt-28 md:pb-16">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Operations 360
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            {CATALOG_CLAIM}
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
                  <div className="grid w-full items-center gap-6 text-left sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-8">
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
                    <div className="order-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-blue-900/10 sm:order-2">
                      <Image
                        src={pillar.image.src}
                        alt={pillar.image.alt}
                        width={pillar.image.width}
                        height={pillar.image.height}
                        quality={82}
                        sizes="(max-width: 640px) 92vw, 46vw"
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
