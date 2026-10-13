"use client";

import * as React from "react";
import { useMarketing } from "@/lib/products/crm-marketing/store";
import { UserPlus, TrendingUp, TrendingDown } from "lucide-react";
import {
  PageHeader,
  Panel,
  DemoDataBanner,
  DemoTable,
  EmptyState,
} from "@/components/products/demo-ui";

export default function AudiencesPage() {
  const { audiences } = useMarketing();
  const totalReach = audiences.reduce((s, a) => s + a.size, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audience Segments"
        description="Reusable targeting rules. Every journey enrols from one of these segments."
      />

      <DemoDataBanner note="synthetic segment sizes and growth rates for evaluation." />

      <Panel>
        {audiences.length === 0 ? (
          <EmptyState
            icon={UserPlus}
            title="No segments available"
            body="Reset the demo data to restore the sample audience segments."
          />
        ) : (
          <>
            <div className="border-b border-sky-400/15 px-5 py-4">
              <p className="text-sm text-sky-200/80">
                Total reachable contacts across all segments:{" "}
                <span className="font-mono font-bold text-white">{totalReach.toLocaleString()}</span>
              </p>
            </div>
            <DemoTable head={["Segment", "Definition", "Contacts", "This week"]}>
              {audiences.map((a) => (
                <tr key={a.id} className="transition hover:bg-white/5">
                  <td className="px-4 py-3.5">
                    <span className="block text-sm font-semibold text-white">{a.name}</span>
                    <span className="font-mono text-xs text-sky-200/60">{a.id}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-sky-200/80">{a.rule}</td>
                  <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-white">
                    {a.size.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        a.growthThisWeek >= 0 ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {a.growthThisWeek >= 0 ? (
                        <TrendingUp className="size-3" aria-hidden />
                      ) : (
                        <TrendingDown className="size-3" aria-hidden />
                      )}
                      {a.growthThisWeek >= 0 ? "+" : ""}
                      {a.growthThisWeek}
                    </span>
                  </td>
                </tr>
              ))}
            </DemoTable>
          </>
        )}
      </Panel>
    </div>
  );
}