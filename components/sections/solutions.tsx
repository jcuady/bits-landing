"use client";

import * as React from "react";
import { solutions } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2, ShieldCheck, PhoneCall, Send, FileCheck, ArrowUpRight, Activity, Zap } from "lucide-react";
import { BionisLogo } from "@/components/bionis/logo";

const ctaClass =
  "group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-blue-700";

function Bezel({
  title,
  kicker,
  children,
  badgeText = "Live",
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
  badgeText?: string;
}) {
  return (
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
            <p className="text-[0.75rem] font-semibold text-slate-700">{title}</p>
            <p className="truncate text-[0.68rem] font-medium text-slate-500">{kicker}</p>
          </div>
        </div>
        <span className="relative flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-600">{badgeText}</span>
        </span>
      </div>
      <div className="bg-white p-2">
        {children}
      </div>
    </div>
  );
}

function Caps({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-3 border-t border-slate-100 pt-6">
      {items.map((c, i) => (
        <li
          key={c}
          className="group flex items-center gap-4"
        >
          <span className="font-mono text-[0.7rem] font-semibold tracking-widest text-blue-400">
            {String(i + 1).padStart(2, "0")}.
          </span>
          <span className="text-[0.9rem] font-medium leading-relaxed text-slate-700 transition-colors group-hover:text-slate-900">{c}</span>
        </li>
      ))}
    </ul>
  );
}

