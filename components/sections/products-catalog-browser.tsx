"use client";

import * as React from "react";
import Link from "next/link";
import { activeProducts } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CheckCircle2, Search, X, Filter } from "lucide-react";

const CATEGORY_ORDER = [
  "flagship",
  "crm",
  "workforce",
  "operations",
] as const;

const CATEGORY_META: Record<
  string,
  { label: string; shortLabel: string; description: string; accent: string; id: string }
> = {
  flagship: {
    id: "flagship",
    label: "Collections & Operations Platform",
    shortLabel: "Collections & OMS",
    description: "Our flagship integrated operations management system, collections CRM, and voice AI.",
    accent: "from-blue-600 to-indigo-600",
  },
  crm: {
    id: "crm",
    label: "Customer Service Desk & PBX",
    shortLabel: "Service Desk & PBX",
    description: "Subscriber directory, ticket workflows, and Asterisk PBX with two-tier access separation.",
    accent: "from-sky-600 to-blue-600",
  },
  workforce: {
    id: "workforce",
    label: "Workforce, Rostering & Payroll",
    shortLabel: "HRMS & Payroll",
    description: "24/7 biometric shift rostering, statutory TRAIN Law payroll, and bank batch disbursements.",
    accent: "from-violet-600 to-purple-600",
  },
  operations: {
    id: "operations",
    label: "Messaging & Community Cloud",
    shortLabel: "Messaging & Community",
    description: "Direct and group chats, channels, drop-in voice/video rooms, Maritess Hub radar, and marketplace.",
    accent: "from-emerald-600 to-teal-600",
  },
};

export function ProductsCatalogBrowser() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Compute counts per category
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: activeProducts.length };
    for (const cat of CATEGORY_ORDER) {
      counts[cat] = activeProducts.filter((p) => p.category === cat).length;
    }
    return counts;
  }, []);

  // Filter products by activeCategory and searchQuery
  const filteredProducts = React.useMemo(() => {
    return activeProducts.filter((product) => {
      const cat = product.category as string;
      if (activeCategory !== "all" && cat !== activeCategory) return false;

      if (normalizedQuery) {
        const matches =
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.shortName.toLowerCase().includes(normalizedQuery) ||
          product.tagline.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.badge.toLowerCase().includes(normalizedQuery) ||
          product.capabilities.some((c) => c.toLowerCase().includes(normalizedQuery));
        if (!matches) return false;
      }

      return true;
    });
  }, [activeCategory, normalizedQuery]);

  const totalMatching = filteredProducts.length;
  const isFiltered = activeCategory !== "all" || normalizedQuery.length > 0;

  return (
    <div>
      {/* ── Sticky Glassmorphic Category Filter & Instant Search Bar ── */}
      <div
        data-products-filter-bar="true"
        className="sticky top-20 z-30 mb-10 rounded-2xl border border-sky-200/90 bg-white/90 p-3.5 sm:p-4 shadow-lg shadow-blue-950/5 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              data-category-filter="all"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "shrink-0 inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-sky-50/70 hover:text-blue-700"
              )}
            >
              <Filter className="size-3" />
              <span>All Products</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 font-mono text-[10px]",
                  activeCategory === "all"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {categoryCounts.all}
              </span>
            </button>

            {CATEGORY_ORDER.map((catKey) => {
              const meta = CATEGORY_META[catKey];
              if (!meta) return null;
              const isSelected = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  data-category-filter={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={cn(
                    "shrink-0 inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    isSelected
                      ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/25"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-sky-50/70 hover:text-blue-700"
                  )}
                >
                  <span>{meta.shortLabel}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 font-mono text-[10px]",
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {categoryCounts[catKey] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instant Keyword Search Input */}
          <div className="relative flex items-center w-full lg:w-72 shrink-0">
            <Search
              className="pointer-events-none absolute left-3.5 size-4 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="products-catalog-search" className="sr-only">
              Search products by name or capability
            </label>
            <input
              id="products-catalog-search"
              data-products-search-input="true"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeProducts.length} products (e.g. ULAP, HRMS)...`}
              className="h-10 w-full rounded-full border border-slate-200 bg-slate-50/80 pl-9 pr-9 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 inline-flex size-5 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 hover:bg-slate-300 cursor-pointer"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Status Bar */}
        {isFiltered && (
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-600 px-1">
            <span>
              Showing <strong className="font-bold text-slate-900">{totalMatching}</strong> of{" "}
              {activeProducts.length} products
              {activeCategory !== "all" && CATEGORY_META[activeCategory]
                ? ` in ${CATEGORY_META[activeCategory].label}`
                : ""}
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Empty State if search matches nothing */}
      {totalMatching === 0 && (
        <div className="my-12 rounded-3xl border border-slate-200 bg-slate-50/70 p-10 text-center">
          <p className="text-base font-bold text-slate-900">
            No products matched &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Try searching for another keyword or reset the category filter to view all{" "}
            {activeProducts.length} products.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
          >
            Show All {activeProducts.length} Products
          </button>
        </div>
      )}

      {/* ── 4 Live Products Grid ── */}
      {totalMatching > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProducts.map((product) => {
            const productHref = product.ctaHref;
            const meta = CATEGORY_META[product.category as string];

            return (
              <Link
                key={product.id}
                data-product-card={product.id}
                href={productHref}
                className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 h-full"
              >
                {/* Flagship Badge */}
                {product.isFlagship && (
                  <div className="absolute -top-3 right-6">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                      ★ Primary Flagship Platform
                    </span>
                  </div>
                )}

                {/* Category Kicker */}
                {meta && (
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-600 mb-2">
                    {meta.label}
                  </span>
                )}

                {/* Product Name & Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {product.name}
                    </h2>
                    <span className="mt-1.5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      {product.badge}
                    </span>
                  </div>
                  {/* Metric */}
                  <div className="shrink-0 text-right">
                    <p className="text-lg sm:text-xl font-black text-blue-600 group-hover:text-blue-700 transition-colors font-mono">
                      {product.metrics.value}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {product.metrics.label}
                    </p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="mt-4 text-sm text-slate-700 leading-relaxed font-semibold">
                  {product.tagline}
                </p>

                {/* Plain-English summary */}
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Capabilities Snippet */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.capabilities.slice(0, 4).map((cap, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </span>
                  ))}
                </div>

                {/* CTA Button Link */}
                <div className="mt-auto pt-6 flex items-center justify-between text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Explore {product.shortName}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5 text-base">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
