import type { Metadata } from "next";
import { MarketingProvider } from "@/lib/products/crm-marketing/store";
import { ProductShell } from "@/components/products/product-shell";

export const metadata: Metadata = {
  title: "BITScrm Marketing Journeys — Enterprise Demo",
  description:
    "Multi-channel drip journey automation demo: SMS, Viber and email sequences with audience segmentation and attribution.",
  robots: { index: false, follow: false },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MarketingProvider>
      <ProductShell productId="crm-marketing">{children}</ProductShell>
    </MarketingProvider>
  );
}