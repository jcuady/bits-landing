"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const tabs = [
  { id: "tickets", label: "Tickets", title: "BITS CRM", kicker: "Tickets · Harborline desk" },
  { id: "exceptions", label: "Exceptions", title: "Exceptions", kicker: "AI draft · Harborline desk" },
  { id: "qa", label: "QA", title: "QA", kicker: "Review queue · Harborline desk" },
  { id: "approvals", label: "Approvals", title: "Approvals", kicker: "Finance ops · Voltgrid desk" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ctaClass =
  "group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

function TicketsView() {
  const rows = [
    { a: "Elise Navarro", b: "Invoice exception", c: "Open" },
    { a: "Priya Sundaram", b: "KYC follow-up", c: "Waiting" },
    { a: "Leo Santos", b: "Ticket 4182", c: "QA" },
    { a: "Hannah Ortiz", b: "Order exception", c: "Open" },
  ] as const;
  return (
    <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">Harborline tickets in BITS CRM</caption>
        <thead>
          <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
            <th scope="col" className="py-2 pr-3 font-semibold">
              Account
            </th>
            <th scope="col" className="py-2 pr-3 font-semibold">
              Work
            </th>
            <th scope="col" className="py-2 font-semibold">
              State
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.a} className="border-b border-linelight/80 last:border-0">
              <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.a}</td>
              <td className="max-w-[10rem] truncate py-2.5 pr-3 text-slateblue sm:max-w-none">{row.b}</td>
              <td className="py-2.5 whitespace-nowrap text-slateblue">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExceptionsView() {
  return (
    <div className="space-y-4 px-4 py-4 sm:px-5">
      <div>
        <p className="text-[0.82rem] font-semibold text-ink">Elise Navarro · Harborline</p>
        <p className="mt-0.5 text-[0.72rem] text-slateblue">Invoice rate does not match the March contract</p>
      </div>
      <div className="rounded-xl border border-linelight bg-cloud/70 px-4 py-3">
        <p className="text-[0.68rem] font-semibold tracking-[0.08em] text-electric-600 uppercase">
          AI draft · waiting on a person
        </p>
        <p className="mt-2 text-[0.84rem] leading-relaxed text-ink/90">
          The March contract rate is on the account. A billing review is open. A specialist
          confirms the corrected invoice.
        </p>
        <p className="mt-3 text-[0.75rem] font-medium text-slateblue">
          Approve & send · Edit · Escalate
        </p>
      </div>
    </div>
  );
}

function QaView() {
  const rows = [
    { a: "Ticket 4182", b: "Leo Santos", c: "In review" },
    { a: "Chat 4821", b: "Elise Navarro", c: "Flagged" },
    { a: "Call 7836", b: "Team B", c: "Passed" },
  ] as const;
  return (
    <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">Harborline QA review queue</caption>
        <thead>
          <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
            <th scope="col" className="py-2 pr-3 font-semibold">
              Work
            </th>
            <th scope="col" className="py-2 pr-3 font-semibold">
              Account
            </th>
            <th scope="col" className="py-2 font-semibold">
              State
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.a} className="border-b border-linelight/80 last:border-0">
              <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.a}</td>
              <td className="py-2.5 pr-3 text-slateblue">{row.b}</td>
              <td className="py-2.5 whitespace-nowrap text-slateblue">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApprovalsView() {
  const rows = [
    { a: "Wire release", b: "Voltgrid", c: "Controller" },
    { a: "Limit change", b: "Northwind", c: "Pending" },
    { a: "Vendor setup", b: "Harborline", c: "Approved" },
  ] as const;
  return (
    <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">Voltgrid finance approval queue</caption>
        <thead>
          <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
            <th scope="col" className="py-2 pr-3 font-semibold">
              Request
            </th>
            <th scope="col" className="py-2 pr-3 font-semibold">
              Desk
            </th>
            <th scope="col" className="py-2 font-semibold">
              State
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.a} className="border-b border-linelight/80 last:border-0">
              <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.a}</td>
              <td className="py-2.5 pr-3 text-slateblue">{row.b}</td>
              <td className="py-2.5 whitespace-nowrap text-slateblue">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const views: Record<TabId, React.ComponentType> = {
  tickets: TicketsView,
  exceptions: ExceptionsView,
  qa: QaView,
  approvals: ApprovalsView,
};

export function ProductShowcase() {
  const [active, setActive] = React.useState<TabId>("tickets");
  const reduce = useReducedMotion();
  const tabRefs = React.useRef<Record<TabId, HTMLButtonElement | null>>({
    tickets: null,
    exceptions: null,
    qa: null,
    approvals: null,
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
    <Section id="product" className="overflow-x-hidden bg-cloud">
      <Container>
        <Reveal>
          <p className="text-overline text-electric-600">Tickets · Exceptions · QA · Approvals</p>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
            Contact-center CRM, QA, and finance approvals in one floor queue.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
            The same Harborline and Voltgrid desks as the hero. Switch views. Sample data,
            not a live tenant.
          </p>
          <a href="#contact" className={ctaClass}>
            Book a consultation
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <div
            role="tablist"
            aria-label="Platform views"
            className="flex w-full max-w-full gap-1 overflow-x-auto overscroll-x-contain rounded-2xl border border-linelight bg-white p-1.5"
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
                  "min-h-11 shrink-0 cursor-pointer rounded-xl px-3.5 text-[0.82rem] font-semibold whitespace-nowrap transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] sm:min-w-0 sm:flex-1",
                  active === t.id
                    ? "bg-navy-800 text-white"
                    : "text-slateblue [@media(hover:hover)_and_(pointer:fine)]:hover:bg-cloud [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative mt-5 min-h-[16.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                role="tabpanel"
                id={`panel-${active}`}
                aria-labelledby={`tab-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduce === true ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <figure>
                  <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
                    <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                      <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                        <div className="min-w-0">
                          <p className="text-[0.82rem] font-semibold text-ink">{meta.title}</p>
                          <p className="truncate text-[0.72rem] text-slateblue">{meta.kicker}</p>
                        </div>
                        <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
                          Live
                        </span>
                      </div>
                      <div className="min-h-[14.5rem]">
                        <ActiveView />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-4 text-[0.78rem] text-slateblue">
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
