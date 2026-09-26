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
import { ArrowLeft } from "lucide-react";

const statuses: LeadStatus[] = ["new", "working", "qualified", "disqualified"];

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  const { state, updateLeadStatus } = useCrm();
  const lead = state.leads.find((l) => l.id === params.id);
  if (!lead) return <EmptyState title="Lead not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={lead.name}
        description={`${lead.title} · ${lead.company}`}
        actions={
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/app/leads">
              <ArrowLeft className="size-3.5" />
              Back to leads
            </Link>
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Work Email" value={lead.email} />
            <Field label="Inbound Source" value={lead.source} />
            <Field label="Account Executive" value={lead.owner} />
            <Field label="Intent Score" value={`${lead.score} / 100`} />
            <Field label="Registration Date" value={formatDate(lead.createdAt)} />
            <Field label="Last Touch Activity" value={formatDate(lead.lastActivityAt)} />
          </dl>
          <div className="mt-6 border-t border-border pt-4 dark:border-neutral-800">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
              Operational Scope & Notes
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground dark:text-neutral-200">
              {lead.notes || "No special instructions provided on intake form."}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
            Lifecycle Status
          </p>
          <div className="mt-3">
            <StatusBadge status={lead.status} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {statuses.map((s) => (
              <CrmButton
                key={s}
                pressed={lead.status === s}
                onClick={() => updateLeadStatus(lead.id, s)}
                className="capitalize"
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
      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground dark:text-neutral-100">
        {value}
      </dd>
    </div>
  );
}
