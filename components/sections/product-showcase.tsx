"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { collectionAccounts, dashboardStats } from "@/lib/marketing-specimens";

/* ── Precision SVG Micro-Icons (Bespoke 1.5px Geometry — Anti-Slop) ── */
function SoftphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function HudIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12h5" />
      <path d="M17 12h5" />
      <path d="M12 2v5" />
      <path d="M12 17v5" />
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function KanbanIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10.5" y="4" width="5" height="11" rx="1.5" />
      <rect x="18" y="4" width="5" height="8" rx="1.5" />
    </svg>
  );
}

function FinancialIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
      <circle cx="19" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ── Interactive Tabs Configuration ── */
const tabs = [
  {
    id: "softphone",
    label: "Auto-Calling & Debt Recovery",
    shortLabel: "Auto-Calling",
    icon: SoftphoneIcon,
    badge: "3.2x Connects",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    useCase: "Collection Teams, Lenders & Customer Care",
    pain: "Agents waste hours listening to busy tones and voicemails while payment promises slip through the cracks.",
    solution: "Smart dialer connects agents only when a live customer answers, records notes automatically, and sends instant payment links.",
    metric: "+38% Cash Collected",
  },
  {
    id: "supervision",
    label: "Live Team Coaching & Audio AI",
    shortLabel: "Team Monitor",
    icon: HudIcon,
    badge: "100% Call Audit",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    useCase: "Floor Managers, Team Leads & Supervisors",
    pain: "Managers can't listen to every call, missing bad customer experiences and agent mistakes.",
    solution: "Real-time speech helper watches all live calls, flags frustrated customers, and lets managers whisper tips to agents on the fly.",
    metric: "100% Call Visibility",
  },
  {
    id: "kanban",
    label: "Sales Deals & Fast Quotes",
    shortLabel: "Sales Pipeline",
    icon: KanbanIcon,
    badge: "Fast Quotes",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    useCase: "Sales Reps, Wholesalers & Field Teams",
    pain: "Opportunities get lost in disorganized files and reps take days to create pricing proposals.",
    solution: "Simple visual board to move deals from lead to won, with 1-click price quotes sent straight to customer email.",
    metric: "Fast Proposal Delivery",
  },
  {
    id: "financials",
    label: "Instant Bookkeeping & Taxes",
    shortLabel: "Accounting",
    icon: FinancialIcon,
    badge: "Tax-Ready",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    useCase: "Business Owners, Finance Teams & Accountants",
    pain: "Hours lost fixing spreadsheet errors and scrambling to organize receipts during tax deadlines.",
    solution: "Automatic bookkeeping with instant payment logs, easy invoice tracking, and 1-click tax-ready reports.",
    metric: "Instant Tax Reports",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ── Interactive View 1: Predictive Softphone & Debt Recovery Queue ── */
function SoftphoneView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [selectedAcc, setSelectedAcc] = React.useState<(typeof collectionAccounts)[number]>(collectionAccounts[0]);
  const [callActive, setCallActive] = React.useState(true);
  const [callSeconds, setCallSeconds] = React.useState(224); // 03:44
  const [ptpConfirmed, setPtpConfirmed] = React.useState(false);

  React.useEffect(() => {
    if (!callActive) return;
    const interval = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callActive]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Top Cockpit Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200/70 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex size-3 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative size-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[0.82rem] font-bold text-slate-900">
                WebRTC SIP Trunk #04 Active
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">
                Encrypted Audio Stream
              </span>
            </div>
            <p className="text-[0.72rem] text-slate-500">
              Pacing Ratio: 3.2:1 · Automated right-party connect detection
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCallActive(!callActive);
              onTriggerToast(
                callActive
                  ? "Call ended. Call log and audio recording saved to secure audit history."
                  : "Dialing next priority debtor in staging bucket..."
              );
            }}
            className={cn(
              "flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all active:scale-[0.97]",
              callActive
                ? "bg-rose-600 text-white hover:bg-rose-700 shadow-xs shadow-rose-600/20"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-xs shadow-blue-600/20"
            )}
          >
            {callActive ? "End Session" : "Dial Next Queue"}
          </button>
        </div>
      </div>

      {/* Main Grid: Debtor Dossier + Live Transcript + Action Console */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Dossier (5 cols) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                  Target Debtor Dossier
                </span>
                <h4 className="text-[0.95rem] font-extrabold text-slate-900">{selectedAcc.id}</h4>
              </div>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[0.7rem] font-bold text-amber-700">
                60 DPD Overdue
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                <span className="text-[0.68rem] text-slate-400">Outstanding Balance</span>
                <p className="mt-0.5 text-[0.92rem] font-extrabold text-slate-900">{selectedAcc.balance}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                <span className="text-[0.68rem] text-slate-400">Campaign Staging</span>
                <p className="mt-0.5 truncate text-[0.82rem] font-bold text-slate-700">{selectedAcc.campaign}</p>
              </div>
            </div>

            {/* Regulatory Compliance Badges */}
            <div className="mt-3 space-y-1.5 rounded-xl border border-emerald-100 bg-emerald-50/40 p-2.5 text-[0.72rem]">
              <div className="flex items-center justify-between text-emerald-800 font-semibold">
                <span>BSP 454/857 Contact Window</span>
                <span className="font-mono text-emerald-600">VERIFIED (15:48 PHT)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>NPC Data Privacy Consent</span>
                <span className="font-mono text-emerald-600">ACTIVE ON FILE</span>
              </div>
            </div>

            {/* Quick Queue Switcher */}
            <div className="mt-3">
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                Up Next in Floor Queue:
              </span>
              <div className="mt-1.5 flex gap-1.5 overflow-x-auto overscroll-x-contain pb-1">
                {collectionAccounts.slice(0, 4).map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setSelectedAcc(acc);
                      onTriggerToast(`Switched dossier view to ${acc.id} (${acc.campaign}).`);
                    }}
                    className={cn(
                      "shrink-0 min-h-[44px] inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-bold transition-all active:scale-[0.97]",
                      selectedAcc.id === acc.id
                        ? "border border-blue-300 bg-blue-50 text-blue-700 shadow-2xs"
                        : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {acc.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Trigger Button */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setPtpConfirmed(true);
                onTriggerToast(`Promise-to-Pay locked for ${selectedAcc.id}: ₱15,000 scheduled with auto-reconciliation.`);
              }}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              <span>{ptpConfirmed ? "✓ PTP Scheduled (₱15,000)" : "Lock Promise-to-Pay (₱15,000)"}</span>
            </button>
          </div>
        </div>

        {/* Right Live Interaction Console (7 cols) */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 shadow-xs lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* Audio Wave & Transcript Stream */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[0.75rem] font-bold text-slate-800">
                  Live Call Audio Stream · {callActive ? formatTimer(callSeconds) : "PAUSED"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {/* Visualizer Wave Bars */}
                {[12, 24, 38, 18, 42, 28, 14, 32, 22, 16].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: callActive ? `${h}px` : "6px" }}
                    className={cn(
                      "w-1 rounded-full transition-all duration-300",
                      callActive ? "bg-blue-600 animate-pulse" : "bg-slate-300"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Real-Time Transcript Feed */}
            <div className="mt-3 space-y-2 rounded-xl border border-slate-200/80 bg-white p-3 font-mono text-[0.72rem]">
              <div className="flex gap-2">
                <span className="font-bold text-blue-600 shrink-0">[03:22 AGENT]:</span>
                <span className="text-slate-700">
                  Good afternoon Mr. Ramos. I see the ₱15,000 restructuring commitment scheduled for Friday.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-emerald-600 shrink-0">[03:31 DEBTOR]:</span>
                <span className="text-slate-800">
                  Yes, send me the QR link on SMS. I will settle via GCash by 2:00 PM.
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1 text-[0.68rem] text-slate-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span>AI Sentiment: Cooperative · High Settlement Likelihood (94%)</span>
              </div>
            </div>
          </div>

          {/* Action Pad: 1-Click QR Ph & SMS Dispatch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => onTriggerToast("Dynamic QR Ph payment link dispatched via SMS to debtor (+63 917 *** 4821).")}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-100 active:scale-[0.98]"
            >
              <span>📲 Send QR Ph SMS</span>
            </button>
            <button
              type="button"
              onClick={() => onTriggerToast("InstaPay payment reference #REF-9812 verified. Balance updated in real-time.")}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-[0.98]"
            >
              <span>💳 Verify InstaPay Ref</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive View 2: Live Supervisor HUD & AI Speech Intelligence ── */
function SupervisionView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [monitoredAgent, setMonitoredAgent] = React.useState("M. Ramos (Desk 04)");

  const agents = [
    { desk: "Desk 04", name: "M. Ramos", account: "ACC-10482", dur: "04:18", sentiment: "94% Positive", status: "Active PTP Call", atRisk: false },
    { desk: "Desk 12", name: "J. Santos", account: "ACC-10817", dur: "01:45", sentiment: "78% Neutral", status: "Skip Tracing Call", atRisk: false },
    { desk: "Desk 19", name: "A. Luna", account: "ACC-11209", dur: "08:12", sentiment: "52% Escalated", status: "Debtor Dispute", atRisk: true },
    { desk: "Desk 27", name: "D. Cruz", account: "ACC-11587", dur: "02:30", sentiment: "91% Calm", status: "Settlement Closing", atRisk: false },
  ];

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Alert Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-3 sm:p-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-bold text-slate-900">
            Supervisor HUD: 48 Floor Channels Live · 100% Speech-to-Text Auditing
          </span>
        </div>
        <span className="rounded-full border border-amber-200 bg-white px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-amber-800 shadow-2xs">
          0 BSP Violations Detected
        </span>
      </div>

      {/* 4 Active Agent Desk Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((ag) => (
          <div
            key={ag.desk}
            onClick={() => {
              setMonitoredAgent(`${ag.name} (${ag.desk})`);
              onTriggerToast(`Channel focused on ${ag.name}. Audio frequency locked.`);
            }}
            className={cn(
              "cursor-pointer rounded-2xl border p-3.5 transition-all active:scale-[0.98]",
              monitoredAgent.includes(ag.desk)
                ? "border-amber-300 bg-amber-50/30 shadow-md ring-1 ring-amber-300"
                : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.68rem] font-bold font-mono text-slate-500">{ag.desk}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                  ag.atRisk
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                )}
              >
                {ag.sentiment}
              </span>
            </div>

            <h5 className="mt-2 text-[0.88rem] font-extrabold text-slate-900">{ag.name}</h5>
            <p className="text-[0.72rem] text-slate-500 font-mono">{ag.account}</p>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[0.7rem]">
              <span className="text-slate-500">Duration</span>
              <span className="font-mono font-bold text-slate-800">{ag.dur}</span>
            </div>

            {/* Live Audio Wave Graphic */}
            <div className="mt-2 flex h-4 items-center justify-center gap-0.5">
              {[6, 12, 16, 8, 14, 10, 6].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={cn("w-1 rounded-full", ag.atRisk ? "bg-rose-400" : "bg-amber-400")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Control Drawer for Selected Agent */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div>
          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
            Active Supervision Target
          </span>
          <p className="text-[0.88rem] font-extrabold text-slate-900">{monitoredAgent}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onTriggerToast(`Silent Audio Listen connected to ${monitoredAgent}. Neither agent nor debtor can hear you.`)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-[0.98]"
          >
            <span>🎧 Silent Listen</span>
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast(`Coach Whisper activated: Only agent ${monitoredAgent} can hear your voice guidance.`)}
            className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 transition-all hover:bg-amber-100 active:scale-[0.98]"
          >
            <span>🗣️ Whisper Coach</span>
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast(`Barge-In Conference joined! You are now live on a 3-way conference call on ${monitoredAgent}.`)}
            className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs shadow-rose-600/20 transition-all hover:bg-rose-700 active:scale-[0.98]"
          >
            <span>🛑 Barge-In Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive View 3: Sales Deal Pipeline & CPQ ── */
function KanbanView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const stages = [
    {
      title: "Inbound Qualified",
      count: 3,
      deals: [
        { name: "Ayala Logistics Group", value: "₱1,850,000", prob: 88, rep: "K. Tan" },
        { name: "Megaworld Retail Core", value: "₱940,000", prob: 74, rep: "J. Ramos" },
      ],
    },
    {
      title: "CPQ Proposal Sent",
      count: 2,
      deals: [
        { name: "San Miguel Foodservice", value: "₱3,200,000", prob: 92, rep: "S. Santos" },
        { name: "Robinson Fleet Ops", value: "₱1,120,000", prob: 85, rep: "K. Tan" },
      ],
    },
    {
      title: "Contract Review",
      count: 1,
      deals: [
        { name: "Metro Pacific Health", value: "₱4,500,000", prob: 96, rep: "M. Cuady" },
      ],
    },
  ];

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Top Value Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-3 sm:p-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-bold text-slate-900">
            Weighted Pipeline: ₱11,610,000 · AI Win Confidence: 92%
          </span>
        </div>
        <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-emerald-800 shadow-2xs">
          +38% Close Rate vs. Static CRM
        </span>
      </div>

      {/* 3 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {stages.map((col) => (
          <div key={col.title} className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <span className="text-[0.75rem] font-bold text-slate-800">{col.title}</span>
                <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[0.65rem] font-bold text-slate-600">
                  {col.count}
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                {col.deals.map((deal) => (
                  <div
                    key={deal.name}
                    onClick={() => onTriggerToast(`Inspecting deal: ${deal.name}. Projected win probability ${deal.prob}%.`)}
                    className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 shadow-2xs transition-all hover:border-blue-300 hover:shadow-xs active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between">
                      <h6 className="text-[0.8rem] font-bold text-slate-900 truncate max-w-[10rem]">{deal.name}</h6>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[0.62rem] font-bold text-emerald-700">
                        {deal.prob}% Win
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-blue-700 font-mono">{deal.value}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600">
                        {deal.rep}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 1-Click CPQ Button */}
            <button
              type="button"
              onClick={() => onTriggerToast(`Generating 1-click CPQ PDF proposal for ${col.deals[0].name} with custom SLA terms...`)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-[0.72rem] font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-[0.98]"
            >
              <span>⚡ Generate 1-Click CPQ Quote</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Interactive View 4: Executive 0-Day Close & Financial Telemetry ── */
function FinancialsView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* 4 Modern KPI Cards (Reference 2 & 3 Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {dashboardStats.map((st) => (
          <div
            key={st.label}
            className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs"
          >
            <span className="text-[0.7rem] font-semibold text-slate-500">{st.label}</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-[1.25rem] font-extrabold text-slate-900 font-mono">{st.value}</span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">
                {st.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Recovery Spline Curve Preview */}
      <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h5 className="text-[0.88rem] font-extrabold text-slate-900">
              Cash Recovery &amp; Liquidation Trajectory (Q1–Q3 2026)
            </h5>
            <p className="text-[0.72rem] text-slate-500">
              Double-entry GL automatic balancing · Verified against BSP &amp; BIR CAS statutory standards
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[0.68rem] font-bold text-indigo-700">
              0-Day Close Active
            </span>
          </div>
        </div>

        {/* CSS/SVG Area Chart */}
        <div className="relative mt-4 h-32 w-full">
          <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,100 C80,85 140,75 220,50 C300,25 380,40 500,10 L500,120 L0,120 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M0,100 C80,85 140,75 220,50 C300,25 380,40 500,10"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
            />
            {/* Interactive Data Nodes */}
            <circle cx="220" cy="50" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <circle cx="500" cy="10" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          </svg>
          <div className="absolute top-2 right-4 rounded-lg bg-slate-900 px-2.5 py-1 text-[0.68rem] font-bold text-white shadow-md">
            Current: ₱4,850,000 (+16.4%)
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
          <div className="flex items-center gap-2 text-[0.72rem] text-slate-500 font-mono">
            <span>CAS Form 2307 Auto-Linked</span>
            <span>•</span>
            <span>Multi-Branch Intercompany Cleared</span>
          </div>
          <button
            type="button"
            onClick={() => onTriggerToast("BIR CAS Computerized Accounting file (XML/PDF) exported to secure auditor vault.")}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>📥 Export BIR CAS Audit Package</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Primary Component Export ── */
export function ProductShowcase() {
  const [activeTab, setActiveTab] = React.useState<TabId>("softphone");
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const activeMeta = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <Section id="bitscrm" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28">
      {/* Anchor alias for backwards compatibility */}
      <div id="product" className="sr-only" />

      {/* Ambient Radial Lighting Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(59,130,246,0.06),rgba(255,255,255,0))]" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-blue-700">
                Interactive Operational Cockpit · Live Preview
              </span>
            </div>

            <h2 className="text-display mt-2 max-w-4xl text-balance font-extrabold tracking-tight text-slate-900">
              Experience the Software in Action.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Before You Deploy.
              </span>
            </h2>

            <p className="text-lede mx-auto mt-4 max-w-[62ch] text-pretty text-slate-600">
              Less words, more solutions. Try the live software simulator below to see auto-calling in action, live team coaching, visual sales boards, and instant tax-ready accounting.
            </p>
          </div>
        </Reveal>

        {/* ── Outer Doppelrand (Double-Bezel) Hardware Container ── */}
        <div className="mt-10 sm:mt-14">
          {/* Role Navigation Tab Pill Strip */}
          <div
            role="tablist"
            aria-label="Interactive Product Cockpit Tabs"
            className="no-scrollbar flex w-full gap-2 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200/90 bg-slate-100/70 p-1.5 shadow-inner"
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const isSelected = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "group relative flex min-h-12 shrink-0 items-center gap-2.5 rounded-xl px-4 text-xs font-bold transition-all duration-200 active:scale-[0.98] sm:min-w-0 sm:flex-1 justify-center",
                    isSelected
                      ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("transition-colors", isSelected ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="hidden md:inline">{t.label}</span>
                  <span className="inline md:hidden">{t.shortLabel}</span>
                  <span className={cn("hidden lg:inline-flex rounded-full px-2 py-0.5 text-[0.62rem] font-bold border", t.badgeColor)}>
                    {t.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Solution & Use Case Strip */}
          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">Target Industry:</span>
                  <span className="text-[0.78rem] font-bold text-slate-800">{activeMeta.useCase}</span>
                </div>
                <p className="text-[0.82rem] text-slate-600">
                  <strong className="text-slate-900">The Problem:</strong> {activeMeta.pain}
                </p>
                <p className="text-[0.82rem] text-blue-700">
                  <strong className="text-blue-900">The BITS Solution:</strong> {activeMeta.solution}
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end items-center">
                <div className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 shadow-2xs text-center md:text-right w-full md:w-auto">
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Verified Impact</span>
                  <p className="text-[0.98rem] font-black text-blue-700 font-mono">{activeMeta.metric}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Hardware Display Chassis */}
          <div className="relative mt-6">
            <figure className="relative mx-auto w-full">
              {/* Outer Machine Bezel */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 ring-1 ring-slate-900/[0.08] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                {/* Inner Workstation Core */}
                <div className="relative overflow-hidden rounded-[calc(2rem-8px)] sm:rounded-[calc(2.5rem-12px)] border border-slate-200/80 bg-white shadow-2xl">
                  {/* macOS Traffic Lights Header & System Telemetry */}
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-[#FF5F56] ring-1 ring-[#E0443E]/50 shadow-2xs" aria-hidden />
                      <span className="size-3 rounded-full bg-[#FFBD2E] ring-1 ring-[#DEA123]/50 shadow-2xs" aria-hidden />
                      <span className="size-3 rounded-full bg-[#27C93F] ring-1 ring-[#1AAB29]/50 shadow-2xs" aria-hidden />
                      <span className="ml-3 hidden text-[0.75rem] font-bold text-slate-700 sm:inline">
                        BITS Enterprise Console · {activeMeta.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[0.72rem]">
                      <span className="hidden sm:inline font-mono text-slate-400">Latency: 14ms · PHT 15:48</span>
                      <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>LIVE ENGINE</span>
                      </span>
                    </div>
                  </div>

                  {/* Toast Feedback Ribbon */}
                  {toastMsg && (
                    <div className="bg-emerald-600 px-4 py-2 text-center text-xs font-bold text-white shadow-inner transition-all animate-in fade-in slide-in-from-top-2">
                      {toastMsg}
                    </div>
                  )}

                  {/* Tab Views with Spring Transition */}
                  <div className="min-h-[22rem] bg-white">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeTab}
                        role="tabpanel"
                        id={`panel-${activeTab}`}
                        aria-labelledby={`tab-${activeTab}`}
                        initial={{ opacity: 0, scale: 0.99, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: -6 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.25,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        {activeTab === "softphone" && <SoftphoneView onTriggerToast={triggerToast} />}
                        {activeTab === "supervision" && <SupervisionView onTriggerToast={triggerToast} />}
                        {activeTab === "kanban" && <KanbanView onTriggerToast={triggerToast} />}
                        {activeTab === "financials" && <FinancialsView onTriggerToast={triggerToast} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <figcaption className="mt-4 text-center text-[0.75rem] font-medium text-slate-400">
                Interactive preview with simulated enterprise data · Click buttons and tabs to experience live software telemetry.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Bottom Call to Action Strip (Apple Button-in-Button Architecture) */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="group relative flex h-13 w-full sm:w-auto items-center justify-center gap-3.5 rounded-full bg-blue-600 pl-6 pr-2.5 text-[0.92rem] font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.98]"
            >
              <span>Schedule Live Interactive Demo</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>

            <Link
              href="/bitscrm"
              className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-[0.92rem] font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
            >
              Read Full Technical Architecture →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
