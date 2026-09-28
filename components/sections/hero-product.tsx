"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

type TimeRange = "weekly" | "monthly" | "today";

interface DayData {
  day: string;
  inbound: number;
  resolved: number;
  recovered: string;
}

const WEEKLY_DATA: DayData[] = [
  { day: "Sunday", inbound: 58, resolved: 36, recovered: "₱92,400" },
  { day: "Monday", inbound: 84, resolved: 48, recovered: "₱148,000" },
  { day: "Tuesday", inbound: 98, resolved: 62, recovered: "₱210,500" },
  { day: "Wednesday", inbound: 86, resolved: 54, recovered: "₱176,300" },
  { day: "Thursday", inbound: 82, resolved: 52, recovered: "₱164,800" },
  { day: "Friday", inbound: 68, resolved: 44, recovered: "₱129,000" },
];

const MONTHLY_DATA: DayData[] = [
  { day: "Week 1", inbound: 240, resolved: 170, recovered: "₱620,000" },
  { day: "Week 2", inbound: 295, resolved: 210, recovered: "₱840,000" },
  { day: "Week 3", inbound: 310, resolved: 245, recovered: "₱910,000" },
  { day: "Week 4", inbound: 280, resolved: 205, recovered: "₱780,000" },
  { day: "Week 5", inbound: 190, resolved: 140, recovered: "₱510,000" },
  { day: "Week 6", inbound: 150, resolved: 110, recovered: "₱430,000" },
];

const TODAY_HOURLY: DayData[] = [
  { day: "8 AM", inbound: 14, resolved: 8, recovered: "₱24,000" },
  { day: "10 AM", inbound: 28, resolved: 19, recovered: "₱56,000" },
  { day: "12 PM", inbound: 36, resolved: 24, recovered: "₱78,000" },
  { day: "2 PM", inbound: 42, resolved: 31, recovered: "₱94,000" },
  { day: "4 PM", inbound: 30, resolved: 22, recovered: "₱68,000" },
  { day: "6 PM", inbound: 18, resolved: 14, recovered: "₱42,000" },
];

