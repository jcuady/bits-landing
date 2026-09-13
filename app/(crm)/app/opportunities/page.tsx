"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatMoney } from "@/lib/crm/selectors";

export default function OpportunitiesPage() {
  const { state } = useCrm();
  const [q, setQ] = React.useState("");
  const [stage, setStage] = React.useState("all");
  const rows = state.opportunities.filter((o) => {
    const hay = `${o.name} ${companyName(state, o.companyId)} ${o.owner} ${o.stage}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (stage === "all" || o.stage === stage);
  });

  return (
    <div>
      <PageHeader title="Opportunities" description={`${state.opportunities.length} deals in pipeline.`} />
      <FilterBar value={q} onChange={setQ} placeholder="Search opportunities…">
        <StatusFilter
          value={stage}
          onChange={setStage}
          label="Stage"
          options={[
            { value: "all", label: "All stages" },
            { value: "discovery", label: "Discovery" },
            { value: "proposal", label: "Proposal" },
            { value: "negotiation", label: "Negotiation" },
            { value: "closed_won", label: "Closed won" },
            { value: "closed_lost", label: "Closed lost" },
          ]}
        />
      </FilterBar>
      {rows.length === 0 ? (
        <EmptyState title="No opportunities match" />
      ) : (
        <DataTable
          href={(r) => `/app/opportunities/${r.id}`}
          rows={rows}
          columns={[
            { key: "name", header: "Name", cell: (r) => <span className="font-semibold">{r.name}</span> },
            { key: "company", header: "Company", cell: (r) => companyName(state, r.companyId) },
            { key: "stage", header: "Stage", cell: (r) => <StatusBadge status={r.stage} /> },
            { key: "amount", header: "Amount", className: "tabular-nums", cell: (r) => formatMoney(r.amount) },
            { key: "prob", header: "Prob.", className: "tabular-nums", cell: (r) => `${r.probability}%` },
            { key: "close", header: "Close", cell: (r) => r.closeDate },
            { key: "owner", header: "Owner", cell: (r) => r.owner },
          ]}
        />
      )}
    </div>
  );
}
