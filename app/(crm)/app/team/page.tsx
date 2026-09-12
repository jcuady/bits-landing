"use client";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";

export default function TeamPage() {
  const { state } = useCrm();

  return (
    <div>
      <PageHeader title="Team" description="Workspace roster and role badges." />
      <div className="overflow-x-auto rounded-xl border border-linelight bg-white">
        <table className="w-full min-w-[640px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-linelight bg-cloud/70">
              {["Name", "Email", "Role", "Open deals", "Closed won (30d)"].map((h) => (
                <th key={h} className="px-3.5 py-2.5 text-[0.7rem] font-semibold tracking-wide text-slateblue uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.team.map((m) => (
              <tr key={m.id} className="border-t border-linelight">
                <td className="px-3.5 py-3 font-semibold text-ink">{m.name}</td>
                <td className="px-3.5 py-3 text-slateblue">{m.email}</td>
                <td className="px-3.5 py-3">
                  <StatusBadge status={m.role} />
                </td>
                <td className="px-3.5 py-3 tabular-nums">{m.openDeals}</td>
                <td className="px-3.5 py-3 tabular-nums">{formatMoney(m.closedWon30d)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
