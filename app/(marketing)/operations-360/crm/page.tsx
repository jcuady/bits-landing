import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  PhoneCall,
  Headset,
  TrendingUp,
  Mail,
  CreditCard,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

/**
 * BITScrm — the CRM module of Operations 360.
 *
 * Rebuilt from /products/crm (762 lines). The five CRM workspaces were
 * separate catalogue pages competing with the flagship for the same "collections
 * CRM" intent. They are now named sections on one canonical URL.
 *
 * CARRIED OVER VERBATIM (the SEO and sales assets):
 *   - ARCHITECTURE_COMPARISONS — the 5-dimension "Frankenstein stack vs unified"
 *   - The FAQ set, reworded for module framing
 *   - Each workspace's metric and key features
 *
 * DROPPED: the "dedicated pages for every variant" link grid, which dies with
 * the collapse, and the published `offers` block, which exposed a PHP price.
 *
 * Progressive activation is the central promise: start with Collections, add
 * the others as you grow, with no data migration or replatforming.
 */

/* ── The five CRM workspaces ── */
const WORKSPACES = [
  {
    id: "collections",
    name: "BITScrm Collections",
    role: "Recover the accounts",
    badge: "Start here",
    icon: PhoneCall,
    tagline: "High-Volume Debt Recovery, Delinquent Portfolio Staging & Supervisory Telephony",
    description:
      "Engineered for debt recovery agencies, BPO contact centres, and financial lenders. Centralises delinquent portfolio staging, WebRTC predictive softphone dialing, automated Promise-to-Pay (PTP) tracking, and live supervisor barge-in HUD.",
    metric: { value: "3.2x", label: "Right-Party Connect" },
    keyFeatures: [
      "Dynamic Debtor & Account Staging Queues",
      "WebRTC In-Browser SIP Softphone & Auto-Dialer",
      "Automated Promise-to-Pay (PTP) Scheduling Engine",
      "Supervisor Listen, Whisper & Barge-in HUD",
    ],
  },
  {
    id: "support",
    name: "BITScrm Support",
    role: "Serve the customer",
    badge: "Helpdesk core",
    icon: Headset,
    tagline: "Omnichannel Ticket Queue, Real-Time SLA Countdown & AI Sentiment Telemetry",
    description:
      "Built for enterprise helpdesks, technical support teams, and customer care centres. Centralises cross-channel ticketing across email, live chat, portal and API, with multi-tier P1–P4 SLA countdowns and automated resolution macros.",
    metric: { value: "+46%", label: "First Contact Resolution" },
    keyFeatures: [
      "Omnichannel Unified Ticket Inbox (Email, Chat, Portal, API)",
      "Multi-Tier P1–P4 Priority & Real-Time SLA Countdown HUD",
      "AI-Powered Customer Sentiment Detection & Escalation",
      "One-Click Automated Responses & Resolution Macros",
    ],
  },
  {
    id: "sales",
    name: "BITScrm Sales",
    role: "Win the deal",
    badge: "Revenue engine",
    icon: TrendingUp,
    tagline: "High-Velocity Revenue Pipeline, Kanban & Deal Intelligence",
    description:
      "Purpose-built for institutional sales, B2B deal structuring, and corporate loan origination. Combines visual Kanban pipeline stages, AI deal win-probability scoring, automated territory routing, and CPQ quote-to-cash workflows.",
    metric: { value: "+38%", label: "Pipeline Velocity" },
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
    role: "Reach the audience",
    badge: "Audience automation",
    icon: Mail,
    tagline: "Omnichannel Customer Journeys & Audience Automation",
    description:
      "Orchestrates multi-touch customer acquisition, debtor re-engagement, and loan lifecycle journeys across SMS, Viber, email and webhooks, with closed-loop attribution analytics and strict consent management.",
    metric: { value: "4.5x", label: "Engagement Lift" },
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
    role: "Take the payment",
    badge: "Billing core",
    icon: CreditCard,
    tagline: "B2B/B2C Digital Storefronts, Invoicing & Subscription Engine",
    description:
      "Unified commerce architecture supporting flexible recurring subscriptions, usage-based billing, multi-currency invoicing, smart dunning recovery, and tokenised payment gateway integrations with BIR CAS alignment.",
    metric: { value: "99.99%", label: "Billing Accuracy" },
    keyFeatures: [
      "Recurring Subscription & Usage-Based Billing",
      "Tokenized Multi-Gateway Payment Processing",
      "Automated Tax Calculation & Compliant Invoicing",
      "Smart Dunning & Failed Payment Auto-Recovery",
    ],
  },
] as const;

