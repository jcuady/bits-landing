"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { useCrm } from "@/lib/crm/store";
import { formatDate } from "@/lib/crm/selectors";

export default function TasksPage() {
  const { state, setTaskStatus } = useCrm();
  const [q, setQ] = React.useState("");
  const rows = state.tasks.filter((t) =>
    `${t.title} ${t.relatedLabel} ${t.owner}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Tasks" description="Complete or reopen tasks for this session." />
      <FilterBar value={q} onChange={setQ} placeholder="Search tasks…" />
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
                <p className={`text-[0.9rem] font-semibold text-ink ${t.status === "done" ? "line-through opacity-60" : ""}`}>
                  {t.title}
                </p>
                <p className="mt-0.5 text-[0.78rem] text-slateblue">
                  {t.relatedLabel} · Due {formatDate(t.dueAt)} · {t.owner}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={t.priority} />
                <StatusBadge status={t.status} />
                <button
                  type="button"
                  onClick={() => setTaskStatus(t.id, t.status === "done" ? "open" : "done")}
                  className="rounded-lg border border-linelight px-3 py-1.5 text-[0.78rem] font-semibold text-ink transition hover:bg-cloud active:scale-[0.98]"
                >
                  {t.status === "done" ? "Reopen" : "Complete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
