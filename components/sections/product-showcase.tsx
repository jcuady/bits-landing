"use client";

import * as React from "react";
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
  return (
    <div className="overflow-x-auto overscroll-x-contain p-2">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">Synthetic agent account queue</caption>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
            <th scope="col" className="px-4 py-3">Account</th>
            <th scope="col" className="px-4 py-3">Work</th>
            <th scope="col" className="px-4 py-3">State</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.a} className="transition-colors hover:bg-slate-50/50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{row.a}</td>
              <td className="max-w-[10rem] truncate px-4 py-3 text-slate-600 sm:max-w-none">{row.b}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExceptionsView() {
  const rows = roleViews.supervisor;
  return (
    <SimpleTable caption="Synthetic live call monitoring view" rows={rows} />
  );
}

function QaView() {
  const rows = roleViews.qa;
  return (
    <div className="overflow-x-auto overscroll-x-contain p-2">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">Synthetic QA review queue</caption>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
            <th scope="col" className="px-4 py-3">Work</th>
            <th scope="col" className="px-4 py-3">Account</th>
            <th scope="col" className="px-4 py-3">State</th>
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

function ApprovalsView() {
  const rows = roleViews.administrator;
  return (
    <div className="overflow-x-auto overscroll-x-contain p-2">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">Synthetic administrator configuration view</caption>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
            <th scope="col" className="px-4 py-3">Request</th>
            <th scope="col" className="px-4 py-3">Desk</th>
            <th scope="col" className="px-4 py-3">State</th>
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
    <Section id="product" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Agent · Supervisor · QA · Administrator
            </span>
          </div>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
            One platform. Different views for every role.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
            Give every role the context and controls required for collections
            work without exposing unrelated administration or campaign data.
          </p>
          <a href="#contact" className={ctaClass}>
            <span className="relative">
              Request a Demo
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
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
