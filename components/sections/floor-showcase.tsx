"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import {
  PhoneCall,
  Award,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  Mic,
  Volume2,
  Lock,
  ArrowRight,
  Headphones,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ShowcaseTab = "dialer" | "training" | "qa" | "messaging" | "analytics";

interface TabMeta {
  id: ShowcaseTab;
  label: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  subhead: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  imageSrc?: string;
  imageAlt?: string;
}

const TABS: TabMeta[] = [
  {
    id: "dialer",
    label: "Predictive Dialer & Softphone",
    badge: "Telephony Engine",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: PhoneCall,
    headline: "Zero Dead Air. No Desk Phones. Predictive Calling at ~0.4s.",
    subhead:
      "The browser is your softphone. BITS dials ahead, detects answered lines, drops silent connections, and hands connected debtors to free agents in under half a second.",
    bullets: [
      "4 Adaptive Dialing Modes: Manual, Preview, Progressive, and Predictive.",
      "Live Supervisor Oversight: Listen in silently, Whisper coaching to your agent, or Barge in to secure commitments.",
      "Sub-Second Screen Pop: Debtor history, previous contact notes, and PTP balances load before the agent speaks.",
      "Inbound Caller ID Match: Debtor callbacks automatically route to available agents with call recording enabled.",
    ],
    metrics: [
      { label: "Screen-Pop Latency", value: "~0.4s" },
      { label: "Connect Rate Lift", value: "+38%" },
      { label: "Hardware Cost", value: "₱0" },
    ],
    imageSrc: "/images/features/predictive-dialer.jpg",
    imageAlt: "BITS Predictive Dialer & Softphone — live calls monitoring, agent dispositions, and connected rate gauge",
  },
  {
    id: "training",
    label: "Walled Training Floor",
    badge: "The Unfair Advantage",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: GraduationCap,
    headline: "Rookies Practice on Real Screens. Zero Risk to Live Portfolios.",
    subhead:
      "The #1 reason collection agencies get fined is new agents making mistakes on live accounts. BITS isolates rookie agents on a separate Training Floor with dummy accounts and echo-line practice numbers that never dial real debtors.",
    bullets: [
      "Isolated Training Mode: Practice on real screens without touching production databases or client accounts.",
      "Safe Echo Lines: Practice phone numbers ring a local echo line or trainer extension, never a real customer.",
      "Scored & Coached: Practice calls are recorded and scored on real QA sheets, but excluded from production KPIs.",
      "Automated Sandbox Purge: All dummy practice accounts and test audio auto-delete after 30 days.",
    ],
    metrics: [
      { label: "Compliance Risk", value: "0%" },
      { label: "Ramp-Up Time", value: "-60%" },
      { label: "Live Data Leakage", value: "Zero" },
    ],
  },
  {
    id: "qa",
    label: "QA Scorecards & Outliers",
    badge: "Statutory Governance",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: Award,
    headline: "Spot Underperforming Agents Before the Bank Audits You.",
    subhead:
      "Standardize call evaluations across customized weighted checklists. Jump to synchronized audio waveforms in one click, and automatically surface outlier agents who need immediate coaching.",
    bullets: [
      "QA Outlier Agent Finder: Automatically ranks agents by weighted audit scores to pinpoint training needs.",
      "Synchronized Call Audio: Listen to call recordings directly on the account screen with interactive waveform scrubbing.",
      "Critical-Fail Thresholds: Instantly flag illegal harassment, missing disclosures, or unauthorized payment arrangements.",
      "Signed Coaching Logs: Convert audit fails into formal 1-on-1 coaching logs signed digitally by the agent.",
    ],
    metrics: [
      { label: "Audit Speed", value: "3.5x" },
      { label: "Compliance Pass", value: "99.2%" },
      { label: "Audited Calls", value: "100%" },
    ],
    imageSrc: "/images/features/qa-scorecard.jpg",
    imageAlt: "BITS QA Evaluation Scorecard — outlier agent finder, call recording audio player, and monthly performance scorecards",
  },
  {
    id: "messaging",
    label: "Omnichannel Messaging & SMS",
    badge: "Customer Engagement",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    icon: MessageSquare,
    headline: "Reach Debtors Where They Answer: SMS, Viber & WhatsApp.",
    subhead:
      "Send automated payment reminders, payment links, and bulk message blasts with dynamic customer merge fields. Plug into local GoIP GSM gateways or enterprise messaging providers.",
    bullets: [
      "Pluggable Channels: SMS, Viber Business, WhatsApp, Email, and office GoIP SIM gateways.",
      "Targeted Blast Builder: Filter accounts by Days Past Due (>30, >60), campaign, and delinquency bucket.",
      "Dynamic Merge Tags: Automatically inject debtor name, exact outstanding balance, and due date.",
      "Direct Payment Links: Embed tokenized GCash and Maya links directly in message templates.",
    ],
    metrics: [
      { label: "Delivery Rate", value: "98.4%" },
      { label: "PTP Response Rate", value: "+44%" },
      { label: "Providers", value: "Pluggable" },
    ],
    imageSrc: "/images/features/messaging-channels.jpg",
    imageAlt: "BITS Omnichannel Messaging — WhatsApp, Viber, SMS blast builder, and real-time delivery logs",
  },
  {
    id: "analytics",
    label: "Floor Velocity & Aging Buckets",
    badge: "Live Telemetry",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: BarChart3,
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
    imageSrc: "/images/features/analytics-dashboard.jpg",
    imageAlt: "BITS Floor Velocity Dashboard — collections over time, DPD aging buckets, and agent recovery leaderboards",
  },
];

