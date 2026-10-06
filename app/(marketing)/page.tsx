import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProductFamilies } from "@/components/sections/product-families";
import { SolutionFinder } from "@/components/sections/solution-finder";
import { StatsStrip } from "@/components/sections/stats-strip";
import { TheDifference } from "@/components/sections/the-difference";
import { FeaturesHero } from "@/components/sections/features-hero";
import { FloorShowcase } from "@/components/sections/floor-showcase";
import { Industries } from "@/components/sections/industries";
import { Security } from "@/components/sections/security";
import { DeploymentModels } from "@/components/sections/deployment-models";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { faqItems, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "BITS — Top CRM for Collections Agency, Operations OMS & Enterprise Software",
  description:
    "Boundless IT Solutions (BITS) powers top collections agency floors and enterprise operations with Operations 360 (OMS), sub-350ms predictive dialing, sovereign data residency, and 18 connected business engines with zero per-seat licensing fees.",
  keywords: [
    "top crm collections agency",
    "top crm for collections agency",
    "top oms",
    "best oms",
    "top collections oms",
    "best collections oms",
    "best crm collections agency",
    "crm collections agency",
    "debt collection software collections agency",
    "operations management system",
    "best operations management system",
    "top operations management system",
    "top debt recovery software",
    "Operations 360",
    "Operations 360 OMS",
    "BITScrm",
    "BITSagent",
    "enterprise operations software philippines",
    "sovereign debt recovery software",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    title: "BITS — Top CRM for Collections Agency, Operations OMS & Enterprise Software",
    description:
      "Empower your agency floor with Operations 360: the top CRM for collections agencies, featuring sub-350ms predictive dialing, automated PTP scheduling, supervisory HUD, and sovereign compliance.",
    url: site.url,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Enterprise Platform & Top Collections OMS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS — Top CRM for Collections Agency & Operations OMS",
    description:
      "Sub-350ms predictive dialing, automated PTP workflows, and sovereign enterprise infrastructure. Zero per-seat tax.",
    images: ["/og.png"],
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/#homepage`,
      url: site.url,
      name: "BITS — Top CRM for Collections Agency, Operations OMS & Enterprise Software",
      description:
        "Boundless IT Solutions (BITS) powers top collections agency floors and enterprise operations with Operations 360 (OMS), sub-350ms predictive dialing, and 18 connected business engines.",
      inLanguage: "en-PH",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
      },
      about: [
        {
          "@type": "Thing",
          name: "Debt Collection Agency Software",
          sameAs: "https://en.wikipedia.org/wiki/Debt_collection",
        },
        {
          "@type": "Thing",
          name: "Operations Management System",
        },
        {
          "@type": "Thing",
          name: "Predictive Dialer",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      {/* ═══ PHASE 1: ESTABLISH BITS (Who we are) ═══ */}

      {/* 1. Hero: Company-level value proposition — WHO is BITS, WHAT does it build */}
      <Hero />

      {/* 2. Trust & Statutory Governance — Social proof and credibility */}
      <TrustStrip />

      {/* ═══ PHASE 2: SHOW THE PORTFOLIO (What we offer) ═══ */}

      {/* 3. Product Families: 4 connected product families overview (CPO Rec #3) */}
      <ProductFamilies />

      {/* 4. Solution Finder: Problem-based discovery — "What are you trying to improve?" (CPO Rec #8) */}
      <SolutionFinder />

      {/* ═══ PHASE 3: FLAGSHIP DEEP DIVE (Operations 360) ═══ */}

      {/* 5. The Operational Advantage: Why BITS over generic software */}
      <TheDifference />

      {/* 6. Operations 360 Benchmarks: Flagship platform metrics */}
      <StatsStrip />

      {/* 7. Collections Command Center: Hero feature with account management */}
      <FeaturesHero />

      {/* 8. The Recovery Floor Powerhouse: Predictive Dialer, QA, Omnichannel */}
      <FloorShowcase />

      {/* ═══ PHASE 4: TRUST & FIT (Can it work for me?) ═══ */}

      {/* 9. Target Industries */}
      <Industries />

      {/* 10. Security: BSP/NPC-aligned enterprise security */}
      <Security />

      {/* 11. Deployment Architecture */}
      <DeploymentModels />

      {/* ═══ PHASE 5: CONVERT (How do I get started?) ═══ */}

      {/* 12. Solution Packages & Pricing */}
      <Pricing />

      {/* 13. FAQ */}
      <FAQ />

      {/* 14. Executive Consultation */}
      <Contact />
    </main>
  );
}
