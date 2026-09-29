"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Check, X, Sparkles, TrendingUp, Calculator, ShieldCheck, Zap, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

interface DifferencePoint {
  category: string;
  generic: string;
  bits: string;
}

const differencePoints: DifferencePoint[] = [
  {
    category: "Floor Origin & Architecture",
    generic: "Coded by generalist software engineers who never managed an escalation or ran an active recovery floor.",
    bits: "Engineered from 20 years on real floor leadership — purpose-built for high-velocity queues, agent speed, and compliance.",
  },
  {
    category: "Telephony & Softphone",
    generic: "Requires third-party PBX licenses, external hardware, desktop plugins, and per-minute carrier markup fees.",
    bits: "Native WebRTC softphone built into the CRM — manual, preview, progressive, and predictive pacing with ~0.4s screen-pop.",
  },
  {
    category: "Payment Promises (PTP)",
    generic: "Logged manually in text fields or spreadsheets. No automatic grace-period tracking or broken-promise alerts.",
    bits: "Automated PTP lifecycle: auto-calculates cutoff times, dispatches SMS payment links, and alerts supervisors instantly.",
  },
  {
    category: "Quality Assurance (QA)",
    generic: "Separate audio files stored in third-party cloud buckets. QA auditors spend hours manually matching calls to accounts.",
    bits: "Scorecards with embedded audio playback. Auto-fail critical compliance flags and monthly outlier ranking algorithms.",
  },
  {
    category: "Data Sovereignty & Security",
    generic: "Data stored in multi-tenant US/EU clouds that violate BSP Circular 808 and Philippine statutory data residency.",
    bits: "100% sovereign deployment: air-gapped on-premises or private local cloud with cryptographic audit trails and full DB ownership.",
  },
  {
    category: "Licensing & Total Cost",
    generic: "$120 to $250+ per seat per month. As your floor scales, licensing fees multiply and eat your operating margins.",
    bits: "Flat, predictable floor licensing with zero per-seat penalty traps. Scale from 25 to 2,500 agents with transparent cost.",
  },
];

