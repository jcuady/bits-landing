"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/crm/page-header";
import { EmptyState } from "@/components/crm/empty-state";
import { StatusBadge } from "@/components/crm/status-badge";
import { Button } from "@/components/ui/button";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Globe,
  Users,
  MapPin,
  User,
  ExternalLink,
  Coins,
  TrendingUp,
} from "lucide-react";

export default function CompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const { state } = useCrm();
  const company = state.companies.find((c) => c.id === params.id);
  if (!company) return <EmptyState title="Company not found" />;

  const contacts = state.contacts.filter((c) => c.companyId === company.id);
  const opps = state.opportunities.filter((o) => o.companyId === company.id);
  const totalPipeline = opps.reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={company.name}
        description={`${company.industry} · ${company.location}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/app/companies">
                <ArrowLeft className="size-3.5" />
                Back to companies
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="gap-1.5">
              <a
                href={company.domain.startsWith("http") ? company.domain : `https://${company.domain}`}
                target="_blank"
                rel="noreferrer"
              >
                <Globe className="size-3.5 text-electric-600" />
                <span>Visit Website</span>
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            </Button>
          </div>
        }
      />

      {/* Account Overview Grid */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
        <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400 mb-4">
          Enterprise Profile
        </h2>
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            icon={<Building2 className="size-3.5 text-muted-foreground" />}
            label="Industry Sector"
            value={company.industry}
          />
          <Field
            icon={<Globe className="size-3.5 text-muted-foreground" />}
            label="Corporate Domain"
            value={
              <a
                href={company.domain.startsWith("http") ? company.domain : `https://${company.domain}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-electric-600 hover:text-electric-500 dark:text-blue-400 inline-flex items-center gap-1"
              >
                {company.domain}
                <ArrowUpRight className="size-3" />
              </a>
            }
          />
          <Field
            icon={<Users className="size-3.5 text-muted-foreground" />}
            label="Workforce Size"
            value={`${company.employees.toLocaleString()} employees`}
          />
          <Field
            icon={<Coins className="size-3.5 text-emerald-600 dark:text-emerald-400" />}
            label="Estimated Annual Run-Rate (ARR)"
            value={
              <span className="font-mono font-bold text-foreground dark:text-neutral-100">
                {formatMoney(company.arrEstimate)}
              </span>
            }
          />
          <Field
            icon={<MapPin className="size-3.5 text-muted-foreground" />}
            label="Primary Headquarter"
            value={company.location}
          />
          <Field
            icon={<User className="size-3.5 text-muted-foreground" />}
            label="Assigned BITS Lead"
            value={company.owner}
          />
        </dl>
      </section>

      {/* Two Column Layout: Key Contacts & Associated Pipeline */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Associated Contacts */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
              Account Stakeholders ({contacts.length})
            </h2>
            <Link
              href="/app/contacts"
              className="text-xs font-semibold text-electric-600 hover:text-electric-500 dark:text-blue-400"
            >
              All contacts
            </Link>
          </div>

          {contacts.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground dark:text-neutral-400">
              No contacts currently registered for this company.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border dark:divide-neutral-800">
              {contacts.map((c) => (
                <li key={c.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div>
                    <Link
                      href={`/app/contacts/${c.id}`}
                      className="text-sm font-medium text-foreground hover:text-electric-600 dark:text-neutral-100 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                    >
                      {c.name}
                      <ArrowUpRight className="size-3" />
                    </Link>
                    <p className="text-xs text-muted-foreground dark:text-neutral-400">
                      {c.title} · <span className="font-mono">{c.phone}</span>
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="h-7 px-2.5 text-xs">
                    <a href={`mailto:${c.email}`}>Email</a>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Associated Opportunities */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
                Pipeline Deals ({opps.length})
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-muted-foreground dark:text-neutral-400">
              Total: {formatMoney(totalPipeline)}
            </span>
          </div>

          {opps.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground dark:text-neutral-400">
              No active pipeline deals mapped to this company.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border dark:divide-neutral-800">
              {opps.map((o) => (
                <li key={o.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div>
                    <Link
                      href={`/app/opportunities/${o.id}`}
                      className="text-sm font-medium text-foreground hover:text-electric-600 dark:text-neutral-100 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                    >
                      {o.name}
                      <ArrowUpRight className="size-3" />
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge status={o.stage} />
                      <span className="text-xs text-muted-foreground dark:text-neutral-400">
                        {o.probability}% win probability
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-foreground dark:text-neutral-100">
                      {formatMoney(o.amount)}
                    </span>
                    <p className="text-[0.7rem] text-muted-foreground dark:text-neutral-400">
                      Close: {o.closeDate}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400 flex items-center gap-1.5">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground dark:text-neutral-100">
        {value}
      </dd>
    </div>
  );
}
