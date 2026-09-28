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
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* ── ATMOSPHERIC SKY & CLOUD BACKGROUND (Matching user's reference image) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Photorealistic High-Res Sky & Clouds Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt=""
            fill
            priority
            quality={75}
            className="object-cover object-top select-none"
          />
        </div>

        {/* Vibrancy Boost Overlay Gradient (Sky Azure #1872F0) */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/40 via-blue-500/25 to-sky-400/20 mix-blend-multiply" />

        {/* Soft bottom cloud fade into page content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: Typography strictly mirroring reference image */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Eyebrow Tag */}
            <Reveal y={10}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <span className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-white">
                  ONE PLATFORM · ZERO DISCONNECTION
                </span>
              </div>
            </Reveal>

            {/* Main Headline: "From Chaos to Control / One Platform for Everything" */}
            <Reveal delay={0.04} y={14}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance drop-shadow-sm">
                From Chaos to Control <br />
                <span className="font-serif italic font-normal text-white/95">One Platform</span>{" "}
                <span className="font-extrabold text-white">for Everything</span>
              </h1>
            </Reveal>

            {/* Subheading in crisp white */}
            <Reveal delay={0.08} y={10}>
              <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-normal text-pretty drop-shadow-2xs">
                From high-volume debt recovery to multi-channel customer operations, we make enterprise work easier, compliant, and auditable.
              </p>
            </Reveal>

            {/* Dual CRO Action Buttons (Matching reference image: White Pill + Vibrant Blue) */}
            <Reveal delay={0.12} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Button 1: White pill button with dark text */}
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="group flex h-12 w-full sm:w-auto min-w-[170px] items-center justify-center gap-2 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/20 transition-all duration-200 hover:bg-slate-50 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-[0.92rem]">Book a Consultation</span>
                  <span className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </button>

                {/* Button 2: Vibrant Blue pill button with white text */}
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex h-12 w-full sm:w-auto min-w-[160px] items-center justify-center gap-2 rounded-full bg-blue-600/90 hover:bg-blue-600 border border-white/30 px-7 font-bold text-white shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all duration-200 active:scale-[0.98]"
                >
                  <span className="text-[0.92rem]">Explore Live Cockpit</span>
                  <span className="text-white/70 transition-transform duration-200 group-hover:translate-x-0.5">↓</span>
                </a>
              </div>

              {/* Micro-Reassurance Line */}
              <p className="mt-3.5 text-xs text-white/80 font-medium drop-shadow-2xs">
                Instant 20-min blueprint · Zero per-seat penalties · 100% sovereign data ownership
              </p>
            </Reveal>
          </div>

          {/* Interactive Cockpit Mockup (Front & Center, Nested in the Cloud Base) */}
          <Reveal delay={0.16} y={24} className="mt-12 sm:mt-16 w-full">
            <div id="cockpit" className="scroll-mt-24">
              <HeroProduct />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
