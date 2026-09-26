"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatMoney } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";
import type { OpportunityStage } from "@/lib/crm/types";

export default function OpportunitiesPage() {
  const { state, addOpportunity, moveOpportunity, deleteOpportunity } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [stage, setStage] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Deal Form
  const [dealForm, setDealForm] = React.useState({
    name: "",
    companyId: state.companies[0]?.id ?? "co-1",
    contactId: state.contacts[0]?.id ?? "ct-1",
    stage: "discovery" as OpportunityStage,
    amount: 1200000,
    probability: 30,
    closeDate: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
    owner: "Malcolm Cuady",
    pipelineId: "pipe-1",
  });

  const rows = state.opportunities.filter((o) => {
    const hay = `${o.name} ${companyName(state, o.companyId)} ${o.owner} ${o.stage}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (stage === "all" || o.stage === stage);
  });

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealForm.name.trim() || dealForm.amount <= 0) {
      showToast("Please provide a valid deal name and amount in ₱.", "error");
      return;
    }

    addOpportunity({
      name: dealForm.name.trim(),
      companyId: dealForm.companyId,
      contactId: dealForm.contactId,
      stage: dealForm.stage,
      amount: Number(dealForm.amount),
      probability: Number(dealForm.probability) || 30,
      closeDate: dealForm.closeDate,
      owner: dealForm.owner,
      pipelineId: dealForm.pipelineId,
    });

    showToast(`Opportunity "${dealForm.name}" created (${formatMoney(dealForm.amount)}).`);
    setIsModalOpen(false);
    setDealForm({
      name: "",
      companyId: state.companies[0]?.id ?? "co-1",
      contactId: state.contacts[0]?.id ?? "ct-1",
      stage: "discovery",
      amount: 1200000,
      probability: 30,
      closeDate: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
      owner: "Malcolm Cuady",
      pipelineId: "pipe-1",
    });
  };

  return (
    <div>
      <PageHeader
        title="Opportunities"
        description={`${state.opportunities.length} enterprise deals tracked in Philippine Pesos (₱).`}
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Opportunity</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search opportunities by name, account, owner…">
        <StatusFilter
          value={stage}
          onChange={setStage}
          label="Stage"
          options={[
            { value: "all", label: "All stages" },
            { value: "discovery", label: "Discovery" },
            { value: "proposal", label: "Proposal" },
            { value: "negotiation", label: "Negotiation" },
            { value: "closed_won", label: "Closed won" },
            { value: "closed_lost", label: "Closed lost" },
          ]}
        />
      </FilterBar>

      {rows.length === 0 ? (
        <EmptyState
          title="No opportunities match"
          description="Try selecting another stage or register a new commercial deal."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Add First Deal
            </CrmButton>
          }
        />
      ) : (
        <DataTable
          rows={rows}
          columns={[
            {
              key: "name",
              header: "Deal Name",
              cell: (r) => (
                <Link
                  href={`/app/opportunities/${r.id}`}
                  className="font-bold text-foreground hover:text-[#1975f2] transition-colors"
                >
                  {r.name}
                </Link>
              ),
            },
            {
              key: "company",
              header: "Company Account",
              cell: (r) => companyName(state, r.companyId),
            },
            {
              key: "stage",
              header: "Stage",
              cell: (r) => (
                <div className="flex items-center gap-1.5">
                  <StatusBadge status={r.stage} />
                  <select
                    value={r.stage}
                    onChange={(e) => {
                      moveOpportunity(r.id, e.target.value as OpportunityStage);
                      showToast(`Deal moved to ${e.target.value.replace("_", " ")}.`);
                    }}
                    className="h-6 rounded border border-border bg-card px-1 text-[0.65rem] text-muted-foreground outline-none cursor-pointer"
                    aria-label={`Change stage for ${r.name}`}
                  >
                    <option value="discovery">Discovery</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed_won">Closed Won</option>
                    <option value="closed_lost">Closed Lost</option>
                  </select>
                </div>
              ),
            },
            {
              key: "amount",
              header: "Amount (₱)",
              className: "tabular-nums font-mono font-bold text-foreground",
              cell: (r) => formatMoney(r.amount),
            },
            {
              key: "prob",
              header: "Win Prob.",
              className: "tabular-nums font-mono text-muted-foreground",
              cell: (r) => `${r.probability}%`,
            },
            {
              key: "owner",
              header: "Owner",
              cell: (r) => r.owner,
            },
            {
              key: "actions",
              header: "Actions",
              className: "text-right",
              cell: (r) => (
                <button
                  type="button"
                  onClick={() => {
                    deleteOpportunity(r.id);
                    showToast(`Deal "${r.name}" deleted.`, "info");
                  }}
                  className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Delete Opportunity"
                >
                  <Trash2 className="size-3.5" />
                </button>
              ),
            },
          ]}
        />
      )}

      {/* Create Opportunity Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Commercial Opportunity"
        description="Register an institutional deal, contract renewal, or software licensing project."
        maxWidth="md"
      >
        <form onSubmit={handleCreateDeal} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Deal / Project Title *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. EastWest Credit — 150-Seat Collections CRM"
              value={dealForm.name}
              onChange={(e) => setDealForm({ ...dealForm, name: e.target.value })}
              className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Associated Company *
              </label>
              <select
                value={dealForm.companyId}
                onChange={(e) => setDealForm({ ...dealForm, companyId: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                {state.companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Deal Amount in Pesos (₱) *
              </label>
              <input
                required
                type="number"
                min={10000}
                step={50000}
                placeholder="1450000"
                value={dealForm.amount}
                onChange={(e) => setDealForm({ ...dealForm, amount: Number(e.target.value) })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 font-mono"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Pipeline Stage
              </label>
              <select
                value={dealForm.stage}
                onChange={(e) =>
                  setDealForm({ ...dealForm, stage: e.target.value as OpportunityStage })
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-2 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="discovery">Discovery</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed_won">Closed Won</option>
                <option value="closed_lost">Closed Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Probability (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={dealForm.probability}
                onChange={(e) => setDealForm({ ...dealForm, probability: Number(e.target.value) })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Target Close Date
              </label>
              <input
                type="date"
                value={dealForm.closeDate}
                onChange={(e) => setDealForm({ ...dealForm, closeDate: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Create Deal
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
