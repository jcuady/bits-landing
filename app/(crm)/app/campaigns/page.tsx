"use client";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import type { CampaignStatus } from "@/lib/crm/types";

export default function CampaignsPage() {
  const { state, setCampaignStatus } = useCrm();

  return (
    <div>
      <PageHeader title="Campaigns" description="Enable or pause mock campaigns." />
      <div className="overflow-x-auto rounded-xl border border-linelight bg-white">
        <table className="w-full min-w-[720px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-linelight bg-cloud/70">
              {["Campaign", "Channel", "Status", "Sent", "Opens", "Clicks", "Conv.", ""].map((h) => (
                <th key={h} className="px-3.5 py-2.5 text-[0.7rem] font-semibold tracking-wide text-slateblue uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.campaigns.map((c) => (
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
                  <button
                    type="button"
                    onClick={() => {
                      const next: CampaignStatus =
                        c.status === "active" ? "paused" : c.status === "paused" ? "active" : c.status;
                      if (next !== c.status) setCampaignStatus(c.id, next);
                    }}
                    disabled={c.status === "completed" || c.status === "draft"}
                    className="rounded-lg border border-linelight px-2.5 py-1 text-[0.75rem] font-semibold disabled:opacity-40"
                  >
                    {c.status === "active" ? "Pause" : c.status === "paused" ? "Enable" : "—"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[0.78rem] text-slateblue">
        Open rate sample: {formatPct(state.campaigns[0] ? state.campaigns[0].opens / state.campaigns[0].sent : 0)} on top campaign.
      </p>
    </div>
  );
}
