import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { PlatformIndex } from "@/components/sections/platform-index";
import { FloorShowcase } from "@/components/sections/floor-showcase";
import { Security } from "@/components/sections/security";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "BITS — Top CRM for Collections Agency, Operations OMS & Enterprise Software",
  description:
    "Boundless IT Solutions (BITS) powers top collections agency floors and enterprise operations with Operations 360 (OMS), sub-350ms predictive dialing, sovereign data residency, and 15 connected business engines with zero per-seat licensing fees.",
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
    // Organization and WebSite are defined once, site-wide, in app/layout.tsx.
    // Declaring a second node with the same @id here would produce conflicting
    // entity data for search and AI engines.
    {
      "@type": "WebPage",
      "@id": `${site.url}/#homepage`,
      url: site.url,
      name: "BITS — Operations 360: Top CRM & OMS for Collections Agencies",
      description:
        "Boundless IT Solutions (BITS) builds Operations 360, the sovereign platform for collections agency floors: collections CRM and promise-to-pay automation, a sub-350ms predictive dialer, GPS field telemetry, and 100% real-time call QA scoring.",
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
      "@type": "BreadcrumbList",
      "@id": `${site.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
      ],
    },
    // FAQPage is emitted by components/sections/faq.tsx, which renders the same
    // faqItems the visitor sees. Declaring it here as well produced two
    // identical FAQPage nodes on one page.
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

      {/* ═══ PHASE 2: THE PLATFORM (Operations 360 + the catalogue) ═══ */}

      {/* 3. PlatformIndex: the Operations 360 hub - four pillars, two modules,
            and the rest of the catalogue. Replaces ProductFamilies, Industries
            and DeploymentModels. Registry-driven: lib/products/platform.ts */}
        <PlatformIndex />


      {/* ═══ PHASE 3: FLAGSHIP DEEP DIVE (Operations 360) ═══ */}





      {/* 8. The Recovery Floor Powerhouse: Predictive Dialer, QA, Omnichannel */}
      <FloorShowcase />

      {/* ═══ PHASE 4: TRUST & FIT (Can it work for me?) ═══ */}

      {/* 9. Target Industries */}

      {/* 10. Security: BSP/NPC-aligned enterprise security */}
      <Security />

      {/* 11. Deployment Architecture */}

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
