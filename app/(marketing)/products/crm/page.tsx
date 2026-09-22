import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { bitsProducts, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CrmVariantsExplorer } from "@/components/sections/crm-variants-explorer";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Zap,
  Server,
  Cloud,
  Lock,
  Sparkles,
  PhoneCall,
  TrendingUp,
  Mail,
  CreditCard,
  Layers,
  CheckCircle2,
  Workflow,
  Database,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "BITScrm Suite — Unified Customer Service, Sales, Marketing & Commerce Cloud | Boundless IT Solutions",
  description:
    "Explore the 4 enterprise CRM variants by Boundless IT Solutions: Service, Sales, Marketing, and Commerce. Unified on a single sovereign data schema with native AI automation, zero replatforming, and cloud or on-premises deployment.",
  keywords: [
    "BITScrm",
    "BITScrm Suite",
    "CRM variants",
    "enterprise CRM Philippines",
    "collections CRM",
    "sales pipeline CRM",
    "marketing automation CRM",
    "commerce subscription billing CRM",
    "unified revenue cloud",
    "sovereign CRM",
    "Boundless IT Solutions CRM",
  ],
  alternates: {
    canonical: `${site.url}/products/crm`,
  },
  openGraph: {
    title: "BITScrm Suite — Unified Customer Service, Sales, Marketing & Commerce Cloud",
    description:
      "Four purpose-built CRM variants on one sovereign data schema. Eliminate fragmented vendor SaaS stacks with zero data replatforming.",
    url: `${site.url}/products/crm`,
    siteName: site.legalName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITScrm Enterprise Suite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITScrm Suite — Unified Customer Service, Sales, Marketing & Commerce Cloud",
    description:
      "Four purpose-built CRM variants on one sovereign data schema. Eliminate fragmented vendor SaaS stacks with zero data replatforming.",
    images: ["/og.png"],
  },
};

const CRM_VARIANTS_OVERVIEW = [
  {
    id: "service",
    name: "BITScrm Customer Service",
    shortName: "Service & Collections",
    badge: "Primary Flagship Platform",
    tagline: "Collections, Customer Care & High-Volume Contact Center Core",
    icon: PhoneCall,
    color: "blue",
    description:
      "Engineered for debt recovery agencies, BPO contact centers, and financial lenders. Centralizes delinquent portfolio staging, WebRTC predictive softphone dialing, automated Promise-to-Pay (PTP) tracking, and live supervisor barge-in.",
    metric: { value: "3.2x Boost", label: "Right-Party Connect" },
    href: "/bitscrm",
    productHref: "/products/service",
    keyFeatures: [
      "Dynamic Debtor & Account Staging Queues",
      "WebRTC In-Browser SIP Softphone & Auto-Dialer",
      "Automated Promise-to-Pay (PTP) Scheduling Engine",
      "Supervisor Listen, Whisper & Barge-in HUD",
    ],
  },
  {
    id: "sales",
    name: "BITScrm Sales",
    shortName: "Sales & CPQ",
    badge: "Revenue CRM Variant",
    tagline: "High-Velocity Revenue Pipeline, Kanban & Deal Intelligence",
    icon: TrendingUp,
    color: "emerald",
    description:
      "Purpose-built for institutional sales, B2B deal structuring, and corporate loan origination. Combines visual Kanban pipeline stages, AI deal win-probability scoring, automated territory routing, and CPQ quote-to-cash workflows.",
    metric: { value: "+38% Faster", label: "Pipeline Velocity" },
    href: "/products/sales",
    productHref: "/products/sales",
    keyFeatures: [
      "Multi-Stage Visual Deal Pipeline Kanban",
      "Predictive AI Lead Scoring & Win Probability",
      "Automated Territory & Representative Routing",
      "CPQ (Configure, Price, Quote) Generator",
    ],
  },
  {
    id: "marketing",
    name: "BITScrm Marketing",
    shortName: "Marketing & Journeys",
    badge: "Audience Automation",
    tagline: "Omnichannel Customer Journeys & Audience Automation",
    icon: Mail,
    color: "pink",
    description:
      "Orchestrate multi-touch customer acquisition, debtor re-engagement, and loan lifecycle journeys across SMS, Viber, email, and webhooks with closed-loop attribution analytics and strict consent management.",
    metric: { value: "4.5x Higher", label: "Engagement Lift" },
    href: "/products/marketing",
    productHref: "/products/marketing",
    keyFeatures: [
      "Visual Multi-Branch Customer Journey Builder",
      "Dynamic Audience Segmentation & Behavioral Tags",
      "Automated SMS & Email Drip Sequences",
      "Full-Funnel Conversion Attribution Analytics",
    ],
  },
  {
    id: "commerce",
    name: "BITScrm Commerce",
    shortName: "Commerce & Billing",
    badge: "Billing Core",
    tagline: "B2B/B2C Digital Storefronts, Invoicing & Subscription Engine",
    icon: CreditCard,
    color: "cyan",
    description:
      "Unified commerce architecture supporting flexible recurring subscriptions, usage-based billing, multi-currency invoicing, smart dunning recovery, and tokenized payment gateway integrations with BIR CAS alignment.",
    metric: { value: "99.99% Precision", label: "Billing Accuracy" },
    href: "/products/commerce",
    productHref: "/products/commerce",
    keyFeatures: [
      "Recurring Subscription & Usage-Based Billing",
      "Tokenized Multi-Gateway Payment Processing",
      "Automated Tax Calculation & Compliant Invoicing",
      "Smart Dunning & Failed Payment Auto-Recovery",
    ],
  },
];

