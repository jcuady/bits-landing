"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Trash2, Globe, MapPin } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { DataTable } from "@/components/crm/data-table";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";

export default function CompaniesPage() {
  const { state, addCompany, deleteCompany } = useCrm();
  const { showToast } = useToast();

  const [q, setQ] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New Company Form State
  const [companyForm, setCompanyForm] = React.useState({
    name: "",
    domain: "",
    industry: "Banking & Consumer Finance",
    employees: 250,
    arrEstimate: 1500000,
    owner: "Malcolm Cuady",
    location: "Ortigas Center, Pasig City",
  });

  const rows = state.companies.filter((c) => {
    const hay = `${c.name} ${c.domain} ${c.industry} ${c.location}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyForm.name.trim() || !companyForm.domain.trim()) {
      showToast("Company name and domain are required.", "error");
      return;
    }

    addCompany({
      name: companyForm.name.trim(),
      domain: companyForm.domain.trim(),
      industry: companyForm.industry,
      employees: Number(companyForm.employees) || 100,
      arrEstimate: Number(companyForm.arrEstimate) || 1000000,
      owner: companyForm.owner,
      location: companyForm.location.trim() || "Metro Manila, Philippines",
    });

    showToast(`Company account "${companyForm.name}" registered.`);
    setIsModalOpen(false);
    setCompanyForm({
      name: "",
      domain: "",
      industry: "Banking & Consumer Finance",
      employees: 250,
      arrEstimate: 1500000,
      owner: "Malcolm Cuady",
      location: "Ortigas Center, Pasig City",
    });
  };

  return (
    <div>
      <PageHeader
        title="Companies"
        description={`${state.companies.length} institutional accounts, enterprise partners, and clients.`}
        actions={
          <CrmButton
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Company</span>
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search companies by name, domain, industry, or location…" />

      {rows.length === 0 ? (
        <EmptyState
          title="No companies match"
          description="Try another search query or register a new company account."
          action={
            <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Add First Company
            </CrmButton>
          }
        />
      ) : (
        <DataTable
          rows={rows}
          columns={[
            {
              key: "name",
              header: "Company Account",
              cell: (r) => (
                <div className="flex flex-col">
                  <Link
                    href={`/app/companies/${r.id}`}
                    className="font-bold text-foreground hover:text-[#1975f2] transition-colors"
                  >
                    {r.name}
                  </Link>
                  <span className="text-[0.68rem] text-muted-foreground flex items-center gap-1">
                    <Globe className="size-3" />
                    {r.domain}
                  </span>
                </div>
              ),
            },
            {
              key: "industry",
              header: "Industry",
              cell: (r) => (
                <span className="rounded-md bg-muted px-2 py-0.5 text-[0.7rem] font-medium text-foreground">
                  {r.industry}
                </span>
              ),
            },
            {
              key: "employees",
              header: "Employees",
              className: "tabular-nums font-mono text-muted-foreground",
              cell: (r) => r.employees.toLocaleString(),
            },
            {
              key: "arr",
              header: "ARR Estimate (₱)",
              className: "tabular-nums font-mono font-bold text-foreground",
              cell: (r) => formatMoney(r.arrEstimate),
            },
            {
              key: "location",
              header: "Location",
              cell: (r) => (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3 shrink-0" />
                  {r.location}
                </span>
              ),
            },
            {
              key: "owner",
              header: "Account Lead",
              cell: (r) => r.owner,
            },
            {
              key: "actions",
              header: "Actions",
              className: "text-right",
              cell: (r) => (
                <button
                  type="button"
                  onClick={() => {
                    deleteCompany(r.id);
                    showToast(`Company "${r.name}" deleted.`, "info");
                  }}
                  className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Delete Company"
                >
                  <Trash2 className="size-3.5" />
                </button>
              ),
            },
          ]}
        />
      )}

      {/* Create Company Modal */}
      <CrmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Company Account"
        description="Add a banking, enterprise, or BPO account with revenue estimate in Philippine Pesos (₱)."
        maxWidth="md"
      >
        <form onSubmit={handleCreateCompany} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Company Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Maya Bank / Voyager Innovations"
                value={companyForm.name}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Website Domain *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. voyager.ph"
                value={companyForm.domain}
                onChange={(e) => setCompanyForm({ ...companyForm, domain: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Industry Sector
              </label>
              <select
                value={companyForm.industry}
                onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 cursor-pointer"
              >
                <option value="Banking & Consumer Finance">Banking &amp; Consumer Finance</option>
                <option value="Digital Banking & FinTech">Digital Banking &amp; FinTech</option>
                <option value="BPO & Omnichannel Contact Center">BPO &amp; Omnichannel Contact Center</option>
                <option value="E-Commerce & BNPL Lending">E-Commerce &amp; BNPL Lending</option>
                <option value="Supply Chain & Logistics">Supply Chain &amp; Logistics</option>
                <option value="Insurance & Healthcare">Insurance &amp; Healthcare</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Estimated ARR in Pesos (₱) *
              </label>
              <input
                required
                type="number"
                min={100000}
                step={100000}
                value={companyForm.arrEstimate}
                onChange={(e) =>
                  setCompanyForm({ ...companyForm, arrEstimate: Number(e.target.value) })
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900 font-mono"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Employee Headcount
              </label>
              <input
                type="number"
                min={1}
                value={companyForm.employees}
                onChange={(e) =>
                  setCompanyForm({ ...companyForm, employees: Number(e.target.value) })
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Office / Hub Location
              </label>
              <input
                type="text"
                placeholder="e.g. BGC, Taguig City"
                value={companyForm.location}
                onChange={(e) => setCompanyForm({ ...companyForm, location: e.target.value })}
                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-[#1975f2] dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80 dark:border-[#222]">
            <CrmButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Register Company
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
