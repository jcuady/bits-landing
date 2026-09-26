"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { collectionAccounts as initialRows, dashboardStats as initialStats } from "@/lib/marketing-specimens";

type ModuleTab = "dashboard" | "queue" | "ai" | "ptp" | "erp";

interface ModuleConfig {
  id: ModuleTab;
  name: string;
  badge: string | null;
  valueProp: string;
  benefitStat: string;
}

const MODULES: ModuleConfig[] = [
  {
    id: "dashboard",
    name: "BITScrm Dashboard",
    badge: "Live View",
    valueProp: "See all your team calls, customer payments, and daily sales on one simple screen.",
    benefitStat: "Save 4 hours every day",
  },
  {
    id: "queue",
    name: "Auto-Dialer Queue",
    badge: "142 waiting",
    valueProp: "Skips busy tones and voicemail. Connects your staff only when a real person picks up.",
    benefitStat: "3.2x more customer talks",
  },
  {
    id: "ai",
    name: "BITSagent Voice AI",
    badge: "24/7 Live",
    valueProp: "Answers incoming customer questions 24/7 with a friendly, natural voice. Zero hold times.",
    benefitStat: "Sub-300ms turn latency",
  },
  {
    id: "ptp",
    name: "Payment Tracker",
    badge: "₱148k today",
    valueProp: "Send QR and bank payment links straight to customer phones by SMS. Updates your books instantly.",
    benefitStat: "Get paid 38% faster",
  },
  {
    id: "erp",
    name: "Accounting & BIR CAS",
    badge: "Tax Ready",
    valueProp: "Tracks sales, receipts, and government taxes automatically with zero math mistakes.",
    benefitStat: "Audit-ready reports",
  },
];

