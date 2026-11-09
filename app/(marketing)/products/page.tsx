import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { activeProducts, whiteLabelBrandingOption, site, PRODUCT_COUNT } from "@/lib/site";
import { ProductsCatalogBrowser } from "@/components/sections/products-catalog-browser";
import { ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Products Catalog — ${PRODUCT_COUNT} Enterprise Software Products`,
  description:
    "Explore the BITS enterprise software portfolio: Operations 360 (OMS), BITS CRMPBX, BITS HRMS & Payroll, and BITS ULAP. Start with one product, expand as you grow.",
  keywords: [
    "BITS products",
    "enterprise software portfolio",
    "Operations 360",
    "best operations management system",
    "BITScrm",
    "best crm",
    "crm for collections",
    "BITSagent",
    "BITS ULAP",
    "BITS CRMPBX",
    "BITS HRMS Payroll",
    "enterprise software Philippines",
    "business operations software",
    "CRM software Philippines",
    "AI voice agents",
    "HRMS payroll Philippines",
  ],
  alternates: { canonical: `${site.url}/products` },
  openGraph: {
    title: `BITS Products — ${PRODUCT_COUNT} Enterprise Software Products`,
    description:
      "Explore the BITS enterprise software portfolio: Operations 360, BITS CRMPBX, BITS HRMS & Payroll, and BITS ULAP.",
    url: `${site.url}/products`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `BITS ${PRODUCT_COUNT} Enterprise Software Products` }],
  },
};

export default function ProductsIndexPage() {
  const productsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/products#webpage`,
        url: `${site.url}/products`,
        name: `BITS Enterprise Software Products Catalog (${PRODUCT_COUNT} Connected Products)`,
        description:
          `Complete catalog of all ${PRODUCT_COUNT} live enterprise software systems engineered by Boundless IT Solutions (BITS).`,
        publisher: {
          "@type": "Organization",
          name: site.legalName,
          url: site.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
        ],
      },
      {
        "@type": "ItemList",
        name: `BITS ${PRODUCT_COUNT} Enterprise Software Products`,
        itemListElement: activeProducts.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name,
          url: `${site.url}${p.ctaHref}`,
        })),
      },
    ],
  };

  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />

      <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
        <Container>
          {/* Page Header */}
          <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
            <Reveal>
              <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 shadow-2xs">
                <Sparkles className="size-3 text-blue-600" />
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-700 font-mono">
                  Full Product Portfolio · {PRODUCT_COUNT} Connected Systems
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
                {PRODUCT_COUNT} Connected Products.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  One Unified Platform.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty">
                Start with the product that solves your most immediate operational bottleneck. Expand across departments as your organization grows. Every product shares the same secure, sovereign data layer.
              </p>
            </Reveal>
          </div>

          {/* Interactive Sticky Category Filter Bar, Instant Search & Product Cards */}
          <ProductsCatalogBrowser />

          {/* White-Label Option */}
          <Reveal>
            <div className="mt-10 rounded-3xl border border-slate-300 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                    <Building2 className="size-3 text-slate-600" />
                    <span>Universal Commercial Option</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {whiteLabelBrandingOption.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                    {whiteLabelBrandingOption.tagline}. Deploy any of the {PRODUCT_COUNT} BITS products fully rebranded under your own corporate identity, custom domain, and logo with zero mention of BITS.
                  </p>
                </div>
                <Link
                  href="/products/white-label"
                  className="shrink-0 inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-xs font-bold text-slate-800 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md"
                >
                  <span>Explore White-Label Specs</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Bottom High-Converting Solutions Advisory Banner */}
          <Reveal>
            <div className="mt-14 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 sm:p-12 text-center text-white shadow-2xl">
              <div className="mx-auto max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-200">
                  <ShieldCheck className="size-3.5 text-sky-300" />
                  Solutions Scoping &amp; System Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Not Sure Which Product to Start With?
                </h2>
                <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
                  Our systems architects will evaluate your current workflow bottlenecks—whether you are running spreadsheets, disconnected CRMs, or high-volume call floors—and configure a tailored blueprint.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/#contact"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-xs font-black uppercase tracking-wider text-blue-950 shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-sky-300/40 bg-white/10 px-6 py-4 text-xs font-bold text-white shadow-md hover:bg-white/20 transition-all"
                  >
                    <span>Read Architectural Guides</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
