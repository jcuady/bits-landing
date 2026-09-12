"use client";

import { PageHeader } from "@/components/crm/page-header";
import { useCrm } from "@/lib/crm/store";
import { formatMoney, pipelineByStage } from "@/lib/crm/selectors";

export default function ReportsPage() {
  const { state } = useCrm();
  const byStage = pipelineByStage(state);
  const max = Math.max(...byStage.map((s) => s.amount), 1);
  const weekly = [42, 55, 48, 61, 58, 72, 68];
  const maxW = Math.max(...weekly);

  return (
    <div>
      <PageHeader title="Reports" description="Pipeline and activity trends (SVG/CSS charts)." />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Pipeline by stage</h2>
          <ul className="mt-4 space-y-3">
            {byStage.map((row) => (
              <li key={row.stageId}>
                <div className="mb-1 flex justify-between text-[0.8rem]">
                  <span className="font-medium text-ink">{row.stage}</span>
                  <span className="tabular-nums text-slateblue">{formatMoney(row.amount)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-cloud">
                  <div
                    className="h-full rounded-full bg-electric-600"
                    style={{ width: `${(row.amount / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Activity volume (7d)</h2>
          <p className="mt-0.5 text-[0.78rem] text-slateblue">Touches logged per day</p>
          <svg viewBox="0 0 280 120" className="mt-4 w-full" role="img" aria-label="Activity line chart">
            <polyline
              fill="none"
              stroke="#0063DB"
              strokeWidth="2.5"
              points={weekly
                .map((v, i) => {
                  const x = 20 + i * 40;
                  const y = 100 - (v / maxW) * 80;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
            {weekly.map((v, i) => {
              const x = 20 + i * 40;
              const y = 100 - (v / maxW) * 80;
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#0A2B6F" />;
            })}
          </svg>
          <div className="mt-1 flex justify-between px-1 text-[0.7rem] text-slateblue">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </section>
      </div>
    </div>
  );
}
