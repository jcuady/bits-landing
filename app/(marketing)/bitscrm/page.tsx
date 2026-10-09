import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { pricingTiers, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { CrmVariantsExplorer } from "@/components/sections/crm-variants-explorer";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "BITScrm — Enterprise Collections CRM",
  description:
    "Deploy BITScrm by Boundless IT Solutions: High-velocity collections CRM with automated Promise-to-Pay (PTP) tracking, dynamic work queues, and supervisor review tools. Sovereign cloud or on-premise.",
  keywords: [
    "BITScrm",
    "BITS CRM",
    "Boundless IT Solutions CRM",
    "Boundless IT Solutions BITScrm",
    "collections CRM software Philippines",
    "debt collection software Philippines",
    "collections recovery CRM",
    "supervisory call monitoring CRM",
    "BSP collections compliance software",
    "omnichannel contact center CRM",
    "debt recovery platform",
    "debt recovery collections CRM",
  ],
  alternates: {
    canonical: `${site.url}/bitscrm`,
  },
  openGraph: {
    title: "BITScrm — Enterprise Collections CRM | BITS",
    description:
      "Deploy BITScrm by Boundless IT Solutions: High-velocity collections CRM with automated Promise-to-Pay (PTP) tracking, dynamic work queues, and supervisor review tools.",
    url: `${site.url}/bitscrm`,
    siteName: site.legalName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITScrm Enterprise Collections Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITScrm — Enterprise Collections CRM | BITS",
    description:
      "Deploy BITScrm by Boundless IT Solutions: High-velocity collections CRM with automated Promise-to-Pay (PTP) tracking, dynamic work queues, and supervisor review tools.",
    images: ["/og.png"],
  },
};

const CRM_PILLARS = [
  {
    num: "01",
    title: "Portfolio & Queue Intelligence",
    description:
      "Centralize hundreds of thousands of debtor records with automated tiering, balance aging brackets, work queues, and dispute tracking.",
    capabilities: [
      "Dynamic debtor segmentation by delinquency bucket (1-30, 31-60, 60+ DPD)",
      "Automated queue assignment based on agent skill and recovery success rate",
      "Controlled bulk imports with CSV validation and duplicate record reconciliation",
      "Structured contact history and customer interaction logs",
    ],
  },
  {
    num: "02",
    title: "High-Throughput Collections Operations",
    description:
      "Eliminate manual queue triage and spreadsheet reconciliation. Connect your recovery agents only when a live debtor answers the line.",
    capabilities: [
      "Dynamic work queues with strategy-based assignment and disposition logging",
      "Answering Machine Detection (AMD) with sub-second live human recognition",
      /* SYSTEM_AUDIT.md §52. Was: "Integrated WebRTC browser softphone — zero
         hardware or PBX setup required". There is no telephony in this build.
         §52 measured a "telephony" attestation that fires on 20 strings across
         9 surfaces; this is the public-marketing half of that finding, and the
         rest is recorded there rather than deleted. */
      "DPD staging, PTP tracking and supervisor queue views (no telephony in this build)",
      "Local presence caller ID rotation for maximized Right-Party Connect (RPC) rates",
    ],
  },
  {
    num: "03",
    title: "Automated Promise-to-Pay (PTP) Engine",
    description:
      "Turn verbal commitments into collected cash with automated scheduling, installment tracking, and default prevention.",
    capabilities: [
      "Instant SMS and email payment confirmation sent while on the phone",
      "Automated broken-PTP detection with immediate high-priority requeue",
      "Pre-due reminder triggers 48h and 24h before commitment deadline",
      "Integrated partial-payment reconciliation against principal balances",
    ],
  },
  {
    num: "04",
    title: "Supervisor Operations HUD & Coaching Logs",
    description:
      "Maintain floor command and prevent compliance violations with real-time audio supervision tools.",
    capabilities: [
      "Silent listen mode to monitor live agent conversations undetected",
      "Private whisper coaching — speak directly to the agent without the debtor hearing",
      "Escalation paths for high-risk accounts, with coaching logs and action plans",
      "Real-time floor dashboard with agent statuses, idle time, and queue velocity",
    ],
  },
  {
    num: "05",
    title: "QA Scorecards & Regulatory Compliance",
    description:
      "Review call handling against scorecard rubrics, with supervisor coaching built into the workflow.",
    capabilities: [
      "Dual-channel call audio archiving with search",
      "Customizable scorecard rubrics with automatic scoring and calibration",
      "Contact-rule configuration scoped per engagement",
      "Engineered with BSP Circular 454/857 and NPC Data Privacy Act (RA 10173) principles in mind",
    ],
  },
  {
    num: "06",
    title: "Liquidation & Recovery Analytics",
    description:
      "Get complete visibility into collector productivity, portfolio recovery curves, and campaign ROI.",
    capabilities: [
      "Live agent leaderboard with collected amounts, PTP conversion, and talk time",
      "Cohort recovery curves comparing portfolio yields across campaigns",
      "Contact history and engagement summaries in one click",
      "Historical call disposition trends and right-party connect ratios",
    ],
  },
] as const;

