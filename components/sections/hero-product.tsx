"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type StakeholderRole = "business_owner" | "manager" | "supervisor" | "agent";

interface AccountRecord {
  id: string;
  name: string;
  category: string;
  balance: number;
  assignedTo: string;
  status: "ptp_kept" | "in_call" | "ptp_alert" | "settled";
  statusText: string;
  ptpDate: string;
}

const INITIAL_ACCOUNTS: AccountRecord[] = [
  {
    id: "ACC-10482",
    name: "Metro Retail Logistics",
    category: "Corporate Fleet",
    balance: 64250,
    assignedTo: "Sarah Chen · Desk 14",
    status: "in_call",
    statusText: "Live Call Connected",
    ptpDate: "Today · 2:30 PM",
  },
  {
    id: "ACC-10817",
    name: "Atty. Rafael Dizon",
    category: "Commercial Loan",
    balance: 142800,
    assignedTo: "Mark Ramos · Desk 08",
    status: "ptp_kept",
    statusText: "₱15K Payment Reconciled",
    ptpDate: "Cleared 11:20 AM",
  },
  {
    id: "ACC-11209",
    name: "Cebu Maritime Freight",
    category: "Revolving Line",
    balance: 88400,
    assignedTo: "Ana Luna · Desk 22",
    status: "ptp_alert",
    statusText: "Promise Broken · Follow-up",
    ptpDate: "Overdue 2 Days",
  },
  {
    id: "ACC-11587",
    name: "National Steel Corp",
    category: "Enterprise Equipment",
    balance: 320000,
    assignedTo: "David Cruz · Desk 03",
    status: "settled",
    statusText: "Full Settlement Approved",
    ptpDate: "Final Release Paid",
  },
];

const ROLES: {
  id: StakeholderRole;
  label: string;
  subtitle: string;
  highlightKpi: string;
  focusMessage: string;
}[] = [
  {
    id: "business_owner",
    label: "Business Owners",
    subtitle: "Big Picture Financials",
    highlightKpi: "revenue",
    focusMessage: "Real-time recovered cash flow, zero MIS reporting delay, full audit compliance.",
  },
  {
    id: "manager",
    label: "Operations Managers",
    subtitle: "Floor Telemetry",
    highlightKpi: "velocity",
    focusMessage: "Instant staffing adherence, dialer pacing at 3.2:1, zero dropped customer calls.",
  },
  {
    id: "supervisor",
    label: "Floor Supervisors",
    subtitle: "1-Click Coaching",
    highlightKpi: "qa",
    focusMessage: "Live call listen & whisper coaching, automated scorecards, 14-day action plans.",
  },
  {
    id: "agent",
    label: "Floor Agents",
    subtitle: "Single-Screen Flow",
    highlightKpi: "adherence",
    focusMessage: "Integrated WebRTC dialer, customer history, and instant QR Ph payment links in 1 view.",
  },
];

