"use client";

import * as React from "react";
import Link from "next/link";
import { type BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

interface BlogExplorerProps {
  posts: BlogPost[];
  featuredPostSlug: string;
}

const categories = [
  { id: "all", label: "All Guides & Benchmarks" },
  { id: "Collections OMS", label: "Collections & Debt Recovery (OMS)" },
  { id: "Enterprise CRM", label: "Enterprise CRM" },
  { id: "Operations Strategy", label: "Operations Strategy (OMS)" },
  { id: "Voice AI Agents", label: "Voice AI & Telephony" },
  { id: "Datacenter Architecture", label: "Cloud Repatriation & Datacenter" },
];

const popularSearches = [
  "top crm collections agency",
  "top oms",
  "best crm collections agency",
  "crm collections agency",
  "crm for collections agency",
  "best oms",
  "best crm 2026",
  "crm for finance",
  "salesforce alternative",
  "voice ai call center",
];

export function BlogExplorer({ posts, featuredPostSlug }: BlogExplorerProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      // Exclude featured post from the grid unless searching
      if (searchQuery.trim() === "" && post.slug === featuredPostSlug && selectedCategory === "all") {
        return false;
      }

      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.shortTitle.toLowerCase().includes(query) ||
        post.metaDescription.toLowerCase().includes(query) ||
        post.heroSnippet.toLowerCase().includes(query) ||
        post.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [posts, featuredPostSlug, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Double-Bezel Glass Console */}
      <div className="rounded-3xl border border-sky-300/35 bg-white/[0.12] p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.30)] backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input Box with Monospace Tag */}
          <div className="relative flex-1 max-w-xl">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-sky-200 uppercase">
              QUERY
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. 'top crm collections agency', 'top oms', 'salesforce'..."
              className="w-full rounded-2xl border border-sky-200/30 bg-blue-950/60 py-3.5 pl-20 pr-16 text-sm text-white placeholder:text-sky-200/60 focus:border-sky-300 focus:bg-blue-950/80 focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all min-h-[48px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-sky-200 hover:bg-white/20 hover:text-white transition-all min-h-[32px]"
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Quick Search Intent Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-sky-200">
            <span className="font-mono text-[11px] font-semibold text-sky-300/90 mr-1 uppercase tracking-wider">
              Popular Tags:
            </span>
            {popularSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  setSelectedCategory("all");
                }}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[11px] font-medium transition-all min-h-[32px] flex items-center",
                  searchQuery.toLowerCase() === tag
                    ? "border-amber-300 bg-amber-400 text-blue-950 font-bold shadow-md scale-105"
                    : "border-sky-300/30 bg-white/10 text-sky-100 hover:bg-white/20 hover:text-white hover:border-white/40"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/15">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-bold transition-all shadow-xs min-h-[40px] flex items-center",
                selectedCategory === cat.id
                  ? "bg-white text-blue-950 shadow-lg scale-[1.02] border border-white"
                  : "bg-white/10 text-sky-100 hover:bg-white/20 hover:text-white border border-white/15"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-sky-400/20 px-2 py-0.5 font-mono text-[11px] font-bold text-sky-200 uppercase">
            ARCHIVE
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {selectedCategory === "all"
              ? "All Architectural Guides & Market Reviews"
              : `${selectedCategory} Guides`}
          </h2>
        </div>
        <span className="text-xs text-sky-200 font-mono">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl border border-white/20 bg-white/[0.11] p-6 backdrop-blur-2xl shadow-xl hover:border-sky-300/60 hover:bg-white/[0.17] transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-sky-200">
                  <span className="rounded-full bg-blue-500/30 border border-sky-300/30 px-3 py-0.5 font-mono font-bold uppercase tracking-wider text-sky-200 text-[10px]">
                    {post.category}
                  </span>
                  <span className="font-mono text-[11px] text-sky-300">
                    ● {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-lg">
                  <h3 className="mt-4 text-lg font-bold text-white group-hover:text-sky-200 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-3 text-xs text-sky-100/85 leading-relaxed line-clamp-3">
                  {post.heroSnippet}
                </p>

                {/* Plain-Language Takeaway Badge */}
                <div className="mt-4 rounded-xl bg-blue-950/50 border border-white/10 p-3 text-[11px] text-sky-200">
                  <span className="font-bold text-white block mb-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                    ✓ PLAIN-ENGLISH TAKEAWAY
                  </span>
                  <span className="line-clamp-2 text-sky-100/90 leading-relaxed">
                    {post.executiveSummary.slice(0, 140)}...
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-sky-200/80">
                  {new Date(post.modifiedDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-sky-200 group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all py-1 min-h-[44px]"
                >
                  <span>Read Guide</span>
                  <span aria-hidden="true" className="font-bold">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-2xl">
          <p className="text-base text-sky-100">
            No guides found matching &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-blue-950 shadow-md hover:bg-sky-50 transition-all min-h-[44px]"
          >
            Reset Filters ↺
          </button>
        </div>
      )}
    </div>
  );
}
