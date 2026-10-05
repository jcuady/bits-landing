"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroProduct } from "@/components/sections/hero-product";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

export function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* ── ATMOSPHERIC ANIMATED SKY & DRIFTING CLOUDS (Animation strictly in background) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        aria-hidden
      >
        {/* Layer 1: Base High-Definition Sky Canvas with Fluid Horizontal Cloud Drift */}
        <div className="absolute inset-0">
          <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
            <Image
              src="/images/hero-sky-bg.jpg"
              alt="Atmospheric sky background with drifting clouds"
              fill
              priority
              quality={90}
              className="object-cover object-top select-none scale-105"
            />
          </div>
        </div>

        {/* Layer 2: Counter-Harmonic Cloud Mist Layer */}
        <div className="absolute inset-0 opacity-45 mix-blend-screen">
          <div className="relative size-full animate-cloud-drift-reverse will-change-transform transform-gpu">
            <Image
              src="/images/hero-sky-bg.jpg"
              alt=""
              fill
              quality={70}
              className="object-cover object-center select-none scale-110 filter blur-[1px]"
            />
          </div>
        </div>

        {/* Layer 3: Celestial Radial Sunbreak Bloom */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.24),rgba(56,189,248,0.15)_35%,transparent_70%)] animate-pulse-glow" />

        {/* Layer 4: Sky Azure Multi-Stop Color Calibration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/35 via-blue-500/20 to-sky-400/15 mix-blend-multiply" />

        {/* Layer 5: Seamless Atmospheric Feathering into White Horizon (Zero visible cut) */}
        <div className="absolute inset-x-0 bottom-0 h-72 sm:h-96 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: Company-Level Positioning (CPO Rec #1) */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Eyebrow Tag: Company Identity */}
            <Reveal y={10}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/20 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                  18 CONNECTED SOFTWARE PRODUCTS · BUILT IN THE PHILIPPINES
                </span>
              </div>
            </Reveal>

            {/* Main Headline: Clear, plain-English hook */}
            <Reveal delay={0.04} y={14}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance drop-shadow-sm">
                Stop Juggling Spreadsheets. Run Your Operations in One Connected Platform.
              </h1>
            </Reveal>

            {/* Subheading: Straightforward, layman-friendly ecosystem explanation */}
            <Reveal delay={0.08} y={10}>
              <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-normal text-pretty drop-shadow-2xs">
                From collection calls and field agents to payroll, accounting, and AI voice assistants. BITS connects all your daily business tools in one place so your team gets more done in less time. Start with what you need today, and add more as you grow.
              </p>
            </Reveal>

            {/* Dual CRO Action Buttons — Progressive Engagement Ladder */}
            <Reveal delay={0.12} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Button 1 (Primary): Low-commitment product exploration */}
                <a
                  href="#product-families"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("product-families")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex h-12 w-full sm:w-auto min-w-[180px] items-center justify-center gap-2.5 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/20 transition-all duration-200 hover:bg-slate-50 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-[0.92rem]">Explore All Products</span>
                  <span className="size-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-700 transition-transform duration-200 group-hover:translate-y-0.5 font-bold">
                    ↓
                  </span>
                </a>

                {/* Button 2 (Secondary): Medium-commitment consultation */}
                <button
                  type="button"
                  onClick={() => openModal("Hero Solutions Architect")}
                  className="group flex h-12 w-full sm:w-auto min-w-[170px] items-center justify-center gap-2 rounded-full bg-blue-600/90 hover:bg-blue-600 border border-white/30 px-7 font-bold text-white shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-[0.92rem]">Talk to a Solutions Architect</span>
                  <span className="size-6 rounded-full bg-white/20 flex items-center justify-center text-xs text-white transition-transform duration-200 group-hover:translate-x-0.5 font-bold">
                    →
                  </span>
                </button>
              </div>

              {/* Fast Jump Glass Pills — Easy Self-Qualification for Buyers */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-semibold text-white/75">Quick jump:</span>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-sm transition-all"
                >
                  Collections &amp; Dialer
                </a>
                <a
                  href="/#operations-360"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("operations-360")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-sm transition-all"
                >
                  Field Agents App
                </a>
                <a
                  href="#product-families"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("product-families")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-sm transition-all"
                >
                  Payroll &amp; HR
                </a>
                <a
                  href="#product-families"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("product-families")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-sm transition-all"
                >
                  Accounting &amp; ERP
                </a>
                <a
                  href="/bitsagent"
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-sm transition-all"
                >
                  Voice AI
                </a>
              </div>

              {/* Micro-Reassurance Line — Company-level trust signals */}
              <p className="mt-4 text-xs text-white/80 font-medium drop-shadow-2xs">
                18 Connected Software Products · Easy Setup · 100% Customizable · Cloud or On-Premises
              </p>
            </Reveal>
          </div>

          {/* Interactive Cockpit Mockup (Static, Rock-Solid Teaser Visuals Resting on the Cloud Horizon) */}
          <Reveal delay={0.16} y={24} className="mt-12 sm:mt-16 w-full">
            <div id="cockpit" className="scroll-mt-24">
              <HeroProduct />
            </div>
          </Reveal>

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
              <span className="text-[11px] font-bold text-blue-600 transition-transform duration-300 group-hover:translate-y-0.5">⌄</span>
              <span className="text-[11px] font-bold text-blue-600/80 -mt-1.5 transition-transform duration-300 group-hover:translate-y-0.5">⌄</span>
              <span className="text-[11px] font-bold text-blue-600/60 -mt-1.5 transition-transform duration-300 group-hover:translate-y-0.5">⌄</span>
              <span className="text-[11px] font-bold text-blue-600/40 -mt-1.5 transition-transform duration-300 group-hover:translate-y-0.5">⌄</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
