"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";

export default function AutomationsPage() {
  const { state, setAutomationStatus } = useCrm();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const rows = state.automations.filter((a) => {
    const hay = `${a.name} ${a.trigger}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || a.status === status);
  });

  return (
    <div>
      <PageHeader title="Automations" description="Toggle workflow status for this session." />
      <FilterBar value={q} onChange={setQ} placeholder="Search automations…">
        <StatusFilter
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "active", label: "Active" },
            { value: "paused", label: "Paused" },
          ]}
        />
      </FilterBar>
      {rows.length === 0 ? (
        <EmptyState title="No automations match" />
      ) : (
        <ul className="space-y-3">
          {rows.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 rounded-xl border border-linelight bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[0.92rem] font-semibold text-ink">{a.name}</p>
                  <StatusBadge status={a.status} />
                </div>
                <p className="mt-1 text-[0.8rem] text-slateblue">
                  Trigger: {a.trigger} · {a.runs30d} runs (30d) · {formatPct(a.successRate)} success
                </p>
              </div>
              <CrmButton
                className="shrink-0"
                onClick={() => setAutomationStatus(a.id, a.status === "active" ? "paused" : "active")}
              >
                {a.status === "active" ? "Pause" : "Enable"}
              </CrmButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
