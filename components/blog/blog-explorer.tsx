"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

interface BlogExplorerProps {
  posts: BlogPost[];
  featuredPostSlug: string;
}

const categories = [
  { id: "all", label: "All Guides & Benchmarks" },
  { id: "Collections OMS", label: "Collections & Recovery (OMS)" },
  { id: "Enterprise CRM", label: "Enterprise CRM" },
  { id: "Operations Strategy", label: "Operations Strategy (OMS)" },
  { id: "Voice AI Agents", label: "Voice AI & Telephony" },
  { id: "Datacenter Architecture", label: "Cloud & Datacenter" },
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
      {/* Search & Filter Bar */}
      <div className="rounded-3xl border border-sky-300/30 bg-white/[0.12] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-sky-200" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, e.g. 'crm for collections', 'best crm', 'dialer'..."
              className="w-full rounded-2xl border border-sky-200/30 bg-blue-950/50 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-sky-200/60 focus:border-sky-300 focus:bg-blue-950/80 focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-sky-200 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Search Intent Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-sky-200">
            <span className="font-semibold text-sky-300/80 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="size-3" /> Popular searches:
            </span>
            {[
              "crm for collections",
              "best crm",
              "best oms",
              "voice ai",
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  setSelectedCategory("all");
                }}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                  searchQuery.toLowerCase() === tag
                    ? "border-amber-300 bg-amber-400 text-blue-950 font-bold"
                    : "border-sky-300/30 bg-white/10 text-sky-100 hover:bg-white/20 hover:text-white"
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
                "rounded-full px-4 py-2 text-xs font-bold transition-all shadow-xs",
                selectedCategory === cat.id
                  ? "bg-white text-blue-950 shadow-md scale-[1.02]"
                  : "bg-white/10 text-sky-100 hover:bg-white/20 hover:text-white border border-white/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <BookOpen className="size-5 text-sky-300" />
          {selectedCategory === "all"
            ? "All Architectural Guides & Market Reviews"
            : `${selectedCategory} Guides`}
        </h2>
        <span className="text-xs text-sky-200 font-mono">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.10] p-6 backdrop-blur-xl shadow-xl hover:border-sky-300/50 hover:bg-white/[0.15] transition-all group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-sky-200">
                  <span className="rounded-full bg-blue-500/30 border border-sky-300/30 px-3 py-0.5 font-bold uppercase tracking-wider text-sky-200 text-[10px]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="size-3 text-sky-300" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="mt-4 text-lg font-bold text-white group-hover:text-sky-200 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-3 text-xs text-sky-100/85 leading-relaxed line-clamp-3">
                  {post.heroSnippet}
                </p>

                {/* Plain-Language Takeaway Badge */}
                <div className="mt-4 rounded-xl bg-blue-950/40 border border-white/10 p-2.5 text-[11px] text-sky-200">
                  <span className="font-bold text-white block mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-emerald-400" /> Plain-English Takeaway:
                  </span>
                  <span className="line-clamp-2 text-sky-100/90">
                    {post.executiveSummary.slice(0, 140)}...
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-sky-200/80">
                  <Calendar className="size-3" />
                  {new Date(post.modifiedDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-sky-200 group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/15 bg-white/10 p-12 text-center backdrop-blur-xl">
          <p className="text-base text-sky-100">
            No guides found matching &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-blue-950 shadow-md hover:bg-sky-50 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
