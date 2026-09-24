"use client";

import Link from "next/link";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatMoney } from "@/lib/crm/selectors";
import type { Opportunity, OpportunityStage } from "@/lib/crm/types";
import { CrmButton } from "@/components/crm/crm-controls";
import { Building2, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/** Open path only — won/lost are terminal outcomes, not linear “next”. */
const openStages: OpportunityStage[] = ["discovery", "proposal", "negotiation"];

export function PipelineBoard() {
  const { state, moveOpportunity } = useCrm();
  const stages = state.pipelines[0]?.stages ?? [];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar">
      {stages.map((stage) => {
        const cards = state.opportunities.filter((o) => o.stage === stage.id);
        const total = cards.reduce((s, o) => s + o.amount, 0);
        return (
          <div
            key={stage.id}
            className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-border bg-muted/40 p-3"
          >
            {/* Stage Header */}
            <div className="mb-3 px-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {stage.label}
                </span>
                <span className="rounded-full bg-background border border-border px-2 py-0.5 text-[0.68rem] font-bold text-muted-foreground tabular-nums">
                  {cards.length}
                </span>
              </div>
              <p className="mt-1 text-xs font-mono font-bold text-[#1975f2] tabular-nums">
                {formatMoney(total)}
              </p>
            </div>

            {/* Cards List */}
            <ul className="flex flex-1 flex-col gap-2.5">
              {cards.map((opp) => (
                <PipelineCard
                  key={opp.id}
                  opp={opp}
                  company={companyName(state, opp.companyId)}
                  onMove={moveOpportunity}
                />
              ))}
              {cards.length === 0 ? (
                <li className="rounded-xl border border-dashed border-border/80 bg-background/50 px-3 py-8 text-center text-xs text-muted-foreground">
                  No active deals in stage
                </li>
              ) : null}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function PipelineCard({
  opp,
  company,
  onMove,
}: {
  opp: Opportunity;
  company: string;
  onMove: (id: string, stage: OpportunityStage) => void;
}) {
  const openIdx = openStages.indexOf(opp.stage as (typeof openStages)[number]);
  const isOpen = openIdx >= 0;
  const isTerminal = opp.stage === "closed_won" || opp.stage === "closed_lost";

  return (
    <li className="group rounded-xl border border-border bg-background p-3.5 shadow-xs transition-all hover:border-[#1975f2]/40 hover:shadow-md">
      <Link href={`/app/opportunities/${opp.id}`} className="block cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-[#1975f2] transition-colors">
            {opp.name}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3.5 shrink-0 opacity-70" />
          <span className="truncate">{company}</span>
        </div>

        <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-border/60">
          <span className="text-sm font-bold font-mono text-foreground tabular-nums">
            {formatMoney(opp.amount)}
          </span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[0.68rem] font-bold text-muted-foreground font-mono">
            {opp.probability}% win
          </span>
        </div>

        {opp.stalledDays ? (
          <div className="mt-2 flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-1 text-[0.68rem] font-semibold text-amber-700 dark:text-amber-400">
            <AlertTriangle className="size-3 shrink-0" />
            <span>Stalled for {opp.stalledDays} days</span>
          </div>
        ) : null}
      </Link>

      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 pt-2.5">
        {isOpen ? (
          <>
            <button
              type="button"
              disabled={openIdx <= 0}
              onClick={(e) => {
                e.preventDefault();
                onMove(opp.id, openStages[openIdx - 1]!);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-muted/30 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 cursor-pointer active:scale-95 transition-all"
            >
              <ArrowLeft className="size-3" />
              <span>Back</span>
            </button>
            {opp.stage === "negotiation" ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onMove(opp.id, "closed_won");
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-600 py-1 text-xs font-bold text-white hover:bg-emerald-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="size-3" />
                  <span>Won</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onMove(opp.id, "closed_lost");
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-background py-1 text-xs font-semibold text-muted-foreground hover:text-rose-600 hover:border-rose-200 active:scale-95 transition-all cursor-pointer"
                >
                  <XCircle className="size-3" />
                  <span>Lost</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onMove(opp.id, openStages[openIdx + 1]!);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-[#1975f2] py-1 text-xs font-bold text-white hover:bg-[#1975f2]/90 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <span>Move</span>
                <ArrowRight className="size-3" />
              </button>
            )}
          </>
        ) : null}
        {isTerminal ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onMove(opp.id, "negotiation");
            }}
            className="w-full rounded-lg border border-border bg-muted/40 py-1 text-xs font-semibold text-foreground hover:bg-muted active:scale-95 transition-all cursor-pointer"
          >
            Reopen Deal
          </button>
        ) : null}
      </div>
    </li>
  );
}
