"use client";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";

export default function FormsPage() {
  const { state } = useCrm();

  return (
    <div>
      <PageHeader title="Forms" description="Published and draft capture forms." />
      <div className="overflow-x-auto rounded-xl border border-linelight bg-white">
        <table className="w-full min-w-[640px] text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-linelight bg-cloud/70">
              {["Form", "Status", "Fields", "Submissions (30d)", "Conversion"].map((h) => (
                <th key={h} className="px-3.5 py-2.5 text-[0.7rem] font-semibold tracking-wide text-slateblue uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.forms.map((f) => (
              <tr key={f.id} className="border-t border-linelight">
                <td className="px-3.5 py-3 font-semibold text-ink">{f.name}</td>
                <td className="px-3.5 py-3">
                  <StatusBadge status={f.status} />
                </td>
                <td className="px-3.5 py-3 tabular-nums">{f.fields}</td>
                <td className="px-3.5 py-3 tabular-nums">{f.submissions30d}</td>
                <td className="px-3.5 py-3 tabular-nums">{formatPct(f.conversionRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
