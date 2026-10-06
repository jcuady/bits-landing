"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroProduct } from "@/components/sections/hero-product";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { HeroThreeCanvas } from "@/components/ui/hero-three-canvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Sparkles, Layers, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const { openModal } = useConsultationModal();
  const heroRef = React.useRef<HTMLElement>(null);
  const cloudLayer1Ref = React.useRef<HTMLDivElement>(null);
  const cloudLayer2Ref = React.useRef<HTMLDivElement>(null);
  const bloomRef = React.useRef<HTMLDivElement>(null);

  // ── GSAP SCROLL-TRIGGERED PARALLAX MOTION FOR CLOUDS ──
  React.useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Primary Cloud Layer Parallax Scrub: Moves UPWARDS on scroll
      if (cloudLayer1Ref.current) {
        gsap.to(cloudLayer1Ref.current, {
          yPercent: -26,
          xPercent: -4,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Counter-Harmonic Cloud Mist Scrub: Moves UPWARDS with higher velocity for 3D depth
      if (cloudLayer2Ref.current) {
        gsap.to(cloudLayer2Ref.current, {
          yPercent: -44,
          xPercent: 6,
          scale: 1.25,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Celestial Sunbreak Expansion
      if (bloomRef.current) {
        gsap.to(bloomRef.current, {
          yPercent: -20,
          scale: 1.35,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32"
    >
      {/* ── ATMOSPHERIC ANIMATED SKY & GSAP-DRIVEN DRIFTING CLOUDS ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Layer 1: Base Ultra HD Sky Canvas with GSAP Parallax & Floating Drift (Upward Motion) */}
        <div
          ref={cloudLayer1Ref}
          className="absolute -inset-x-0 -top-[12%] h-[135%] will-change-transform transform-gpu"
        >
          <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
            <Image
              src="/images/hero-sky-bg.jpg"
              alt="Atmospheric sky background with drifting clouds"
              fill
              priority
              loading="eager"
              quality={90}
              className="object-cover object-center select-none scale-105"
            />
          </div>
        </div>

        {/* Layer 2: Counter-Harmonic Cloud Mist with Upward Parallax Depth */}
        <div
          ref={cloudLayer2Ref}
          className="absolute -inset-x-0 -top-[20%] h-[145%] opacity-45 mix-blend-screen will-change-transform transform-gpu"
        >
          <div className="relative size-full animate-cloud-drift-reverse will-change-transform transform-gpu">
            <Image
              src="/images/hero-sky-bg.jpg"
              alt=""
              fill
              quality={75}
              className="object-cover object-center select-none scale-110 filter blur-[1px]"
            />
          </div>
        </div>

        {/* Layer 3: Interactive Three.js Constellation Mesh */}
        <HeroThreeCanvas />

        {/* Layer 4: Celestial Radial Sunbreak Bloom */}
        <div
          ref={bloomRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.3),rgba(56,189,248,0.18)_35%,transparent_70%)] animate-pulse-glow"
        />

        {/* Layer 5: Azure Sky Gradient Multi-Stop Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-blue-500/15 to-sky-400/10 mix-blend-multiply" />

        {/* Layer 6: Seamless Horizon Blend */}
        <div className="absolute inset-x-0 bottom-0 h-72 sm:h-96 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: Direct, Straightforward Enterprise Positioning */}
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            {/* Eyebrow Tag: Flagship OPERATIONS 360 focus (Built in the Philippines removed) */}
            <Reveal y={10}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/20 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                  ENTERPRISE REVOPS &amp; COLLECTIONS · OPERATIONS 360 SUITE
                </span>
              </div>
            </Reveal>

            {/* Main Headline: 2-Line Strict Rule, Wide Flowing Typography */}
            <Reveal delay={0.04} y={14}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance drop-shadow-sm max-w-5xl">
                Stop Juggling Spreadsheets. Run Your Operations in One Connected Platform.
              </h1>
            </Reveal>

            {/* Subheading: Compact, straightforward, conversion-focused copy */}
            <Reveal delay={0.08} y={10}>
              <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed font-normal text-pretty drop-shadow-2xs">
                From predictive dialing and GPS field agents to real-time QA scoring and collections recovery.
                BITS unifies your entire operations floor in one sovereign system so your team recovers more debt in less time.
              </p>
            </Reveal>

            {/* Dual CRO Action Buttons — High-Converting Ladder */}
            <Reveal delay={0.12} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                {/* Primary High-Converting CTA: Book a Consultation */}
                <button
                  type="button"
                  onClick={() => openModal("Hero Book a Consultation")}
                  className="group relative flex h-13 w-full sm:w-auto min-w-[210px] items-center justify-between gap-3 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/25 transition-all duration-300 hover:bg-slate-50 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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

              {/* Fast Jump Glass Pills — Key Selling Points */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-bold text-white/80">Key modules:</span>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/25 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Collections &amp; PTP Engine
                </a>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/25 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Predictive WebRTC Dialer
                </a>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/25 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Field Agents GPS App
                </a>
                <a
                  href="#cockpit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/25 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Real-Time QA Scoring
                </a>
                <Link
                  href="/demo"
                  className="rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 px-3 py-1 text-xs font-bold text-cyan-100 border border-cyan-300/40 backdrop-blur-sm transition-all"
                >
                  Interactive Sandbox MVPs ↗
                </Link>
              </div>

              {/* Minimal Trust Micro-Line */}
              <p className="mt-4 text-xs text-white/85 font-medium drop-shadow-2xs">
                Zero Hardware Required · Cloud or On-Premises · Automated BSP 454/857 Compliance Auditing
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
