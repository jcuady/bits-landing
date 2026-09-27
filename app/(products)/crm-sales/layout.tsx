import * as React from "react";
import type { Metadata } from "next";
import { DemoProvider } from "@/lib/products/demo-store";
import { SalesProvider } from "@/lib/products/crm-sales/store";
import { ProductShell } from "@/components/products/product-shell";

export const metadata: Metadata = {
  title: "BITScrm Sales Suite | Live Enterprise MVP Showcase",
  description: "Visual Kanban deal pipeline, AI lead velocity, and 1-click CPQ quoting for Philippine enterprises.",
  robots: { index: false, follow: false },
};

export default function CrmSalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <SalesProvider>
        <ProductShell productId="crm-sales">
          {children}
        </ProductShell>
      </SalesProvider>
    </DemoProvider>
  );
}
