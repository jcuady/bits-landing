"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { roleViews } from "@/lib/marketing-specimens";

const tabs = [
  { id: "agent", label: "Agent", title: "Agent queue", kicker: "Accounts · PTP · follow-up" },
  { id: "supervisor", label: "Supervisor", title: "Live supervision", kicker: "Listen · whisper · barge" },
  { id: "qa", label: "QA Reviewer", title: "Quality assurance", kicker: "Scorecards · worklists · audit" },
  { id: "administrator", label: "Administrator", title: "Administration", kicker: "Campaigns · imports · permissions" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

function SimpleTable({
  caption,
  rows,
}: {
  caption: string;
  rows: readonly { a: string; b: string; c: string }[];
}) {
  return (
    <div className="overflow-x-auto overscroll-x-contain p-2">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
            <th scope="col" className="px-4 py-3">Item</th>
            <th scope="col" className="px-4 py-3">Context</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.a} className="transition-colors hover:bg-slate-50/50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{row.a}</td>
              <td className="px-4 py-3 text-slate-600">{row.b}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TicketsView() {
  const rows = roleViews.agent;
  const [selected, setSelected] = React.useState<string>(rows[0]?.a ?? "");
  const [toast, setToast] = React.useState<string | null>(null);

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Sleek Operational Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-200/80 bg-blue-50/60 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-semibold text-slate-800">
            Agent Queue: One-click WebRTC dialer &amp; PTP account dossier
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200 shadow-2xs">
          Save 3.5 hrs/day
        </span>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-xs font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
            <caption className="sr-only">Synthetic agent account queue</caption>
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-bold tracking-widest text-slate-500 uppercase">
                <th scope="col" className="px-4 py-3">Account (Click to dial)</th>
                <th scope="col" className="px-4 py-3">Work Summary</th>
                <th scope="col" className="px-4 py-3">State</th>
                <th scope="col" className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr
                  key={row.a}
                  onClick={() => {
                    setSelected(row.a);
                    trigger(`📞 Connecting WebRTC dialer to ${row.a}. Screen popped with debtor dossier.`);
                  }}
                  className={cn(
                    "transition-colors cursor-pointer",
                    selected === row.a ? "bg-blue-50/60 font-medium" : "hover:bg-slate-50/50"
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">
                    {row.a}
                    {selected === row.a && <span className="ml-1 text-blue-600 font-bold">●</span>}
                  </td>
                  <td className="max-w-[12rem] truncate px-4 py-3 text-slate-600 sm:max-w-none">{row.b}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[0.68rem] font-bold">
                      {row.c}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="text-[0.68rem] font-bold text-blue-600 hover:underline">
                      Dial 📞
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExceptionsView() {
  const rows = roleViews.supervisor;
  const [toast, setToast] = React.useState<string | null>(null);

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Sleek Operational Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200/80 bg-amber-50/60 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-semibold text-slate-800">
            Live Supervision: Real-time listen, whisper coaching &amp; barge
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-bold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs">
          -60% Escalation Time
        </span>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-xs font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
            <caption className="sr-only">Synthetic live call monitoring view</caption>
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-bold tracking-widest text-slate-500 uppercase">
                <th scope="col" className="px-4 py-3">Active Call</th>
                <th scope="col" className="px-4 py-3">Escalation Context</th>
                <th scope="col" className="px-4 py-3">Supervision Mode</th>
                <th scope="col" className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr
                  key={row.a}
                  onClick={() => trigger(`🎙️ Supervisor channel activated on ${row.a}: Whisper mode connected.`)}
                  className="transition-colors hover:bg-slate-50/50 cursor-pointer"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{row.a}</td>
                  <td className="px-4 py-3 text-slate-600">{row.b}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="rounded bg-amber-50 text-amber-700 px-2 py-0.5 text-[0.68rem] font-bold">
                      {row.c}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="text-[0.68rem] font-bold text-amber-600 hover:underline">
                      Barge In ⚡
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QaView() {
  const rows = roleViews.qa;
  const [toast, setToast] = React.useState<string | null>(null);

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Sleek Operational Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-violet-200/80 bg-violet-50/60 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-violet-600 animate-pulse" />
          <span className="font-semibold text-slate-800">
            Automated QA: 100% Speech scoring &amp; regulatory audit
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-bold text-violet-700 bg-white px-2 py-0.5 rounded-full border border-violet-200 shadow-2xs">
          -80% Audit Hours
        </span>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-xs font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
            <caption className="sr-only">Synthetic QA review queue</caption>
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-bold tracking-widest text-slate-500 uppercase">
                <th scope="col" className="px-4 py-3">Audit Item</th>
                <th scope="col" className="px-4 py-3">Account Reference</th>
                <th scope="col" className="px-4 py-3">Compliance Score</th>
                <th scope="col" className="px-4 py-3 text-right">Scorecard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr
                  key={row.a}
                  onClick={() => trigger(`✓ Automated QA Scorecard generated for ${row.a}: Score 96/100 (Pass). NPC Verified.`)}
                  className="transition-colors hover:bg-slate-50/50 cursor-pointer"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{row.a}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono">{row.b}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[0.68rem] font-bold">
                      {row.c}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="text-[0.68rem] font-bold text-violet-600 hover:underline">
                      View Scorecard →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ApprovalsView() {
  const rows = roleViews.administrator;
  const [toast, setToast] = React.useState<string | null>(null);

  const trigger = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Sleek Operational Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-600 animate-pulse" />
          <span className="font-semibold text-slate-800">
            Administration: Portfolio ingestion &amp; RBAC permission logs
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
          Zero-Code Control
        </span>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-xs font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
            <caption className="sr-only">Synthetic administrator configuration view</caption>
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-bold tracking-widest text-slate-500 uppercase">
                <th scope="col" className="px-4 py-3">Configuration Request</th>
                <th scope="col" className="px-4 py-3">Floor Desk</th>
                <th scope="col" className="px-4 py-3">Permission State</th>
                <th scope="col" className="px-4 py-3 text-right">Authorize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr
                  key={row.a}
                  onClick={() => trigger(`✓ Authorization granted for ${row.a}. Security audit log entry created.`)}
                  className="transition-colors hover:bg-slate-50/50 cursor-pointer"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{row.a}</td>
                  <td className="px-4 py-3 text-slate-600">{row.b}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[0.68rem] font-bold">
                      {row.c}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="text-[0.68rem] font-bold text-blue-600 hover:underline">
                      Authorize ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const views: Record<TabId, React.ComponentType> = {
  agent: TicketsView,
  supervisor: ExceptionsView,
  qa: QaView,
  administrator: ApprovalsView,
};

export function ProductShowcase() {
  const [active, setActive] = React.useState<TabId>("agent");
  const reduce = useReducedMotion();
  const tabRefs = React.useRef<Record<TabId, HTMLButtonElement | null>>({
    agent: null,
    supervisor: null,
    qa: null,
    administrator: null,
  });
  const ActiveView = views[active];
  const meta = tabs.find((t) => t.id === active) ?? tabs[0];

  const move = (dir: 1 | -1) => {
    const idx = tabs.findIndex((t) => t.id === active);
    const next = tabs[(idx + dir + tabs.length) % tabs.length];
    setActive(next.id);
    queueMicrotask(() => tabRefs.current[next.id]?.focus());
  };

  return (
    <Section id="bitscrm" className="relative scroll-mt-24 overflow-hidden bg-white">
      {/* Anchor alias for backwards compatibility */}
      <div id="product" className="sr-only" />
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/70 px-4 py-1.5 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
              BITScrm Collections Platform
            </span>
          </div>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
            BITScrm: Built for Every Seat on Your Recovery Floor
          </h2>
          <p className="text-lede mt-5 max-w-[55ch] text-pretty text-slate-600">
            Consolidate portfolio queues, predictive voice dialing, automated PTP scheduling,
            and compliance tracking into one unified, role-based CRM workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/bitscrm"
              className="group flex h-12 items-center gap-2.5 rounded-full bg-blue-600 px-7 text-[0.92rem] font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]"
            >
              Learn More About BITScrm
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-6 text-[0.92rem] font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              Request a Live Demo
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <div
            role="tablist"
            aria-label="Platform views"
            className="flex w-full max-w-full gap-2 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el;
                }}
                type="button"
                role="tab"
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    move(1);
                  }
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    move(-1);
                  }
                }}
                className={cn(
                  "min-h-12 shrink-0 cursor-pointer rounded-xl px-4 text-[0.85rem] font-bold whitespace-nowrap transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] sm:min-w-0 sm:flex-1",
                  active === t.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative mt-8 min-h-[16.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                role="tabpanel"
                id={`panel-${active}`}
                aria-labelledby={`tab-${active}`}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: reduce === true ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <figure>
                  <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-blue-900/5">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5 opacity-40">
                          <div className="size-2.5 rounded-full bg-slate-400" />
                          <div className="size-2.5 rounded-full bg-slate-400" />
                          <div className="size-2.5 rounded-full bg-slate-400" />
                        </div>
                        <div className="h-4 w-px bg-slate-200" />
                        <div>
                          <p className="text-[0.75rem] font-semibold text-slate-700">{meta.title}</p>
                          <p className="truncate text-[0.68rem] font-medium text-slate-500">{meta.kicker}</p>
                        </div>
                      </div>
                      <span className="relative flex items-center gap-2">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                        </span>
                        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-500">Live</span>
                      </span>
                    </div>
                    <div className="min-h-[14.5rem] bg-white">
                      <ActiveView />
                    </div>
                  </div>
                  <figcaption className="mt-4 text-center text-[0.78rem] font-medium text-slate-500">
                    Interface concepts shown with sample data.
                  </figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
