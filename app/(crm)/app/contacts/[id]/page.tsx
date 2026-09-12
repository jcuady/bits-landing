"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/crm/page-header";
import { EmptyState } from "@/components/crm/empty-state";
import { Button } from "@/components/ui/button";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatRelative } from "@/lib/crm/selectors";

export default function ContactDetailPage() {
  const params = useParams<{ id: string }>();
  const { state } = useCrm();
  const contact = state.contacts.find((c) => c.id === params.id);
  if (!contact) return <EmptyState title="Contact not found" />;

  return (
    <div>
      <PageHeader
        title={contact.name}
        description={contact.title}
        actions={
          <Button asChild variant="secondary" size="sm">
            <Link href="/app/contacts">Back</Link>
          </Button>
        }
      />
      <section className="rounded-xl border border-linelight bg-white p-5">
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={contact.email} />
          <Field label="Phone" value={contact.phone} />
          <Field label="Company" value={companyName(state, contact.companyId)} />
          <Field label="Owner" value={contact.owner} />
          <Field label="Last touch" value={formatRelative(contact.lastTouchAt)} />
          <Field label="Tags" value={contact.tags.join(", ")} />
        </dl>
        <div className="mt-5">
          <Link href={`/app/companies/${contact.companyId}`} className="text-[0.88rem] font-semibold text-electric-600 hover:text-navy-700">
            View company →
          </Link>
        </div>
      </section>
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
