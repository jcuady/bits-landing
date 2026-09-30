"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  PhoneCall,
  Send,
  Shield,
  Layers,
  Zap,
  Globe2,
  Cpu,
} from "lucide-react";

interface DebtorRecord {
  id: string;
  name: string;
  amount: string;
  ptpDate: string;
  status: "PTP Active" | "Follow-up" | "Escalated" | "Settled";
  desk: string;
}

const queueRecords: DebtorRecord[] = [
  { id: "ACC-8921", name: "Carmela Bautista", amount: "₱24,500.00", ptpDate: "Today, 2:00 PM", status: "PTP Active", desk: "Auto Loan D30" },
  { id: "ACC-9104", name: "Danilo Rodriguez", amount: "₱118,200.00", ptpDate: "Tomorrow", status: "Escalated", desk: "Commercial Credit" },
  { id: "ACC-9482", name: "Grace Fernandez", amount: "₱15,800.00", ptpDate: "Oct 02, 2026", status: "Follow-up", desk: "Personal Credit" },
  { id: "ACC-9671", name: "Eduardo Mendoza", amount: "₱48,000.00", ptpDate: "Paid Today", status: "Settled", desk: "Microfinance D60" },
];

export function Ecosystem() {
  const { openModal } = useConsultationModal();
  const [activeQueueFilter, setActiveQueueFilter] = React.useState<string>("All");
  const [selectedRecord, setSelectedRecord] = React.useState<DebtorRecord>(queueRecords[0]);
  const [dispatchedNotice, setDispatchedNotice] = React.useState<string | null>(null);

  const filteredRecords = activeQueueFilter === "All"
    ? queueRecords
    : queueRecords.filter((r) => r.status === activeQueueFilter);

  const handleAction = (rec: DebtorRecord) => {
    setSelectedRecord(rec);
    setDispatchedNotice(`Dispatched tokenized payment link to ${rec.name} (${rec.amount})`);
    setTimeout(() => setDispatchedNotice(null), 3000);
  };

  return (
    <Section id="ecosystem" className="relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 py-20 sm:py-28 border-b border-sky-100">
      {/* Background Architectural Light Radiance */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.06),transparent)]" />
        <div className="absolute right-0 top-1/4 size-96 rounded-full bg-sky-400/[0.05] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <Sparkles className="size-3.5 text-blue-600" />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700 font-mono">
                Platform Capabilities
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Features To Boost Your Productivity.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                All In One System.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              From live debtor queue management to automated payment link dispatches, every tool is engineered for speed, accuracy, and bank-grade auditability.
            </p>
          </Reveal>
        </div>

        {/* Action Dispatch Feedback Toast */}
        {dispatchedNotice && (
          <div
            role="status"
            className="fixed top-24 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-sky-400/40 bg-[#0a2a66]/95 px-5 py-3 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in"
          >
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
            <span className="flex-1 font-medium">{dispatchedNotice}</span>
          </div>
        )}

        {/* ── 5-CELL GAPLESS BENTO GRID (Strict 12-Column Verification) ── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 grid-flow-dense">
          
          {/* CELL 1: Live Interactive Debtor Queue & Workstation Specimen (8 cols, row-span-2) */}
          <div className="md:col-span-8 md:row-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-sky-950/5">
            <div>
              {/* Header and Filter Controls */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-sky-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
                      Live Queue Command
                    </span>
                  </div>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                    High-Volume Debtor Account Workstation
                  </h3>
                </div>

                {/* Filter Pills with >= 44px touch targets */}
                <div className="flex flex-wrap items-center gap-2">
                  {["All", "PTP Active", "Follow-up", "Escalated"].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveQueueFilter(filter)}
                      className={cn(
                        "min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer",
                        activeQueueFilter === filter
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-sky-50 text-slate-600 hover:bg-sky-100 hover:text-slate-900"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Table Specimen */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-sky-100/80 text-[0.7rem] font-bold uppercase tracking-wider text-slate-600">
                      <th className="pb-3 font-semibold">Account ID</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Balance</th>
                      <th className="pb-3 font-semibold">Schedule</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 text-right font-semibold">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100/60 font-medium">
                    {filteredRecords.map((rec) => {
                      const isSelected = selectedRecord.id === rec.id;
                      return (
                        <tr
                          key={rec.id}
                          onClick={() => setSelectedRecord(rec)}
                          className={cn(
                            "group cursor-pointer transition-colors duration-150",
                            isSelected ? "bg-sky-50/80" : "hover:bg-sky-50/40"
                          )}
                        >
                          <td className="py-3 font-mono text-[0.75rem] font-bold text-blue-700">
                            {rec.id}
                          </td>
                          <td className="py-3 font-bold text-slate-900">
                            {rec.name}
                            <span className="block text-[0.68rem] font-normal text-slate-600">{rec.desk}</span>
                          </td>
                          <td className="py-3 font-mono font-bold text-slate-900">
                            {rec.amount}
                          </td>
                          <td className="py-3 text-slate-600">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3 text-blue-600" />
                              {rec.ptpDate}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-1 text-[0.68rem] font-bold",
                                rec.status === "PTP Active" && "bg-blue-100 text-blue-700",
                                rec.status === "Escalated" && "bg-amber-100 text-amber-800",
                                rec.status === "Follow-up" && "bg-sky-100 text-sky-800",
                                rec.status === "Settled" && "bg-emerald-100 text-emerald-800"
                              )}
                            >
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-2 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(rec);
                              }}
                              className="min-h-[44px] min-w-[70px] inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-2 font-mono text-[0.72rem] font-bold text-white shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <Send className="size-3" />
                              PayLink
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Workstation Bar */}
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-sky-100 bg-sky-50/50 p-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Selected: <strong className="text-slate-900">{selectedRecord.name}</strong> ({selectedRecord.amount})</span>
              </div>
              <button
                type="button"
                onClick={() => openModal(`Operations Console Demo (${selectedRecord.id})`)}
                className="min-h-[44px] inline-flex items-center font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer text-left sm:text-right py-2"
              >
                Launch full interactive preview →
              </button>
            </div>
          </div>

          {/* CELL 2: SLA Milestones & Real-Time Performance (4 cols, row-span-1) */}
          <div className="md:col-span-4 md:row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white p-6 sm:p-7 shadow-xl shadow-sky-950/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 border border-sky-100">
                  <TrendingUp className="size-5" />
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[0.65rem] font-bold text-emerald-700 border border-emerald-200/60">
                  +38% vs Manual
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                Floor SLA &amp; Target Progress
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Live monitoring of daily payment targets and active collector talk-time.
              </p>

              {/* Progress Meters */}
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Daily Cash Recovery Goal</span>
                    <span className="text-blue-600">84.2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-sky-100 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: "84.2%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>First-Call Resolution Rate</span>
                    <span className="text-indigo-600">76.8%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-sky-100 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-600" style={{ width: "76.8%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-sky-100 pt-3 flex items-center justify-between text-[0.72rem] text-slate-600">
              <span>Automatic real-time sync</span>
              <span className="font-mono font-bold text-emerald-600">99.99% Live</span>
            </div>
          </div>

          {/* CELL 3: Statutory Compliance & Philippine Localization (4 cols, row-span-1) */}
          <div className="md:col-span-4 md:row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white p-6 sm:p-7 shadow-xl shadow-sky-950/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 border border-sky-100">
                  <Shield className="size-5" />
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 font-mono text-[0.65rem] font-bold text-blue-700 border border-sky-200">
                  RA 10173 · BSP
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                Philippine Regulatory Guardrails
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Guaranteed alignment with BSP fair collection circulars and NPC privacy standards.
              </p>

              {/* Badges List */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                <span className="rounded-lg bg-sky-50 border border-sky-100 px-2.5 py-1 text-[0.68rem] font-bold text-slate-700">
                  ₱ PHP &amp; $ USD Ready
                </span>
                <span className="rounded-lg bg-sky-50 border border-sky-100 px-2.5 py-1 text-[0.68rem] font-bold text-slate-700">
                  Auto Quiet-Hours 6AM-10PM
                </span>
                <span className="rounded-lg bg-sky-50 border border-sky-100 px-2.5 py-1 text-[0.68rem] font-bold text-slate-700">
                  PII Masking &amp; Role Access
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-sky-100 pt-3 flex items-center justify-between text-[0.72rem] text-slate-600">
              <span>Zero statutory liability risk</span>
              <span className="font-bold text-blue-600">Compliant</span>
            </div>
          </div>

          {/* CELL 4: Omnichannel Workflow Automation (6 cols, row-span-1) */}
          <div className="md:col-span-6 md:row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white p-6 sm:p-7 shadow-xl shadow-sky-950/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 border border-sky-100">
                  <Zap className="size-5" />
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 font-mono text-[0.65rem] font-bold text-blue-700 border border-blue-200/60">
                  Auto-Triggers
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                Omnichannel Payment Triggers
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Automated multi-rail messaging dispatches across SMS, Viber, and WhatsApp when payments are due.
              </p>

              {/* Visual Flow diagram */}
              <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/60 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-blue-600" />
                    <span>PTP Scheduled</span>
                  </div>
                  <span className="text-slate-600">→</span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-indigo-600" />
                    <span>SMS / Viber Link</span>
                  </div>
                  <span className="text-slate-600">→</span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-600" />
                    <span>Instant Ledger Sync</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-sky-100 pt-3 flex items-center justify-between text-[0.72rem] text-slate-600">
              <span>Tokenized GCash, Maya &amp; Bank QR</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>

          {/* CELL 5: Complete Enterprise Connectors Hub (6 cols, row-span-1) */}
          <div className="md:col-span-6 md:row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white p-6 sm:p-7 shadow-xl shadow-sky-950/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 border border-sky-100">
                  <Globe2 className="size-5" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[0.65rem] font-bold text-slate-600">
                  50+ Connectors
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                Connected Enterprise Infrastructure
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Seamless bidirectional sync with your existing core banking, PBX, and accounting software.
              </p>

              {/* Connected Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Asterisk PBX", "Twilio SIP", "GCash Enterprise", "Maya Pay", "SAP ERP", "Salesforce", "Oracle"].map((app) => (
                  <span
                    key={app}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3 py-1 font-mono text-[0.68rem] font-bold text-slate-700 shadow-2xs"
                  >
                    <span className="size-1.5 rounded-full bg-blue-500" />
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-sky-100 pt-3 flex items-center justify-between text-[0.72rem] text-slate-600">
              <span>Webhook, REST &amp; Kafka pipelines</span>
              <span className="font-bold text-blue-600">Two-way Sync</span>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-sky-200 bg-white p-6 sm:flex-row sm:p-8 shadow-md shadow-sky-900/5">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Want to see this live with your own data schema?
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              We can load 1,000 dummy accounts structured to your current portfolio during a private walkthrough.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal("Interactive Schema Walkthrough (Ecosystem)")}
            className="group flex h-12 shrink-0 items-center justify-between gap-3.5 rounded-full bg-blue-600 pl-6 pr-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
          >
            <span>Schedule Walkthrough</span>
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
