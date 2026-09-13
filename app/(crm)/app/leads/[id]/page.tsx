"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { Button } from "@/components/ui/button";
import { CrmButton } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { formatDate } from "@/lib/crm/selectors";
import type { LeadStatus } from "@/lib/crm/types";

const statuses: LeadStatus[] = ["new", "working", "qualified", "disqualified"];

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  const { state, updateLeadStatus } = useCrm();
  const lead = state.leads.find((l) => l.id === params.id);
  if (!lead) return <EmptyState title="Lead not found" />;

  return (
    <div>
      <PageHeader
        title={lead.name}
        description={`${lead.title} · ${lead.company}`}
        actions={
          <Button asChild variant="secondary" size="sm">
            <Link href="/app/leads">Back to leads</Link>
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-linelight bg-white p-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" value={lead.email} />
            <Field label="Source" value={lead.source} />
            <Field label="Owner" value={lead.owner} />
            <Field label="Score" value={String(lead.score)} />
            <Field label="Created" value={formatDate(lead.createdAt)} />
            <Field label="Last activity" value={formatDate(lead.lastActivityAt)} />
          </dl>
          <div className="mt-5 border-t border-linelight pt-4">
            <p className="text-[0.75rem] font-semibold tracking-wide text-slateblue uppercase">Notes</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">{lead.notes}</p>
          </div>
        </section>
        <section className="rounded-xl border border-linelight bg-white p-5">
          <p className="text-[0.75rem] font-semibold tracking-wide text-slateblue uppercase">Status</p>
          <div className="mt-2">
            <StatusBadge status={lead.status} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {statuses.map((s) => (
              <CrmButton
                key={s}
                pressed={lead.status === s}
                onClick={() => updateLeadStatus(lead.id, s)}
              >
                {s}
              </CrmButton>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.72rem] font-semibold tracking-wide text-slateblue uppercase">{label}</dt>
      <dd className="mt-1 text-[0.9rem] text-ink">{value}</dd>
    </div>
  );
}