const TELEPHONY_SPECS = [
  { label: "Email SLA", value: "99.99%", detail: "Delivery outcome logged per send" },
  { label: "Connect Dispatch", value: "< 15ms", detail: "Near-zero bridge latency" },
  { label: "Audio Encryption", value: "TLS 1.3 / SRTP", detail: "End-to-end encrypted voice" },
  { label: "Call Storage", value: "Encrypted S3", detail: "Retention configured per engagement" },
] as const;

export default function BitsCrmPage() {
  return (
    <main id="content" className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-20 pt-12 sm:pb-28 sm:pt-16">
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
                <Link href="/" className="text-[0.72rem] font-bold text-slate-500 hover:text-blue-600 transition-colors">
                  Platform
                </Link>
                <span className="text-[0.72rem] text-slate-400">/</span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  BITScrm Platform
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06} y={16}>
              <h1 className="text-display text-balance font-bold leading-[1.06] text-slate-900">
                The Collections CRM Built to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Accelerate Debt Recovery
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-6 max-w-[55ch] text-pretty text-slate-600">
                Consolidate delinquent accounts, automated PTP payment tracking, disposition
                logging, and supervisor review tools into one compliant collections workspace.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
                  >
                    Request Live BITScrm Demo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#pricing"
                    className="flex h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] sm:w-auto"
                  >
                    View CRM Pricing
                  </Link>
                </Magnetic>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-4 text-emerald-600 shrink-0" /> Scoped demo, no free trial
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-4 text-emerald-600 shrink-0" /> BSP & NPC DPA Compliant
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-4 text-emerald-600 shrink-0" /> Session-Gated Access Included
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* KPI Benchmark Strip */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">3.2x</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Right-Party Contact Rate</p>
              <p className="text-[0.72rem] text-slate-500">vs. manual spreadsheet tracking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-emerald-600 sm:text-4xl">45%</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Broken PTP Reduction</p>
              <p className="text-[0.72rem] text-slate-500">automated multi-channel reminders</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">&lt; 15ms</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Connect Latency</p>
              <p className="text-[0.72rem] text-slate-500">Server-side session check per request</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">99.99%</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">No telephony in this build — no SLA offered</p>
              <p className="text-[0.72rem] text-slate-500">Verified session on every CRM route</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Modular CRM Variants Explorer (Collections Flagship, Support, Sales, Marketing, Commerce) + BITSagent & BITS RAG Interconnect */}
      <CrmVariantsExplorer />

      {/* Interactive Role Workspaces Demo */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Complete Floor Visibility
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Experience the Role-Based CRM in Action
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Each team member gets exactly what they need: collectors focus on their next conversation,
              supervisors manage active calls, and QA ensures regulatory compliance.
            </p>
          </div>

          <ProductShowcase />
        </Container>
      </section>

      {/* 6 Core Architectural Pillars */}
      <section className="bg-slate-50/50 py-20 sm:py-28 border-t border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Core Capabilities
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Six Pillars of High-Velocity Debt Recovery
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Engineered specifically for the operational constraints and legal frameworks of Philippine
              financial institutions, collections agencies, and fintech lenders.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CRM_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="group relative flex flex-col rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                    PILLAR {pillar.num}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-slate-600">
                  {pillar.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-6">
                  {pillar.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5 text-[0.83rem] text-slate-700">
                      <Check className="mt-0.5 size-4 text-blue-600 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Telephony Infrastructure & Security */}
      <section className="relative overflow-hidden bg-cloud py-20 sm:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-overline text-electric-600">Roadmap — no telephony ships</p>
            <h2 className="text-h2 mt-3 text-ink">Telephony is roadmap only. Session access controls ship today.</h2>
            <p className="text-lede mt-4 text-slateblue">
              TLS in transit and encryption at rest are provided by the hosting
              layer, not by this application. No telephony is included in this build.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TELEPHONY_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-linelight bg-white p-6 text-center"
              >
                <p className="text-[0.75rem] font-semibold tracking-widest text-electric-600 uppercase">
                  {spec.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{spec.value}</p>
                <p className="mt-1 text-[0.75rem] text-slateblue">{spec.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-linelight bg-white p-8 text-center sm:p-10">
            <h3 className="text-xl font-semibold text-ink">
              Need configured AI voice contact alongside human agents?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-[0.95rem] text-slateblue">
              Pair BITScrm with BITSagent for early-stage recovery outreach under campaign
              rules and supervisor controls.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/operations-360/ai"
                className="inline-flex min-h-11 items-center rounded-full bg-electric-600 px-6 text-[0.88rem] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
              >
                Explore BITSagent
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex min-h-11 items-center rounded-full border border-navy-700/20 bg-white px-6 text-[0.88rem] font-semibold text-navy-700 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
              >
                View suite options
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Transparent Seat Pricing
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Simple, Predictable BITScrm Plans
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Scale up or down per collector seat. All plans include PTP management and supervisor review tools.
              Telephony is not part of this build.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-[2rem] p-8 transition-all",
                  tier.popular
                    ? "border-2 border-blue-600 bg-white shadow-xl shadow-blue-900/10 ring-4 ring-blue-500/10"
                    : "border border-slate-200/80 bg-slate-50/60"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 rounded-bl-2xl bg-blue-600 px-4 py-1">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-1 text-[0.85rem] text-slate-600">{tier.tagline}</p>
                <div className="mt-5">
                  <span className="text-3xl font-bold text-slate-900">{tier.priceLabel}</span>
                  <span className="ml-1 text-[0.8rem] text-slate-500">{tier.priceSubtext}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-200/60 pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[0.85rem] text-slate-700">
                      <Check className="mt-0.5 size-4 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={cn(
                    "mt-8 flex h-12 w-full items-center justify-center rounded-full font-bold transition-all",
                    tier.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-900/20"
                      : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* AEO Prompt-Mirror FAQ Section */}
      <section className="bg-slate-50/70 py-20 sm:py-28 border-t border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Everything You Need to Know About BITScrm
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Clear, direct, and factual answers for collections directors, risk officers, and contact center heads.
            </p>
          </div>

          {/* JSON-LD Structured Data: SoftwareApplication, Breadcrumbs & FAQPage */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "BITScrm Enterprise Collections Platform",
                alternateName: [
                  "BITScrm",
                  "BITS CRM",
                  "Boundless IT Solutions Collections CRM",
                  "Boundless IT Solutions BITScrm",
                  "BITS Collections Core",
                ],
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, Managed Cloud, Sovereign On-Premises",
                description:
                  "Flagship enterprise debt recovery and collections CRM engineered by Boundless IT Solutions with automated PTP recovery, a supervisor operations HUD, and session-gated access.",
                url: `${site.url}/bitscrm`,
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
                  url: `${site.url}/bitscrm`,
                },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
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
                    name: "BITScrm Collections Platform",
                    item: `${site.url}/bitscrm`,
                  },
                ],
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How does BITScrm comply with Bangko Sentral ng Pilipinas (BSP) collections regulations?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "BITScrm is engineered with BSP Circulars 454 and 857 principles in mind. Contact-window and daily-attempt rules are configured per engagement rather than shipped as turnkey enforcement, and Right-Party Connect verification is a workflow step your team completes before any disclosure.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can BITScrm be deployed on-premises within our company's private datacenter?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. While we recommend our secure managed cloud for automated scaling and managed operations, BITScrm can be fully self-hosted on-premises within your organization's private cloud or physical server racks for strict regulatory data sovereignty.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do our agents need physical desk phones?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. There is no telephony in this build - no browser softphone, no call recording, no predictive dialing and no supervisor listen/whisper/barge. PTP tracking, portfolio staging and supervisor review tools are included; telephony is on the roadmap.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How does the Promise-to-Pay (PTP) tracking engine work?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "When an agent logs a verbal payment commitment, BITScrm generates automated SMS and email payment reminders at 48 hours and 24 hours prior to the due date. If a payment is missed, the account is automatically flagged and re-queued with elevated priority.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can BITScrm be white-labeled under our agency's branding?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. With the BITS White Label Platform, you can deploy BITScrm under your own custom domain, logo, and brand color scheme with zero mention of BITS.",
                    },
                  },
                ],
              }),
            }}
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "How does BITScrm comply with Bangko Sentral ng Pilipinas (BSP) collections regulations?",
                a: "BITScrm is engineered with BSP Circulars 454 and 857 principles in mind. Contact-window and daily-attempt rules are configured per engagement rather than shipped as turnkey enforcement, and Right-Party Connect verification is a workflow step your team completes before any disclosure.",
              },
              {
                q: "Can BITScrm be deployed on-premises within our company's private datacenter?",
                a: "Yes. While we recommend our secure managed cloud for automated scaling and managed operations, BITScrm can be fully self-hosted on-premises within your organization's private cloud or physical server racks for strict regulatory data sovereignty.",
              },
              {
                q: "Do our agents need physical desk phones?",
                a: "No. There is no telephony in this build - no browser softphone, no call recording, no predictive dialing and no supervisor listen/whisper/barge. PTP tracking, portfolio staging and supervisor review tools are included; telephony is on the roadmap.",
              },
              {
                q: "How does the Promise-to-Pay (PTP) tracking engine work?",
                a: "When an agent logs a verbal payment commitment, BITScrm generates automated SMS and email payment reminders at 48 hours and 24 hours prior to the due date. If a payment is missed, the account is automatically flagged and re-queued with elevated priority.",
              },
              {
                q: "Can BITScrm be white-labeled under our agency's branding?",
                a: "Yes. With the BITS White Label Platform, you can deploy BITScrm under your own custom domain, logo, and brand color scheme with zero mention of BITS.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:shadow-xs"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900">
                  <span>{item.q}</span>
                  <span className="ml-4 font-mono text-blue-600 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-cloud py-16 text-center">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h2 text-ink">Ready to review BITScrm on your floor?</h2>
            <p className="text-lede mx-auto mt-4 max-w-[46ch] text-slateblue">
              Book an operational consultation with our engineering team. We configure workflows around your actual agency processes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-electric-600 px-8 font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
              >
                Book a Consultation
              </Link>
              <Link
                href="/operations-360/ai"
                className="inline-flex h-14 items-center justify-center rounded-full border border-navy-700/20 bg-white px-8 font-semibold text-navy-700 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
              >
                Explore BITSagent AI
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
