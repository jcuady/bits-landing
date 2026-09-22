"use client";

import * as React from "react";
import { capabilities } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2, Database, FileCheck } from "lucide-react";

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

const scope = [
  {
    work: "BDO Core Banking MT940",
    origin: "14,200 Trans · Auto-Matched",
    status: "100% Cleared",
    statusColor: "bg-[#00c875]",
    detail: "Automated daily bank feed reconciles corporate collections with zero human intervention.",
    actionToast: "Simulated MT940 ingestion: 14,200 bank records verified with ₱0 unallocated variance.",
  },
  {
    work: "Portfolio Master (128k CSV)",
    origin: "Validated · Deduplicated",
    status: "8.2s Ingestion",
    statusColor: "bg-[#0073ea]",
    detail: "Bulk CSV parser verifies mobile numbers, DPD brackets, and eliminates duplicate debtor records.",
    actionToast: "Simulated 128k CSV import: Schema validated, 0 duplicate accounts detected.",
  },
  {
    work: "Telephony CDR Feeds",
    origin: "Genesys / Avaya PBX Sync",
    status: "Real-Time CDC",
    statusColor: "bg-[#a25ddc]",
    detail: "Call detail records and stereo recordings automatically bound to debtor account histories.",
    actionToast: "Simulated PBX ingestion: 4,800 telephony call logs mapped to live collector files.",
  },
  {
    work: "BIR CAS RR 9-2009 Ledger",
    origin: "General Ledger WORM Hash",
    status: "Audited & Locked",
    statusColor: "bg-[#579bfc]",
    detail: "Tamper-proof accounting audit trail certified compliant with BIR Revenue Regulation RR 9-2009.",
    actionToast: "Cryptographic SHA-256 ledger integrity check passed: 100% data audit verified.",
  },
] as const;

export function CustomSolutions() {
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const activeRecord = scope[selectedRow];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <Section id="custom" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center gap-2.5 rounded-xl border border-blue-200 bg-slate-900/95 px-4 py-3 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
          <p className="flex-1 font-medium">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Import · validate · match
                </span>
              </div>
              <h2 className="text-h2 mt-4 text-balance font-bold leading-[1.08] text-slate-900 lg:max-w-[22ch]">
                Move Portfolio Data Into Action.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Bring campaigns, accounts, payments, and operational data into
                BITS through controlled, audited import and validation workflows.
              </p>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Discuss Your Data Migration
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-xl shadow-blue-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-40">
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div>
                      <p className="text-[0.75rem] font-semibold text-slate-700">Data Ingestion Engine</p>
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">Live Enterprise Feeds · Zero Data Loss</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-blue-700 shadow-2xs">
                    Sub-10s Batch
                  </span>
                </div>

                {/* Customer Outcome Banner */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white px-5 py-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <Sparkles className="size-3.5 text-blue-600 shrink-0" />
                      <span className="text-[0.68rem] font-semibold">
                        Validates 100,000+ accounts in seconds with zero duplicate records or ledger mismatches.
                      </span>
                    </div>
                    <span className="font-mono text-[0.62rem] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      100% Integrity
                    </span>
                  </div>
                </div>

                {/* Clickable Feeds Table */}
                <div className="overflow-x-auto p-2">
                  <table className="w-full text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">
                      Enterprise portfolio and banking data ingestion feeds
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Data Source / Pipeline</th>
                        <th scope="col" className="px-4 py-3">Throughput Metric</th>
                        <th scope="col" className="px-4 py-3">Ingestion Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {scope.map((row, idx) => (
                        <tr
                          key={row.work}
                          onClick={() => setSelectedRow(idx)}
                          className={cn(
                            "cursor-pointer transition-colors",
                            selectedRow === idx ? "bg-blue-50/80 font-medium" : "hover:bg-slate-50/60"
                          )}
                        >
                          <th scope="row" className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                            {selectedRow === idx && <span className="size-1.5 rounded-full bg-blue-600" />}
                            {row.work}
                          </th>
                          <td className="px-4 py-3 text-slate-600 font-mono text-[0.72rem]">{row.origin}</td>
                          <td className="px-4 py-3">
                            <span className={cn("rounded px-2 py-0.5 text-[0.62rem] font-bold text-white shadow-2xs", row.statusColor)}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Inspector Context & Action Trigger */}
                <div className="m-2 rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[0.65rem] font-mono font-bold text-blue-700 uppercase block">Pipeline Integrity Context:</span>
                    <p className="font-semibold text-slate-900 text-[0.72rem]">{activeRecord.detail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast(activeRecord.actionToast)}
                    className="shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-2xs"
                  >
                    ⚡ Test Ingestion
                  </button>
                </div>
              </div>
              <figcaption className="sr-only">
                Enterprise portfolio data moving through controlled, verified import workflows.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid sm:grid-flow-col sm:grid-rows-5 sm:gap-x-12 sm:gap-y-2 lg:mt-20">
          {capabilities.map((c, i) => (
            <li key={c} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-slate-50/50">
              <Reveal delay={0.03 * (i % 5)}>
                <div className="flex gap-4 items-center">
                  <span
                    className="font-mono text-[0.75rem] font-semibold tracking-widest text-blue-400"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-[0.98rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">{c}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <p className="mt-12 max-w-[62ch] border-l-2 border-blue-500/40 pl-4 text-[0.88rem] leading-relaxed text-slate-500">
            Assigned skip-trace and field-visit worklists can extend account activity
            beyond the desk. BITS provides sovereign APIs for secure third-party field sync.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
