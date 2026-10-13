"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import {
  PhoneCall,
  MapPin,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mic,
  Smartphone,
  Laptop,
  AlertTriangle,
  Radio,
  Volume2,
  Zap,
  Check,
  Headphones,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ActiveTab = "cockpit" | "telephony" | "field" | "qa";

export function HeroProduct({ className }: { className?: string }) {
  const { openModal } = useConsultationModal();
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("cockpit");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const deckRef = React.useRef<HTMLDivElement>(null);
  const isManualClickingRef = React.useRef<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ── GSAP SCROLLTRIGGER PINNING: LOCK SECTION & SCRUB 4 SPECIMENS ──
  useGSAP(
    () => {
      if (typeof window === "undefined" || !deckRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (min-height: 600px)",
        () => {
          if (!containerRef.current || !deckRef.current) return;

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 72px",
            end: "bottom bottom",
            scrub: 0.35,
            refreshPriority: 10,
            onUpdate: (self) => {
              if (isManualClickingRef.current) return;
              const p = self.progress;

              let nextTab: ActiveTab = "cockpit";
              let subP = 0;
              if (p < 0.25) {
                nextTab = "cockpit";
                subP = p / 0.25;
              } else if (p < 0.5) {
                nextTab = "telephony";
                subP = (p - 0.25) / 0.25;
              } else if (p < 0.75) {
                nextTab = "field";
                subP = (p - 0.5) / 0.25;
              } else {
                nextTab = "qa";
                subP = (p - 0.75) / 0.25;
              }

              if (deckRef.current) {
                deckRef.current.style.setProperty(
                  "--tab-progress",
                  `${Math.min(100, Math.max(14, subP * 100))}%`
                );
              }

              setActiveTab((prev) => (prev !== nextTab ? nextTab : prev));
            },
          });
        }
      );

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  const handleTabClick = (tab: ActiveTab, targetRatio: number, message: string) => {
    isManualClickingRef.current = true;
    setActiveTab(tab);
    triggerToast(message);

    if (deckRef.current) {
      deckRef.current.style.setProperty("--tab-progress", "80%");
    }

    // Scroll smoothly to corresponding progress point in the container.
    const st = ScrollTrigger.getAll().find((s) => s.trigger === containerRef.current);
    if (st) {
      const targetScroll = st.start + (st.end - st.start) * targetRatio;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    setTimeout(() => {
      isManualClickingRef.current = false;
    }, 700);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto w-full max-w-[1240px] px-3 sm:px-4 lg:px-6 lg:h-[2400px] h-auto",
        className
      )}
    >
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full border border-sky-400/50 bg-[#0a2a66]/95 px-5 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Pinned Interactive Deck: Native CSS Sticky with zero DOM re-parenting */}
      <div
        ref={deckRef}
        style={{ "--tab-progress": "25%" } as React.CSSProperties}
        className="lg:sticky lg:top-[70px] xl:top-[74px] relative top-0 w-full space-y-2.5 sm:space-y-3 z-10"
      >
        {/* ── TOP FROSTED HARDWARE CONSOLE: OPERATIONS 360 SPECIMEN ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-2.5 sm:p-3.5 lg:p-4 shadow-xl shadow-blue-950/8 backdrop-blur-2xl space-y-2 sm:space-y-2.5">
          {/* Row 1: Executive Brand Lockup & Direct Action CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            {/* Brand Lockup: OPERATIONS 360 with Official Brand Emblem */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-blue-900/10">
                <Image
                  src="/brand/mark-tile.png"
                  alt="BITS Operations 360 Emblem"
                  width={48}
                  height={48}
                  className="size-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                    OPERATIONS 360
                  </span>
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[0.6rem] sm:text-[0.62rem] font-bold uppercase tracking-wider text-blue-700 border border-blue-500/20">
                    Flagship Collections Suite
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                  Unified Collections CRM · Work Queues · Field App (roadmap) · Real-Time QA
                </span>
              </div>
            </div>

            {/* Action Hub: Book a Consultation & Live Telemetry */}
            <div className="flex items-center gap-2 sm:gap-2.5 self-end sm:self-auto">
              <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100/90 px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  Cycle ({activeTab === "cockpit" ? "1" : activeTab === "telephony" ? "2" : activeTab === "field" ? "3" : "4"}/4)
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px]">99.98% Sovereign Uptime</span>
              </div>

              <button
                type="button"
                onClick={() => openModal("OPERATIONS 360 Feature Walkthrough")}
                className="group relative inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 pl-4 pr-1.5 py-1 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <span>Book a Consultation</span>
                <span className="size-6 sm:size-6.5 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-200 group-hover:translate-x-0.5 font-bold">
                  <ArrowRight className="size-3" />
                </span>
              </button>
            </div>
          </div>

          {/* Row 2: Symmetric 4-Column Segmented Capability Dock */}
          <nav
            aria-label="Operations 360 Features"
            className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl bg-slate-100/90 p-1 border border-slate-200/80 shadow-inner"
          >
            {/* Tab 1: Collections CRM & PTP */}
            <button
              type="button"
              onClick={() =>
                handleTabClick(
                  "cockpit",
                  0.08,
                  "Collections CRM: Automated PTP reconciliation, cutoff alerts & QR Ph payment links."
                )
              }
              className={cn(
                "group relative flex min-h-[38px] sm:min-h-[40px] items-center justify-center gap-1.5 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "cockpit"
                  ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <TrendingUp
                className={cn(
                  "size-3.5 shrink-0 transition-colors",
                  activeTab === "cockpit" ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="truncate">Collections CRM &amp; PTP</span>
              {activeTab === "cockpit" && (
                <div className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-blue-100/80 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-75"
                    style={{
                      width: "var(--tab-progress, 25%)",
                    }}
                  />
                </div>
              )}
            </button>

            {/* Tab 2: Telephony — roadmap specimen, no telephony ships */}
            <button
              type="button"
              onClick={() =>
                handleTabClick(
                  "telephony",
                  0.35,
                  "Roadmap, not shipped: predictive dialing. No telephony exists in this build."
                )
              }
              className={cn(
                "group relative flex min-h-[38px] sm:min-h-[40px] items-center justify-center gap-1.5 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "telephony"
                  ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <PhoneCall
                className={cn(
                  "size-3.5 shrink-0 transition-colors",
                  activeTab === "telephony" ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="truncate">Telephony (roadmap)</span>
              {activeTab === "telephony" && (
                <div className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-blue-100/80 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-75"
                    style={{
                      width: "var(--tab-progress, 25%)",
                    }}
                  />
                </div>
              )}
            </button>

            {/* Tab 3: Field Agents App */}
            <button
              type="button"
              onClick={() =>
                handleTabClick(
                  "field",
                  0.62,
                  "Field Agents App: Real-time GPS timestamps, photo proof & offline sync."
                )
              }
              className={cn(
                "group relative flex min-h-[38px] sm:min-h-[40px] items-center justify-center gap-1.5 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "field"
                  ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <MapPin
                className={cn(
                  "size-3.5 shrink-0 transition-colors",
                  activeTab === "field" ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="truncate">Field Agents App</span>
              <span className="hidden sm:inline-flex rounded-full bg-blue-100 text-blue-700 px-1.5 py-0.2 text-[0.58rem] font-bold">
                GPS
              </span>
              {activeTab === "field" && (
                <div className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-blue-100/80 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-75"
                    style={{
                      width: "var(--tab-progress, 25%)",
                    }}
                  />
                </div>
              )}
            </button>

            {/* Tab 4: Real-Time QA Scoring */}
            <button
              type="button"
              onClick={() =>
                handleTabClick(
                  "qa",
                  0.90,
                  "Roadmap, not shipped: call compliance auditing and BSP 454/857 detection — no telephony exists in this build."
                )
              }
              className={cn(
                "group relative flex min-h-[38px] sm:min-h-[40px] items-center justify-center gap-1.5 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "qa"
                  ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <ShieldCheck
                className={cn(
                  "size-3.5 shrink-0 transition-colors",
                  activeTab === "qa" ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="truncate">Real-Time QA Scoring</span>
              {activeTab === "qa" && (
                <div className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-blue-100/80 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-75"
                    style={{
                      width: "var(--tab-progress, 25%)",
                    }}
                  />
                </div>
              )}
            </button>
          </nav>
        </div>

        {/* ── DYNAMIC FEATURE SHOWCASE: PAIN POINTS, VISUAL MOCKUP & ADVANTAGES ── */}
        <AnimatePresence mode="wait">
          {activeTab === "cockpit" ? (
            <motion.div
              key="tab-cockpit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 lg:gap-4 items-stretch"
            >
              {/* Left: Realistic PTP Automation & Instant Payment Links Cockpit (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-blue-600" />
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-800">
                        BITS OMS · PTP Automation Console
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.62rem] font-bold text-emerald-700 border border-emerald-200">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Watchdog Active</span>
                    </span>
                  </div>

                  {/* Debtor Profile Bar */}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 sm:p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Active Delinquent Account #PH-230908
                        </span>
                        <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">Danilo Bautista</p>
                        <p className="text-[11px] text-slate-600">Commercial Term Loan · 102 Days Past Due (DPD)</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Total Balance</span>
                        <p className="text-base sm:text-lg font-black text-slate-900 font-sans">₱210,950.00</p>
                      </div>
                    </div>

                    {/* Active PTP Commitment Banner */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50/90 p-2 sm:p-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-blue-700" />
                          <span className="text-[11px] sm:text-xs font-bold text-blue-950">
                            PTP Commitment: ₱35,000.00
                          </span>
                        </div>
                        <span className="rounded-md bg-white px-1.5 py-0.2 text-[0.62rem] font-bold text-blue-700 border border-blue-200">
                          Cutoff: Friday 5:00 PM
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
                        <span>Cutoff Countdown:</span>
                        <span className="font-mono font-bold text-blue-800">03h : 42m : 18s Remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Instant Digital Payment Dispatcher */}
                  <div className="mt-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 sm:p-3 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800">
                        Dispatched Instant Payment Channels
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        Automated 24h &amp; 2h Reminders Sent
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
                        <div className="size-6 sm:size-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-[9px]">
                          QR
                        </div>
                        <div className="leading-tight">
                          <span className="font-bold text-slate-900 block text-[11px]">GCash / QR Ph</span>
                          <span className="text-[9px] text-slate-500">Single-use token generated</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
                        <div className="size-6 sm:size-7 rounded-md bg-emerald-600 text-white flex items-center justify-center font-black text-[9px]">
                          PAY
                        </div>
                        <div className="leading-tight">
                          <span className="font-bold text-slate-900 block text-[11px]">Maya Checkout Link</span>
                          <span className="text-[9px] text-slate-500">Dispatched via SMS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Reassurance Strip */}
                <div className="mt-2.5 rounded-lg bg-blue-50/70 p-2 text-[11px] text-blue-900 flex items-center justify-between border border-blue-100">
                  <span className="font-semibold">Broken PTP Trigger:</span>
                  <span className="font-bold text-blue-700">Auto-flags in 10s · Reallocates to Legal &amp; Field</span>
                </div>
              </div>

              {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700 mb-2">
                    Collections Core · PTP Velocity
                  </div>

                  <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Never Lose Track of a Promised Payment Again.
                  </p>

                  {/* Problem vs Solution Callout */}
                  <div className="mt-2 rounded-xl border border-rose-200/80 bg-rose-50/60 p-2.5 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800">
                      <AlertTriangle className="size-3.5 shrink-0" />
                      <span>The Floor Pain Point:</span>
                    </div>
                    <p className="text-[11px] text-rose-950/80 leading-relaxed">
                      Over 40% of payment promises are broken, but agents forget to check back for days because records stay buried in spreadsheets.
                    </p>
                  </div>

                  {/* The 4 BITS Advantages */}
                  <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2">
                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">10-Second Promise Watchdog</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Auto-flags expired cutoffs the exact minute they pass and reallocates the account.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Instant QR Ph &amp; E-Wallet Links</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Dispatches single-use GCash and Maya payment links directly during the call.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Automated SMS &amp; Viber Alerts</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Proactive payment reminders dispatch 24 hours prior to deadline.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Live Bank Reconciliation</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Bank and e-wallet webhooks settle accounts automatically with zero manual logs.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CRO Action */}
                <div className="mt-2.5 sm:mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">+44% PTP Settlement Lift</span>
                  <button
                    type="button"
                    onClick={() => openModal("PTP Engine Consultation")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span>See PTP Engine in Action</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === "telephony" ? (
            <motion.div
              key="tab-telephony"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 lg:gap-4 items-stretch"
            >
              {/* Left: Telephony console specimen (7 cols) - no telephony ships, see label */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-800">
                        Telephony Console (specimen) · Not Shipped
                      </span>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[0.62rem] font-bold text-blue-700 border border-blue-200">
                      Pacing Ratio 3.2:1 · AMD Filter Active
                    </span>
                  </div>

                  {/* Sub-0.4s Screen Pop Simulation Card */}
                  <div className="rounded-xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 p-2.5 sm:p-3 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-2 py-0.5 text-[0.62rem] font-bold">
                        <PhoneCall className="size-3" />
                        <span>LIVE CALL CONNECTED (~0.38s Pop)</span>
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-700">Call Duration: 02:44</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 pt-0.5">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Borrower Record</span>
                        <p className="text-base font-black text-slate-900 mt-0.5">Camille Mendoza</p>
                        <p className="text-[11px] text-slate-600">+63 917 842 1904 · Makati City</p>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Past Due Balance</span>
                        <p className="text-base font-black text-blue-700">₱68,240.50</p>
                        <p className="text-[10px] text-slate-500">45 DPD · Credit Line Card</p>
                      </div>
                    </div>

                    {/* Simulated waveform. §75: removed the "WebRTC Opus Audio HD" label and the
                         pulse on the volume icon — there is no audio pipeline and no codec
                         in this build, so an animated waveform asserts a running call. */}
                    <div className="rounded-lg bg-slate-900 p-2 text-white flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Volume2 className="size-3.5 text-slate-400" />
                        <span className="text-[11px] font-mono font-bold">Specimen waveform · no audio pipeline</span>
                      </div>

                      <div className="flex items-center gap-1 h-3.5">
                        {[40, 70, 95, 60, 85, 30, 90, 100, 75, 45, 80, 55, 30].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400 animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Supervisor Real-Time Interventions Bar */}
                  <div className="mt-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 sm:p-3 space-y-2">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">
                      Supervisor Live Floor Intervention Controls
                    </span>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 hover:border-blue-300 transition-colors">
                        <Headphones className="size-3.5 text-blue-600 mx-auto mb-0.5" />
                        <span className="font-bold text-slate-900 block text-[11px]">Listen (Silent)</span>
                        <span className="text-[9px] text-slate-500">0 Audio Leak</span>
                      </div>

                      <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-2">
                        <Mic className="size-3.5 text-blue-700 mx-auto mb-0.5" />
                        <span className="font-bold text-blue-950 block text-[11px]">Whisper (roadmap)</span>
                        <span className="text-[9px] text-blue-700">Coach in Agent Ear</span>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 hover:border-rose-300 transition-colors">
                        <Zap className="size-3.5 text-rose-600 mx-auto mb-0.5" />
                        <span className="font-bold text-slate-900 block text-[11px]">Barge In (roadmap)</span>
                        <span className="text-[9px] text-slate-500">Take Over Line</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Reassurance Strip */}
                <div className="mt-2.5 rounded-lg bg-blue-50/70 p-2 text-[11px] text-blue-900 flex items-center justify-between border border-blue-100">
                  <span className="font-semibold">Hardware Requirement:</span>
                  <span className="font-bold text-blue-700">No telephony ships in this build — roadmap</span>
                </div>
              </div>

              {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700 mb-2">
                    Roadmap · No Telephony Ships
                  </div>

                  <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Roadmap, not shipped. No telephony exists in this build — this panel illustrates a design that has not been implemented.
                  </p>

                  {/* Problem vs Solution Callout */}
                  <div className="mt-2 rounded-xl border border-rose-200/80 bg-rose-50/60 p-2.5 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800">
                      <AlertTriangle className="size-3.5 shrink-0" />
                      <span>The Floor Pain Point:</span>
                    </div>
                    <p className="text-[11px] text-rose-950/80 leading-relaxed">
                      Floor pain point: agents in this industry waste 45 minutes of every hour dialing numbers manually and listening to busy tones, leaving only 15 minutes of live negotiation.
                    </p>
                  </div>

                  {/* The 4 BITS Advantages */}
                  <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2">
                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">3.2x Live Talk Time Lift</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Drops voicemails in &lt;80ms; connects agents only to live debtors.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Sub-0.4s Screen Pop</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Borrower details, DPD aging, and prior promises appear before greeting.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Live Floor Coaching</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Roadmap, not shipped: supervisor listen, whisper cues and call takeover — no telephony exists in this build.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">No telephony in this build</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Operates 100% in-browser on laptops and headsets. No desk phones.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CRO Action */}
                <div className="mt-2.5 sm:mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">51.2% Connect Rate Average</span>
                  <button
                    type="button"
                    onClick={() => openModal("Collections Workflow Consultation")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span>Test Dialer in Sandbox (roadmap)</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === "field" ? (
            <motion.div
              key="tab-field"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 lg:gap-4 items-stretch"
            >
              {/* Left: Authentic Dual Device Showcase (MacBook Pro Admin Radar + Field App Ground) (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-gradient-to-b from-white/95 via-slate-50/90 to-sky-50/50 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  {/* Top Telemetry Feed & Sync Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200/70">
                    <div className="flex items-center gap-2">
                      <div className="relative flex size-2 items-center justify-center">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-black tracking-tight text-slate-900">
                        LIVE FIELD OPERATIONS TELEMETRY
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[0.6rem] font-bold text-emerald-700 border border-emerald-500/20">
                        14 Reps Tracked
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                      <Laptop className="size-3 text-blue-600" />
                      <span>Admin Fleet</span>
                      <span className="text-slate-300">⇄</span>
                      <Smartphone className="size-3 text-blue-600" />
                      <span>Field App</span>
                    </div>
                  </div>

                  {/* High-End Double-Bezel Mockup Frame with Fluid Aspect Lock */}
                  <div className="relative w-full overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-b from-slate-900/5 to-blue-950/5 shadow-inner group">
                    <div className="relative w-full aspect-[16/10] max-h-[185px] sm:max-h-[200px] overflow-hidden rounded-lg">
                      <Image
                        src="/images/operations360-field-admin-devices.webp"
                        alt="BITS Operations 360 Admin Fleet Tracking on MacBook Pro and Field App"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                      />

                      {/* Subtle specular rim light */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />

                      {/* Floating Glass Pill: Admin Command Center (Laptop) */}
                      <div className="absolute top-2 left-2 z-10 max-w-[190px] sm:max-w-[220px] rounded-lg border border-white/90 bg-white/85 p-1.5 sm:p-2 shadow-md shadow-blue-950/10 backdrop-blur-md">
                        <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-extrabold text-slate-900">
                          <span className="size-1.5 rounded-full bg-blue-600" />
                          <span>HQ Admin Fleet Radar</span>
                        </div>
                        <p className="text-[8.5px] text-slate-600 mt-0.5 leading-snug">
                          Live GIS satellite pins &amp; 10m geofence rings.
                        </p>
                      </div>

                      {/* Floating Glass Pill: Field Agent Stamping (Field App) */}
                      <div className="absolute bottom-2 right-2 z-10 max-w-[200px] sm:max-w-[230px] rounded-lg border border-emerald-200/90 bg-white/90 p-1.5 sm:p-2 shadow-md shadow-emerald-950/10 backdrop-blur-md">
                        <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-extrabold text-emerald-950">
                          <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                          <span>Field App Stamping</span>
                        </div>
                        <p className="text-[8.5px] text-emerald-900 mt-0.5 leading-snug">
                          Geofence lock · Atomic clock arrival · E-sign.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3-Column Micro-Feature Telemetry Specs */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="rounded-lg border border-slate-200/80 bg-white/80 p-2 shadow-xs">
                      <div className="flex items-center gap-1.5 mb-0.5 text-slate-900 font-bold text-[10px]">
                        <Laptop className="size-3 text-blue-600 shrink-0" />
                        <span>Admin Radar</span>
                      </div>
                      <p className="text-[9.5px] text-slate-500 leading-tight">
                        Real-time GPS pins, breadcrumb routes &amp; fraud alerts.
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200/80 bg-white/80 p-2 shadow-xs">
                      <div className="flex items-center gap-1.5 mb-0.5 text-slate-900 font-bold text-[10px]">
                        <Radio className="size-3 text-indigo-600 shrink-0" />
                        <span>Atomic Lock</span>
                      </div>
                      <p className="text-[9.5px] text-slate-500 leading-tight">
                        Server atomic clock timestamps reps cannot tamper.
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200/80 bg-white/80 p-2 shadow-xs">
                      <div className="flex items-center gap-1.5 mb-0.5 text-slate-900 font-bold text-[10px]">
                        <Smartphone className="size-3 text-emerald-600 shrink-0" />
                        <span>10m Geofence</span>
                      </div>
                      <p className="text-[9.5px] text-slate-500 leading-tight">
                        Forms unlock strictly on premise with watermarked camera.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Reassurance Strip */}
                <div className="mt-2.5 rounded-lg bg-blue-50/70 p-2 text-[11px] text-blue-900 flex items-center justify-between border border-blue-100">
                  <span className="font-semibold">Hardware Requirement:</span>
                  <span className="font-bold text-blue-700">₱0 Fleet GPS Boxes · 100% Mobile &amp; Web App</span>
                </div>
              </div>

              {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700 mb-2">
                    Field Recovery Assurance · Zero Ghost Visits
                  </div>

                  <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Eliminate Fake Visit Sheets and Unverified Fuel Claims.
                  </p>

                  {/* Problem vs Solution Callout */}
                  <div className="mt-2 rounded-xl border border-rose-200/80 bg-rose-50/60 p-2.5 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800">
                      <AlertTriangle className="size-3.5 shrink-0" />
                      <span>The Floor Pain Point:</span>
                    </div>
                    <p className="text-[11px] text-rose-950/80 leading-relaxed">
                      Unverified paper logs and fake GPS claims lead to wasted fuel costs and rejected bank audit submissions.
                    </p>
                  </div>

                  {/* The 4 BITS Advantages */}
                  <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2">
                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Live HQ Fleet Radar</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Supervisors track field agents in real-time on live GIS satellite maps.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Atomic Clock Timestamps</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Arrival times locked to server GPS atomic clocks. Reps cannot spoof time.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Strict 10m Geofence Lock</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Visit forms unlock strictly within 10 meters of debtor address.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Watermarked Photo Proof</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Photos stamped with coordinates and on-glass debtor digital signatures.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CRO Action */}
                <div className="mt-2.5 sm:mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">0% Fake Visit Rate Guaranteed</span>
                  <button
                    type="button"
                    onClick={() => openModal("Field App Consultation")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span>Request Field App Demo</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-qa"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 lg:gap-4 items-stretch"
            >
              {/* Left: Audio Waveform Scrubber & BSP Compliance Checklist Deck (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-indigo-600" />
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-800">
                        BITS Speech AI · 100% Floor Compliance Deck
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.62rem] font-bold text-emerald-700 border border-emerald-200">
                      BSP 454/857 — roadmap, not certified
                    </span>
                  </div>

                  {/* Call Audio Waveform Player with Flagged Markers */}
                  <div className="rounded-xl border border-slate-200/90 bg-slate-900 p-2.5 sm:p-3 text-white space-y-2 shadow-sm">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-emerald-400 font-bold">Call #REC-8842 · Sarah M. vs. Debtor</span>
                      <span className="font-mono text-slate-400">04:12 / 07:35</span>
                    </div>

                    {/* Interactive Waveform Display with Tagged Pins */}
                    <div className="relative py-1">
                      <div className="flex items-center gap-1 h-8">
                        {[30, 45, 80, 95, 60, 40, 85, 100, 70, 50, 90, 85, 60, 40, 95, 100, 75, 45, 80, 60, 90, 40, 30].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className={cn(
                              "w-full rounded-full transition-all",
                              i === 3 || i === 15
                                ? "bg-emerald-400"
                                : i === 10
                                ? "bg-blue-400"
                                : "bg-slate-700"
                            )}
                          />
                        ))}
                      </div>

                      {/* Marker Pills */}
                      <div className="flex items-center justify-between pt-1 text-[8.5px] font-mono text-slate-300">
                        <span className="text-emerald-400 font-bold">✓ Identity (02:14)</span>
                        <span className="text-blue-400 font-bold">✓ Waiver (03:50)</span>
                        <span className="text-emerald-400 font-bold">✓ Zero Harassment</span>
                      </div>
                    </div>
                  </div>

                  {/* BSP Statutory Compliance Checklist */}
                  <div className="mt-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 sm:p-3 space-y-2 shadow-xs">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">
                      Statutory Rule Engine Audit Result (100% Calls Checked)
                    </span>

                    <div className="grid sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-emerald-50/60 p-2 text-emerald-900">
                        <Check className="size-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-bold block text-[11px]">Anti-Harassment Check</span>
                          <span className="text-[9.5px] text-emerald-700">Zero profanity or threats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-emerald-50/60 p-2 text-emerald-900">
                        <Check className="size-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-bold block text-[11px]">Contact Hours Window</span>
                          <span className="text-[9.5px] text-emerald-700">10:14 AM (Within 6 AM - 10 PM)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-emerald-50/60 p-2 text-emerald-900">
                        <Check className="size-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-bold block text-[11px]">NPC Data Privacy</span>
                          <span className="text-[9.5px] text-emerald-700">Identity verification passed</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-emerald-50/60 p-2 text-emerald-900">
                        <Check className="size-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-bold block text-[11px]">
                            {/* §49. Previously "Immutable Audit Log" with the
                                sub-label "Encrypted call audio locked". Both false:
                                there is no audit store, and there is no call
                                recording — no audio pipeline exists at all. */}
                            Outbound Email Log
                          </span>
                          <span className="text-[9.5px] text-emerald-700">
                            Delivery outcome recorded per send
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Reassurance Strip */}
                <div className="mt-2.5 rounded-lg bg-blue-50/70 p-2 text-[11px] text-blue-900 flex items-center justify-between border border-blue-100">
                  <span className="font-semibold">Audited Call Sampling:</span>
                  <span className="font-bold text-blue-700">100% Floor Coverage (Zero 2% Manual Sampling)</span>
                </div>
              </div>

              {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700 mb-2">
                    Statutory Governance · Speech AI Auditing
                  </div>

                  <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    Catch Rogue Agents Before the Bank Audits or Fines You.
                  </p>

                  {/* Problem vs Solution Callout */}
                  <div className="mt-2 rounded-xl border border-rose-200/80 bg-rose-50/60 p-2.5 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800">
                      <AlertTriangle className="size-3.5 shrink-0" />
                      <span>The Floor Pain Point:</span>
                    </div>
                    <p className="text-[11px] text-rose-950/80 leading-relaxed">
                      Floor pain point: manual QA audits only 2% of calls — one rogue agent using profane threats or calling in quiet hours can lose your bank contract.
                    </p>
                  </div>

                  {/* The 4 BITS Advantages */}
                  <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2">
                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">100% Speech AI Auditing</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Transcribes and compliance-scores every call with zero floor blind spots.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">BSP 454 &amp; 857 Protection</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Real-time filters catch harassment and off-hour contact attempts immediately.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">1-Click Violation Scrubber</span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">Jump directly to the exact second of a flagged compliance infraction.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] sm:text-xs">
                          {/* §49. Previously "Bank Audit Certificates" — "Export
                              tamper-proof compliance logs for partner banks and
                              regulators." No audit store, no certificate export,
                              no tamper-evident store. */}
                          Record Access Basis
                        </span>
                        <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight">
                          Every CRM route verifies a server-side session before touching data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CRO Action */}
                <div className="mt-2.5 sm:mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">Zero Regulatory Fines Incurred</span>
                  <button
                    type="button"
                    onClick={() => openModal("QA Compliance Consultation")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span>See Speech QA Demo</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
