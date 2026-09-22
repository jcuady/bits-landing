import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { bitsProducts, pricingTiers, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProductMockupBoard } from "@/components/sections/products-suite";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Zap,
  Server,
  Cloud,
  Lock,
  Sparkles,
  HelpCircle,
  Clock,
  Activity,
  Layers,
  FileCheck,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bitsProducts.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = bitsProducts.find((p) => p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found | BITS",
    };
  }

  const title = `${product.name} — ${product.tagline} | Boundless IT Solutions (BITS)`;
  const description = `${product.description.slice(0, 150)}... Custom enterprise software engineered by Boundless IT Solutions (BITS).`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.shortName,
      `BITS ${product.shortName}`,
      `BITS ${product.name}`,
      `Boundless IT Solutions ${product.name}`,
      `Boundless IT Solutions ${product.shortName}`,
      "Boundless IT Solutions",
      "Boundless IT Solutions Philippines",
      "BITS",
      "BITScrm",
      product.categoryLabel,
      ...product.complianceBadges,
      `${product.shortName} software Philippines`,
      "enterprise operations software",
      "custom enterprise software Philippines",
      "cloud or sovereign on-premise",
      "white label enterprise platform",
    ],
    alternates: {
      canonical: `${site.url}/products/${product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}/products/${product.id}`,
      type: "website",
      siteName: site.legalName,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

/* ── Domain-Specific Problem Statements for All 18 Products ── */
function getProductProblems(product: (typeof bitsProducts)[number]) {
  switch (product.id) {
    case "accounting":
      return [
        {
          title: "Disconnected Manual Journal Entries",
          description:
            "Finance teams waste dozens of hours copying invoices and payroll figures between isolated spreadsheets, leading to month-end reconciliation delays and ledger mismatches.",
        },
        {
          title: "Rigid Multi-Entity Visibility",
          description:
            "Managing multiple subsidiaries without native intercompany eliminations forces manual consolidations and creates blind spots in group cash flow.",
        },
        {
          title: "Strict Tax & CAS Audit Scrutiny",
          description:
            "Failing BIR Computerized Accounting System (CAS) or IFRS requirements risks heavy regulatory penalties, non-compliance fines, and disallowed tax deductions.",
        },
      ];
    case "payroll":
      return [
        {
          title: "Complex Statutory Calculation Errors",
          description:
            "Manual computations for SSS, PhilHealth, Pag-IBIG brackets, and TRAIN Law withholding tax tables frequently result in payroll disputes and government audit penalties.",
        },
        {
          title: "Night Differential & 24/7 Shift Leakage",
          description:
            "Tracking graveyard hours, holiday premiums, and overtime across hundreds of agents without biometric hardware integration creates massive administrative overhead.",
        },
        {
          title: "Disbursement Delays & Banking Friction",
          description:
            "Generating bank-specific payroll batch files manually is error-prone, risks payout delays, and exposes sensitive salary figures to unnecessary internal eyes.",
        },
      ];
    case "hrms":
      return [
        {
          title: "Chaotic 24/7 Shift Rostering",
          description:
            "BPO operations and multi-site facilities lose hours each week reconciling shift trades, sudden absences, and holiday coverage on brittle spreadsheet rosters.",
        },
        {
          title: "Disconnected Attendance & Timekeeping",
          description:
            "Standalone biometric clocks that don't talk directly to leave balances and payroll cause constant manual timesheet adjustments and agent disputes.",
        },
        {
          title: "Fragmented Employee Records",
          description:
            "Storing 201 files, performance evaluations, and disciplinary memos in separate shared folders violates Data Privacy Act (RA 10173) safeguards.",
        },
      ];
    case "sales":
      return [
        {
          title: "Lead Leakage & Unassigned Prospects",
          description:
            "Inbound leads go cold while sitting in shared inboxes or disorganized spreadsheets, resulting in missed deal windows and lost pipeline revenue.",
        },
        {
          title: "Inaccurate Deal Forecasting",
          description:
            "Sales managers rely on subjective rep gut feelings instead of objective AI win-probability scoring, leading to missed quarterly revenue targets.",
        },
        {
          title: "Slow CPQ Quote Generation",
          description:
            "Reps take days to compile custom proposals and discount approvals, stalling enterprise negotiations and losing deals to faster competitors.",
        },
      ];
    case "marketing":
      return [
        {
          title: "Disconnected Multi-Touch Attribution",
          description:
            "Marketing teams cannot see which campaigns, SMS blasts, or emails actually drive closed revenue, resulting in wasted ad spend and poor budget allocation.",
        },
        {
          title: "Regulatory Consent & Unsubscribe Violations",
          description:
            "Manually tracking opt-ins across multiple channels risks severe Data Privacy Act fines and telecom carrier blacklisting for non-compliant messaging.",
        },
        {
          title: "Generic, Unsegmented Blasts",
          description:
            "Sending one-size-fits-all emails and SMS notifications leads to high bounce rates, low engagement, and unsubscribes from qualified prospective buyers.",
        },
      ];
    case "commerce":
      return [
        {
          title: "High Churn From Failed Card Renewals",
          description:
            "Without intelligent automated dunning and smart card account updater mechanisms, recurring subscription revenue drops by 5% to 9% every month.",
        },
        {
          title: "Manual Invoicing & Reconciliations",
          description:
            "Billing enterprise clients with custom usage meters or milestone deposits on spreadsheets creates cash collection delays and payment mismatches.",
        },
        {
          title: "PCI-DSS Security Vulnerabilities",
          description:
            "Storing raw customer payment information on internal servers exposes organizations to catastrophic breach liabilities and regulatory shutdown.",
        },
      ];
    case "construction":
      return [
        {
          title: "Jobsite Material & Labor Cost Leakage",
          description:
            "Without real-time sync between field foreman logs and accounting, material theft and unaccounted overtime erode project gross margins by over 20%.",
        },
        {
          title: "Outdated Blueprint & Punch List Versioning",
          description:
            "Subcontractors working off superseded CAD revisions cause rework, structural errors, inspection failures, and expensive project completion delays.",
        },
        {
          title: "Disconnected Requisitions & Purchase Orders",
          description:
            "Waiting days for site requisitions to be verified against central warehouse stock halts field crews and delays critical concrete and steel milestones.",
        },
      ];
    case "inventory":
      return [
        {
          title: "Stockouts & Emergency Reorder Costs",
          description:
            "Relying on manual physical counts causes surprise stockouts of critical parts, halting fulfillment lines and forcing expensive rush shipping.",
        },
        {
          title: "Shrinkage & Untracked Warehouse Loss",
          description:
            "Without serial, batch, and lot-level barcode scanning, items disappear between transfer trucks and secondary job sites with zero auditability.",
        },
        {
          title: "Siloed Stock Across Multiple Locations",
          description:
            "Having no central visibility across distributed depots and satellite stores causes over-purchasing in one branch while another branch sits empty.",
        },
      ];
    case "logistics":
      return [
        {
          title: "Excess Fleet Mileage & Fuel Waste",
          description:
            "Dispatchers manually routing delivery vans waste 25% more fuel and road time than algorithmically optimized multi-stop sequence planning.",
        },
        {
          title: "Lost Paper Proof-of-Delivery (ePOD)",
          description:
            "Disputes over damaged or unreceived cargo persist for weeks when drivers rely on signed paper slips instead of digital geofenced signature capture.",
        },
        {
          title: "Zero Real-Time Fleet Visibility",
          description:
            "Dispatchers are blind to driver delays, traffic bottlenecks, and unauthorized vehicle stops without live telemetry and GPS geofence alerts.",
        },
      ];
    case "sports-ai":
      return [
        {
          title: "Hours Wasted on Manual Video Review",
          description:
            "Coaches spend 4 to 6 hours after every match scrubbing footage to manually clip plays, tally unforced errors, and track player court positions.",
        },
        {
          title: "Subjective, Biased Player Evaluation",
          description:
            "Without computer vision tracking ball trajectory and shot speed, athlete development plans are based on guesswork rather than objective data.",
        },
        {
          title: "High Production Costs for Match Analytics",
          description:
            "Traditional sports data setups require dedicated optical camera rigs costing tens of thousands of dollars, making high-end analytics inaccessible.",
        },
      ];
    case "sports-hub":
      return [
        {
          title: "Court Queue Squabbles & Walkouts",
          description:
            "Disorganized whiteboard queues and favoritism create friction among players waiting for courts, leading to bad reviews and lost court rental revenue.",
        },
        {
          title: "Chaotic Manual Tournament Ladders",
          description:
            "Organizing single/double elimination brackets on paper slips causes scoring errors, delayed start times, and frustrated tournament participants.",
        },
        {
          title: "Unmonitored Membership & Waiver Compliance",
          description:
            "Allowing non-members or unsigned athletes onto courts exposes venue owners to personal injury liabilities and unauthorized facility usage.",
        },
      ];
    case "booking":
      return [
        {
          title: "Double Bookings & Availability Clashes",
          description:
            "Managing reservation calendars across multiple staff members or third-party phone channels leads to embarrassing overbooking errors.",
        },
        {
          title: "High No-Show Rates & Lost Deposits",
          description:
            "Without automated SMS/email reminders and tokenized deposit escrow, customers forget appointments, leaving slots unfillable at the last minute.",
        },
        {
          title: "Disorganized Guest Folios & Check-in Queues",
          description:
            "Requiring guests to fill out manual paper check-in sheets causes lobby congestion and delays billing settlements at checkout.",
        },
      ];
    case "queuing":
      return [
        {
          title: "Overcrowded Waiting Lobbies & Walkouts",
          description:
            "Patients, shoppers, and visitors forced to stand in long physical lines experience high frustration, with over 30% abandoning service entirely.",
        },
        {
          title: "Uneven Teller & Service Bay Workloads",
          description:
            "Without dynamic skill-based ticket routing, some staff are overwhelmed while other service windows sit idle with zero visibility.",
        },
        {
          title: "Lack of Service-Level Bottleneck Data",
          description:
            "Branch managers have no verifiable logs indicating which service categories suffer the longest wait times or cause customer dissatisfaction.",
        },
      ];
    case "rag-engine":
      return [
        {
          title: "Costly AI Hallucinations on Company Policy",
          description:
            "Standard public LLMs guess answers when asked about complex proprietary SOPs, risking catastrophic errors in customer-facing operations.",
        },
        {
          title: "Outdated Internal Knowledge Retrieval",
          description:
            "Employees spend 20% of their workday searching through disorganized Google Drive folders, stale Confluence wikis, and PDF manuals.",
        },
        {
          title: "Uncontrolled Document Access Permissions",
          description:
            "Ingesting sensitive files into AI models without strict role-based document access (RBAC) risks exposing executive compensation and confidential IP.",
        },
      ];
    case "nfc-card":
      return [
        {
          title: "Expensive & Outdated Paper Cards",
          description:
            "88% of paper business cards are tossed in the trash within a week. Re-printing cards whenever a title, phone number, or address changes costs thousands annually.",
        },
        {
          title: "Lost High-Intent In-Person Leads",
          description:
            "Handing out a paper card relies on the prospect manually typing in your contact information, leading to near-zero follow-up conversion rates.",
        },
        {
          title: "Zero Security If a Card is Lost",
          description:
            "Traditional cards cannot be revoked or locked if compromised, leaving sensitive corporate details and contact numbers circulating indefinitely.",
        },
      ];
    case "white-label":
      return [
        {
          title: "Prohibitive Custom Software Development Costs",
          description:
            "Building an enterprise CRM, ERP, or AI platform from scratch requires millions of dollars, years of engineering, and massive ongoing infrastructure maintenance.",
        },
        {
          title: "Vendor Lock-in & Third-Party Branding",
          description:
            "Reselling off-the-shelf software exposes your clients to third-party vendor logos and direct vendor upsells, weakening your agency's brand authority.",
        },
        {
          title: "Inability to Set Custom Client Pricing",
          description:
            "Rigid per-seat retail pricing from global vendors limits your profit margins and prevents you from packaging software into your own high-ticket retainer contracts.",
        },
      ];
    default:
      return [
        {
          title: "Disconnected Data Silos & Spreadsheets",
          description:
            "Operational records scattered across emails, spreadsheets, and legacy tools lead to human error, duplicated data entry, and slow team velocity.",
        },
        {
          title: "Rigid Workflows that Don't Match Reality",
          description:
            "Generic off-the-shelf software forces your operators to change how they work to fit the tool, creating friction and shadow workarounds on the floor.",
        },
        {
          title: "Lack of Auditable Compliance & RBAC",
          description:
            "Without granular role-based permissions and immutable activity logs, operations remain vulnerable to regulatory non-compliance and data security risks.",
        },
      ];
  }
}

/* ── Prompt-Mirror AEO FAQ Generator ── */
function getProductFaqs(product: (typeof bitsProducts)[number]) {
  const bespokeQuestion = getBespokeFaqQuestion(product.id, product.name);

  return [
    {
      q: `Can ${product.name} be deployed on-premises or in a private cloud?`,
      a: `Yes. Like all BITS enterprise engines, ${product.name} can be deployed in a fully managed cloud environment (recommended for automated updates and zero infrastructure overhead) or self-hosted entirely on-premises within your organization's private datacenter for complete data sovereignty and regulatory compliance.`,
    },
    {
      q: `Does ${product.name} receive continuous security updates and improvements?`,
      a: `Yes. All BITS systems receive continuous security patches, vulnerability mitigations, and performance updates. Bespoke operational modifications, new integrations, or custom modules can be engineered upon request as your organization's workflows scale.`,
    },
    {
      q: bespokeQuestion.q,
      a: bespokeQuestion.a,
    },
    {
      q: `How does ${product.name} integrate with other BITS modules?`,
      a: `Every BITS engine shares a unified API contract and schema layer. For example, ${product.name} natively interconnects with BITS Accounting & ERP, BITS Payroll, BITScrm, and BITSagent AI, eliminating manual duplicate data entry across departments.`,
    },
    {
      q: `Can ${product.name} be white-labeled under our own corporate branding?`,
      a: `Yes. Through the BITS White Label Platform, you can deploy ${product.name} fully rebranded under your own company logo, custom domain, and color palette with zero mention of BITS, maintaining 100% brand equity with your customers and stakeholders.`,
    },
    {
      q: `What compliance and statutory standards does ${product.name} adhere to?`,
      a: `${product.name} is engineered to adhere to ${product.complianceBadges.join(", ")}, ensuring full compliance with local regulatory authorities and international enterprise security standards.`,
    },
  ];
}

function getBespokeFaqQuestion(id: string, name: string) {
  switch (id) {
    case "accounting":
      return {
        q: "Is BITS Accounting & ERP ready for BIR Computerized Accounting System (CAS) registration?",
        a: "Yes. BITS Accounting & ERP produces audit-compliant general journals, sales books, purchase journals, and general ledgers structured to satisfy the documentary and system controls required for Bureau of Internal Revenue (BIR) CAS accreditation in the Philippines.",
      };
    case "payroll":
      return {
        q: "Does BITS Payroll support batch disbursement files for Philippine commercial banks?",
        a: "Yes. BITS Payroll exports encrypted batch payment disbursement files formatted for BDO, BPI (BizLink), Metrobank, UnionBank, Security Bank, and RCBC, allowing one-click payroll clearance with zero manual account re-entry.",
      };
    case "hrms":
      return {
        q: "Can BITS HRMS connect with our existing biometric timekeeping hardware?",
        a: "Yes. BITS HRMS integrates with industry-standard ZKTeco, Hikvision, and IP-based biometric facial recognition and fingerprint terminals, automatically pulling clock-in logs into agent timesheets in real time.",
      };
    case "nfc-card":
      return {
        q: "Does the person tapping my BITS Smart NFC Card need to install an app?",
        a: "No. The recipient does not need any app. When they tap your card with their iPhone or Android device, their native browser opens your digital bio profile instantly, allowing them to download your .vCard with one tap.",
      };
    case "white-label":
      return {
        q: "Can we sell white-labeled BITS engines to our clients at our own custom pricing?",
        a: "Yes. Under our White Label Reseller agreement, you set your own retail seat prices, monthly retainers, or setup fees. BITS charges you a wholesale infrastructure rate while you retain 100% of your client margins.",
      };
    case "sales":
      return {
        q: "Does BITS Sales CRM include automated CPQ quoting and deal pipeline forecasting?",
        a: "Yes. BITScrm Sales features visual drag-and-drop Kanban deal boards, automated territory routing, AI win-probability scoring, and a full Configure, Price, Quote (CPQ) document generator that outputs branded PDF proposals.",
      };
    case "logistics":
      return {
        q: "Does the BITS Logistics driver mobile app work offline in areas with poor cellular coverage?",
        a: "Yes. The driver mobile app caches route itineraries and delivery manifests offline. Signatures, photos, and electronic proof of delivery (ePOD) timestamps sync automatically once connectivity is restored.",
      };
    case "sports-ai":
      return {
        q: "What camera or smartphone equipment is required to use BITS AI Sports Scoring?",
        a: "Any standard smartphone (iPhone or Android), GoPro, or high-definition camera placed on a tripod with a clear view of the court can be used. Our computer vision engine ingests standard MP4/MOV footage and extracts match metrics in under 90 seconds.",
      };
    default:
      return {
        q: `How long does an operational onboarding rollout take for ${name}?`,
        a: `Standard scoped rollouts take between 1 to 3 weeks depending on historical data migration complexity, integration touchpoints, and custom workflow rules. We handle initial data import, schema configuration, and staff training.`,
      };
  }
}

function getCrmSynergy(currentId: string, siblingId: string): string {
  if (siblingId === "service") {
    return "Shares real-time customer histories, omnichannel ticketing, and supervisor audio whisper logs directly with your account records.";
  }
  if (siblingId === "sales") {
    return "Transitions qualified inbound leads into visual Kanban deal stages with AI win-probability scoring and CPQ quote generation.";
  }
  if (siblingId === "marketing") {
    return "Triggers automated omnichannel SMS, Viber, and email sequences based on account status, DPD aging, or deal milestones.";
  }
  if (siblingId === "commerce") {
    return "Instantly bills enterprise retainers, licenses, and metered usage via PCI-DSS tokenized card or Maya gateways with automated dunning.";
  }
  return "Natively synchronizes customer accounts, interactions, and operational audit trails on one shared database schema.";
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = bitsProducts.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  const problems = getProductProblems(product);
  const faqs = getProductFaqs(product);

  const isCrmProduct = product.category === "crm" || product.id === "service";
  const otherCrmVariants = bitsProducts.filter(
    (p) => (p.category === "crm" || p.id === "service") && p.id !== product.id
  );
  const crmVariantsList = [
    { id: "service", label: "Customer Service", href: "/products/service" },
    { id: "sales", label: "Sales Pipeline", href: "/products/sales" },
    { id: "marketing", label: "Marketing Journeys", href: "/products/marketing" },
    { id: "commerce", label: "Commerce & Billing", href: "/products/commerce" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
        name: product.name,
        item: `${site.url}/products/${product.id}`,
      },
    ],
  };

  const isHardware = product.id === "nfc-card";
  const productSchema = isHardware
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        alternateName: [
          `BITS ${product.shortName}`,
          `Boundless IT Solutions ${product.name}`,
          `Boundless IT Solutions ${product.shortName}`,
          product.shortName,
        ],
        description: product.description,
        url: `${site.url}/products/${product.id}`,
        brand: {
          "@type": "Brand",
          name: "Boundless IT Solutions",
          alternateName: "BITS",
        },
        manufacturer: {
          "@type": "Organization",
          name: "BITS - Boundless IT Solutions",
          legalName: "Boundless IT Solutions",
          url: site.url,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "PHP",
          price: "1499",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: `${site.url}/products/${product.id}`,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: product.name,
        alternateName: [
          `BITS ${product.shortName}`,
          `BITS ${product.name}`,
          `Boundless IT Solutions ${product.name}`,
          `Boundless IT Solutions ${product.shortName}`,
          product.shortName,
        ],
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Managed Cloud, Sovereign On-Premises",
        description: product.description,
        url: `${site.url}/products/${product.id}`,
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
          price: "28500",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: `${site.url}/products/${product.id}`,
        },
      };

  return (
    <main id="content" className="pt-20">
      {/* Schema.org Structured Data for Answer Engine Optimization (AEO) & Google Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.07),rgba(255,255,255,0))]" />
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
                  {product.shortName}
                </span>
              </div>
            </Reveal>

            {/* Interactive CRM Variant Switcher Bar */}
            {isCrmProduct && (
              <Reveal delay={0.03} y={10}>
                <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-blue-200/90 bg-slate-50/90 p-1.5 shadow-xs backdrop-blur-md">
                  <span className="px-2.5 text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline-block">
                    CRM Suite:
                  </span>
                  {crmVariantsList.map((v) => {
                    const isActive = v.id === product.id;
                    return (
                      <Link
                        key={v.id}
                        href={v.href}
                        className={cn(
                          "inline-flex min-h-[36px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-150",
                          isActive
                            ? "bg-white text-blue-700 shadow-xs ring-1 ring-blue-200"
                            : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                        )}
                      >
                        {isActive && <span className="size-1.5 rounded-full bg-blue-600" />}
                        <span>{v.label}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/products/crm"
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-xl bg-blue-100/70 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors"
                  >
                    <span>Architecture Hub</span>
                    <span>→</span>
                  </Link>
                </div>
              </Reveal>
            )}

            {/* H1 Headline */}
            <Reveal delay={0.06} y={16}>
              <h1 className="text-display text-balance font-bold leading-[1.08] text-slate-900">
                {product.name}
              </h1>
            </Reveal>

            {/* Tagline & Subtitle */}
            <Reveal delay={0.12} y={14}>
              <p className="mt-3 text-lg font-bold text-blue-600 sm:text-xl">
                {product.tagline}
              </p>
              <p className="text-lede mx-auto mt-4 max-w-[62ch] text-pretty text-slate-600">
                {product.description}
              </p>
            </Reveal>

            {/* Action CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
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
                    className="flex h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] sm:w-auto"
                  >
                    View Enterprise Pricing
                  </Link>
                </Magnetic>
              </div>

              {/* Reassurance Row */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Managed Cloud (Recommended) or On-Prem
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Continuous Security Updates
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> White-Label Ready
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. KPI Benchmark Strip */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                {product.metrics.value}
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">
                {product.metrics.label}
              </p>
              <p className="text-[0.72rem] text-slate-500">Measured customer benchmark</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-emerald-600 sm:text-4xl">
                99.99%
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Availability SLA</p>
              <p className="text-[0.72rem] text-slate-500">Dual-redundant architecture</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
                0-Day
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Audit Trail Latency</p>
              <p className="text-[0.72rem] text-slate-500">Immutable WORM activity logs</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                100%
              </div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Data Sovereignty</p>
              <p className="text-[0.72rem] text-slate-500">Private VPC or On-Prem</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. The Operational Problem Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              The Operational Problem
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Why off-the-shelf software and spreadsheets fail in this domain.
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Rigid workflows, disconnected systems, and compliance oversights create hidden costs
              that erode operational margins every single month.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {problems.map((problem, i) => (
              <div
                key={problem.title}
                className="relative flex flex-col rounded-[2rem] border border-slate-200/90 bg-slate-50/50 p-8 shadow-xs transition-all hover:border-blue-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-mono text-sm font-bold">
                  0{i + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{problem.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Signature Interactive Board Mockup */}
      <section className="bg-slate-50/60 py-20 sm:py-28 border-b border-slate-200/70">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Live Workspace Console
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Experience {product.name} in Action
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Engineered with clean light-mode surfaces, real-time status cues, and zero clutter.
              Explore the live interactive module below.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
            <ProductMockupBoard productId={product.id} />
          </div>
        </Container>
      </section>

      {/* 5. Architectural Capabilities & Compliance Badges */}
      <section className="bg-white py-20 sm:py-28 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Engineered Architecture
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Core Capabilities & Technical Specifications
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Built on scalable, type-safe foundations designed around your organization&apos;s real
              operational throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((cap, idx) => (
              <div
                key={cap}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 transition-all hover:bg-white hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs mt-0.5">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{cap}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Engineered for high-volume enterprise operations with full auditability.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Alignment Grid */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Statutory & Compliance Certifications Aligned
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Validated against national regulatory circulars and international security benchmarks.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.complianceBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs"
                  >
                    <ShieldCheck className="size-4 text-blue-600" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Deployment Models & Security Guarantee */}
      <section className="bg-slate-50/60 py-20 sm:py-24 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-white to-indigo-50/80 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div>
                <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  Deployment Scoping
                </span>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl mt-2">
                  Cloud or On-Premises. Built around your data sovereignty.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  All BITS systems can be deployed on-premises or on cloud. We recommend managed cloud for
                  automatic scaling, continuous security patches, and effortless backups, but on-premise
                  deployment is fully supported for banking, government, or high-security compliance.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200">
                    <Cloud className="size-4 text-blue-600" />
                    Managed Cloud (Recommended)
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200">
                    <Server className="size-4 text-indigo-600" />
                    Sovereign On-Premises
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs">
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong>Continuous Security:</strong> Continuous improvement and security patches applied automatically as new threats evolve.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong>Tailored Evolution:</strong> Custom features and workflow modifications can be engineered upon request as your team scales.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong>White-Label Ready:</strong> Deploy under your company&apos;s custom domain and branding with zero BITS attribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6.5. Cross-Variant CRM Architecture Section (For all CRM variants) */}
      {isCrmProduct && (
        <section className="bg-slate-50/70 py-20 sm:py-28 border-b border-slate-200/60">
          <Container>
            <div className="mx-auto max-w-3xl text-center mb-14">
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                Unified Revenue Architecture
              </span>
              <h2 className="text-h2 mt-3 font-bold text-slate-900">
                Four Specialized Variants. One Sovereign Data Layer.
              </h2>
              <p className="text-lede mt-4 text-slate-600">
                BITScrm variants operate together seamlessly without fragile third-party webhooks or API duct tape.
                Deploy {product.name} today, then activate sibling variants on the same database schema as your operations scale.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherCrmVariants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 text-[0.65rem] font-bold text-blue-700 uppercase tracking-wider">
                        {variant.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {variant.metrics.value}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{variant.name}</h3>
                    <p className="mt-1 text-xs font-medium text-blue-600">{variant.tagline}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      {variant.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                        Synergy with {product.shortName}:
                      </p>
                      <p className="mt-1 text-xs text-slate-700 font-medium">
                        {getCrmSynergy(product.id, variant.id)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={variant.ctaHref}
                      className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-blue-600 hover:text-white transition-all shadow-2xs cursor-pointer"
                    >
                      <span>Explore {variant.shortName}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-blue-200 bg-white p-6 sm:p-8 text-center shadow-xs">
              <div className="mx-auto max-w-2xl">
                <h4 className="text-base font-bold text-slate-900">
                  Need a multi-variant CRM deployment for your enterprise?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Combine Customer Service, Sales, Marketing, and Commerce under a single unified database with bespoke role permissions and zero data-replatforming headaches.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/products/crm"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <span>Explore Master CRM Architecture Hub</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Request Scoping Call
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 7. Prompt-Mirror AEO FAQ Section */}
      <section className="bg-white py-20 sm:py-28 border-b border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Everything you need to know about {product.shortName}
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Clear, direct, and factual answers for technical directors, operations leaders, and
              compliance officers.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
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
              Ready to deploy {product.name} on your floor?
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[48ch] text-slate-600">
              Schedule an operational scoping consultation with our engineering team. We analyze your
              bottlenecks and configure a tailored proof-of-concept for your team.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 font-bold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Request Architecture Consultation
              </Link>
              <Link
                href="/#products-suite"
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 active:scale-[0.98]"
              >
                Explore All 18 Engines
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
