"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2, Zap, X } from "lucide-react";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

const pains = [
  "Portfolio records split across disparate spreadsheets and legacy tools",
  "Agents dialing manually with low right-party connect rates",
  "Promises-to-pay lost in handoffs — leading to unrecovered revenue",
  "Call recordings and QA scorecards isolated from the account timeline",
] as const;

const scattered = [
  { name: "Spreadsheets", pain: "Manual copy-pasting, formula corruption, zero audit trail" },
  { name: "Legacy CRM", pain: "Slow page loads, disconnected from actual dialer" },
  { name: "Separate Dialer", pain: "High dead air, no live supervisor whisper barge-in" },
  { name: "Payment CSVs", pain: "48-hour delay reconciling bank deposits against PTPs" },
  { name: "QA Sheets", pain: "Paper scorecards never tied to live audio recordings" },
] as const;

const floor = [
  {
    account: "ACC-10482",
    debtor: "Maria Santos",
    work: "PTP due today (₱15,000)",
    desk: "Auto Loan Queue",
    status: "Active Dial",
    statusColor: "bg-blue-600",
    action: "Dispatched tokenized GCash link; verbal commitment locked in ledger.",
  },
  {
    account: "ACC-11209",
    debtor: "Roberto Gomez",
    work: "Broken PTP Alert",
    desk: "Credit Line D60",
    status: "Auto-Requeued",
    statusColor: "bg-amber-500",
    action: "Automatically requeued to senior recovery queue with supervisor alert.",
  },
  {
    account: "ACC-11342",
    debtor: "Elena Cruz",
    work: "Restructure Review",
    desk: "Microfinance East",
    status: "Approved",
    statusColor: "bg-emerald-600",
    action: "Hardship discount approved; revised 2-stage installment schedule active.",
  },
] as const;

export function Problem() {
  const [selectedFloorRow, setSelectedFloorRow] = React.useState(0);
  const [selectedScattered, setSelectedScattered] = React.useState<number | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);

  const activeRecord = floor[selectedFloorRow];

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <Section id="problem" className="relative overflow-hidden bg-white pt-10 md:pt-16 lg:pt-20">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />
      
      {/* Floating Interactive Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center gap-2.5 rounded-xl border border-blue-200 bg-slate-900/95 px-4 py-3 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
          <p className="flex-1 font-medium">{toast}</p>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_78%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  The Recovery Gap
                </span>
              </div>
              <h2 className="text-h2 text-balance font-bold leading-[1.08] text-slate-900">
                Fragmented tools quietly drain recovery velocity.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                When customer portfolios, dialers, and payment promises are spread
                across multiple disconnected systems, promises slip through the cracks,
                disputes drag on, and floor visibility vanishes.
              </p>
            </Reveal>

            <ul className="mt-10 max-w-[46ch] space-y-4">
              {pains.map((pain, i) => (
                <li key={pain} className="flex gap-4">
                  <Reveal delay={0.06 * i} y={8}>
                    <span className="font-mono text-[0.75rem] font-semibold text-rose-500">
                      &times;
                    </span>
                  </Reveal>
                  <Reveal delay={0.06 * i + 0.02} y={8}>
                    <span className="text-[0.92rem] font-medium leading-relaxed text-slate-700">
                      {pain}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.24} y={8}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#solutions"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                >
                  See the BITS Solution →
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  Schedule Operational Audit
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} amount={0.2}>
            <figure className="mx-auto w-full max-w-[36rem] lg:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-xl shadow-blue-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-40">
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <p className="text-[0.75rem] font-semibold text-slate-700">Operations Comparison</p>
                  </div>
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-600">Interactive</span>
                  </span>
                </div>

                {/* Before BITS */}
                <div className="relative px-5 py-5 border-b border-slate-100 bg-slate-50/40">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[0.72rem] font-bold uppercase tracking-widest text-rose-500">Before BITS · Disconnected Silos</p>
                      <span className="text-[0.65rem] text-slate-400 font-mono">Click tool to inspect friction</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {scattered.map((tool, idx) => (
                        <button
                          key={tool.name}
                          type="button"
                          onClick={() => {
                            setSelectedScattered(idx);
                            triggerToast(`Operational bottleneck: ${tool.pain}`);
                          }}
                          className={cn(
                            "cursor-pointer rounded-lg border px-3 py-2 text-[0.75rem] font-semibold transition-all min-h-[44px] inline-flex items-center justify-center",
                            selectedScattered === idx
                              ? "border-rose-400 bg-rose-50 text-rose-800 shadow-2xs"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 shadow-2xs"
                          )}
                        >
                          {tool.name}
                        </button>
                      ))}
                    </div>
                    {selectedScattered !== null ? (
                      <p className="mt-2 text-[0.72rem] text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-100 font-medium">
                        <strong>Friction Point:</strong> {scattered[selectedScattered].pain}
                      </p>
                    ) : (
                      <p className="mt-2 text-[0.72rem] text-slate-500">
                        Five disconnected systems result in 2.5 lost hours per agent daily.
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative flex items-center justify-center py-2" aria-hidden>
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  <div className="relative flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-2xs text-xs font-bold">
                    &darr;
                  </div>
                </div>

                {/* With BITS Unified Floor */}
                <div className="bg-white px-5 pb-5 pt-2">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[0.72rem] font-bold uppercase tracking-widest text-blue-600">With BITS · Unified Operational Floor</p>
                      <p className="text-[0.85rem] font-bold text-slate-900 mt-0.5">One Live Queue, Telephony &amp; Audit Trail</p>
                    </div>
                    <span className="font-mono text-[0.62rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +2.5h Saved / Agent
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                          <th scope="col" className="px-3 py-2.5">Account / Debtor</th>
                          <th scope="col" className="px-3 py-2.5">Unified Action</th>
                          <th scope="col" className="px-3 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[0.72rem]">
                        {floor.map((row, idx) => (
                          <tr
                            key={row.account}
                            onClick={() => setSelectedFloorRow(idx)}
                            className={cn(
                              "cursor-pointer transition-colors",
                              selectedFloorRow === idx ? "bg-blue-50/80 font-medium" : "hover:bg-slate-50/60"
                            )}
                          >
                            <td className="whitespace-nowrap px-3 py-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                              {selectedFloorRow === idx && <span className="size-1.5 rounded-full bg-blue-600" />}
                              {row.account} ({row.debtor})
                            </td>
                            <td className="px-3 py-2.5 text-slate-700">{row.work}</td>
                            <td className="px-3 py-2.5">
                              <span className={cn("rounded px-2 py-0.5 text-[0.62rem] font-bold text-white shadow-2xs", row.statusColor)}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Active Context Panel */}
                  <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/40 p-2.5 text-xs flex items-center justify-between gap-2">
                    <p className="text-[0.7rem] text-slate-800 font-medium truncate">
                      <strong>Resolved Action:</strong> {activeRecord.action}
                    </p>
                    <button
                      type="button"
                      onClick={() => triggerToast(`Simulated 1-click dial: Softphone connected to ${activeRecord.debtor}.`)}
                      className="shrink-0 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      1-Click Dial
                    </button>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                Fragmented collections silos collapse into one controlled BITS queue saving 2.5 hours per agent daily.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
