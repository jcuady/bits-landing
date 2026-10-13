"use client";

import * as React from "react";
import { useCommerce, commerceTotals } from "@/lib/products/crm-commerce/store";
import {
  PAYMENT_METHOD_LABEL,
  invoiceGross,
  VAT_RATE,
  type PaymentMethod,
} from "@/lib/products/crm-commerce/types";
import { Scale, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  PageHeader,
  Panel,
  PanelHeader,
  DemoButton,
  DemoDataBanner,
  DemoTable,
  StatusPill,
  EmptyState,
  Meter,
  peso,
} from "@/components/products/demo-ui";

const METHODS: PaymentMethod[] = ["maya", "card", "bank_transfer", "cheque"];

export default function ReconciliationPage() {
  const { invoices, recordPayment } = useCommerce();
  const t = React.useMemo(
    () => commerceTotals({ invoices, subscriptions: [] }),
    [invoices]
  );

  const expectedVat = Math.round(
    invoices.reduce((s, i) => s + i.net * VAT_RATE, 0)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment Reconciliation"
        description="Billed versus collected, with the VAT component isolated for BIR remittance."
      />

      <DemoDataBanner note="synthetic reconciliation figures for evaluation. No payment gateway is contacted." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <PanelHeader
            title="Collected by Method"
            subtitle="Settled cash grouped by payment rail."
            icon={Scale}
          />
          <DemoTable head={["Method", "Invoices", "Gross collected"]}>
            {METHODS.map((m) => {
              const rows = invoices.filter((i) => i.status === "paid" && i.method === m);
              const total = rows.reduce((s, i) => s + invoiceGross(i), 0);
              return (
                <tr key={m} className="transition hover:bg-white/5">
                  <td className="px-4 py-3.5 text-sm text-white">{PAYMENT_METHOD_LABEL[m]}</td>
                  <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-sky-200">
                    {rows.length}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-sm font-bold tabular-nums text-white">
                    {peso(total)}
                  </td>
                </tr>
              );
            })}
          </DemoTable>
        </Panel>

        <Panel>
          <PanelHeader title="Tax Position" icon={CheckCircle2} />
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-sky-400/15 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-wider text-sky-200/70">
                VAT expected on {invoices.length} invoices
              </p>
              <p className="mt-1 font-mono text-2xl font-bold text-white">{peso(expectedVat)}</p>
            </div>
            <div className="rounded-xl border border-sky-400/15 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-wider text-sky-200/70">VAT collected</p>
              <p className="mt-1 font-mono text-2xl font-bold text-emerald-300">
                {peso(t.vatCollected)}
              </p>
            </div>
            <Meter
              label="Collection rate"
              value={t.collectionRatePct}
              tone={t.collectionRatePct >= 80 ? "emerald" : "amber"}
            />
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title="Outstanding Balance"
          subtitle="Settle an invoice and the ledger rebalances instantly."
          icon={AlertTriangle}
        />
        {invoices.filter((i) => i.status !== "paid").length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="Ledger is fully reconciled"
            body="Every issued invoice has been settled. Nothing is outstanding."
          />
        ) : (
          <DemoTable head={["Invoice", "Customer", "Gross", "Status", ""]}>
            {invoices
              .filter((i) => i.status !== "paid")
              .map((i) => (
                <tr key={i.id} className="transition hover:bg-white/5">
                  <td className="px-4 py-3.5 font-mono text-xs text-sky-200/80">{i.id}</td>
                  <td className="px-4 py-3.5 text-sm text-white">{i.company}</td>
                  <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-white">
                    {peso(invoiceGross(i))}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusPill
                      tone={
                        i.status === "overdue" ? "danger" : i.status === "open" ? "info" : "neutral"
                      }
                    >
                      {i.status}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-3.5">
                    <DemoButton variant="primary" onClick={() => recordPayment(i.id)}>
                      Reconcile
                    </DemoButton>
                  </td>
                </tr>
              ))}
          </DemoTable>
        )}
      </Panel>
    </div>
  );
}