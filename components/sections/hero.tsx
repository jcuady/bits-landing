"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroProduct } from "@/components/sections/hero-product";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { ArrowRight, ChevronDown, Layers } from "lucide-react";

export function Hero() {
  const { openModal } = useConsultationModal();
  const heroRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32"
    >
      {/* ── ATMOSPHERIC AZURE SKY & STATIC VISIBLE CLOUDS (EXTENDS THROUGH GLASSMORPHISM COCKPIT) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        aria-hidden="true"
      >
        {/* Sticky Viewport Canvas: Keeps the sky & clouds perfectly framed during the pinned glassmorphism cockpit scroll */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Base Layer: Radiant Daytime Azure Sky Gradient matching reference */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1362df] via-[#2377f3] 45% via-[#3c8bf6] 75% to-[#5ea2f9]" />

          {/* High-Resolution Static Sky & Clouds Backdrop (Zero Animation, Pure Daytime Contrast) */}
          <div className="relative size-full">
            <Image
              src="/images/hero-sky-bg.jpg"
              alt="Daytime azure sky with distinct fluffy white clouds"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-center select-none"
            />
          </div>

          {/* Subtle Ambient Sunbreak Bloom at the Top (Soft Warm/Cyan Light) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(255,255,255,0.22),transparent_65%)] pointer-events-none" />

          {/* Gentle Center Sapphire Vignette: Calibrated specifically for white text legibility WITHOUT muting clouds */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_24%,rgba(10,50,135,0.28)_0%,transparent_75%)] pointer-events-none" />
        </div>

        {/* Smooth Horizon Cloud Mist Transition to Trust Strip at the end of the glassmorphic cockpit */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 bg-gradient-to-t from-slate-50 via-slate-50/85 to-transparent pointer-events-none z-10" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: Direct, Straightforward Enterprise Positioning */}
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            {/* Eyebrow Tag: Flagship OPERATIONS 360 focus */}
            <Reveal y={10}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                  ENTERPRISE REVOPS &amp; COLLECTIONS · OPERATIONS 360 SUITE
                </span>
              </div>
            </Reveal>

            {/* Main Headline: 2-Line Strict Rule, Wide Flowing Typography with Crisp Legibility */}
            <Reveal delay={0.04} y={14}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance drop-shadow-[0_2px_14px_rgba(2,16,52,0.55)] max-w-5xl">
                Stop Juggling Spreadsheets.
                <span className="block mt-1 sm:mt-2">
                  Run Your Operations in{" "}
                  <span className="font-serif italic font-normal tracking-wide text-sky-100 drop-shadow-[0_2px_16px_rgba(2,16,52,0.6)]">
                    One Connected Platform
                  </span>
                  .
                </span>
              </h1>
            </Reveal>

            {/* Subheading: Compact, straightforward, problem-solving copy */}
            <Reveal delay={0.08} y={10}>
              <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed font-normal text-pretty drop-shadow-[0_2px_8px_rgba(2,16,52,0.4)]">
                Connect predictive dialing, GPS field tracking, QA speech scoring, and debt recovery in one sovereign system. Less admin work, higher recovery rates, and zero spreadsheet chaos.
              </p>
            </Reveal>

            {/* Dual CRO Action Buttons — High-Converting Ladder */}
            <Reveal delay={0.12} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                {/* Primary High-Converting CTA: Book a Consultation */}
                <button
                  type="button"
                  onClick={() => openModal("Hero Book a Consultation")}
                  className="group relative flex h-13 w-full sm:w-auto min-w-[210px] items-center justify-between gap-3 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/30 transition-all duration-300 hover:bg-slate-50 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-[0.95rem] tracking-tight">Book a Consultation</span>
                  <span className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white shadow-sm transition-transform duration-300 group-hover:translate-x-1 font-bold">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                {/* Secondary CTA: Explore OPERATIONS 360 */}
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex h-13 w-full sm:w-auto min-w-[200px] items-center justify-center gap-2.5 rounded-full bg-blue-600/90 hover:bg-blue-600 border border-white/40 px-6 font-bold text-white shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-[0.95rem]">Explore OPERATIONS 360</span>
                  <span className="size-7 rounded-full bg-white/20 flex items-center justify-center text-xs text-white transition-transform duration-300 group-hover:translate-y-0.5 font-bold">
                    ↓
                  </span>
                </a>

                {/* Tertiary Link: 18-Engine MVP Demo Matrix */}
                <Link
                  href="/demo"
                  className="group hidden md:flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white transition-all ml-2 underline underline-offset-4 decoration-white/40 hover:decoration-white min-h-[36px] py-1.5 px-2 rounded-lg"
                >
                  <Layers className="size-3.5" />
                  <span>Explore All 18 Engines</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>

              {/* Fast Jump Glass Pills — 4 Core Capabilities */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-bold text-white/95">Core modules:</span>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/20 hover:bg-white/30 px-3.5 py-1 text-xs font-semibold text-white border border-white/35 shadow-xs backdrop-blur-md transition-all cursor-pointer"
                >
                  Collections &amp; PTP
                </a>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/20 hover:bg-white/30 px-3.5 py-1 text-xs font-semibold text-white border border-white/35 shadow-xs backdrop-blur-md transition-all cursor-pointer"
                >
                  Predictive Dialer
                </a>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/20 hover:bg-white/30 px-3.5 py-1 text-xs font-semibold text-white border border-white/35 shadow-xs backdrop-blur-md transition-all cursor-pointer"
                >
                  GPS Field App
                </a>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/20 hover:bg-white/30 px-3.5 py-1 text-xs font-semibold text-white border border-white/35 shadow-xs backdrop-blur-md transition-all cursor-pointer"
                >
                  Real-Time QA Scoring
                </a>
                <Link
                  href="/demo"
                  className="rounded-full bg-cyan-400/30 hover:bg-cyan-400/40 px-3.5 py-1 text-xs font-bold text-cyan-100 border border-cyan-300/50 shadow-xs backdrop-blur-md transition-all"
                >
                  Interactive Sandbox MVPs ↗
                </Link>
              </div>

              {/* Minimal Trust Micro-Line — High-contrast white/sky-100 */}
              <p className="mt-4 text-xs text-white/90 font-medium drop-shadow-[0_1px_4px_rgba(2,12,38,0.4)]">
                Zero PBX Hardware · Cloud or On-Premises · Automated BSP 454/857 Compliance Auditing
              </p>
            </Reveal>
          </div>

          {/* Interactive Cockpit Mockup: OPERATIONS 360 Feature Showcase */}
          <div id="cockpit" className="mt-12 sm:mt-16 w-full scroll-mt-24">
            <HeroProduct />
          </div>

          {/* Vertical Scroll Chevron Pill */}
          <div className="mt-10 sm:mt-14 flex justify-center z-20">
            <a
              href="#trust-strip"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("trust-strip")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Scroll to product portfolio overview"
              className="group inline-flex min-h-[44px] min-w-[44px] w-11 flex-col items-center justify-center rounded-full border border-white/80 bg-white/90 py-3 shadow-xl shadow-blue-950/10 backdrop-blur-md transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronDown className="size-4 text-blue-600 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
