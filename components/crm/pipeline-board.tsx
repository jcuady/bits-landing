"use client";

import Link from "next/link";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatMoney } from "@/lib/crm/selectors";
import type { Opportunity, OpportunityStage } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

const stageOrder: OpportunityStage[] = [
  "discovery",
  "proposal",
  "negotiation",
  "closed_won",
  "closed_lost",
];

export function PipelineBoard() {
  const { state, moveOpportunity } = useCrm();
  const stages = state.pipelines[0]?.stages ?? [];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {stages.map((stage) => {
        const cards = state.opportunities.filter((o) => o.stage === stage.id);
        const total = cards.reduce((s, o) => s + o.amount, 0);
        return (
          <div
            key={stage.id}
            className="flex w-[260px] shrink-0 flex-col rounded-xl border border-linelight bg-cloud/50"
          >
            <div className="border-b border-linelight px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[0.8rem] font-semibold text-ink">{stage.label}</h3>
                <span className="text-[0.72rem] font-medium text-slateblue tabular-nums">{cards.length}</span>
              </div>
              <p className="mt-0.5 text-[0.72rem] text-slateblue tabular-nums">{formatMoney(total)}</p>
            </div>
            <ul className="flex flex-1 flex-col gap-2 p-2">
              {cards.map((opp) => (
                <PipelineCard
                  key={opp.id}
                  opp={opp}
                  company={companyName(state, opp.companyId)}
                  onMove={moveOpportunity}
                  stages={stageOrder}
                />
              ))}
              {cards.length === 0 ? (
                <li className="rounded-lg border border-dashed border-linelight px-3 py-6 text-center text-[0.78rem] text-slateblue">
                  No deals
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
  stages,
}: {
  opp: Opportunity;
  company: string;
  onMove: (id: string, stage: OpportunityStage) => void;
  stages: OpportunityStage[];
}) {
  const idx = stages.indexOf(opp.stage);
  return (
    <li className="rounded-lg border border-linelight bg-white p-3 shadow-[0_1px_2px_rgb(6_22_47/0.04)] transition active:scale-[0.99]">
      <Link href={`/app/opportunities/${opp.id}`} className="block">
        <p className="text-[0.84rem] font-semibold leading-snug text-ink">{opp.name}</p>
        <p className="mt-1 text-[0.75rem] text-slateblue">{company}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[0.84rem] font-semibold text-ink tabular-nums">{formatMoney(opp.amount)}</span>
          <span className="text-[0.72rem] text-slateblue">{opp.probability}%</span>
        </div>
        {opp.stalledDays ? (
          <p className="mt-1.5 text-[0.7rem] font-medium text-amber-700">Stalled {opp.stalledDays}d</p>
        ) : null}
      </Link>
      <div className="mt-2 flex gap-1 border-t border-linelight pt-2">
        <button
          type="button"
          disabled={idx <= 0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMove(opp.id, stages[idx - 1]!);
          }}
          className={cn(
            "flex-1 rounded-md border border-linelight py-1 text-[0.7rem] font-semibold text-slateblue transition hover:bg-cloud disabled:opacity-40"
          )}
        >
          Back
        </button>
        <button
          type="button"
          disabled={idx >= stages.length - 1}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMove(opp.id, stages[idx + 1]!);
          }}
          className="flex-1 rounded-md border border-linelight py-1 text-[0.7rem] font-semibold text-electric-700 transition hover:bg-electric-600/10 disabled:opacity-40"
        >
          Move
        </button>
      </div>
    </li>
  );
}
