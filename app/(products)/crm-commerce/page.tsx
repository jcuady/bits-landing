"use client";

import * as React from "react";
import Link from "next/link";
import { useCommerce, commerceTotals } from "@/lib/products/crm-commerce/store";
import {
  INVOICE_STATUS_TONE,
  SUBSCRIPTION_STATUS_TONE,
  invoiceGross,
  VAT_RATE,
} from "@/lib/products/crm-commerce/types";
import {
  Receipt,
  TrendingUp,
  Wallet,
  AlertTriangle,
  Users,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  PageHeader,
  Panel,
  PanelHeader,
  Stat,
  StatusPill,
  DemoButton,
  DemoDataBanner,
  EmptyState,
  Meter,
  peso,
} from "@/components/products/demo-ui";

export default function CommerceDashboard() {
  const { invoices, subscriptions, recordPayment, resetDemoData } = useCommerce();
  const t = React.useMemo(() => commerceTotals({ invoices, subscriptions }), [invoices, subscriptions]);
  const overdue = invoices.filter((i) => i.status === "overdue");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Operations"
        description="Subscriptions, VAT-correct invoicing and dunning — with every peso figure reconciled against collected cash."
        action={
          <DemoButton onClick={resetDemoData}>
            <RotateCcw className="size-3.5" aria-hidden />
            Reset demo data
          </DemoButton>
        }
      />

      <DemoDataBanner note="synthetic invoices, subscriptions and payment records for evaluation. No real payments are processed." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Monthly Recurring"
          value={peso(t.mrr, true)}
          icon={TrendingUp}
          accent="emerald"
          delta={{ value: "+6.2% MoM", positive: true }}
        />
        <Stat
          label="Collection Rate"
          value={`${t.collectionRatePct.toFixed(1)}%`}
          icon={Wallet}
          accent="sky"
        />
        <Stat
          label="Outstanding"
          value={peso(t.outstanding, true)}
          icon={AlertTriangle}
          accent={t.overdueCount > 0 ? "amber" : "emerald"}
          delta={{ value: `${t.overdueCount} overdue`, positive: t.overdueCount === 0 }}
        />
        <Stat
          label={`VAT Collected (${Math.round(VAT_RATE * 100)}%)`}
          value={peso(t.vatCollected, true)}
          icon={Receipt}
          accent="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Dunning queue */}
        <Panel className="lg:col-span-2">
          <PanelHeader
            title="Dunning Queue"
            subtitle="Overdue invoices escalate automatically on the smart ladder."
            icon={AlertTriangle}
            action={
              <Link
                href="/crm-commerce/invoices"
                className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
              >
                All invoices
                <ArrowRight className="size-3" aria-hidden />
              </Link>
            }
          />
          {overdue.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="Nothing overdue"
              body="Every issued invoice has been settled. Dunning has nothing to escalate."
            />
          ) : (
            <ul className="divide-y divide-sky-400/10">
              {overdue.map((i) => (
                <li key={i.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-sky-200/70">{i.id}</span>
                      <StatusPill tone={INVOICE_STATUS_TONE[i.status]}>{i.status}</StatusPill>
                      <StatusPill tone={i.dunningStage >= 3 ? "danger" : "warning"}>
                        Stage {i.dunningStage}/3
                      </StatusPill>
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-white">{i.company}</p>
                    <p className="text-xs text-sky-200/70">Due {i.dueOn}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-sm font-bold text-white">
                      {peso(invoiceGross(i))}
                    </span>
                    <DemoButton variant="primary" onClick={() => recordPayment(i.id)}>
                      Record payment
                    </DemoButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Seat + plan mix */}
        <Panel>
          <PanelHeader
            title="Licensed Seats"
            subtitle={`${t.seats.toLocaleString()} seats in service.`}
            icon={Users}
            action={
              <Link
                href="/crm-commerce/subscriptions"
                className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
              >
                Manage
                <ArrowRight className="size-3" aria-hidden />
              </Link>
            }
          />
          <div className="space-y-4 p-5">
            {["Enterprise", "Growth", "Starter"].map((plan) => {
              const count = subscriptions.filter((s) => s.plan === plan && s.status !== "cancelled");
              const seats = count.reduce((s, x) => s + x.seats, 0);
              const maxSeats = Math.max(1, ...["Enterprise", "Growth", "Starter"].map((p) =>
                subscriptions.filter((s) => s.plan === p && s.status !== "cancelled").reduce((a, x) => a + x.seats, 0)
              ));
              return (
                <div key={plan}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-sky-100">{plan}</span>
                    <span className="font-mono tabular-nums text-sky-200/80">{seats}</span>
                  </div>
                  <Meter value={seats} max={maxSeats} tone={plan === "Enterprise" ? "sky" : "emerald"} />
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title="Subscription Health"
          subtitle="Accounts not in good standing."
          icon={Wallet}
        />
        {subscriptions.filter((s) => s.status === "past_due" || s.status === "trialing").length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="All subscriptions healthy"
            body="No past-due or trialing accounts in this dataset."
          />
        ) : (
          <ul className="divide-y divide-sky-400/10">
            {subscriptions
              .filter((s) => s.status === "past_due" || s.status === "trialing")
              .map((s) => (
                <li key={s.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{s.company}</p>
                    <p className="text-xs text-sky-200/70">
                      {s.plan} · {s.seats} seats · renews {s.renewsOn}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-white">{peso(s.mrr)}</span>
                  <StatusPill tone={SUBSCRIPTION_STATUS_TONE[s.status]}>{s.status}</StatusPill>
                </li>
              ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}