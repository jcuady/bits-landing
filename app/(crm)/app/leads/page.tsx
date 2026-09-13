"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { formatDate } from "@/lib/crm/selectors";

export default function LeadsPage() {
  const { state } = useCrm();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const rows = state.leads.filter((l) => {
    const hay = `${l.name} ${l.email} ${l.company} ${l.source}`.toLowerCase();
    const matchQ = hay.includes(q.toLowerCase());
    const matchS = status === "all" || l.status === status;
    return matchQ && matchS;
  });

  return (
    <div>
      <PageHeader title="Leads" description={`${state.leads.length} records in this workspace.`} />
      <FilterBar value={q} onChange={setQ} placeholder="Search leads…">
        <StatusFilter
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "new", label: "New" },
            { value: "working", label: "Working" },
            { value: "qualified", label: "Qualified" },
            { value: "disqualified", label: "Disqualified" },
          ]}
        />
      </FilterBar>
      {rows.length === 0 ? (
        <EmptyState title="No leads match" description="Try another search or status filter." />
      ) : (
        <DataTable
          href={(r) => `/app/leads/${r.id}`}
          rows={rows}
          columns={[
            { key: "name", header: "Name", cell: (r) => <span className="font-semibold">{r.name}</span> },
            { key: "company", header: "Company", cell: (r) => r.company },
            { key: "source", header: "Source", cell: (r) => r.source },
            { key: "score", header: "Score", className: "tabular-nums", cell: (r) => r.score },
            { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
            { key: "owner", header: "Owner", cell: (r) => r.owner },
            { key: "created", header: "Created", cell: (r) => formatDate(r.createdAt) },
          ]}
        />
      )}
    </div>
  );
}
