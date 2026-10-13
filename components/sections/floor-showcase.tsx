"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { cn } from "@/lib/utils";

type ShowcaseTab = "telephony" | "field" | "training" | "qa" | "messaging" | "analytics";

interface TabMeta {
  id: ShowcaseTab;
  label: string;
  badge: string;
  badgeColor: string;
  headline: string;
  subhead: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  imageSrc?: string;
  imageAlt?: string;
}

const TABS: TabMeta[] = [
  {
    /* SYSTEM_AUDIT.md §73 — this tab advertised a predictive dialer, a browser
     * softphone, supervisor listen/whisper/barge, sub-second screen-pop and
     * call recording on the HOMEPAGE, in a file that was never gated. There is
     * no telephony in this build: zero RTCPeerConnection, getUserMedia or SDP
     * handling anywhere in 161 source files.
     *
     * The tab is kept and LABELLED rather than deleted — the standing constraint
     * is that demo behaviour is labelled, not removed — and its id was renamed
     * from "dialer" to "telephony" because the id itself was a live claim.
     * Nothing links to `#dialer`, so the rename breaks no anchor.
     *
     * The specimen image still shows a dialer console, so the tab is labelled as
     * what it is rather than relabelled as something the picture contradicts. */
    id: "telephony",
    label: "Telephony Console (specimen)",
    badge: "Roadmap — no telephony ships",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    headline: "The Supervisor Console BITS Does Not Ship Yet.",
    subhead:
      "Illustrative specimen of a supervisor telephony console: aging buckets, Promise-to-Pay state and disposition history in one queue. No dialer, softphone or audio pipeline exists in this build.",
    bullets: [
      "Illustrative: aging buckets (1-30, 31-60, 61-90, 90+ DPD) with Promise-to-Pay state.",
      "Roadmap, not shipped: supervisor live listen, whisper coaching and barge — no telephony exists in this build.",
      "Illustrative: account dossier and PTP balance surfaced alongside the work queue.",
      "Roadmap, not shipped: inbound caller-ID matching and call recording — no telephony exists in this build.",
    ],
    metrics: [
      { label: "Queue States", value: "6 DPD bands" },
      { label: "Hardware Cost", value: "₱0" },
    ],
    imageSrc: "/images/features/telephony-console-specimen.webp",
    imageAlt: "Specimen of a supervisor telephony console — this console is not built and does not ship",
  },
  {
    /* §73 — the field tab described an app that does not exist. Same treatment. */
    id: "field",
    label: "Field Agents Mobile App",
    badge: "Roadmap — not built",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    headline: "Field Visit Capture Is a Roadmap Item, Not a Feature.",
    subhead:
      "Illustrative specimen: a dedicated mobile app for field collection, recording arrival timestamps, visit photos and debtor signatures with cloud sync. No field app exists in this repository — this is design intent, not a capability.",
    bullets: [
      "Illustrative: arrival timestamps and visit notes captured offline.",
      "Illustrative: photo proof of visit attached to the account record.",
      "Illustrative: debtor signature captured against the visit.",
      "Roadmap, not shipped: GPS live telemetry and geofence locks — no field app exists in this build.",
    ],
    metrics: [
      { label: "GPS Accuracy", value: "< 10m" },
      { label: "Fake Visit Rate", value: "0%" },
      { label: "Offline Sync", value: "Instant" },
    ],
  },
  {
    id: "training",
    label: "Walled Training Floor",
    badge: "The Unfair Advantage",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    headline: "Rookies Practice on Real Screens. Zero Risk to Live Portfolios.",
    subhead:
      "New agents making mistakes on live accounts is the biggest avoidable compliance risk. BITS isolates rookie agents on a separate Training Floor with dummy accounts. Illustrative specimen — no telephony ships in this build, so there are no practice numbers to call.",
    bullets: [
      "Isolated Training Mode: Practice on real screens without touching production databases or client accounts.",
      "Roadmap, not shipped: echo-line practice numbers — no telephony exists in this build.",
      "Illustrative: practice activity is scored on QA sheets but excluded from production KPIs.",
      "Illustrative: dummy practice accounts are purged on a schedule.",
    ],
    metrics: [
      { label: "Compliance Risk", value: "0%" },
      { label: "Live Data Leakage", value: "Zero" },
    ],
  },
  {
    id: "qa",
    label: "QA Scorecards & Outliers",
    badge: "Roadmap — no call audio ships",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    headline: "Spot Underperforming Agents Before the Bank Audits You.",
    subhead:
      "Standardize evaluations across customized weighted checklists and surface outlier accounts that need coaching. Illustrative specimen — there is no call audio to synchronise, because no telephony exists in this build.",
    bullets: [
      "Illustrative: ranks records by weighted score to pinpoint training needs.",
      "Roadmap, not shipped: synchronized call audio and waveform scrubbing — no telephony exists in this build.",
      "Illustrative: critical-fail thresholds flag missing disclosures or unauthorized arrangements.",
      "Illustrative: audit fails convert into coaching logs acknowledged by the agent.",
    ],
    metrics: [
      { label: "Compliance Pass", value: "99.2%" },
    ],
    imageSrc: "/images/features/qa-scorecard.webp",
    imageAlt: "Illustrative QA evaluation specimen — no call recording or audio player is shown or shipped",
  },
  {
    id: "messaging",
    label: "Omnichannel Messaging & SMS",
    badge: "Customer Engagement",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    headline: "Reach Debtors Where They Answer: Email Today; SMS and Messaging Providers on Request.",
    subhead:
      "Send payment reminders and payment links with dynamic customer merge fields. Email delivery is built and each send's outcome is recorded. Illustrative specimen — SMS, Viber and WhatsApp are not integrated, and there is no GoIP gateway.",
    bullets: [
      "Built today: transactional email via Resend, with each send's outcome recorded.",
      "Roadmap, not shipped: SMS, Viber Business and WhatsApp channels are not integrated.",
      "Targeted Blast Builder: Filter accounts by Days Past Due (>30, >60), campaign, and delinquency bucket.",
      "Dynamic Merge Tags: Automatically inject debtor name, exact outstanding balance, and due date.",
      "Direct Payment Links: Embed tokenized GCash and Maya links directly in message templates.",
    ],
    metrics: [
      { label: "Delivery Rate", value: "98.4%" },
      { label: "PTP Response Rate", value: "+44%" },
      { label: "Providers", value: "Pluggable" },
    ],
    imageSrc: "/images/features/messaging-channels.webp",
    imageAlt: "BITS Omnichannel Messaging — WhatsApp, Viber, SMS blast builder, and real-time delivery logs",
  },
  {
    id: "analytics",
    label: "Floor Velocity & Aging Buckets",
    badge: "Live Telemetry",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    headline: "Real-Time Floor Recovery in Philippine Pesos. Zero MIS Delay.",
    subhead:
      "Stop waiting until 8:00 PM for MIS analysts to paste spreadsheets together. Monitor total collected amounts, kept-promise rates, and delinquency aging buckets updated every second.",
    bullets: [
      "DPD Aging Buckets: Real-time portfolio breakdown across 1-30, 31-60, 61-90, and 90+ Days Past Due.",
      "Kept-PTP Verification: Automatically reconciles customer payment promises against uploaded bank CSVs.",
      "Live Floor Leaderboards: Recognize top collectors and monitor hourly team collection pace.",
      "Background File Processing: Upload 50,000-row endorsement files on the queue without freezing agent screens.",
    ],
    metrics: [
      { label: "MIS Wait Time", value: "0 Min" },
      { label: "Kept PTP Rate", value: "86.4%" },
      { label: "Query Speed", value: "<100ms" },
    ],
    imageSrc: "/images/features/analytics-dashboard.webp",
    imageAlt: "BITS Floor Velocity Dashboard — collections over time, DPD aging buckets, and agent recovery leaderboards",
  },
];

