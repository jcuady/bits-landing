"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/crm/page-header";
import { EmptyState } from "@/components/crm/empty-state";
import { Button } from "@/components/ui/button";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";

export default function CompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const { state } = useCrm();
  const company = state.companies.find((c) => c.id === params.id);
  if (!company) return <EmptyState title="Company not found" />;

  const contacts = state.contacts.filter((c) => c.companyId === company.id);
  const opps = state.opportunities.filter((o) => o.companyId === company.id);

  return (
    <div>
      <PageHeader
        title={company.name}
        description={company.domain}
        actions={
          <Button asChild variant="secondary" size="sm">
            <Link href="/app/companies">Back</Link>
          </Button>
        }
      />
      <section className="rounded-xl border border-linelight bg-white p-5">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Industry" value={company.industry} />
          <Field label="Employees" value={company.employees.toLocaleString()} />
          <Field label="ARR estimate" value={formatMoney(company.arrEstimate)} />
          <Field label="Location" value={company.location} />
          <Field label="Owner" value={company.owner} />
        </dl>
      </section>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.88rem] font-semibold text-ink">Contacts</h2>
          <ul className="mt-3 space-y-2">
            {contacts.map((c) => (
              <li key={c.id}>
                <Link href={`/app/contacts/${c.id}`} className="text-[0.88rem] font-medium text-electric-600 hover:text-navy-700">
                  {c.name}
                </Link>
                <span className="text-[0.8rem] text-slateblue"> · {c.title}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.88rem] font-semibold text-ink">Opportunities</h2>
          <ul className="mt-3 space-y-2">
            {opps.map((o) => (
              <li key={o.id} className="flex justify-between gap-2">
                <Link href={`/app/opportunities/${o.id}`} className="text-[0.88rem] font-medium text-electric-600 hover:text-navy-700">
                  {o.name}
                </Link>
                <span className="text-[0.8rem] tabular-nums text-slateblue">{formatMoney(o.amount)}</span>
              </li>
            ))}
          </ul>
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
