"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Bot,
  Check,
  ClipboardCheck,
  Headset,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const tabs = [
  { id: "crm", label: "CRM Dashboard", icon: LayoutDashboard },
  { id: "agent", label: "AI Agent", icon: Bot },
  { id: "qa", label: "QA Review", icon: ClipboardCheck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ---------- shared chrome ---------- */

function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-linelight bg-white shadow-lift">
      <div className="flex items-center gap-2 border-b border-linelight bg-cloud px-4 py-3">
        <span className="size-2.5 rounded-full bg-navy-700/15" aria-hidden />
        <span className="size-2.5 rounded-full bg-navy-700/15" aria-hidden />
        <span className="size-2.5 rounded-full bg-electric-500/60" aria-hidden />
        <span className="mx-auto rounded-md border border-linelight bg-white px-3 py-1 text-[0.68rem] font-medium tracking-wide text-slateblue">
          app.bitsplatform.com
        </span>
      </div>
      <div className="min-h-[24rem] sm:min-h-[26rem]">{children}</div>
    </div>
  );
}

function Sidebar({ active }: { active: string }) {
  const items = ["Dashboard", "Customers", "Interactions", "Tickets", "QA", "Reports"];
  return (
    <div className="hidden w-44 shrink-0 flex-col gap-1 border-r border-linelight bg-cloud/60 p-3 md:flex">
      <div className="mb-3 flex items-center gap-2 px-1.5">
        <span className="size-6 rounded-md bg-gradient-to-br from-navy-700 to-electric-600" aria-hidden />
        <span className="text-[0.78rem] font-bold tracking-tight text-ink">BITS</span>
      </div>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-lg px-2.5 py-1.5 text-[0.78rem] font-medium",
            item === active ? "bg-white text-electric-600 shadow-sm" : "text-slateblue"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function Stat({ k, v, delta }: { k: string; v: string; delta?: string }) {
  return (
    <div className="rounded-xl border border-linelight bg-white px-3.5 py-3">
      <p className="text-[1.15rem] font-bold tracking-tight text-ink">{v}</p>
      <p className="mt-0.5 text-[0.62rem] font-semibold tracking-wide text-slateblue uppercase">
        {k}
      </p>
      {delta && <p className="mt-1 text-[0.66rem] font-semibold text-electric-600">{delta}</p>}
    </div>
  );
}

function Pill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "cyan" | "neutral" }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold",
        tone === "blue" && "border-electric-600/25 bg-electric-600/[0.07] text-electric-600",
        tone === "cyan" && "border-signal-500/30 bg-signal-500/10 text-navy-700",
        tone === "neutral" && "border-navy-700/15 bg-navy-700/[0.04] text-slateblue"
      )}
    >
      {children}
    </span>
  );
}

/* ---------- views ---------- */

