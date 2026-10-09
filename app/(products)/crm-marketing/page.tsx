"use client";

import * as React from "react";
import Link from "next/link";
import { useMarketing, marketingTotals } from "@/lib/products/crm-marketing/store";
import {
  JOURNEY_STATUS_TONE,
  conversionRate,
  completionRate,
} from "@/lib/products/crm-marketing/types";
import {
  Workflow,
  Users,
  Target,
  Coins,
  Play,
  Pause,
  ArrowRight,
  RotateCcw,
  UserPlus,
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

export default function MarketingDashboard() {
  const { journeys, audiences, toggleJourney, enrollBatch, resetDemoData } = useMarketing();
  const t = React.useMemo(() => marketingTotals({ journeys, audiences }), [journeys, audiences]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Journey Command Center"
        description="Orchestrate SMS, Viber and email sequences, and watch attributed revenue move as contacts convert."
        action={
          <div className="flex gap-2">
            <DemoButton onClick={resetDemoData}>
              <RotateCcw className="size-3.5" aria-hidden />
              Reset demo data
            </DemoButton>
            <DemoButton variant="primary" onClick={() => enrollBatch("JR-201")}>
              <Play className="size-3.5" aria-hidden />
              Simulate enroll batch
            </DemoButton>
          </div>
        }
      />

      <DemoDataBanner note="synthetic audiences, journeys and revenue figures for evaluation." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Live Journeys" value={String(t.liveCount)} icon={Workflow} accent="sky" />
        <Stat label="Contacts Enrolled" value={t.enrolled.toLocaleString()} icon={Users} accent="violet" delta={{ value: "+150 today", positive: true }} />
        <Stat label="Conversions" value={t.converted.toLocaleString()} icon={Target} accent="emerald" delta={{ value: `${t.conversionPct.toFixed(1)}% of enrolled`, positive: true }} />
        <Stat label="Attributed Revenue" value={peso(t.revenue, true)} icon={Coins} accent="amber" />
      </div>

      <Panel>
        <PanelHeader
          title="Active Journeys"
          subtitle="Pause, resume, or open a journey to edit its sequence."
          icon={Workflow}
          action={
            <Link
              href="/crm-marketing/audiences"
              className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
            >
              Audiences
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
        />
        {journeys.length === 0 ? (
          <EmptyState icon={Workflow} title="No journeys yet" body="Reset the demo data to restore the sample journeys." />
        ) : (
          <ul className="divide-y divide-sky-400/10">
            {journeys.map((j) => (
              <li key={j.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/crm-marketing/journeys/${j.id}`}
                        className="font-mono text-xs text-sky-300 hover:text-white"
                      >
                        {j.id}
                      </Link>
                      <StatusPill tone={JOURNEY_STATUS_TONE[j.status]}>{j.status}</StatusPill>
                    </div>
                    <Link
                      href={`/crm-marketing/journeys/${j.id}`}
                      className="mt-1 block truncate text-sm font-semibold text-white hover:text-sky-200"
                    >
                      {j.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-sky-200/70">
                      {j.audience} · {j.audienceSize.toLocaleString()} contacts · {j.steps.length} steps
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white">{peso(j.revenue, true)}</span>
                    <DemoButton
                      onClick={() => toggleJourney(j.id)}
                      aria-label={j.status === "live" ? `Pause ${j.name}` : `Start ${j.name}`}
                    >
                      {j.status === "live" ? (
                        <Pause className="size-3.5" aria-hidden />
                      ) : (
                        <Play className="size-3.5" aria-hidden />
                      )}
                      {j.status === "live" ? "Pause" : "Start"}
                    </DemoButton>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Meter label="Completion" value={completionRate(j)} tone="sky" />
                  <Meter label="Conversion" value={conversionRate(j)} tone="emerald" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel>
        <PanelHeader
          title="Top Audiences"
          subtitle="Segments available to target."
          icon={UserPlus}
          action={
            <Link
              href="/crm-marketing/audiences"
              className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
            >
              View all
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.slice(0, 3).map((a) => (
            <div key={a.id} className="rounded-xl border border-sky-400/15 bg-white/5 p-4">
              <p className="truncate text-sm font-semibold text-white">{a.name}</p>
              <p className="mt-1 font-mono text-lg font-bold tabular-nums text-sky-200">
                {a.size.toLocaleString()}
              </p>
              <p
                className={`mt-1 text-xs font-semibold ${
                  a.growthThisWeek >= 0 ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {a.growthThisWeek >= 0 ? "+" : ""}
                {a.growthThisWeek} this week
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}