const ARCHITECTURE_COMPARISONS = [
  {
    dimension: "Database Architecture",
    fragmented: "4-5 disparate vendor databases with delayed, fragile webhook syncs",
    bits: "Single sovereign database schema with real-time zero-copy interconnects",
  },
  {
    dimension: "Customer Lifecycle",
    fragmented: "Reps re-key customer information across CRM, billing, and support tools",
    bits: "Unified customer master record across lead, deal, payment, and support stages",
  },
  {
    dimension: "AI Grounding",
    fragmented: "Chatbots trapped inside single silos without access to billing or call history",
    bits: "Native BITSagent AI grounded in full omnichannel history and enterprise RAG",
  },
  {
    dimension: "Data Sovereignty",
    fragmented: "Locked into US multi-tenant clouds with unpredictable vendor price hikes",
    bits: "Deployable on private cloud VPC or sovereign on-premises with local compliance",
  },
  {
    dimension: "Licensing Model",
    fragmented: "Expensive per-seat per-app penalties compounding across departments",
    bits: "Predictable enterprise licensing with custom bundle packaging and white-labeling",
  },
];

const CRM_FAQS = [
  {
    q: "Can we deploy one CRM variant today and add others later?",
    a: "Yes. Every BITScrm variant is fully functional as a standalone system. When you decide to activate an additional variant (e.g. adding Commerce to Sales, or adding Service to Marketing), it connects instantly to your existing customer database without any data migration, schema rewriting, or replatforming.",
  },
  {
    q: "How does BITScrm eliminate data replatforming between departments?",
    a: "Traditional companies run sales on Salesforce, customer support on Zendesk, and billing on Stripe/Chargebee, which creates data silos. BITScrm uses a unified core schema where customer accounts, contact logs, quotes, transactions, and support tickets live in the same high-performance relational store.",
  },
  {
    q: "Can BITScrm be deployed on-premises for banking and regulatory compliance?",
    a: "Yes. While we provide fully managed secure cloud deployments on AWS/Azure private VPCs, we also support full sovereign on-premises bare-metal deployments for banks, government entities, and high-security institutions aligned with BSP Circulars 454/857 and NPC RA 10173.",
  },
  {
    q: "Does BITScrm integrate with BITSagent Conversational Voice AI?",
    a: "Yes. BITSagent voice and email AI agents connect natively to BITScrm Customer Service, Sales, and Marketing. For example, BITSagent can autonomously dial overdue debtors, negotiate payment plans, and write confirmed PTP schedules directly into the CRM database in real-time.",
  },
  {
    q: "How does BITScrm Commerce handle Philippine tax compliance?",
    a: "BITScrm Commerce includes built-in BIR Computerized Accounting System (CAS) audit alignment, automated 12% VAT calculations, withholding tax schedules, and official receipt (OR) electronic stamp generation.",
  },
];