export function HeroProduct({ className }: { className?: string }) {
  const [role, setRole] = React.useState<StakeholderRole>("business_owner");
  const [accounts, setAccounts] = React.useState<AccountRecord[]>(INITIAL_ACCOUNTS);
  const [dailyCollected, setDailyCollected] = React.useState<number>(4820500);
  const [activeCallsCount, setActiveCallsCount] = React.useState<number>(34);
  const [qaScore, setQaScore] = React.useState<number>(98.4);
  const [filter, setFilter] = React.useState<string>("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [callDuration, setCallDuration] = React.useState<number>(224); // 03:44
  const [isWhispering, setIsWhispering] = React.useState<boolean>(false);

  // Live timer tick for active call realism
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    const t = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(t);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSimulatePayment = () => {
    setDailyCollected((prev) => prev + 15000);
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === "ACC-10482"
          ? {
              ...acc,
              balance: acc.balance - 15000,
              status: "ptp_kept",
              statusText: "₱15K InstaPay Reconciled",
            }
          : acc
      )
    );
    triggerToast("Payment received: ₱15,000 via QR Ph / InstaPay. Ledger auto-reconciled in real time.");
  };

  const handleToggleWhisper = () => {
    setIsWhispering((v) => !v);
    triggerToast(
      !isWhispering
        ? "Supervisor Whisper active on Desk 14: You are speaking directly to Sarah Chen without the customer hearing."
        : "Supervisor Whisper disconnected. Call continuing in standard two-way mode."
    );
  };

  const handleRunQaAudit = () => {
    setQaScore(99.1);
    triggerToast("Automated AI QA Completed: Desk 14 scored 99% on identity disclosure & negotiation compliance.");
  };

  const handlePaceDialer = () => {
    setActiveCallsCount((c) => (c >= 38 ? 32 : c + 4));
    triggerToast("Telephony Pacing adjusted to 3.4:1. Connect queue re-balanced across all 48 active desks.");
  };

  const filteredAccounts = React.useMemo(() => {
    if (filter === "in_call") return accounts.filter((a) => a.status === "in_call");
    if (filter === "ptp") return accounts.filter((a) => a.status === "ptp_kept");
    if (filter === "alerts") return accounts.filter((a) => a.status === "ptp_alert");
    return accounts;
  }, [accounts, filter]);

  const activeRoleConfig = ROLES.find((r) => r.id === role) ?? ROLES[0];

  return (
    <figure className={cn("relative mx-auto w-full max-w-[1240px]", className)}>
      {/* Outer Double-Bezel Hardware Frame (Agency Awwwards-Grade) */}
      <div className="relative rounded-[2rem] p-2 sm:p-3 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 ring-1 ring-slate-900/10 shadow-[0_30px_90px_-20px_rgba(6,22,47,0.22)] backdrop-blur-xl">
        {/* Inner Workstation Core */}
        <div className="relative overflow-hidden rounded-[calc(2rem-6px)] border border-slate-200/90 bg-white text-slate-900 shadow-2xl">
          {/* Top Command Bar: Window Controls + Brand Identification + Status Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-900 px-4 py-3 sm:px-6 text-white">
            <div className="flex items-center gap-3">
              {/* Window Capsules */}
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#FF5F56]" />
                <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="size-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="h-4 w-px bg-slate-700" aria-hidden />
              <div>
                <span className="text-xs font-black tracking-wider uppercase text-white">
                  OPERATIONS 360
                </span>
                <span className="ml-2 hidden text-[10px] font-mono text-slate-400 sm:inline">
                  CORE PLATFORM · MANILA FLOOR 04
                </span>
              </div>
            </div>

            {/* Live Operational Status Meter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-slate-800/90 px-3 py-1 text-[11px] font-mono text-emerald-400 border border-slate-700">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>48 AGENTS ACTIVE · 0 QUEUE DELAY</span>
              </div>
              <span className="hidden text-[10px] font-mono text-slate-400 md:inline">
                LATENCY 12MS
              </span>
            </div>
          </div>

          {/* Interactive Role Lens Controller Bar (CRO Perspective Switcher) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <span className="text-[11px] uppercase tracking-wider text-slate-400">View Lens:</span>
              <div className="flex items-center gap-1">
                {ROLES.map((r) => {
                  const isCurrent = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setRole(r.id);
                        triggerToast(`Switched view to ${r.label}: ${r.focusMessage}`);
                      }}
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                        isCurrent
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                      )}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden sm:block">
              <span className="font-semibold text-slate-800">{activeRoleConfig.subtitle}:</span>{" "}
              <span>{activeRoleConfig.focusMessage}</span>
            </div>
          </div>

          {/* Operational Pulse: 4 High-Impact Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-200/80 bg-white">
            {/* Metric 1: Cashflow / PTP Recovery */}
            <div className={cn(
              "border-r border-b lg:border-b-0 border-slate-200/80 p-4 transition-colors",
              role === "business_owner" && "bg-blue-50/40"
            )}>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <span>Collections MTD</span>
                <span className="rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.2 font-mono text-[10px] font-bold">
                  +14.2% TODAY
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-mono">
                  ₱{dailyCollected.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Daily Target: ₱5.0M</span>
                <span className="font-bold text-slate-600">86% Achieved</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "86%" }} />
              </div>
            </div>

            {/* Metric 2: Live Floor Telephony */}
            <div className={cn(
              "border-b lg:border-b-0 lg:border-r border-slate-200/80 p-4 transition-colors",
              role === "manager" && "bg-blue-50/40"
            )}>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <span>Live Calls In Progress</span>
                <span className="rounded bg-blue-100 text-blue-800 px-1.5 py-0.2 font-mono text-[10px] font-bold">
                  3.2:1 PACING
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-mono">
                  {activeCallsCount} Connected
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Avg Talk Time: 3m 42s</span>
                <span className="font-bold text-emerald-600">0% Abandon</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "74%" }} />
              </div>
            </div>

            {/* Metric 3: Automated QA Compliance */}
            <div className={cn(
              "border-r border-slate-200/80 p-4 transition-colors",
              role === "supervisor" && "bg-blue-50/40"
            )}>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <span>QA Compliance Audit</span>
                <span className="rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.2 font-mono text-[10px] font-bold">
                  AUDITED
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-mono">
                  {qaScore}%
                </span>
                <span className="text-[11px] font-bold text-slate-500 font-mono">GRADE A+</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>142 Evaluations Logged</span>
                <span className="font-bold text-slate-600">Zero Fatal</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: "98%" }} />
              </div>
            </div>

            {/* Metric 4: Workforce Adherence */}
            <div className={cn(
              "p-4 transition-colors",
              role === "agent" && "bg-blue-50/40"
            )}>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <span>Workforce Adherence</span>
                <span className="rounded bg-slate-100 text-slate-700 px-1.5 py-0.2 font-mono text-[10px] font-bold">
                  WFM SYNC
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-mono">
                  97.9%
                </span>
                <span className="text-[11px] font-bold text-emerald-600 font-mono">ON SCHEDULE</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>48 / 48 Stations Manned</span>
                <span className="font-bold text-slate-600">0 Absent</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: "97%" }} />
              </div>
            </div>
          </div>

          {/* Main Operational Split Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left Column (8 cols): Live Calling HUD & Active Accounts CRM */}
            <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                {/* Active Live Call Strip (The Focal Visual Hook) */}
                <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 p-3.5 mb-4 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-100 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-blue-600" />
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        Live Call: Desk 14 · Sarah Chen
                      </span>
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-700">
                        CALL DURATION: {formatSeconds(callDuration)}
                      </span>
                    </div>

                    {/* Supervisor Whisper / Listen In Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleToggleWhisper}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer",
                          isWhispering
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                        )}
                      >
                        {isWhispering ? "Whisper Active (Mute)" : "Whisper Coach"}
                      </button>
                      <button
                        type="button"
                        onClick={handleRunQaAudit}
                        className="rounded-md bg-blue-600 text-white px-2.5 py-1 text-[11px] font-bold hover:bg-blue-700 transition cursor-pointer"
                      >
                        Instant QA Check
                      </button>
                    </div>
                  </div>

                  {/* Customer Conversation Sub-row with Live Audio Visualizer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Speaking with:</span>{" "}
                      <strong className="text-slate-900 font-bold">Carlos Tan (Director, Apex Logistics)</strong>
                      <span className="ml-2 font-mono text-[11px] text-slate-400">· ACC-10482 · Balance: ₱64,250</span>
                    </div>

                    {/* Audio Waveform Bars (No icon, pure dynamic CSS bars) */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900/5">
                      <span className="text-[10px] font-mono font-bold text-slate-500 mr-1.5">VOICE STREAM</span>
                      <span className="h-4 w-1 bg-blue-600 rounded-full animate-pulse" />
                      <span className="h-6 w-1 bg-blue-500 rounded-full animate-pulse delay-75" />
                      <span className="h-3 w-1 bg-blue-400 rounded-full animate-pulse delay-150" />
                      <span className="h-5 w-1 bg-blue-600 rounded-full animate-pulse delay-100" />
                      <span className="h-2 w-1 bg-blue-400 rounded-full" />
                      <span className="h-4 w-1 bg-blue-500 rounded-full animate-pulse delay-200" />
                      <span className="h-5 w-1 bg-blue-600 rounded-full animate-pulse delay-75" />
                    </div>
                  </div>
                </div>

                {/* Queue Filter Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">Priority Accounts</span>
                    <span className="text-[11px] font-mono text-slate-400">(48 in Floor Queue)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[
                      { id: "all", label: "All Records" },
                      { id: "in_call", label: "Active Calls" },
                      { id: "ptp", label: "PTP Kept" },
                      { id: "alerts", label: "Action Alerts" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFilter(f.id)}
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[10px] font-bold transition cursor-pointer",
                          filter === f.id
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real-Time Account Records Table */}
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        <th className="py-2 px-3">Account & Debtor</th>
                        <th className="py-2 px-3">Balance</th>
                        <th className="py-2 px-3">Assigned Desk</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {filteredAccounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900">{acc.name}</div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {acc.id} · {acc.category}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                            ₱{acc.balance.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            <span className="font-medium">{acc.assignedTo}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={cn(
                                "inline-block rounded px-2 py-0.5 text-[10px] font-bold",
                                acc.status === "in_call" && "bg-blue-100 text-blue-800",
                                acc.status === "ptp_kept" && "bg-emerald-100 text-emerald-800",
                                acc.status === "ptp_alert" && "bg-amber-100 text-amber-800",
                                acc.status === "settled" && "bg-purple-100 text-purple-800"
                              )}
                            >
                              {acc.statusText}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {acc.status === "in_call" ? (
                              <button
                                type="button"
                                onClick={handleSimulatePayment}
                                className="rounded bg-emerald-600 text-white px-2 py-1 text-[10px] font-bold hover:bg-emerald-700 transition cursor-pointer"
                              >
                                Log ₱15K Payment
                              </button>
                            ) : acc.status === "ptp_alert" ? (
                              <button
                                type="button"
                                onClick={() => triggerToast(`Priority Escalation triggered for ${acc.id}. Supervisor assigned.`)}
                                className="rounded bg-amber-600 text-white px-2 py-1 text-[10px] font-bold hover:bg-amber-700 transition cursor-pointer"
                              >
                                Escalate
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => triggerToast(`Dialing ${acc.name} on secondary phone line...`)}
                                className="rounded border border-slate-200 text-slate-700 px-2 py-1 text-[10px] font-bold hover:bg-slate-100 transition cursor-pointer"
                              >
                                Direct Call
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Quick Metric Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
                <div>Next Automated Batch: 14 Accounts at 2:00 PM</div>
                <div className="text-slate-700 font-bold">BSP Circular 454 Compliance Mode Active</div>
              </div>
            </div>

            {/* Right Column (4 cols): Real-Time Supervisory QA & 1-Click Interactive Triggers */}
            <div className="lg:col-span-4 p-4 sm:p-5 bg-slate-50/50 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Panel 1: Live QA Scorecard & Checklist */}
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Live QA Audit · Desk 14
                    </span>
                    <span className="rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] px-1.5 py-0.2">
                      SCORE: 98/100
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Identity Verification</span>
                      <strong className="text-emerald-600 font-mono font-bold">VERIFIED</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Mandatory Disclosure</span>
                      <strong className="text-emerald-600 font-mono font-bold">COMPLIANT</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Settlement PTP Terms</span>
                      <strong className="text-emerald-600 font-mono font-bold">SECURED</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Professional Demeanor</span>
                      <strong className="text-emerald-600 font-mono font-bold">100%</strong>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Live Coaching Log & LMS Action Plan */}
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Coaching & LMS Log
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      14-DAY ACTION
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="font-bold text-slate-900">Desk 08: Mark Ramos</div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Focus: Re-framing payment terms on high-balance accounts. Micro-LMS module &ldquo;Corporate Negotiation&rdquo; assigned.
                    </p>
                    <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Action Review: Tomorrow</span>
                      <span className="text-blue-600 font-bold">IN PROGRESS</span>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Interactive Sandbox Triggers (Test the Platform Live) */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 mb-2">
                    Test Platform Actions (Click to Test)
                  </span>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleSimulatePayment}
                      className="w-full text-left rounded-lg bg-white border border-blue-200 px-3 py-2 text-xs font-bold text-blue-900 hover:bg-blue-600 hover:text-white transition shadow-2xs cursor-pointer flex items-center justify-between"
                    >
                      <span>Simulate ₱15K Payment</span>
                      <span className="text-xs font-mono">→</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePaceDialer}
                      className="w-full text-left rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-900 hover:text-white transition shadow-2xs cursor-pointer flex items-center justify-between"
                    >
                      <span>Re-Pace Auto-Dialer</span>
                      <span className="text-xs font-mono">3.4:1</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRunQaAudit}
                      className="w-full text-left rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-900 hover:text-white transition shadow-2xs cursor-pointer flex items-center justify-between"
                    >
                      <span>Run AI Compliance Audit</span>
                      <span className="text-xs font-mono">Run</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  ONE SYSTEM · ONE VIEW · ONE SOURCE OF TRUTH
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Reactive Toast Banner */}
          {toastMessage && (
            <div className="border-t border-slate-200 bg-slate-900 text-white px-4 py-2.5 text-xs flex items-center justify-between animate-in fade-in slide-in-from-bottom duration-200">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-emerald-300 font-bold">SYSTEM TELEMETRY:</span>
                <span>{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
              >
                DISMISS
              </button>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