export function HeroProduct({ className }: { className?: string }) {
  const { openModal } = useConsultationModal();

  // State
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("Dashboard");
  const [timeRange, setTimeRange] = React.useState<TimeRange>("weekly");
  const [selectedDay, setSelectedDay] = React.useState<string | null>("Tuesday");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>("queues");
  const [activeDonutFilter, setActiveDonutFilter] = React.useState<string | null>(null);

  // Quick refresh animation simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const chartData =
    timeRange === "weekly"
      ? WEEKLY_DATA
      : timeRange === "monthly"
      ? MONTHLY_DATA
      : TODAY_HOURLY;

  const activeDayRecord =
    chartData.find((d) => d.day === selectedDay) || chartData[2];

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1240px] overflow-hidden rounded-2xl sm:rounded-3xl",
        "border border-white/90 bg-white/98 shadow-[0_32px_80px_-15px_rgba(0,35,90,0.32)] ring-1 ring-slate-900/5",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row min-h-[640px]">
        {/* ── LEFT SIDEBAR (Matching reference image with collapse & submenus) ── */}
        <aside
          className={cn(
            "border-b lg:border-b-0 lg:border-r border-slate-100 bg-[#FAFBFD] transition-all duration-300 flex flex-col shrink-0",
            sidebarCollapsed ? "lg:w-[72px]" : "lg:w-[240px]"
          )}
        >
          {/* Logo & Collapse Bar */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
                <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-slate-900 text-sm tracking-tight">BITS</span>
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-blue-600">Operations</span>
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

          {/* Search Box */}
          <div className="p-3">
            {!sidebarCollapsed ? (
              <div className="relative flex items-center">
                <svg className="absolute left-3 size-3.5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
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

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
            {/* Daily Operation */}
            <div>
              {!sidebarCollapsed && (
                <p className="px-2 pb-1.5 text-[0.66rem] font-black uppercase tracking-wider text-slate-400">
                  Daily Operation
                </p>
              )}
              <div className="space-y-1">
                {/* Dashboard (Active) */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("Dashboard")}
                  className={cn(
                    "flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all text-left",
                    activeMenu === "Dashboard"
                      ? "bg-blue-50 text-blue-600 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </button>

                {/* Reservation / Intakes */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("Reservation")}
                  className={cn(
                    "flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all text-left",
                    activeMenu === "Reservation"
                      ? "bg-blue-50 font-bold text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Reservation &amp; Leads</span>}
                </button>

                {/* Manage Rooms / Debtors (Expandable) */}
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
                      {!sidebarCollapsed && <span>Debtor Queues</span>}
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
                        onClick={() => setSelectedDay("Tuesday")}
                        className="flex min-h-[44px] items-center w-full py-2 text-left text-xs font-medium text-slate-600 hover:text-blue-600"
                      >
                        Bucket 1 (1–30 Days)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDay("Wednesday")}
                        className="flex min-h-[44px] items-center w-full py-2 text-left text-xs font-medium text-slate-600 hover:text-blue-600"
                      >
                        Bucket 2 (31–60 Days)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDay("Thursday")}
                        className="flex min-h-[44px] items-center w-full py-2 text-left text-xs font-medium text-slate-600 hover:text-blue-600"
                      >
                        Legal Escalation (60+ Days)
                      </button>
                    </div>
                  )}
                </div>

                {/* Manage Staff */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("Staff")}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {!sidebarCollapsed && <span>Collector Teams</span>}
                </button>

                {/* Promotions / Rules */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("Promotions")}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {!sidebarCollapsed && <span>Automation Rules</span>}
                </button>

                {/* Reviews / QA */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("Reviews")}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Compliance &amp; QA</span>}
                </button>
              </div>
            </div>

            {/* Accounting */}
            <div>
              {!sidebarCollapsed && (
                <p className="px-2 pb-1.5 text-[0.66rem] font-black uppercase tracking-wider text-slate-400">
                  Accounting &amp; Finance
                </p>
              )}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveMenu("Report")}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Collections Report</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMenu("Maintenance")}
                  className="flex w-full min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {!sidebarCollapsed && <span>Settlement Approvals</span>}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN COCKPIT VIEWPORT ── */}
        <main className="flex-1 bg-white p-4 sm:p-6 lg:p-7 flex flex-col">
          {/* Top Breadcrumb & User Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="hover:text-slate-700 cursor-pointer">Home</span>
              <span>/</span>
              <span className="font-bold text-slate-900">Dashboard</span>
            </div>

            <div className="flex items-center gap-3 relative">
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
                    <p className="text-xs font-bold text-slate-900">Live Telemetry Alerts</p>
                    <span className="text-[0.62rem] text-blue-600 font-bold">Mark read</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-800">
                      <p className="font-bold">₱48,500 Payment Cleared</p>
                      <p className="text-[0.68rem] text-emerald-600">Auto-reconciled via QR Ph · Desk 04</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-800">
                      <p className="font-bold">AI Dialer Pacing: 3.4 calls/sec</p>
                      <p className="text-[0.68rem] text-blue-600">Zero dropped customer calls recorded</p>
                    </div>
                  </div>
                </div>
              )}

              {/* User Avatar Badge */}
              <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 py-1 pl-1 pr-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-slate-900 text-[0.72rem] font-bold text-white">
                  EV
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[0.72rem] font-bold text-slate-900">Evans</span>
                  <span className="text-[0.62rem] font-medium text-slate-500">Lead Architect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Title & Fast Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Dashboard</h2>
              <p className="text-xs text-slate-500">Real-time recovery operations &amp; workflow throughput</p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedDay("Tuesday")}
                className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                Intake Lead / Case
              </button>
              <button
                type="button"
                onClick={() => openModal("OPERATIONS 360 — Integrated Operations Platform (Flagship)")}
                className="inline-flex h-11 min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>+ New Booking</span>
              </button>
            </div>
          </div>

          {/* ── TOP SECTION: BAR CHART & DONUT CHART (2 Columns) ── */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Card 1: Bookings & Operations Overview (Bar Chart) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Bookings &amp; Operations Overview</h3>
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
                  <span className="text-2xl font-black text-slate-900">274</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-50 px-2 py-0.5 text-[0.68rem] font-bold text-rose-600">
                    <span>↓</span> 3% vs last week
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[0.68rem] font-bold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-blue-600" />
                    <span>Check-ins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full border border-blue-400 bg-blue-100" />
                    <span>Check-outs</span>
                  </div>
                </div>
              </div>

              {/* SVG Hatched/Striped Pattern Definition & Dual Bar Chart */}
              <div className="mt-4 h-48 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 460 160">
                  <defs>
                    {/* Diagonal hatch pattern matching reference image */}
                    <pattern
                      id="barDiagonalHatch"
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
                    const h1 = Math.min(120, (d.inbound / maxVal) * 120);
                    const h2 = Math.min(120, (d.resolved / maxVal) * 120);
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

                        {/* Bar 1: Solid Blue (Check-ins / Inbound) */}
                        <rect
                          x={xCenter - 18}
                          y={y1}
                          width={16}
                          height={h1}
                          rx={3}
                          fill="#1D72E8"
                          className="transition-all duration-300 group-hover:brightness-110"
                        />

                        {/* Bar 2: Hatched Blue (Check-outs / Resolved) */}
                        <rect
                          x={xCenter + 2}
                          y={y2}
                          width={16}
                          height={h2}
                          rx={3}
                          fill="url(#barDiagonalHatch)"
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
                  <span className="text-blue-700 font-bold">{activeDayRecord.inbound} Inbound Check-ins</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-sky-700 font-bold">{activeDayRecord.resolved} Resolved</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-700 font-black">{activeDayRecord.recovered} Recovered</span>
                </div>
              </div>
            </div>

            {/* Card 2: Room / Portfolio Status Snapshot (Donut Chart) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Room Status Snapshot</h3>
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

                    {/* Segment 1: Occupied (75%) -> Blue #1D72E8 */}
                    {/* Circumference = 2 * PI * 60 = 376.99 */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#1D72E8"
                      strokeWidth="20"
                      strokeDasharray="282.74 376.99"
                      strokeDashoffset="0"
                      className="cursor-pointer transition-all duration-300 hover:stroke-[23]"
                      onClick={() => setActiveDonutFilter(activeDonutFilter === "occupied" ? null : "occupied")}
                    />

                    {/* Segment 2: Available (17%) -> Sky #60A5FA */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="20"
                      strokeDasharray="64.08 376.99"
                      strokeDashoffset="-282.74"
                      className="cursor-pointer transition-all duration-300 hover:stroke-[23]"
                      onClick={() => setActiveDonutFilter(activeDonutFilter === "available" ? null : "available")}
                    />

                    {/* Segment 3: Maintenance (8%) -> Amber #F59E0B */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="20"
                      strokeDasharray="30.15 376.99"
                      strokeDashoffset="-346.82"
                      className="cursor-pointer transition-all duration-300 hover:stroke-[23]"
                      onClick={() => setActiveDonutFilter(activeDonutFilter === "maintenance" ? null : "maintenance")}
                    />
                  </svg>

                  {/* Donut Center Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[0.66rem] font-bold text-slate-400 uppercase tracking-wider">
                      {activeDonutFilter ? activeDonutFilter : "Total Rooms"}
                    </span>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {activeDonutFilter === "occupied" ? "112" : activeDonutFilter === "available" ? "26" : activeDonutFilter === "maintenance" ? "12" : "150"}
                    </span>
                    <span className="text-[0.62rem] text-slate-400 font-medium">Active Nodes</span>
                  </div>
                </div>
              </div>

              {/* Legend Row */}
              <div className="flex items-center justify-around border-t border-slate-100 pt-3 text-[0.72rem] font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setActiveDonutFilter(activeDonutFilter === "occupied" ? null : "occupied")}
                  className={cn(
                    "flex min-h-[44px] items-center gap-1.5 px-2 py-2 transition-colors cursor-pointer",
                    activeDonutFilter === "occupied" ? "text-blue-600 font-black" : "hover:text-slate-900"
                  )}
                >
                  <span className="size-2 rounded-full bg-[#1D72E8]" />
                  <span>Occupied (75%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDonutFilter(activeDonutFilter === "available" ? null : "available")}
                  className={cn(
                    "flex min-h-[44px] items-center gap-1.5 px-2 py-2 transition-colors cursor-pointer",
                    activeDonutFilter === "available" ? "text-sky-600 font-black" : "hover:text-slate-900"
                  )}
                >
                  <span className="size-2 rounded-full bg-[#60A5FA]" />
                  <span>Available (17%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDonutFilter(activeDonutFilter === "maintenance" ? null : "maintenance")}
                  className={cn(
                    "flex min-h-[44px] items-center gap-1.5 px-2 py-2 transition-colors cursor-pointer",
                    activeDonutFilter === "maintenance" ? "text-amber-600 font-black" : "hover:text-slate-900"
                  )}
                >
                  <span className="size-2 rounded-full bg-[#F59E0B]" />
                  <span>Maint (8%)</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── BOTTOM SECTION: 4 KPI CARDS (Matching Reference Layout) ── */}
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1: Total Bookings Today */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-medium text-slate-500">Total Bookings Today</span>
                <span className="text-blue-500">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-black text-slate-900">26</p>
              <p className="text-[0.62rem] text-emerald-600 font-bold mt-0.5">↑ 4 from morning batch</p>
            </div>

            {/* Card 2: Occupancy Rate */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-medium text-slate-500">Occupancy Rate</span>
                <span className="text-sky-500">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-black text-slate-900">82%</p>
              <p className="text-[0.62rem] text-slate-500 font-medium mt-0.5">Capacity target reached</p>
            </div>

            {/* Card 3: Revenue Today */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-medium text-slate-500">Revenue Today</span>
                <span className="text-emerald-500">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-black text-slate-900">$8,420</p>
              <p className="text-[0.62rem] text-emerald-600 font-bold mt-0.5">+18.4% above average</p>
            </div>

            {/* Card 4: Pending Check-outs */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-medium text-slate-500">Pending Check-outs</span>
                <span className="text-amber-500">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-black text-slate-900">9</p>
              <p className="text-[0.62rem] text-amber-600 font-bold mt-0.5">3 in priority queue</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