export default function CrmMasterPage() {
  const crmSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BITScrm Enterprise Suite",
    alternateName: ["BITScrm", "BITS CRM Cloud", "Boundless IT Solutions CRM"],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Managed Cloud, Sovereign On-Premises",
    description:
      "Four purpose-built CRM variants (Customer Service, Sales, Marketing, Commerce) unified on a single zero-replatforming database schema with native AI automation.",
    url: `${site.url}/products/crm`,
    publisher: {
      "@type": "Organization",
      name: "BITS - Boundless IT Solutions",
      legalName: "Boundless IT Solutions",
      url: site.url,
    },
    brand: {
      "@type": "Brand",
      name: "Boundless IT Solutions",
      alternateName: "BITS",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PHP",
      price: "35000",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${site.url}/products/crm`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CRM_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${site.url}/#products-suite`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "BITScrm Suite",
        item: `${site.url}/products/crm`,
      },
    ],
  };

  return (
    <main id="content" className="pt-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crmSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
          <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
          <div className="absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.03] blur-[80px]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Breadcrumb / Category Pill */}
            <Reveal y={12}>
              <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
                <Link
                  href="/"
                  className="text-[0.72rem] font-bold text-slate-500 hover:text-blue-600 transition-colors"
                >
                  Platform
                </Link>
                <span className="text-[0.72rem] text-slate-400">/</span>
                <Link
                  href="/#products-suite"
                  className="text-[0.72rem] font-bold text-slate-500 hover:text-blue-600 transition-colors"
                >
                  Products
                </Link>
                <span className="text-[0.72rem] text-slate-400">/</span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-blue-700">
                  BITScrm Suite
                </span>
              </div>
            </Reveal>

            {/* Quick Variant Switcher Pill Strip */}
            <Reveal delay={0.03} y={10}>
              <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-blue-200/90 bg-slate-50/90 p-1.5 shadow-xs backdrop-blur-md">
                <span className="px-2.5 text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline-block">
                  Variants:
                </span>
                <Link
                  href="/bitscrm"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 transition-all"
                >
                  Customer Service
                </Link>
                <Link
                  href="/products/sales"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 transition-all"
                >
                  Sales Pipeline
                </Link>
                <Link
                  href="/products/marketing"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 transition-all"
                >
                  Marketing Journeys
                </Link>
                <Link
                  href="/products/commerce"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 transition-all"
                >
                  Commerce &amp; Billing
                </Link>
                <span className="inline-flex min-h-[36px] items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs">
                  <span className="size-1.5 rounded-full bg-white" />
                  <span>Master Hub</span>
                </span>
              </div>
            </Reveal>

            {/* H1 Headline */}
            <Reveal delay={0.06} y={16}>
              <h1 className="text-display text-balance font-bold leading-[1.08] text-slate-900">
                The BITScrm Revenue Architecture
              </h1>
            </Reveal>

            {/* Tagline & Subtitle */}
            <Reveal delay={0.12} y={14}>
              <p className="mt-3 text-lg font-bold text-blue-600 sm:text-xl">
                Four Specialized Variants. One Sovereign Data Layer. Zero Replatforming.
              </p>
              <p className="text-lede mx-auto mt-4 max-w-[64ch] text-pretty text-slate-600">
                Stop stitching together disparate SaaS systems with brittle webhooks and compounding seat fees.
                BITScrm unifies high-volume customer service, institutional deal pipelines, automated multichannel journeys,
                and subscription commerce into a single high-performance operational core.
              </p>
            </Reveal>

            {/* Action CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98] sm:w-auto min-h-[44px]"
                  >
                    <span>Request Architecture Scoping</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#pricing"
                    className="flex h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] sm:w-auto min-h-[44px]"
                  >
                    Configure Custom CRM Bundle
                  </Link>
                </Magnetic>
              </div>

              {/* Reassurance Row */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Managed Cloud or Sovereign On-Prem
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> BSP 454/857 &amp; NPC DPA Aligned
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Zero Data Replatforming
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Key Benchmark Strip */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                4 Variants
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">One Unified Schema</p>
              <p className="text-[0.72rem] text-slate-500">Zero data replication lag</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-emerald-600 sm:text-4xl">
                3.2x Boost
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Contact Resolution</p>
              <p className="text-[0.72rem] text-slate-500">Service softphone telemetry</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
                +38% Faster
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Pipeline Velocity</p>
              <p className="text-[0.72rem] text-slate-500">Sales deal acceleration</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-cyan-600 sm:text-4xl">
                99.99%
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Billing Precision</p>
              <p className="text-[0.72rem] text-slate-500">PCI tokenized dunning</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Interactive CRM Variants Explorer Component */}
      <section className="bg-white py-20 sm:py-28 border-b border-slate-200/70">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Interactive Architecture Specimen
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Explore the 4 Purpose-Built Workspaces
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Switch between variants below to preview authentic workstation layouts, live operator triggers,
              and native data interconnects.
            </p>
          </div>

          <CrmVariantsExplorer />
        </Container>
      </section>

      {/* 4. Dedicated 4-Variant Deep-Dive Cards */}
      <section className="bg-slate-50/60 py-20 sm:py-28 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Specialized Modules
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Dedicated Pages &amp; Specifications for Every Variant
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Each variant is built for a distinct executive domain, with full regulatory alignment,
              specialized mockups, and transparent architecture specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {CRM_VARIANTS_OVERVIEW.map((v) => {
              const IconComponent = v.icon;
              return (
                <div
                  key={v.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs hover:border-blue-300 hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <IconComponent className="size-5" />
                        </div>
                        <div>
                          <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[0.62rem] font-bold text-blue-700 uppercase tracking-wider">
                            {v.badge}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-slate-900">
                          {v.metric.value}
                        </span>
                        <p className="text-[0.65rem] text-slate-500">{v.metric.label}</p>
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-900">{v.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-blue-600">{v.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {v.description}
                    </p>

                    <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                        Core Built-In Capabilities:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {v.keyFeatures.map((feat) => (
                          <div key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                    <Link
                      href={v.href}
                      className="inline-flex flex-1 min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                    >
                      <span>Explore Dedicated {v.shortName} Page</span>
                      <span>→</span>
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Request Scoping
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. The Unified Data Interconnect Flow */}
      <section className="bg-white py-20 sm:py-28 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Native Interconnects
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              How the 4 Variants Synchronize in Real-Time
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              When data changes anywhere in your customer lifecycle, all authorized departments see
              the update instantaneously without asynchronous batch sync delays.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-pink-100 text-pink-700 font-mono font-bold text-xs">
                01
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Marketing Triggers</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Inbound ad clicks or website registrations enroll in automated multi-channel journeys. Behavioral engagement scoring routes warm accounts directly to Sales.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-mono font-bold text-xs">
                02
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Sales Closes Deal</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Reps advance deals on the visual Kanban. Executing a closed-won contract via CPQ instantly provisions account licenses in Commerce without manual re-entry.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 font-mono font-bold text-xs">
                03
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Commerce Bills &amp; Dunns</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Automated monthly retainers and usage charges clear through tokenized gateways. If a payment fails, smart dunning triggers SMS notices via Marketing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs">
                04
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Service Resolves Floor</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                When customers call or chat, agents see full historical invoices, open deals, and prior PTP commitments directly on their WebRTC softphone console.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Comparison Matrix: Fragmented SaaS Stack vs. Unified BITScrm */}
      <section className="bg-slate-50/70 py-20 sm:py-28 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Stack Architecture Comparison
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              The Frankenstein SaaS Stack vs. Unified BITScrm
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Why leading enterprises are consolidating their fragmented CRM tools into one sovereign architecture.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-100/80 font-bold text-slate-900">
                <tr>
                  <th className="p-4 sm:p-5">Evaluation Dimension</th>
                  <th className="p-4 sm:p-5 text-slate-500">Fragmented Multi-Vendor Stack</th>
                  <th className="p-4 sm:p-5 bg-blue-50/80 text-blue-800">Unified BITScrm Cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ARCHITECTURE_COMPARISONS.map((row) => (
                  <tr key={row.dimension} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.dimension}</td>
                    <td className="p-4 sm:p-5 text-slate-500 leading-relaxed">{row.fragmented}</td>
                    <td className="p-4 sm:p-5 bg-blue-50/40 font-semibold text-slate-900 leading-relaxed">
                      {row.bits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 7. Comprehensive FAQ Section */}
      <section className="bg-white py-20 sm:py-28 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Everything You Need to Know About the BITScrm Suite
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Technical answers regarding architecture, deployment models, data migrations, and licensing.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {CRM_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 transition-all hover:bg-white hover:shadow-xs"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900">
                  <span>{faq.q}</span>
                  <span className="ml-4 font-mono text-blue-600 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="bg-slate-50 py-20 text-center">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h2 font-bold text-slate-900">
              Ready to unify your customer &amp; revenue operations?
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[50ch] text-slate-600">
              Schedule an architecture scoping session with our senior engineers. We will analyze your
              existing tools, map your data schema, and configure a working proof-of-concept.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 font-bold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98] min-h-[44px]"
              >
                Request Architecture Consultation
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 active:scale-[0.98] min-h-[44px]"
              >
                Build Multi-Product Bundle
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
