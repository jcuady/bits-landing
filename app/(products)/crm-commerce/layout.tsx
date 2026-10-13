import type { Metadata } from "next";
import { CommerceProvider } from "@/lib/products/crm-commerce/store";
import { ProductShell } from "@/components/products/product-shell";

export const metadata: Metadata = {
  title: "BITScrm Commerce & Billing — Enterprise Demo",
  description:
    "Recurring billing demo: subscriptions, 12% BIR VAT invoicing, smart dunning ladders and payment reconciliation.",
  robots: { index: false, follow: false },
};

export default function CommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <CommerceProvider>
      <ProductShell productId="crm-commerce">{children}</ProductShell>
    </CommerceProvider>
  );
}