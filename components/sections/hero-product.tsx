"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

type ActiveTab = "cockpit" | "softphone" | "qa";
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
  const [softphoneSeconds, setSoftphoneSeconds] = React.useState(224); // 03:44
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Softphone timer simulation
  React.useEffect(() => {
    const timer = setInterval(() => setSoftphoneSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
        "relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-3xl",
        "border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_32px_90px_-20px_rgba(24,114,240,0.22),0_0_0_1px_rgba(255,255,255,0.8)]",
        "transition-all duration-300",
        className
      )}
    >
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border border-sky-400 bg-slate-900/95 px-5 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* ── TOP FROSTED COCKPIT CONTROL & BRAND HEADER ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/60 bg-white/60 px-5 sm:px-8 py-4 backdrop-blur-md">
        {/* Brand Lockup with Authentic BITS Infinity 'B' Tile */}
        <div className="flex items-center gap-3">
          <div className="relative flex shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-900/5">
            <Logo variant="tile" className="h-8.5 w-8.5 rounded-lg" priority />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-slate-900">BITS OMS</span>
              <span className="rounded-full bg-blue-600/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-blue-700">
                Operations Cockpit
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Sovereign Collections CRM &amp; Predictive Telephony
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
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "cockpit"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            <span>⚡</span>
            <span>Collections Velocity</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("softphone");
              triggerToast("Predictive Telephony: ~0.4s screen-pop & active supervisor listen/whisper.");
            }}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "softphone"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            <span>📞</span>
            <span>Predictive Softphone</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("qa");
              triggerToast("QA Scorecards: Real-time script compliance and outlier detection.");
            }}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeTab === "qa"
                ? "bg-white text-blue-700 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            <span>🛡️</span>
            <span>Floor QA &amp; Scorecards</span>
          </button>
        </nav>

        {/* Walkthrough CTA Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openModal("OPERATIONS 360 — Integrated Operations Platform (Flagship)")}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 px-5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Request Walkthrough</span>
            <span className="text-white/80">↗</span>
          </button>
        </div>
      </header>

      {/* ── MAIN COCKPIT VIEWPORT: TWO FLOATING FROSTED GLASS CARDS ── */}
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* ══════════════════════════════════════════════════════════════════════
              CARD 1: REVENUE / RECOVERY VELOCITY & KEPT PTP (Inspired by Ref Image)
             ══════════════════════════════════════════════════════════════════════ */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/90 bg-white/85 p-6 sm:p-8 shadow-xl shadow-blue-950/5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
            <div>
              {/* Header row: Title + Time Period + External Link Button */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeTab === "softphone"
                      ? "Live Call Screen-Pop"
                      : activeTab === "qa"
                      ? "QA & Compliance Score"
                      : "Recovery Velocity"}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {activeTab === "softphone"
                      ? "WebRTC Softphone · Account #9042-PH"
                      : activeTab === "qa"
                      ? "Weighted KPI Index · Zero Script Deviance"
                      : "Active Settlement Cycle · Real-time PTP Reconciled"}
                  </p>
                </div>

                {/* Arrow Icon Button */}
                <button
                  type="button"
                  onClick={() =>
                    triggerToast("Full settlement audit report available in client portal.")
                  }
                  aria-label="Inspect recovery details"
                  className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer"
                >
                  <span className="text-base font-bold">↗</span>
                </button>
              </div>

              {/* Main Headline Metric Display */}
              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
                  {activeTab === "softphone"
                    ? "₱48,500 Past Due"
                    : activeTab === "qa"
                    ? "98.2% Score"
                    : "₱1,428,500"}
                </span>

                {/* Growth Pill Badge */}
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  <span>
                    {activeTab === "softphone"
                      ? "● Call Active"
                      : activeTab === "qa"
                      ? "✓ Script Aligned"
                      : "+14.8%"}
                  </span>
                  <span className="text-[0.7rem] font-medium text-emerald-600">
                    {activeTab === "softphone"
                      ? "Inbound Match"
                      : activeTab === "qa"
                      ? "Zero Violations"
                      : "vs Target"}
                  </span>
                </span>
              </div>

              {/* Striped Diagonal Progress Bar (Matching Reference Image) */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">
                    {activeTab === "softphone"
                      ? "PTP Hold Period: 3 Days"
                      : activeTab === "qa"
                      ? "Evaluation Target: 95.0%"
                      : "Target ₱2,000,000"}
                  </span>
                  <span className="font-bold text-blue-700">
                    {activeTab === "softphone"
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
                        activeTab === "softphone"
                          ? "55%"
                          : activeTab === "qa"
                          ? "98.2%"
                          : "71.4%",
                    }}
                    className="h-full rounded-full bg-striped-accent shadow-sm transition-all duration-700"
                  />
                </div>
              </div>

              {/* Live WebRTC Softphone Audio Waveform & Supervisor Controls */}
              {activeTab === "softphone" && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 p-3.5">
                  <div className="flex items-center gap-1">
                    {[10, 22, 34, 16, 38, 26, 12, 30, 20, 14, 28, 18].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px` }}
                        className="w-1 rounded-full bg-blue-600 animate-pulse"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        triggerToast("Supervisor Whisper: 'Offer 2-stage settlement terms.'")
                      }
                      className="min-h-[44px] px-3.5 rounded-xl border border-violet-200 bg-violet-50 text-xs font-bold text-violet-800 hover:bg-violet-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      🗣️ Whisper
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        triggerToast("PTP Agreement Locked: ₱15,000 promise recorded.")
                      }
                      className="min-h-[44px] px-3.5 rounded-xl bg-slate-900 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      ✓ Lock PTP
                    </button>
                  </div>
                </div>
              )}

              {/* Floor QA Outlier Finder Status */}
              {activeTab === "qa" && (
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-emerald-50/70 border border-emerald-200/60 p-3.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold text-emerald-900">QA Outlier Agent Finder:</span>
                  </div>
                  <span className="font-semibold text-emerald-700">Floor Lead Desk 04 ranked #1</span>
                </div>
              )}

              {/* Interactive Daily Trajectory Mini Bar Chart (Mon–Sat) */}
              <div className="mt-8 border-t border-slate-100 pt-5">
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
                <div className="grid grid-cols-6 gap-2 sm:gap-3 items-end h-24 pt-2">
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
            </div>

            {/* Selected Day Recovery Footnote */}
            <div className="mt-5 rounded-2xl bg-blue-50/60 border border-blue-100/80 p-3.5 text-xs flex items-center justify-between">
              <span className="font-bold text-slate-700">{activeMetric.day} Snapshot:</span>
              <div className="flex items-center gap-2.5 text-slate-600">
                <span className="font-semibold text-blue-700">{activeMetric.keptPtp} Kept Promises</span>
                <span>·</span>
                <span className="font-black text-emerald-700">{activeMetric.recovered} Collected</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              CARD 2: SUCCESS RATE / DIALER EFFICIENCY & GAUGE (Inspired by Ref Image)
             ══════════════════════════════════════════════════════════════════════ */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/90 bg-white/85 p-6 sm:p-8 shadow-xl shadow-blue-950/5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
            <div>
              {/* Header row: Title + Subtext + External Link Button */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeTab === "softphone"
                      ? "Softphone Telemetry"
                      : activeTab === "qa"
                      ? "Workforce Adherence"
                      : "Contact Efficiency"}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {activeTab === "softphone"
                      ? "WebRTC Pacing · ~0.4s Screen-Pop Active"
                      : activeTab === "qa"
                      ? "Floor QA & Aux Status Adherence"
                      : "Predictive Pacing · Answered Call Hand-off"}
                  </p>
                </div>

                {/* Arrow Icon Button */}
                <button
                  type="button"
                  onClick={() =>
                    triggerToast("Predictive dialer configuration ready for deployment review.")
                  }
                  aria-label="Inspect contact efficiency"
                  className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer"
                >
                  <span className="text-base font-bold">↗</span>
                </button>
              </div>

              {/* Semicircular Speedometer Dial Gauge (Iconic Reference Element) */}
              <div className="relative mt-4 flex flex-col items-center justify-center py-4">
                {/* SVG Radial Tick Gauge */}
                <div className="relative size-56 sm:size-64">
                  <svg className="size-full overflow-visible" viewBox="0 0 200 120">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="60%" stopColor="#1D72E8" />
                        <stop offset="100%" stopColor="#0063DB" />
                      </linearGradient>
                    </defs>

                    {/* Semicircular Radial Ticks (22 Ticks from 180° to 0°) */}
                    {GAUGE_TICKS.map((tick) => (
                      <line
                        key={tick.index}
                        x1={tick.x1}
                        y1={tick.y1}
                        x2={tick.x2}
                        y2={tick.y2}
                        stroke={tick.isLit ? "url(#gaugeGradient)" : "#E2E8F0"}
                        strokeWidth={tick.isLit ? "3.5" : "2.5"}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    ))}
                  </svg>

                  {/* Centered Dial Information Overlay */}
                  <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center text-center">
                    {/* Floating Pill Tag */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-50/90 px-3 py-1 shadow-2xs">
                      <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
                      <span className="text-[0.68rem] font-bold text-blue-700">
                        {activeTab === "softphone"
                          ? "Call Connected"
                          : activeTab === "qa"
                          ? "Floor Adherence"
                          : "86.4% PTP Kept"}
                      </span>
                    </div>

                    {/* Big Display Metric inside Gauge */}
                    <span className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-sans">
                      {activeTab === "softphone"
                        ? formatTimer(softphoneSeconds)
                        : activeTab === "qa"
                        ? "46 / 48"
                        : "86.4%"}
                    </span>

                    <span className="text-xs font-bold text-emerald-600">
                      +6.2% vs industry avg
                    </span>
                  </div>
                </div>
              </div>

              {/* Dual Core Metric Pillars (Matching Reference Image: 44,210 Leads / 21,120 Customer) */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-center">
                <div className="rounded-2xl bg-slate-50/80 p-4 transition-colors hover:bg-blue-50/60">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {activeTab === "softphone" ? "0.4s" : "44,280"}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {activeTab === "softphone" ? "Screen-Pop Latency" : "Accounts Contacted"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50/80 p-4 transition-colors hover:bg-blue-50/60">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {activeTab === "softphone" ? "100%" : "21,140"}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {activeTab === "softphone" ? "Audio Recorded" : "Active PTPs Managed"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Value Footnote */}
            <div className="mt-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 p-3.5 text-xs text-slate-600 flex items-center justify-between">
              <span className="font-semibold">Telephony Mode:</span>
              <span className="font-bold text-blue-700">Predictive · WebRTC Softphone Inbound/Outbound</span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM FLOATING DOCK: 4 REAL ENTERPRISE CAPABILITY PILLS ── */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
              <span className="text-sm font-bold">₱</span>
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">₱18.4M Portfolio</span>
              <span className="text-[0.68rem] text-slate-500">1–30, 31–60, 61+ DPD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">~0.4s Screen-Pop</span>
              <span className="text-[0.68rem] text-slate-500">Zero manual redial delay</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-700">
              <span className="text-sm font-bold">🛡️</span>
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">Floor QA &amp; Coaching</span>
              <span className="text-[0.68rem] text-slate-500">Listen, Whisper &amp; Barge</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-600/10 text-sky-700">
              <span className="text-sm font-bold">🌐</span>
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">Sovereign Deployments</span>
              <span className="text-[0.68rem] text-slate-500">On-Prem &amp; Cloud Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
