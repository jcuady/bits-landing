"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import { Filter, TrendingUp, Users } from "lucide-react";

export default function FunnelsPage() {
  const { state } = useCrm();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conversion Funnels"
        description="Multi-touch enterprise attribution, acquisition pathways, and step-level drop-off analysis."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {state.funnels.map((f) => {
          const max = f.steps[0]?.visitors ?? 1;
          return (
            <section
              key={f.id}
              className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Filter className="size-4 text-electric-600" />
                    <h2 className="text-base font-semibold text-foreground dark:text-neutral-100">
                      {f.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-neutral-400">
                    <TrendingUp className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Total Stage Yield: </span>
                    <strong className="text-foreground dark:text-neutral-200">
                      {formatPct(f.conversionRate)}
                    </strong>
                  </div>
                </div>
                <StatusBadge status={f.status} />
              </div>

              <div className="mt-6 space-y-4">
                {f.steps.map((step, idx) => {
                  const pctOfTop = Math.round((step.visitors / max) * 100);
                  const prevStep = f.steps[idx - 1];
                  const dropOff = prevStep
                    ? Math.round(((prevStep.visitors - step.visitors) / prevStep.visitors) * 100)
                    : null;

                  return (
                    <div key={step.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="flex size-4.5 items-center justify-center rounded-full bg-muted text-[0.65rem] font-bold text-muted-foreground dark:bg-neutral-800 dark:text-neutral-400">
                            {idx + 1}
                          </span>
                          <span className="font-medium text-foreground dark:text-neutral-200">
                            {step.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {dropOff !== null && dropOff > 0 ? (
                            <span className="text-[0.68rem] text-rose-500 font-mono">
                              -{dropOff}% drop
                            </span>
                          ) : null}
                          <span className="font-mono font-semibold tabular-nums text-foreground dark:text-neutral-200">
                            {step.visitors.toLocaleString()} <span className="text-muted-foreground font-normal">({pctOfTop}%)</span>
                          </span>
                        </div>
                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-neutral-800">
                        <div
                          className="h-full rounded-full bg-electric-600 transition-all duration-500 dark:bg-electric-500"
                          style={{ width: `${pctOfTop}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
