"use client";

import * as React from "react";
import Link from "next/link";
import { useSupport, supportMetrics } from "@/lib/products/crm-support/store";
import {
  slaState,
  slaRemaining,
  formatMinutes,
  PRIORITY_TONE,
  STATUS_TONE,
  type Ticket,
} from "@/lib/products/crm-support/types";
import {
  Headset,
  Timer,
  Star,
  Users,
  Plus,
  Inbox,
  Gauge,
  ArrowRight,
} from "lucide-react";
import {
  PageHeader,
  Panel,
  PanelHeader,
  Stat,
  StatusPill,
  DemoButton,
  DemoDataBanner,
  EmptyState,
  Meter,
  peso,
} from "@/components/products/demo-ui";

const AGENTS = ["Rafael Dizon", "Celine Yu", "Miguel Torres", "Unassigned"];

export default function SupportDashboard() {
  const { tickets, repliesFor, advanceSla } = useSupport();
  const m = React.useMemo(() => supportMetrics({ tickets, replies: [] }), [tickets]);

  const breached = tickets.filter((t) => slaState(t) === "breached");
  const atRisk = tickets.filter((t) => slaState(t) === "at-risk");
  const queue = tickets.filter((t) => t.status !== "resolved");

  const workload = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const t of tickets) {
      if (t.status === "resolved") continue;
      map.set(t.assignee, (map.get(t.assignee) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [tickets]);

  const maxLoad = Math.max(1, ...workload.map(([, n]) => n));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Desk Overview"
        description="Live SLA posture across every channel — email, SMS, Viber, web and phone — with breach prediction before it happens."
        action={
          <DemoButton variant="primary" onClick={() => advanceSla(15)}>
            <Timer className="size-3.5" aria-hidden />
            Advance SLA clock +15m
          </DemoButton>
        }
      />

      <DemoDataBanner note="synthetic tickets and SLAs for evaluation. No real customers are contacted." />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Open Tickets"
          value={String(m.openCount)}
          icon={Inbox}
          accent="sky"
          delta={{ value: "+3 today", positive: true }}
        />
        <Stat
          label="SLA Breached"
          value={String(m.breachedCount)}
          icon={Timer}
          accent={m.breachedCount > 0 ? "amber" : "emerald"}
          delta={{ value: m.breachedCount > 0 ? "Action required" : "All clear", positive: m.breachedCount === 0 }}
        />
        <Stat
          label="SLA Compliance"
          value={`${m.compliancePct.toFixed(0)}%`}
          icon={Gauge}
          accent="emerald"
          delta={{ value: "+2.4 pts", positive: true }}
        />
        <Stat
          label="CSAT (30d)"
          value={m.csat ? m.csat.toFixed(1) : "—"}
          icon={Star}
          accent="violet"
          delta={{ value: "of 5.0", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* SLA breach watchlist */}
        <Panel className="lg:col-span-2">
          <PanelHeader
            title="SLA Watchlist"
            subtitle="Breached first, then closest to breach."
            icon={Timer}
            action={
              <Link
                href="/crm-support/tickets"
                className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
              >
                Full queue
                <ArrowRight className="size-3" aria-hidden />
              </Link>
            }
          />
          {breached.length + atRisk.length === 0 ? (
            <EmptyState
              icon={Gauge}
              title="Every ticket is within SLA"
              body="No ticket is at risk of breaching its response target right now."
            />
          ) : (
            <ul className="divide-y divide-sky-400/10">
              {[...breached, ...atRisk]
                .sort((a, b) => slaRemaining(a) - slaRemaining(b))
                .slice(0, 5)
                .map((t) => (
                  <li key={t.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                    <span className="font-mono text-xs text-sky-200/70">{t.id}</span>
                    <Link
                      href={`/crm-support/tickets/${t.id}`}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-white hover:text-sky-200"
                    >
                      {t.subject}
                    </Link>
                    <StatusPill tone={PRIORITY_TONE[t.priority]}>{t.priority}</StatusPill>
                    <StatusPill tone={slaState(t) === "breached" ? "danger" : "warning"}>
                      {formatMinutes(slaRemaining(t))}
                    </StatusPill>
                  </li>
                ))}
            </ul>
          )}
        </Panel>

        {/* Agent workload */}
        <Panel>
          <PanelHeader
            title="Agent Workload"
            subtitle="Open tickets per agent."
            icon={Users}
          />
          <ul className="space-y-3.5 p-5">
            {workload.map(([agent, count]) => (
              <li key={agent}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-sky-100">{agent}</span>
                  <span className="font-mono tabular-nums text-sky-200/80">{count}</span>
                </div>
                <Meter
                  value={count}
                  max={maxLoad}
                  tone={count > maxLoad * 0.75 ? "amber" : "sky"}
                />
              </li>
            ))}
            {workload.length === 0 && (
              <li className="text-xs text-sky-200/70">No open tickets assigned.</li>
            )}
          </ul>
        </Panel>
      </div>

      {/* Channel mix + recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Channel Mix" subtitle="Where inbound volume arrives." icon={Headset} />
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
            {(["email", "sms", "viber", "web", "phone"] as const).map((ch) => {
              const n = tickets.filter((t) => t.channel === ch).length;
              return (
                <div key={ch} className="rounded-xl border border-sky-400/15 bg-white/5 p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-sky-200/70">{ch}</p>
                  <p className="mt-1 font-mono text-lg font-bold tabular-nums text-white">{n}</p>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Recent Activity"
            subtitle="Latest thread replies across the desk."
            icon={Inbox}
          />
          <ul className="divide-y divide-sky-400/10">
            {[...repliesFor("TKT-1041"), ...repliesFor("TKT-1045")]
              .slice(-5)
              .reverse()
              .map((r) => (
                <li key={r.id} className="px-5 py-3">
                  <p className="text-xs text-sky-100">
                    <span className="font-semibold text-white">{r.author}</span>{" "}
                    <span className="text-sky-200/70">on {r.ticketId}</span>
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-sky-200/70">{r.body}</p>
                </li>
              ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}