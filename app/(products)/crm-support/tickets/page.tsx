"use client";

import * as React from "react";
import Link from "next/link";
import { useSupport } from "@/lib/products/crm-support/store";
import {
  slaState,
  slaRemaining,
  formatMinutes,
  PRIORITY_TONE,
  STATUS_TONE,
  type TicketStatus,
} from "@/lib/products/crm-support/types";
import { Inbox, Search, Filter, RotateCcw } from "lucide-react";
import {
  PageHeader,
  Panel,
  DemoButton,
  DemoDataBanner,
  StatusPill,
  EmptyState,
  inputClass,
} from "@/components/products/demo-ui";

const STATUS_FILTERS: { id: TicketStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "open", label: "Open" },
  { id: "pending", label: "Pending" },
  { id: "resolved", label: "Resolved" },
];

export default function TicketsQueuePage() {
  const { tickets, resetDemoData } = useSupport();
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<TicketStatus | "all">("all");

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    return tickets.filter((t) => {
      const matchStatus = status === "all" || t.status === status;
      const matchQuery =
        !q ||
        t.subject.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [tickets, query, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ticket Queue"
        description="Every open and resolved request, sortable by SLA pressure, priority and channel."
        action={
          <DemoButton onClick={resetDemoData}>
            <RotateCcw className="size-3.5" aria-hidden />
            Reset demo data
          </DemoButton>
        }
      />

      <DemoDataBanner note="synthetic tickets and SLAs for evaluation. No real customers are contacted." />

      <Panel className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-300/50"
              aria-hidden
            />
            <input
              type="search"
              aria-label="Search tickets"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ID, subject, company, agent…"
              className={`${inputClass} pl-9`}
            />
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter tickets by status"
          >
            <Filter className="size-3.5 text-sky-300/60" aria-hidden />
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatus(f.id)}
                aria-pressed={status === f.id}
                className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  status === f.id
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-sky-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No tickets match these filters"
            body="Try clearing the search box or switching back to the All status filter."
            action={
              <DemoButton
                onClick={() => {
                  setQuery("");
                  setStatus("all");
                }}
              >
                Clear filters
              </DemoButton>
            }
          />
        ) : (
          <ul className="divide-y divide-sky-400/10">
            {filtered.map((t) => {
              const sla = slaState(t);
              return (
                <li key={t.id}>
                  <Link
                    href={`/crm-support/tickets/${t.id}`}
                    className="flex flex-col gap-3 px-5 py-4 transition hover:bg-white/5 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-sky-200/70">{t.id}</span>
                        <StatusPill tone={PRIORITY_TONE[t.priority]}>{t.priority}</StatusPill>
                        <StatusPill tone={STATUS_TONE[t.status]}>{t.status}</StatusPill>
                      </div>
                      <p className="mt-1.5 truncate text-sm font-medium text-white">{t.subject}</p>
                      <p className="mt-0.5 text-xs text-sky-200/70">
                        {t.customer} · {t.company} · via {t.channel}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                      <StatusPill
                        tone={
                          sla === "breached" ? "danger" : sla === "at-risk" ? "warning" : "success"
                        }
                      >
                        {formatMinutes(slaRemaining(t))}
                      </StatusPill>
                      <span className="text-xs text-sky-200/70">{t.assignee}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <p className="text-xs text-sky-200/60">
        Showing {filtered.length} of {tickets.length} tickets.
      </p>
    </div>
  );
}