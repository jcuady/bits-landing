"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts } from "@/lib/blog-data";

/**
 * Credibility — two editorial posts surfaced as evidence, not as a content hub.
 *
 * The homepage sells; these two posts are how a technical buyer checks
 * whether the claims hold. Titles are framed as findings rather than
 * "read our blog", because the link has to make a point to earn the click.
 *
 * Picks the first two posts flagged `featured` in lib/blog-data.ts, so
 * promoting a post is a one-word data change. No hardcoded slugs.
 */

const FEATURED = blogPosts.filter((post) => post.featured).slice(0, 2);

export function Credibility() {
  if (FEATURED.length === 0) return null;

  return (
    <section id="credibility" className="relative border-t border-slate-200/60 bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  Independent reading
                </span>
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                We publish how we benchmark, so you can check the claims.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
            >
              <BookOpen className="size-4" aria-hidden />
              All research
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURED.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-8 backdrop-blur-md transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-blue-700">
                    {post.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
                  {post.shortTitle ?? post.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.metaDescription}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-slate-200/70 pt-4">
                  <span className="text-xs font-medium text-slate-500">
                    {post.author.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                    Read
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}