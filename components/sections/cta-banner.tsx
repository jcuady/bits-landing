"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

export function CtaBanner() {
  const { openModal } = useConsultationModal();

  return (
    <Section id="cta" className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white py-16 sm:py-24" tight>
      <Container className="relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-400/40 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 px-6 py-16 text-white shadow-2xl shadow-blue-500/30 sm:rounded-[3rem] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            
            {/* Ambient cloud & atmospheric glow */}
            <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
              <div className="absolute right-0 top-0 size-[500px] rounded-full bg-white/20 blur-3xl" />
              <div className="absolute left-0 bottom-0 size-[400px] rounded-full bg-indigo-900/40 blur-3xl" />
            </div>

            {/* Architectural corner framing brackets */}
            <div className="pointer-events-none absolute top-6 left-6 size-4 border-t-2 border-l-2 border-white/30" />
            <div className="pointer-events-none absolute top-6 right-6 size-4 border-t-2 border-r-2 border-white/30" />
            <div className="pointer-events-none absolute bottom-6 left-6 size-4 border-b-2 border-l-2 border-white/30" />
            <div className="pointer-events-none absolute bottom-6 right-6 size-4 border-b-2 border-r-2 border-white/30" />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="size-3.5 text-cyan-200" />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white font-mono">
                  ONE PLATFORM · ZERO DISCONNECTION
                </span>
              </div>

              <h2 className="text-display font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl leading-[1.12]">
                Start Managing Your Operations Faster &amp; With Complete Control.
              </h2>

              <p className="text-lede mx-auto mt-6 max-w-[52ch] text-pretty text-blue-50 font-normal leading-relaxed">
                Join forward-thinking enterprise operations replacing disconnected spreadsheets and rigid legacy tools with BITS tailored technology.
              </p>

              <div className="mt-10 flex flex-col items-stretch sm:items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
                <Magnetic className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => openModal("Bottom Cloud CTA Banner")}
                    className="group relative flex h-14 w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-white pl-8 pr-3 text-sm font-bold text-slate-900 shadow-xl shadow-blue-950/20 transition-all duration-300 hover:bg-slate-50 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                  >
                    <span>Book a Free Consultation</span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="size-4" />
                    </span>
                  </button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <a
                    href="#solutions"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 active:scale-[0.98]"
                  >
                    Explore Modular Engines →
                  </a>
                </Magnetic>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/20 pt-8 text-xs text-blue-100 sm:gap-10">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan-300" />
                  Free 20-min architecture blueprint
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan-300" />
                  Zero per-seat licensing penalties
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan-300" />
                  100% sovereign data ownership
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
