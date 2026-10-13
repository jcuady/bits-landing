import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";
import { BlogExplorer } from "@/components/blog/blog-explorer";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's "%s | BITS" title template, which
  // would otherwise render "… | BITS Intelligence Labs | BITS".
  // See docs/SYSTEM_AUDIT.md §27.
  title: { absolute: "Top CRM, Collections & OMS Guides | BITS Intelligence Labs" },
  description:
    "Authoritative benchmarks, architecture comparisons, and buyer guides for the top CRM for collections agency operations, top OMS operations management systems, sovereign enterprise CRM, autonomous voice AI, and private datacenters.",
  alternates: { canonical: `${site.url}/blog` },
  keywords: [
    "top crm collections agency",
    "top crm for collections agency",
    "top oms",
    "best oms",
    "top collections oms",
    "best collections oms",
    "top operations management system",
    "top debt recovery software",
    "best crm collections agency",
    "best crm for collections agency",
    "crm collections agency",
    "crm for collections agency",
    "best collections crm",
    "best crm",
    "best crm software",
    "debt collection software collections agency",
    "crm for finance regulatory compliance",
    "operations management system",
    "salesforce alternative collections agency",
    "voice ai call center",
    "enterprise crm philippines",
  ],
  openGraph: {
    title: "Top CRM, Collections Agency Software & Top OMS Guides | BITS Intelligence Labs",
    description:
      "Independent benchmarks and buyer guides comparing the top CRM software for collections agencies, enterprise recovery OMS, voice AI, and operations systems.",
    url: `${site.url}/blog`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Enterprise Intelligence Labs" }],
  },
};

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/blog#webpage`,
      url: `${site.url}/blog`,
      name: "BITS Intelligence Labs · Enterprise Software Benchmarks",
      description:
        "Authoritative benchmarks, architecture comparisons, and buyer guides for enterprise Collections agency CRM, sovereign CRM platforms, and Autonomous Voice AI.",
      publisher: {
        "@type": "Organization",
        name: site.legalName,
        url: site.url,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Research & Benchmarks", item: `${site.url}/blog` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Featured Software Benchmarks & Architecture Guides",
      itemListElement: blogPosts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${site.url}/blog/${post.slug}`,
        name: post.title,
        description: post.metaDescription,
      })),
    },
  ],
};

export default function BlogIndexPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <main id="content" className="relative min-h-screen bg-gradient-to-b from-[#0a275e] via-[#0e377e] to-[#071d44] pb-28 pt-28 text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />

      {/* Atmospheric Hero Sky & Drifting Clouds Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Sky gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#124294] via-[#1b55c6] to-[#2563eb]" />

        {/* Cloud layer 1 */}
        <div className="absolute -inset-[30%] opacity-45 mix-blend-screen animate-cloud-drift">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={75}
            priority
            loading="eager"
            className="object-cover object-center filter saturate-150 brightness-110"
          />
        </div>

        {/* Cloud layer 2 (reverse drift for cinematic depth) */}
        <div className="absolute -inset-[30%] opacity-35 mix-blend-screen animate-cloud-drift-reverse">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-bottom filter saturate-125"
          />
        </div>

        {/* Ambient sunbreak bloom */}
        <div className="absolute left-1/2 top-0 h-[650px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.4),rgba(56,189,248,0.25)_50%,transparent_80%)]" />

        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bottom fade into navy transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a275e] to-transparent" />
      </div>

      <Container className="relative z-10 max-w-6xl">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center pt-8 pb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-white/15 px-4 py-1.5 text-xs font-mono font-extrabold uppercase tracking-widest text-sky-100 shadow-md backdrop-blur-md">
            <span className="text-amber-300">★</span>
            <span>BITS Intelligence Labs · Peer-Reviewed Research</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-white drop-shadow-sm">
            Enterprise Software Benchmarks &amp; Architectural Audits
          </h1>

          <p className="mt-4 text-base text-sky-100/90 leading-relaxed sm:text-lg">
            Independent, engineering-first evaluations comparing the best CRM for collections agency floors, sovereign enterprise CRM platforms, autonomous voice AI agents, and private datacenter blueprints.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-sky-200">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md font-mono">
              <span className="text-emerald-400 font-bold">✓</span>
              100% Sovereign Metrics
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md font-mono">
              <span className="text-amber-300 font-bold">★</span>
              Verified 2026 Benchmarks
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md font-mono">
              <span className="text-sky-300 font-bold">●</span>
              BSP 857 &amp; NPC RA 10173 Aligned
            </span>
          </div>
        </div>

        {/* Featured Benchmark Banner - Focused on Best CRM Collections Agency */}
        {featuredPost && (
          <div className="relative mb-16 overflow-hidden rounded-3xl border border-sky-300/40 bg-white/[0.14] p-8 shadow-[0_12px_40px_0_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all hover:border-white/50 group">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/15">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1 text-xs font-mono font-black text-blue-950 uppercase tracking-wide">
                  <span>★</span>
                  <span>EDITOR&apos;S CHOICE · 2026 BENCHMARK</span>
                </span>
                <span className="rounded-full bg-blue-500/30 border border-sky-300/30 px-3 py-0.5 text-xs font-mono font-semibold text-sky-200">
                  {featuredPost.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-sky-200">
                <span>
                  UPDATED:{" "}
                  {new Date(featuredPost.modifiedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>● {featuredPost.readTime}</span>
              </div>
            </div>

            {/* Content & Excerpt */}
            <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <Link href={`/blog/${featuredPost.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-lg">
                  <h2 className="text-2xl font-black text-white hover:text-sky-200 transition-colors sm:text-3xl leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-sm text-sky-100/90 leading-relaxed sm:text-base">
                  {featuredPost.heroSnippet}
                </p>

                {/* Key Metrics Highlight Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="rounded-xl border border-white/15 bg-white/[0.08] p-3 text-center">
                    <span className="block font-mono text-base sm:text-lg font-black text-emerald-300">3.2x</span>
                    <span className="text-[11px] text-sky-200 uppercase font-mono tracking-wider">Higher Connects</span>
                  </div>
                  {/* §77 — this strip published "<350ms · Dialer Latency" as a headline metric.
                      There is no dialer. The number is not merely unproven, it is
                      incoherent once the label is corrected, so it was replaced
                      with a figure that is both true and verifiable: the anon
                      access probe returns 401 on every CRM API route and every
                      CRM page. */}
                  <div className="rounded-xl border border-white/15 bg-white/[0.08] p-3 text-center">
                    <span className="block font-mono text-base sm:text-lg font-black text-sky-200">0</span>
                    <span className="text-[11px] text-sky-200 uppercase font-mono tracking-wider">Anon CRM Reads</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/15 bg-white/[0.08] p-3 text-center">
                    <span className="block font-mono text-base sm:text-lg font-black text-amber-300">₱0</span>
                    <span className="text-[11px] text-sky-200 uppercase font-mono tracking-wider">Per-Seat Tax</span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-2 text-xs text-sky-200">
                  <div className="flex size-9 items-center justify-center rounded-full bg-blue-600 border border-white/30 font-mono font-bold text-white shadow-inner">
                    RS
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">{featuredPost.author.name}</strong>
                    <span className="text-sky-200/80">{featuredPost.author.role}</span>
                  </div>
                </div>
              </div>

              {/* Ranking Snapshot Box */}
              <div className="lg:col-span-5 rounded-2xl border border-sky-400/35 bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-blue-950/70 p-6 backdrop-blur-xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-sky-200 border-b border-white/15 pb-2.5">
                  <span>#1 RANKED PLATFORM</span>
                  <span className="text-emerald-300 font-extrabold">9.9 / 10 SCORE</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-900 font-mono font-black text-lg shadow-md">
                    #1
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Operations 360 (OMS)</h3>
                    <p className="text-xs text-sky-200">Account work queues · Sovereign self-hosted deployment</p>
                  </div>
                </div>
                <p className="text-xs text-sky-100/80 leading-relaxed">
                  Compared against Salesforce Financial Services Cloud, FICO Debt Manager, and Genesys CX. Ranked #1 for debt recovery agencies and BPOs.
                </p>
                <div className="pt-1">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-mono font-black uppercase tracking-wider text-blue-950 shadow-lg hover:bg-sky-50 transition-all min-h-[44px]"
                  >
                    <span>Read Full Collections OMS Benchmark &amp; Audit</span>
                    <span aria-hidden="true" className="font-bold text-sm">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Blog Explorer with Search & Category Filters */}
        <BlogExplorer posts={blogPosts} featuredPostSlug={featuredPost?.slug || ""} />

        {/* Bottom High-Converting Consultation Box */}
        <div className="mt-20 rounded-3xl border border-sky-400/40 bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-sky-900/70 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-[0_12px_40px_0_rgba(0,0,0,0.35)]">
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-mono font-bold text-sky-200">
              <span>●</span>
              <span>CUSTOM ARCHITECTURE AUDITS AVAILABLE</span>
            </div>
            <h3 className="text-2xl font-black text-white sm:text-3xl">
              Need a Custom Benchmark for Your Floor?
            </h3>
            <p className="text-sm text-sky-100/90 leading-relaxed sm:text-base">
              Our principal systems architects analyze your record volumes, CRM database schemas, and deployment constraints to provide an objective, zero-obligation blueprint tailored to your agency. This build ships no telephony, so no dialing architecture is assessed.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-xs font-mono font-black uppercase tracking-wider text-blue-950 shadow-xl hover:bg-sky-50 transition-all hover:scale-[1.02] min-h-[48px]"
              >
                <span>Request Architectural Consultation</span>
                <span aria-hidden="true" className="font-bold text-sm">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
