"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Trash2, CheckCircle2, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatDate, relatedHref } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";
import type { TaskStatus } from "@/lib/crm/types";

export default function TasksPage() {
  const { state, setTaskStatus, addTask, deleteTask } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Task Form
  const [taskForm, setTaskForm] = React.useState({
    title: "",
    relatedType: "opportunity" as "lead" | "opportunity" | "contact" | "company",
    relatedLabel: "EastWest Credit — 150-Seat Collections CRM",
    relatedId: "op-1",
    dueAt: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    owner: "Malcolm Cuady",
    priority: "high" as "low" | "medium" | "high",
  });

  const rows = state.tasks.filter((t) => {
    const hay = `${t.title} ${t.relatedLabel} ${t.owner}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || t.status === status);
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      showToast("Please enter a task title.", "error");
      return;
    }

    addTask({
      title: taskForm.title.trim(),
      relatedType: taskForm.relatedType,
      relatedId: taskForm.relatedId,
      relatedLabel: taskForm.relatedLabel.trim(),
      dueAt: new Date(taskForm.dueAt).toISOString(),
      status: "open",
      owner: taskForm.owner,
      priority: taskForm.priority,
    });

    showToast(`Task "${taskForm.title}" scheduled.`);
    setIsModalOpen(false);
    setTaskForm({
      title: "",
      relatedType: "opportunity",
      relatedLabel: "EastWest Credit — 150-Seat Collections CRM",
      relatedId: "op-1",
      dueAt: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      owner: "Malcolm Cuady",
      priority: "high",
    });
  };

  return (
    <div>
      <PageHeader
        title="Tasks"
        description="Action items, client follow-ups, and deployment milestones."
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Task</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search tasks by title, account, or owner…">
        <StatusFilter
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All Tasks" },
            { value: "open", label: "Open" },
            { value: "done", label: "Done" },
          ]}
        />
      </FilterBar>

      {rows.length === 0 ? (
        <EmptyState
          title="No tasks match"
          description="Try another search or status filter, or schedule a new task."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Create First Task
            </CrmButton>
          }
        />
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs dark:border-[#242424] dark:bg-[#141414] divide-y divide-border/70 dark:divide-[#242424]">
          {rows.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[0.92rem] font-semibold text-foreground ${
                    t.status === "done" ? "line-through opacity-60 text-muted-foreground" : ""
                  }`}
                >
                  {t.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground flex flex-wrap items-center gap-1">
                  <Link
                    href={relatedHref(t.relatedType, t.relatedId)}
                    className="cursor-pointer font-medium text-[#1975f2] hover:underline"
                  >
                    {t.relatedLabel}
                  </Link>
                  <span>·</span>
                  <span>Due {formatDate(t.dueAt)}</span>
                  <span>·</span>
                  <span>Owner: {t.owner}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={t.priority} />
                <StatusBadge status={t.status} />

                <CrmButton
                  onClick={() => {
                    const next: TaskStatus = t.status === "done" ? "open" : "done";
                    setTaskStatus(t.id, next);
                    showToast(next === "done" ? "Task marked complete!" : "Task reopened.");
                  }}
                  className="gap-1"
                >
                  {t.status === "done" ? (
                    <>
                      <RotateCcw className="size-3 text-muted-foreground" />
                      <span>Reopen</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      <span>Complete</span>
                    </>
                  )}
                </CrmButton>

                <button
                  type="button"
                  onClick={() => {
                    deleteTask(t.id);
                    showToast("Task removed.", "info");
                  }}
                  className="p-2 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Delete Task"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Create Task Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule New Task"
        description="Assign a priority follow-up, technical demo, or SLA milestone."
        maxWidth="md"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Task Title *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Schedule BITSagent voice demonstration for BPO floor"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Related Account / Project *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Maya Bank — Settlement Webhook Bridge"
                value={taskForm.relatedLabel}
                onChange={(e) => setTaskForm({ ...taskForm, relatedLabel: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={taskForm.dueAt}
                onChange={(e) => setTaskForm({ ...taskForm, dueAt: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Priority
              </label>
              <select
                value={taskForm.priority}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    priority: e.target.value as "low" | "medium" | "high",
                  })
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Assignee
              </label>
              <select
                value={taskForm.owner}
                onChange={(e) => setTaskForm({ ...taskForm, owner: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="Malcolm Cuady">Malcolm Cuady</option>
                <option value="Rina Velasco">Rina Velasco</option>
                <option value="Aya Mendoza">Aya Mendoza</option>
                <option value="Jonas Park">Jonas Park</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Schedule Task
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
