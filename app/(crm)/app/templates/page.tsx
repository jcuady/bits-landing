"use client";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";

export default function TemplatesPage() {
  const { state } = useCrm();

  return (
    <div>
      <PageHeader title="Templates" description="Email and SMS message templates." />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {state.templates.map((t) => (
          <li key={t.id} className="rounded-xl border border-linelight bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-[0.92rem] font-semibold text-ink">{t.name}</h2>
              <StatusBadge status={t.channel} label={t.channel.toUpperCase()} />
            </div>
            <p className="mt-2 text-[0.8rem] text-slateblue">{t.category}</p>
            <p className="mt-3 text-[0.78rem] text-slateblue">
              Updated {t.updatedAt} · Used {t.usage30d}× in 30d
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
