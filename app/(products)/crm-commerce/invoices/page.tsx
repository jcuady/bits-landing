"use client";

import * as React from "react";
import { useCommerce } from "@/lib/products/crm-commerce/store";
import {
  INVOICE_STATUS_TONE,
  PAYMENT_METHOD_LABEL,
  DUNNING_SCHEDULE,
  invoiceGross,
} from "@/lib/products/crm-commerce/types";
import { Receipt, Search } from "lucide-react";
import {
  PageHeader,
  Panel,
  DemoButton,
  DemoDataBanner,
  DemoTable,
  StatusPill,
  EmptyState,
  inputClass,
  peso,
} from "@/components/products/demo-ui";

export default function InvoicesPage() {
  const { invoices, setInvoiceStatus, recordPayment, advanceDunning } = useCommerce();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return invoices;
    return invoices.filter(
      (i) =>
        i.id.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q) ||
        i.customer.toLowerCase().includes(q)
    );
  }, [invoices, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Every invoice carries 12% BIR VAT separately so the tax line is auditable."
      />

      <DemoDataBanner note="synthetic invoice records for evaluation. No real billing occurs." />

      <Panel className="p-4">
        <div className="relative w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-300/50"
            aria-hidden
          />
          <input
            type="search"
            aria-label="Search invoices"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search invoice ID, company, customer…"
            className={`${inputClass} pl-9`}
          />
        </div>
      </Panel>

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="No invoices match your search"
            body="Try a different invoice number, company name or customer."
          />
        ) : (
          <DemoTable head={["Invoice", "Customer", "Net", "VAT 12%", "Due", "Status", "Actions"]}>
            {filtered.map((i) => (
              <tr key={i.id} className="transition hover:bg-white/5">
                <td className="px-4 py-3.5">
                  <span className="block font-mono text-xs text-sky-200/80">{i.id}</span>
                  <span className="text-xs text-sky-200/60">{PAYMENT_METHOD_LABEL[i.method]}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="block text-sm font-medium text-white">{i.company}</span>
                  <span className="text-xs text-sky-200/70">{i.customer}</span>
                </td>
                <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-white">{peso(i.net)}</td>
                <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-sky-200">{peso(i.vat)}</td>
                <td className="px-4 py-3.5 text-xs text-sky-200/80">{i.dueOn}</td>
                <td className="px-4 py-3.5">
                  <StatusPill tone={INVOICE_STATUS_TONE[i.status]}>{i.status}</StatusPill>
                  {i.status === "overdue" && (
                    <p className="mt-1 text-[11px] text-amber-200">
                      {DUNNING_SCHEDULE[i.dunningStage]?.label}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1.5">
                    {i.status !== "paid" && (
                      <>
                        <DemoButton onClick={() => recordPayment(i.id)}>Mark paid</DemoButton>
                        {i.status === "overdue" && (
                          <DemoButton onClick={() => advanceDunning(i.id)}>Escalate</DemoButton>
                        )}
                      </>
                    )}
                    {i.status === "draft" && (
                      <DemoButton
                        onClick={() => setInvoiceStatus(i.id, "open")}
                        variant="primary"
                      >
                        Issue
                      </DemoButton>
                    )}
                    {i.status === "paid" && (
                      <span className="text-xs text-emerald-300">Settled</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </DemoTable>
        )}
      </Panel>
    </div>
  );
}