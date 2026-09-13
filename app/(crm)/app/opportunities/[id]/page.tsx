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
    <div>
      <PageHeader
        title={opp.name}
        description={companyName(state, opp.companyId)}
        actions={
          <Button asChild variant="secondary" size="sm">
            <Link href="/app/opportunities">Back</Link>
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-linelight bg-white p-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Amount" value={formatMoney(opp.amount)} />
            <Field label="Probability" value={`${opp.probability}%`} />
            <Field label="Close date" value={opp.closeDate} />
            <Field label="Owner" value={opp.owner} />
            <Field
              label="Contact"
              value={
                <Link
                  href={`/app/contacts/${opp.contactId}`}
                  className="cursor-pointer font-medium text-electric-600 hover:text-navy-700"
                >
                  {contactName(state, opp.contactId)}
                </Link>
              }
            />
            <Field
              label="Company"
              value={
                <Link
                  href={`/app/companies/${opp.companyId}`}
                  className="cursor-pointer font-medium text-electric-600 hover:text-navy-700"
                >
                  {companyName(state, opp.companyId)}
                </Link>
              }
            />
          </dl>
        </section>
        <section className="rounded-xl border border-linelight bg-white p-5">
          <p className="text-[0.75rem] font-semibold tracking-wide text-slateblue uppercase">Stage</p>
          <div className="mt-2">
            <StatusBadge status={opp.stage} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
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
            className="mt-5 inline-block cursor-pointer text-[0.85rem] font-semibold text-electric-600"
          >
            Open pipeline board →
          </Link>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.72rem] font-semibold tracking-wide text-slateblue uppercase">{label}</dt>
      <dd className="mt-1 text-[0.9rem] text-ink">{value}</dd>
    </div>
  );
}
