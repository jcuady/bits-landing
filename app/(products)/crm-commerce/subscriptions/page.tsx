"use client";

import * as React from "react";
import { useCommerce } from "@/lib/products/crm-commerce/store";
import { SUBSCRIPTION_STATUS_TONE } from "@/lib/products/crm-commerce/types";
import { Wallet, Ban } from "lucide-react";
import {
  PageHeader,
  Panel,
  DemoButton,
  DemoDataBanner,
  DemoTable,
  StatusPill,
  EmptyState,
  peso,
} from "@/components/products/demo-ui";

export default function SubscriptionsPage() {
  const { subscriptions, cancelSubscription } = useCommerce();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Recurring plans, seat counts and renewal dates across every account."
      />

      <DemoDataBanner note="synthetic subscription records for evaluation." />

      <Panel>
        {subscriptions.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No subscriptions"
            body="Reset the demo data to restore the sample subscriptions."
          />
        ) : (
          <DemoTable head={["Account", "Plan", "Seats", "MRR", "Renews", "Status", ""]}>
            {subscriptions.map((s) => (
              <tr key={s.id} className="transition hover:bg-white/5">
                <td className="px-4 py-3.5">
                  <span className="block text-sm font-medium text-white">{s.company}</span>
                  <span className="font-mono text-xs text-sky-200/60">{s.id}</span>
                </td>
                <td className="px-4 py-3.5 text-sm text-sky-100">{s.plan}</td>
                <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-white">{s.seats}</td>
                <td className="px-4 py-3.5 font-mono text-sm tabular-nums text-white">{peso(s.mrr)}</td>
                <td className="px-4 py-3.5 text-xs text-sky-200/80">{s.renewsOn}</td>
                <td className="px-4 py-3.5">
                  <StatusPill tone={SUBSCRIPTION_STATUS_TONE[s.status]}>{s.status}</StatusPill>
                  <p className="mt-1 text-[11px] text-sky-200/60">since {s.since}</p>
                </td>
                <td className="px-4 py-3.5">
                  {s.status !== "cancelled" ? (
                    <DemoButton variant="danger" onClick={() => cancelSubscription(s.id)}>
                      <Ban className="size-3.5" aria-hidden />
                      Cancel
                    </DemoButton>
                  ) : (
                    <span className="text-xs text-sky-200/60">Ended</span>
                  )}
                </td>
              </tr>
            ))}
          </DemoTable>
        )}
      </Panel>
    </div>
  );
}