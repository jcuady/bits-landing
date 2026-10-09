"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT_REGISTRY, getCanonicalProducts, ProductMvpConfig } from "@/lib/products/registry";
import {
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Search,
  ArrowRight,
  Globe,
  CheckCircle2,
  Building2,
  Cpu,
  Truck,
  Users2,
  Trophy,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";

const CATEGORIES = [
  { id: "all", label: "All 18 Engines", icon: Layers },
  { id: "crm", label: "CRM & Revenue", icon: Users2 },
  { id: "operations", label: "ERP & Financials", icon: Building2 },
  { id: "workforce", label: "Workforce & HR", icon: Users2 },
  { id: "supply-chain", label: "Supply Chain & Fleet", icon: Truck },
  { id: "venues", label: "Sports, Venues & Queue", icon: Trophy },
  { id: "ai", label: "Voice AI & Knowledge", icon: Cpu },
];

export default function DemoMatrixHub() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isDark, setIsDark] = React.useState<boolean>(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("bits_theme") || localStorage.getItem("bionis-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("bits_theme", "dark");
      localStorage.setItem("bionis-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("bits_theme", "light");
      localStorage.setItem("bionis-theme", "light");
    }
  };

  // Canonical products only — excludes subdomain aliases, which otherwise
  // rendered "Operations 360" twice on this page.
  const productsList = getCanonicalProducts();

  const filteredProducts = React.useMemo(() => {
    return productsList.filter((p) => {
      const matchesCategory =
        activeCategory === "all" ||
        p.category === activeCategory ||
        (activeCategory === "operations" && (p.category === "operations" || p.id === "accounting"));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.subdomain.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [productsList, activeCategory, searchQuery]);

  return (
    <div className="relative min-h-[100dvh] text-slate-900 dark:text-slate-100 antialiased font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* ── ATMOSPHERIC ANIMATED SKY & DRIFTING CLOUDS (Hero Cloud Aesthetics) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden select-none"
        aria-hidden
      >
        {/* LIGHT MODE: Ultra HD Drifting Clouds & Sky Horizon */}
        <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-700">
          <div className="absolute inset-0">
            <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
              <Image
                src="/images/crm-sky-cloud-bg.jpg"
                alt="Atmospheric sky background with drifting clouds"
                fill
                priority
                quality={90}
                className="object-cover object-top select-none scale-105"
              />
            </div>
          </div>
          {/* Celestial Sunbreak Bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.85),rgba(219,234,254,0.45)_40%,transparent_80%)]" />
          {/* Horizon Soft Feathering */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* DARK MODE: Deep Cosmic Obsidian with Glowing HUD Aura */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700 bg-[#040914]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#040914] via-[#071124] to-[#030611]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,99,219,0.22),rgba(0,166,255,0.08)_45%,transparent_75%)]" />
          <div className="absolute inset-0 bg-grid-dark opacity-40" />
        </div>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-blue-100/80 bg-white/75 backdrop-blur-2xl px-4 sm:px-8 py-3.5 shadow-xs transition-colors dark:border-white/10 dark:bg-[#070e1c]/90 dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-90 transition">
              <Logo className="h-8" />
            </Link>
            <div className="hidden md:flex items-center gap-2 border-l border-blue-100 dark:border-white/10 pl-4 text-xs">
              <Badge variant="outline" className="border-blue-200 bg-blue-50/80 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-cyan-400 font-bold text-[10px]">
                18-Engine MVP Matrix
              </Badge>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Subdomain Routing Architecture</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1 transition"
            >
              <span>Launch Flagship: OPERATIONS 360</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/crm-sales"
              className="hidden sm:flex text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 items-center gap-1 transition border-l border-blue-100 dark:border-white/10 pl-3"
            >
              <span>Sales CRM</span>
            </Link>

            {/* Theme Toggle Button */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
              className="size-8 rounded-xl border-blue-100/80 bg-white/80 hover:bg-white text-slate-700 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-200 cursor-pointer"
            >
              {isDark ? (
                <Sun className="size-3.5 text-amber-400" />
              ) : (
                <Moon className="size-3.5 text-slate-700" />
              )}
            </Button>

            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold h-8 rounded-xl shadow-md shadow-blue-600/20">
              <Link href="/#contact">Book Architecture Call</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Light Blue Cloud Glassmorphism */}
      <section className="relative px-4 sm:px-8 pt-12 pb-10 border-b border-blue-100/80 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 dark:border-white/15 dark:bg-white/10 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 mb-4 backdrop-blur-md shadow-xs">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 dark:bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-blue-600 dark:bg-cyan-400" />
                </span>
                <span className="tracking-wide">ENTERPRISE MULTI-TENANT SUBDOMAIN SHOWCASE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                All 18 BITS Software Engines. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-300">
                  Live Interactive MVPs.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                Experience context-aware test logins as a Product Owner, Project Manager, or Full-Stack Developer. 
                Each product is wired with Philippine enterprise seed data, 12% BIR tax compliance, WebRTC softphone dialers, and edge subdomain routing.
              </p>
            </div>

            {/* Architecture Highlights Card (Double-Bezel Architecture) */}
            <div className="p-1.5 rounded-[1.75rem] border border-blue-200/70 bg-white/60 backdrop-blur-xl shadow-lg shadow-blue-500/5 dark:border-white/15 dark:bg-white/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] lg:w-96 shrink-0">
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-white/90 dark:bg-[#0b1324]/90 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] border border-blue-100/80 dark:border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                    <span>Subdomain Architecture</span>
                  </div>
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center justify-between border-b border-blue-50 dark:border-white/10 pb-2">
                    <span>Routing Protocol</span>
                    <strong className="text-slate-900 dark:text-slate-200 font-mono text-[11px]">Edge Host Rewrites</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-blue-50 dark:border-white/10 pb-2">
                    <span>Identity Layer</span>
                    <strong className="text-slate-900 dark:text-slate-200 font-semibold">Universal SSO + 1-Click</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-blue-50 dark:border-white/10 pb-2">
                    <span>Currency &amp; VAT</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">₱ PHP / 12% BIR VAT</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deployment VPC</span>
                    <strong className="text-blue-700 dark:text-cyan-400 font-mono text-[11px]">Zero-Egress Multi-Tenant</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 dark:bg-blue-500"
                        : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-blue-100/90 shadow-2xs dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search engine name, subdomain, or keyword..."
                className="w-full h-9 rounded-xl border border-blue-100/90 bg-white/85 pl-10 pr-3.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition shadow-2xs dark:border-white/10 dark:bg-[#0b1324]/85 dark:text-white dark:placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 18-Product Grid */}
      <main className="flex-1 px-4 sm:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> of 18 Engines
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500" />
              <span>Click &quot;Launch Sandbox&quot; to test with context-aware pre-seeded data</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const liveAppPath = p.demoPath.replace("/(products)", "");
              const isOpsFlagship = p.id === "operations-360";
              const isSalesPilot = p.id === "crm-sales";
              const isFeatured = isOpsFlagship || isSalesPilot;

              const launchUrl = isOpsFlagship
                ? "/app"
                : isSalesPilot
                ? "/crm-sales"
                : `/login?product=${p.id}`;

              return (
                /* Double-Bezel Architecture (Doppelrand) */
                <div
                  key={p.id}
                  className={`group p-1.5 rounded-[1.75rem] border transition-all duration-300 hover:-translate-y-1 ${
                    isOpsFlagship
                      ? "border-emerald-300/80 bg-gradient-to-b from-emerald-100/60 to-white/60 shadow-xl shadow-emerald-500/10 dark:border-emerald-500/40 dark:from-emerald-950/40 dark:to-slate-950/80"
                      : isSalesPilot
                      ? "border-blue-300/80 bg-gradient-to-b from-blue-100/60 to-white/60 shadow-xl shadow-blue-500/10 dark:border-blue-500/40 dark:from-blue-950/40 dark:to-slate-950/80"
                      : "border-blue-100/80 bg-white/60 shadow-sm hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  <div
                    className={`size-full rounded-[calc(1.75rem-0.375rem)] p-5 flex flex-col justify-between backdrop-blur-xl border ${
                      isOpsFlagship
                        ? "bg-white/95 dark:bg-[#07131b]/95 border-emerald-100 dark:border-emerald-900/40"
                        : isSalesPilot
                        ? "bg-white/95 dark:bg-[#070f20]/95 border-blue-100 dark:border-blue-900/40"
                        : "bg-white/90 dark:bg-[#0b1324]/90 border-blue-50 dark:border-white/10"
                    }`}
                  >
                    <div>
                      {/* Header: Category & Subdomain */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <Badge
                          variant="outline"
                          className={
                            isOpsFlagship
                              ? "border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700 font-bold dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : isSalesPilot
                              ? "border-blue-200 bg-blue-50 text-[10px] text-blue-700 font-bold dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300"
                              : "border-slate-200 bg-slate-50 text-[10px] text-slate-600 font-semibold dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                          }
                        >
                          {p.categoryLabel}
                        </Badge>
                        <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-black/50 px-2 py-0.5 rounded border border-slate-200/70 dark:border-white/10">
                          {p.subdomain}.boundlessits.com
                        </div>
                      </div>

                      {/* Product Title */}
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {p.name}
                        </h2>
                        {isOpsFlagship && (
                          <Badge className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 tracking-wider shadow-xs">
                            FLAGSHIP
                          </Badge>
                        )}
                        {isSalesPilot && (
                          <Badge className="bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 shadow-xs">
                            PILOT
                          </Badge>
                        )}
                      </div>

                      {/* Tagline */}
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[36px]">
                        {p.tagline}
                      </p>

                      {/* Test Roles Available */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                          Test Role Presets:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.testRoles.map((role) => (
                            <span
                              key={role.id}
                              className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300"
                            >
                              {role.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                      {/* 1-Click Launch Button (Nested Button-in-Button Pattern) */}
                      <Button
                        asChild
                        size="sm"
                        className={`text-xs font-bold rounded-xl flex-1 group/btn h-9 ${
                          isOpsFlagship
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25"
                            : isSalesPilot
                            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25"
                            : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 dark:border dark:border-white/15"
                        }`}
                      >
                        <Link href={launchUrl} className="flex items-center justify-center gap-2">
                          <span>{isFeatured ? "Launch Live Sandbox" : "Test Login Sandbox"}</span>
                          <span className="size-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      </Button>

                      {/* Public Lander */}
                      <Link
                        href={p.marketingUrl}
                        target="_blank"
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10"
                        title="View Public Marketing Lander"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-100/80 bg-white/70 backdrop-blur-xl py-8 px-4 text-center text-xs text-slate-500 dark:border-white/10 dark:bg-[#070e1c]/80 dark:text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-medium">
            Boundless IT Solutions (BITS) • 18-Engine Modular Micro-Frontend Architecture
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-white transition">Main Website</Link>
            <Link href="/legal" className="hover:text-blue-600 dark:hover:text-white transition">Legal &amp; Compliance</Link>
            <Link href="/#contact" className="hover:text-blue-600 dark:hover:text-white transition">Contact Solutions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
