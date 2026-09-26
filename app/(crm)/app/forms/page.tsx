"use client";

import * as React from "react";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";

export default function FormsPage() {
  const { state, setFormStatus, addForm, deleteForm } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Form State
  const [formState, setFormState] = React.useState({
    name: "",
    fields: 6,
    status: "published" as "published" | "draft",
  });

  const rows = state.forms.filter((f) => {
    const hay = f.name.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || f.status === status);
  });

  const handleCreateForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      showToast("Please enter a form title.", "error");
      return;
    }

    addForm({
      name: formState.name.trim(),
      fields: Number(formState.fields) || 5,
      status: formState.status,
    });

    showToast(`Capture form "${formState.name}" created.`);
    setIsModalOpen(false);
    setFormState({
      name: "",
      fields: 6,
      status: "published",
    });
  };

  return (
    <div>
      <PageHeader
        title="Forms"
        description="Public capture forms embedded across the BITS website, interactive specimens, and landing funnels."
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Form</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search forms by title…">
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
        <EmptyState
          title="No forms match"
          description="Try another search or publish a new intake form."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Create First Form
            </CrmButton>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/60 dark:border-[#242424] dark:bg-neutral-900/60">
                {["Form Title & Target URL", "Status", "Input Fields", "Submissions (30d)", "Conversion Rate", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[0.68rem] font-bold tracking-wider text-muted-foreground uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 dark:divide-[#242424]">
              {rows.map((f) => (
                <tr key={f.id} className="hover:bg-muted/40 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{f.name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono text-muted-foreground">
                    {f.fields} inputs
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono font-bold text-foreground">
                    {f.submissions30d}
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatPct(f.conversionRate)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <CrmButton
                        onClick={() => {
                          const next = f.status === "published" ? "draft" : "published";
                          setFormStatus(f.id, next);
                          showToast(`Form ${next === "published" ? "published" : "unpublished"}.`);
                        }}
                        className="h-8 gap-1 px-2.5 text-xs"
                      >
                        {f.status === "published" ? (
                          <>
                            <EyeOff className="size-3 text-muted-foreground" />
                            <span>Unpublish</span>
                          </>
                        ) : (
                          <>
                            <Eye className="size-3 text-emerald-600" />
                            <span>Publish</span>
                          </>
                        )}
                      </CrmButton>

                      <button
                        type="button"
                        onClick={() => {
                          deleteForm(f.id);
                          showToast(`Form "${f.name}" deleted.`, "info");
                        }}
                        className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Delete Form"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Form Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Deploy New Capture Form"
        description="Create an embedded lead capture endpoint linked to BITS Inbound Telemetry."
        maxWidth="md"
      >
        <form onSubmit={handleCreateForm} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Form Title &amp; Target Route *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Enterprise Voice Demonstration Request (/voice-demo)"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Number of Input Fields
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={formState.fields}
                onChange={(e) => setFormState({ ...formState, fields: Number(e.target.value) })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Initial Status
              </label>
              <select
                value={formState.status}
                onChange={(e) =>
                  setFormState({ ...formState, status: e.target.value as "published" | "draft" })
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="published">Published (Live)</option>
                <option value="draft">Draft (Testing)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Deploy Form
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
