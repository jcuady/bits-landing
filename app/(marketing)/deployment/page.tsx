import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Server, Cloud, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlatformHero, PlatformSection } from "@/components/sections/platform-hero";
import { CATALOG_CLAIM } from "@/lib/products/platform";
import { site } from "@/lib/site";

/**
 * /deployment — hosting options for the BITS platform.
 *
 * Carries the content that used to sit on the homepage as an 801-line
 * section. The homepage keeps a one-line teaser; the comparison lives here,
 * where a procurement reader who has chosen to look for it will finish.
 *
 * The original was 1,659 words of prose describing what is fundamentally a
 * three-column matrix. Rows are now rows.
 */

const COMPARISON = [
  {
    dimension: "Setup time",
    cloud: "Zero — provisioned on signature",
    onPrem: "Phased, per your hardware schedule",
    hybrid: "Phased, cloud first",
  },
  {
    dimension: "Ongoing cost",
    cloud: "Monthly operational scope",
    onPrem: "One-time setup ownership",
    hybrid: "Blended",
  },
  {
    dimension: "Updates",
    cloud: "Automatic, always current",
    onPrem: "Applied by your team or ours",
    hybrid: "Automatic on the cloud portion",
  },
  {
    dimension: "Data residency",
    cloud: "Philippine sovereign region",
    onPrem: "Your building, your servers",
    hybrid: "Split by workload",
  },
  {
    dimension: "Hardware needed",
    cloud: "None",
    onPrem: "Optional, you own it",
    hybrid: "Optional",
  },
] as const;

const SHARED = [
  "Shared PostgreSQL and Redis bus",
  "Centralised SSO and RBAC",
  "Zero duplicated infrastructure",
  "Hybrid cloud and on-premises ready",
];

const INCLUDED = [
  "Continuous architecture, compliance and security updates at no additional licence cost",
  "Zero hardware waste guarantee",
  "White-label deployment available across the platform",
  "Mutual NDA and a technical blueprint provided before signature",
  "Guided setup and free floor training",
];

export const metadata: Metadata = {
  title: "Deployment — Cloud, On-Premises or Hybrid | BITS",
  description:
    "Run Operations 360 in BITS' sovereign managed cloud, on your own office servers, or hybrid. Compare setup, cost, updates, data residency and hardware across all three. BSP Circulars 454/857 and NPC RA 10173 aligned.",
  keywords: [
    "operations 360 deployment",
    "on-premises crm philippines",
    "sovereign cloud deployment",
    "data residency philippines",
    "hybrid crm deployment",
    "enterprise software on-premises",
  ],
  alternates: { canonical: `${site.url}/deployment` },
  openGraph: {
    title: "Deployment — Cloud, On-Premises or Hybrid | BITS",
    description:
      "Every engine in the BITS platform runs in our sovereign cloud, on your own servers, or hybrid.",
    url: `${site.url}/deployment`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Deployment Options" }],
  },
};

export default function DeploymentPage() {
  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${site.url}/deployment#webpage`,
                url: `${site.url}/deployment`,
                name: "Deployment — Cloud, On-Premises or Hybrid",
                description:
                  "Hosting options for the BITS platform across sovereign cloud, on-premises and hybrid deployments.",
                isPartOf: { "@type": "WebSite", url: site.url },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${site.url}/deployment#breadcrumb`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                  { "@type": "ListItem", position: 2, name: "Operations 360", item: `${site.url}/operations-360` },
                  { "@type": "ListItem", position: 3, name: "Deployment", item: `${site.url}/deployment` },
                ],
              },
            ],
          }),
        }}
      />

      <PlatformHero
        eyebrow="Deployment"
        title="Run BITS your way."
        lede="Every engine in our 15-product platform runs in our sovereign managed cloud with zero hardware needed — or installed directly on your own office servers, for complete privacy and one-time setup ownership."
        primaryCta={{ href: "/pricing", label: "Request a quote" }}
        secondaryCta={{ href: "/operations-360", label: "See the platform" }}
        backHref="/operations-360"
        backLabel="Back to Operations 360"
      />

      <PlatformSection
        eyebrow="The comparison"
        title="Three ways to deploy, one platform."
        lede="The deployment model changes where the code runs. It does not change what the platform does."
      >
        <Reveal>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <caption className="sr-only">
                Deployment options across cloud, on-premises and hybrid
              </caption>
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold text-slate-900">
                    Dimension
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-slate-900">
                    <span className="flex items-center gap-2">
                      <Cloud className="size-4 text-blue-600" aria-hidden />
                      Managed Cloud
                    </span>
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-slate-900">
                    <span className="flex items-center gap-2">
                      <Building2 className="size-4 text-blue-600" aria-hidden />
                      Your Office Servers
                    </span>
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-slate-900">
                    <span className="flex items-center gap-2">
                      <Server className="size-4 text-blue-600" aria-hidden />
                      Hybrid
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.dimension} className={i % 2 ? "bg-slate-50/60" : undefined}>
                    <th scope="row" className="px-5 py-4 align-top font-semibold text-slate-900">
                      {row.dimension}
                    </th>
                    <td className="px-5 py-4 align-top text-slate-700">{row.cloud}</td>
                    <td className="px-5 py-4 align-top text-slate-700">{row.onPrem}</td>
                    <td className="px-5 py-4 align-top text-slate-700">{row.hybrid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </PlatformSection>

      <PlatformSection
        tint
        eyebrow="Shared either way"
        title="One schema, whichever host it runs on."
        lede={`${CATALOG_CLAIM} deploy together, on the same architecture, with no integration work between them.`}
      >
        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHARED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-5"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden />
                <span className="text-sm font-medium text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </PlatformSection>

      <PlatformSection
        eyebrow="What is included"
        title="Turnkey, with the hardware risk on us."
      >
        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-5"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden />
                <span className="text-sm leading-relaxed text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </PlatformSection>

      <section className="relative border-t border-slate-200/60 bg-slate-50 py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-slate-200/70 bg-white px-8 py-14 text-center shadow-xs">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Not sure which model fits your floor?
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600">
                Tell us your regulatory constraints and recovery volume. We will
                recommend a deployment model and size it to your seats.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Request a deployment briefing
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Browse the catalogue
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}