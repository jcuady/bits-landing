"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCT_REGISTRY, ProductMvpConfig } from "@/lib/products/registry";
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

  const productsList = Object.values(PRODUCT_REGISTRY);

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
    <div className="min-h-[100dvh] bg-slate-950 text-slate-100 antialiased font-sans flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-90 transition">
              <Logo variant="horizontal" className="h-8 invert" />
            </Link>
            <div className="hidden md:flex items-center gap-2 border-l border-slate-800 pl-4 text-xs text-slate-400">
              <Badge variant="outline" className="border-electric-500/40 bg-electric-500/10 text-electric-400 font-semibold text-[10px]">
                18-Engine MVP Matrix
              </Badge>
              <span>Subdomain Routing Architecture</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
            >
              <span>Launch Flagship: OPERATIONS 360</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/crm-sales"
              className="hidden sm:flex text-xs font-semibold text-electric-400 hover:text-electric-300 items-center gap-1 transition border-l border-slate-800 pl-3"
            >
              <span>Sales CRM</span>
            </Link>
            <Button asChild size="sm" className="bg-electric-600 hover:bg-electric-500 text-xs font-semibold h-8">
              <Link href="/contact">Book Architecture Call</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-8 py-10 bg-gradient-to-b from-navy-950 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-3 py-1 text-xs font-semibold text-electric-400 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Enterprise Multi-Tenant Subdomain Showcase</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                All 18 BITS Software Engines. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-teal-400">
                  Live Interactive MVPs.
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                Experience context-aware test logins as a Product Owner, Project Manager, or Full-Stack Developer. 
                Each product is wired with Philippine enterprise seed data, tax compliance, and edge subdomain routing.
              </p>
            </div>

            {/* Architecture Highlights Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 lg:w-96 backdrop-blur-md shrink-0">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-electric-400" />
                <span>Subdomain Architecture</span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span>Routing Protocol</span>
                  <strong className="text-slate-200 font-mono">Edge Host Rewrites</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span>Identity Layer</span>
                  <strong className="text-slate-200">Universal SSO + 1-Click</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Currency & VAT</span>
                  <strong className="text-emerald-400 font-mono">₱ PHP / 12% BIR VAT</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-electric-600 text-white font-semibold shadow-md shadow-electric-600/30"
                        : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search engine name or keyword..."
                className="w-full h-9 rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-electric-500 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 18-Product Grid */}
      <main className="flex-1 px-4 sm:px-8 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs font-semibold text-slate-400">
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> of 18 Engines
            </div>
            <div className="text-[11px] text-slate-500">
              Click &quot;Launch Sandbox&quot; to test with pre-seeded data
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
                <div
                  key={p.id}
                  className={`group rounded-2xl border p-5 flex flex-col justify-between transition-all backdrop-blur-sm ${
                    isOpsFlagship
                      ? "border-emerald-500/60 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-900 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/30"
                      : isSalesPilot
                      ? "border-electric-500/60 bg-gradient-to-b from-electric-950/20 to-slate-900 shadow-xl shadow-electric-950/30"
                      : "border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
                  }`}
                >
                  <div>
                    {/* Header: Category & Subdomain */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className={
                          isOpsFlagship
                            ? "border-emerald-500/40 bg-emerald-500/10 text-[10px] text-emerald-300 font-semibold"
                            : "border-slate-700 bg-slate-800 text-[10px] text-slate-300 font-semibold"
                        }
                      >
                        {p.categoryLabel}
                      </Badge>
                      <div className="font-mono text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {p.subdomain}.boundlessits.com
                      </div>
                    </div>

                    {/* Product Title */}
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white group-hover:text-electric-300 transition">
                        {p.name}
                      </h2>
                      {isOpsFlagship && (
                        <Badge className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 tracking-wider">
                          FLAGSHIP
                        </Badge>
                      )}
                      {isSalesPilot && (
                        <Badge className="bg-electric-600 text-white text-[9px] font-bold px-1.5 py-0.5">
                          PILOT
                        </Badge>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {p.tagline}
                    </p>

                    {/* Test Roles Available */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Test Role Presets:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.testRoles.map((role) => (
                          <span
                            key={role.id}
                            className="rounded-md bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-[10px] text-slate-300"
                          >
                            {role.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    {/* 1-Click Launch Button */}
                    <Button
                      asChild
                      size="sm"
                      className={`text-xs font-semibold flex-1 ${
                        isOpsFlagship
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
                          : isSalesPilot
                          ? "bg-electric-600 hover:bg-electric-500"
                          : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                      }`}
                    >
                      <Link href={launchUrl}>
                        <span>{isFeatured ? "Launch Live MVP" : "Login & Test"}</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>

                    {/* Public Lander */}
                    <Link
                      href={p.marketingUrl}
                      target="_blank"
                      className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="View Public Marketing Lander"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 px-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Boundless IT Solutions (BITS) • 18-Engine Modular Micro-Frontend Architecture
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition">Main Website</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
