"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Trash2, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { companyName, formatRelative } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";

export default function ContactsPage() {
  const { state, addContact, deleteContact } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Contact Form State
  const [contactForm, setContactForm] = React.useState({
    name: "",
    title: "",
    email: "",
    phone: "+63 917 ",
    companyId: state.companies[0]?.id ?? "co-1",
    owner: "Malcolm Cuady",
    tags: ["decision-maker"],
  });

  const rows = state.contacts.filter((c) => {
    const hay = `${c.name} ${c.email} ${c.title} ${companyName(state, c.companyId)}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim()) {
      showToast("Name and email are required.", "error");
      return;
    }

    addContact({
      name: contactForm.name.trim(),
      title: contactForm.title.trim() || "Executive",
      email: contactForm.email.trim(),
      phone: contactForm.phone.trim(),
      companyId: contactForm.companyId,
      owner: contactForm.owner,
      tags: contactForm.tags,
    });

    showToast(`Contact "${contactForm.name}" registered.`);
    setIsModalOpen(false);
    setContactForm({
      name: "",
      title: "",
      email: "",
      phone: "+63 917 ",
      companyId: state.companies[0]?.id ?? "co-1",
      owner: "Malcolm Cuady",
      tags: ["decision-maker"],
    });
  };

  return (
    <div>
      <PageHeader
        title="Contacts"
        description={`${state.contacts.length} decision-makers, engineers, and key stakeholders across accounts.`}
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Contact</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search contacts by name, email, title, or company…" />

      {rows.length === 0 ? (
        <EmptyState
          title="No contacts match"
          description="Try searching with different terms or add a new key stakeholder."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Add First Contact
            </CrmButton>
          }
        />
      ) : (
        <DataTable
          rows={rows}
          columns={[
            {
              key: "name",
              header: "Contact Name",
              cell: (r) => (
                <div className="flex flex-col">
                  <Link
                    href={`/app/contacts/${r.id}`}
                    className="font-bold text-foreground hover:text-[#1975f2] transition-colors"
                  >
                    {r.name}
                  </Link>
                  <span className="text-[0.68rem] text-muted-foreground">{r.title}</span>
                </div>
              ),
            },
            {
              key: "company",
              header: "Company Account",
              cell: (r) => (
                <span className="font-semibold text-foreground">
                  {companyName(state, r.companyId)}
                </span>
              ),
            },
            {
              key: "email",
              header: "Direct Email",
              cell: (r) => (
                <a
                  href={`mailto:${r.email}`}
                  className="flex items-center gap-1 text-muted-foreground hover:text-[#1975f2] transition-colors"
                >
                  <Mail className="size-3 shrink-0" />
                  <span>{r.email}</span>
                </a>
              ),
            },
            {
              key: "phone",
              header: "Mobile / Phone",
              cell: (r) => (
                <span className="flex items-center gap-1 font-mono text-muted-foreground">
                  <Phone className="size-3 shrink-0" />
                  {r.phone}
                </span>
              ),
            },
            {
              key: "touch",
              header: "Last Touch",
              cell: (r) => formatRelative(r.lastTouchAt),
            },
            {
              key: "actions",
              header: "Actions",
              className: "text-right",
              cell: (r) => (
                <button
                  type="button"
                  onClick={() => {
                    deleteContact(r.id);
                    showToast(`Contact "${r.name}" deleted.`, "info");
                  }}
                  className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Delete Contact"
                >
                  <Trash2 className="size-3.5" />
                </button>
              ),
            },
          ]}
        />
      )}

      {/* Create Contact Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Institutional Contact"
        description="Register a key stakeholder, VP, collections officer, or technical engineer."
        maxWidth="md"
      >
        <form onSubmit={handleCreateContact} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Patricia Reyes"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Corporate Designation / Title
              </label>
              <input
                type="text"
                placeholder="e.g. Head of Merchant Risk"
                value={contactForm.title}
                onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Email Address *
              </label>
              <input
                required
                type="email"
                placeholder="e.g. patricia.reyes@voyager.ph"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="+63 917 552 1190"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Company Account *
              </label>
              <select
                value={contactForm.companyId}
                onChange={(e) => setContactForm({ ...contactForm, companyId: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                {state.companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Account Manager
              </label>
              <select
                value={contactForm.owner}
                onChange={(e) => setContactForm({ ...contactForm, owner: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="Malcolm Cuady">Malcolm Cuady</option>
                <option value="Rina Velasco">Rina Velasco</option>
                <option value="Aya Mendoza">Aya Mendoza</option>
                <option value="Jonas Park">Jonas Park</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Register Contact
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
