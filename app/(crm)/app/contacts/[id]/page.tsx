"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/crm/page-header";
import { EmptyState } from "@/components/crm/empty-state";
import { Button } from "@/components/ui/button";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatRelative, formatMoney } from "@/lib/crm/selectors";
import { ArrowLeft, ArrowUpRight, Mail, Phone, Building2, User, Clock, Tag } from "lucide-react";

export default function ContactDetailPage() {
  const params = useParams<{ id: string }>();
  const { state } = useCrm();
  const contact = state.contacts.find((c) => c.id === params.id);
  if (!contact) return <EmptyState title="Contact not found" />;

  const relatedCompany = state.companies.find((c) => c.id === contact.companyId);
  const relatedOpps = state.opportunities.filter((o) => o.contactId === contact.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={contact.name}
        description={`${contact.title} · ${companyName(state, contact.companyId)}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/app/contacts">
                <ArrowLeft className="size-3.5" />
                Back to contacts
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" className="gap-1.5 bg-electric-600 hover:bg-electric-500 text-white">
              <a href={`mailto:${contact.email}`}>
                <Mail className="size-3.5" />
                Email Contact
              </a>
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Core Profile Card */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400 mb-4">
            Stakeholder Information
          </h2>
          <dl className="grid gap-5 sm:grid-cols-2">
            <Field
              icon={<Mail className="size-3.5 text-muted-foreground" />}
              label="Work Email"
              value={
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-electric-600 hover:text-electric-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {contact.email}
                </a>
              }
            />
            <Field
              icon={<Phone className="size-3.5 text-muted-foreground" />}
              label="Direct Phone"
              value={<span className="font-mono">{contact.phone}</span>}
            />
            <Field
              icon={<Building2 className="size-3.5 text-muted-foreground" />}
              label="Organization"
              value={
                <Link
                  href={`/app/companies/${contact.companyId}`}
                  className="font-medium text-electric-600 hover:text-electric-500 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                >
                  {companyName(state, contact.companyId)}
                  <ArrowUpRight className="size-3" />
                </Link>
              }
            />
            <Field
              icon={<User className="size-3.5 text-muted-foreground" />}
              label="Account Lead"
              value={contact.owner}
            />
            <Field
              icon={<Clock className="size-3.5 text-muted-foreground" />}
              label="Last Touch"
              value={formatRelative(contact.lastTouchAt)}
            />
            <Field
              icon={<Tag className="size-3.5 text-muted-foreground" />}
              label="Tags"
              value={
                <div className="flex flex-wrap gap-1 mt-1">
                  {contact.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              }
            />
          </dl>

          {relatedCompany && (
            <div className="mt-6 border-t border-border pt-4 dark:border-neutral-800">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
                Company Scope
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-foreground dark:text-neutral-200">
                <div>
                  <span className="font-medium">{relatedCompany.name}</span>
                  <span className="text-muted-foreground dark:text-neutral-400"> · {relatedCompany.industry} · {relatedCompany.location}</span>
                </div>
                <Link
                  href={`/app/companies/${relatedCompany.id}`}
                  className="text-xs font-semibold text-electric-600 hover:text-electric-500 dark:text-blue-400 inline-flex items-center gap-1"
                >
                  View full company profile
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Associated Opportunities & Engagement Card */}
        <section className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400">
                Associated Deals ({relatedOpps.length})
              </h2>
              <Link
                href="/app/opportunities"
                className="text-xs font-semibold text-electric-600 hover:text-electric-500 dark:text-blue-400"
              >
                View all deals
              </Link>
            </div>

            {relatedOpps.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground dark:text-neutral-400">
                No active deals currently mapped to this contact.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border dark:divide-neutral-800">
                {relatedOpps.map((opp) => (
                  <li key={opp.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div>
                      <Link
                        href={`/app/opportunities/${opp.id}`}
                        className="text-sm font-medium text-foreground hover:text-electric-600 dark:text-neutral-100 dark:hover:text-blue-400 transition-colors"
                      >
                        {opp.name}
                      </Link>
                      <p className="text-xs text-muted-foreground dark:text-neutral-400 capitalize">
                        Stage: {opp.stage.replace(/_/g, " ")} · {opp.probability}%
                      </p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-foreground dark:text-neutral-100">
                      {formatMoney(opp.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400 mb-3">
              Quick Interaction
            </h2>
            <div className="flex flex-col gap-2.5">
              <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                <Link href="/app/conversations">
                  <Mail className="size-4 text-electric-600" />
                  <span>Open Omnichannel Inbox</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                <Link href="/app/tasks">
                  <Clock className="size-4 text-emerald-600" />
                  <span>Schedule Task / Follow-up</span>
                </Link>
              </Button>
            </div>
          </div>
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
