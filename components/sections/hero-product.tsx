"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

type ActiveTab = "cockpit" | "field" | "softphone" | "qa";
type TimeFilter = "weekly" | "monthly" | "today";

interface DayMetric {
  day: string;
  keptPtp: number;
  newPtp: number;
  recovered: string;
  amount: number;
}

const WEEKLY_METRICS: DayMetric[] = [
  { day: "Mon", keptPtp: 64, newPtp: 38, recovered: "₱192,400", amount: 192400 },
  { day: "Tue", keptPtp: 92, newPtp: 46, recovered: "₱284,000", amount: 284000 },
  { day: "Wed", keptPtp: 88, newPtp: 52, recovered: "₱268,500", amount: 268500 },
  { day: "Thu", keptPtp: 76, newPtp: 44, recovered: "₱218,000", amount: 218000 },
  { day: "Fri", keptPtp: 96, newPtp: 58, recovered: "₱312,800", amount: 312800 },
  { day: "Sat", keptPtp: 54, newPtp: 32, recovered: "₱152,800", amount: 152800 },
];

const MONTHLY_METRICS: DayMetric[] = [
  { day: "W1", keptPtp: 240, newPtp: 160, recovered: "₱920,000", amount: 920000 },
  { day: "W2", keptPtp: 310, newPtp: 190, recovered: "₱1,180,000", amount: 1180000 },
  { day: "W3", keptPtp: 345, newPtp: 210, recovered: "₱1,340,000", amount: 1340000 },
  { day: "W4", keptPtp: 290, newPtp: 180, recovered: "₱1,050,000", amount: 1050000 },
];

const TODAY_METRICS: DayMetric[] = [
  { day: "9 AM", keptPtp: 18, newPtp: 12, recovered: "₱54,000", amount: 54000 },
  { day: "11 AM", keptPtp: 34, newPtp: 24, recovered: "₱108,000", amount: 108000 },
  { day: "1 PM", keptPtp: 44, newPtp: 30, recovered: "₱138,000", amount: 138000 },
  { day: "3 PM", keptPtp: 52, newPtp: 36, recovered: "₱168,000", amount: 168000 },
  { day: "5 PM", keptPtp: 28, newPtp: 18, recovered: "₱86,000", amount: 86000 },
];

// Precalculated Ultra HD SVG radial ticks for Speedometer Gauge (Zero SSR hydration mismatch)
const GAUGE_TICKS = Array.from({ length: 22 }).map((_, index) => {
  const totalTicks = 22;
  const angleDeg = 180 + (index / (totalTicks - 1)) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const cx = 100;
  const cy = 105;
  const rInner = 74;
  const rOuter = 92;

  const x1 = Number((cx + rInner * Math.cos(angleRad)).toFixed(2));
  const y1 = Number((cy + rInner * Math.sin(angleRad)).toFixed(2));
  const x2 = Number((cx + rOuter * Math.cos(angleRad)).toFixed(2));
  const y2 = Number((cy + rOuter * Math.sin(angleRad)).toFixed(2));
  return { index, x1, y1, x2, y2, isLit: index <= 18 };
});