export function TheDifference() {
  const { openModal } = useConsultationModal();

  // Interactive ROI Calculator State
  const [seatCount, setSeatCount] = React.useState<number>(50);
  const [currentTool, setCurrentTool] = React.useState<"us_saas" | "spreadsheets" | "legacy_pbx">("us_saas");

  // Dynamic calculations based on real BPO / Recovery economics
  // Generic US SaaS ~ $160/seat/mo = $1,920/seat/yr (~₱107,000/seat/yr)
  // BITS flat enterprise floor scope saves ~65% to 75% on licensing
  const genericAnnualUsd = seatCount * 160 * 12;
  const estimatedSavingsPhp = Math.round((seatCount * 68000) / 10000) * 10000;
  const hoursSavedMonthly = seatCount * 18; // ~18 hours recovered per agent via predictive dialing & 0.4s pop
  const ptpRealizationLift = currentTool === "spreadsheets" ? "+38%" : "+26%";

  return (
    <Section
      id="the-difference"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-20 sm:py-28 lg:py-32 border-b border-slate-100"
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-100/40 via-sky-100/20 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-18">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50/90 px-4 py-1.5 text-xs font-semibold text-sky-800 shadow-2xs mb-4">
              <Sparkles className="size-3.5 text-blue-600" />
              <span>THE 20-YEAR OPERATIONAL ADVANTAGE</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Why Generic CRMs Bleed Floor Productivity.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                And How BITS Solves It.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Generic software forces your agents into rigid forms and disconnected spreadsheets. BITS was designed by an operations lead of 20 years to eliminate dead air, enforce PTP recovery, and protect your margins.
            </p>
          </Reveal>
        </div>

        {/* ── 1. SIDE-BY-SIDE COMPETITIVE COMPARISON MATRIX ── */}
        <Reveal delay={0.1}>
          <div className="rounded-[2.25rem] lg:rounded-[2.75rem] p-2 sm:p-3 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.03] overflow-hidden">
            <div className="rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.75rem-0.75rem)] bg-white border border-slate-100 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
              {/* Desktop Header Row */}
              <div className="hidden grid-cols-12 border-b border-slate-200/80 bg-slate-50/80 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 sm:grid">
                <div className="col-span-3">Operational Capability</div>
                <div className="col-span-4 text-rose-700 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500" />
                  <span>Generic Off-The-Shelf SaaS</span>
                </div>
                <div className="col-span-5 text-blue-700 flex items-center gap-1.5 font-extrabold">
                  <span className="size-2 rounded-full bg-blue-600" />
                  <span>The BITS 20-Year Leader Architecture</span>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {differencePoints.map((item, idx) => (
                  <div
                    key={item.category}
                    className="grid grid-cols-1 gap-4 p-5 transition-colors duration-150 hover:bg-blue-50/20 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-6"
                  >
                    {/* Dimension Name */}
                    <div className="sm:col-span-3">
                      <span className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-wider block sm:hidden mb-1">
                        Pillar #{idx + 1}
                      </span>
                      <h3 className="text-sm sm:text-[0.95rem] font-bold text-slate-900">
                        {item.category}
                      </h3>
                    </div>

                    {/* Generic CRM Problem */}
                    <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 sm:col-span-4 sm:border-0 sm:bg-transparent sm:p-0">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                          <X className="size-2.5 text-rose-600 stroke-[3]" />
                        </span>
                        <p className="text-xs leading-relaxed text-slate-600 sm:text-[0.88rem]">
                          {item.generic}
                        </p>
                      </div>
                    </div>

                    {/* BITS Operations Solution */}
                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 sm:col-span-5 sm:border-0 sm:bg-transparent sm:p-0">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <Check className="size-2.5 text-blue-700 stroke-[3]" />
                        </span>
                        <p className="text-xs leading-relaxed font-semibold text-slate-800 sm:text-[0.9rem]">
                          {item.bits}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 2. INTERACTIVE FLOOR ROI & COST-SAVINGS CALCULATOR ── */}
        <Reveal delay={0.14} className="mt-14 sm:mt-18">
          <div className="rounded-[2.25rem] lg:rounded-[2.75rem] p-2 sm:p-3 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-700 shadow-2xl shadow-blue-600/25 text-white">
            <div className="rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.75rem-0.75rem)] bg-slate-950 p-6 sm:p-10 lg:p-12 border border-blue-400/20">
              <div className="grid lg:grid-cols-[1.1fr_1.1fr] gap-8 lg:gap-14 items-center">
                {/* Left: Interactive Controls */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-sky-300">
                    <Calculator className="size-3.5" />
                    <span>INTERACTIVE FLOOR SAVINGS CALCULATOR</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                    Calculate Your Floor&apos;s Annual Licensing &amp; Time Savings
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Adjust your active calling seat count to see estimated licensing savings and productivity hours recovered compared to US per-seat platforms.
                  </p>

                  {/* Seat Count Slider */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="agent-seat-slider" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Active Calling / Recovery Seats
                      </label>
                      <span className="text-2xl font-black text-white font-mono tabular-nums">
                        {seatCount} <span className="text-xs text-sky-400 font-sans font-normal">Agents</span>
                      </span>
                    </div>

                    <input
                      id="agent-seat-slider"
                      type="range"
                      min={10}
                      max={250}
                      step={5}
                      value={seatCount}
                      onChange={(e) => setSeatCount(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />

                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>10 Seats</span>
                      <span>50 Seats</span>
                      <span>100 Seats</span>
                      <span>250+ Seats</span>
                    </div>
                  </div>

                  {/* Current Tool Stack Toggle */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Current Operational Baseline
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentTool("us_saas")}
                        className={cn(
                          "rounded-xl px-2.5 py-2 text-[11px] font-bold transition-all border text-center cursor-pointer",
                          currentTool === "us_saas"
                            ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        )}
                      >
                        US Per-Seat CRM
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentTool("legacy_pbx")}
                        className={cn(
                          "rounded-xl px-2.5 py-2 text-[11px] font-bold transition-all border text-center cursor-pointer",
                          currentTool === "legacy_pbx"
                            ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        )}
                      >
                        Separate PBX
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentTool("spreadsheets")}
                        className={cn(
                          "rounded-xl px-2.5 py-2 text-[11px] font-bold transition-all border text-center cursor-pointer",
                          currentTool === "spreadsheets"
                            ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        )}
                      >
                        Spreadsheets
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Dynamic Calculated Impact Display */}
                <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/60 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                      Estimated Annual Floor Licensing Savings
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                      ~₱{estimatedSavingsPhp.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-400">
                      Versus ~${genericAnnualUsd.toLocaleString()} USD in recurring generic per-seat subscriptions.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Monthly Hours Saved
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums mt-0.5">
                        {hoursSavedMonthly.toLocaleString()} hrs
                      </div>
                      <span className="text-[10px] text-emerald-400">Via 0.4s screen pop</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        PTP Realization Lift
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tabular-nums mt-0.5">
                        {ptpRealizationLift}
                      </div>
                      <span className="text-[10px] text-slate-400">Via automated reminders</span>
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    type="button"
                    onClick={() =>
                      openModal(
                        `Floor Savings Calculator: ${seatCount} Seats (${currentTool})`
                      )
                    }
                    className="w-full flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>Claim Your {seatCount}-Seat Operations Blueprint</span>
                    <span>→</span>
                  </button>

                  <p className="text-center text-[10px] text-slate-400">
                    Confidential 25-minute architecture walkthrough · Zero per-seat markup · BSP Circular 808 aligned
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
