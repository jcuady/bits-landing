"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { collectionAccounts, dashboardStats } from "@/lib/marketing-specimens";
import {
  ShieldCheck,
  Check,
  PhoneCall,
  Award,
  Users,
  BookOpen,
  Clock,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  BarChart3,
  CalendarCheck,
  Headphones,
  FileSpreadsheet,
  MapPin,
} from "lucide-react";

/* ── Precision SVG Micro-Icons (Bespoke 1.5px Geometry) ── */
function OwnerIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
      <circle cx="19" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ManagerIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M10 14h4" />
      <path d="M10 17h4" />
    </svg>
  );
}

function SupervisorIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12h5" />
      <path d="M17 12h5" />
      <path d="M12 2v5" />
      <path d="M12 17v5" />
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AgentIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ── The Core Operational Engines Configuration ──
 *
 * §85: this was `NINE_ENGINES` and the rendered label read "The 9 Core
 * Operational Engines" — over a TEN-entry array. Both the constant's name
 * and the copy agreed with each other and both were wrong, which is why no
 * gate caught it: the label is not a claim about the product, it is a claim
 * about this array, and nothing compared the two. Renamed to match the
 * array; the visible label is derived from `.length` below so the two can
 * never disagree again. */
const CORE_ENGINES = [
  {
    name: "CRM & Customer Management",
    desc: "Unified 360° dossiers, customer history, account states & real-time updates.",
    icon: Users,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    name: "Quality Assurance (QA)",
    desc: "Standardized evaluation scorecards, compliance checklists & multi-tier calibration.",
    icon: Award,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  {
    name: "Performance Scorecards & Analytics",
    desc: "Real-time agent scorecards, floor benchmarks, KPI metrics & operational trends.",
    icon: BarChart3,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    name: "Coaching Logs & Action Plans",
    desc: "Documented 1-on-1 coaching notes, root-cause tracking & 14-day milestone reviews.",
    icon: BookOpen,
    color: "text-violet-600 bg-violet-50 border-violet-200",
  },
  {
    name: "QA Coaching",
    desc: "Bridges QA audit scores directly into actionable supervisor coaching in one click.",
    icon: Sparkles,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
  {
    name: "Integrated Dialer",
    /* §85 — this desc sat in the engines grid, which renders ABOVE the §79
     * simulation notice inside the chassis. The notice said "no telephony
     * ships in this build" 90 lines below the sentence that claimed a WebRTC
     * softphone with a supervisor whisper HUD. A disclaimer qualifies a
     * subtree; a claim outside that subtree is not qualified by it.
     * §84's rule is that a label must name the specific absence rather than
     * gesture at a category, so this names the three things that do not
     * exist. The simulated dialer UI itself is unchanged and stays inside the
     * labelled chassis. */
    desc: "Dialer and softphone screens appear in the simulated preview below. No dialer, softphone or audio pipeline ships in this build.",
    icon: PhoneCall,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    name: "Field Agents Mobile App",
    /* SYSTEM_AUDIT.md §48. Previously: "Live GPS geofencing, tamper-proof visit
       timestamps, photo proof, digital signatures & offline sync." No field app,
       no geofencing and no tamper-evident store exist in this codebase —
       FULL_SYSTEM_DOCUMENTATION.md lists "Live GPS field app: Not implemented"
       and `lib/site/security-claims.mjs` bans `immutable`/`tamper-proof`
       precisely because "tamper-proof" is a claim about a security property,
       not a UI adjective. */
    desc: "Field visit capture with photo proof, digital signatures & offline-first sync.",
    icon: MapPin,
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
  },
  {
    name: "Learning Management System (LMS)",
    desc: "Role-based micro-learning modules, compliance training & skill assessments.",
    icon: Layers,
    color: "text-teal-600 bg-teal-50 border-teal-200",
  },
  {
    name: "Workforce Management (WFM)",
    desc: "Shift rostering, biometric hours sync, break schedules & real-time adherence tracking.",
    icon: Clock,
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
  {
    name: "Real-Time Operational Dashboards",
    desc: "Live floor visibility and automated executive reports with ZERO MIS wait time.",
    icon: Activity,
    color: "text-blue-700 bg-blue-50 border-blue-200",
  },
];

/* ── Interactive 4-Stakeholder Tabs Configuration ── */
const tabs = [
  {
    id: "owner",
    label: "For Business Owners",
    shortLabel: "Owners",
    icon: OwnerIcon,
    badge: "Big Picture Data",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    useCase: "Business Owners, Managing Directors & C-Suite",
    pain: "Critical decisions delayed by waiting for MIS teams to compile end-of-day spreadsheets across disconnected tools.",
    solution: "See the big picture and make faster, data-driven decisions. OPERATIONS 360 unifies financial velocity, floor output, and compliance into a live executive cockpit.",
    metric: "Zero MIS Wait Time · +42% Output",
  },
  {
    id: "manager",
    label: "For Managers",
    shortLabel: "Managers",
    icon: ManagerIcon,
    badge: "Zero MIS Reports",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    useCase: "Operations Managers, Floor Directors & WFM Leads",
    pain: "Managing operations blind throughout the day, unable to spot queue drop-offs or schedule slippage until hours later.",
    solution: "Monitor performance and operations without waiting for MIS reports. Live WFM adherence, queue velocity, and agent states update instantaneously.",
    metric: "96.8% Schedule Adherence",
  },
  {
    id: "supervisor",
    label: "For Supervisors",
    shortLabel: "Supervisors",
    icon: SupervisorIcon,
    badge: "Manage & Coach",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    useCase: "Team Leads, QA Supervisors & Floor Coaches",
    pain: "QA evaluation audits live in separate folders from coaching notes, causing action plans to slip through the cracks.",
    solution: "Manage, coach, and develop your teams from one platform. Turn QA audit scores directly into 1-on-1 coaching logs, action plans, and LMS training modules.",
    metric: "100% QA Call Visibility",
  },
  {
    id: "agent",
    label: "For Agents",
    shortLabel: "Agents",
    icon: AgentIcon,
    badge: "All Tools in 1 Place",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    useCase: "Operations Agents, Collectors, Telephony Reps & Care Staff",
    pain: "Forced to alt-tab between 5–8 slow screens—CRM, phone dialer, LMS training, and payment links—wasting hours every shift.",
    solution: "Access the tools and information they need in one place. One unified interface with customer history, instant payment links, and personal scorecards. No dialer ships in this build.",
    metric: "3.2x More Connects · Zero Lag",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ── Interactive View 1: For Business Owners ── */
function OwnerView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {dashboardStats.map((st) => (
          <div
            key={st.label}
            className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs transition-all hover:border-slate-300"
          >
            <span className="text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider">{st.label}</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-[1.25rem] font-black text-slate-900 font-mono">{st.value}</span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">
                {st.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Velocity Spline Curve */}
      <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h5 className="text-[0.88rem] font-extrabold text-slate-900">
              Operations Productivity &amp; Cash Recovery Trajectory
            </h5>
            <p className="text-[0.72rem] text-slate-500">
              One view of all floor activity · Zero dependence on manual MIS compilation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[0.68rem] font-bold text-blue-700">
              Live Source of Truth
            </span>
          </div>
        </div>

        {/* CSS/SVG Area Chart */}
        <div className="relative mt-4 h-32 w-full">
          <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
            <defs>
              <linearGradient id="ops360ChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,100 C80,85 140,75 220,50 C300,25 380,40 500,10 L500,120 L0,120 Z"
              fill="url(#ops360ChartGradient)"
            />
            <path
              d="M0,100 C80,85 140,75 220,50 C300,25 380,40 500,10"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
            />
            <circle cx="220" cy="50" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <circle cx="500" cy="10" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          </svg>
          <div className="absolute top-2 right-4 rounded-lg bg-[#124294] px-2.5 py-1 text-[0.68rem] font-bold text-white shadow-md">
            Productivity: +42% vs Legacy Systems
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
          <div className="flex items-center gap-2 text-[0.72rem] text-slate-500 font-mono">
            <span>CRM + QA + WFM Consolidated</span>
            <span>•</span>
            <span>Zero Data Discrepancies</span>
          </div>
          <button
            type="button"
            onClick={() => onTriggerToast("Executive Operations Package exported! Full consolidated view generated in 0.4 seconds.")}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
          >
            <span>📥 Export Real-Time Executive Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive View 2: For Managers ── */
function ManagerView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Alert Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-3 sm:p-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold text-slate-900">
            Operations Manager Cockpit · 48 Staff Connected · Real-Time Floor Telemetry
          </span>
        </div>
        <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-emerald-800 shadow-2xs">
          0.0s MIS Wait Time
        </span>
      </div>

      {/* 4 Floor Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Schedule Adherence</p>
          <p className="font-mono text-xl font-black text-slate-900 mt-1">96.8%</p>
          <p className="text-[0.65rem] text-emerald-600 font-bold mt-0.5">46 / 48 On Schedule</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Dialer Pacing Ratio</p>
          <p className="font-mono text-xl font-black text-slate-900 mt-1">3.2:1</p>
          <p className="text-[0.65rem] text-blue-600 font-bold mt-0.5">142 connects / hour</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Call Drop Rate</p>
          <p className="font-mono text-xl font-black text-slate-900 mt-1">0.12%</p>
          <p className="text-[0.65rem] text-emerald-600 font-bold mt-0.5">Far below 3% SLA limit</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Productive Hours</p>
          <p className="font-mono text-xl font-black text-slate-900 mt-1">7.4 hrs</p>
          <p className="text-[0.65rem] text-slate-500 mt-0.5">Shrinkage cut by 22%</p>
        </div>
      </div>

      {/* Live Floor Shift Roster */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Live Agent Floor Adherence Roster</span>
          <span className="text-[0.7rem] font-mono text-slate-500 font-semibold">Shift: 08:00–17:00 PHT</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { desk: "Desk 04", name: "Maria Santos", state: "Live on Call (ACC-10482)", adherence: "In Adherence (04:18)", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { desk: "Desk 12", name: "John Ramos", state: "Ready in Queue", adherence: "In Adherence (01:12)", badge: "bg-blue-50 text-blue-700 border-blue-200" },
            { desk: "Desk 19", name: "Aileen Cruz", state: "1-on-1 Coaching Session", adherence: "Scheduled Activity", badge: "bg-violet-50 text-violet-700 border-violet-200" },
            { desk: "Desk 27", name: "Carlo Dizon", state: "Live on Call (ACC-11587)", adherence: "In Adherence (02:40)", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          ].map((item) => (
            <div key={item.desk} className="rounded-xl border border-slate-200 bg-white p-2.5 flex items-center justify-between shadow-2xs">
              <div>
                <p className="font-bold text-slate-900">
                  <span className="font-mono text-slate-500 text-[0.68rem] mr-1.5">{item.desk}</span>
                  {item.name}
                </p>
                <p className="text-[0.68rem] text-slate-500">{item.state}</p>
              </div>
              <span className={cn("rounded-full border px-2 py-0.5 text-[0.65rem] font-bold", item.badge)}>
                {item.adherence}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => onTriggerToast("WFM Schedule Adherence verified: 46 of 48 agents on scheduled activity.")}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100 cursor-pointer"
          >
            <span>✓ Audit Floor Adherence</span>
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast("Queue pacing recalibrated to 3.4:1 to absorb peak 2:00 PM caller volume.")}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-500 cursor-pointer"
          >
            <span>⚡ Recalibrate Queue Pacing</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive View 3: For Supervisors ── */
function SupervisorView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [monitoredAgent, setMonitoredAgent] = React.useState("Maria Santos (Desk 04)");

  const agents = [
    { desk: "Desk 04", name: "Maria Santos", account: "ACC-10482", dur: "04:18", score: "99.1%", sentiment: "Positive", atRisk: false },
    { desk: "Desk 12", name: "John Ramos", account: "ACC-10817", dur: "01:45", score: "96.4%", sentiment: "Calm", atRisk: false },
    { desk: "Desk 19", name: "Aileen Cruz", account: "ACC-11209", dur: "08:12", score: "89.0%", sentiment: "Escalated", atRisk: true },
    { desk: "Desk 27", name: "Carlo Dizon", account: "ACC-11587", dur: "02:30", score: "94.5%", sentiment: "Stable", atRisk: false },
  ];

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Alert Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-violet-200/80 bg-violet-50/60 p-3 sm:p-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-violet-600 animate-pulse" />
          <span className="font-extrabold text-slate-900">
            Supervisor HUD: Manage, Coach &amp; Develop from One Screen
          </span>
        </div>
        <span className="rounded-full border border-violet-200 bg-white px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-violet-800 shadow-2xs">
          100% QA Call Audits
        </span>
      </div>

      {/* 4 Active Agent Desk Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((ag) => (
          <div
            key={ag.desk}
            onClick={() => {
              setMonitoredAgent(`${ag.name} (${ag.desk})`);
              onTriggerToast(`Channel focused on ${ag.name}. QA Scorecard and live coaching frequency locked.`);
            }}
            className={cn(
              "cursor-pointer rounded-2xl border p-3.5 transition-all active:scale-[0.98]",
              monitoredAgent.includes(ag.desk)
                ? "border-violet-400 bg-violet-50/40 shadow-md ring-1 ring-violet-300"
                : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.68rem] font-bold font-mono text-slate-500">{ag.desk}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                  ag.atRisk
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                )}
              >
                QA: {ag.score}
              </span>
            </div>

            <h5 className="mt-2 text-[0.88rem] font-extrabold text-slate-900">{ag.name}</h5>
            <p className="text-[0.72rem] text-slate-500 font-mono">{ag.account}</p>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[0.7rem]">
              <span className="text-slate-500">Call Time</span>
              <span className="font-mono font-bold text-slate-800">{ag.dur}</span>
            </div>

            {/* Live Audio Wave Graphic */}
            <div className="mt-2 flex h-4 items-center justify-center gap-0.5">
              {[6, 12, 16, 8, 14, 10, 6].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={cn("w-1 rounded-full", ag.atRisk ? "bg-rose-400" : "bg-violet-500")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Control Drawer for Selected Agent */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div>
          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
            Active Coaching &amp; QA Target
          </span>
          <p className="text-[0.88rem] font-extrabold text-slate-900">{monitoredAgent}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onTriggerToast(`Silent Listen enabled on ${monitoredAgent}. Neither agent nor customer can hear supervisor.`)}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-[0.98] cursor-pointer"
          >
            <span>🎧 Silent Listen</span>
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast(`Coach Whisper sent: 'Suggest 2-month installment plan to settle today.'`)}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-800 transition-all hover:bg-violet-100 active:scale-[0.98] cursor-pointer"
          >
            <span>🗣️ Whisper Coach</span>
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast(`Coaching Log created: 14-day Action Plan with assigned LMS course 'Objection Handling'.`)}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-violet-700 active:scale-[0.98] cursor-pointer"
          >
            <span>📝 Log 1-on-1 Action Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive View 4: For Agents ── */
function AgentView({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [selectedAcc, setSelectedAcc] = React.useState<(typeof collectionAccounts)[number]>(collectionAccounts[0]);
  const [callActive, setCallActive] = React.useState(true);
  const [callSeconds, setCallSeconds] = React.useState(224); // 03:44
  const [ptpConfirmed, setPtpConfirmed] = React.useState(false);

  React.useEffect(() => {
    if (!callActive) return;
    const interval = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callActive]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Top Cockpit Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200/70 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex size-3 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative size-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[0.82rem] font-bold text-slate-900">
                Agent Workstation Desk 04 Active · WebRTC Softphone
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">
                Zero Tool Switching
              </span>
            </div>
            <p className="text-[0.72rem] text-slate-500">
              Auto-Dialer, Customer 360, QR Payments &amp; LMS in one view
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCallActive(!callActive);
              onTriggerToast(
                callActive
                  ? "Call ended. Interaction notes and recording automatically filed to customer record."
                  : "Connecting next customer in queue..."
              );
            }}
            className={cn(
              "flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all active:scale-[0.97] cursor-pointer",
              callActive
                ? "bg-rose-600 text-white hover:bg-rose-700 shadow-xs shadow-rose-600/20"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-xs shadow-blue-600/20"
            )}
          >
            {callActive ? "End Interaction" : "Connect Next"}
          </button>
        </div>
      </div>

      {/* Main Grid: Customer Dossier + Live Transcript */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Dossier (5 cols) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                  Customer 360 Dossier
                </span>
                <h4 className="text-[0.95rem] font-extrabold text-slate-900">{selectedAcc.id}</h4>
              </div>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[0.7rem] font-bold text-amber-700">
                Active Priority
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                <span className="text-[0.68rem] text-slate-400">Outstanding Balance</span>
                <p className="mt-0.5 text-[0.92rem] font-extrabold text-slate-900">{selectedAcc.balance}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                <span className="text-[0.68rem] text-slate-400">Service Campaign</span>
                <p className="mt-0.5 truncate text-[0.82rem] font-bold text-slate-700">{selectedAcc.campaign}</p>
              </div>
            </div>

            {/* Quick Queue Switcher */}
            <div className="mt-3">
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                Next in Agent Queue:
              </span>
              <div className="mt-1.5 flex gap-1.5 overflow-x-auto overscroll-x-contain pb-1">
                {collectionAccounts.slice(0, 4).map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setSelectedAcc(acc);
                      onTriggerToast(`Switched dossier view to ${acc.id} (${acc.campaign}).`);
                    }}
                    className={cn(
                      "shrink-0 min-h-[44px] inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-bold transition-all active:scale-[0.97] cursor-pointer",
                      selectedAcc.id === acc.id
                        ? "border border-blue-300 bg-blue-50 text-blue-700 shadow-2xs"
                        : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {acc.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Promise-to-Pay / Resolution Trigger */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setPtpConfirmed(true);
                onTriggerToast(`Resolution commitment confirmed for ${selectedAcc.id}: ₱15,000 scheduled. SMS payment link sent.`);
              }}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98] shadow-sm shadow-blue-600/20 cursor-pointer"
            >
              <span>{ptpConfirmed ? "✓ Resolution Scheduled (₱15,000)" : "Lock Resolution Agreement (₱15,000)"}</span>
            </button>
          </div>
        </div>

        {/* Right Live Interaction Console (7 cols) */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 shadow-xs lg:col-span-7 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[0.75rem] font-bold text-slate-800">
                  Live Interaction Stream · {callActive ? formatTimer(callSeconds) : "PAUSED"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[12, 24, 38, 18, 42, 28, 14, 32, 22, 16].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: callActive ? `${h}px` : "6px" }}
                    className={cn(
                      "w-1 rounded-full transition-all duration-300",
                      callActive ? "bg-blue-600 animate-pulse" : "bg-slate-300"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Real-Time Transcript Feed */}
            <div className="mt-3 space-y-2 rounded-xl border border-slate-200/80 bg-white p-3 font-mono text-[0.72rem]">
              <div className="flex gap-2">
                <span className="font-bold text-blue-600 shrink-0">[AGENT 04]:</span>
                <span className="text-slate-700">
                  Good afternoon Mr. Ramos. I am confirming your updated payment plan scheduled for this Friday.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-emerald-600 shrink-0">[CUSTOMER]:</span>
                <span className="text-slate-800">
                  Yes, please dispatch the QR Ph link to my mobile phone now. I will pay via GCash.
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1 text-[0.68rem] text-slate-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span>AI Sentiment: Cooperative · High Settlement Likelihood (94%)</span>
              </div>
            </div>
          </div>

          {/* Action Pad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => onTriggerToast("Dynamic QR Ph payment link sent by SMS to customer (+63 917 *** 4821).")}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-100 active:scale-[0.98] cursor-pointer"
            >
              <span>📲 Dispatch QR Ph Link</span>
            </button>
            <button
              type="button"
              onClick={() => onTriggerToast("InstaPay payment reference #REF-9812 verified. Balance updated in real-time.")}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-[0.98] cursor-pointer"
            >
              <span>💳 Verify InstaPay Ref</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Primary Component Export ── */
export function ProductShowcase() {
  const { openModal } = useConsultationModal();
  const [activeTab, setActiveTab] = React.useState<TabId>("owner");
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const activeMeta = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  return (
    <Section id="operations-360" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28">
      {/* Anchor aliases for backwards compatibility */}
      <div id="bitscrm" className="sr-only" />
      <div id="product" className="sr-only" />

      {/* Ambient Lighting Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(59,130,246,0.07),rgba(255,255,255,0))]" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Flagship Operational Platform · Operations 360
              </span>
            </div>

            <h2 className="text-display mt-2 max-w-4xl text-balance font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Introducing OPERATIONS 360.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                One System. One View. One Source of Truth.
              </span>
            </h2>

            <p className="text-lede mx-auto mt-4 max-w-[68ch] text-pretty text-slate-600 font-normal">
              An integrated operations platform that brings your critical operational tools and information into one system.
              Move beyond fragmented spreadsheets, disconnected dialers, and separate QA logs. Optimize operations productivity — from agents to managers.
            </p>
          </div>
        </Reveal>

        {/* ── The Core Operational Engines Grid ── */}
        <Reveal delay={0.1}>
          <div className="mt-10 sm:mt-12">
            <div className="mb-4 text-center">
              <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-400">
                The {CORE_ENGINES.length} Core Operational Engines In One System
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CORE_ENGINES.map((engine) => {
                const Icon = engine.icon;
                return (
                  <div
                    key={engine.name}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 shadow-2xs transition-all hover:border-blue-300 hover:bg-white hover:shadow-xs"
                  >
                    <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl border", engine.color)}>
                      <Icon className="size-4.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{engine.name}</h3>
                      <p className="mt-0.5 text-[0.72rem] text-slate-500 leading-relaxed">{engine.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Outer Doppelrand (Double-Bezel) Hardware Container for 4 Personas ── */}
        <div className="mt-12 sm:mt-16">
          {/* Stakeholder Navigation Tab Pill Strip */}
          <div
            role="tablist"
            aria-label="Stakeholder Operational Views"
            className="no-scrollbar flex w-full gap-2 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200/90 bg-slate-100/70 p-1.5 shadow-inner"
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const isSelected = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "group relative flex min-h-12 shrink-0 items-center gap-2.5 rounded-xl px-4 text-xs font-bold transition-all duration-200 active:scale-[0.98] sm:min-w-0 sm:flex-1 justify-center cursor-pointer",
                    isSelected
                      ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("transition-colors", isSelected ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="inline sm:hidden">{t.shortLabel}</span>
                  <span className={cn("hidden md:inline-flex rounded-full px-2 py-0.5 text-[0.62rem] font-bold border", t.badgeColor)}>
                    {t.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Solution & Stakeholder Strip */}
          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Target Role:</span>
                  <span className="text-[0.78rem] font-bold text-slate-800">{activeMeta.useCase}</span>
                </div>
                <p className="text-[0.82rem] text-slate-600 leading-snug">
                  <strong className="text-slate-900">Current Friction:</strong> {activeMeta.pain}
                </p>
                <p className="text-[0.82rem] text-blue-700 leading-snug">
                  <strong className="text-blue-900">The OPERATIONS 360 Advantage:</strong> {activeMeta.solution}
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end items-center">
                <div className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 shadow-2xs text-center md:text-right w-full md:w-auto">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Measured Impact</span>
                  <p className="text-[0.95rem] font-black text-blue-700 font-mono">{activeMeta.metric}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Hardware Display Chassis */}
          <div className="relative mt-6">
            <figure className="relative mx-auto w-full">
              {/* Outer Machine Bezel */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 ring-1 ring-slate-900/[0.08] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                {/* Inner Workstation Core */}
                <div className="relative overflow-hidden rounded-[calc(2rem-8px)] sm:rounded-[calc(2.5rem-12px)] border border-slate-200/80 bg-white shadow-2xl">
                  {/* macOS Traffic Lights Header & System Telemetry */}
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-[#FF5F56] ring-1 ring-[#E0443E]/50 shadow-2xs" aria-hidden />
                      <span className="size-3 rounded-full bg-[#FFBD2E] ring-1 ring-[#DEA123]/50 shadow-2xs" aria-hidden />
                      <span className="size-3 rounded-full bg-[#27C93F] ring-1 ring-[#1AAB29]/50 shadow-2xs" aria-hidden />
                      <span className="ml-3 hidden text-[0.75rem] font-bold text-slate-700 sm:inline">
                        OPERATIONS 360 · {activeMeta.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[0.72rem]">
                      <span className="hidden sm:inline font-mono text-slate-400">Sync: 14ms · Zero MIS Wait</span>
                      {/* §79 — this read a pulsing "LIVE ENGINE" badge over a
                          * simulated interface. §74 removed three of these from
                          * the homepage for exactly this reason: a static panel
                          * with a pulse on it is the same lie as one without,
                          * and "LIVE" is an affirmative claim about a system
                          * that is not running. No ping, no liveness claim. */}
                      <span className="flex items-center gap-1.5 font-bold text-slate-500">
                        <span className="size-1.5 rounded-full bg-slate-400" />
                        <span>SIMULATED PREVIEW</span>
                      </span>
                    </div>
                  </div>

                  {/* §79 — the simulation label was a <figcaption> at the BOTTOM
                      of the section, after a long scroll of simulated telemetry.
                      A reader arriving at the softphone row had already been told
                      six panels' worth of things that are not true. The label now
                      sits inside the panel, above the content it qualifies, and
                      names the specific absence rather than saying "simulation"
                      and leaving the reader to work out what is simulated. */}
                  <div className="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 sm:px-6">
                    <span className="mt-0.5 shrink-0 text-[0.65rem] font-bold uppercase tracking-wider text-amber-700">
                      Simulated
                    </span>
                    <p className="text-[0.72rem] leading-snug text-amber-900">
                      This preview is a client-side illustration with synthetic data.
                      <strong className="font-bold"> No telephony ships in this build</strong> — no
                      dialer, softphone, whisper, barge-in, call recording or audio pipeline — and
                      nothing here connects to a live system.
                    </p>
                  </div>

                  {/* Toast Feedback Ribbon */}
                  {toastMsg && (
                    <div className="bg-emerald-600 px-4 py-2 text-center text-xs font-bold text-white shadow-inner transition-all animate-in fade-in slide-in-from-top-2">
                      {toastMsg}
                    </div>
                  )}

                  {/* Tab Views with Spring Transition */}
                  <div className="min-h-[22rem] bg-white">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeTab}
                        role="tabpanel"
                        id={`panel-${activeTab}`}
                        aria-labelledby={`tab-${activeTab}`}
                        initial={{ opacity: 0, scale: 0.99, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: -6 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.25,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        {activeTab === "owner" && <OwnerView onTriggerToast={triggerToast} />}
                        {activeTab === "manager" && <ManagerView onTriggerToast={triggerToast} />}
                        {activeTab === "supervisor" && <SupervisorView onTriggerToast={triggerToast} />}
                        {activeTab === "agent" && <AgentView onTriggerToast={triggerToast} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <figcaption className="mt-4 text-center text-[0.75rem] font-medium text-slate-400">
                Interactive simulation of OPERATIONS 360, built for this page with synthetic data. No telephony, no live system, no customer data.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* High-Converting CRO Call-to-Action Strip (Apple Button-in-Button Architecture) */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openModal("OPERATIONS 360 Full Suite Consultation")}
              className="group relative flex h-13 min-h-[44px] w-full sm:w-auto items-center justify-center gap-3.5 rounded-full bg-blue-600 pl-6 pr-2.5 text-[0.92rem] font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.98]"
            >
              <span>Let&apos;s Talk About Your Operational Wish List</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </button>

            <Link
              href="/app"
              className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-[0.92rem] font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
            >
              Launch Live Operational Sandbox →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
