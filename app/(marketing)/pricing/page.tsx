import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Scale, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ConsultationButton } from "@/components/ui/consultation-button";
import { site, solutionPackages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing & Editions | BITS",
  description:
    "Four BITS editions — Core Operational, Integrated Scaling, Enterprise Architecture, and the White-Label branding option. See exactly what each edition includes, then request a quote scoped to your team size, modules, and deployment model.",
  alternates: { canonical: `${site.url}/pricing` },
  openGraph: {
    title: "BITS Pricing & Editions",
    description:
      "What each BITS edition includes: Core Operational, Integrated Scaling, Enterprise Architecture, and the White-Label option.",
    url: `${site.url}/pricing`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Pricing & Editions" }],
  },
};

/* ── What actually determines the quote ── */
const quoteInputs = [
  {
    title: "How many people will use it",
    detail:
      "Seat bands set the base scope. We size on active users, not on your total headcount, so seasonal staff do not inflate the number.",
  },
  {
    title: "Which modules you switch on",
    detail:
      "Operations 360, the CRM suite, accounting, HRMS, payroll, logistics, booking, or queuing — you start with what solves the immediate problem and add modules later.",
  },
  {
    title: "Where it runs",
    detail:
      "Managed cloud, private VPC, or your own on-premises servers. Sovereignty requirements change the cost and the timeline, so we settle this early.",
  },
  {
    title: "What we have to migrate",
    detail:
      "Existing spreadsheets, a legacy CRM export, or a bank file feed. The messier the source data, the more of the first invoice is setup rather than licence.",
  },
  {
    title: "How much support you want",
    detail:
      "Standard support, priority engineering access, or a dedicated solutions architect with a response SLA.",
  },
  {
    title: "How quickly you need it live",
    detail:
      "A single CRM module and a full multi-product operational system are very different timelines. Rush work is possible; it is just quoted honestly as rush.",
  },
];

