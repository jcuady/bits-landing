"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Logo } from "@/components/ui/logo";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  FolderOpen,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  Sliders,
  PhoneForwarded,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Realistic Debt Account Data (Philippine Enterprise Debt Portfolios) ── */
interface DebtAccount {
  id: string;
  debtor: string;
  portfolio: string;
  balance: string;
  dpd: string;
  status: "ptp_active" | "followup" | "escalated" | "restructured" | "settled";
  statusLabel: string;
  agent: string;
  isSelected?: boolean;
}

const mockAccounts: DebtAccount[] = [
  {
    id: "PH-240101",
    debtor: "Eduardo Tan",
    portfolio: "Auto Loan",
    balance: "₱142,500.00",
    dpd: "18 Days",
    status: "ptp_active",
    statusLabel: "PTP Active",
    agent: "Sarah M.",
    isSelected: true,
  },
  {
    id: "PH-231115",
    debtor: "Camille Mendoza",
    portfolio: "Credit Line",
    balance: "₱68,240.50",
    dpd: "45 Days",
    status: "followup",
    statusLabel: "Follow-up (Amber)",
    agent: "Carlo R.",
  },
  {
    id: "PH-230908",
    debtor: "Danilo Bautista",
    portfolio: "Commercial",
    balance: "₱210,950.00",
    dpd: "102 Days",
    status: "escalated",
    statusLabel: "Escalated (Red)",
    agent: "Michael V.",
  },
  {
    id: "PH-240312",
    debtor: "Lourdes Reyes",
    portfolio: "Personal Loan",
    balance: "₱45,670.00",
    dpd: "8 Days",
    status: "ptp_active",
    statusLabel: "PTP Active",
    agent: "Jenny L.",
  },
  {
    id: "PH-231220",
    debtor: "Alexander Cruz",
    portfolio: "SME Fin",
    balance: "₱92,110.25",
    dpd: "61 Days",
    status: "restructured",
    statusLabel: "Restructured",
    agent: "David S.",
  },
  {
    id: "PH-230719",
    debtor: "Grace Valenzuela",
    portfolio: "Microfinance",
    balance: "₱28,450.00",
    dpd: "14 Days",
    status: "settled",
    statusLabel: "Settled (GCash)",
    agent: "Elena T.",
  },
];