/* ── Carried over verbatim from /products/crm ── */
const ARCHITECTURE_COMPARISONS = [
  {
    dimension: "Database Architecture",
    fragmented:
      "4-5 disparate vendor databases with delayed, fragile webhook syncs",
    bits: "Single sovereign database schema with real-time zero-copy interconnects",
  },
  {
    dimension: "Customer Lifecycle",
    fragmented:
      "Reps re-key customer information across CRM, billing, and support tools",
    bits: "Unified customer master record across lead, deal, payment, and support stages",
  },
  {
    dimension: "AI Grounding",
    fragmented:
      "Chatbots trapped inside single silos without access to billing or call history",
    bits: "Native BITSagent AI grounded in full omnichannel history and enterprise RAG",
  },
  {
    dimension: "Data Sovereignty",
    fragmented:
      "Locked into US multi-tenant clouds with unpredictable vendor price hikes",
    bits: "Deployable on private cloud VPC or sovereign on-premises with local compliance",
  },
  {
    dimension: "Licensing Model",
    fragmented:
      "Expensive per-seat per-app penalties compounding across departments",
    bits: "Predictable enterprise licensing with custom bundle packaging and white-labeling",
  },
] as const;

const CRM_FAQS = [
  {
    q: "Can we deploy one CRM workspace today and activate others later?",
    a: "Yes. Every BITScrm workspace is fully functional from day one. When you activate an additional workspace — adding Support to Collections, or Commerce to Sales — it connects instantly to your existing customer database with no data migration, no schema rewriting, and no replatforming. This is the difference between a module on Operations 360 and a second vendor.",
  },
  {
    q: "How does BITScrm eliminate data replatforming between departments?",
    a: "Traditional companies run sales on Salesforce, customer support on Zendesk, and billing on Stripe or Chargebee, which creates data silos. BITScrm uses a unified core schema where customer accounts, contact logs, quotes, transactions, and support tickets live in the same high-performance relational store.",
  },
  {
    q: "Can BITScrm be deployed on-premises for banking and regulatory compliance?",
    a: "Yes. Alongside fully managed cloud deployments on AWS or Azure private VPCs, BITS supports full sovereign on-premises bare-metal deployment for banks, government entities, and high-security institutions, aligned with BSP Circulars 454 and 857 and NPC RA 10173.",
  },
  {
    q: "Does BITScrm integrate with BITSagent conversational voice AI?",
    a: "Natively — there is nothing to integrate. BITSagent AI is a module of the same Operations 360 platform, so voice and email agents read and write the same CRM record. An agent can autonomously dial overdue debtors, negotiate payment plans, and write confirmed PTP schedules into the database in real time.",
  },
  {
    q: "How does BITScrm Commerce handle Philippine tax compliance?",
    a: "BITScrm Commerce includes built-in BIR Computerized Accounting System (CAS) audit alignment, automated 12% VAT calculations, withholding tax schedules, and official receipt (OR) electronic stamp generation.",
  },
  {
    q: "How is BITScrm priced?",
    a: "Pricing is not published. BITS sizes every engagement to the seat count and operational scope, and issues a quote through a consultation with a company representative. There is no per-seat penalty and no per-app surcharge.",
  },
] as const;

export const metadata: Metadata = {
  title:
    "BITScrm — Collections CRM Module of Operations 360 | BITS",
  description:
    "BITScrm is the CRM module of Operations 360: five purpose-built workspaces for collections, support, sales, marketing and commerce on one zero-replatforming database. Predictive dialing built in, no per-seat licensing.",
  keywords: [
    "bitscrm",
    "collections crm software philippines",
    "debt collection software philippines",
    "predictive dialer crm",
    "supervisory call monitoring crm",
    "bsp collections compliance software",
    "omnichannel contact center crm",
    "crm helpdesk philippines",
    "sales pipeline crm philippines",
    "ecommerce invoicing philippines",
    "customer support helpdesk software",
  ],
  alternates: { canonical: `${site.url}/operations-360/crm` },
  openGraph: {
    title: "BITScrm — Collections CRM Module of Operations 360",
    description:
      "Five workspaces, one database, no replatforming. Start with Collections and activate the rest as you grow.",
    url: `${site.url}/operations-360/crm`,
    siteName: site.legalName,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BITScrm — CRM Module of Operations 360",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITScrm — CRM Module of Operations 360",
    description:
      "Five workspaces, one database, no replatforming.",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/operations-360/crm#software`,
      name: "BITScrm",
      alternateName: ["BITScrm", "BITS CRM Cloud", "Boundless IT Solutions CRM"],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Managed Cloud, Sovereign On-Premises",
      url: `${site.url}/operations-360/crm`,
      description:
        "BITScrm is the customer relationship module of Operations 360, BITS' sovereign enterprise platform for collections agencies in the Philippines. Five purpose-built workspaces — Collections, Support, Sales, Marketing and Commerce — run on a single zero-replatforming database schema, so you can start with one and activate the rest as you grow with no data migration. Pricing is provided on request through a consultation with a BITS representative.",
      featureList: WORKSPACES.map(
        (w) => `${w.name} — ${w.tagline}. ${w.description}`,
      ),
      isPartOf: { "@type": "WebSite", url: site.url },
      provider: {
        "@type": "Organization",
        name: "Boundless IT Solutions",
        alternateName: ["BITS"],
        url: site.url,
        foundingDate: "2026",
        address: { "@type": "PostalAddress", addressCountry: "PH" },
        sameAs: [
          "https://www.linkedin.com/company/boundless-it-solutions-opc/",
          "https://www.facebook.com/p/Boundless-It-Solutions-61594430590134/",
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/operations-360/crm#faq`,
      mainEntity: CRM_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/operations-360/crm#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Operations 360",
          item: `${site.url}/operations-360`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "BITScrm",
          item: `${site.url}/operations-360/crm`,
        },
      ],
    },
  ],
};

