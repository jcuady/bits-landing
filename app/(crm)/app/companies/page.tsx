"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { EmptyState } from "@/components/crm/empty-state";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";

export default function CompaniesPage() {
  const { state } = useCrm();
  const [q, setQ] = React.useState("");
  const rows = state.companies.filter((c) => {
    const hay = `${c.name} ${c.domain} ${c.industry} ${c.location}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div>
      <PageHeader title="Companies" description={`${state.companies.length} accounts.`} />
      <FilterBar value={q} onChange={setQ} placeholder="Search companies…" />
      {rows.length === 0 ? (
        <EmptyState title="No companies match" />
      ) : (
        <DataTable
          href={(r) => `/app/companies/${r.id}`}
          rows={rows}
          columns={[
            { key: "name", header: "Name", cell: (r) => <span className="font-semibold">{r.name}</span> },
            { key: "industry", header: "Industry", cell: (r) => r.industry },
            { key: "employees", header: "Employees", className: "tabular-nums", cell: (r) => r.employees.toLocaleString() },
            { key: "arr", header: "ARR estimate", className: "tabular-nums", cell: (r) => formatMoney(r.arrEstimate) },
            { key: "location", header: "Location", cell: (r) => r.location },
            { key: "owner", header: "Owner", cell: (r) => r.owner },
          ]}
        />
      )}
    </div>
  );
}
