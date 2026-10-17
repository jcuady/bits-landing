"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { track } from "@vercel/analytics";
import { getPlatform, CATALOG_CLAIM } from "@/lib/products/platform";

/**
 * PlatformIndex — the Operations 360 hub. Replaces ProductFamilies,
 * Industries and DeploymentModels on the homepage (2,777 words -> ~180).
 *
 * ANIMATION: carries the pinned, scrub-driven card stack from
 * product-families.tsx forward unchanged — same GSAP timeline, same pin
 * distance, same viewport behaviour on mobile. That treatment is the
 * reason this section exists visually; do not reduce it without replacing
 * it with something equivalent.
 *
 * Reading the same card stack, but pointed at the four Operations 360
 * pillars rather than product categories. The two module cards and the
 * portfolio strip below are deliberately static — they are navigation,
 * not showcase.
 *
 * Everything below the animation is driven by lib/products/platform.ts.
 * Adding a pillar or a product is a data change, not a component edit.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MODULE_COPY: Record<string, { line: string }> = {
  "crm-sales": { line: "Recover the accounts" },
  bitsagent: { line: "Automate the floor" },
};

export function PlatformIndex() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const platform = getPlatform();
  const modules = platform.modules;
  const portfolio = platform.portfolio;

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Pinned scrub stack — carried over from product-families.tsx.
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
        if (index === 0) return; // first card is already in place

        tl.fromTo(
          card,
          { y: "100vh", opacity: 0.5, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "none" },
        );

        const previousCards = cards.slice(0, index);
        tl.to(
          previousCards,
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
    <Section id="platform-index" className="relative bg-slate-50 overflow-hidden">
      {/* Background — carried over from product-families.tsx */}
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

      {/* ── Pinned pillar stack ── */}
      <div
        ref={containerRef}
        className="relative h-screen w-full flex flex-col items-center justify-center pt-16 pb-8 px-4 sm:px-6"
      >
        <div className="text-center mb-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">
            Operations 360
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {CATALOG_CLAIM}. Scroll through the four capabilities that run your
            floor.
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-[65vh] sm:h-[70vh]">
          {platform.pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full p-6 sm:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col justify-between"
              style={{ zIndex: idx, transformOrigin: "top center" }}
            >
              <div className="flex-1">
                <span className="text-blue-600 font-mono text-sm uppercase tracking-[0.2em] mb-4 font-bold">
                  0{idx + 1} — {pillar.stat}
                </span>
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6 font-medium max-w-md">
                  {pillar.line}
                </p>

                <div className="grid grid-cols-2 gap-3 max-w-xl">
                  {pillar.features.map((feature) => (
                    <div
                      key={feature}
                      className="bg-slate-50/80 border border-slate-200/60 rounded-xl px-3 py-2.5 backdrop-blur-md"
                    >
                      <span className="text-slate-900 font-bold text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={platform.href}
                onClick={() => track("cta_click", { section: "platform-index", label: "Explore Operations 360" })}
                className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <span>Explore Operations 360</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modules — the two capabilities inside the platform ── */}
      {modules.length > 0 ? (
        <div className="relative border-t border-slate-200/60 bg-white/70 py-20 backdrop-blur-xl md:py-24">
          <Container>
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  Ship with it
                </span>
              </div>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Two modules run on the same database
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
                Not separate products to integrate — capabilities inside the
                platform, from day one.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {modules.map((module) => (
                <Reveal key={module.id}>
                  <Link
                    href={module.marketingUrl}
                    onClick={() => track("cta_click", { section: "platform-index", label: module.id })}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-8 backdrop-blur-md transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {module.id === "bitsagent" ? "BITSagent AI" : "BITScrm"}
                    </h3>
                    <p className="mt-1.5 font-medium text-blue-600">
                      {MODULE_COPY[module.id]?.line ?? module.tagline}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                      {module.tagline}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Explore{" "}
                      {module.id === "bitsagent" ? "BITSagent AI" : "BITScrm"}
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

      {/* ── Portfolio — named, never explained ── */}
      <div className="relative border-t border-slate-200/60 bg-slate-50/80 py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  And {portfolio.length} more on the same database
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                  Connected to the platform you already run.
                </p>
              </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/deployment"
                    onClick={() => track("cta_click", { section: "platform-index", label: "Deployment options" })}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
                  >
                    Cloud or your own servers
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
              <Link
                href="/products"
                onClick={() => track("cta_click", { section: "platform-index", label: "Browse catalogue" })}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
              >
                Browse the full catalogue
                <ArrowRight className="size-4" aria-hidden />
              </Link>
                </div>
            </div>
          </Reveal>

          <Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
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
    </Section>
  );
}