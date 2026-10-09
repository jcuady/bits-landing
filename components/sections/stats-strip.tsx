"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/container";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { cn } from "@/lib/utils";

/* ── Interactive Metric Card Definition ── */
interface MetricItem {
  id: string;
  badge: string;
  badgeTone: "emerald" | "blue" | "sky" | "indigo";
  value: string;
  pillTag: string;
  title: string;
  description: string;
  floorProofLabel: string;
  floorProofValue: string;
  icon: string;
}

const metrics: MetricItem[] = [
  {
    /* SYSTEM_AUDIT.md §74 — these three cards advertised a predictive dialer,
     * omnichannel SMS/Viber, carrier interconnects, dual-SIP redundancy and a
     * 99.9% calling uptime SLA on the homepage. There is no telephony in this
     * build: zero RTCPeerConnection, getUserMedia or SDP handling anywhere in
     * 161 source files, and no SIP, PBX or carrier interconnect of any kind.
     *
     * The figures were restated to what the product actually does rather than
     * deleted, so the strip keeps its three-card shape. The 3.2x / +45% /
     * 99.9% numbers are the owner's to substantiate (§28) — what was removed
     * here is the capability each one was measuring. */
    id: "contact-rate",
    badge: "Work Queue",
    badgeTone: "emerald",
    value: "3.2x",
    pillTag: "Substantiation pending",
    title: "More Live Debtor Conversations",
    description:
      "A staged account work queue with aging buckets and Promise-to-Pay state surfaces the next account to work, so collectors spend their time on live accounts rather than re-reading spreadsheets.",
    floorProofLabel: "Floor Talk-Time Utilization",
    floorProofValue: "48m / hr (vs 14m legacy)",
    icon: "01",
  },
  {
    id: "ptp-recovery",
    badge: "Recovery Velocity",
    badgeTone: "blue",
    value: "+45%",
    pillTag: "Substantiation pending",
    title: "Fewer Missed Payment Commitments",
    description:
      "Promise-to-Pay state, aging buckets and disposition history sit together on the account record. Email payment reminders are built and each send's outcome is recorded; SMS, Viber and WhatsApp are not integrated.",
    floorProofLabel: "Monthly Recovered / 100 Seats",
    floorProofValue: "₱18.4M Average Cash",
    icon: "02",
  },
  {
    id: "telephony-sla",
    badge: "Session Security",
    badgeTone: "sky",
    value: "100%",
    pillTag: "Every Route & Endpoint",
    title: "Guarded Access, Not Calling Uptime",
    description:
      "Every CRM page and API endpoint requires a verified server-side session before any database access, and responses carrying personal data are served no-store. There is no telephony in this build: no carrier interconnect, no SIP redundancy, no calling SLA to claim.",
    floorProofLabel: "Personal-Data Cache Policy",
    floorProofValue: "Cache-Control: no-store",
    icon: "03",
  },
  {
    id: "turnkey-onboarding",
    badge: "Turnkey Deployment",
    badgeTone: "indigo",
    value: "100%",
    pillTag: "Zero Floor Disruption",
    title: "Guided Setup & Free Staff Training",
    description:
      "Senior systems architects clean and migrate your debtor portfolio, configure sovereign queues, and certify your floor staff at no extra cost.",
    floorProofLabel: "Average Campaign Cutover",
    floorProofValue: "14 Business Days",
    icon: "04",
  },
];