export default function BitsCrmModulePage() {
  return (
    <main id="content" className="bg-navy-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <Section className="bg-navy-950">
        <Container>
          <Reveal>
            <Link
              href="/operations-360"
              className="inline-flex items-center gap-2 text-sm font-medium text-mist transition hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Operations 360
            </Link>
          </Reveal>

          <Reveal>
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-signal-300">
              Module of Operations 360
            </p>
          </Reveal>

          <Reveal>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Recover the accounts.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-skywash/80">
              BITScrm is a collections CRM, not a sales CRM with debt bolted on.
              It ships inside Operations 360 and runs on the same database — so
              there is nothing to integrate and no second system to reconcile.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-electric-500 px-7 py-3.5 font-semibold text-white transition hover:bg-electric-600"
              >
                Request a quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Book a live floor demo
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── The five workspaces ── */}
      <Section className="bg-navy-900">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Five workspaces. One database.
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-skywash/70">
              Start with Collections. Activate the others when you need them —
              they connect instantly, with no data migration and no
              replatforming.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {WORKSPACES.map((workspace) => (
              <Reveal key={workspace.id}>
                <article
                  id={workspace.id}
                  className="scroll-mt-24 rounded-2xl border border-white/10 bg-navy-800/60 p-7 sm:p-9"
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-electric-500/15">
                        <workspace.icon
                          className="size-5 text-signal-300"
                          aria-hidden
                        />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-semibold text-white">
                            {workspace.name}
                          </h3>
                          <span className="rounded-full border border-white/15 px-3 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mist">
                            {workspace.badge}
                          </span>
                        </div>
                        <p className="mt-1.5 font-medium text-electric-400">
                          {workspace.role}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-3xl font-bold text-white">
                        {workspace.metric.value}
                      </p>
                      <p className="text-xs uppercase tracking-[0.14em] text-mist">
                        {workspace.metric.label}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-medium leading-relaxed text-skywash/80">
                    {workspace.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {workspace.description}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {workspace.keyFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-mist"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-signal-300"
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Frankenstein vs unified ── */}
      <Section className="bg-navy-950">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The five engines synchronise in real time
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-skywash/70">
              Most stacks stitch five tools together and hope. These are five
              workspaces on one schema.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Comparison of a fragmented SaaS stack against unified BITScrm
                </caption>
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold text-white">
                      Dimension
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 font-semibold text-mist"
                    >
                      Fragmented stack
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-signal-300">
                      Unified BITScrm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ARCHITECTURE_COMPARISONS.map((row, index) => (
                    <tr
                      key={row.dimension}
                      className={
                        index % 2 === 0
                          ? "border-t border-white/5"
                          : "border-t border-white/5 bg-white/[0.02]"
                      }
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 align-top font-semibold text-white"
                      >
                        {row.dimension}
                      </th>
                      <td className="px-5 py-4 align-top text-mist">
                        {row.fragmented}
                      </td>
                      <td className="px-5 py-4 align-top text-skywash/85">
                        {row.bits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section className="bg-navy-900">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to know
            </h2>
          </Reveal>

          <div className="mt-10 space-y-4">
            {CRM_FAQS.map((faq) => (
              <Reveal key={faq.q}>
                <details className="group rounded-2xl border border-white/10 bg-navy-800/60 p-6">
                  <summary className="cursor-pointer list-none text-base font-semibold text-white marker:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {faq.q}
                      <span
                        className="mt-1 shrink-0 text-signal-300 transition group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-mist">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-navy-950" tight>
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-navy-800/60 px-8 py-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Ready to unify your customer &amp; revenue operations?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-skywash/75">
                Tell us which workspaces you need today. We will size the
                deployment to your floor and show you what the rest would cost
                to add later.
              </p>
              <Link
                href="/pricing"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-electric-500 px-7 py-3.5 font-semibold text-white transition hover:bg-electric-600"
              >
                Request a quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}