/* ── Pricing questions, answered straight ── */
const pricingFaqs = [
  {
    q: "Why are there no prices on this page?",
    a: "Because a per-seat number without knowing your modules, deployment model, and migration scope would be misleading. We publish exactly what each edition includes so you can compare scope, and we quote the number after a short scoping call — usually the same day.",
  },
  {
    q: "Do you charge per user?",
    a: "Licensing is volume-tiered rather than punitive. You are sized on active users in volume bands, and you are not charged a penalty for staff turnover or shift rotations. Adding users mid-term is a top-up, not a full re-quote.",
  },
  {
    q: "Can we start with one product and add more later?",
    a: "Yes. That is the normal path. Most clients begin with the product that fixes their biggest bottleneck, then extend across departments as the shared data layer proves itself.",
  },
  {
    q: "Is data migration included?",
    a: "Onboarding and setup are included in the entry tier. Larger migrations — cleansing, deduplication, or mapping several legacy systems — are scoped separately and called out in the proposal before you sign anything.",
  },
  {
    q: "What does the White-Label option cost?",
    a: "It is a branding and reseller add-on scoped on top of whichever engine tier you are already on, not a standalone product. It covers your logo, custom domain, colour palette, branded emails, and the reseller margin agreement.",
  },
  {
    q: "Do you offer a pilot?",
    a: "For Operations 360 we can scope a single-team pilot with a defined evaluation window, so you prove the workflow on your own accounts before committing across the floor.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/pricing#webpage`,
        url: `${site.url}/pricing`,
        name: "BITS Pricing & Editions",
        description:
          "Edition-by-edition scope for BITS enterprise software, with quote inputs explained.",
        publisher: { "@type": "Organization", name: site.legalName, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Pricing", item: `${site.url}/pricing` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: pricingFaqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-cloud via-white to-white pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,99,219,0.08),transparent)]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-linelight bg-white px-3.5 py-1 shadow-2xs">
                <Scale className="size-3 text-electric-600" />
                <span className="text-overline text-electric-600">Pricing &amp; Editions</span>
              </div>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="text-display text-ink text-balance">
                See What Each Edition Includes.{" "}
                <span className="text-gradient-brand">Then Get a Number.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lede mx-auto mt-6 max-w-[58ch] text-slateblue text-pretty">
                Four editions, described in full below. We publish the scope of each one because
                that is what actually lets you compare. The price depends on your seat count,
                modules, deployment model, and migration — so we quote it after a short call,
                usually the same day.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationButton
                  interest="Pricing Inquiry — Request a Scoped Quote"
                  label="Request a Quote"
                />
                <Link
                  href="/products"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-linelight bg-white px-7 text-sm font-bold text-ink shadow-xs transition-all duration-200 hover:border-electric-400 hover:bg-skywash"
                >
                  Compare products first
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 2. THE EDITIONS ── */}
      <Section className="relative border-t border-linelight bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">The editions</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">Four Ways to Buy</h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                Each edition stacks on the one before it. Read them in order — the differences are
                about scale and control, not about features being withheld.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 space-y-6">
            {solutionPackages.map((pkg, idx) => (
              <Reveal key={pkg.id} delay={0.04}>
                <article
                  id={`edition-${pkg.id}`}
                  className={`scroll-mt-28 overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
                    pkg.popular
                      ? "border-electric-500/60 ring-4 ring-electric-500/10"
                      : "border-linelight hover:border-electric-400/60"
                  }`}
                >
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                    {/* Scope summary */}
                    <div className="border-b border-linelight bg-slate-50/60 p-7 sm:p-9 lg:border-b-0 lg:border-r">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-electric-600 px-2.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-white">
                          {pkg.tier}
                        </span>
                        {pkg.popular ? (
                          <span className="rounded-full border border-electric-200 bg-skywash px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-electric-600">
                            Most Common
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-h3 mt-4 text-ink leading-snug">{pkg.title}</h3>
                      <p className="mt-2.5 text-sm font-semibold text-electric-600">{pkg.badge}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{pkg.tagline}</p>

                      <dl className="mt-6 space-y-3 border-t border-linelight pt-5">
                        {[
                          { label: "Team scope", value: pkg.teamScope },
                          { label: "Deployment", value: pkg.deployment },
                          { label: "Commercial model", value: pkg.investmentModel },
                          { label: "Billing cadence", value: pkg.billingCadence },
                        ].map((row) => (
                          <div key={row.label} className="flex items-start justify-between gap-4">
                            <dt className="shrink-0 text-[0.62rem] font-bold uppercase tracking-wider text-slate-400">
                              {row.label}
                            </dt>
                            <dd className="text-right text-xs font-semibold leading-relaxed text-slate-700">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <p className="mt-5 rounded-2xl border border-linelight bg-white p-4 text-xs leading-relaxed text-slate-600">
                        {pkg.roiBenchmark}
                      </p>

                      <ConsultationButton
                        interest={`Pricing Inquiry: ${pkg.title} (${pkg.teamScope})`}
                        label={pkg.primaryCta}
                        size="md"
                        className="mt-6 w-full"
                      />
                    </div>

                    {/* Included scope */}
                    <div className="p-7 sm:p-9">
                      <p className="text-overline text-slate-500">What is included</p>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                            <span className="text-xs leading-relaxed text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-linelight pt-4 text-xs leading-relaxed text-slate-500">
                        {pkg.pricingSubtext}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. HOW THE QUOTE IS BUILT ── */}
      <Section className="relative border-t border-linelight bg-cloud py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">How the number is built</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">Six Inputs, No Surprises</h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                These are the only things that change your quote. If something is not on this list,
                it will not appear on your invoice.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quoteInputs.map((input, idx) => (
              <Reveal key={input.title} delay={0.03 + idx * 0.03}>
                <div className="flex h-full flex-col rounded-3xl border border-linelight bg-white p-6 shadow-sm">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-skywash font-mono text-xs font-bold text-electric-600">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-ink">{input.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{input.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. PRICING FAQ ── */}
      <Section className="relative border-t border-linelight bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">Straight answers</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">Pricing Questions</h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-linelight overflow-hidden rounded-3xl border border-linelight bg-white shadow-sm">
            {pricingFaqs.map((item, idx) => (
              <Reveal key={item.q} delay={0.02 + idx * 0.02}>
                <details className="group p-6 sm:p-7">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-bold text-ink marker:content-none">
                    {item.q}
                    <span className="mt-0.5 shrink-0 text-electric-600 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. CTA ── */}
      <Section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(0,166,255,0.18),transparent)]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-200">
                <Sparkles className="size-3.5 text-sky-300" />
                Same-Day Quotes
              </span>
              <h2 className="text-h2 mt-5 text-white text-balance">Get Your Number in One Call</h2>
              <p className="text-lede mt-5 text-sky-100/90 text-pretty">
                Send us your team size, the modules you need, and where you want it hosted. You
                will get a written quote with the scope broken out line by line — not a discovery
                call that ends in a follow-up meeting.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationButton
                  interest="Pricing Inquiry — Request a Scoped Quote"
                  label="Request Your Quote"
                  variant="light"
                />
                <Link
                  href="/solutions"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                >
                  Not sure what you need yet?
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}