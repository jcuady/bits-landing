"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { PipelineBoard } from "@/components/crm/pipeline-board";
import { CrmButton } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useToast } from "@/components/crm/crm-toast";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";
import type { OpportunityStage } from "@/lib/crm/types";
import { Plus } from "lucide-react";

export default function PipelinesPage() {
  const { state, addOpportunity } = useCrm();
  const { showToast } = useToast();
  const pipeline = state.pipelines[0];

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dealForm, setDealForm] = React.useState({
    name: "",
    companyId: state.companies[0]?.id || "co-1",
    contactId: state.contacts[0]?.id || "ct-1",
    amount: 1500000,
    stage: "discovery" as OpportunityStage,
    probability: 30,
    closeDate: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
    owner: "Malcolm Cuady",
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealForm.name.trim()) {
      showToast("Please provide a deal name.", "warning");
      return;
    }

    addOpportunity({
      name: dealForm.name.trim(),
      companyId: dealForm.companyId,
      contactId: dealForm.contactId,
      amount: Number(dealForm.amount) || 100000,
      stage: dealForm.stage,
      probability: Number(dealForm.probability) || 20,
      closeDate: dealForm.closeDate,
      owner: dealForm.owner,
      pipelineId: pipeline?.id || "pl-1",
    });

    showToast(`Deal "${dealForm.name}" created (${formatMoney(dealForm.amount)}).`);
    setDealForm({
      name: "",
      companyId: state.companies[0]?.id || "co-1",
      contactId: state.contacts[0]?.id || "ct-1",
      amount: 1500000,
      stage: "discovery",
      probability: 30,
      closeDate: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
      owner: "Malcolm Cuady",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Deal Pipeline"
        description={pipeline ? `${pipeline.name} · Real-time stage progression in Philippine Pesos (₱)` : "No pipeline configured"}
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            New Deal
          </CrmButton>
        }
      />

      <PipelineBoard />

      {/* Create Deal Modal */}
      <CrmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Pipeline Deal"
        description="Log an enterprise revops or collections software opportunity."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
              Deal Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Bank Enterprise Core Integration"
              value={dealForm.name}
              onChange={(e) => setDealForm({ ...dealForm, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
                Client Organization
              </label>
              <select
                value={dealForm.companyId}
                onChange={(e) => setDealForm({ ...dealForm, companyId: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {state.companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
                Pipeline Value (₱ PHP)
              </label>
              <input
                type="number"
                min={10000}
                step={50000}
                required
                value={dealForm.amount}
                onChange={(e) => setDealForm({ ...dealForm, amount: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
                Initial Stage
              </label>
              <select
                value={dealForm.stage}
                onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value as OpportunityStage })}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              >
                <option value="discovery">Discovery (Initial Evaluation)</option>
                <option value="proposal">Proposal (Scope & Pricing)</option>
                <option value="negotiation">Negotiation (Contract Review)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
                Win Probability (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={dealForm.probability}
                onChange={(e) => setDealForm({ ...dealForm, probability: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
              Account Executive / Owner
            </label>
            <input
              type="text"
              value={dealForm.owner}
              onChange={(e) => setDealForm({ ...dealForm, owner: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <CrmButton
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
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
