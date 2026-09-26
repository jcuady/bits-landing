"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { Button } from "@/components/ui/button";
import { CrmButton } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import { companyName, contactName, formatMoney } from "@/lib/crm/selectors";
import type { OpportunityStage } from "@/lib/crm/types";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const stages: OpportunityStage[] = [
  "discovery",
  "proposal",
  "negotiation",
  "closed_won",
  "closed_lost",
];

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const { state, moveOpportunity } = useCrm();
  const opp = state.opportunities.find((o) => o.id === params.id);
  if (!opp) return <EmptyState title="Opportunity not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={opp.name}
        description={companyName(state, opp.companyId)}
        actions={
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/app/opportunities">
              <ArrowLeft className="size-3.5" />
              Back to deals
            </Link>
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Deal Amount (₱ PHP)" value={<span className="font-mono font-bold text-foreground dark:text-neutral-100">{formatMoney(opp.amount)}</span>} />
            <Field label="Win Probability" value={`${opp.probability}%`} />
            <Field label="Target Close Date" value={opp.closeDate} />
            <Field label="Account Executive" value={opp.owner} />
            <Field
              label="Primary Contact"
              value={
                <Link
                  href={`/app/contacts/${opp.contactId}`}
                  className="cursor-pointer font-medium text-electric-600 hover:text-electric-500 inline-flex items-center gap-1"
                >
                  {contactName(state, opp.contactId)}
                  <ArrowUpRight className="size-3" />
                </Link>
              }
            />
            <Field
              label="Organization"
              value={
                <Link
                  href={`/app/companies/${opp.companyId}`}
                  className="cursor-pointer font-medium text-electric-600 hover:text-electric-500 inline-flex items-center gap-1"
                >
                  {companyName(state, opp.companyId)}
                  <ArrowUpRight className="size-3" />
                </Link>
              }
            />
          </dl>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
            Pipeline Stage
          </p>
          <div className="mt-3">
            <StatusBadge status={opp.stage} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {stages.map((s) => (
              <CrmButton
                key={s}
                pressed={opp.stage === s}
                onClick={() => moveOpportunity(opp.id, s)}
                className="capitalize"
              >
                {s.replace(/_/g, " ")}
              </CrmButton>
            ))}
          </div>
          <Link
            href="/app/pipelines"
            className="mt-6 inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-electric-600 hover:text-electric-500"
          >
            Open Kanban Pipeline Board →
          </Link>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: ReactNode }) {
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
