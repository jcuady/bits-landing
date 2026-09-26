"use client";

import * as React from "react";
import { Plus, Trash2, Zap, Pause, Play } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";
import type { AutomationStatus } from "@/lib/crm/types";

export default function AutomationsPage() {
  const { state, setAutomationStatus, addAutomation, deleteAutomation } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Automation Form State
  const [autoForm, setAutoForm] = React.useState({
    name: "",
    trigger: "New Contact Form Submission",
    status: "active" as AutomationStatus,
  });

  const rows = state.automations.filter((a) => {
    const hay = `${a.name} ${a.trigger}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || a.status === status);
  });

  const handleCreateAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoForm.name.trim()) {
      showToast("Please enter an automation workflow title.", "error");
      return;
    }

    addAutomation({
      name: autoForm.name.trim(),
      trigger: autoForm.trigger,
      status: autoForm.status,
    });

    showToast(`Workflow "${autoForm.name}" activated.`);
    setIsModalOpen(false);
    setAutoForm({
      name: "",
      trigger: "New Contact Form Submission",
      status: "active",
    });
  };

  return (
    <div>
      <PageHeader
        title="Automations"
        description="Event-driven webhooks, auto-assignment rules, and predictive collections triggers."
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Automation</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search automations by workflow or trigger…">
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
        <EmptyState
          title="No automations match"
          description="Try another search or status filter, or create an automated workflow."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Build First Workflow
            </CrmButton>
          }
        />
      ) : (
        <ul className="space-y-3">
          {rows.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs transition-colors hover:border-[#1975f2]/40 dark:border-[#242424] dark:bg-[#141414] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-[#1975f2] dark:bg-blue-950/60 dark:text-blue-400">
                    <Zap className="size-4" />
                  </span>
                  <p className="text-[0.92rem] font-bold text-foreground">{a.name}</p>
                  <StatusBadge status={a.status} />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground pl-9 leading-relaxed">
                  <span className="font-semibold text-foreground">Trigger:</span> {a.trigger} ·{" "}
                  <span className="font-mono">{a.runs30d} runs (30d)</span> ·{" "}
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatPct(a.successRate)} success
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <CrmButton
                  onClick={() => {
                    const next: AutomationStatus = a.status === "active" ? "paused" : "active";
                    setAutomationStatus(a.id, next);
                    showToast(`Automation ${next === "active" ? "activated" : "paused"}.`);
                  }}
                  className="gap-1 h-9 px-3 text-xs"
                >
                  {a.status === "active" ? (
                    <>
                      <Pause className="size-3 text-amber-500" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3 text-emerald-600" />
                      <span>Enable</span>
                    </>
                  )}
                </CrmButton>

                <button
                  type="button"
                  onClick={() => {
                    deleteAutomation(a.id);
                    showToast(`Automation "${a.name}" removed.`, "info");
                  }}
                  className="p-2 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Delete Automation"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Create Automation Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Automated Workflow"
        description="Configure automated lead routing, SMS floor alerts, or predictive queues."
        maxWidth="md"
      >
        <form onSubmit={handleCreateAutomation} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Workflow Name *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Website Form Submission → Auto-Qualify & Assign AE"
              value={autoForm.name}
              onChange={(e) => setAutoForm({ ...autoForm, name: e.target.value })}
              className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Trigger Event *
            </label>
            <select
              value={autoForm.trigger}
              onChange={(e) => setAutoForm({ ...autoForm, trigger: e.target.value })}
              className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
            >
              <option value="New Contact Form Submission">New Contact Form Submission</option>
              <option value="High-Intent Lead (Score ≥ 90)">High-Intent Lead (Score ≥ 90)</option>
              <option value="Broken PTP Arrangement Default">Broken PTP Arrangement Default</option>
              <option value="Opportunity Closed Won">Opportunity Closed Won</option>
              <option value="Inbound Softphone Call Missed">Inbound Softphone Call Missed</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Create Workflow
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
