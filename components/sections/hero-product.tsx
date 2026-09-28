"use client";

import * as React from "react";
import { Check, ShieldCheck, PhoneCall, Award, Users, BookOpen, Clock, Activity, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { collectionAccounts as initialRows, dashboardStats as initialStats } from "@/lib/marketing-specimens";

type ModuleTab = "dashboard" | "qa" | "coaching" | "dialer" | "wfm";
type StakeholderRole = "business_owner" | "manager" | "supervisor" | "agent";

interface ModuleConfig {
  id: ModuleTab;
  name: string;
  badge: string;
  valueProp: string;
  benefitStat: string;
  toolsCovered: string[];
}

const MODULES: ModuleConfig[] = [
  {
    id: "dashboard",
    name: "Operations 360 Hub",
    badge: "One View",
    valueProp: "CRM & Customer Management + Live Real-Time Operational Dashboards & Reports.",
    benefitStat: "Zero MIS Wait Time",
    toolsCovered: ["CRM & Customer Management", "Real-Time Operational Dashboards & Reports"],
  },
  {
    id: "qa",
    name: "Quality Assurance & Scorecards",
    badge: "100% Audit",
    valueProp: "Standardized QA evaluations, compliance checklists & live agent scorecards.",
    benefitStat: "100% Quality Visibility",
    toolsCovered: ["Quality Assurance (QA)", "Performance Scorecards & Analytics"],
  },
  {
    id: "coaching",
    name: "Coaching Logs & LMS",
    badge: "Action Plans",
    valueProp: "Track 1-on-1 coaching logs, execute action plans, and assign LMS learning modules.",
    benefitStat: "+42% Team Growth",
    toolsCovered: ["Coaching Logs & Action Plans", "QA Coaching", "Learning Management System (LMS)"],
  },
  {
    id: "dialer",
    name: "Integrated WebRTC Dialer",
    badge: "Auto-Calling",
    valueProp: "Built-in predictive dialer, supervisory whisper/barge HUD, and instant payments.",
    benefitStat: "3.2x More Connects",
    toolsCovered: ["Integrated Dialer", "Telephony HUD"],
  },
  {
    id: "wfm",
    name: "Workforce Management (WFM)",
    badge: "96.8% Adherence",
    valueProp: "Dynamic shift rosters, live schedule adherence, and zero-delay operational telemetry.",
    benefitStat: "Instant Operations View",
    toolsCovered: ["Workforce Management (WFM)", "Live Floor Adherence"],
  },
];

const STAKEHOLDERS: {
  id: StakeholderRole;
  label: string;
  pill: string;
  focus: string;
  highlightModule: ModuleTab;
}[] = [
  {
    id: "business_owner",
    label: "For Business Owners",
    pill: "Owners",
    focus: "See the big picture and make faster, data-driven decisions.",
    highlightModule: "dashboard",
  },
  {
    id: "manager",
    label: "For Managers",
    pill: "Managers",
    focus: "Monitor performance and operations without waiting for MIS reports.",
    highlightModule: "wfm",
  },
  {
    id: "supervisor",
    label: "For Supervisors",
    pill: "Supervisors",
    focus: "Manage, coach, and develop your teams from one platform.",
    highlightModule: "coaching",
  },
  {
    id: "agent",
    label: "For Agents",
    pill: "Agents",
    focus: "Access the tools and information they need in one place.",
    highlightModule: "dialer",
  },
];

export function HeroProduct({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = React.useState<ModuleTab>("dashboard");
  const [activeStakeholder, setActiveStakeholder] = React.useState<StakeholderRole>("business_owner");
  const [selectedAccountId, setSelectedAccountId] = React.useState<string>("ACC-10482");
  const [reconciledCount, setReconciledCount] = React.useState<number>(0);
  const [coachingCount, setCoachingCount] = React.useState<number>(12);
  const [isAutoDialing, setIsAutoDialing] = React.useState<boolean>(true);
  const [feedbackToast, setFeedbackToast] = React.useState<string | null>(null);

  const activeModule = MODULES.find((m) => m.id === activeTab) ?? MODULES[0];
  const activeStakeholderObj = STAKEHOLDERS.find((s) => s.id === activeStakeholder) ?? STAKEHOLDERS[0];

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    const t = setTimeout(() => setFeedbackToast(null), 3800);
    return () => clearTimeout(t);
  };

  const handleSimulatePayment = () => {
    setReconciledCount((c) => c + 1);
    triggerToast("✓ Instant Payment Verified (+₱15,000 via QR Ph/InstaPay). Reconciled in Operations 360 general ledger.");
  };

  const handleToggleAutoDial = () => {
    setIsAutoDialing((v) => !v);
    triggerToast(
      !isAutoDialing
        ? "▶ Integrated Dialer started: Pacing at 3.2:1 with automated right-party connect detection."
        : "⏸ Integrated Dialer paused. Floor agents finishing active wrap-up."
    );
  };

  const handleLogCoaching = () => {
    setCoachingCount((c) => c + 1);
    triggerToast("✓ Coaching Log & 14-day Action Plan logged for Desk 14. Micro-LMS module 'Resolution Scripts' assigned.");
  };

  const handleRunQaAudit = () => {
    triggerToast("✓ QA Scorecard Audit completed: 98.2% compliance. Automated positive reinforcement sent to agent dashboard.");
  };

  const handleCheckWfm = () => {
    triggerToast("✓ WFM Floor Telemetry: 46 of 48 agents in adherence (96.8%). Zero MIS wait time.");
  };

  return (
    <figure className={cn("relative mx-auto w-full max-w-[1120px]", className)}>
      {/* Interactive Doppelrand Outer Machine Bezel */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 ring-1 ring-slate-900/[0.08] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.14),0_0_0_1px_rgba(255,255,255,0.8)_inset] backdrop-blur-xl">
        {/* Inner Workstation Core */}
        <div className="relative overflow-hidden rounded-[calc(2rem-8px)] sm:rounded-[calc(2.5rem-12px)] border border-slate-200/80 bg-white shadow-2xl">
          {/* Top macOS Workstation Bar & Stakeholder Matrix Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/95 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF5F56] ring-1 ring-[#E0443E]/50 shadow-xs" aria-hidden />
              <span className="size-3 rounded-full bg-[#FFBD2E] ring-1 ring-[#DEA123]/50 shadow-xs" aria-hidden />
              <span className="size-3 rounded-full bg-[#27C93F] ring-1 ring-[#1AAB29]/50 shadow-xs" aria-hidden />
              <span className="ml-3 hidden text-[0.78rem] font-extrabold tracking-tight text-slate-800 sm:inline">
                OPERATIONS 360 · One System. One View. One Source of Truth.
              </span>
            </div>

            {/* 4-Stakeholder Persona Quick Filter */}
            <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white p-1 shadow-2xs">
              {STAKEHOLDERS.map((s) => {
                const isSelected = activeStakeholder === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActiveStakeholder(s.id);
                      setActiveTab(s.highlightModule);
                      triggerToast(`Switched view to ${s.label}: ${s.focus}`);
                    }}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[0.68rem] font-bold transition-all cursor-pointer",
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <span>{s.pill}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Operational Status */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-[0.68rem] font-bold text-emerald-700">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="uppercase tracking-wider">Live · 48 Staff Connected</span>
            </div>
          </div>

          {/* Stakeholder Value Promise Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50/60 px-4 py-2 sm:px-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-extrabold text-blue-900">{activeStakeholderObj.label}:</span>
              <span className="text-[0.75rem] font-semibold text-slate-700">{activeStakeholderObj.focus}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100/80 border border-blue-200 px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-blue-800">
                {activeModule.benefitStat}
              </span>
            </div>
          </div>

          {/* Workspace Body */}
          <div className="flex min-h-[23rem] sm:min-h-[27rem] lg:min-h-[30rem]">
            {/* Clickable Module Sidebar (Desktop & Tablet) */}
            <aside className="hidden w-[14.5rem] shrink-0 flex-col border-r border-slate-100 bg-slate-50/60 p-3.5 md:flex">
              <div className="mb-3 flex items-center gap-2.5 px-2">
                <div className="flex size-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xs shadow-xs">
                  360
                </div>
                <div>
                  <p className="text-[0.82rem] font-extrabold text-slate-900 leading-none">OPERATIONS 360</p>
                  <p className="text-[0.62rem] text-slate-500 mt-0.5">9 Integrated Engines</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Operations 360 Modules">
                {MODULES.map((m) => {
                  const isActive = activeTab === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveTab(m.id)}
                      className={cn(
                        "group flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[0.8rem] font-bold transition-all cursor-pointer",
                        isActive
                          ? "bg-white text-blue-700 shadow-xs ring-1 ring-slate-200"
                          : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-1.5 rounded-full transition-colors",
                            isActive ? "bg-blue-600" : "bg-slate-300 group-hover:bg-slate-400"
                          )}
                        />
                        <span className="truncate max-w-[9.5rem]">{m.name}</span>
                      </span>
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.2 text-[0.6rem] font-bold shrink-0",
                          isActive ? "bg-blue-50 text-blue-700" : "bg-slate-200/70 text-slate-600"
                        )}
                      >
                        {m.badge}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Operational Telemetry */}
              <div className="mt-auto border-t border-slate-200/60 pt-3 text-[0.7rem] text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Source of Truth</span>
                  <span className="font-mono text-emerald-600 font-bold">Synchronized</span>
                </div>
                <p className="font-mono text-[0.65rem] text-slate-500 mt-0.5">
                  CRM · QA · Dialer · LMS · WFM
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
                  <h3 className="text-[0.9rem] font-extrabold text-slate-900">
                    {activeTab === "dashboard" && "CRM & Customer Management · Real-Time Operations"}
                    {activeTab === "qa" && "Quality Assurance (QA) & Performance Scorecards"}
                    {activeTab === "coaching" && "Coaching Logs, Action Plans & LMS Learning Modules"}
                    {activeTab === "dialer" && "Integrated WebRTC Dialer & Audio Telephony HUD"}
                    {activeTab === "wfm" && "Workforce Management (WFM) & Real-Time Dashboards"}
                  </h3>
                  <p className="text-[0.72rem] text-slate-500">
                    Interactive prototype · Test live operational actions on the right
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
                      <span>Receive Payment (+₱15k)</span>
                    </button>
                  )}

                  {activeTab === "qa" && (
                    <button
                      type="button"
                      onClick={handleRunQaAudit}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-700 active:scale-[0.98] cursor-pointer"
                    >
                      <Award className="size-3.5" />
                      <span>Audit Live Call (98.2%)</span>
                    </button>
                  )}

                  {activeTab === "coaching" && (
                    <button
                      type="button"
                      onClick={handleLogCoaching}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-violet-700 active:scale-[0.98] cursor-pointer"
                    >
                      <BookOpen className="size-3.5" />
                      <span>Log Coaching Note</span>
                    </button>
                  )}

                  {activeTab === "dialer" && (
                    <button
                      type="button"
                      onClick={handleToggleAutoDial}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all active:scale-[0.98] cursor-pointer",
                        isAutoDialing ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"
                      )}
                    >
                      <PhoneCall className="size-3.5" />
                      <span>{isAutoDialing ? "Pause Calling" : "Start Auto-Dialer"}</span>
                    </button>
                  )}

                  {activeTab === "wfm" && (
                    <button
                      type="button"
                      onClick={handleCheckWfm}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                    >
                      <Clock className="size-3.5" />
                      <span>Verify WFM Adherence</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Toast Banner */}
              {feedbackToast && (
                <div className="mx-5 mt-3 rounded-xl border border-emerald-300 bg-emerald-50/95 p-2.5 text-xs font-bold text-emerald-900 shadow-sm animate-fade-in flex items-center justify-between">
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
                {/* 1. OPERATIONS 360 HUB (CRM & Customer Management + Live Dashboard) */}
                {activeTab === "dashboard" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                      {initialStats.map((stat) => {
                        const isCollected = stat.label.toLowerCase().includes("collected");
                        const displayVal = isCollected
                          ? `₱${(148500 + reconciledCount * 15000).toLocaleString()}`
                          : stat.value;

                        return (
                          <div
                            key={stat.label}
                            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 transition-all hover:border-slate-200 hover:bg-slate-50 shadow-2xs"
                          >
                            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                              {stat.label}
                            </p>
                            <p className="mt-1.5 font-mono text-[1.25rem] sm:text-[1.5rem] font-extrabold tracking-tight text-slate-900">
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

                    {/* Integrated Floor Accounts & Customer 360 Dossier */}
                    <div className="overflow-hidden rounded-2xl border border-slate-100">
                      <div className="border-b border-slate-100 bg-slate-50/90 px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Customer Management 360 (Click to view full operational profile)</span>
                        <span className="font-normal text-slate-500">Selected: {selectedAccountId}</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[0.78rem]">
                          <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60 text-[0.65rem] font-bold tracking-wider text-slate-500 uppercase">
                              <th className="px-4 py-2.5">Account / Customer ID</th>
                              <th className="px-4 py-2.5">Campaign / Service</th>
                              <th className="px-4 py-2.5">Outstanding Balance</th>
                              <th className="px-4 py-2.5">Operational State</th>
                              <th className="px-4 py-2.5 text-right">Quick Action</th>
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
                                    triggerToast(`Selected ${row.id} (${row.campaign}). Customer 360 loaded with complete interaction history.`);
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
                                      1-Click Call
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

                {/* 2. QUALITY ASSURANCE (QA) & PERFORMANCE SCORECARDS */}
                {activeTab === "qa" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-indigo-700 uppercase tracking-wider">Floor QA Audit Rate</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">100% Audited</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">Automated speech-to-text + human calibrations</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-emerald-700 uppercase tracking-wider">Compliance Adherence</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">98.4% Passed</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">Zero regulatory or procedural violations</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-slate-700 uppercase tracking-wider">Active Scorecard Template</p>
                        <p className="font-mono text-lg font-black text-slate-900 mt-1 truncate">Enterprise QA Rev 4.2</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">24 scoring points across soft &amp; hard skills</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Live Agent QA Scorecards (Today)</span>
                        <span className="text-[0.7rem] font-mono font-bold text-indigo-700">Real-Time Calibration Matrix</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { agent: "Maria Santos (Desk 04)", calls: 42, score: "99.1%", status: "Exceeding Target", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                          { agent: "John Ramos (Desk 12)", calls: 38, score: "96.4%", status: "Target Met", badge: "bg-blue-50 text-blue-700 border-blue-200" },
                          { agent: "Aileen Cruz (Desk 19)", calls: 35, score: "89.0%", status: "Coaching Needed", badge: "bg-amber-50 text-amber-700 border-amber-200" },
                        ].map((item) => (
                          <div
                            key={item.agent}
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-2xs"
                          >
                            <div>
                              <p className="font-bold text-slate-900">{item.agent}</p>
                              <p className="text-[0.68rem] text-slate-500 font-mono">{item.calls} audited calls today</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm font-extrabold text-slate-900">{item.score}</span>
                              <span className={cn("rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold", item.badge)}>
                                {item.status}
                              </span>
                              <button
                                type="button"
                                onClick={() => triggerToast(`Opening deep QA evaluation scorecard for ${item.agent}...`)}
                                className="rounded-lg border border-slate-200 px-2 py-1 text-[0.68rem] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                View QA
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. COACHING LOGS, ACTION PLANS & LMS */}
                {activeTab === "coaching" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-violet-700 uppercase tracking-wider">Active Coaching Logs</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">{coachingCount} Sessions</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">1-on-1 supervisor records logged</p>
                      </div>
                      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-blue-700 uppercase tracking-wider">Action Plan Milestones</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">91.2% On Track</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">Automated 7-day and 14-day check-ins</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-emerald-700 uppercase tracking-wider">LMS Completion Rate</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">94.8% Done</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">Self-paced agent learning modules</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Recent Supervisor Action Plans &amp; LMS Modules</span>
                        <span className="text-[0.7rem] font-mono text-violet-700 font-bold">1 Platform for QA &amp; Growth</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { title: "Objection Handling & Empathy Escalations", target: "Desk 19 (A. Cruz)", progress: "Day 6 of 14 · LMS Micro-Course 80%", type: "Coaching Action Plan" },
                          { title: "Regulatory Compliance & Verification Protocol", target: "Desk 12 (J. Ramos)", progress: "Completed · QA Score improved to 96.4%", type: "LMS Certification" },
                        ].map((item) => (
                          <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-2xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-slate-900">{item.title}</span>
                              <span className="rounded bg-violet-50 text-violet-700 border border-violet-200 px-2 py-0.5 text-[0.65rem] font-bold">
                                {item.type}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-slate-600 text-[0.72rem]">
                              <span>Assigned to: <strong>{item.target}</strong></span>
                              <span className="font-mono text-emerald-700 font-semibold">{item.progress}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. INTEGRATED WEBRTC DIALER */}
                {activeTab === "dialer" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3">
                        <p className="text-[0.65rem] font-bold text-blue-700 uppercase">Queue Velocity</p>
                        <p className="font-mono text-xl font-bold text-slate-900 mt-1">142 Contacts / hr</p>
                        <p className="text-[0.65rem] text-slate-500 mt-0.5">3.2:1 Pacing algorithm active</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                        <p className="text-[0.65rem] font-bold text-emerald-700 uppercase">Drop Rate SLA</p>
                        <p className="font-mono text-xl font-bold text-slate-900 mt-1">0.12%</p>
                        <p className="text-[0.65rem] text-slate-500 mt-0.5">Strict compliance &lt; 3.0% limit</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-[0.65rem] font-bold text-slate-700 uppercase">Supervisory HUD</p>
                        <p className="font-mono text-xl font-bold text-slate-900 mt-1">Silent Whisper</p>
                        <p className="text-[0.65rem] text-slate-500 mt-0.5">Live audio coach to agent earpiece</p>
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
                          { acc: "ACC-11024", tel: "+63 918 392 0184", state: "Bypassed Voicemail", agent: "Filtered by AI" },
                        ].map((call) => (
                          <div
                            key={call.acc}
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs shadow-2xs"
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

                {/* 5. WORKFORCE MANAGEMENT (WFM) */}
                {activeTab === "wfm" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-amber-800 uppercase tracking-wider">Floor Adherence Rate</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">96.8% In Adherence</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">46/48 staff on scheduled activity</p>
                      </div>
                      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-blue-700 uppercase tracking-wider">MIS Report Delay</p>
                        <p className="font-mono text-2xl font-black text-blue-700 mt-1">0.0 Seconds</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">No waiting for end-of-day spreadsheets</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5">
                        <p className="text-[0.65rem] font-bold text-emerald-700 uppercase tracking-wider">Productive Hours</p>
                        <p className="font-mono text-2xl font-black text-slate-900 mt-1">7.4 hrs / Shift</p>
                        <p className="text-[0.68rem] text-slate-600 mt-0.5">Shrinkage reduced by 22%</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Real-Time Shift Roster &amp; Adherence HUD</span>
                        <span className="text-[0.7rem] font-mono text-slate-500 font-semibold">Shift: 08:00–17:00 PHT</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">On Live Calls</p>
                          <p className="font-mono text-xl font-bold text-blue-600 mt-1">32 Agents</p>
                          <p className="text-[0.62rem] text-slate-500">66.7% occupancy</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">Ready in Queue</p>
                          <p className="font-mono text-xl font-bold text-emerald-600 mt-1">10 Agents</p>
                          <p className="text-[0.62rem] text-slate-500">Next connect &lt; 2s</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">In 1-on-1 Coaching</p>
                          <p className="font-mono text-xl font-bold text-violet-600 mt-1">4 Agents</p>
                          <p className="text-[0.62rem] text-slate-500">Scheduled QA review</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="text-[0.65rem] text-slate-500 font-bold uppercase">Break / Meal</p>
                          <p className="font-mono text-xl font-bold text-slate-600 mt-1">2 Agents</p>
                          <p className="text-[0.62rem] text-slate-500">On schedule</p>
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
                  <p className="text-[0.62rem] font-black tracking-widest text-blue-600 uppercase">OPS 360</p>
                  <p className="text-[0.78rem] font-bold text-slate-900">Mobile Console</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-700">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-2 p-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 shadow-2xs">
                <p className="text-[0.6rem] font-bold uppercase tracking-wider text-slate-500">Floor Recovery Today</p>
                <p className="mt-0.5 font-mono text-[1.12rem] font-bold tracking-tight text-emerald-600">
                  ₱{(148500 + reconciledCount * 15000).toLocaleString()}
                </p>
              </div>

              <div
                onClick={handleRunQaAudit}
                className="rounded-xl border border-indigo-500/20 bg-indigo-50/50 p-2 shadow-2xs cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.6rem] font-bold uppercase tracking-wider text-indigo-700">QA Alert</span>
                  <span className="text-[0.58rem] font-mono text-indigo-600">Just now</span>
                </div>
                <p className="mt-0.5 text-[0.72rem] font-bold text-slate-900">Desk 04: 99.1% QA Score</p>
                <p className="text-[0.62rem] text-slate-500">Tap to calibrate</p>
              </div>

              <div
                onClick={handleLogCoaching}
                className="rounded-xl border border-violet-500/20 bg-violet-50/50 p-2 shadow-2xs cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.6rem] font-bold uppercase tracking-wider text-violet-700">Coaching Log</span>
                  <span className="rounded-full bg-violet-600 px-1.5 py-0.2 text-[0.58rem] font-bold text-white">Action</span>
                </div>
                <p className="mt-0.5 text-[0.72rem] font-bold text-slate-900">Desk 14 Plan Active</p>
                <p className="text-[0.62rem] text-slate-600">14-Day check-in due</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Interactive preview of OPERATIONS 360 integrated operations platform showcasing CRM, QA, Scorecards, Coaching Logs, Dialer, LMS, WFM, and Real-Time Dashboards.
      </figcaption>
    </figure>
  );
}