export function HeroProduct({ className }: { className?: string }) {
  const { openModal } = useConsultationModal();

  // Navigation & Interactive Mode State
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("cockpit");
  const [timeFilter, setTimeFilter] = React.useState<TimeFilter>("weekly");
  const [selectedDay, setSelectedDay] = React.useState<string>("Tue");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentDataset =
    timeFilter === "weekly"
      ? WEEKLY_METRICS
      : timeFilter === "monthly"
      ? MONTHLY_METRICS
      : TODAY_METRICS;

  const activeMetric =
    currentDataset.find((d) => d.day === selectedDay) || currentDataset[1] || currentDataset[0];

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1240px] space-y-6 sm:space-y-8",
        className
      )}
    >
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full border border-sky-400/50 bg-[#0a2a66]/95 px-5 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* ── TOP FROSTED CONTROL BAR (Pristine typography, zero emojis) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/75 p-3.5 sm:px-6 sm:py-3.5 shadow-xl shadow-blue-950/5 backdrop-blur-xl">
        {/* Brand Lockup with Authentic BITS Infinity 'B' Tile */}
        <div className="flex items-center gap-3">
          <div className="relative flex shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-900/5">
            <Logo variant="tile" className="h-8.5 w-8.5 rounded-lg" priority />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-slate-900">BITS OMS</span>
              <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-blue-700">
                20-Year Ops Lead Architecture
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Sovereign Collections CRM, Predictive Dialing &amp; Real-Time QA
            </span>
          </div>
        </div>

        {/* Interactive Capability Switcher Tabs */}
        <nav
          aria-label="OMS Features Switcher"
          className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-100/70 p-1 backdrop-blur-sm self-start sm:self-auto overflow-x-auto max-w-full"
        >
          <button
            type="button"
            onClick={() => setActiveTab("cockpit")}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "cockpit"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            Collections Velocity
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("field");
              triggerToast("Field Agents App: Real-time GPS timestamps, photo proof & offline sync.");
            }}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "field"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            <span>Field Agents App</span>
            <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-[0.62rem] font-bold">
              GPS &amp; Timestamps
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("softphone");
              triggerToast("Predictive Telephony: ~0.4s screen-pop & active supervisor listen/whisper.");
            }}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "softphone"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            Predictive Softphone
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("qa");
              triggerToast("QA Scorecards: Real-time script compliance and outlier detection.");
            }}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "qa"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            Floor QA &amp; Scorecards
          </button>
        </nav>

        {/* Walkthrough CTA Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openModal("OPERATIONS 360 — 20-Year Ops Lead Architecture Walkthrough")}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 px-5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Request Walkthrough</span>
            <span className="text-white/80">↗</span>
          </button>
        </div>
      </div>

      {/* ── TWO STATIC, ULTRA HD FROSTED GLASS CARDS (Zero visual jitter, rock-solid layout) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* ══════════════════════════════════════════════════════════════════════
            CARD 1: RECOVERY VELOCITY & PROMISE-TO-PAY (Left Glass Card)
           ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/80 p-7 sm:p-9 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_32px_80px_-15px_rgba(24,114,240,0.22)]">
          {/* Subtle Inner Highlight Refraction */}
          <div className="absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] pointer-events-none" />

          <div>
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 mb-1">
                  {activeTab === "field"
                    ? "OPERATIONS 360 // FIELD MOBILE APP"
                    : activeTab === "softphone"
                    ? "TELEPHONY CORE"
                    : activeTab === "qa"
                    ? "AUDIT & COMPLIANCE"
                    : "COLLECTIONS CORE · ZERO DRIFT"}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {activeTab === "field"
                    ? "Field Agent Live Visit HUD"
                    : activeTab === "softphone"
                    ? "Live Call Screen-Pop"
                    : activeTab === "qa"
                    ? "QA & Compliance Score"
                    : "Recovery Velocity"}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {activeTab === "field"
                    ? "Officer: Ronald Santos · Account #PH-89412 · Pasig City"
                    : activeTab === "softphone"
                    ? "WebRTC Softphone · Account #9042-PH"
                    : activeTab === "qa"
                    ? "Weighted KPI Index · Zero Script Deviance"
                    : "Active Settlement Cycle · Real-time PTP Reconciled"}
                </p>
              </div>

              {/* Action Circle Button (↗) */}
              <button
                type="button"
                onClick={() =>
                  triggerToast(
                    activeTab === "field"
                      ? "Field visit telemetry and geotagged logs synced to head office."
                      : "Full settlement audit report available in client portal."
                  )
                }
                aria-label="Inspect recovery details"
                className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-2xs transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer"
              >
                <span className="text-base font-bold">↗</span>
              </button>
            </div>

            {/* Main Headline Metric Display */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
                {activeTab === "field"
                  ? "10:14:02 AM"
                  : activeTab === "softphone"
                  ? "₱48,500 Past Due"
                  : activeTab === "qa"
                  ? "98.2% Score"
                  : "₱1,428,579.64"}
              </span>

              {/* Growth Pill Badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold",
                  activeTab === "field"
                    ? "border-blue-500/25 bg-blue-50 text-blue-700"
                    : "border-emerald-500/25 bg-emerald-50 text-emerald-700"
                )}
              >
                <span>
                  {activeTab === "field"
                    ? "Arrival GPS Stamped"
                    : activeTab === "softphone"
                    ? "Call Active"
                    : activeTab === "qa"
                    ? "Script Aligned"
                    : "+18.4%"}
                </span>
                <span
                  className={cn(
                    "text-[0.7rem] font-medium",
                    activeTab === "field" ? "text-blue-600" : "text-emerald-600"
                  )}
                >
                  {activeTab === "field"
                    ? "Geofence 8m"
                    : activeTab === "softphone"
                    ? "Inbound Match"
                    : activeTab === "qa"
                    ? "Zero Violations"
                    : "vs Target"}
                </span>
              </span>
            </div>

            {/* Ultra HD Striped Diagonal Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  {activeTab === "field"
                    ? "Daily Route Target: 14 Accounts"
                    : activeTab === "softphone"
                    ? "PTP Grace Window: 3 Days"
                    : activeTab === "qa"
                    ? "Target Threshold: 95.0%"
                    : "Target ₱2,000,000"}
                </span>
                <span className="font-bold text-blue-700">
                  {activeTab === "field"
                    ? "9 Completed (64.3%)"
                    : activeTab === "softphone"
                    ? "₱15,000 Proposed"
                    : activeTab === "qa"
                    ? "98.2% Achieved"
                    : "71.4% Collected"}
                </span>
              </div>

              {/* Outer Progress Track */}
              <div className="h-6 w-full rounded-full border border-slate-200/80 bg-slate-100/90 p-1 shadow-inner">
                {/* Inner Progress Bar with Animated Diagonal Stripes */}
                <div
                  style={{
                    width:
                      activeTab === "field"
                        ? "64.3%"
                        : activeTab === "softphone"
                        ? "55%"
                        : activeTab === "qa"
                        ? "98.2%"
                        : "71.4%",
                  }}
                  className="h-full rounded-full bg-striped-accent shadow-sm transition-all duration-500"
                />
              </div>
            </div>

            {/* Teaser Advantage Highlights */}
            {activeTab === "field" ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-slate-100 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Tamper-Proof Time</span>
                  <span className="text-[11px] text-slate-500 leading-tight">GPS satellite locked timestamps</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Photo &amp; E-Sign</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Geotagged proof + debtor signature</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Offline Auto-Sync</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Zero data lost in signal dead zones</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-slate-100 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">PTP Auto-Alerts</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Flags broken promises in seconds</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Field Reps Mobile App</span>
                  <span className="text-[11px] text-slate-500 leading-tight">GPS timestamps &amp; photo proof</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Auto-SMS Reminders</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Dispatches payment links</span>
                </div>
              </div>
            )}

            {/* Trajectory or Chronological Visit Log */}
            {activeTab === "field" ? (
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Visit Timestamps Log · Pasig Route
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/80">
                    <span className="size-1.5 rounded-full bg-blue-600 animate-ping" />
                    <span>Real-Time Sync</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                    <span className="text-[0.65rem] font-bold uppercase text-slate-400 block">1. Arrival</span>
                    <span className="text-xs font-black text-slate-900 block mt-0.5">10:14:02 AM</span>
                    <span className="text-[0.62rem] text-emerald-600 font-semibold">Geofence Verified</span>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                    <span className="text-[0.65rem] font-bold uppercase text-slate-400 block">2. In-Person</span>
                    <span className="text-xs font-black text-slate-900 block mt-0.5">10:16:30 AM</span>
                    <span className="text-[0.62rem] text-slate-500 font-medium">Debtor Present</span>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                    <span className="text-[0.65rem] font-bold uppercase text-slate-400 block">3. PTP Settled</span>
                    <span className="text-xs font-black text-blue-700 block mt-0.5">10:24:18 AM</span>
                    <span className="text-[0.62rem] text-emerald-700 font-bold">₱15,000 Receipt</span>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                    <span className="text-[0.65rem] font-bold uppercase text-slate-400 block">4. Departure</span>
                    <span className="text-xs font-black text-slate-900 block mt-0.5">10:28:45 AM</span>
                    <span className="text-[0.62rem] text-blue-600 font-semibold">E-Sign Captured</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Daily Velocity Trajectory
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(["weekly", "monthly", "today"] as TimeFilter[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => {
                          setTimeFilter(f);
                          setSelectedDay(f === "weekly" ? "Tue" : f === "monthly" ? "W2" : "11 AM");
                        }}
                        className={cn(
                          "min-h-[44px] px-2.5 rounded-lg text-[0.68rem] font-bold capitalize transition-colors cursor-pointer inline-flex items-center",
                          timeFilter === f
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mini interactive bars */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3 items-end h-20 pt-1">
                  {currentDataset.slice(0, 6).map((item) => {
                    const isSelected = item.day === selectedDay;
                    const maxVal = Math.max(...currentDataset.map((x) => x.keptPtp), 100);
                    const pct = Math.min(100, Math.round((item.keptPtp / maxVal) * 100));

                    return (
                      <div
                        key={item.day}
                        onClick={() => setSelectedDay(item.day)}
                        className="group/bar flex flex-col items-center justify-end h-full gap-1.5 cursor-pointer select-none"
                      >
                        <div className="w-full flex-1 flex items-end justify-center rounded-xl bg-slate-50 p-1 group-hover/bar:bg-blue-50/50 transition-colors">
                          <div
                            style={{ height: `${pct}%` }}
                            className={cn(
                              "w-full rounded-lg transition-all duration-300",
                              isSelected
                                ? "bg-blue-600 shadow-md shadow-blue-500/30"
                                : "bg-blue-200 group-hover/bar:bg-blue-400"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "text-[0.68rem] font-bold transition-colors",
                            isSelected ? "text-blue-700 font-extrabold" : "text-slate-400"
                          )}
                        >
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Selected Day or Field Rep Footnote */}
          <div className="mt-5 rounded-2xl bg-blue-50/60 border border-blue-100/80 p-3.5 text-xs flex items-center justify-between">
            <span className="font-bold text-slate-700">
              {activeTab === "field" ? "Officer #04 Status:" : `${activeMetric.day} Snapshot:`}
            </span>
            <div className="flex items-center gap-2.5 text-slate-600">
              {activeTab === "field" ? (
                <>
                  <span className="font-semibold text-blue-700">9 of 14 Completed</span>
                  <span>·</span>
                  <span className="font-black text-emerald-700">₱145,000 Field Collected Today</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-blue-700">{activeMetric.keptPtp} Kept Promises</span>
                  <span>·</span>
                  <span className="font-black text-emerald-700">{activeMetric.recovered} Collected</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            CARD 2: CONTACT EFFICIENCY & PREDICTIVE TELEPHONY (Right Glass Card)
           ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/80 p-7 sm:p-9 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_32px_80px_-15px_rgba(24,114,240,0.22)]">
          {/* Subtle Inner Highlight Refraction */}
          <div className="absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] pointer-events-none" />

          <div>
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 mb-1">
                  {activeTab === "field"
                    ? "FIELD RECOVERY · ZERO FAKED VISITS"
                    : "PREDICTIVE PACING · ZERO DESK PHONES"}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {activeTab === "field" ? "Route & Fleet Telemetry" : "Contact Efficiency"}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {activeTab === "field"
                    ? "14 Field Officers Active in Metro Manila · Live GPS Feed"
                    : "4 In-Browser Dialer Modes · ~0.4s Answered Hand-off"}
                </p>
              </div>

              {/* Action Circle Button (↗) */}
              <button
                type="button"
                onClick={() =>
                  triggerToast(
                    activeTab === "field"
                      ? "Field officer GPS radar view and route dispatcher ready."
                      : "Predictive dialer configuration ready for deployment review."
                  )
                }
                aria-label="Inspect contact efficiency"
                className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-2xs transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer"
              >
                <span className="text-base font-bold">↗</span>
              </button>
            </div>

            {/* Ultra HD Semicircular Speedometer Dial Gauge */}
            <div className="relative mt-5 flex flex-col items-center justify-center py-2">
              <div className="relative size-52 sm:size-60">
                <svg
                  className="size-full overflow-visible"
                  viewBox="0 0 200 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="heroGaugeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#007BFF" />
                      <stop offset="70%" stopColor="#2F93FF" />
                      <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                  </defs>

                  {/* Precalculated Radial Dial Ticks */}
                  {GAUGE_TICKS.map((t) => (
                    <line
                      key={t.index}
                      x1={t.x1}
                      y1={t.y1}
                      x2={t.x2}
                      y2={t.y2}
                      stroke={t.isLit ? "url(#heroGaugeGlow)" : "#E2E8F0"}
                      strokeWidth={t.isLit ? 3.2 : 2.2}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {/* Center Dial Telemetry Callout */}
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center text-center">
                  <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-sky-300/60 bg-sky-50 px-2.5 py-0.5 text-[0.68rem] font-bold text-blue-700 shadow-2xs">
                    <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>{activeTab === "field" ? "100% Geofenced" : "51.2% Conversion"}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
                    {activeTab === "field" ? "94.8%" : "3.2x"}
                  </div>
                  <span className="text-[0.72rem] font-bold text-slate-500">
                    {activeTab === "field" ? "Route On-Time Compliance" : "Live Talk Time vs. Manual"}
                  </span>
                </div>
              </div>
            </div>

            {/* Dual Big Metric Counters */}
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-center">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {activeTab === "field" ? "₱418,200" : "44,280"}
                </div>
                <div className="mt-0.5 text-xs font-semibold text-slate-500">
                  {activeTab === "field" ? "Field Collected Today" : "Accounts Contacted"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {activeTab === "field" ? "128" : "21,120"}
                </div>
                <div className="mt-0.5 text-xs font-semibold text-slate-500">
                  {activeTab === "field" ? "Verified In-Person Visits" : "Promises Kept"}
                </div>
              </div>
            </div>

            {/* Teaser Advantage Highlights */}
            {activeTab === "field" ? (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Live Radar HUD</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Supervisor live map of all reps</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Anti-Tamper Lock</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Blocks mock GPS &amp; fake clock</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Instant HQ Sync</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Floor CRM updates in 0.2s</span>
                </div>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Zero Desk Phones</span>
                  <span className="text-[11px] text-slate-500 leading-tight">100% WebRTC in browser</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Supervisor HUD</span>
                  <span className="text-[11px] text-slate-500 leading-tight">Listen, whisper &amp; barge</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <span className="font-bold text-slate-900 block mb-0.5">Auto-Caller Match</span>
                  <span className="text-[11px] text-slate-500 leading-tight">0.4s screen-pop on ring</span>
                </div>
              </div>
            )}
          </div>

          {/* Telephony or Field Fleet Status Footnote */}
          <div className="mt-5 rounded-2xl bg-sky-50/60 border border-sky-100/80 p-3.5 text-xs flex items-center justify-between">
            <span className="font-bold text-slate-700">
              {activeTab === "field" ? "Field Operations Engine:" : "Telephony Engine:"}
            </span>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-blue-700">
                {activeTab === "field" ? "14 Officers Active" : "99.8% SIP Uptime"}
              </span>
              <span>·</span>
              <span className="font-semibold text-slate-700">
                {activeTab === "field" ? "Offline SQLite Cache & Sync" : "Carrier-Grade Routing"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
