import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Boxes,
  Route,
  ShoppingCart,
  BrainCircuit,
  Code2,
  Server,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlatformHero, PlatformSection } from "@/components/sections/platform-hero";
import { site } from "@/lib/site";

/**
 * /about — who BITS is.
 *
 * Written to the same standard as the rest of the marketing surface: short
 * declarative headings, one idea per section, and the product surface shown
 * rather than described. Reuses PlatformHero and PlatformSection so the page
 * inherits the brandbook sky and glass treatment without duplicating it.
 */

const CAPABILITIES = [
  {
    icon: Boxes,
    title: "Operations 360",
    tagline: "All-in-one operations management",
    body: "CRM, telephony, workforce management, quality assurance, performance management, analytics and reporting on one platform.",
    href: "/operations-360",
  },
  {
    icon: Route,
    title: "BITS FILO",
    tagline: "Smart field operations",
    body: "Real-time agent tracking, route optimisation and mobile field reporting for teams that work outside the floor.",
    href: "/operations-360",
  },
  {
    icon: ShoppingCart,
    title: "Sales Systems",
    tagline: "Multi-branch retail and distribution",
    body: "POS, inventory, order processing, customer management, sales tracking, payment integration, loyalty and multi-branch operations.",
    href: "/products",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Solutions",
    tagline: "Purpose-built agents, not a generic chatbot",
    body: "AiQA for quality assurance, AiCO for collections, AiSA for sales and AiRA for customer service — each grounded in your own operational data.",
    href: "/operations-360/ai",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    tagline: "Built around your workflow, not ours",
    body: "Tailor-made web, mobile and enterprise applications designed around specific business requirements.",
    href: "/contact",
  },
  {
    icon: Server,
    title: "IT Infrastructure & Telephony",
    tagline: "The layer everything else runs on",
    body: "PBX systems, autodialers, call recording, cloud solutions and on-premise infrastructure.",
    href: "/deployment",
  },
] as const;

const INDUSTRIES = [
  "Banking",
  "Fintech",
  "Lending",
  "BPO",
  "Retail",
  "Healthcare",
  "Food & Beverage",
  "Service businesses",
] as const;

export const metadata: Metadata = {
  title: "About BITS — Philippine Enterprise Software & Automation | Boundless IT Solutions",
  description:
    "Boundless IT Solutions OPC (BITS) is a Philippine technology company building enterprise software, business process automation, AI agents and IT services — from Operations 360 to custom development.",
  keywords: [
    "bits about",
    "boundless it solutions",
    "philippine software development company",
    "business process automation philippines",
    "ai solutions philippines",
    "enterprise software philippines",
    "custom software development philippines",
  ],
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: "About BITS — Philippine Enterprise Software & Automation",
    description:
      "We build intelligent solutions that transform the way businesses operate.",
    url: `${site.url}/about`,
    siteName: site.legalName,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Boundless IT Solutions OPC — enterprise software and automation from the Philippines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About BITS — Boundless IT Solutions",
    description:
      "We build intelligent solutions that transform the way businesses operate.",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${site.url}/about#webpage`,
      url: `${site.url}/about`,
      name: "About BITS — Boundless IT Solutions",
      description:
        "Boundless IT Solutions OPC is a Philippine technology company building enterprise software, business process automation, AI-powered solutions and IT services.",
      isPartOf: { "@type": "WebSite", url: site.url },
      about: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "Boundless IT Solutions OPC",
      alternateName: ["BITS", "Boundless Information Technology Solutions"],
      legalName: "Boundless IT Solutions OPC",
      url: site.url,
      description:
        "Philippine technology company specialising in software development, business process automation, AI-powered solutions and IT services.",
      foundingDate: "2026",
      logo: { "@type": "ImageObject", url: `${site.url}/brand/mark.png` },
      image: `${site.url}/brand/mark.png`,
      address: { "@type": "PostalAddress", addressCountry: "PH" },
      areaServed: { "@type": "Country", name: "Philippines" },
      sameAs: [
        "https://www.linkedin.com/company/boundless-it-solutions-opc/",
        "https://www.facebook.com/p/Boundless-It-Solutions-61594430590134/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.inquiryEmail,
        areaServed: "PH",
        availableLanguage: ["en", "fil"],
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PlatformHero
        eyebrow="About BITS"
        title="We build intelligent solutions that transform the way businesses operate."
        lede="Boundless IT Solutions OPC is a Philippine technology company specialising in software development, business process automation, AI-powered solutions and IT services."
        primaryCta={{ href: "/contact", label: "Talk to us" }}
        secondaryCta={{ href: "/operations-360", label: "Explore Operations 360" }}
      />

      {/* ── Who we are ── */}
      <PlatformSection
        eyebrow="Who we are"
        title="Enterprise-grade, without the enterprise price tag."
        lede="We develop innovative, scalable and cost-effective technology that helps businesses streamline operations, improve productivity, reduce costs and accelerate digital transformation."
      >
        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Streamline operations",
              "Improve productivity",
              "Reduce costs",
              "Accelerate transformation",
            ].map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 backdrop-blur-xl"
              >
                <Check className="size-4 shrink-0 text-blue-600" aria-hidden />
                <span className="text-sm font-semibold text-slate-900">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </PlatformSection>

      {/* ── What we build ── */}
      <PlatformSection
        tint
        id="capabilities"
        eyebrow="What we build"
        title="Six ways we build for the floor."
        lede="Two flagship platforms, an AI agent suite for every function, and the engineering to fill whatever is left."
      >
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability, i) => (
            <Reveal key={capability.title} delay={0.05 * i}>
              <Link
                href={capability.href}
                className="group flex h-full flex-col rounded-[1.75rem] border border-white/70 bg-white/60 p-7 shadow-[0_1px_2px_rgba(6,22,47,0.04),0_18px_44px_-24px_rgba(6,22,47,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/75 hover:shadow-[0_1px_2px_rgba(6,22,47,0.05),0_28px_60px_-28px_rgba(6,22,47,0.34)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <capability.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  {capability.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-blue-600">
                  {capability.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {capability.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  Learn more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </PlatformSection>

      {/* ── Industries ── */}
      <PlatformSection
        id="industries"
        eyebrow="Who we serve"
        title="Built for regulated, high-volume operations."
        lede="Sectors where compliance, throughput and cost control all pull in the same direction."
      >
        <Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-slate-200/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-xl"
              >
                {industry}
              </li>
            ))}
          </ul>
        </Reveal>
      </PlatformSection>

      {/* ── Vision ── */}
      <PlatformSection
        tint
        eyebrow="Our vision"
        title="Make enterprise-grade technology accessible and affordable."
        lede="To businesses of every size — so they can compete, innovate and grow through digital transformation."
      >
        <Reveal>
          <div className="mt-10 rounded-[1.75rem] border border-white/70 bg-white/60 px-8 py-12 text-center shadow-[0_1px_2px_rgba(6,22,47,0.04),0_18px_44px_-24px_rgba(6,22,47,0.28)] backdrop-blur-xl sm:px-12">
            <p className="mx-auto max-w-2xl text-balance text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              At BITS, we don&apos;t just develop software — we build intelligent
              solutions that transform the way businesses operate.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5"
              >
                Start a conversation
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
              >
                Browse all products
              </Link>
            </div>
          </div>
        </Reveal>
      </PlatformSection>
    </main>
  );
}
