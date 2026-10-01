import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  Award,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  PhoneCall,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Software Benchmarks, OMS & CRM Guides | BITS Intelligence Labs",
  description:
    "Authoritative benchmarks, architecture comparisons, and buyer guides for enterprise Collections OMS, sovereign CRM platforms, Autonomous Voice AI, and on-premises datacenter blueprints.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "BITS Intelligence Labs | Enterprise Software Benchmarks & Industry Guides",
    description:
      "Independent benchmarks and technical guides on Collections OMS, sovereign CRM architectures, voice AI telephony, and bare-metal datacenters.",
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
        "Authoritative benchmarks, architecture comparisons, and buyer guides for enterprise Collections OMS, sovereign CRM platforms, and Autonomous Voice AI.",
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
  ],
};

export default function BlogIndexPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

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
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-100 shadow-md backdrop-blur-md">
            <Sparkles className="size-3.5 text-amber-300 animate-pulse" />
            <span>BITS Intelligence Labs · Peer-Reviewed Research</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-white drop-shadow-sm">
            Enterprise Software Benchmarks &amp; Architectural Audits
          </h1>

          <p className="mt-4 text-base text-sky-100/90 leading-relaxed sm:text-lg">
            Independent, engineering-first evaluations comparing enterprise Collections OMS, sovereign CRM platforms, autonomous voice AI agents, and private datacenter blueprints.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-sky-200">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              100% Sovereign Metrics
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
              <Award className="size-3.5 text-amber-300" />
              Verified Performance Benchmarks
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-sky-300" />
              Philippine DPA &amp; BSP Aligned
            </span>
          </div>
        </div>

        {/* Featured Benchmark Banner */}
        {featuredPost && (
          <div className="relative mb-16 overflow-hidden rounded-3xl border border-sky-300/40 bg-white/[0.14] p-8 shadow-2xl backdrop-blur-2xl transition-all hover:border-white/50 group">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/15">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black text-blue-950 uppercase tracking-wide">
                  <Award className="size-3 text-blue-950" />
                  Featured 2026 Benchmark
                </span>
                <span className="rounded-full bg-blue-500/30 border border-sky-300/30 px-3 py-0.5 text-xs font-semibold text-sky-200">
                  {featuredPost.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-sky-200">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5 text-sky-300" />
                  {new Date(featuredPost.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-sky-300" />
                  {featuredPost.readTime}
                </span>
              </div>
            </div>

            {/* Content & Excerpt */}
            <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl font-black text-white hover:text-sky-200 transition-colors sm:text-3xl leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-sm text-sky-100/90 leading-relaxed sm:text-base">
                  {featuredPost.heroSnippet}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-2 text-xs text-sky-200">
                  <div className="flex size-9 items-center justify-center rounded-full bg-blue-600 border border-white/30 font-bold text-white shadow-inner">
                    RS
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">{featuredPost.author.name}</strong>
                    <span className="text-sky-200/80">{featuredPost.author.role}</span>
                  </div>
                </div>
              </div>

              {/* Ranking Snapshot Pill Box */}
              <div className="lg:col-span-5 rounded-2xl border border-sky-400/30 bg-gradient-to-br from-blue-900/60 to-blue-800/40 p-5 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-200 border-b border-white/10 pb-2">
                  <span>#1 Ranked Platform</span>
                  <span className="text-emerald-300">9.9 / 10 Score</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-900 font-black text-base shadow-md">
                    #1
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">BITScrm Collections OMS</h3>
                    <p className="text-xs text-sky-200">Sub-350ms predictive dialer · Sovereign on-prem</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-blue-950 shadow-lg hover:bg-sky-50 transition-all group-hover:shadow-sky-400/20"
                  >
                    <span>Read Full 7-Platform Benchmark</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <BookOpen className="size-5 text-sky-300" />
            All Architectural Guides &amp; Market Reviews
          </h2>
          <span className="text-xs text-sky-200">{blogPosts.length} Technical Briefs Available</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.10] p-6 backdrop-blur-xl shadow-xl hover:border-sky-300/50 hover:bg-white/[0.15] transition-all group"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-sky-200 pb-3">
                  <span className="rounded-full bg-blue-500/25 border border-sky-300/30 px-2.5 py-0.5 font-semibold text-sky-200">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-sky-300" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-sky-200 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="mt-3 text-xs text-sky-100/80 leading-relaxed line-clamp-3">
                  {post.heroSnippet}
                </p>
              </div>

              {/* Footer with Author and CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-sky-200 font-medium">By {post.author.name.split(",")[0]}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-white group-hover:text-sky-200 group-hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom High-Converting Newsletter / Lead Box */}
        <div className="mt-20 rounded-3xl border border-sky-400/40 bg-gradient-to-r from-blue-900/60 via-blue-800/50 to-sky-900/60 p-8 text-center backdrop-blur-2xl shadow-2xl">
          <div className="mx-auto max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sky-200">
              <Cpu className="size-3.5 text-sky-300" />
              <span>CUSTOM ARCHITECTURE AUDITS AVAILABLE</span>
            </div>
            <h3 className="text-2xl font-black text-white sm:text-3xl">
              Need a Custom Benchmark for Your Floor?
            </h3>
            <p className="text-sm text-sky-100/90 leading-relaxed">
              Our principal systems architects analyze your call volumes, CRM database schemas, and telco trunk layouts to provide an objective, zero-obligation ROI blueprint.
            </p>
            <div className="pt-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-black uppercase tracking-wider text-blue-950 shadow-xl hover:bg-sky-50 transition-all hover:scale-[1.02]"
              >
                <span>Request Architectural Consultation</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
