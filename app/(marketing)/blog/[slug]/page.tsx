import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Award,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Share2,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Server,
  Layers,
  Cpu,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | BITS Intelligence Labs" };

  return {
    title: `${post.title} | BITS Intelligence Labs`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `${site.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${site.url}/blog/${post.slug}`,
      siteName: site.legalName,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author.name],
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: ["/og.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Structured Data Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${site.url}/blog/${post.slug}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${site.url}/blog/${post.slug}`,
        },
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedDate,
        dateModified: post.modifiedDate,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: site.legalName,
          url: site.url,
          logo: {
            "@type": "ImageObject",
            url: `${site.url}/images/bits-logo-blue.png`,
          },
        },
        keywords: post.keywords.join(", "),
        mainEntityOfPage: `${site.url}/blog/${post.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog & Research", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.shortTitle, item: `${site.url}/blog/${post.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main id="content" className="relative min-h-screen bg-gradient-to-b from-[#0a275e] via-[#0e377e] to-[#071d44] pb-32 pt-28 text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

      <Container className="relative z-10 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-sky-200">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-sky-300/60" />
          <Link href="/blog" className="hover:text-white transition-colors">
            Research &amp; Benchmarks
          </Link>
          <ChevronRight className="size-3 text-sky-300/60" />
          <span className="text-white font-semibold truncate max-w-xs">{post.shortTitle}</span>
        </nav>

        {/* Article Header Card */}
        <header className="rounded-3xl border border-sky-300/40 bg-white/[0.14] p-8 shadow-2xl backdrop-blur-2xl sm:p-10 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-500/30 border border-sky-300/30 px-3 py-1 text-xs font-bold text-sky-200 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-200">
              <CheckCircle2 className="size-3 text-emerald-400" />
              Verified 2026 Edition
            </span>
          </div>

          <h1 className="mt-5 text-2xl font-black text-white sm:text-4xl sm:leading-tight drop-shadow-sm">
            {post.title}
          </h1>

          <p className="mt-4 text-base text-sky-100/90 leading-relaxed sm:text-lg">
            {post.heroSnippet}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-sky-200">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-600 border border-white/30 font-bold text-white shadow-inner">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .filter((c) => /[A-Z]/.test(c))
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <strong className="block text-white font-semibold text-sm">{post.author.name}</strong>
                <span className="text-sky-200/80">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-sky-300" />
                Updated:{" "}
                {new Date(post.modifiedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-sky-300" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Executive Summary Callout Box */}
        <section aria-labelledby="exec-summary-heading" className="mb-12 rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-500/15 via-blue-900/30 to-blue-800/40 p-7 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300 pb-3 border-b border-white/10">
            <Sparkles className="size-4 text-amber-300 animate-pulse" />
            <h2 id="exec-summary-heading">Executive Summary &amp; Fast Verdict</h2>
          </div>
          <p className="mt-4 text-sm sm:text-base text-white/95 leading-relaxed font-medium">
            {post.executiveSummary}
          </p>
        </section>

        {/* Comparison Matrix Table */}
        <section aria-labelledby="comparison-matrix-heading" className="mb-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="comparison-matrix-heading" className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="size-5 text-sky-300" />
              2026 Competitive Benchmark Matrix
            </h2>
            <span className="text-xs text-sky-200 hidden sm:inline">Scored out of 10.0</span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/20 bg-white/[0.12] shadow-2xl backdrop-blur-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.08] text-sky-200 font-semibold uppercase tracking-wider text-[11px]">
                  {post.comparisonHeaders.map((header, idx) => (
                    <th key={idx} className="px-5 py-4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {post.comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.isBits
                        ? "bg-blue-600/30 font-semibold hover:bg-blue-600/40 border-l-4 border-l-amber-400"
                        : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <td className="px-5 py-4 text-white">
                      <div className="flex items-center gap-2">
                        {row.isBits && (
                          <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-blue-950 uppercase">
                            #1 Pick
                          </span>
                        )}
                        <span className={row.isBits ? "text-white font-extrabold" : "text-sky-100"}>
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sky-100/90">{row.deployment}</td>
                    <td className="px-5 py-4 text-sky-100/90">{row.dailyCapacity}</td>
                    <td className="px-5 py-4 text-sky-100/90">{row.compliance}</td>
                    <td className="px-5 py-4 text-sky-100/90">{row.customization}</td>
                    <td className="px-5 py-4 text-sky-100/90">{row.pricing}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-black ${
                          row.isBits
                            ? "bg-emerald-400 text-blue-950 shadow-sm"
                            : "bg-white/10 text-sky-100"
                        }`}
                      >
                        {row.overallScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Evaluation Criteria Section */}
        <section aria-labelledby="criteria-heading" className="mb-14">
          <h2 id="criteria-heading" className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="size-5 text-sky-300" />
            Key Evaluation &amp; Benchmarking Criteria
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {post.keyEvaluationCriteria.map((crit, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/15 bg-white/[0.09] p-5 backdrop-blur-xl space-y-2 shadow-lg"
              >
                <h3 className="text-sm font-bold text-white text-sky-200">{crit.title}</h3>
                <p className="text-xs text-sky-100/80 leading-relaxed">{crit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Reviews Breakdown */}
        <section aria-labelledby="detailed-reviews-heading" className="mb-16 space-y-8">
          <div className="border-b border-white/15 pb-4">
            <h2 id="detailed-reviews-heading" className="text-2xl font-black text-white">
              In-Depth Platform Reviews &amp; Architectural Breakdown
            </h2>
            <p className="text-xs text-sky-200 mt-1">
              Evaluated on right-party connect velocity, data sovereignty, regulatory alignment, and total cost of ownership.
            </p>
          </div>

          {post.reviews.map((rev) => (
            <article
              key={rev.rank}
              className={`rounded-3xl border p-7 sm:p-8 backdrop-blur-2xl shadow-xl transition-all ${
                rev.isBits
                  ? "border-sky-300/50 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-950/60 ring-2 ring-sky-400/40"
                  : "border-white/15 bg-white/[0.09]"
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-11 items-center justify-center rounded-2xl font-black text-lg shadow-md ${
                      rev.isBits ? "bg-amber-400 text-blue-950" : "bg-white/15 text-white"
                    }`}
                  >
                    #{rev.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-white">{rev.name}</h3>
                    </div>
                    {rev.badge && (
                      <span className="inline-block mt-0.5 text-xs font-bold text-amber-300 uppercase tracking-wide">
                        {rev.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[11px] text-sky-200 uppercase font-semibold">
                      Performance Rating
                    </span>
                    <span className="text-xl font-black text-white">{rev.score} / 10.0</span>
                  </div>
                </div>
              </div>

              {/* Deployment & Pricing Overview */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 text-xs text-sky-100/90 border-b border-white/10 pb-5">
                <div>
                  <strong className="block text-sky-300 font-semibold mb-1">Architecture &amp; Hosting:</strong>
                  <span>{rev.deployment}</span>
                </div>
                <div>
                  <strong className="block text-sky-300 font-semibold mb-1">Pricing Model &amp; TCO:</strong>
                  <span>{rev.pricingSummary}</span>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {/* Pros */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    Key Strengths &amp; Advantages
                  </h4>
                  <ul className="space-y-2 text-xs text-sky-100/90">
                    {rev.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                    <XCircle className="size-4 text-rose-400" />
                    Limitations &amp; Trade-offs
                  </h4>
                  <ul className="space-y-2 text-xs text-sky-100/90">
                    {rev.cons.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose-400" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verdict & Ideal For */}
              <div className="mt-6 rounded-2xl bg-white/[0.08] p-4 text-xs space-y-2">
                <p className="text-white/95 leading-relaxed">
                  <strong className="text-sky-200">Architect's Verdict:</strong> {rev.verdict}
                </p>
                <p className="text-sky-200/90">
                  <strong className="text-sky-100">Ideal For:</strong> {rev.idealFor}
                </p>
              </div>

              {/* Direct CTA Button for BITS */}
              {rev.isBits && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-400/40 bg-blue-600/40 p-4">
                  <div className="text-xs">
                    <strong className="block text-white font-bold">Deploy the #1 Ranked Platform</strong>
                    <span className="text-sky-200">Zero per-seat recurring penalties · 100% sovereign deployment</span>
                  </div>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-blue-950 shadow-lg hover:bg-sky-50 transition-all hover:scale-105"
                  >
                    <span>Request Live Demo &amp; Audit</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </article>
          ))}
        </section>

        {/* FAQs Section */}
        {post.faqs.length > 0 && (
          <section aria-labelledby="faqs-heading" className="mb-16">
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="size-5 text-sky-300" />
              <h2 id="faqs-heading" className="text-xl font-bold text-white">
                Frequently Asked Architecture Questions
              </h2>
            </div>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/15 bg-white/[0.09] p-6 backdrop-blur-xl shadow-lg space-y-2"
                >
                  <h3 className="text-base font-bold text-white">{faq.question}</h3>
                  <p className="text-sm text-sky-100/90 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Closing Action Banner */}
        <section aria-labelledby="closing-cta-heading" className="mb-16 rounded-3xl border border-sky-300/50 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-900 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-2xl">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 id="closing-cta-heading" className="text-2xl font-black text-white sm:text-3xl">
              {post.ctaHeading}
            </h2>
            <p className="text-sm text-sky-100/90 leading-relaxed sm:text-base">
              {post.ctaText}
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-xs font-black uppercase tracking-wider text-blue-950 shadow-2xl hover:bg-sky-50 transition-all hover:scale-[1.03]"
              >
                <span>{post.ctaButtonText}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles Carousel / Grid */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-8 border-t border-white/15">
            <div className="mb-6 flex items-center justify-between">
              <h2 id="related-heading" className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="size-5 text-sky-300" />
                Related Benchmarks &amp; Architectural Briefs
              </h2>
              <Link href="/blog" className="text-xs font-semibold text-sky-200 hover:text-white flex items-center gap-1">
                <span>View all research</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl hover:border-sky-300/50 hover:bg-white/[0.14] transition-all group shadow-md"
                >
                  <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
                    {rel.category}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs text-sky-100/80 line-clamp-2">
                    {rel.heroSnippet}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
