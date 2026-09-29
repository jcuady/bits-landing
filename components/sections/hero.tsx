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
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none [clip-path:polygon(0_0,100%_0,100%_calc(100%-80px),50%_100%,0_calc(100%-80px))]"
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

        {/* Layer 5: Soft Horizon Cloud Feathering (Nestles cards seamlessly into cloud bed) */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-50 via-slate-50/85 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: 20-Year Operations Lead Differentiation */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Eyebrow Tag: Differentiator Right Away */}
            <Reveal y={10}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/20 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                  BUILT BY A 20-YEAR OPERATIONS LEADER · NOT A GENERIC OMS
                </span>
              </div>
            </Reveal>

            {/* Main Headline: Clear, Direct, 2 Lines */}
            <Reveal delay={0.04} y={14}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance drop-shadow-sm">
                The Operations System Built from 20 Years on the Floor.{" "}
                <span className="block font-medium text-white/95 mt-1 sm:mt-2 text-3xl sm:text-5xl lg:text-6xl">
                  Not Another Generic OMS.
                </span>
              </h1>
            </Reveal>

            {/* Subheading: Concrete Advantages and Competitor Differentiation */}
            <Reveal delay={0.08} y={10}>
              <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-normal text-pretty drop-shadow-2xs">
                Generic CRMs are built by coders who never ran a queue. BITS is architected from two decades of real recovery floor leadership — delivering WebRTC predictive dialing, automated QA, Promise-to-Pay tracking, and sovereign compliance in one cockpit.
              </p>
            </Reveal>

            {/* Dual CRO Action Buttons */}
            <Reveal delay={0.12} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Button 1: White pill button with dark text & nested icon */}
                <button
                  type="button"
                  onClick={() => openModal("Hero Primary Consultation")}
                  className="group flex h-12 w-full sm:w-auto min-w-[180px] items-center justify-center gap-2.5 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/20 transition-all duration-200 hover:bg-slate-50 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-[0.92rem]">Book a Consultation</span>
                  <span className="size-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-700 transition-transform duration-200 group-hover:translate-x-0.5 font-bold">
                    →
                  </span>
                </button>

                {/* Button 2: Frosted glass button with white text */}
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex h-12 w-full sm:w-auto min-w-[170px] items-center justify-center gap-2 rounded-full bg-blue-600/90 hover:bg-blue-600 border border-white/30 px-7 font-bold text-white shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all duration-200 active:scale-[0.98]"
                >
                  <span className="text-[0.92rem]">Explore Teaser Features</span>
                  <span className="text-white/70 transition-transform duration-200 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </div>

              {/* Micro-Reassurance Line */}
              <p className="mt-3.5 text-xs text-white/80 font-medium drop-shadow-2xs">
                WebRTC Softphone Built-in · ~0.4s Screen-Pop · BSP &amp; NPC Aligned · Zero Extra Hardware · Zero Per-Seat Markups
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
              aria-label="Scroll to platform governance and trust metrics"
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
