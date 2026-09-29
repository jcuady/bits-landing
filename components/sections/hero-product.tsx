"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

type TimeRange = "weekly" | "monthly" | "today";

interface DayData {
  day: string;
  keptPtp: number;
  newPtp: number;
  recovered: string;
}

const WEEKLY_DATA: DayData[] = [
  { day: "Mon", keptPtp: 64, newPtp: 38, recovered: "₱192,400" },
  { day: "Tue", keptPtp: 92, newPtp: 46, recovered: "₱284,000" },
  { day: "Wed", keptPtp: 88, newPtp: 52, recovered: "₱268,500" },
  { day: "Thu", keptPtp: 76, newPtp: 44, recovered: "₱218,000" },
  { day: "Fri", keptPtp: 96, newPtp: 58, recovered: "₱312,800" },
  { day: "Sat", keptPtp: 54, newPtp: 32, recovered: "₱152,800" },
];

const MONTHLY_DATA: DayData[] = [
  { day: "Week 1", keptPtp: 240, newPtp: 160, recovered: "₱920,000" },
  { day: "Week 2", keptPtp: 310, newPtp: 190, recovered: "₱1,180,000" },
  { day: "Week 3", keptPtp: 345, newPtp: 210, recovered: "₱1,340,000" },
  { day: "Week 4", keptPtp: 290, newPtp: 180, recovered: "₱1,050,000" },
  { day: "Week 5", keptPtp: 210, newPtp: 140, recovered: "₱780,000" },
  { day: "Week 6", keptPtp: 180, newPtp: 110, recovered: "₱620,000" },
];

const TODAY_HOURLY: DayData[] = [
  { day: "8 AM", keptPtp: 16, newPtp: 10, recovered: "₱48,000" },
  { day: "10 AM", keptPtp: 32, newPtp: 22, recovered: "₱96,000" },
  { day: "12 PM", keptPtp: 42, newPtp: 28, recovered: "₱128,000" },
  { day: "2 PM", keptPtp: 48, newPtp: 34, recovered: "₱154,000" },
  { day: "4 PM", keptPtp: 36, newPtp: 24, recovered: "₱112,000" },
  { day: "6 PM", keptPtp: 22, newPtp: 16, recovered: "₱64,000" },
];

