"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import type { CampaignStatus } from "@/lib/crm/types";

export default function CampaignsPage() {
  const { state, setCampaignStatus } = useCrm();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const rows = state.campaigns.filter((c) => {
    const hay = `${c.name} ${c.channel} ${c.owner}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || c.status === status);
  });

  return (
    <div>
      <PageHeader title="Campaigns" description="Enable or pause mock campaigns." />
      <FilterBar value={q} onChange={setQ} placeholder="Search campaigns…">
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
        <EmptyState title="No campaigns match" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-linelight bg-white">
          <table className="w-full min-w-[720px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-linelight bg-cloud/70">
                {["Campaign", "Channel", "Status", "Sent", "Opens", "Clicks", "Conv.", "Action"].map((h) => (
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
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-linelight">
                  <td className="px-3.5 py-3 font-semibold text-ink">{c.name}</td>
                  <td className="px-3.5 py-3 text-slateblue">{c.channel}</td>
                  <td className="px-3.5 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-3.5 py-3 tabular-nums">{c.sent.toLocaleString()}</td>
                  <td className="px-3.5 py-3 tabular-nums">{c.opens.toLocaleString()}</td>
                  <td className="px-3.5 py-3 tabular-nums">{c.clicks.toLocaleString()}</td>
                  <td className="px-3.5 py-3 tabular-nums">{c.conversions}</td>
                  <td className="px-3.5 py-3">
                    {c.status === "active" || c.status === "paused" ? (
                      <CrmButton
                        onClick={() => {
                          const next: CampaignStatus = c.status === "active" ? "paused" : "active";
                          setCampaignStatus(c.id, next);
                        }}
                      >
                        {c.status === "active" ? "Pause" : "Enable"}
                      </CrmButton>
                    ) : (
                      <span className="text-[0.78rem] text-slateblue">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-[0.78rem] text-slateblue">
        Open rate sample:{" "}
        {formatPct(state.campaigns[0] ? state.campaigns[0].opens / state.campaigns[0].sent : 0)} on top
        campaign.
      </p>
    </div>
  );
}
