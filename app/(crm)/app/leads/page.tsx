"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { useCrm } from "@/lib/crm/store";
import { formatDate } from "@/lib/crm/selectors";

export default function LeadsPage() {
  const { state } = useCrm();
  const [q, setQ] = React.useState("");
  const rows = state.leads.filter((l) => {
    const hay = `${l.name} ${l.email} ${l.company} ${l.source}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div>
      <PageHeader title="Leads" description={`${state.leads.length} records in this workspace.`} />
      <FilterBar value={q} onChange={setQ} placeholder="Search leads…" />
      {rows.length === 0 ? (
        <EmptyState title="No leads match" description="Try another search term." />
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