export function HeroProduct({ className }: { className?: string }) {
  const { openModal } = useConsultationModal();

  // State
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("Cockpit");
  const [timeRange, setTimeRange] = React.useState<TimeRange>("weekly");
  const [selectedDay, setSelectedDay] = React.useState<string | null>("Tue");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>("queues");
  const [activeDonutFilter, setActiveDonutFilter] = React.useState<string | null>(null);
  const [softphoneActive, setSoftphoneActive] = React.useState(true);
  const [softphoneSeconds, setSoftphoneSeconds] = React.useState(224); // 03:44
  const [whisperToast, setWhisperToast] = React.useState<string | null>(null);

  // Softphone timer simulation
  React.useEffect(() => {
    if (!softphoneActive) return;
    const interval = setInterval(() => setSoftphoneSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [softphoneActive]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Quick refresh animation simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const triggerToast = (msg: string) => {
    setWhisperToast(msg);
    setTimeout(() => setWhisperToast(null), 3500);
  };

  const chartData =
    timeRange === "weekly"
      ? WEEKLY_DATA
      : timeRange === "monthly"
      ? MONTHLY_DATA
      : TODAY_HOURLY;

  const activeDayRecord =
    chartData.find((d) => d.day === selectedDay) || chartData[1];

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1240px] overflow-hidden rounded-2xl sm:rounded-3xl",
        "border border-white/90 bg-white/98 shadow-[0_32px_80px_-15px_rgba(0,35,90,0.28)] ring-1 ring-slate-900/5",
        "transition-all duration-300",
        className
      )}
    >
      {/* Toast Notification HUD */}
      {whisperToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border border-blue-400 bg-slate-900/95 px-5 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {whisperToast}
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-[640px]">
        {/* ── LEFT SIDEBAR: BITS OMS WORKSPACE NAV ── */}
        <aside
          className={cn(
            "border-b lg:border-b-0 lg:border-r border-slate-100 bg-[#FAFBFD] transition-all duration-300 flex flex-col shrink-0",
            sidebarCollapsed ? "lg:w-[72px]" : "lg:w-[245px]"
          )}
        >
          {/* Logo & Operational Collapse Bar */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
                <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-slate-900 text-sm tracking-tight">BITS OMS</span>
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-blue-600">Collections CRM</span>
                </div>
              )}
            </div>

            {/* Collapse toggle button */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex size-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg
                className={cn("size-3.5 transition-transform duration-200", sidebarCollapsed && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Quick Debtor & Account Search (OMS Top Lookup) */}
          <div className="p-3">
            {!sidebarCollapsed ? (
              <div className="relative flex items-center">
                <svg className="absolute left-3 size-3.5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Lookup Account # / Debtor"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 min-h-[44px] w-full rounded-xl border border-slate-200/80 bg-white pl-8.5 pr-8 text-base text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
                <kbd className="absolute right-2.5 rounded bg-slate-100 px-1.5 py-0.5 text-[0.62rem] font-mono text-slate-400">
                  ⌘ K
                </kbd>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                className="flex size-11 min-h-[44px] min-w-[44px] w-full items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-400 hover:text-blue-600"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Nav List: Categorized into Core Collections, Calling, and QA/Workforce */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
            {/* 1. Daily Operations */}
            <div>
              {!sidebarCollapsed && (
                <p className="px-2 pb-1.5 text-[0.66rem] font-black uppercase tracking-wider text-slate-400">
                  Collections Core
                </p>
              )}
              <div className="space-y-1">
                {/* Cockpit / Overview */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("Cockpit")}
                  className={cn(
                    "flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all text-left",
                    activeMenu === "Cockpit"
                      ? "bg-blue-50 text-blue-600 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {!sidebarCollapsed && <span>Collections Cockpit</span>}
                </button>

                {/* Debtor Queues & Worklists (Expandable) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setExpandedSubmenu(expandedSubmenu === "queues" ? null : "queues")}
                    className="flex w-full min-h-[44px] items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {!sidebarCollapsed && <span>Worklists &amp; Accounts</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <svg
                        className={cn("size-3 text-slate-400 transition-transform", expandedSubmenu === "queues" && "rotate-180")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {expandedSubmenu === "queues" && !sidebarCollapsed && (
                    <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-200 pl-2">
                      <button
                        type="button"
                        onClick={() => triggerToast("Worklist: Early Stage (1–30 DPD) loaded. 18 accounts pending follow-up.")}
                        className="flex min-h-[44px] items-center w-full py-2 text-left text-xs font-medium text-slate-600 hover:text-blue-600"
                      >
                        Bucket 1 (1–30 DPD)
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast("Worklist: Mid Stage (31–60 DPD) loaded. 24 high-priority PTPs flagged.")}
                        className="flex min-h-[44px] items-center w-full py-2 text-left text-xs font-medium text-slate-600 hover:text-blue-600"
                      >
                        Bucket 2 (31–60 DPD)
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast("Worklist: Hard Recovery (61+ DPD) loaded. Legal escalation review active.")}
                        className="flex min-h-[44px] items-center w-full py-2 text-left text-xs font-medium text-slate-600 hover:text-blue-600"
                      >
                        Hard Recovery (61+ DPD)
                      </button>
                    </div>
                  )}
                </div>

                {/* Softphone & Predictive Dialer */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("Dialer");
                    triggerToast("Dialer Mode: Predictive active. ~0.4s screen-pop connected to WebRTC softphone.");
                  }}
                  className={cn(
                    "flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all text-left",
                    activeMenu === "Dialer"
                      ? "bg-blue-50 font-bold text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {!sidebarCollapsed && <span>Softphone &amp; Dialer</span>}
                </button>

                {/* Live Calls Supervision (Listen / Whisper / Barge) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("LiveCalls");
                    triggerToast("Live Floor Telemetry: 18 agents on active calls. Listen, Whisper & Barge HUD ready.");
                  }}
                  className={cn(
                    "flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all text-left",
                    activeMenu === "LiveCalls"
                      ? "bg-blue-50 font-bold text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {!sidebarCollapsed && <span>Live Supervisor Floor</span>}
                </button>
              </div>
            </div>

            {/* 2. QA, Coaching & Workforce */}
            <div>
              {!sidebarCollapsed && (
                <p className="px-2 pb-1.5 text-[0.66rem] font-black uppercase tracking-wider text-slate-400">
                  Performance &amp; WFM
                </p>
              )}
              <div className="space-y-1">
                {/* QA Checklist & Outliers */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("QA");
                    triggerToast("QA Engine: Call audit criteria calibrated. Weighted score: 98.2%.");
                  }}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {!sidebarCollapsed && <span>QA &amp; Outlier Finder</span>}
                </button>

                {/* Scorecards & Coaching */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("Scorecards");
                    triggerToast("Monthly Scorecard: 0–100 weighted index loaded across Kept PTP & RPC.");
                  }}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Agent Scorecards</span>}
                </button>

                {/* Training Mode / Practice Floor */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("Training");
                    triggerToast("Training Floor: Practice on simulated accounts with echo line. Zero real data polluted.");
                  }}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {!sidebarCollapsed && <span>Training Floor Mode</span>}
                </button>

                {/* Workforce Aux Codes & Status */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("WFM");
                    triggerToast("WFM: 46 of 48 staff in schedule adherence. Real-time Aux alert active.");
                  }}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {!sidebarCollapsed && <span>Aux Status &amp; Breaks</span>}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN COCKPIT VIEWPORT: COLLECTIONS & RECOVERY OPS ── */}
        <main className="flex-1 bg-white p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
          <div>
            {/* Top Breadcrumb & Live Operational Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="hover:text-slate-700 cursor-pointer">Portfolio</span>
                <span>/</span>
                <span className="font-semibold text-slate-700">Metro Recoveries</span>
                <span>/</span>
                <span className="font-bold text-slate-900">Collections Cockpit</span>
              </div>

              <div className="flex items-center gap-3 relative">
                {/* Telemetry Status Pill */}
                <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/70 px-3 py-1 text-[0.68rem] font-bold text-blue-700">
                  <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
                  <span>Predictive Active · ~0.4s Screen-Pop</span>
                </div>

                {/* Notification Bell */}
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="View notifications"
                  className="relative flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-blue-600 ring-2 ring-white" />
                </button>

                {/* Notification Dropdown Popover */}
                {notificationsOpen && (
                  <div className="absolute right-12 top-0 z-30 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <p className="text-xs font-bold text-slate-900">Live Floor Notifications</p>
                      <span className="text-[0.62rem] text-blue-600 font-bold">Mark read</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="rounded-lg bg-emerald-50 p-2 text-emerald-800">
                        <p className="font-bold">₱48,500 Kept PTP Reconciled</p>
                        <p className="text-[0.68rem] text-emerald-600">Account #9042-PH · Background file parsed</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-2 text-blue-800">
                        <p className="font-bold">Live Whisper: Supervisor on Call</p>
                        <p className="text-[0.68rem] text-blue-600">Desk 04 coaching note linked to recording</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Avatar Badge */}
                <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 py-1 pl-1 pr-3">
                  <div className="flex size-7 items-center justify-center rounded-full bg-blue-600 text-[0.72rem] font-bold text-white">
                    MS
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[0.72rem] font-bold text-slate-900">Maria Santos</span>
                    <span className="text-[0.62rem] font-medium text-slate-500">Floor Lead (Desk 04)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Title & Fast Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Collections Cockpit</h2>
                <p className="text-xs text-slate-500">Real-time recovery velocity, predictive dialing &amp; PTP conversion</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerToast("PTP Logger: Schedule promised payment with automatic hold & kept-promise evaluation.")}
                  className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  + Log Promise to Pay (PTP)
                </button>
                <button
                  type="button"
                  onClick={() => openModal("OPERATIONS 360 — Integrated Operations Platform (Flagship)")}
                  className="inline-flex h-11 min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Request Full OMS Walkthrough</span>
                </button>
              </div>
            </div>

            {/* ── TOP SECTION: BAR CHART & DONUT CHART (2 Columns) ── */}
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Card 1: Collections Velocity & Kept PTPs (Bar Chart) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Collections Velocity &amp; Kept PTP Trajectory</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Time range selector */}
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                      className="h-11 min-h-[44px] rounded-lg border border-slate-200 bg-slate-50 px-3 text-base font-bold text-slate-700 focus:outline-none focus:border-blue-600"
                    >
                      <option value="weekly">Weekly ⌄</option>
                      <option value="monthly">Monthly ⌄</option>
                      <option value="today">Today ⌄</option>
                    </select>

                    {/* Refresh icon button */}
                    <button
                      type="button"
                      onClick={handleRefresh}
                      aria-label="Refresh metrics"
                      className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <svg
                        className={cn("size-4 transition-transform duration-500", isRefreshing && "rotate-180 animate-spin text-blue-600")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Big KPI & Legend */}
                <div className="mt-3 flex items-baseline justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl font-black text-slate-900 font-mono">₱1,428,500</span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.68rem] font-bold text-emerald-700">
                      <span>↑</span> 14.8% vs Target
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[0.68rem] font-bold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-blue-600" />
                      <span>Kept PTP (Recovered)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full border border-blue-400 bg-blue-100" />
                      <span>New Promises Logged</span>
                    </div>
                  </div>
                </div>

                {/* SVG Hatched/Striped Pattern Definition & Dual Bar Chart */}
                <div className="mt-4 h-48 w-full">
                  <svg className="h-full w-full overflow-visible" viewBox="0 0 460 160">
                    <defs>
                      <pattern
                        id="barDiagonalHatchOms"
                        width="6"
                        height="6"
                        patternTransform="rotate(45 0 0)"
                        patternUnits="userSpaceOnUse"
                      >
                        <line x1="0" y1="0" x2="0" y2="6" stroke="#93C5FD" strokeWidth="2.5" />
                      </pattern>
                    </defs>

                    {/* Horizontal Gridlines */}
                    <g className="opacity-25" stroke="#CBD5E1" strokeDasharray="3 3">
                      <line x1="0" y1="20" x2="460" y2="20" />
                      <line x1="0" y1="60" x2="460" y2="60" />
                      <line x1="0" y1="100" x2="460" y2="100" />
                      <line x1="0" y1="140" x2="460" y2="140" />
                    </g>

                    {/* Bar Columns */}
                    {chartData.map((d, index) => {
                      const colWidth = 460 / chartData.length;
                      const xCenter = index * colWidth + colWidth / 2;
                      const isSelected = selectedDay === d.day;

                      // Heights scaled to 120px max
                      const maxVal = 100;
                      const h1 = Math.min(120, (d.keptPtp / maxVal) * 120);
                      const h2 = Math.min(120, (d.newPtp / maxVal) * 120);
                      const y1 = 140 - h1;
                      const y2 = 140 - h2;

                      return (
                        <g
                          key={d.day}
                          onClick={() => setSelectedDay(d.day)}
                          className="cursor-pointer group"
                        >
                          {/* Day Column Hover Highlight Backdrop */}
                          <rect
                            x={xCenter - 26}
                            y={10}
                            width={52}
                            height={132}
                            rx={8}
                            className={cn(
                              "transition-colors",
                              isSelected ? "fill-blue-50/80" : "fill-transparent group-hover:fill-slate-50"
                            )}
                          />

                          {/* Bar 1: Solid Blue (Kept PTPs) */}
                          <rect
                            x={xCenter - 18}
                            y={y1}
                            width={16}
                            height={h1}
                            rx={3}
                            fill="#1D72E8"
                            className="transition-all duration-300 group-hover:brightness-110"
                          />

                          {/* Bar 2: Hatched Blue (New Promises) */}
                          <rect
                            x={xCenter + 2}
                            y={y2}
                            width={16}
                            height={h2}
                            rx={3}
                            fill="url(#barDiagonalHatchOms)"
                            stroke="#60A5FA"
                            strokeWidth="1"
                            className="transition-all duration-300 group-hover:brightness-95"
                          />

                          {/* Day Label */}
                          <text
                            x={xCenter}
                            y={156}
                            textAnchor="middle"
                            className={cn(
                              "text-[10px] font-bold transition-colors",
                              isSelected ? "fill-blue-600 font-black" : "fill-slate-400 group-hover:fill-slate-700"
                            )}
                          >
                            {d.day}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Active Day Data Detail Strip */}
                <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50/90 px-3 py-2 text-xs">
                  <span className="font-bold text-slate-700">
                    {activeDayRecord.day} Focus:
                  </span>
                  <div className="flex items-center gap-3 text-[0.72rem]">
                    <span className="text-blue-700 font-bold">{activeDayRecord.keptPtp} Kept Promises</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-sky-700 font-bold">{activeDayRecord.newPtp} New Scheduled</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-emerald-700 font-black">{activeDayRecord.recovered} Recovered</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Portfolio DPD Aging Distribution (Donut Chart) */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Portfolio Delinquency Aging (DPD)</h3>
                    <p className="text-[0.68rem] text-slate-400">Automated queue assignment by delinquency bucket</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    aria-label="Refresh snapshot"
                    className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>

                {/* Interactive Donut SVG Chart */}
                <div className="my-auto flex items-center justify-center py-4">
                  <div className="relative size-44 sm:size-48">
                    <svg className="size-full -rotate-90" viewBox="0 0 160 160">
                      {/* Background track */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="20"
                      />

                      {/* Segment 1: Bucket 1 (1–30 DPD, 58%) -> Blue #1D72E8 */}
                      {/* Circumference = 376.99 */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#1D72E8"
                        strokeWidth="20"
                        strokeDasharray="218.65 376.99"
                        strokeDashoffset="0"
                        className="cursor-pointer transition-all duration-300 hover:stroke-[23]"
                        onClick={() => setActiveDonutFilter(activeDonutFilter === "b1" ? null : "b1")}
                      />

                      {/* Segment 2: Bucket 2 (31–60 DPD, 28%) -> Sky #60A5FA */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="20"
                        strokeDasharray="105.55 376.99"
                        strokeDashoffset="-218.65"
                        className="cursor-pointer transition-all duration-300 hover:stroke-[23]"
                        onClick={() => setActiveDonutFilter(activeDonutFilter === "b2" ? null : "b2")}
                      />

                      {/* Segment 3: Hard Recovery (61+ DPD, 14%) -> Amber #F59E0B */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="20"
                        strokeDasharray="52.78 376.99"
                        strokeDashoffset="-324.20"
                        className="cursor-pointer transition-all duration-300 hover:stroke-[23]"
                        onClick={() => setActiveDonutFilter(activeDonutFilter === "hard" ? null : "hard")}
                      />
                    </svg>

                    {/* Donut Center Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-[0.66rem] font-bold text-slate-400 uppercase tracking-wider">
                        {activeDonutFilter === "b1" ? "1–30 DPD" : activeDonutFilter === "b2" ? "31–60 DPD" : activeDonutFilter === "hard" ? "61+ DPD" : "Portfolio Size"}
                      </span>
                      <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                        {activeDonutFilter === "b1" ? "₱10.7M" : activeDonutFilter === "b2" ? "₱5.1M" : activeDonutFilter === "hard" ? "₱2.6M" : "₱18.4M"}
                      </span>
                      <span className="text-[0.62rem] text-slate-400 font-medium">Under Management</span>
                    </div>
                  </div>
                </div>

                {/* Legend Row */}
                <div className="flex items-center justify-around border-t border-slate-100 pt-3 text-[0.72rem] font-bold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setActiveDonutFilter(activeDonutFilter === "b1" ? null : "b1")}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 px-2 py-2 transition-colors cursor-pointer",
                      activeDonutFilter === "b1" ? "text-blue-600 font-black" : "hover:text-slate-900"
                    )}
                  >
                    <span className="size-2 rounded-full bg-[#1D72E8]" />
                    <span>1–30 DPD (58%)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDonutFilter(activeDonutFilter === "b2" ? null : "b2")}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 px-2 py-2 transition-colors cursor-pointer",
                      activeDonutFilter === "b2" ? "text-sky-600 font-black" : "hover:text-slate-900"
                    )}
                  >
                    <span className="size-2 rounded-full bg-[#60A5FA]" />
                    <span>31–60 DPD (28%)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDonutFilter(activeDonutFilter === "hard" ? null : "hard")}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 px-2 py-2 transition-colors cursor-pointer",
                      activeDonutFilter === "hard" ? "text-amber-600 font-black" : "hover:text-slate-900"
                    )}
                  >
                    <span className="size-2 rounded-full bg-[#F59E0B]" />
                    <span>61+ DPD (14%)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── BOTTOM SECTION: 4 REAL OMS METRIC CARDS ── */}
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: Right-Party Contact (RPC) */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] font-medium text-slate-500">Right-Party Contact (RPC)</span>
                  <span className="text-blue-500">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-xl font-black text-slate-900 font-mono">74.8%</p>
                <p className="text-[0.62rem] text-emerald-600 font-bold mt-0.5">↑ 6.2% with Predictive Pacing</p>
              </div>

              {/* Card 2: Kept Promise (PTP) Rate */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] font-medium text-slate-500">Kept Promise Rate (PTP)</span>
                  <span className="text-emerald-500">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-xl font-black text-slate-900 font-mono">86.4%</p>
                <p className="text-[0.62rem] text-emerald-600 font-bold mt-0.5">Automated SMS/Viber hold alert</p>
              </div>

              {/* Card 3: QA & Compliance Score */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] font-medium text-slate-500">Floor QA &amp; Compliance</span>
                  <span className="text-indigo-500">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-xl font-black text-slate-900 font-mono">98.2%</p>
                <p className="text-[0.62rem] text-blue-600 font-bold mt-0.5">Zero script deviance violations</p>
              </div>

              {/* Card 4: Schedule Adherence (WFM) */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] font-medium text-slate-500">Agent Aux Adherence</span>
                  <span className="text-amber-500">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-xl font-black text-slate-900 font-mono">46 / 48</p>
                <p className="text-[0.62rem] text-slate-500 font-medium mt-0.5">Active staff on schedule</p>
              </div>
            </div>
          </div>

          {/* ── DOCKED SOFTPHONE & SUPERVISOR WHISPER INTERACTION HUD ── */}
          <div className="mt-4 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/60 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex size-3 items-center justify-center shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 truncate">
                    Live Call: Account #9042-PH (₱48,500 Past Due)
                  </span>
                  <span className="font-mono text-[0.68rem] font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
                    {formatTimer(softphoneSeconds)}
                  </span>
                </div>
                <p className="text-[0.68rem] text-slate-500 truncate">
                  WebRTC Softphone Active · Supervisor Mode: Listen, Whisper &amp; Barge Enabled
                </p>
              </div>
            </div>

            {/* Simulated Live Audio Waveform */}
            <div className="hidden md:flex items-center gap-1 px-3">
              {[10, 22, 34, 16, 38, 26, 12, 30, 20, 14, 28, 18].map((h, i) => (
                <span
                  key={i}
                  style={{ height: softphoneActive ? `${h}px` : "6px" }}
                  className="w-1 rounded-full bg-blue-600 transition-all duration-300"
                />
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => triggerToast("Supervisor Whisper sent: 'Offer 2-part settlement terms before end of month.'")}
                className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-800 hover:bg-violet-100 transition-all cursor-pointer shrink-0"
              >
                <span>🗣️ Whisper</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast("PTP Agreement Locked: ₱15,000 promise recorded. Dynamic QR Ph link sent.")}
                className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer shrink-0"
              >
                <span>✓ Lock PTP (₱15,000)</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
