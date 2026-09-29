"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Logo } from "@/components/ui/logo";

export function FeaturesHero() {
  const { openModal } = useConsultationModal();

  return (
    <Section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/25 to-white border-b border-slate-200/70 py-20 md:py-28 lg:py-32"
    >
      {/* Anchor alias for navbar / footer links */}
      <div id="operations-360" className="absolute -top-24" />
      {/* Subtle ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-sky-200/30 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-sky-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 shadow-xs mb-5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
              </span>
              <span>OPERATIONS 360 · PLATFORM CAPABILITIES</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Every Tool Your Collections Floor Needs. One&nbsp;Platform.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Engineered from 100+ real operational use cases across six floor roles. Account management, predictive dialing, QA scoring, omnichannel messaging, and analytics — unified in a single high-velocity workspace.
            </p>
          </Reveal>
        </div>

        {/* ── HERO SHOWCASE: Collections Command Center ── */}
        <Reveal delay={0.1}>
          {/* Double-Bezel Outer Shell */}
          <div className="relative rounded-[2.25rem] lg:rounded-[2.75rem] p-2 sm:p-3 bg-gradient-to-b from-slate-100/90 via-slate-200/50 to-slate-100/90 border border-slate-200/90 shadow-2xl shadow-blue-950/[0.06]">
            {/* Inner Core */}
            <div className="relative rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.75rem-0.75rem)] bg-white border border-slate-100 overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]">
              <div className="grid lg:grid-cols-[1.05fr_1.15fr] items-center gap-0">
                {/* Left: Copy & Structured Capabilities */}
                <div className="p-8 sm:p-10 lg:p-14">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700 mb-4">
                    Collections Core · Debt Management
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-slate-900 leading-snug">
                    Account Management That Moves at Your Floor&apos;s&nbsp;Speed
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Every debt portfolio loaded with current balance, DPD aging, original creditor, debtor contacts, and complete timestamped call logs. Agents work from a prioritized worklist with instant next-account paging. Supervisors monitor team queues in real time.
                  </p>

                  {/* Three High-Yield Capability Cards */}
                  <div className="mt-8 space-y-3.5">
                    <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:border-blue-100 hover:bg-blue-50/30">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white shadow-xs">
                        PTP
                      </span>
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">Promise-to-Pay (PTP) Automation</span>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">
                          Auto-calculates grace periods, dispatches automated SMS payment reminders, and instantly flags broken commitments the minute a cutoff passes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:border-blue-100 hover:bg-blue-50/30">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-black text-white shadow-xs">
                        BULK
                      </span>
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">Bulk Portfolio Operations</span>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">
                          Mass agent assignment, segmentation pooling, and high-volume endorsements import without freezing screen state or slowing active agent queues.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:border-blue-100 hover:bg-blue-50/30">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-xs font-black text-white shadow-xs">
                        RULE
                      </span>
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">Strategy Decision Rules Engine</span>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">
                          Auto-assignment, delinquency bucket escalation, and next-best-action agent guidance based on debtor risk profile and payment probability.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High-End Nested Island CTA Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => openModal("Collections Command Center Demo")}
                      className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-slate-950 hover:bg-blue-600 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:shadow-blue-600/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                    >
                      <span>See It In Action</span>
                      <span className="size-8 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:bg-white/25 transition-all duration-300 font-bold">
                        →
                      </span>
                    </button>

                    <a
                      href="#pricing"
                      className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-6 py-2.5 text-sm font-bold text-slate-800 shadow-2xs transition-colors"
                    >
                      View Solution Packages
                    </a>
                  </div>
                </div>

                {/* Right: Machined Double-Bezel Product Showcase */}
                <div className="relative p-3 sm:p-6 lg:p-8 bg-slate-50/60 lg:h-full flex items-center justify-center">
                  <div className="relative w-full aspect-[16/11] lg:aspect-auto lg:h-[500px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-950/5">
                    <Image
                      src="/images/features/collections-command.jpg"
                      alt="BITS Collections Command Center — debt account management table with sidebar detail panel"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-left-top"
                      priority
                    />
                    {/* Authentic BITS Logo Brand Overlay */}
                    <div className="absolute top-[2%] left-[1.5%] z-20 flex items-center gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-slate-200/90">
                      <Logo variant="tile" className="size-6 sm:size-7 rounded-lg object-contain" />
                      <span className="hidden sm:inline-block font-extrabold text-[11px] text-slate-900 tracking-tight pr-1.5">
                        BITS OMS
                      </span>
                    </div>

                    {/* Floating Telemetry Glass Pill */}
                    <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live Account Ledger · 0.4s Screen-Pop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
