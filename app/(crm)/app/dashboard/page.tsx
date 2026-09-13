"use client";

import Link from "next/link";
import { PageHeader } from "@/components/crm/page-header";
import { KpiStat } from "@/components/crm/kpi-stat";
import { ActivityTimeline } from "@/components/crm/activity-timeline";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import {
  dashboardKpis,
  formatMoney,
  overdueTasks,
  pipelineByStage,
  stalledDeals,
} from "@/lib/crm/selectors";

export default function DashboardPage() {
  const { state } = useCrm();
  const kpis = dashboardKpis(state);
  const funnel = pipelineByStage(state).filter(
    (s) => s.stageId !== "closed_won" && s.stageId !== "closed_lost"
  );
  const maxAmount = Math.max(...funnel.map((s) => s.amount), 1);
  const overdue = overdueTasks(state);
  const stalled = stalledDeals(state);
  const quiet = overdue.length === 0 && stalled.length === 0;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="RevOps overview for the current period."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <KpiStat key={kpi.id} {...kpi} />
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-linelight bg-white p-4 sm:p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Pipeline health</h2>
          <p className="mt-0.5 text-[0.78rem] text-slateblue">Open stages by amount</p>
          <ul className="mt-4 space-y-3">
            {funnel.map((row) => (
              <li key={row.stageId}>
                <div className="mb-1 flex items-center justify-between gap-2 text-[0.8rem]">
                  <span className="font-medium text-ink">{row.stage}</span>
                  <span className="tabular-nums text-slateblue">
                    {row.count} · {formatMoney(row.amount)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-cloud">
                  <div
                    className="h-full rounded-full bg-electric-600 transition-[width]"
                    style={{ width: `${Math.max(4, (row.amount / maxAmount) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-linelight bg-white p-4 sm:p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Recent activity</h2>
          <div className="mt-4">
            <ActivityTimeline items={state.activities.slice(0, 6)} />
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-linelight bg-white p-4 sm:p-5">
        <h2 className="text-[0.9rem] font-semibold text-ink">Exceptions</h2>
        {quiet ? (
          <p className="mt-3 text-[0.88rem] text-emerald-700">All clear — no overdue tasks or stalled deals.</p>
        ) : (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[0.75rem] font-semibold tracking-wide text-slateblue uppercase">
                Overdue tasks ({overdue.length})
              </p>
              <ul className="space-y-2">
                {overdue.map((t) => (
                  <li key={t.id}>
                    <Link
                      href="/app/tasks"
                      className="flex cursor-pointer items-start justify-between gap-2 rounded-lg border border-linelight px-3 py-2 transition hover:bg-cloud"
                    >
                      <div>
                        <p className="text-[0.84rem] font-medium text-ink">{t.title}</p>
                        <p className="text-[0.75rem] text-slateblue">{t.relatedLabel}</p>
                      </div>
                      <StatusBadge status={t.priority} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[0.75rem] font-semibold tracking-wide text-slateblue uppercase">
                Stalled deals ({stalled.length})
              </p>
              <ul className="space-y-2">
                {stalled.map((o) => (
                  <li key={o.id}>
                    <Link
                      href={`/app/opportunities/${o.id}`}
                      className="flex items-start justify-between gap-2 rounded-lg border border-linelight px-3 py-2 transition hover:bg-cloud"
                    >
                      <div>
                        <p className="text-[0.84rem] font-medium text-ink">{o.name}</p>
                        <p className="text-[0.75rem] text-slateblue">Stalled {o.stalledDays} days</p>
                      </div>
                      <span className="text-[0.8rem] font-semibold tabular-nums text-ink">
                        {formatMoney(o.amount)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
