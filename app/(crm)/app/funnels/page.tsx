"use client";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";

export default function FunnelsPage() {
  const { state } = useCrm();

  return (
    <div>
      <PageHeader title="Funnels" description="Conversion paths with step drop-off." />
      <div className="grid gap-4 lg:grid-cols-2">
        {state.funnels.map((f) => {
          const max = f.steps[0]?.visitors ?? 1;
          return (
            <section key={f.id} className="rounded-xl border border-linelight bg-white p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-[0.95rem] font-semibold text-ink">{f.name}</h2>
                  <p className="mt-0.5 text-[0.8rem] text-slateblue">
                    Overall conversion {formatPct(f.conversionRate)}
                  </p>
                </div>
                <StatusBadge status={f.status} />
              </div>
              <ul className="mt-4 space-y-3">
                {f.steps.map((step) => (
                  <li key={step.label}>
                    <div className="mb-1 flex justify-between text-[0.8rem]">
                      <span className="font-medium text-ink">{step.label}</span>
                      <span className="tabular-nums text-slateblue">{step.visitors.toLocaleString()}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-cloud">
                      <div
                        className="h-full rounded-full bg-navy-700"
                        style={{ width: `${(step.visitors / max) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
