import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { ConsultationModalProvider } from "@/components/modals/consultation-modal-context";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      {/*
        Bypass-blocks link (WCAG 2.4.1). The landing page is ~27,000 px tall with
        ~87 links; without this a keyboard user re-tabs the whole header on every
        navigation. Visually hidden until focused, then pinned to the viewport so
        it is never missed. `main#content` exists on every marketing page.
      */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-blue-950 focus:shadow-2xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      >
        Skip to main content
      </a>
      <Header />
      {children}
      <Footer />
      <StickyMobileCta />
    </ConsultationModalProvider>
  );
}
