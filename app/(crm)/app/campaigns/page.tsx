"use client";

import * as React from "react";
import { Plus, Trash2, Play, Pause } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";
import type { CampaignStatus } from "@/lib/crm/types";

export default function CampaignsPage() {
  const { state, setCampaignStatus, addCampaign, deleteCampaign } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Campaign Form State
  const [campaignForm, setCampaignForm] = React.useState({
    name: "",
    channel: "Email",
    status: "active" as CampaignStatus,
    owner: "Malcolm Cuady",
  });

  const rows = state.campaigns.filter((c) => {
    const hay = `${c.name} ${c.channel} ${c.owner}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || c.status === status);
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignForm.name.trim()) {
      showToast("Please enter a campaign name.", "error");
      return;
    }

    addCampaign({
      name: campaignForm.name.trim(),
      channel: campaignForm.channel,
      status: campaignForm.status,
      owner: campaignForm.owner,
    });

    showToast(`Campaign "${campaignForm.name}" created and launched.`);
    setIsModalOpen(false);
    setCampaignForm({
      name: "",
      channel: "Email",
      status: "active",
      owner: "Malcolm Cuady",
    });
  };

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Multi-channel automated nurture sequences, telephony outreach, and landing specimen funnels."
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Campaign</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search campaigns by name, channel, owner…">
        <StatusFilter
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "active", label: "Active" },
            { value: "paused", label: "Paused" },
            { value: "completed", label: "Completed" },
            { value: "draft", label: "Draft" },
          ]}
        />
      </FilterBar>

      {rows.length === 0 ? (
        <EmptyState
          title="No campaigns match"
          description="Try another search or status filter, or launch a new campaign."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Launch First Campaign
            </CrmButton>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/60 dark:border-[#242424] dark:bg-neutral-900/60">
                {["Campaign", "Channel", "Status", "Sent", "Opens", "Clicks", "Conv.", "Actions"].map((h) => (
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
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[0.7rem] font-medium text-foreground">
                      {c.channel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono text-muted-foreground">
                    {c.sent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono text-muted-foreground">
                    {c.opens.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono text-muted-foreground">
                    {c.clicks.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 tabular-nums font-mono font-bold text-foreground">
                    {c.conversions}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {c.status === "active" || c.status === "paused" ? (
                        <CrmButton
                          onClick={() => {
                            const next: CampaignStatus = c.status === "active" ? "paused" : "active";
                            setCampaignStatus(c.id, next);
                            showToast(`Campaign ${next === "active" ? "resumed" : "paused"}.`);
                          }}
                          className="h-8 gap-1 px-2.5 text-xs"
                        >
                          {c.status === "active" ? (
                            <>
                              <Pause className="size-3 text-amber-500" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="size-3 text-emerald-600" />
                              <span>Resume</span>
                            </>
                          )}
                        </CrmButton>
                      ) : (
                        <span className="text-[0.72rem] text-muted-foreground">Completed</span>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          deleteCampaign(c.id);
                          showToast(`Campaign "${c.name}" deleted.`, "info");
                        }}
                        className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Delete Campaign"
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

      {/* Create Campaign Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Launch New Outreach Campaign"
        description="Initiate automated email nurturing, SMS dispatch, or dialer sequence."
        maxWidth="md"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Campaign Name *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. BSP 454 Compliance & Collections AI Nurture"
              value={campaignForm.name}
              onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
              className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Channel
              </label>
              <select
                value={campaignForm.channel}
                onChange={(e) => setCampaignForm({ ...campaignForm, channel: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="Email">Email Sequence</option>
                <option value="Website Specimen + SMS">Website Specimen + SMS</option>
                <option value="Direct WebRTC Dialer">Direct WebRTC Dialer</option>
                <option value="WhatsApp / Viber Enterprise">WhatsApp / Viber Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Campaign Manager
              </label>
              <select
                value={campaignForm.owner}
                onChange={(e) => setCampaignForm({ ...campaignForm, owner: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="Malcolm Cuady">Malcolm Cuady</option>
                <option value="Rina Velasco">Rina Velasco</option>
                <option value="Aya Mendoza">Aya Mendoza</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Launch Campaign
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