/* ── Realistic BITS OMS Collections Command Center Window Mockup ── */
function CollectionsCommandCenterMockup() {
  const [selectedAccount, setSelectedAccount] = React.useState<string>("PH-240101");

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-blue-950/10 flex flex-col">
      {/* ── macOS / Desktop Window Frame Header ── */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/90 px-3.5 py-2.5 select-none">
        {/* Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F56] border border-red-500/20" />
          <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-amber-500/20" />
          <span className="size-2.5 rounded-full bg-[#27C93F] border border-emerald-500/20" />
        </div>

        {/* Window Title & Live Status */}
        <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-slate-600">
          <span className="hidden sm:inline text-slate-400">BITS OMS</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          <span className="font-semibold text-slate-800">Collections Command Center</span>
        </div>

        {/* Operational Pulse Pill */}
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-200/80">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>0.4s Screen-Pop</span>
        </div>
      </div>

      {/* ── OMS Application Top Bar ── */}
      <div className="border-b border-slate-200/80 bg-white px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Module Indicator */}
        <div className="flex items-center gap-2.5">
          <Logo variant="horizontal" className="h-5 sm:h-5.5 w-auto" />
          <span className="h-3.5 w-px bg-slate-200" />
          <span className="rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-blue-700 border border-blue-200/60">
            OMS Core
          </span>
        </div>

        {/* Search Input Bar (Mockup) */}
        <div className="hidden md:flex flex-1 max-w-xs items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs text-slate-500">
          <Search className="size-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-[11px]">Search by ID, Debtor, or DPD...</span>
          <span className="ml-auto rounded border border-slate-200 bg-white px-1 py-0.2 text-[9px] font-mono font-semibold text-slate-400">
            ⌘K
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-semibold text-slate-700">
            <SlidersHorizontal className="size-3 text-slate-500" />
            <span className="hidden sm:inline">Status:</span> Active PTP
          </span>
          <span className="hidden sm:inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-semibold text-slate-700">
            Days Past Due ▼
          </span>
        </div>
      </div>

      {/* ── OMS Application Workspace: Sidebar + Ledger Table ── */}
      <div className="flex flex-1 min-h-[360px] sm:min-h-[400px] overflow-hidden bg-white">
        {/* Slim Application Sidebar */}
        <div className="hidden sm:flex w-12 flex-col items-center justify-between border-r border-slate-200/80 bg-slate-50/70 py-3 text-slate-500">
          <div className="space-y-3 flex flex-col items-center">
            <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer" title="Dashboard">
              <LayoutGrid className="size-4" />
            </div>
            <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs cursor-pointer" title="Accounts">
              <FolderOpen className="size-4" />
            </div>
            <div className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer" title="Dialer Queue">
              <PhoneCall className="size-4" />
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer" title="PTP Ledger">
              <CalendarCheck className="size-4" />
            </div>
            <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer" title="QA & Compliance">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
            <Sliders className="size-4" />
          </div>
        </div>

        {/* Main Accounts Ledger Table Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Table Header Bar */}
          <div className="border-b border-slate-200/80 bg-slate-50/40 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Debt Collections Management
              </h4>
              <span className="rounded-full bg-blue-100/70 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-700">
                6 Active
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Floor Queue: <span className="font-bold text-emerald-600">● 42 Agents Live</span>
            </div>
          </div>

          {/* Table Scrollable Container */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 pl-4 pr-2">Account ID</th>
                  <th className="py-2.5 px-2">Debtor Name</th>
                  <th className="py-2.5 px-2 hidden sm:table-cell">Portfolio</th>
                  <th className="py-2.5 px-2 text-right">Balance</th>
                  <th className="py-2.5 px-2 text-center">Aging</th>
                  <th className="py-2.5 px-2">PTP Status</th>
                  <th className="py-2.5 pr-4 pl-2 hidden md:table-cell">Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockAccounts.map((acc) => {
                  const isCurrent = selectedAccount === acc.id;

                  return (
                    <tr
                      key={acc.id}
                      onClick={() => setSelectedAccount(acc.id)}
                      className={cn(
                        "transition-colors duration-150 cursor-pointer group",
                        isCurrent
                          ? "bg-blue-50/70 text-blue-950 font-semibold"
                          : "hover:bg-slate-50/80 text-slate-700"
                      )}
                    >
                      <td className="py-2.5 pl-4 pr-2 font-mono font-semibold text-slate-900">
                        <span className="inline-flex items-center gap-1.5">
                          {isCurrent && (
                            <span className="size-1.5 rounded-full bg-blue-600 animate-ping" />
                          )}
                          {acc.id}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {acc.debtor}
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 hidden sm:table-cell">
                        {acc.portfolio}
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900">
                        {acc.balance}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600 text-[10px]">
                        {acc.dpd}
                      </td>
                      <td className="py-2.5 px-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold border",
                            acc.status === "ptp_active" &&
                              "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                            acc.status === "followup" &&
                              "bg-amber-50 text-amber-800 border-amber-200/80",
                            acc.status === "escalated" &&
                              "bg-rose-50 text-rose-700 border-rose-200/80",
                            acc.status === "restructured" &&
                              "bg-sky-50 text-sky-700 border-sky-200/80",
                            acc.status === "settled" &&
                              "bg-blue-50 text-blue-700 border-blue-200/80"
                          )}
                        >
                          <span
                            className={cn(
                              "size-1 rounded-full",
                              acc.status === "ptp_active" && "bg-emerald-500",
                              acc.status === "followup" && "bg-amber-500",
                              acc.status === "escalated" && "bg-rose-500",
                              acc.status === "restructured" && "bg-sky-500",
                              acc.status === "settled" && "bg-blue-600"
                            )}
                          />
                          {acc.statusLabel}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 pl-2 text-slate-500 text-[11px] hidden md:table-cell">
                        {acc.agent}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Active Floating Screen-Pop Telemetry Card (Highlighting BITS Superpower) ── */}
          <div className="border-t border-slate-200/80 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-3 sm:p-3.5 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <PhoneForwarded className="size-3.5 animate-pulse" />
              </div>
              <div className="text-[11px]">
                <div className="flex items-center gap-1.5 font-bold tracking-tight">
                  <span className="text-sky-300 font-mono">LIVE SCREEN-POP:</span>
                  <span>Eduardo Tan (PH-240101)</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Auto Loan · ₱142,500.00 · PTP Commitment: ₱25,000 on Friday
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                SMS Link Dispatched ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section Main Component ── */
export function FeaturesHero() {
  const { openModal } = useConsultationModal();

  return (
    <Section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/25 to-white border-b border-slate-200/70 py-20 md:py-28 lg:py-32"
    >
      {/* Anchor alias for navbar / footer links */}
      <div id="features-hero" className="absolute -top-24" />
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
          {/* Double-Bezel Outer Shell (Machined Hardware Architecture) */}
          <div className="relative rounded-[2.25rem] lg:rounded-[2.75rem] p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-100/90 via-slate-200/50 to-slate-100/90 border border-slate-200/90 shadow-2xl shadow-blue-950/[0.06]">
            {/* Inner Core */}
            <div className="relative rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.75rem-0.75rem)] bg-white border border-slate-100 overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)]">
              <div className="grid lg:grid-cols-[1fr_1.3fr] items-center gap-0">
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

                  {/* High-End Nested Island CTA Buttons (Button-in-Button Architecture) */}
                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => openModal("Collections Command Center Demo")}
                      className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                    >
                      <span>See It In Action</span>
                      <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:bg-white/30 transition-all duration-300 font-bold">
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

                {/* Right: Machined BITS OMS Command Center Realistic Mockup Canvas */}
                <div className="relative p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/20 lg:h-full flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-200/80">
                  <CollectionsCommandCenterMockup />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