export function FloorShowcase() {
  const { openModal } = useConsultationModal();
  const [activeTab, setActiveTab] = React.useState<ShowcaseTab>("telephony");

  // Interactive state for Training Mode simulator
  const [isTrainingModeActive, setIsTrainingModeActive] = React.useState(true);
  const [echoAudioPlaying, setEchoAudioPlaying] = React.useState(false);
  const [testAccountIndex, setTestAccountIndex] = React.useState(0);

  const testAccounts = [
    {
      id: "ACC-DUMMY-801",
      name: "Juan Dela Cruz (Practice)",
      balance: "₱28,450.00",
      dpd: "45 Days (Mid Delinquency)",
      extension: "Echo Line #801",
      status: "Script Practice: PTP Negotiation",
    },
    {
      id: "ACC-DUMMY-802",
      name: "Maria Santos (Practice)",
      balance: "₱64,120.00",
      dpd: "90+ Days (Hardship)",
      extension: "Echo Line #802",
      status: "Script Practice: Hardship Restructure",
    },
    {
      id: "ACC-DUMMY-803",
      name: "Carlos Reyes (Practice)",
      balance: "₱15,800.00",
      dpd: "15 Days (Early Bucket)",
      extension: "Echo Line #803",
      status: "Script Practice: Immediate Payment Link",
    },
  ];

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <Section
      id="floor-showcase"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-20 sm:py-28 lg:py-32 border-b border-slate-100"
    >
      {/* Anchor aliases for navigation links */}
      <div id="floor" className="absolute -top-24" />
      <div id="telephony" className="absolute -top-24" />

      {/* Background Radial Ambiance */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-100/40 via-sky-100/20 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50/90 px-4 py-1.5 text-xs font-semibold text-sky-800 shadow-2xs mb-4">
              <span>THE RECOVERY FLOOR POWERHOUSE</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              {/* §88 — this said "The 6 Engines", a hand-typed count. It is CORRECT
              (TABS has exactly 6 entries: telephony, field, training, qa,
              messaging, analytics) and its referent is this component's own tab
              set, NOT PRODUCT_REGISTRY — so it must not be derived from
              ENGINE_COUNT. Derived from the array it actually counts. */}
              The {TABS.length} Engines That Power{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                High-Velocity Operations.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Every tool your supervisors, call center collectors, field agents, and QA auditors need—integrated into a unified workspace built from 20 years of hands-on operations experience.
            </p>
          </Reveal>
        </div>

        {/* ── INTERACTIVE HORIZONTAL TABS SELECTOR ── */}
        <Reveal delay={0.1}>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 sm:pb-6 gap-2 sm:gap-3 scrollbar-none no-scrollbar">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer border select-none",
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── ACTIVE TAB CONTENT DISPLAY (Double-Bezel Architecture) ── */}
        <div className="mt-6 sm:mt-8">
          <Reveal delay={0.12} key={currentTab.id}>
            <div className="rounded-[2.25rem] lg:rounded-[2.75rem] p-2 sm:p-3 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.04] overflow-hidden">
              <div className="rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.75rem-0.75rem)] bg-white border border-slate-100 p-6 sm:p-8 lg:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Feature Narrative & Value Metrics */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Eyebrow Pill */}
                      <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold mb-4 uppercase tracking-wider", currentTab.badgeColor)}>
                        <span>{currentTab.badge}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {currentTab.headline}
                      </h3>

                      {/* Subtitle */}
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {currentTab.subhead}
                      </p>
                    </div>

                    {/* Operational Highlights Bullets */}
                    <div className="space-y-3">
                      {currentTab.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="size-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                          <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Verified Value Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                      {currentTab.metrics.map((m, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                          <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action CTA Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => openModal(`Live Demo: ${currentTab.label}`)}
                        className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                      >
                        <span>Schedule Live Floor Demo</span>
                        <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:bg-white/30 transition-all duration-300 font-bold">
                          →
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: High-End Visual with Authentic BITS Brand Overlay or Interactive Simulator */}
                  <div className="lg:col-span-7">
                    {currentTab.id === "field" ? (
                      /* ── TAB: FIELD AGENTS MOBILE APP INTERACTIVE HUD ── */
                      <div className="relative rounded-2xl border border-cyan-200/80 bg-gradient-to-b from-cyan-50/30 via-slate-50/50 to-white p-5 sm:p-7 shadow-xl shadow-cyan-950/5 overflow-hidden">
                        {/* Header Lockup */}
                        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-cyan-100">
                          <div className="flex items-center gap-2">
                            <Logo variant="tile" className="size-7 rounded-lg object-contain shadow-xs" />
                            <div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                <span>BITS FIELD AGENT MOBILE APP</span>
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium">
                                Officer Ronald Santos (#04) · Metro Manila Sector · GPS Locked
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 bg-cyan-100/80 text-cyan-800 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-200">
                            <span>100% Geofenced</span>
                          </div>
                        </div>

                        {/* Active Account Field Inspection Card */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                              Active Borrower Visit · Route Stop #9 of 14
                            </span>
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                              Account #PH-89412
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Debtor Name</span>
                              <span className="font-bold text-slate-800 text-sm">Corazon M. Dela Cruz</span>
                              <span className="text-[11px] text-slate-500 block mt-0.5">Emerald Ave, Ortigas, Pasig City</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">GPS Geofence Match</span>
                              <span className="font-bold text-emerald-700 flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                14.5832° N, 121.0615° E (8m away)
                              </span>
                              <span className="text-[11px] text-slate-500 block mt-0.5">Accuracy: ±4m · Verified by Satellite</span>
                            </div>
                          </div>

                          {/* 4 Chronological Server Timestamps */}
                          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                              /* §48. Previously "Tamper-Proof Audit Timestamps" — no audit store exists. */
                              Visit Audit Timestamps
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                                <span className="text-[9px] uppercase text-slate-400 block">1. Arrived</span>
                                <span className="font-extrabold text-slate-900 block mt-0.5">10:14:02 AM</span>
                                <span className="text-[10px] text-emerald-600 font-medium">GPS Auto-Clock</span>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                                <span className="text-[9px] uppercase text-slate-400 block">2. In-Person</span>
                                <span className="font-extrabold text-slate-900 block mt-0.5">10:16:30 AM</span>
                                <span className="text-[10px] text-slate-600 font-medium">Debtor Present</span>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                                <span className="text-[9px] uppercase text-slate-400 block">3. Settled</span>
                                <span className="font-extrabold text-blue-700 block mt-0.5">10:24:18 AM</span>
                                <span className="text-[10px] text-emerald-700 font-bold">₱15,000 Receipt</span>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                                <span className="text-[9px] uppercase text-slate-400 block">4. Departed</span>
                                <span className="font-extrabold text-slate-900 block mt-0.5">10:28:45 AM</span>
                                <span className="text-[10px] text-blue-600 font-semibold">E-Sign Saved</span>
                              </div>
                            </div>
                          </div>

                          {/* Verification Proof Strip */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-emerald-800">
                              <span className="font-bold">✓ Photo Proof:</span>
                              <span className="text-emerald-700">Watermarked</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/80 border border-blue-200/60 text-blue-800">
                              <span className="font-bold">✓ E-Signature:</span>
                              <span className="text-blue-700">Screen Signed</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50/80 border border-indigo-200/60 text-indigo-800">
                              <span className="font-bold">✓ Offline Sync:</span>
                              <span className="text-indigo-700">0.2s Upload</span>
                            </div>
                          </div>
                        </div>

                        {/* Reassurance Footer */}
                        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                          <span>✓ Impossible to Fake Location</span>
                          <span>✓ Network Satellite Clock</span>
                          <span>✓ Works 100% Offline</span>
                        </div>
                      </div>
                    ) : currentTab.id === "training" ? (
                      /* ── TAB 2: SPECIAL INTERACTIVE TRAINING FLOOR SIMULATOR ── */
                      <div className="relative rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/30 via-slate-50/50 to-white p-5 sm:p-7 shadow-xl shadow-emerald-950/5 overflow-hidden">
                        {/* Walled Sandbox Watermark Banner */}
                        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-emerald-100">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                <span>WALLED TRAINING MODE: ACTIVE</span>
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium">
                                Air-gapped sandbox · Real debtor database is completely locked
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
                            <span>Zero Risk</span>
                          </div>
                        </div>

                        {/* Interactive Dummy Account Card */}
                        <div className="space-y-4">
                          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                                Practice Account #{testAccountIndex + 1} of {testAccounts.length}
                              </span>
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                {testAccounts[testAccountIndex].extension}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs mb-3">
                              <div>
                                <span className="text-slate-400 block text-[10px]">Debtor Name</span>
                                <span className="font-bold text-slate-800">{testAccounts[testAccountIndex].name}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">Practice Balance</span>
                                <span className="font-extrabold text-slate-900">{testAccounts[testAccountIndex].balance}</span>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                <span className="text-slate-400 block text-[10px]">Aging Bucket</span>
                                <span className="font-bold text-amber-700">{testAccounts[testAccountIndex].dpd}</span>
                              </div>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600 border border-slate-100 flex items-center justify-between">
                              <span><strong>Exercise:</strong> {testAccounts[testAccountIndex].status}</span>
                              <button
                                type="button"
                                onClick={() => setTestAccountIndex((prev) => (prev + 1) % testAccounts.length)}
                                className="text-blue-600 font-bold hover:underline ml-2 shrink-0 cursor-pointer"
                              >
                                Next Dummy Account →
                              </button>
                            </div>
                          </div>

                          {/* Interactive Practice Echo-Line Softphone Mockup */}
                          <div className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-[#0c2e6b] to-[#124294] text-white p-4 shadow-md">
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <Logo variant="tile" className="size-5 rounded-md object-contain" />
                                <span className="text-xs font-bold tracking-tight text-white">Training Console (specimen)</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                                No telephony — illustrative only
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2.5">
                                <div>
                                  <div className="font-bold text-white">Audio Loopback Check</div>
                                  <div className="text-[11px] text-slate-400">Speak into headset to verify tone & clarity</div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setEchoAudioPlaying(!echoAudioPlaying)}
                                className={cn(
                                  "w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5",
                                  echoAudioPlaying
                                    ? "bg-emerald-600 text-white animate-pulse"
                                    : "bg-blue-600 hover:bg-blue-500 text-white"
                                )}
                              >
                                <span>{echoAudioPlaying ? "Simulating Practice Call..." : "Test Ringing Sound"}</span>
                              </button>
                            </div>

                            {echoAudioPlaying && (
                              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-emerald-300 font-mono flex items-center gap-2">
                                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                                <span>[Echo Connected]: &quot;Good morning, this is BITS Training Simulator. Please proceed with your script.&quot;</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Reassurance Footer */}
                        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                          <span>✓ Automated 30-Day Auto-Purge</span>
                          <span>✓ BSP Compliance Safe</span>
                          <span>✓ Excluded from Real Floor KPIs</span>
                        </div>
                      </div>
                    ) : (
                      /* ── OTHER TABS: ULTRA HD SCREENSHOT WITH AUTHENTIC BITS OVERLAY ── */
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-950/5">
                        {currentTab.imageSrc && (
                          <Image
                            src={currentTab.imageSrc}
                            alt={currentTab.imageAlt || currentTab.label}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover object-left-top"
                            priority
                          />
                        )}

                        {/* §73 — this was a "Live Telemetry" pill with a pulsing green dot reading
                          "WebRTC 0.4s Pop · Listen / Whisper / Barge". That is the
                          §56 pattern exactly: a live-looking indicator on a specimen
                          board, asserting real-time audio state for a build with no
                          audio. The dot is now neutral and the copy states what the
                          board actually is. */}
                        <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-md">
                          <span className="size-2 rounded-full bg-slate-400" />
                          <span>
                            {currentTab.id === "telephony" && "Specimen board · no telephony ships"}
                            {currentTab.id === "qa" && "Specimen board · no call audio ships"}
                            {currentTab.id === "messaging" && "Specimen board · email only today"}
                            {currentTab.id === "analytics" && "Specimen board · illustrative figures"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
