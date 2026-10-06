import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { bitsProducts, whiteLabelBrandingOption, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Products Catalog — 18 Enterprise Software Products | BITS",
  description:
    "Explore the full BITS enterprise software portfolio: Operations 360 (OMS), BITSagent AI, Sales CRM, Support CRM, Accounting ERP, HRMS, Payroll, Logistics, Booking, Queuing, and more. Start with one product, expand as you grow.",
  keywords: [
    "BITS products",
    "enterprise software portfolio",
    "Operations 360",
    "best operations management system",
    "BITScrm",
    "best crm",
    "crm for collections",
    "BITSagent",
    "enterprise software Philippines",
    "business operations software",
    "CRM software Philippines",
    "AI voice agents",
    "HRMS payroll Philippines",
    "accounting ERP Philippines",
  ],
  alternates: { canonical: `${site.url}/products` },
  openGraph: {
    title: "BITS Products — 18 Enterprise Software Products",
    description:
      "Explore the full BITS enterprise software portfolio: Operations 360, BITSagent AI, CRM, ERP, HRMS, Payroll, Logistics, and more.",
    url: `${site.url}/products`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS 18 Enterprise Software Products" }],
  },
};

/* ── Category groupings for organized display ── */
const categoryMeta: Record<string, { label: string; description: string; accent: string; id: string }> = {
  flagship: {
    id: "flagship",
    label: "Flagship Platforms",
    description: "Our core enterprise systems — start here.",
    accent: "from-blue-600 to-indigo-600",
  },
  crm: {
    id: "crm",
    label: "CRM & Revenue Cloud",
    description: "Sales pipelines, customer support, marketing journeys, and commerce billing.",
    accent: "from-sky-600 to-blue-600",
  },
  operations: {
    id: "operations",
    label: "Business Operations & ERP",
    description: "Financial accounting, job costing, warehouse inventory, and fleet dispatch.",
    accent: "from-emerald-600 to-teal-600",
  },
  workforce: {
    id: "workforce",
    label: "Workforce & HR Cloud",
    description: "24/7 biometric shift rostering, statutory TRAIN payroll, and bank disbursements.",
    accent: "from-violet-600 to-purple-600",
  },
  sports: {
    id: "sports",
    label: "Customer Experience & Venues",
    description: "Digital appointments, TV queue boards, court rotations, and smart booking.",
    accent: "from-amber-500 to-orange-500",
  },
  ai: {
    id: "ai",
    label: "AI & Knowledge Infrastructure",
    description: "Enterprise knowledge grounding, policy synchronization, and AI engines.",
    accent: "from-rose-600 to-pink-600",
  },
  identity: {
    id: "identity",
    label: "Digital Identity & Smart Hardware",
    description: "Encrypted NFC business cards and digital identity passes.",
    accent: "from-slate-700 to-slate-900",
  },
};

/* ── Group products by category ── */
function groupProducts() {
  const groups: Record<string, (typeof bitsProducts)[number][]> = {};
  for (const product of bitsProducts) {
    const cat = product.category as string;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(product);
  }
  return groups;
}

export default function ProductsIndexPage() {
  const groups = groupProducts();
  const categoryOrder = ["flagship", "crm", "operations", "workforce", "sports", "ai", "identity"];

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/products#webpage`,
        url: `${site.url}/products`,
        name: "BITS Enterprise Software Products Catalog (18 Connected Products)",
        description:
          "Complete catalog of all 18 enterprise software systems engineered by Boundless IT Solutions (BITS).",
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
        name: "BITS 18 Enterprise Software Products",
        itemListElement: bitsProducts.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name,
          url: `${site.url}/products/${p.id}`,
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
          <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
            <Reveal>
              <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 shadow-2xs">
                <Sparkles className="size-3 text-blue-600" />
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-700 font-mono">
                  Full Product Portfolio · 18 Connected Systems
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
                18 Connected Products.{" "}
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

            {/* Quick Category Jump Bar */}
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {categoryOrder.map((catKey) => {
                  const meta = categoryMeta[catKey];
                  if (!meta) return null;
                  return (
                    <a
                      key={catKey}
                      href={`#cat-${meta.id}`}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-blue-300 hover:bg-blue-50/80 hover:text-blue-700 transition-all"
                    >
                      {meta.label}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Product Categories */}
          {categoryOrder.map((catKey) => {
            const products = groups[catKey];
            const meta = categoryMeta[catKey];
            if (!products || !meta) return null;

            return (
              <div key={catKey} id={`cat-${meta.id}`} className="mb-14 sm:mb-18 last:mb-0 scroll-mt-28">
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn("h-8 w-1.5 rounded-full bg-gradient-to-b", meta.accent)} />
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {meta.label}
                      </h2>
                      <p className="text-sm text-slate-500">{meta.description}</p>
                    </div>
                  </div>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product, idx) => {
                    const productHref =
                      product.id === "ai-agent"
                        ? "/bitsagent"
                        : product.id === "collections"
                        ? "/products/collections"
                        : `/products/${product.id}`;

                    return (
                      <Reveal key={product.id} delay={0.04 + idx * 0.03}>
                        <Link
                          href={productHref}
                          className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 h-full"
                        >
                          {/* Flagship Badge */}
                          {product.isFlagship && (
                            <div className="absolute -top-3 right-5">
                              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                                ★ Flagship System
                              </span>
                            </div>
                          )}

                          {/* Product Name & Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                                {product.name}
                              </h3>
                              <span className="mt-1.5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                                {product.badge}
                              </span>
                            </div>
                            {/* Metric */}
                            <div className="shrink-0 text-right">
                              <p className="text-lg sm:text-xl font-black text-blue-600 group-hover:text-blue-700 transition-colors font-mono">
                                {product.metrics.value}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {product.metrics.label}
                              </p>
                            </div>
                          </div>

                          {/* Tagline */}
                          <p className="mt-3.5 text-xs text-slate-600 leading-relaxed font-medium">
                            {product.tagline}
                          </p>

                          {/* Plain-English summary */}
                          <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>

                          {/* Capabilities Snippet */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {product.capabilities.slice(0, 2).map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[10px] text-slate-600"
                              >
                                <CheckCircle2 className="size-2.5 text-emerald-600 shrink-0" />
                                <span className="truncate max-w-[180px]">{cap}</span>
                              </span>
                            ))}
                          </div>

                          {/* CTA Button Link */}
                          <div className="mt-auto pt-5 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                            <span>Explore {product.shortName}</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-1.5 text-sm">
                              →
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}

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
                    {whiteLabelBrandingOption.tagline}. Deploy any of the 18 BITS products fully rebranded under your own corporate identity, custom domain, and logo with zero mention of BITS.
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
