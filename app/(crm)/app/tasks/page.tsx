"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { formatDate, relatedHref } from "@/lib/crm/selectors";
import Link from "next/link";

export default function TasksPage() {
  const { state, setTaskStatus } = useCrm();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const rows = state.tasks.filter((t) => {
    const hay = `${t.title} ${t.relatedLabel} ${t.owner}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || t.status === status);
  });

  return (
    <div>
      <PageHeader title="Tasks" description="Complete or reopen tasks for this session." />
      <FilterBar value={q} onChange={setQ} placeholder="Search tasks…">
        <StatusFilter
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All" },
            { value: "open", label: "Open" },
            { value: "done", label: "Done" },
          ]}
        />
      </FilterBar>
      {rows.length === 0 ? (
        <EmptyState title="No tasks match" />
      ) : (
        <ul className="overflow-hidden rounded-xl border border-linelight bg-white">
          {rows.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 border-b border-linelight px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p
                  className={`text-[0.9rem] font-semibold text-ink ${t.status === "done" ? "line-through opacity-60" : ""}`}
                >
                  {t.title}
                </p>
                <p className="mt-0.5 text-[0.78rem] text-slateblue">
                  <Link
                    href={relatedHref(t.relatedType, t.relatedId)}
                    className="cursor-pointer font-medium text-electric-600 hover:text-navy-700"
                  >
                    {t.relatedLabel}
                  </Link>
                  {" · "}Due {formatDate(t.dueAt)} · {t.owner}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={t.priority} />
                <StatusBadge status={t.status} />
                <CrmButton onClick={() => setTaskStatus(t.id, t.status === "done" ? "open" : "done")}>
                  {t.status === "done" ? "Reopen" : "Complete"}
                </CrmButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
