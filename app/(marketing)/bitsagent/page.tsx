import type { Metadata } from "next";
import { site } from "@/lib/site";
import { BitsAgentPageContent } from "@/components/sections/bits-agent-page-content";

export const metadata: Metadata = {
  title: "BITSagent — Autonomous AI Voice & Multichannel Operations Agent | Boundless IT Solutions",
  description:
    "Deploy BITSagent by Boundless IT Solutions: Sub-300ms latency conversational AI voice agents for debt collections, customer support, and automated payment negotiations 24/7.",
  keywords: [
    "BITSagent",
    "BITS agent",
    "Boundless IT Solutions AI",
    "Boundless IT Solutions BITSagent",
    "voice AI agents Philippines",
    "conversational AI collections",
    "autonomous support & collections AI",
    "WebRTC voice AI agent",
    "enterprise AI operations",
    "AI debt negotiation",
    "speech-to-speech AI agent",
    "contact center AI automation",
  ],
  alternates: {
    canonical: `${site.url}/bitsagent`,
  },
  openGraph: {
    title: "BITSagent — Autonomous AI Voice & Multichannel Operations Agent | Boundless IT Solutions",
    description:
      "Deploy BITSagent by Boundless IT Solutions: Sub-300ms latency conversational AI voice agents for debt collections, customer support, and automated payment negotiations 24/7.",
    url: `${site.url}/bitsagent`,
    siteName: site.legalName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITSagent Autonomous AI Operations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITSagent — Autonomous AI Voice & Multichannel Operations Agent | Boundless IT Solutions",
    description:
      "Deploy BITSagent by Boundless IT Solutions: Sub-300ms latency conversational AI voice agents for debt collections, customer support, and automated payment negotiations 24/7.",
    images: ["/og.png"],
  },
};

const bitsagentSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BITSagent Autonomous AI Suite",
  alternateName: [
    "BITSagent",
    "BITS AI Agent",
    "Boundless IT Solutions AI Agent",
    "Boundless IT Solutions BITSagent",
    "BITS Autonomous Voice AI",
  ],
  applicationCategory: "BusinessApplication",
  operatingSystem: "WebRTC, Managed Cloud, Sovereign On-Premises",
  description:
    "Conversational voice and multichannel AI operations agent engineered by Boundless IT Solutions with sub-300ms turn latency, Hallucination-free RAG, and automated compliance.",
  url: `${site.url}/bitsagent`,
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
    price: "68000",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
    url: `${site.url}/bitsagent`,
  },
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
      name: "BITSagent AI Operations",
      item: `${site.url}/bitsagent`,
    },
  ],
};

const bitsagentFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BITSagent's conversational voice turn latency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BITSagent operates with sub-300ms end-to-end turn latency by chaining streaming speech recognition, optimized LLM reasoning, and streaming neural text-to-speech with natural interruption handling.",
      },
    },
    {
      "@type": "Question",
      name: "Does BITSagent support Tagalog, English, and Taglish for Philippine operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, BITSagent natively understands and speaks natural Philippine English, conversational Tagalog, and bilingual Taglish commonly used in domestic contact center operations.",
      },
    },
    {
      "@type": "Question",
      name: "Can BITSagent negotiate debt recovery settlements and Promise-to-Pay (PTP) schedules?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, BITSagent operates within supervisory guardrails to explain account obligations, present approved payment restructuring terms, capture PTP commitments, and trigger real-time SMS payment confirmations.",
      },
    },
    {
      "@type": "Question",
      name: "Can BITSagent deploy on-premises with local PBX and SIP telephony?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, BITSagent supports sovereign on-premises deployment, connecting directly via SIP trunking to Asterisk, FreePBX, or legacy enterprise telephony systems without external audio egress.",
      },
    },
  ],
};

export default function BitsAgentPage() {
  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bitsagentSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bitsagentFaqSchema) }}
      />
      <BitsAgentPageContent />
    </main>
  );
}