function CrmView() {
  const bars = [38, 55, 47, 70, 62, 84, 76, 66, 90, 58, 72, 81];
  const queue = [
    { t: "Billing dispute review", who: "Northgate Logistics", s: "In review", tone: "blue" as const },
    { t: "Onboarding call summary", who: "Helix Media Group", s: "Open", tone: "cyan" as const },
    { t: "SLA exception request", who: "Altair Freight Co.", s: "Escalated", tone: "neutral" as const },
    { t: "Plan renewal discussion", who: "Beacon Retail", s: "Open", tone: "cyan" as const },
  ];
  return (
    <div className="flex">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Stat k="Interactions" v="1,284" delta="+8% this week" />
          <Stat k="Open tickets" v="47" />
          <Stat k="Avg. response" v="1:42" delta="-12s vs. last week" />
          <Stat k="Resolution" v="91%" />
        </div>
        <div className="rounded-xl border border-linelight bg-white p-4">
          <div className="flex items-end justify-between gap-1.5" style={{ height: 110 }}>
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-t-[4px] bg-gradient-to-t from-electric-600/85 to-signal-500/85"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <p className="text-[0.64rem] font-semibold tracking-wide text-slateblue uppercase">
              Interaction volume · 12 weeks
            </p>
            <p className="text-[0.64rem] text-slateblue/70">Sample data</p>
          </div>
        </div>
        <ul className="divide-y divide-linelight rounded-xl border border-linelight bg-white">
          {queue.map((row) => (
            <li key={row.t} className="flex items-center gap-3 px-4 py-2.5">
              <span className="size-1.5 shrink-0 rounded-full bg-electric-500" aria-hidden />
              <span className="min-w-0 truncate text-[0.8rem] font-medium text-ink">{row.t}</span>
              <span className="hidden min-w-0 truncate text-[0.72rem] text-slateblue sm:inline">
                {row.who}
              </span>
              <span className="ml-auto">
                <Pill tone={row.tone}>{row.s}</Pill>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AgentView() {
  return (
    <div className="flex">
      <Sidebar active="Interactions" />
      <div className="grid min-w-0 flex-1 lg:grid-cols-[1fr_15rem]">
        <div className="space-y-3.5 p-4 sm:p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-navy-700/[0.07] text-navy-700">
              <Headset className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[0.8rem] font-semibold text-ink">Customer chat · #4821</p>
              <p className="text-[0.66rem] text-slateblue">Northgate Logistics</p>
            </div>
            <Pill tone="cyan">AI assisted</Pill>
          </div>

          <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-linelight bg-cloud px-4 py-3">
            <p className="text-[0.8rem] leading-relaxed text-ink/85">
              Hi, our invoice shows a different rate than the contract we signed in March.
              Can someone check?
            </p>
          </div>

          <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-md border border-electric-600/25 bg-electric-600/[0.05] p-4">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-electric-600" aria-hidden />
              <p className="text-[0.68rem] font-bold tracking-[0.12em] text-electric-600 uppercase">
                AI draft · awaiting approval
              </p>
            </div>
            <p className="mt-2.5 text-[0.8rem] leading-relaxed text-ink/85">
              Thanks for flagging this. I can see the March contract rate on your account.
              I have opened a billing review and a specialist will confirm the corrected
              invoice within one business day.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="flex h-8 items-center gap-1.5 rounded-lg bg-electric-600 px-3 text-[0.72rem] font-semibold text-white">
                <Check className="size-3.5" aria-hidden /> Approve & send
              </span>
              <span className="flex h-8 items-center rounded-lg border border-navy-700/15 bg-white px-3 text-[0.72rem] font-semibold text-navy-700">
                Edit
              </span>
              <span className="flex h-8 items-center rounded-lg border border-navy-700/15 bg-white px-3 text-[0.72rem] font-semibold text-navy-700">
                Escalate to specialist
              </span>
            </div>
          </div>
        </div>

        <aside className="hidden space-y-3 border-l border-linelight bg-cloud/50 p-4 lg:block">
          <p className="text-[0.64rem] font-bold tracking-[0.14em] text-slateblue uppercase">
            Agent context
          </p>
          {[
            { k: "Sentiment", v: "Calm · cooperative" },
            { k: "Contract", v: "Signed Mar 12" },
            { k: "Source", v: "Billing policy v3" },
            { k: "Confidence", v: "High" },
          ].map((r) => (
            <div key={r.k} className="rounded-lg border border-linelight bg-white px-3 py-2.5">
              <p className="text-[0.6rem] font-semibold tracking-wide text-slateblue uppercase">{r.k}</p>
              <p className="mt-0.5 text-[0.78rem] font-medium text-ink">{r.v}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function QaView() {
  const criteria = [
    { name: "Greeting & verification", score: 96 },
    { name: "Accuracy of information", score: 88 },
    { name: "Tone & empathy", score: 92 },
    { name: "Process compliance", score: 84 },
    { name: "Resolution quality", score: 90 },
  ];
  const reviews = [
    { id: "Call #7841", agent: "Team A", score: 94, tone: "blue" as const },
    { id: "Chat #4821", agent: "AI assisted", score: 91, tone: "cyan" as const },
    { id: "Call #7836", agent: "Team B", score: 82, tone: "neutral" as const },
  ];
  return (
    <div className="flex">
      <Sidebar active="QA" />
      <div className="grid min-w-0 flex-1 gap-4 p-4 sm:p-5 lg:grid-cols-2">
        <div className="rounded-xl border border-linelight bg-white p-4 sm:p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[0.8rem] font-semibold text-ink">Scorecard · Customer care</p>
            <p className="text-[1.4rem] font-bold tracking-tight text-ink">
              90<span className="text-[0.8rem] font-semibold text-slateblue">/100</span>
            </p>
          </div>
          <ul className="mt-4 space-y-3.5">
            {criteria.map((c) => (
              <li key={c.name}>
                <div className="flex items-center justify-between text-[0.74rem]">
                  <span className="font-medium text-ink/80">{c.name}</span>
                  <span className="font-semibold text-navy-700">{c.score}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-700/[0.08]">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-electric-600 to-signal-500"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <ul className="divide-y divide-linelight rounded-xl border border-linelight bg-white">
            {reviews.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                <ClipboardCheck className="size-4 shrink-0 text-electric-600" aria-hidden />
                <div className="min-w-0">
                  <p className="truncate text-[0.8rem] font-medium text-ink">{r.id}</p>
                  <p className="text-[0.68rem] text-slateblue">{r.agent}</p>
                </div>
                <span className="ml-auto">
                  <Pill tone={r.tone}>Score {r.score}</Pill>
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-signal-500/25 bg-skywash p-4">
            <p className="text-[0.74rem] font-semibold text-navy-800">QA Agent summary</p>
            <p className="mt-1.5 text-[0.76rem] leading-relaxed text-slateblue">
              Two interactions flagged for human review this week. Process compliance dips
              correlate with new macro rollout on Tuesday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  const weeks = [30, 44, 38, 56, 49, 63, 58, 72, 66, 78, 84, 91];
  const channels = [
    { name: "Voice", pct: 46 },
    { name: "Chat", pct: 32 },
    { name: "Email", pct: 16 },
    { name: "Social", pct: 6 },
  ];
  return (
    <div className="flex">
      <Sidebar active="Reports" />
      <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Stat k="CSAT" v="4.6" delta="+0.2 this quarter" />
          <Stat k="First-contact resolution" v="78%" />
          <Stat k="Automation coverage" v="41%" delta="+6% this month" />
          <Stat k="Escalation rate" v="9%" />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-linelight bg-white p-4">
            <div className="flex items-end justify-between gap-1.5" style={{ height: 120 }}>
              {weeks.map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-t-[4px] bg-gradient-to-t from-navy-700/85 to-electric-500/85"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-2.5 text-[0.64rem] font-semibold tracking-wide text-slateblue uppercase">
              Resolved interactions · 12 weeks
            </p>
          </div>
          <div className="rounded-xl border border-linelight bg-white p-4">
            <p className="text-[0.8rem] font-semibold text-ink">Channel split</p>
            <ul className="mt-3.5 space-y-3">
              {channels.map((c) => (
                <li key={c.name}>
                  <div className="flex items-center justify-between text-[0.74rem]">
                    <span className="font-medium text-ink/80">{c.name}</span>
                    <span className="font-semibold text-navy-700">{c.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-700/[0.08]">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-electric-600 to-signal-500"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const views: Record<TabId, React.ComponentType> = {
  crm: CrmView,
  agent: AgentView,
  qa: QaView,
  analytics: AnalyticsView,
};

/* ---------- section ---------- */

export function ProductShowcase() {
  const [active, setActive] = React.useState<TabId>("crm");
  const reduce = useReducedMotion();
  const ActiveView = views[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = tabs.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") setActive(tabs[(idx + 1) % tabs.length].id);
    if (e.key === "ArrowLeft") setActive(tabs[(idx - 1 + tabs.length) % tabs.length].id);
  };

  return (
    <Section id="product" className="bg-cloud">
      <Container>
        <SectionHeading
          align="center"
          title="One ecosystem. Every workflow in view."
          lede="CRM, AI agents, QA and analytics share one design language and one source of truth. A look at the BITS platform experience."
        />

        <div className="mt-12">
          <div
            role="tablist"
            aria-label="Platform views"
            onKeyDown={onKeyDown}
            className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-linelight bg-white p-1.5 shadow-sm"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setActive(t.id)}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-xl px-3.5 text-[0.82rem] font-semibold transition-colors duration-200 sm:px-4",
                  active === t.id
                    ? "bg-navy-800 text-white shadow-sm"
                    : "text-slateblue hover:bg-cloud hover:text-ink"
                )}
              >
                <t.icon className="size-4" aria-hidden />
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative mt-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                role="tabpanel"
                id={`panel-${active}`}
                aria-labelledby={`tab-${active}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <Window>
                  <ActiveView />
                </Window>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-5 text-center text-[0.78rem] text-slateblue/80">
            Interface concepts shown with sample data.
          </p>
        </div>
      </Container>
    </Section>
  );
}