export function HeroProduct({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = React.useState<ModuleTab>("dashboard");
  const [selectedAccountId, setSelectedAccountId] = React.useState<string>("ACC-10482");
  const [reconciledCount, setReconciledCount] = React.useState<number>(0);
  const [isAutoDialing, setIsAutoDialing] = React.useState<boolean>(true);
  const [feedbackToast, setFeedbackToast] = React.useState<string | null>(null);

  const activeModule = MODULES.find((m) => m.id === activeTab) ?? MODULES[0];

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    const t = setTimeout(() => setFeedbackToast(null), 3500);
    return () => clearTimeout(t);
  };

  const handleSimulatePayment = () => {
    setReconciledCount((c) => c + 1);
    triggerToast("Payment received via QR/InstaPay! Customer balance updated: +₱15,000.");
  };

  const handleToggleAutoDial = () => {
    setIsAutoDialing((v) => !v);
    triggerToast(
      !isAutoDialing
        ? "▶ Auto-dialer started: Automatically connecting your staff to ready customers."
        : "⏸ Auto-dialer paused. Staff finishing active conversations."
    );
  };

  const handleWhisper = () => {
    triggerToast("Private coach tip sent to Staff Desk 14: 'Offer 2-month installment plan.'");
  };

  const handleSendSms = () => {
    triggerToast("Instant payment link sent by SMS to customer (+63 917 *** 4821).");
  };

  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[1120px]",
        className
      )}
    >
      {/* Interactive Doppelrand Outer Machine Bezel */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 ring-1 ring-slate-900/[0.08] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.14),0_0_0_1px_rgba(255,255,255,0.8)_inset] backdrop-blur-xl">
        {/* Inner Workstation Core */}
        <div className="relative overflow-hidden rounded-[calc(2rem-8px)] sm:rounded-[calc(2.5rem-12px)] border border-slate-200/80 bg-white shadow-2xl">
          {/* Apple macOS Traffic Lights & Interactive Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF5F56] ring-1 ring-[#E0443E]/50 shadow-xs" aria-hidden />
              <span className="size-3 rounded-full bg-[#FFBD2E] ring-1 ring-[#DEA123]/50 shadow-xs" aria-hidden />
              <span className="size-3 rounded-full bg-[#27C93F] ring-1 ring-[#1AAB29]/50 shadow-xs" aria-hidden />
              <span className="ml-3 hidden text-[0.75rem] font-bold text-slate-700 sm:inline">
                BITS Business App · {activeModule.name}
              </span>
            </div>

            {/* Interactive Search Omnibar */}
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-[0.75rem] text-slate-500 shadow-xs md:flex">
              <svg className="size-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Click any button below to see how it works</span>
              <kbd className="rounded bg-blue-50 px-1.5 py-0.5 text-[0.62rem] font-bold text-blue-700 ring-1 ring-blue-200">Live Demo</kbd>
            </div>

            {/* Live Telephony Status Indicator */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-[0.68rem] font-bold text-emerald-700">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="uppercase tracking-wider">Live · 48 Staff Connected</span>
            </div>
          </div>

          {/* Sleek Minimalist Operational Value Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-2 sm:px-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-bold text-slate-900">{activeModule.name}:</span>
              <span className="text-[0.75rem] text-slate-600 font-medium">{activeModule.valueProp}</span>
            </div>
            <span className="rounded-full bg-blue-50 border border-blue-200/90 px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-blue-700 shadow-2xs">
              {activeModule.benefitStat}
            </span>
          </div>

          {/* Workspace Body */}
          <div className="flex min-h-[22rem] sm:min-h-[26rem] lg:min-h-[29rem]">
            {/* Clickable Module Sidebar (Desktop & Tablet) */}
            <aside className="hidden w-[13.5rem] shrink-0 flex-col border-r border-slate-100 bg-slate-50/60 p-4 md:flex">
              <div className="mb-4 flex items-center gap-2.5 px-2">
                <div className="flex size-6 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
                  B
                </div>
                <div>
                  <p className="text-[0.8rem] font-bold text-slate-900 leading-none">BITScrm Core</p>
                  <p className="text-[0.65rem] text-slate-500 mt-0.5">Click modules to explore</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1.5" aria-label="Mockup modules">
                {MODULES.map((m) => {
                  const isActive = activeTab === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveTab(m.id)}
                      className={cn(
                        "group flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[0.82rem] font-bold transition-all cursor-pointer",
                        isActive
                          ? "bg-white text-blue-600 shadow-xs ring-1 ring-slate-200"
                          : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-1.5 rounded-full transition-colors",
                            isActive ? "bg-blue-600" : "bg-slate-300 group-hover:bg-slate-400"
                          )}
                        />
                        {m.name}
                      </span>
                      {m.badge && (
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.2 text-[0.62rem] font-bold",
                            isActive ? "bg-blue-50 text-blue-700" : "bg-slate-200/70 text-slate-600"
                          )}
                        >
                          {m.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Telephony Health */}
              <div className="mt-auto border-t border-slate-200/60 pt-3 text-[0.7rem] text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">SIP Trunk Health</span>
                  <span className="font-mono text-emerald-600 font-bold">Optimal</span>
                </div>
                <p className="font-mono text-[0.65rem] text-slate-500 mt-0.5">
                  carrier: PLDT/Globe · 18ms latency
                </p>
              </div>
            </aside>

            {/* Main Interactive Screen Content */}
            <div className="min-w-0 flex-1 bg-white">
              {/* Mobile Module Switcher Bar (visible on < md) */}
              <div className="flex gap-1 overflow-x-auto border-b border-slate-100 bg-slate-50/80 p-2 md:hidden">
                {MODULES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveTab(m.id)}
                    className={cn(
                      "min-h-11 shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer",
                      activeTab === m.id
                        ? "bg-white text-blue-600 shadow-xs ring-1 ring-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              {/* Action Toolbar Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3 sm:px-6">
                <div>
                  <h3 className="text-[0.88rem] font-bold text-slate-900">
                    {activeTab === "dashboard" && "Live Payments & Daily Collections"}
                    {activeTab === "queue" && "Fast Auto-Calling & Phone List"}
                    {activeTab === "ai" && "24/7 AI Phone Assistant & Voice Helper"}
                    {activeTab === "ptp" && "Customer Payment Schedule & QR Code"}
                    {activeTab === "erp" && "Simple Bookkeeping & Tax Invoices"}
                  </h3>
                  <p className="text-[0.72rem] text-slate-500">
                    Click the buttons on the right to test live features
                  </p>
                </div>

                {/* Interactive Simulator Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {activeTab === "dashboard" && (
                    <button
                      type="button"
                      onClick={handleSimulatePayment}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Receive Payment (+₱15,000)</span>
                    </button>
                  )}

                  {activeTab === "queue" && (
                    <button
                      type="button"
                      onClick={handleToggleAutoDial}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all active:scale-[0.98] cursor-pointer",
                        isAutoDialing ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"
                      )}
                    >
                      <span>{isAutoDialing ? "Pause Calling" : "Start Auto-Calling"}</span>
                    </button>
                  )}

                  {activeTab === "ai" && (
                    <button
                      type="button"
                      onClick={handleWhisper}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-violet-700 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Send Coach Note</span>
                    </button>
                  )}

                  {activeTab === "ptp" && (
                    <button
                      type="button"
                      onClick={handleSendSms}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Send Payment Link via SMS</span>
                    </button>
                  )}

                  {activeTab === "erp" && (
                    <button
                      type="button"
                      onClick={() => triggerToast("Tax form BIR 2307 generated successfully! Ready for your records.")}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Download Tax Form PDF</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Toast Banner */}
              {feedbackToast && (
                <div className="mx-5 mt-3 rounded-xl border border-emerald-300 bg-emerald-50/90 p-2.5 text-xs font-bold text-emerald-800 shadow-sm animate-fade-in flex items-center justify-between">
                  <span>{feedbackToast}</span>
                  <button
                    type="button"
                    onClick={() => setFeedbackToast(null)}
                    className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 text-sm"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Dynamic Tab Views */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* 1. DASHBOARD VIEW */}
                {activeTab === "dashboard" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                      {initialStats.map((stat, i) => {
                        const isCollected = stat.label.toLowerCase().includes("collected");
                        const displayVal = isCollected
                          ? `₱${(148500 + reconciledCount * 15000).toLocaleString()}`
                          : stat.value;

                        return (
                          <div
                            key={stat.label}
                            className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 sm:p-4 transition-all hover:border-slate-200 hover:bg-slate-50 shadow-2xs"
                          >
                            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                              {stat.label}
                            </p>
                            <p className="mt-1.5 font-mono text-[1.25rem] sm:text-[1.5rem] font-bold tracking-tight text-slate-900">
                              {displayVal}
                            </p>
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <span className={cn("text-[0.72rem] font-bold", stat.positive ? "text-emerald-600" : "text-red-600")}>
                                {stat.positive ? "↑" : "↓"} {stat.change}
                              </span>
                              {isCollected && reconciledCount > 0 && (
                                <span className="rounded bg-emerald-100 px-1 text-[0.65rem] font-bold text-emerald-800">
                                  +{reconciledCount} verified
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Interactive Clickable Table */}
                    <div className="overflow-hidden rounded-2xl border border-slate-100">
                      <div className="border-b border-slate-100 bg-slate-50/90 px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Active Floor Accounts (Click any row to inspect debtor file)</span>
                        <span className="font-normal text-slate-500">Selected: {selectedAccountId}</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[0.78rem]">
                          <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60 text-[0.65rem] font-bold tracking-wider text-slate-500 uppercase">
                              <th className="px-4 py-2.5">Account ID</th>
                              <th className="px-4 py-2.5">Campaign</th>
                              <th className="px-4 py-2.5">Outstanding Balance</th>
                              <th className="px-4 py-2.5">Resolution Action</th>
                              <th className="px-4 py-2.5 text-right">Interactive</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {initialRows.slice(0, 4).map((row) => {
                              const isSelected = selectedAccountId === row.id;
                              return (
                                <tr
                                  key={row.id}
                                  onClick={() => {
                                    setSelectedAccountId(row.id);
                                    triggerToast(`Selected ${row.id} (${row.campaign}). Ready for dialer or PTP action.`);
                                  }}
                                  className={cn(
                                    "transition-colors cursor-pointer",
                                    isSelected ? "bg-blue-50/60 ring-1 ring-blue-500/20" : "hover:bg-slate-50/60"
                                  )}
                                >
                                  <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-slate-900">
                                    {row.id}
                                    {isSelected && <span className="ml-1 text-blue-600 font-bold">●</span>}
                                  </td>
                                  <td className="px-4 py-3 font-medium text-slate-600">{row.campaign}</td>
                                  <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-slate-900">{row.balance}</td>
                                  <td className="px-4 py-3">
                                    <span
                                      className={cn(
                                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold",
                                        row.status.toLowerCase().includes("ptp")
                                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20"
                                          : row.status.toLowerCase().includes("call")
                                          ? "bg-blue-50 text-blue-700 ring-1 ring-blue-500/20"
                                          : "bg-slate-100 text-slate-700"
                                      )}
                                    >
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerToast(`Dialing ${row.id} via WebRTC softphone...`);
                                      }}
                                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 min-h-[44px] inline-flex items-center justify-center text-[0.68rem] font-bold text-blue-600 hover:bg-blue-50 cursor-pointer"
                                    >
                                      Direct Dial
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PREDICTIVE QUEUE VIEW */}
                {activeTab === "queue" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3">
                        <p className="text-[0.65rem] font-bold text-blue-700 uppercase">Queue Velocity</p>
                        <p className="font-mono text-xl font-bold text-slate-900 mt-1">142 Leads / hr</p>
                        <p className="text-[0.65rem] text-slate-500 mt-0.5">3.2:1 Pacing algorithm active</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                        <p className="text-[0.65rem] font-bold text-emerald-700 uppercase">Drop Rate SLA</p>
                        <p className="font-mono text-xl font-bold text-slate-900 mt-1">0.12%</p>
                        <p className="text-[0.65rem] text-slate-500 mt-0.5">Strict compliance &lt; 3.0% limit</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-[0.65rem] font-bold text-slate-700 uppercase">Live Carrier Trunks</p>
                        <p className="font-mono text-xl font-bold text-slate-900 mt-1">8 / 8 Active</p>
                        <p className="text-[0.65rem] text-slate-500 mt-0.5">Automated caller ID rotation</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-900">Live Auto-Dial Stream Monitor</span>
                        <span className="font-mono text-xs font-bold text-emerald-600">
                          {isAutoDialing ? "● Active Dialing Pacing" : "⏸ Dialing Paused"}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { acc: "ACC-10817", tel: "+63 917 842 1092", state: "Live Connected", agent: "Desk 12 (MT)" },
                          { acc: "ACC-10903", tel: "+63 920 411 9042", state: "Ringing (1.8s)", agent: "Desk 04 (RC)" },
                          { acc: "ACC-11024", tel: "+63 918 392 0184", state: "Bypassed Answering Machine", agent: "Filtered by AI" },
                        ].map((call) => (
                          <div
                            key={call.acc}
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs"
                          >
                            <div>
                              <span className="font-mono font-bold text-slate-900">{call.acc}</span>
                              <span className="text-slate-500 ml-2 font-mono">{call.tel}</span>
                            </div>
                            <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 font-bold text-[0.7rem]">
                              {call.state}
                            </span>
                            <span className="text-slate-500 font-medium text-[0.7rem]">{call.agent}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. AI VOICE SUPERVISOR VIEW */}
                {activeTab === "ai" && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-4">
                      <div className="flex items-center justify-between border-b border-violet-200/60 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-violet-600 animate-pulse" />
                          <span className="text-xs font-bold text-slate-900">Live Call Transcription & Sentiment</span>
                        </div>
                        <span className="rounded-full bg-violet-100 text-violet-800 px-2.5 py-0.5 text-[0.68rem] font-bold">
                          Turn Latency: 240ms · 94% Sentiment
                        </span>
                      </div>
                      <div className="space-y-2 mt-3 text-xs">
                        <div className="flex gap-2">
                          <span className="font-bold text-violet-700 shrink-0">AI Agent:</span>
                          <span className="text-slate-800">&ldquo;Good afternoon Mr. Ramos. I am following up on your account ending in 4821. We can divide this into two installments.&rdquo;</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-emerald-700 shrink-0">Debtor:</span>
                          <span className="text-slate-800">&ldquo;Yes, that works for me. Can you send the GCash QR code to my phone right now?&rdquo;</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-violet-200/60 pt-2 text-[0.7rem]">
                        <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                          <Check className="size-3 text-emerald-600 shrink-0" />
                          <span>PTP Detected: ₱5,000 on Sept 25</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => triggerToast("Supervisor Barge Enabled: You are now whispering directly to the agent's earpiece.")}
                          className="text-violet-700 font-bold hover:underline cursor-pointer"
                        >
                          Enable Live Audio Barge →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. COLLECTIONS & PTP VIEW */}
                {activeTab === "ptp" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                        <h4 className="text-xs font-bold text-slate-900 mb-2">InstaPay / GCash Settlement Channels</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-100">
                            <span>Dynamic QR Ph (BancNet)</span>
                            <span className="font-mono text-emerald-600 font-bold">Instant Credit</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-100">
                            <span>Maya Enterprise Gateway</span>
                            <span className="font-mono text-emerald-600 font-bold">Zero Reversal Risk</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-100">
                            <span>Direct Debit Mandate</span>
                            <span className="font-mono text-slate-600">Auto-Debit BDO/BPI</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
                        <h4 className="text-xs font-bold text-emerald-900 mb-2">Automated Ledger Settlement</h4>
                        <p className="text-xs text-slate-700">
                          When a debtor scans a generated QR Ph code, BITS webhooks verify payment with the Philippine clearing house in under 2 seconds and automatically marks the debt as paid.
                        </p>
                        <button
                          type="button"
                          onClick={handleSimulatePayment}
                          className="mt-3 w-full rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer"
                        >
                          Simulate Incoming Payment (₱15,000)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. ACCOUNTING ERP VIEW */}
                {activeTab === "erp" && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-900">Philippine Tax & eFPS Compliance Module</span>
                        <span className="rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[0.65rem] font-bold">BIR Approved Chart of Accounts</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-slate-100">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">Form 2307 Creditable Tax</p>
                          <p className="font-mono text-base font-bold text-slate-900 mt-1">₱42,190.00</p>
                          <p className="text-[0.62rem] text-emerald-600 font-bold">Auto-withheld 2% EWT</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-100">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">12% Output VAT</p>
                          <p className="font-mono text-base font-bold text-slate-900 mt-1">₱178,200.00</p>
                          <p className="text-[0.62rem] text-slate-500">Reconciled to 2550Q</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-100">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">e-Invoicing Ready</p>
                          <p className="font-mono text-base font-bold text-blue-600 mt-1">EIS Compliant</p>
                          <p className="text-[0.62rem] text-slate-500">JSON schema verified</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Companion iPhone Mockup */}
      <div className="absolute -bottom-6 -right-4 hidden w-[220px] sm:block lg:-right-8 lg:bottom-4 lg:w-[260px]" aria-hidden>
        <div className="rounded-[2.2rem] bg-slate-900/10 p-2 shadow-2xl shadow-blue-950/25 ring-1 ring-slate-900/10 backdrop-blur-xl">
          <div className="overflow-hidden rounded-[calc(2.2rem-8px)] border border-slate-200/90 bg-white shadow-inner">
            {/* iOS Dynamic Island */}
            <div className="border-b border-slate-100 bg-slate-50/90 px-4 pt-3 pb-3">
              <div className="mx-auto mb-2 h-3.5 w-18 rounded-full bg-slate-900 shadow-xs" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.62rem] font-bold tracking-widest text-blue-600 uppercase">BITS Dialer</p>
                  <p className="text-[0.78rem] font-bold text-slate-900">Field Agent Mode</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-700">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-2.5 p-3.5">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 shadow-2xs">
                <p className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-500">Collected Today</p>
                <p className="mt-0.5 font-mono text-[1.18rem] font-bold tracking-tight text-emerald-600">
                  ₱{(148500 + reconciledCount * 15000).toLocaleString()}
                </p>
              </div>

              <div
                onClick={handleSimulatePayment}
                className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-2.5 shadow-2xs cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-emerald-700">Payment Alert</span>
                  <span className="text-[0.6rem] font-mono text-emerald-600">Just now</span>
                </div>
                <p className="mt-0.5 text-[0.78rem] font-bold text-slate-900">₱15,000 via InstaPay</p>
                <p className="text-[0.68rem] text-slate-500">ACC-10482 · Tap to verify</p>
              </div>

              <div
                onClick={handleToggleAutoDial}
                className="rounded-xl border border-blue-500/20 bg-blue-50/50 p-2.5 shadow-2xs cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-blue-700">Next Auto-Dial</span>
                  <span className="rounded-full bg-blue-600 px-1.5 py-0.2 text-[0.6rem] font-bold text-white">Auto</span>
                </div>
                <p className="mt-0.5 font-mono text-[0.78rem] font-bold text-slate-900">ACC-10817</p>
                <p className="text-[0.68rem] text-slate-600">PTP overdue · Tap to dial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Interactive preview of the BITS collections dashboard and mobile app with clickable operational simulations.
      </figcaption>
    </figure>
  );
}