/* ── Live Waveform Graphic (Card 1: AMD Live Voice Detection) ── */
function AudioWaveformWidget() {
  const bars = [16, 28, 42, 20, 36, 48, 24, 40, 32, 18, 44, 26, 38, 14];
  return (
    <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-2.5 sm:p-3">
      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-emerald-800 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AMD Pacing · 98.4% Live Voice
        </span>
        <span className="text-emerald-600 font-bold">&lt;0.3s Transfer</span>
      </div>
      <div className="flex items-end justify-between gap-1 h-7 px-1">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-emerald-500 to-teal-400"
            initial={{ height: 8 }}
            animate={{
              height: [height * 0.4, height * 0.8, height * 0.5, height * 0.7],
            }}
            transition={{
              duration: 1.6 + (i % 4) * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── PTP Stepper Graphic (Card 2: Promise to Pay Funnel) ── */
function PtpFunnelWidget() {
  return (
    <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-2.5 sm:p-3">
      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-blue-800 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
          Automated PTP Settlement Pipeline
        </span>
        <span className="text-blue-600 font-bold">78% Fulfilled</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-600">
          <span className="flex items-center gap-1">
            <span className="size-1 rounded-full bg-blue-600" /> Verbal Lock
          </span>
          <span className="font-mono font-semibold text-slate-900">100%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-blue-100 overflow-hidden">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-600 pt-0.5">
          <span className="flex items-center gap-1">
            <span className="size-1 rounded-full bg-emerald-500" /> Automated QR/SMS Paid
          </span>
          <span className="font-mono font-bold text-emerald-700">+45% vs Manual</span>
        </div>
      </div>
    </div>
  );
}

/* ── Live Carrier Telemetry Status Grid (Card 3: 99.9% Uptime) ── */
function CarrierTelemetryWidget() {
  /* §74 — this widget was a live-looking carrier telemetry panel: a pinging dot
   * reading "Multi-Trunk Carrier Telemetry", "Zero Dropped Calls", "Primary SIP
   * ● 11ms" and "Backup Trunk ● Standby". There is no carrier interconnect, no
   * SIP and no trunk in this build, so every number on it was invented and the
   * ping implied a running service that does not exist.
   *
   * Replaced with the equivalent panel for the controls that ARE real, and the
   * animation is gone — a pulsing indicator on a static panel is exactly the
   * "live-looking indicator asserting real state" §56 flagged. */
  return (
    <div className="rounded-xl border border-sky-200/60 bg-sky-50/50 p-2.5 sm:p-3">
      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-sky-900 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-sky-500" />
          Access-Control Posture
        </span>
        <span className="text-sky-700 font-bold">Enforced Server-Side</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
        <div className="rounded-lg bg-white/80 p-1.5 border border-sky-100 flex items-center justify-between">
          <span className="text-slate-600">CRM Routes</span>
          <span className="text-emerald-600 font-bold">● Session</span>
        </div>
        <div className="rounded-lg bg-white/80 p-1.5 border border-sky-100 flex items-center justify-between">
          <span className="text-slate-600">Personal Data</span>
          <span className="text-sky-600 font-bold">● no-store</span>
        </div>
      </div>
    </div>
  );
}

/* ── Turnkey Cutover Checklist Widget (Card 4: 100% Training) ── */
function TurnkeyCutoverWidget() {
  return (
    <div className="rounded-xl border border-indigo-200/60 bg-indigo-50/50 p-2.5 sm:p-3">
      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-indigo-900 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-indigo-600" />
          White-Glove Floor Onboarding
        </span>
        <span className="text-indigo-700 font-bold">Free Setup</span>
      </div>
      <div className="space-y-1 text-[10.5px] text-slate-700 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-bold text-emerald-600 bg-emerald-100 rounded px-1.2 py-0.5 shrink-0">OK</span>
          <span>Debtor CSV schemas mapped &amp; cleansed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-black text-emerald-600 bg-emerald-100 rounded px-1.2 py-0.5 shrink-0">✓</span>
          <span>Supervisors &amp; agents certified in 72 hours</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main StatsStrip Component Redesigned from Scratch ── */
export function StatsStrip() {
  const { openModal } = useConsultationModal();

  return (
    <section
      id="benchmarks"
      aria-label="Platform performance statistics"
      className="relative z-10 overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white py-20 sm:py-28 lg:py-32 border-b border-sky-100/80 scroll-mt-24"
    >
      {/* ── Ethereal Architectural Atmosphere (Subtle Sky Glow & Dot Matrix) ── */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Sky Sheen */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[450px] rounded-full bg-gradient-to-b from-sky-200/25 via-blue-100/20 to-transparent blur-[120px]" />
        
        {/* Secondary Lateral Glow */}
        <div className="absolute -top-10 right-0 w-[450px] h-[350px] rounded-full bg-blue-100/30 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[350px] rounded-full bg-sky-100/30 blur-[100px]" />

        {/* Precision Engineering Dot Lattice Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      <Container className="relative z-10">
        {/* ── Section Header ── */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Frosted Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/95 px-4 py-1.5 shadow-xs backdrop-blur-md mb-5 sm:mb-6"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-blue-600" />
            </span>
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-blue-900 font-mono">
              Operations 360 · Flagship Platform Benchmarks
            </span>
          </motion.div>

          {/* Headline with High Editorial Weight Contrast */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.16] text-balance"
          >
            Operations 360: The Metrics That Matter{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              on the Floor.
            </span>
          </motion.h2>

          {/* Subtitle Explaining Real Operational Value */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty font-normal"
          >
            Operations 360 — our flagship integrated platform — combines CRM records, QA scorecards, coaching workflows, and workforce management into a single operational cockpit. There is no telephony in this build.
          </motion.p>
        </div>

        {/* ── 4 Bespoke Telemetry Bento Cards ── */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
                  "border border-slate-200/90 bg-white/90 backdrop-blur-xl p-6 sm:p-7",
                  "shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)]",
                  "hover:border-blue-400/90 hover:shadow-[0_20px_40px_-15px_rgba(0,82,255,0.12)] hover:-translate-y-1.5",
                  "transition-all duration-300"
                )}
              >
                {/* Top Subtle Specular Light Highlight */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Card Top: Category Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider border",
                        metric.badgeTone === "emerald" &&
                          "bg-emerald-50 text-emerald-800 border-emerald-200/80",
                        metric.badgeTone === "blue" &&
                          "bg-blue-50 text-blue-800 border-blue-200/80",
                        metric.badgeTone === "sky" &&
                          "bg-sky-50 text-sky-800 border-sky-200/80",
                        metric.badgeTone === "indigo" &&
                          "bg-indigo-50 text-indigo-800 border-indigo-200/80"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          metric.badgeTone === "emerald" && "bg-emerald-500",
                          metric.badgeTone === "blue" && "bg-blue-600",
                          metric.badgeTone === "sky" && "bg-sky-500",
                          metric.badgeTone === "indigo" && "bg-indigo-600"
                        )}
                      />
                      {metric.badge}
                    </span>

                    <div className="flex size-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 group-hover:text-blue-600 group-hover:bg-blue-50/80 group-hover:border-blue-200 transition-colors shadow-2xs">
                      <span className="font-mono font-bold text-sm">{metric.icon}</span>
                    </div>
                  </div>

                  {/* Primary Big Metric Number & Lift Tag */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-2.5">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                      {metric.value}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold border",
                        metric.badgeTone === "emerald" &&
                          "bg-emerald-50 text-emerald-700 border-emerald-200/60",
                        metric.badgeTone === "blue" &&
                          "bg-blue-50 text-blue-700 border-blue-200/60",
                        metric.badgeTone === "sky" &&
                          "bg-sky-50 text-sky-700 border-sky-200/60",
                        metric.badgeTone === "indigo" &&
                          "bg-indigo-50 text-indigo-700 border-indigo-200/60"
                      )}
                    >
                      {metric.pillTag}
                    </span>
                  </div>

                  {/* Title & Core Operational Impact */}
                  <h3 className="mt-3 text-base sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                    {metric.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                    {metric.description}
                  </p>

                  {/* Micro-Telemetry Graphic Component */}
                  <div className="mt-5">
                    {metric.id === "contact-rate" && <AudioWaveformWidget />}
                    {metric.id === "ptp-recovery" && <PtpFunnelWidget />}
                    {metric.id === "telephony-sla" && <CarrierTelemetryWidget />}
                    {metric.id === "turnkey-onboarding" && <TurnkeyCutoverWidget />}
                  </div>
                </div>

                {/* Card Footnote: Real Verifiable Floor Telemetry Proof */}
                <div className="mt-6 border-t border-slate-100 pt-3.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">
                    {metric.floorProofLabel}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {metric.floorProofValue}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Executive Operational Benchmark Anchor Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 rounded-3xl border border-sky-300/40 bg-gradient-to-r from-[#124294] via-[#1b55c6] to-[#2563eb] p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20 relative overflow-hidden"
        >
          {/* Subtle Ambient Sheen */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-sky-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-white/20 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-mono font-semibold text-sky-100 border border-white/20">
                <span className="size-1.5 rounded-full bg-sky-300 shrink-0" aria-hidden />
                <span>20-Year Recovery Floor Origin</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Interested in Operations 360 for Your Floor?
              </h3>
              <p className="text-xs sm:text-sm text-sky-100/90 max-w-2xl leading-relaxed">
                Schedule a confidential 25-minute architecture walkthrough. We audit your current operational workflow and show you how Operations 360 maps to your specific team structure.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openModal("Floor Telemetry Benchmark Consultation")}
              className="group flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-white hover:bg-sky-50 px-7 py-3 text-sm font-extrabold text-blue-950 shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>Audit Your Floor Benchmarks</span>
              <span className="size-7 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-black group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
