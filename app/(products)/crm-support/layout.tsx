import type { Metadata } from "next";
import { SupportProvider } from "@/lib/products/crm-support/store";
import { ProductShell } from "@/components/products/product-shell";

export const metadata: Metadata = {
  title: "BITScrm Support Desk — Enterprise Demo",
  description:
    "Omnichannel helpdesk demo: SLA countdown HUD, ticket queue, CSAT telemetry, and agent workload balancing.",
  robots: { index: false, follow: false },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <SupportProvider>
      <ProductShell productId="crm-support">{children}</ProductShell>
    </SupportProvider>
  );
}