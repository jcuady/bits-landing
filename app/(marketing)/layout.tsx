import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { ConsultationModalProvider } from "@/components/modals/consultation-modal-context";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      <Header />
      {children}
      <Footer />
      <StickyMobileCta />
    </ConsultationModalProvider>
  );
}
