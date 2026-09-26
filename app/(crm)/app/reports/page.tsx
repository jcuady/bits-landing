"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { useCrm } from "@/lib/crm/store";
import { formatMoney, pipelineByStage } from "@/lib/crm/selectors";
import { BarChart3, TrendingUp, DollarSign, Target } from "lucide-react";

export default function ReportsPage() {
  const { state } = useCrm();
  const [period, setPeriod] = React.useState<"today" | "7d" | "30d" | "90d">("30d");

  const byStage = pipelineByStage(state);
  const totalPipeline = byStage.reduce((sum, s) => sum + s.amount, 0);
  const max = Math.max(...byStage.map((s) => s.amount), 1);

  const weeklyTouches = [42, 58, 65, 84, 76, 92, 88];
  const maxW = Math.max(...weeklyTouches);

  const wonDeals = state.opportunities.filter((o) => o.stage === "closed_won");
  const totalWon = wonDeals.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Revenue & Pipeline Reports"
          description="Institutional deal conversion velocity, ARR projections, and operational touches in Philippine Pesos (₱)."
          className="mb-0 sm:mb-0"
        />

        {/* Period Selector */}
        <div className="flex items-center rounded-xl border border-border bg-muted/40 p-1 shrink-0 self-start sm:self-auto">
          {(["today", "7d", "30d", "90d"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize transition-all cursor-pointer ${
                period === p
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Highlights in ₱ */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Total Active Pipeline</span>
            <Target className="size-4 text-[#1975f2]" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-foreground tabular-nums">
            {formatMoney(totalPipeline)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Across 5 structured deal stages</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Closed Won Revenue</span>
            <TrendingUp className="size-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {formatMoney(totalWon)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Realized institutional ARR</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Deal Size</span>
            <BarChart3 className="size-4 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-foreground tabular-nums">
            {formatMoney(totalPipeline / Math.max(state.opportunities.length, 1))}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">High-value enterprise accounts</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Pipeline Value by Stage */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <div className="pb-3 border-b border-border/80 dark:border-[#222]">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Pipeline Capital by Stage
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live weighted volume distribution across deal lifecycle
            </p>
          </div>

          <ul className="mt-5 space-y-4">
            {byStage.map((row) => (
              <li key={row.stageId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{row.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono">
                      {row.count} {row.count === 1 ? "deal" : "deals"}
                    </span>
                    <span className="font-mono font-bold text-foreground tabular-nums">
                      {formatMoney(row.amount)}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1975f2] to-[#22d3ee] transition-all duration-500"
                    style={{ width: `${Math.max(6, (row.amount / max) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Activity Touchpoints Volume */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-xs dark:border-[#242424] dark:bg-[#141414] flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border/80 dark:border-[#222]">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Outreach Velocity (7d)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                WebRTC voice dials, automated SMS triggers, and email deliveries
              </p>
            </div>

            <div className="mt-6 px-2">
              <svg viewBox="0 0 280 120" className="w-full overflow-visible" role="img" aria-label="Activity touchpoints line chart">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1975f2" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1975f2" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="#1975f2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={weeklyTouches
                    .map((v, i) => {
                      const x = 20 + i * 40;
                      const y = 100 - (v / maxW) * 75;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
                {weeklyTouches.map((v, i) => {
                  const x = 20 + i * 40;
                  const y = 100 - (v / maxW) * 75;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" className="fill-[#1975f2] stroke-card stroke-2" />
                      <text
                        x={x}
                        y={y - 8}
                        textAnchor="middle"
                        className="text-[9px] font-mono font-bold fill-foreground"
                      >
                        {v}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-3 flex justify-between px-1 text-xs text-muted-foreground font-semibold">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-border/80 dark:border-[#222] flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Peak Outreach Day</span>
            <span className="font-bold text-foreground">Saturday (92 Touches)</span>
          </div>
        </section>
      </div>
    </div>
  );
}
