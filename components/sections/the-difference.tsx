"use client";

import Link from "next/link";
import { theDifference } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Check, X, Sparkles, Activity, Zap, Workflow, ShieldCheck } from "lucide-react";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

const featurePillars = [
  {
    icon: Activity,
    badge: "Real-Time Clarity",
    title: "Live Operations Intelligence",
    description: "Debtor contact states, promise schedules, and agent actions tracked continuously without spreadsheet exports.",
    highlight: false,
  },
  {
    icon: Zap,
    badge: "BITSagent AI",
    title: "Automated Workflow Engine",
    description: "Rule-based auto-dialing, payment reminder dispatches, and supervisor escalations powered by enterprise AI.",
    highlight: true,
  },
  {
    icon: Workflow,
    badge: "Tailored Architecture",
    title: "Built For Your Floor",
    description: "Custom queues and approval workflows configured around your specific desks, not generic template forms.",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    badge: "Data Sovereignty",
    title: "Zero Per-Seat Penalties",
    description: "Deploy on sovereign Philippine cloud or on-premises infrastructure with full database ownership.",
    highlight: false,
  },
];

export function TheDifference() {
  const { openModal } = useConsultationModal();
  return (
    <Section id="the-difference" className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-sky-50/40 text-slate-900 py-20 sm:py-28 border-y border-sky-100">
      {/* Background Architectural Patterns */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute inset-0 bg-grid-light" />
        <div className="absolute -top-32 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[140px]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <Sparkles className="size-3.5 text-blue-600" />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700 font-mono">
                Architectural Distinction
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Smarter Way to Manage Operations.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Powered by AI.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              Most software forces your business into rigid forms, confusing menus, and generic screens.
              BITS builds technology directly around how your team and managers actually work.
            </p>
          </Reveal>
        </div>

        {/* ── 4-CARD FEATURE ROW (Directly matching the reference image's signature layout) ── */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featurePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            if (pillar.highlight) {
              return (
                <Reveal key={pillar.title} delay={idx * 0.05} amount={0.2}>
                  {/* Standout Vibrant Electric Blue Card */}
                  <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-blue-400/40 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-7 text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                    <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-inner">
                          <Icon className="size-5" />
                        </div>
                        <span className="rounded-full bg-white/20 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="mt-6 text-lg font-bold tracking-tight text-white leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-xs text-blue-100/90 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-white/90">
                      <span>Explore automation</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal key={pillar.title} delay={idx * 0.05} amount={0.2}>
                {/* Cloud-White Double-Bezel Card */}
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-sky-900/5 hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 border border-sky-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                    <span>Learn more</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── COMPARISON MATRIX: Double-Bezel Cloud Container ── */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-sky-200/80 bg-white shadow-xl shadow-sky-950/5">
          {/* Header Row */}
          <div className="hidden grid-cols-12 border-b border-sky-100 bg-sky-50/60 px-6 py-4 text-[0.78rem] font-bold uppercase tracking-wider text-slate-600 sm:grid">
            <div className="col-span-3">Operational Dimension</div>
            <div className="col-span-4 text-rose-600 font-bold">Generic Off-The-Shelf SaaS</div>
            <div className="col-span-5 text-blue-700 font-bold">The BITS Built-Around-You Advantage</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-sky-100/70">
            {theDifference.map((item, idx) => (
              <Reveal key={item.category} delay={idx * 0.03} amount={0.2}>
                <div className="grid grid-cols-1 gap-4 p-5 transition-colors duration-150 hover:bg-sky-50/40 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-6">
                  {/* Category */}
                  <div className="sm:col-span-3">
                    <span className="font-mono text-[0.68rem] font-bold text-blue-600 sm:hidden block mb-1">
                      DIMENSION #{idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 sm:text-[0.92rem]">
                      {item.category}
                    </h3>
                  </div>

                  {/* Generic SaaS */}
                  <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 sm:col-span-4 sm:border-0 sm:bg-transparent sm:p-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <X className="size-2.5 text-rose-600 stroke-[3]" />
                      </span>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-[0.85rem]">
                        {item.generic}
                      </p>
                    </div>
                  </div>

                  {/* BITS Approach */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 sm:col-span-5 sm:border-0 sm:bg-transparent sm:p-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="size-2.5 text-emerald-700 stroke-[3]" />
                      </span>
                      <p className="text-xs leading-relaxed font-semibold text-slate-800 sm:text-[0.88rem]">
                        {item.bits}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-sky-200 bg-white p-6 sm:flex-row sm:p-8 shadow-md shadow-sky-900/5">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Ready to stop forcing your floor into someone else&apos;s software?
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Schedule a technical blueprint session to map your operational requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal("Operational Blueprint Session (The Difference)")}
            className="group flex h-12 shrink-0 items-center justify-between gap-3.5 rounded-full bg-blue-600 pl-6 pr-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
          >
            <span>Book a Consultation</span>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </button>
        </div>
      </Container>
    </Section>
  );
}
