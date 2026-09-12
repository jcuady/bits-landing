"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { EmptyState } from "@/components/crm/empty-state";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatRelative } from "@/lib/crm/selectors";

export default function ContactsPage() {
  const { state } = useCrm();
  const [q, setQ] = React.useState("");
  const rows = state.contacts.filter((c) => {
    const hay = `${c.name} ${c.email} ${c.title} ${companyName(state, c.companyId)}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div>
      <PageHeader title="Contacts" description={`${state.contacts.length} people across accounts.`} />
      <FilterBar value={q} onChange={setQ} placeholder="Search contacts…" />
      {rows.length === 0 ? (
        <EmptyState title="No contacts match" />
      ) : (
        <DataTable
          href={(r) => `/app/contacts/${r.id}`}
          rows={rows}
          columns={[
            { key: "name", header: "Name", cell: (r) => <span className="font-semibold">{r.name}</span> },
            { key: "title", header: "Title", cell: (r) => r.title },
            { key: "company", header: "Company", cell: (r) => companyName(state, r.companyId) },
            { key: "email", header: "Email", cell: (r) => r.email },
            { key: "owner", header: "Owner", cell: (r) => r.owner },
            { key: "touch", header: "Last touch", cell: (r) => formatRelative(r.lastTouchAt) },
          ]}
        />
      )}
    </div>
  );
}