export function FloorShowcase() {
  const { openModal } = useConsultationModal();
  const [activeTab, setActiveTab] = React.useState<ShowcaseTab>("dialer");

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
              <Sparkles className="size-3.5 text-blue-600" />
              <span>THE RECOVERY FLOOR POWERHOUSE</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              The 5 Engines That Power{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                High-Velocity Recovery Floors.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Every tool your supervisors, agents, and QA auditors need—integrated into a unified workspace built from 20 years of hands-on operations experience.
            </p>
          </Reveal>
        </div>

        {/* ── INTERACTIVE HORIZONTAL TABS SELECTOR ── */}
        <Reveal delay={0.1}>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 sm:pb-6 gap-2 sm:gap-3 scrollbar-none no-scrollbar">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer border select-none",
                    isActive
                      ? "bg-slate-950 text-white border-slate-950 shadow-lg shadow-slate-950/15"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 transition-colors",
                      isActive ? "text-blue-400" : "text-slate-500 group-hover:text-blue-600"
                    )}
                  />
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
                          <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
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
                        className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-slate-950 hover:bg-blue-600 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:shadow-blue-600/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                      >
                        <span>Schedule Live Floor Demo</span>
                        <span className="size-8 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:bg-white/25 transition-all duration-300 font-bold">
                          →
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: High-End Visual with Authentic BITS Brand Overlay or Interactive Simulator */}
                  <div className="lg:col-span-7">
                    {currentTab.id === "training" ? (
                      /* ── TAB 2: SPECIAL INTERACTIVE TRAINING FLOOR SIMULATOR ── */
                      <div className="relative rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/30 via-slate-50/50 to-white p-5 sm:p-7 shadow-xl shadow-emerald-950/5 overflow-hidden">
                        {/* Walled Sandbox Watermark Banner */}
                        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-emerald-100">
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                              <Lock className="size-4" />
                            </div>
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
                          <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-4 shadow-md">
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                              <div className="flex items-center gap-2">
                                <Logo variant="tile" className="size-5 rounded-md object-contain" />
                                <span className="text-xs font-bold tracking-tight text-white">BITS Training Softphone</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                                Local Echo Line
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2.5">
                                <div className="size-8 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300">
                                  <Mic className="size-4" />
                                </div>
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
                                <Volume2 className="size-3.5" />
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

                        {/* ── AUTHENTIC BITS BRAND OVERLAY (Directly Covers Generic Names like 'Dialer Pro' or 'Logo') ── */}
                        <div className="absolute top-[2%] left-[1.5%] z-20 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-xl shadow-sm border border-slate-200/90 backdrop-blur-md">
                          <Logo variant="tile" className="size-6 sm:size-7 rounded-lg object-contain shadow-2xs" />
                          <div className="flex flex-col">
                            <span className="font-extrabold text-[12px] sm:text-[13px] text-slate-900 tracking-tight leading-none">
                              {currentTab.id === "dialer" && "BITS Softphone & Dialer"}
                              {currentTab.id === "qa" && "BITS QA & Outlier Scorecard"}
                              {currentTab.id === "messaging" && "BITS Omnichannel Hub"}
                              {currentTab.id === "analytics" && "BITS Floor Analytics"}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
                              Sovereign Recovery OMS · v3.4
                            </span>
                          </div>
                        </div>

                        {/* Live Telemetry Pill Floating in Bottom Right */}
                        <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-md">
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>
                            {currentTab.id === "dialer" && "WebRTC 0.4s Pop · Listen / Whisper / Barge"}
                            {currentTab.id === "qa" && "100% Call Coverage · Outlier Detection"}
                            {currentTab.id === "messaging" && "SMS / Viber / WhatsApp / GoIP Gateway"}
                            {currentTab.id === "analytics" && "Philippine Peso Ledger · Real-Time DPD"}
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
