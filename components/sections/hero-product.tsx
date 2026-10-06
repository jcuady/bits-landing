"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import {
  PhoneCall,
  MapPin,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  FileCheck,
  Mic,
  Smartphone,
  Laptop,
  ExternalLink,
  AlertTriangle,
  Radio,
  WifiOff,
  Lock,
  Headphones,
  Volume2,
  FileText,
  Zap,
  Check,
  X,
  CreditCard,
  QrCode,
  Calendar,
  Layers,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ActiveTab = "cockpit" | "softphone" | "field" | "qa";

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
  React.useEffect(() => {
    if (typeof window === "undefined" || !deckRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Viewport (>= 1024px): Smooth Interactive Scrub
      mm.add("(min-width: 1024px)", () => {
        if (!containerRef.current || !deckRef.current) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 76px",
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
              nextTab = "softphone";
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
      });

      // Tablet Viewport (640px - 1023px): Smooth Interactive Scrub
      mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
        if (!containerRef.current || !deckRef.current) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 72px",
          end: "bottom bottom",
          scrub: 0.35,
          refreshPriority: 9,
          onUpdate: (self) => {
            if (isManualClickingRef.current) return;
            const p = self.progress;

            let nextTab: ActiveTab = "cockpit";
            let subP = 0;
            if (p < 0.25) {
              nextTab = "cockpit";
              subP = p / 0.25;
            } else if (p < 0.5) {
              nextTab = "softphone";
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
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleTabClick = (tab: ActiveTab, targetRatio: number, message: string) => {
    isManualClickingRef.current = true;
    setActiveTab(tab);
    triggerToast(message);

    if (deckRef.current) {
      deckRef.current.style.setProperty("--tab-progress", "80%");
    }

    // Scroll smoothly to corresponding progress point in the container
    const st = ScrollTrigger.getAll().find(
      (s) => s.trigger === containerRef.current
    );
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
      className={cn("relative mx-auto w-full max-w-[1240px] lg:h-[2800px] md:h-[2200px] h-auto", className)}
    >
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full border border-sky-400/50 bg-[#0a2a66]/95 px-5 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Pinned Interactive Deck: Native CSS Sticky with zero DOM re-parenting */}
      <div
        ref={deckRef}
        style={{ "--tab-progress": "25%" } as React.CSSProperties}
        className="sticky top-[76px] w-full space-y-5 sm:space-y-6 z-10"
      >
        {/* ── TOP FROSTED HARDWARE CONSOLE: OPERATIONS 360 SPECIMEN ── */}
        <div className="rounded-3xl border border-white/80 bg-white/85 p-4 sm:p-5 shadow-2xl shadow-blue-950/8 backdrop-blur-2xl space-y-3.5">
          {/* Row 1: Executive Brand Lockup & Direct Action CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            {/* Brand Lockup: OPERATIONS 360 with LATEST Official Brand Emblem */}
            <div className="flex items-center gap-3">
              <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm border border-slate-100 ring-1 ring-slate-900/5">
                <Image
                  src="/brand/mark-color.png"
                  alt="BITS Brand Mark"
                  width={56}
                  height={56}
                  className="size-8 object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    OPERATIONS 360
                  </span>
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-blue-700 border border-blue-500/20">
                    Flagship Collections Suite
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Unified Collections CRM · Predictive Softphone · GPS Field App · Real-Time QA
                </span>
              </div>
            </div>

            {/* Action Hub: Book a Consultation & Live Telemetry */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100/90 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  Scroll or Click to Cycle ({activeTab === "cockpit" ? "1" : activeTab === "softphone" ? "2" : activeTab === "field" ? "3" : "4"}/4)
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3.5 py-2 rounded-full border border-slate-200/60">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>99.98% Sovereign Uptime</span>
              </div>

              <button
                type="button"
                onClick={() => openModal("OPERATIONS 360 Feature Walkthrough")}
                className="group relative inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-blue-600 hover:bg-blue-500 pl-5 pr-2 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <span>Book a Consultation</span>
                <span className="size-7 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-200 group-hover:translate-x-0.5 font-bold">
                  <ArrowRight className="size-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Row 2: Symmetric 4-Column Segmented Capability Dock (Guaranteed Zero Horizontal Scrollbar) */}
          <nav
            aria-label="Operations 360 Features"
            className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 rounded-2xl bg-slate-100/90 p-1.5 border border-slate-200/80 shadow-inner"
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
                "group relative flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "cockpit"
                  ? "bg-white text-blue-700 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5"
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

            {/* Tab 2: Predictive Dialer */}
            <button
              type="button"
              onClick={() =>
                handleTabClick(
                  "softphone",
                  0.35,
                  "Predictive Dialer: ~0.4s screen pop, zero desk phones, 3.2x live talk time."
                )
              }
              className={cn(
                "group relative flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "softphone"
                  ? "bg-white text-blue-700 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <PhoneCall
                className={cn(
                  "size-3.5 shrink-0 transition-colors",
                  activeTab === "softphone" ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="truncate">Predictive Dialer</span>
              {activeTab === "softphone" && (
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
                "group relative flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "field"
                  ? "bg-white text-blue-700 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5"
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
              <span className="hidden sm:inline-flex rounded-full bg-blue-100 text-blue-700 px-1.5 py-0.2 text-[0.6rem] font-bold">
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
                  "QA Scoring: 100% call compliance auditing and BSP 454/857 infraction detection."
                )
              }
              className={cn(
                "group relative flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 cursor-pointer text-center overflow-hidden",
                activeTab === "qa"
                  ? "bg-white text-blue-700 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5"
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* Left: Realistic PTP Automation & Instant Payment Links Cockpit (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-blue-600" />
                    <span className="text-xs font-mono font-bold text-slate-800">
                      BITS OMS · PTP Automation Console
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-700 border border-emerald-200">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Watchdog Active</span>
                  </span>
                </div>

                {/* Debtor Profile Bar */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Active Delinquent Account #PH-230908
                      </span>
                      <h4 className="text-lg font-black text-slate-900 mt-0.5">Danilo Bautista</h4>
                      <p className="text-xs text-slate-600">Commercial Term Loan · 102 Days Past Due (DPD)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Balance</span>
                      <p className="text-lg font-black text-slate-900 font-sans">₱210,950.00</p>
                    </div>
                  </div>

                  {/* Active PTP Commitment Banner */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50/90 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-blue-700" />
                        <span className="text-xs font-bold text-blue-950">
                          PTP Commitment: ₱35,000.00
                        </span>
                      </div>
                      <span className="rounded-md bg-white px-2 py-0.5 text-[0.65rem] font-bold text-blue-700 border border-blue-200">
                        Cutoff: Friday 5:00 PM
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Cutoff Countdown:</span>
                      <span className="font-mono font-bold text-blue-800">03h : 42m : 18s Remaining</span>
                    </div>
                  </div>
                </div>

                {/* Instant Digital Payment Dispatcher */}
                <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Dispatched Instant Payment Channels
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Automated 24h &amp; 2h Reminders Sent
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                      <div className="size-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-[10px]">
                        QR
                      </div>
                      <div className="leading-tight">
                        <span className="font-bold text-slate-900 block">GCash / QR Ph</span>
                        <span className="text-[10px] text-slate-500">Single-use token generated</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                      <div className="size-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-[10px]">
                        PAY
                      </div>
                      <div className="leading-tight">
                        <span className="font-bold text-slate-900 block">Maya Checkout Link</span>
                        <span className="text-[10px] text-slate-500">Dispatched via SMS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance Strip */}
              <div className="mt-4 rounded-xl bg-blue-50/70 p-3 text-xs text-blue-900 flex items-center justify-between border border-blue-100">
                <span className="font-semibold">Broken PTP Trigger:</span>
                <span className="font-bold text-blue-700">Auto-flags in 10s · Reallocates to Legal &amp; Field</span>
              </div>
            </div>

            {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-3">
                  Collections Core · PTP Velocity
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Never Lose Track of a Promised Payment Again.
                </h3>

                {/* Problem vs Solution Callout */}
                <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <AlertTriangle className="size-3.5" />
                    <span>The Floor Pain Point:</span>
                  </div>
                  <p className="text-xs text-rose-950/80 leading-relaxed">
                    Over 40% of verbal payment promises are broken, but agents forget to check back for days or weeks because records are buried in spreadsheets.
                  </p>
                </div>

                {/* The 4 BITS Advantages */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">10-Second Broken Promise Watchdog</span>
                      <p className="text-slate-600 mt-0.5">The exact minute a cutoff passes without payment, BITS flags the broken PTP and reallocates the account.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Frictionless QR Ph &amp; E-Wallet Links</span>
                      <p className="text-slate-600 mt-0.5">Borrowers receive instant GCash/Maya links on their phone while on the call, removing the &quot;no bank nearby&quot; excuse.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Automated Omnichannel Reminders</span>
                      <p className="text-slate-600 mt-0.5">Proactive SMS &amp; Viber messages dispatch 24h prior to cutoff with exact outstanding balance merge fields.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Zero Manual Spreadsheet Matching</span>
                      <p className="text-slate-600 mt-0.5">Bank and e-wallet webhook callbacks mark debts settled automatically without delay or accounting mismatch.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CRO Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">+44% PTP Settlement Lift</span>
                <button
                  type="button"
                  onClick={() => openModal("PTP Engine Consultation")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer min-h-[36px] py-1.5 px-3 rounded-lg hover:bg-slate-50"
                >
                  <span>See PTP Engine in Action</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : activeTab === "softphone" ? (
          <motion.div
            key="tab-softphone"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* Left: Interactive WebRTC Softphone Screen Pop Simulator (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-800">
                      BITS WebRTC Softphone · Live Pacing Active
                    </span>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[0.68rem] font-bold text-blue-700 border border-blue-200">
                    Pacing Ratio 3.2:1 · AMD Filter Active
                  </span>
                </div>

                {/* Sub-0.4s Screen Pop Simulation Card */}
                <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[0.65rem] font-bold">
                      <PhoneCall className="size-3" />
                      <span>LIVE CALL CONNECTED (~0.38s Pop)</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">Call Duration: 02:44</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Borrower Record</span>
                      <h4 className="text-base font-black text-slate-900 mt-0.5">Camille Mendoza</h4>
                      <p className="text-xs text-slate-600">+63 917 842 1904 · Makati City</p>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Past Due Balance</span>
                      <p className="text-base font-black text-blue-700">₱68,240.50</p>
                      <p className="text-[11px] text-slate-500">45 DPD · Credit Line Card</p>
                    </div>
                  </div>

                  {/* Simulated Live Audio Waveform */}
                  <div className="rounded-xl bg-slate-900 p-3 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="size-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold">WebRTC Opus Audio HD</span>
                    </div>

                    <div className="flex items-center gap-1 h-4">
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
                <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 block">
                    Supervisor Live Floor Intervention Controls
                  </span>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 hover:border-blue-300 transition-colors">
                      <Headphones className="size-4 text-blue-600 mx-auto mb-1" />
                      <span className="font-bold text-slate-900 block">Listen (Silent)</span>
                      <span className="text-[10px] text-slate-500">0 Audio Leak</span>
                    </div>

                    <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5">
                      <Mic className="size-4 text-blue-700 mx-auto mb-1" />
                      <span className="font-bold text-blue-950 block">Whisper</span>
                      <span className="text-[10px] text-blue-700">Coach in Agent Ear</span>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 hover:border-rose-300 transition-colors">
                      <Zap className="size-4 text-rose-600 mx-auto mb-1" />
                      <span className="font-bold text-slate-900 block">Barge In</span>
                      <span className="text-[10px] text-slate-500">Take Over Line</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance Strip */}
              <div className="mt-4 rounded-xl bg-blue-50/70 p-3 text-xs text-blue-900 flex items-center justify-between border border-blue-100">
                <span className="font-semibold">Hardware Requirement:</span>
                <span className="font-bold text-blue-700">₱0 PBX Hardware · 100% In-Browser WebRTC</span>
              </div>
            </div>

            {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-3">
                  Telephony Engine · Zero Dead-Air
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Triple Live Agent Talk Time. Eliminate PBX Hardware Fines.
                </h3>

                {/* Problem vs Solution Callout */}
                <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <AlertTriangle className="size-3.5" />
                    <span>The Floor Pain Point:</span>
                  </div>
                  <p className="text-xs text-rose-950/80 leading-relaxed">
                    Collections agents spend 45 minutes of every hour dialing manual phone pads and listening to busy tones and voicemails, resulting in only 15 minutes of live negotiation.
                  </p>
                </div>

                {/* The 4 BITS Advantages */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">3.2x Live Talk Time Lift</span>
                      <p className="text-slate-600 mt-0.5">Dials ahead and drops answering machines in &lt;80ms, routing only live, connected debtors to free agents.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Sub-0.4s Screen Pop</span>
                      <p className="text-slate-600 mt-0.5">Debtor details, DPD aging, and prior promises appear on screen before the agent says their greeting.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Real-Time Supervisor Intervention</span>
                      <p className="text-slate-600 mt-0.5">Team leads listen silently, whisper coaching cues directly to the agent, or barge in to close delinquent accounts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Zero PBX Hardware or Desk Phones</span>
                      <p className="text-slate-600 mt-0.5">Scale from 20 to 500 agents with just laptops and USB headsets. No Avaya, Cisco, or legacy PBX licenses.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CRO Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">51.2% Connect Rate Average</span>
                <button
                  type="button"
                  onClick={() => openModal("Predictive Dialer Consultation")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>Test Dialer in Sandbox</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : activeTab === "field" ? (
          <motion.div
            key="tab-field"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* Left: Authentic Dual Device Showcase (MacBook Pro Admin Radar + Field App Ground) (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-gradient-to-b from-white/95 via-slate-50/90 to-sky-50/50 p-4 sm:p-6 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              {/* Top Telemetry Feed & Sync Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 mb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <div className="relative flex size-2.5 items-center justify-center">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-black tracking-tight text-slate-900">
                    LIVE FIELD OPERATIONS TELEMETRY
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.62rem] font-bold text-emerald-700 border border-emerald-500/20">
                    14 Reps Ground-Tracked
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                  <Laptop className="size-3.5 text-blue-600" />
                  <span>Admin Fleet Radar</span>
                  <span className="text-slate-300">⇄</span>
                  <Smartphone className="size-3.5 text-blue-600" />
                  <span>Field App Ground</span>
                </div>
              </div>

              {/* High-End Double-Bezel Mockup Frame */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-900/5 to-blue-950/5 shadow-inner group">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
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
                  <div className="absolute top-3 left-3 z-10 max-w-[210px] sm:max-w-[240px] rounded-xl border border-white/90 bg-white/85 p-2 sm:p-2.5 shadow-lg shadow-blue-950/10 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold text-slate-900">
                      <span className="size-2 rounded-full bg-blue-600" />
                      <span>HQ Admin Fleet Radar</span>
                    </div>
                    <p className="text-[9px] text-slate-600 mt-0.5 leading-snug">
                      Live Manila GIS satellite pins, route breadcrumbs &amp; 10m geofence rings.
                    </p>
                  </div>

                  {/* Floating Glass Pill: Field Agent Stamping (Field App) */}
                  <div className="absolute bottom-3 right-3 z-10 max-w-[220px] sm:max-w-[250px] rounded-xl border border-emerald-200/90 bg-white/90 p-2 sm:p-2.5 shadow-lg shadow-emerald-950/10 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold text-emerald-950">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      <span>Field App</span>
                    </div>
                    <p className="text-[9px] text-emerald-900 mt-0.5 leading-snug">
                      6.8m geofence lock · Atomic clock arrival · Geotagged premise photo &amp; e-sign.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-Column Micro-Feature Telemetry Specs */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 shadow-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-slate-900 font-bold text-[11px]">
                    <Laptop className="size-3.5 text-blue-600 shrink-0" />
                    <span>Admin Radar</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Real-time GPS pins, breadcrumb routes &amp; instant mock-GPS fraud alerts.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 shadow-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-slate-900 font-bold text-[11px]">
                    <Radio className="size-3.5 text-indigo-600 shrink-0" />
                    <span>Atomic Lock</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Server atomic clock arrival timestamps. Reps cannot tamper with device time.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 shadow-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-slate-900 font-bold text-[11px]">
                    <Smartphone className="size-3.5 text-emerald-600 shrink-0" />
                    <span>10m Geofence</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Forms unlock strictly on premise. Geotagged camera &amp; on-glass e-signature.
                  </p>
                </div>
              </div>

              {/* Bottom Reassurance Strip */}
              <div className="mt-3.5 rounded-xl bg-blue-50/70 p-3 text-xs text-blue-900 flex items-center justify-between border border-blue-100">
                <span className="font-semibold">Hardware Requirement:</span>
                <span className="font-bold text-blue-700">₱0 Fleet GPS Boxes · 100% Mobile &amp; Web App</span>
              </div>
            </div>

            {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-3">
                  Field Recovery Assurance · Zero Ghost Visits
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Stop Paying for Fake Visit Sheets &amp; Unverified Fuel Claims.
                </h3>

                {/* Problem vs Solution Callout */}
                <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <AlertTriangle className="size-3.5" />
                    <span>The Floor Pain Point:</span>
                  </div>
                  <p className="text-xs text-rose-950/80 leading-relaxed">
                    Field reps fill out fake visit logs from fast food chains, claim false motorcycle gas allowances, and bank clients reject audit claims without timestamped proof.
                  </p>
                </div>

                {/* The 4 BITS Advantages */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Live Admin Fleet Radar (Laptop HQ)</span>
                      <p className="text-slate-600 mt-0.5">Floor supervisors watch field agents in real-time on live satellite GIS maps with breadcrumb trails, speed checks, and territory pins.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Tamper-Proof Satellite Stamping</span>
                      <p className="text-slate-600 mt-0.5">Arrival and departure times are locked from server GPS atomic clocks. Reps cannot manipulate phone time settings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Strict 10m Geofence Lock</span>
                      <p className="text-slate-600 mt-0.5">Reports cannot be submitted unless the mobile phone is physically within 10 meters of the debtor address.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Geotagged Photo &amp; Digital Signatures</span>
                      <p className="text-slate-600 mt-0.5">Snaps premises and demand letter photos with coordinates watermarked directly on the image, accompanied by on-glass signatures.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">100% Offline-First Architecture</span>
                      <p className="text-slate-600 mt-0.5">Works in basement parking, elevators, or rural dead zones. Encrypts data in SQLite and auto-syncs when signal returns.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CRO Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">0% Fake Visit Rate Guaranteed</span>
                <button
                  type="button"
                  onClick={() => openModal("Field App Consultation")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>Request Field App Demo</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tab-qa"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* Left: Audio Waveform Scrubber & BSP Compliance Checklist Deck (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-indigo-600" />
                    <span className="text-xs font-mono font-bold text-slate-800">
                      BITS Speech AI · 100% Floor Compliance Deck
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-700 border border-emerald-200">
                    BSP Circular 454 &amp; 857 Aligned
                  </span>
                </div>

                {/* Call Audio Waveform Player with Flagged Markers */}
                <div className="rounded-2xl border border-slate-200/90 bg-slate-900 p-4 text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-bold">Call #REC-8842 · Sarah M. vs. Debtor</span>
                    <span className="font-mono text-slate-400">04:12 / 07:35</span>
                  </div>

                  {/* Interactive Waveform Display with Tagged Pins */}
                  <div className="relative py-2">
                    <div className="flex items-center gap-1 h-10">
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
                    <div className="flex items-center justify-between pt-2 text-[9px] font-mono text-slate-300">
                      <span className="text-emerald-400 font-bold">✓ Identity Disclosure (02:14)</span>
                      <span className="text-blue-400 font-bold">✓ Restructuring Waiver (03:50)</span>
                      <span className="text-emerald-400 font-bold">✓ Zero Harassment Verified</span>
                    </div>
                  </div>
                </div>

                {/* BSP Statutory Compliance Checklist */}
                <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 space-y-2.5 shadow-xs">
                  <span className="text-xs font-bold text-slate-800 block">
                    Statutory Rule Engine Audit Result (100% Calls Checked)
                  </span>

                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-emerald-50/60 p-2.5 text-emerald-900">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block">Anti-Harassment Check</span>
                        <span className="text-[10px] text-emerald-700">Zero profanity or threats</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-emerald-50/60 p-2.5 text-emerald-900">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block">Contact Hours Window</span>
                        <span className="text-[10px] text-emerald-700">10:14 AM (Within 6 AM - 10 PM)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-emerald-50/60 p-2.5 text-emerald-900">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block">NPC Data Privacy</span>
                        <span className="text-[10px] text-emerald-700">Identity verification passed</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-emerald-50/60 p-2.5 text-emerald-900">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block">Immutable Audit Log</span>
                        <span className="text-[10px] text-emerald-700">Encrypted call audio locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance Strip */}
              <div className="mt-4 rounded-xl bg-blue-50/70 p-3 text-xs text-blue-900 flex items-center justify-between border border-blue-100">
                <span className="font-semibold">Audited Call Sampling:</span>
                <span className="font-bold text-blue-700">100% Floor Coverage (Zero 2% Manual Sampling)</span>
              </div>
            </div>

            {/* Right: Pain Points & Advantages for Collections Agencies (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.25rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-3">
                  Statutory Governance · Speech AI Auditing
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Catch Rogue Agents Before the Bank Audits or Fines You.
                </h3>

                {/* Problem vs Solution Callout */}
                <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <AlertTriangle className="size-3.5" />
                    <span>The Floor Pain Point:</span>
                  </div>
                  <p className="text-xs text-rose-950/80 leading-relaxed">
                    QA teams manually audit only 2% of calls. One rogue agent using profane threats or calling outside allowable hours can cause bank clients to terminate your contract.
                  </p>
                </div>

                {/* The 4 BITS Advantages */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">100% Call Audio Evaluation</span>
                      <p className="text-slate-600 mt-0.5">Speech AI transcribes and scores every single call across your entire floor, leaving zero blind spots.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Guaranteed BSP 454/857 Protection</span>
                      <p className="text-slate-600 mt-0.5">Real-time filters catch harassment, unauthorized third-party disclosures, or calls made during quiet hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">1-Click Waveform Violation Scrubber</span>
                      <p className="text-slate-600 mt-0.5">QA leads jump directly to the exact second of a flagged violation without listening to a full 15-minute call.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Immutable Bank Audit Reports</span>
                      <p className="text-slate-600 mt-0.5">Export certified compliance certificates and digital coaching logs to prove your agency maintains zero statutory violations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CRO Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">Zero Regulatory Fines Incurred</span>
                <button
                  type="button"
                  onClick={() => openModal("QA Compliance Consultation")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>See Speech QA Demo</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* ── BOTTOM CONVERSION BAR: STRAIGHTFORWARD CTAS ── */}
      <div className="mt-8 sm:mt-12 rounded-3xl border border-white/90 bg-white/90 p-5 sm:px-8 sm:py-6 shadow-xl shadow-blue-950/5 backdrop-blur-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="size-4 text-blue-600" />
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Ready to modernize your collections floor with OPERATIONS 360?
            </h4>
          </div>
          <p className="text-xs text-slate-500 font-medium max-w-xl">
            See how predictive telephony, field agent GPS verification, and automated QA work on your exact debt portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openModal("Cockpit Bottom Bar Consultation")}
            className="group flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-6 font-bold text-white shadow-md shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer text-xs"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <Link
            href="/demo"
            className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-5 font-bold text-slate-800 shadow-2xs transition-all active:scale-[0.98] text-xs"
          >
            <span>Launch Sandbox Demo</span>
            <ExternalLink className="size-3 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