function CrmSpecimen() {
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [toast, setToast] = React.useState<string | null>(null);
  const [timeline, setTimeline] = React.useState<"today" | "7d" | "30d">("7d");

  const rows = [
    {
      account: "M. Santos",
      accNo: "#ACC-10482",
      balance: "₱48,500",
      work: "PTP Due Today",
      state: "Active Call",
      stateColor: "bg-[#1975f2] text-white",
      action: "Send GCash QR Link",
      actionToast: "Dispatched tokenized GCash settlement link to M. Santos (₱20,000 commitment).",
      detail: "45 DPD · Softphone connected (03:42) · Debtor committed to payment by Friday.",
      score: "89%",
    },
    {
      account: "J. Reyes",
      accNo: "#ACC-10817",
      balance: "₱15,200",
      work: "SMS Link Clicked",
      state: "Awaiting GCash",
      stateColor: "bg-[#00b153] text-white",
      action: "Verify Maya Receipt",
      actionToast: "Verified incoming Maya settlement webhook: ₱15,200 credited to ACC-10817.",
      detail: "Debtor opened settlement portal on iPhone Safari. Payment initiated.",
      score: "94%",
    },
    {
      account: "T. Lim",
      accNo: "#ACC-11209",
      balance: "₱82,000",
      work: "Broken PTP Requeue",
      state: "Supervisor Desk",
      stateColor: "bg-amber-500 text-white",
      action: "Approve Restructure",
      actionToast: "Approved 2-stage installment plan for ACC-11209 with supervisor override.",
      detail: "Broken commitment flagged automatically. Requeued to senior recovery agent.",
      score: "72%",
    },
  ];

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const activeRecord = rows[selectedRow];

  return (
    <div className="bionis-dashboard relative font-sans">
      {toast && (
        <div className="absolute -top-12 left-1/2 z-40 flex w-[94%] -translate-x-1/2 items-center gap-2 rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xl animate-in fade-in">
          <CheckCircle2 className="size-4 text-[#00b153] shrink-0" />
          <p className="flex-1 truncate">{toast}</p>
        </div>
      )}

      {/* Outer Hardware Shell with Bionis Double-Bezel */}
      <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-2 shadow-2xl shadow-blue-950/10 dark:border-[#222] dark:bg-[#141414]">
        {/* Bionis Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#eeefe9] bg-[#fafafa] px-4 py-3 dark:border-[#222] dark:bg-[#18181b] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <BionisLogo className="size-6 text-[#1975f2]" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  BITScrm
                </span>
                <span className="rounded-full bg-[#1975f2]/10 px-1.5 py-0.2 text-[0.62rem] font-bold text-[#1975f2]">
                  Bionis HUD
                </span>
              </div>
              <p className="text-[0.65rem] text-neutral-500">Delinquent Staging · BSP 454 Compliant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-neutral-200 bg-white p-0.5 text-[0.65rem] font-medium dark:border-neutral-800 dark:bg-neutral-900">
              {(["today", "7d", "30d"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(t)}
                  className={cn(
                    "rounded px-2 py-0.5 font-bold uppercase transition-colors cursor-pointer",
                    timeline === t
                      ? "bg-[#1975f2] text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b153] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#00b153]" />
            </span>
          </div>
        </div>

        {/* Inner Core: Micro KPI Strip */}
        <div className="p-3 bg-neutral-50/60 dark:bg-neutral-900/40">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-neutral-200/80 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
              <div className="flex items-center justify-between text-[0.65rem] font-bold text-neutral-500 uppercase tracking-wider">
                <span>Recovery Score</span>
                <span className="text-[#1975f2] font-mono">92/100</span>
              </div>
              <p className="mt-1 text-sm font-extrabold font-mono text-neutral-900 dark:text-white">
                Optimal
              </p>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <div className="h-full rounded-full bg-[#1975f2]" style={{ width: "92%" }} />
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
              <div className="flex items-center justify-between text-[0.65rem] font-bold text-neutral-500 uppercase tracking-wider">
                <span>RPC Rate</span>
                <span className="text-[#00b153] font-bold">+38%</span>
              </div>
              <p className="mt-1 text-sm font-extrabold font-mono text-neutral-900 dark:text-white">
                78.4%
              </p>
              <p className="mt-0.5 text-[0.62rem] text-neutral-500">Live WebRTC connected</p>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
              <div className="flex items-center justify-between text-[0.65rem] font-bold text-neutral-500 uppercase tracking-wider">
                <span>Collected</span>
                <span className="text-[#1975f2] font-bold">+18.6%</span>
              </div>
              <p className="mt-1 text-sm font-extrabold font-mono text-neutral-900 dark:text-white">
                ₱482.5K
              </p>
              <p className="mt-0.5 text-[0.62rem] text-neutral-500">PTP commitments</p>
            </div>
          </div>

          {/* AI Prediction Callout */}
          <div className="mt-2.5 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-2 text-xs dark:border-blue-900/50 dark:bg-blue-950/30">
            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <Sparkles className="size-3.5 text-[#1975f2] shrink-0" />
              <span className="font-medium text-[0.7rem]">
                <strong className="font-bold text-[#1975f2]">Bionis Telemetry: </strong>
                Auto-assigned 14 broken commitments to prime call window. PTP probability elevated +34%.
              </span>
            </div>
            <span className="font-mono text-[0.65rem] font-bold text-[#1975f2] bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 shrink-0 hidden sm:inline-block">
              &lt; 300ms Dial Latency
            </span>
          </div>

          {/* Accounts Staging Queue */}
          <div className="mt-2.5 overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[22rem] text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/80 text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/40">
                    <th className="px-3 py-2">Debtor &amp; ID</th>
                    <th className="px-3 py-2">Balance</th>
                    <th className="px-3 py-2">Queue / Stage</th>
                    <th className="px-3 py-2 text-right">Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-[0.72rem] dark:divide-neutral-800">
                  {rows.map((row, idx) => (
                    <tr
                      key={row.account}
                      onClick={() => setSelectedRow(idx)}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedRow === idx
                          ? "bg-blue-50/80 font-medium dark:bg-blue-950/40"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                      )}
                    >
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 items-center justify-center rounded-full bg-neutral-200 text-[0.62rem] font-bold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                            {row.account.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-neutral-900 dark:text-neutral-100">{row.account}</p>
                            <p className="font-mono text-[0.62rem] text-neutral-400">{row.accNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 font-mono font-bold text-neutral-900 dark:text-neutral-100">
                        {row.balance}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={cn("rounded-md px-2 py-0.5 text-[0.62rem] font-bold shadow-2xs", row.stateColor)}>
                          {row.work}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono font-bold text-[#1975f2]">
                        {row.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/80 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 block">
                  Active Intelligence Context:
                </span>
                <p className="text-[0.72rem] font-medium text-neutral-800 dark:text-neutral-200 truncate">
                  {activeRecord.detail}
                </p>
              </div>
              <button
                type="button"
                onClick={() => trigger(activeRecord.actionToast)}
                className="shrink-0 rounded-xl bg-[#1975f2] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1975f2]/90 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                ⚡ {activeRecord.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinanceSpecimen() {
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [toast, setToast] = React.useState<string | null>(null);

  const rows = [
    {
      item: "Broken PTP Auto-Requeue",
      desk: "Recovery Desk Alpha",
      state: "Immediate Dial",
      stateColor: "bg-blue-600 text-white",
      action: "Trigger Auto-Dialer",
      actionToast: "Auto-dialer initiated outbound call to broken PTP debtor pool.",
      detail: "Debtor missed Friday payment. Re-enrolled in high-priority morning campaign.",
    },
    {
      item: "30-Day Restructure Request",
      desk: "Dispute Desk Beta",
      state: "Supervisor Review",
      stateColor: "bg-amber-500 text-white",
      action: "Approve 20% Waiver",
      actionToast: "20% penalty fee waiver approved under statutory financial hardship rules.",
      detail: "Borrower submitted hospitalization certificate. Waiver logged to audit.",
    },
    {
      item: "Tokenized Settlement Clear",
      desk: "Escrow Clearing Desk",
      state: "Settled (₱25,000)",
      stateColor: "bg-emerald-600 text-white",
      action: "Issue Certificate of Full Payment",
      actionToast: "Issued Certificate of Full Payment with digital notarization hash.",
      detail: "Full debt liquidation confirmed via InstaPay BDO corporate clearing.",
    },
  ];

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const activeRecord = rows[selectedRow];

  return (
    <div className="relative">
      {toast && (
        <div className="absolute -top-10 left-1/2 z-30 flex w-[94%] -translate-x-1/2 items-center gap-2 rounded-lg bg-emerald-900 px-3 py-2 text-xs text-white shadow-lg animate-in fade-in">
          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
          <p className="flex-1 truncate">{toast}</p>
        </div>
      )}

      <Bezel title="Recovery Strategies &amp; PTP Engine" kicker="Automated Commitments · BSP Protected">
        <div className="m-2 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-800">
            <Sparkles className="size-3.5 text-indigo-600 shrink-0" />
            <span className="font-semibold text-[0.68rem]">
              Converts verbal promises into verified cash with pre-due automated reminders.
            </span>
          </div>
          <span className="font-mono text-[0.62rem] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
            0% Lost PTP
          </span>
        </div>

        <div className="overflow-x-auto p-2">
          <table className="w-full min-w-[20rem] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                <th scope="col" className="px-3 py-2.5">Workflow Strategy</th>
                <th scope="col" className="px-3 py-2.5">Assigned Desk</th>
                <th scope="col" className="px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[0.72rem]">
              {rows.map((row, idx) => (
                <tr
                  key={row.item}
                  onClick={() => setSelectedRow(idx)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedRow === idx ? "bg-indigo-50/80 font-medium" : "hover:bg-slate-50/60"
                  )}
                >
                  <td className="whitespace-nowrap px-3 py-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    {selectedRow === idx && <span className="size-1.5 rounded-full bg-indigo-600" />}
                    {row.item}
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{row.desk}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn("rounded px-2 py-0.5 text-[0.62rem] font-bold", row.stateColor)}>
                      {row.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="m-2 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs">
          <div className="min-w-0 flex-1 pr-2">
            <span className="text-[0.65rem] font-bold text-slate-500 uppercase block">Context:</span>
            <p className="text-[0.72rem] font-semibold text-slate-900 truncate">{activeRecord.detail}</p>
          </div>
          <button
            type="button"
            onClick={() => trigger(activeRecord.actionToast)}
            className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </Bezel>
    </div>
  );
}

function AiSpecimen() {
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [toast, setToast] = React.useState<string | null>(null);

  const rows = [
    {
      item: "ACC-10482 (Call Concluded)",
      route: "WebRTC Softphone",
      state: "Dual-Track Audio Saved",
      stateColor: "bg-blue-600 text-white",
      action: "Replay Audio Recording",
      actionToast: "Streaming dual-channel agent/debtor audio recording from secure storage.",
      detail: "03:42 call duration. Both debtor and collector tracks separated for QA audit.",
    },
    {
      item: "ACC-10817 (Payment Portal SMS)",
      route: "SMS Gateway Provider",
      state: "Delivered (Click Confirmed)",
      stateColor: "bg-emerald-600 text-white",
      action: "Send Receipt Push",
      actionToast: "Sent SMS payment receipt with reference #PAY-88219 via telco gateway.",
      detail: "Delivered in 2.4 seconds via direct Smart/Globe telecom aggregator API.",
    },
    {
      item: "ACC-11209 (Formal Restructure Notice)",
      route: "Encrypted Email Provider",
      state: "Opened & Signed",
      stateColor: "bg-violet-600 text-white",
      action: "Export Cryptographic Audit",
      actionToast: "Exported audit certificate verifying debtor digital signature and IP address.",
      detail: "Legal audit log stamped with tamper-evident digital certificate.",
    },
  ];

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const activeRecord = rows[selectedRow];

  return (
    <div className="relative">
      {toast && (
        <div className="absolute -top-10 left-1/2 z-30 flex w-[94%] -translate-x-1/2 items-center gap-2 rounded-lg bg-emerald-900 px-3 py-2 text-xs text-white shadow-lg animate-in fade-in">
          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
          <p className="flex-1 truncate">{toast}</p>
        </div>
      )}

      <Bezel title="Omnichannel Communication &amp; Telephony History" kicker="WebRTC · Telco Gateways · WORM Audited">
        <div className="m-2 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/60 px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-800">
            <Sparkles className="size-3.5 text-violet-600 shrink-0" />
            <span className="font-semibold text-[0.68rem]">
              Dispatches verified payment links within 12 seconds of phone negotiation.
            </span>
          </div>
          <span className="font-mono text-[0.62rem] font-bold text-violet-700 bg-white px-2 py-0.5 rounded border border-violet-200">
            7-Yr Retention
          </span>
        </div>

        <div className="overflow-x-auto p-2">
          <table className="w-full min-w-[20rem] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                <th scope="col" className="px-3 py-2.5">Communication Dispatch</th>
                <th scope="col" className="px-3 py-2.5">Channel Provider</th>
                <th scope="col" className="px-3 py-2.5">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[0.72rem]">
              {rows.map((row, idx) => (
                <tr
                  key={row.item}
                  onClick={() => setSelectedRow(idx)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedRow === idx ? "bg-violet-50/80 font-medium" : "hover:bg-slate-50/60"
                  )}
                >
                  <td className="whitespace-nowrap px-3 py-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    {selectedRow === idx && <span className="size-1.5 rounded-full bg-violet-600" />}
                    {row.item}
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{row.route}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn("rounded px-2 py-0.5 text-[0.62rem] font-bold", row.stateColor)}>
                      {row.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="m-2 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs">
          <div className="min-w-0 flex-1 pr-2">
            <span className="text-[0.65rem] font-bold text-slate-500 uppercase block">Context:</span>
            <p className="text-[0.72rem] font-semibold text-slate-900 truncate">{activeRecord.detail}</p>
          </div>
          <button
            type="button"
            onClick={() => trigger(activeRecord.actionToast)}
            className="shrink-0 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors shadow-2xs"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </Bezel>
    </div>
  );
}

const additionalCapabilities = [
  {
    index: "04",
    title: "Visibility When Conversations Matter Most",
    copy: "Supervisors can listen, whisper, and barge into active calls while clear permissions and monitoring history preserve accountability.",
  },
  {
    index: "05",
    title: "Make Quality Measurable",
    copy: "Use configurable scorecards, evaluations, audit worklists, activity linkage, and agent analysis to make QA consistent and reviewable.",
  },
  {
    index: "06",
    title: "See What Is Happening Across the Operation",
    copy: "Review portfolios, agents, payments, calls, campaigns, activity, access logs, and exportable operational data without invented forecasts.",
  },
] as const;

export function Solutions() {
  const [crm, finance, ai] = solutions;

  return (
    <Section id="solutions" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Core collections platform
            </span>
          </div>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
            Everything your collections team needs to operate.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
            BITS brings account management, agent workflows, customer engagement,
            quality assurance, reporting, and operational controls into one
            role-based workspace.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-20" amount={0.15}>
          <article id="portfolio" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <h3 className="text-h3 font-bold text-slate-900">{crm.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-800">
                  {crm.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {crm.description}
                </p>
                <Caps items={crm.capabilities} />
                <a href="#contact" className={ctaClass}>
                  <span className="relative">
                    Request a Demo
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
              <figure>
                <CrmSpecimen />
                <figcaption className="sr-only">
                  BITS collections account queue using interactive realistic data.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24" amount={0.15} delay={0.06}>
          <article id="workflows" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
              <div className="lg:order-2">
                <h3 className="text-h3 font-bold text-slate-900">{finance.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-800">
                  {finance.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {finance.description}
                </p>
                <Caps items={finance.capabilities} />
                <a href="#contact" className={ctaClass}>
                  <span className="relative">
                    Explore the workflow
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
              <figure className="lg:order-1">
                <FinanceSpecimen />
                <figcaption className="sr-only">
                  BITS collections strategy queue using interactive realistic data.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24" amount={0.15} delay={0.08}>
          <article id="engagement" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <h3 className="text-h3 font-bold text-slate-900">{ai.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-800">
                  {ai.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {ai.description}
                </p>
                <Caps items={ai.capabilities} />
                <a href="#contact" className={ctaClass}>
                  <span className="relative">
                    Discuss communication providers
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
              <figure>
                <AiSpecimen />
                <figcaption className="sr-only">
                  BITS communication history using interactive realistic data.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <div className="mt-20 border-t border-slate-200 lg:mt-28">
          {additionalCapabilities.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.05} y={10}>
              <article className="group grid gap-4 border-b border-slate-100 py-8 transition-colors hover:bg-slate-50/50 sm:grid-cols-[5rem_1fr_1.25fr] sm:gap-8 sm:py-10">
                <p className="font-mono text-sm font-semibold tracking-widest text-blue-400">
                  {item.index}.
                </p>
                <h3 className="text-[1.1rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {item.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
