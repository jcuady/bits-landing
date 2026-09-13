"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";

export default function FormsPage() {
  const { state, setFormStatus } = useCrm();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const rows = state.forms.filter((f) => {
    const hay = f.name.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || f.status === status);
  });

  return (
    <div>
      <PageHeader title="Forms" description="Publish or draft capture forms for this session." />
      <FilterBar value={q} onChange={setQ} placeholder="Search forms…">
        <StatusFilter
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ]}
        />
      </FilterBar>
      {rows.length === 0 ? (
        <EmptyState title="No forms match" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-linelight bg-white">
          <table className="w-full min-w-[720px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-linelight bg-cloud/70">
                {["Form", "Status", "Fields", "Submissions (30d)", "Conversion", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-3.5 py-2.5 text-[0.7rem] font-semibold tracking-wide text-slateblue uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.id} className="border-t border-linelight">
                  <td className="px-3.5 py-3 font-semibold text-ink">{f.name}</td>
                  <td className="px-3.5 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-3.5 py-3 tabular-nums">{f.fields}</td>
                  <td className="px-3.5 py-3 tabular-nums">{f.submissions30d}</td>
                  <td className="px-3.5 py-3 tabular-nums">{formatPct(f.conversionRate)}</td>
                  <td className="px-3.5 py-3">
                    <CrmButton
                      onClick={() =>
                        setFormStatus(f.id, f.status === "published" ? "draft" : "published")
                      }
                    >
                      {f.status === "published" ? "Unpublish" : "Publish"}
                    </CrmButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
