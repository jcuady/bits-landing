"use client";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";

export default function AutomationsPage() {
  const { state, setAutomationStatus } = useCrm();

  return (
    <div>
      <PageHeader title="Automations" description="Toggle workflow status for this session." />
      <ul className="space-y-3">
        {state.automations.map((a) => (
          <li key={a.id} className="flex flex-col gap-3 rounded-xl border border-linelight bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[0.92rem] font-semibold text-ink">{a.name}</p>
                <StatusBadge status={a.status} />
              </div>
              <p className="mt-1 text-[0.8rem] text-slateblue">
                Trigger: {a.trigger} · {a.runs30d} runs (30d) · {formatPct(a.successRate)} success
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAutomationStatus(a.id, a.status === "active" ? "paused" : "active")}
              className="rounded-lg border border-linelight px-3 py-1.5 text-[0.78rem] font-semibold text-ink transition hover:bg-cloud active:scale-[0.98]"
            >
              {a.status === "active" ? "Pause" : "Enable"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
