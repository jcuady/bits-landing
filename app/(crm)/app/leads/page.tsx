"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Trash2, PhoneCall, Mail } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatDate } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";
import type { LeadStatus } from "@/lib/crm/types";

export default function LeadsPage() {
  const { state, addLead, updateLeadStatus, deleteLead } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Lead Form State
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    title: "",
    source: "Website Contact Form",
    score: 85,
    status: "new" as LeadStatus,
    owner: "Malcolm Cuady",
    notes: "",
  });

  const rows = state.leads.filter((l) => {
    const hay = `${l.name} ${l.email} ${l.company} ${l.source}`.toLowerCase();
    const matchQ = hay.includes(q.toLowerCase());
    const matchS = status === "all" || l.status === status;
    return matchQ && matchS;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      showToast("Please fill in Name, Email, and Company.", "error");
      return;
    }

    addLead({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      title: formData.title.trim() || "Operations Lead",
      source: formData.source,
      score: Number(formData.score) || 75,
      status: formData.status,
      owner: formData.owner,
      notes: formData.notes.trim() || "Inbound consultation lead registered directly.",
    });

    showToast(`Lead for ${formData.name} successfully created!`);
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      title: "",
      source: "Website Contact Form",
      score: 85,
      status: "new",
      owner: "Malcolm Cuady",
      notes: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="Leads"
        description={`${state.leads.length} total inbound enterprise records registered.`}
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Lead</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search leads by name, company, email…">
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
        <EmptyState
          title="No leads match"
          description="Try adjusting your search criteria or create a new inbound lead."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Add First Lead
            </CrmButton>
          }
        />
      ) : (
        <DataTable
          rows={rows}
          columns={[
            {
              key: "name",
              header: "Lead & Company",
              cell: (r) => (
                <div className="flex flex-col">
                  <Link
                    href={`/app/leads/${r.id}`}
                    className="font-bold text-foreground hover:text-[#1975f2] transition-colors"
                  >
                    {r.name}
                  </Link>
                  <span className="text-[0.68rem] text-muted-foreground truncate max-w-[170px]">
                    {r.company} · {r.title}
                  </span>
                </div>
              ),
            },
            {
              key: "source",
              header: "Source Form",
              cell: (r) => (
                <span className="inline-block rounded-md bg-blue-50/70 border border-blue-200/60 px-2 py-0.5 text-[0.68rem] font-semibold text-[#1975f2] dark:bg-blue-950/40 dark:border-blue-900">
                  {r.source}
                </span>
              ),
            },
            {
              key: "score",
              header: "Score",
              className: "tabular-nums",
              cell: (r) => (
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[0.7rem] font-mono font-bold ${
                    r.score >= 90
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-500/10 text-blue-600"
                  }`}
                >
                  {r.score}/100
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              cell: (r) => (
                <div className="flex items-center gap-1.5">
                  <StatusBadge status={r.status} />
                  <select
                    value={r.status}
                    onChange={(e) => {
                      updateLeadStatus(r.id, e.target.value as LeadStatus);
                      showToast(`Status updated to ${e.target.value}.`);
                    }}
                    className="h-6 rounded border border-border bg-card px-1 text-[0.65rem] text-muted-foreground outline-none cursor-pointer"
                    aria-label={`Change status for ${r.name}`}
                  >
                    <option value="new">New</option>
                    <option value="working">Working</option>
                    <option value="qualified">Qualified</option>
                    <option value="disqualified">Disqualified</option>
                  </select>
                </div>
              ),
            },
            {
              key: "created",
              header: "Created",
              cell: (r) => formatDate(r.createdAt),
            },
            {
              key: "actions",
              header: "Actions",
              className: "text-right",
              cell: (r) => (
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      updateLeadStatus(r.id, "working");
                      showToast(`Dialing ${r.name} via WebRTC softphone.`);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-[#1975f2] rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    title="Call Lead"
                  >
                    <PhoneCall className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteLead(r.id);
                      showToast(`Lead ${r.name} removed.`, "info");
                    }}
                    className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete Lead"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      {/* Create Lead Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Inbound Lead"
        description="Add a new potential client or institutional inquiry to your BITS pipeline."
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Atty. Rafael Dizon"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Email Address *
              </label>
              <input
                required
                type="email"
                placeholder="e.g. r.dizon@eastwestcredit.ph"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Company / Institution *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. EastWest Credit Corp"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Designation / Title
              </label>
              <input
                type="text"
                placeholder="e.g. VP Legal & Collections"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Source Channel
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="Website Contact Form">Website Contact Form</option>
                <option value="BITScrm Specimen">BITScrm Specimen</option>
                <option value="White-Label Consultation">White-Label Consultation</option>
                <option value="Inbound Partner Direct">Inbound Partner Direct</option>
                <option value="Referral / Executive Touch">Referral / Executive Touch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Lead Score (1-100)
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="new">New</option>
                <option value="working">Working</option>
                <option value="qualified">Qualified</option>
                <option value="disqualified">Disqualified</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Requirements &amp; Technical Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. 150 floor seats requirement, WebRTC softphone integration, BSP 454 compliance..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Register Lead
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
