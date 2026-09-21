"use client";

import * as React from "react";
import Link from "next/link";
import { bitsProducts } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Bot,
  TrendingUp,
  Mail,
  CreditCard,
  Users,
  Calculator,
  HardHat,
  Boxes,
  Truck,
  Video,
  Trophy,
  CalendarCheck,
  Ticket,
  Database,
  Layers,
  Zap,
  MapPin,
  Tv,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  Columns3,
  SlidersHorizontal,
  Radio,
  Smartphone,
  Lock,
  Globe,
  Share2,
  Landmark,
} from "lucide-react";

const categoryFilters = [
  { id: "all", label: "All Products (17)", count: 17, color: "blue" },
  { id: "flagship", label: "Core Flagships", count: 2, color: "indigo" },
  { id: "crm", label: "CRM Variants", count: 4, color: "emerald" },
  { id: "operations", label: "ERP, Finance & Operations", count: 6, color: "amber" },
  { id: "sports", label: "Sports, Booking & Queuing", count: 4, color: "rose" },
  { id: "identity", label: "Smart NFC & Identity", count: 1, color: "cyan" },
  { id: "ai", label: "AI & Knowledge", count: 2, color: "purple" },
] as const;

type CategoryFilterId = (typeof categoryFilters)[number]["id"];

export function ProductsSuite() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilterId>("all");
  const [activeProductId, setActiveProductId] = React.useState<string>("service");

  const filteredProducts = React.useMemo(() => {
    if (activeCategory === "all") return bitsProducts;
    if (activeCategory === "flagship") return bitsProducts.filter((p) => p.isFlagship);
    if (activeCategory === "crm")
      return bitsProducts.filter((p) => p.category === "crm" || p.id === "service");
    if (activeCategory === "ai")
      return bitsProducts.filter((p) => p.category === "ai" || p.id === "ai-agent");
    if (activeCategory === "operations")
      return bitsProducts.filter(
        (p) => p.category === "operations" || p.category === "workforce"
      );
    return bitsProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activeProduct =
    bitsProducts.find((p) => p.id === activeProductId) || filteredProducts[0] || bitsProducts[0];

  const getProductIcon = (id: string) => {
    switch (id) {
      case "service":
        return PhoneCall;
      case "ai-agent":
        return Bot;
      case "sales":
        return TrendingUp;
      case "marketing":
        return Mail;
      case "commerce":
        return CreditCard;
      case "accounting":
        return Landmark;
      case "hrms":
        return Users;
      case "payroll":
        return Calculator;
      case "construction":
        return HardHat;
      case "inventory":
        return Boxes;
      case "logistics":
        return Truck;
      case "sports-ai":
        return Video;
      case "sports-hub":
        return Trophy;
      case "booking":
        return CalendarCheck;
      case "queuing":
        return Ticket;
      case "rag-engine":
        return Database;
      case "nfc-card":
        return Radio;
      default:
        return Layers;
    }
  };

  const getProductColor = (id: string) => {
    switch (id) {
      case "service":
        return "from-blue-600 to-indigo-600 text-blue-600 bg-blue-50 border-blue-200";
      case "ai-agent":
        return "from-violet-600 to-purple-600 text-violet-600 bg-violet-50 border-violet-200";
      case "sales":
        return "from-emerald-600 to-teal-600 text-emerald-600 bg-emerald-50 border-emerald-200";
      case "marketing":
        return "from-pink-600 to-rose-600 text-pink-600 bg-pink-50 border-pink-200";
      case "commerce":
        return "from-cyan-600 to-blue-600 text-cyan-600 bg-cyan-50 border-cyan-200";
      case "accounting":
        return "from-emerald-600 to-teal-700 text-emerald-700 bg-emerald-50 border-emerald-200";
      case "hrms":
        return "from-amber-600 to-orange-600 text-amber-600 bg-amber-50 border-amber-200";
      case "payroll":
        return "from-emerald-600 to-green-600 text-emerald-600 bg-emerald-50 border-emerald-200";
      case "construction":
        return "from-amber-500 to-yellow-600 text-amber-700 bg-amber-50 border-amber-200";
      case "inventory":
        return "from-blue-500 to-cyan-600 text-blue-700 bg-blue-50 border-blue-200";
      case "logistics":
        return "from-indigo-600 to-blue-600 text-indigo-700 bg-indigo-50 border-indigo-200";
      case "sports-ai":
        return "from-cyan-600 to-teal-600 text-cyan-700 bg-cyan-50 border-cyan-200";
      case "sports-hub":
        return "from-emerald-600 to-teal-700 text-emerald-700 bg-emerald-50 border-emerald-200";
      case "booking":
        return "from-blue-600 to-indigo-700 text-blue-700 bg-blue-50 border-blue-200";
      case "queuing":
        return "from-rose-600 to-pink-600 text-rose-700 bg-rose-50 border-rose-200";
      case "rag-engine":
        return "from-violet-600 to-purple-700 text-violet-700 bg-violet-50 border-violet-200";
      case "nfc-card":
        return "from-cyan-600 to-blue-600 text-cyan-700 bg-cyan-50 border-cyan-200";
      default:
        return "from-blue-600 to-indigo-600 text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <Section id="products-suite" className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-28">
      {/* Light Ambient Background Grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.06),transparent_80%)]" />
        <div className="absolute left-1/2 -top-24 size-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.03] blur-3xl" />
        <div className="absolute inset-0 bg-grid-light opacity-60" />
      </div>

      <Container className="relative z-10">
        {/* monday.com-Inspired Section Eyebrow & Hero Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white px-4 py-1.5 shadow-xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                The BITS Enterprise Work OS
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              One unified operational platform.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Every department aligned.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              Organize projects, streamline SAP-grade general ledgers, automate revenue pipelines, dispatch service queues, and run autonomous voice AI.
              Select any specialized engine below to explore live interactive boards and workflows in action.
            </p>
          </Reveal>

          {/* Cloud Recommended & Continuous Evolution Assurance Pill */}
          <Reveal delay={0.04}>
            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-full border border-blue-200/90 bg-white/95 px-4 py-2 text-xs shadow-2xs">
              <span className="inline-flex items-center gap-1.5 font-bold text-slate-900">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                <span>Deploy via Managed Cloud</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-emerald-800">
                  Recommended
                </span>
                <span className="text-slate-500 font-normal">or Sovereign On-Prem</span>
              </span>
              <span className="hidden text-slate-300 sm:inline" aria-hidden>•</span>
              <span className="text-slate-600">
                Continuous Security &amp; Architectural Improvements Included
              </span>
            </div>
          </Reveal>

          {/* Monday-Style Category Filter Tabs with Color Accents */}
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {categoryFilters.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.id);
                      const matching =
                        tab.id === "all"
                          ? bitsProducts
                          : tab.id === "flagship"
                          ? bitsProducts.filter((p) => p.isFlagship)
                          : tab.id === "crm"
                          ? bitsProducts.filter((p) => p.category === "crm" || p.id === "service")
                          : tab.id === "ai"
                          ? bitsProducts.filter((p) => p.category === "ai" || p.id === "ai-agent")
                          : tab.id === "operations"
                          ? bitsProducts.filter(
                              (p) => p.category === "operations" || p.category === "workforce"
                            )
                          : bitsProducts.filter((p) => p.category === tab.id);

                      if (matching.length > 0 && !matching.some((p) => p.id === activeProductId)) {
                        setActiveProductId(matching[0].id);
                      }
                    }}
                    className={cn(
                      "group flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm",
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/20"
                        : "border border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[0.68rem] font-extrabold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Monday.com-Style Horizontal Product Pills Carousel */}
        <div className="mt-8 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max px-2">
            {filteredProducts.map((prod) => {
              const isSelected = activeProduct.id === prod.id;
              const Icon = getProductIcon(prod.id);
              const colorClass = getProductColor(prod.id);

              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setActiveProductId(prod.id)}
                  className={cn(
                    "group relative flex min-h-[44px] items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-150",
                    isSelected
                      ? "border-blue-600 bg-white shadow-md shadow-blue-900/10 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white/90 hover:border-slate-300 hover:bg-white text-slate-700 shadow-2xs"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{prod.name}</span>
                      {prod.isFlagship && (
                        <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[0.6rem] font-extrabold text-blue-700 uppercase">
                          Flagship
                        </span>
                      )}
                    </div>
                    <p className="text-[0.68rem] text-slate-500 max-w-[180px] truncate">{prod.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Product Detailed Card: Clean White Light Mode Showcase */}
        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
          {/* Top Flagship Banner if Flagship */}
          {activeProduct.isFlagship && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-white px-4 py-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Zap className="size-3.5 fill-white" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Core Operational Flagship Platform
                  </p>
                  <p className="text-[0.68rem] text-slate-500">
                    High-throughput, carrier-grade, mission-critical infrastructure
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-blue-700">
                SLA: 99.99% Guaranteed
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Product Information & Value Props */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 font-mono text-[0.7rem] font-bold text-blue-700 uppercase tracking-wider">
                    {activeProduct.categoryLabel}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.7rem] font-semibold text-slate-600">
                    {activeProduct.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {activeProduct.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {activeProduct.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {activeProduct.description}
                </p>
              </div>

              {/* Performance / Value Metric Box */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-2xs">
                <div className="text-3xl font-extrabold text-blue-600 font-mono sm:text-4xl">
                  {activeProduct.metrics.value}
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                    Operational Benchmark
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {activeProduct.metrics.label}
                  </p>
                </div>
              </div>

              {/* Compliance Badges */}
              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Statutory & Compliance Alignment
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.complianceBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-slate-700 shadow-2xs"
                    >
                      <ShieldCheck className="size-3.5 text-blue-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-2 pt-1">
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400">
                  Engineered Capabilities
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeProduct.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span className="leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href={activeProduct.ctaHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <span>{activeProduct.ctaText}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Magnetic>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-[44px] items-center text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Schedule Solution Walkthrough →
                </Link>
              </div>
            </div>

            {/* Right Column: monday.com-Inspired Interactive Light Mode Board Mockup */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                {/* monday.com Board Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-60">
                      <span className="size-2.5 rounded-full bg-rose-400" />
                      <span className="size-2.5 rounded-full bg-amber-400" />
                      <span className="size-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <span className="text-xs font-bold text-slate-800">{activeProduct.name}</span>
                    <span className="rounded bg-slate-200/70 px-2 py-0.5 text-[0.62rem] font-bold text-slate-600">
                      Live Workspace
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1 text-[0.68rem] text-slate-500 font-medium">
                      <Filter className="size-3" /> Filter
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[0.68rem] text-slate-500 font-medium">
                      <Columns3 className="size-3" /> Columns
                    </span>
                    <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                </div>

                {/* Monday-Style Board Body Container */}
                <div className="p-4 sm:p-5">
                  <ProductMockupBoard productId={activeProduct.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── monday.com-Style Signature Light Mode Board Mockups ── */
function ProductMockupBoard({ productId }: { productId: string }) {
  switch (productId) {
    case "service":
      return <ServiceBoard />;
    case "ai-agent":
      return <AiAgentBoard />;
    case "sales":
      return <SalesBoard />;
    case "marketing":
      return <MarketingBoard />;
    case "commerce":
      return <CommerceBoard />;
    case "accounting":
      return <AccountingBoard />;
    case "hrms":
      return <HrmsBoard />;
    case "payroll":
      return <PayrollBoard />;
    case "construction":
      return <ConstructionBoard />;
    case "inventory":
      return <InventoryBoard />;
    case "logistics":
      return <LogisticsBoard />;
    case "sports-ai":
      return <SportsAiBoard />;
    case "sports-hub":
      return <SportsHubBoard />;
    case "booking":
      return <BookingBoard />;
    case "queuing":
      return <QueuingBoard />;
    case "rag-engine":
      return <RagBoard />;
    case "nfc-card":
      return <NfcCardBoard />;
    default:
      return <ServiceBoard />;
  }
}

/* 1. Flagship Customer Service CRM Board */
function ServiceBoard() {
  return (
    <div className="space-y-4 font-sans">
      {/* Top softphone banner */}
      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/70 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <PhoneCall className="size-4 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Active Softphone Call: Carlos Mendoza (#4920)</p>
            <p className="text-[0.68rem] text-slate-500">Balance: ₱48,500 · 45 DPD · Supervisor Barge Ready</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-bold text-blue-700">03:42</span>
          <p className="text-[0.62rem] font-bold text-emerald-600">Recording Active</p>
        </div>
      </div>

      {/* monday.com Style Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Account / Debtor</th>
              <th className="p-2.5">Assignee</th>
              <th className="p-2.5">Status</th>
              <th className="p-2.5">PTP Commitment</th>
              <th className="p-2.5">SLA Timeline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Carlos Mendoza (#4920)</td>
              <td className="p-2.5">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-blue-100 text-[0.65rem] font-bold text-blue-700">MT</span>
              </td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">Active Call</span>
              </td>
              <td className="p-2.5 font-mono text-slate-800">₱20,000 via GCash</td>
              <td className="p-2.5">
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700 border border-emerald-200">On Track</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Elena Santos (#4921)</td>
              <td className="p-2.5">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-violet-100 text-[0.65rem] font-bold text-violet-700">AI</span>
              </td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">PTP Logged</span>
              </td>
              <td className="p-2.5 font-mono text-slate-800">₱15,000 (Inst 1/2)</td>
              <td className="p-2.5">
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700 border border-emerald-200">Auto SMS Fired</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Roberto Gomez (#4924)</td>
              <td className="p-2.5">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-100 text-[0.65rem] font-bold text-amber-700">RC</span>
              </td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#fdab3d] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">Hardship Review</span>
              </td>
              <td className="p-2.5 font-mono text-slate-800">25% Waiver Request</td>
              <td className="p-2.5">
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[0.65rem] font-bold text-amber-700 border border-amber-200">Supervisor Queue</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[0.68rem] text-slate-500 pt-1">
        <span>BSP 454/857 Quiet Hours: Active (10PM - 6AM Protected)</span>
        <span>Dual Channel Audio Retention: 7 Years</span>
      </div>
    </div>
  );
}

/* 2. Flagship BITSagent AI Board */
function AiAgentBoard() {
  return (
    <div className="space-y-4 font-sans">
      {/* Real-time Voice Waveform Banner */}
      <div className="rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-purple-50 to-white p-3.5 text-center">
        <div className="flex justify-center items-center gap-1 h-8">
          {[35, 70, 90, 55, 80, 100, 65, 85, 40, 75, 55, 30].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="w-1.5 rounded-full bg-violet-600 animate-pulse"
            />
          ))}
        </div>
        <p className="mt-2 text-xs font-bold text-slate-900">
          &ldquo;I understand Mr. Ramos. We can split your balance into two installments of ₱6,000.&rdquo;
        </p>
        <span className="mt-1 inline-block text-[0.65rem] font-semibold text-violet-700">
          Turn Latency: 284ms · Sentiment: Cooperative (92%) · Zero Script Deviation
        </span>
      </div>

      {/* monday.com Style AI Interaction Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Interaction Type</th>
              <th className="p-2.5">AI Engine</th>
              <th className="p-2.5">Outcome Status</th>
              <th className="p-2.5">RAG Grounding</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Voice Negotiation (#VC-8821)</td>
              <td className="p-2.5 text-violet-700 font-semibold">Sub-300ms Conversational</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Settlement Done</span>
              </td>
              <td className="p-2.5 text-slate-600">Credit Policy v4.2</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Inbound SMS Portal (#SM-4902)</td>
              <td className="p-2.5 text-violet-700 font-semibold">Autonomous Text Agent</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Link Dispatched</span>
              </td>
              <td className="p-2.5 text-slate-600">GCash/Maya Tokenized</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Live Call QA Audit (#QA-1092)</td>
              <td className="p-2.5 text-violet-700 font-semibold">Real-Time Transcription</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#a25ddc] px-2.5 py-1 text-[0.65rem] font-bold text-white">100% Compliant</span>
              </td>
              <td className="p-2.5 text-slate-600">BSP Script Checklist</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 3. Sales CRM Board */
function SalesBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Q3 Enterprise Pipeline Kanban</p>
          <p className="text-[0.68rem] text-slate-500">Weighted Deal Value: ₱14.8M · AI Lead Routing Active</p>
        </div>
        <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          Win Rate: +38%
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Deal Account</th>
              <th className="p-2.5">Stage</th>
              <th className="p-2.5">Value</th>
              <th className="p-2.5">Win Probability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Apex Global BPO (120 Seats)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Proposal / CPQ</span>
              </td>
              <td className="p-2.5 font-mono font-bold text-slate-800">₱4.2M</td>
              <td className="p-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-[75%] rounded-full bg-blue-600" />
                  </div>
                  <span className="font-mono text-[0.65rem] font-bold text-blue-700">75%</span>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Metro Bank Financial</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Closed-Won (3 Yr)</span>
              </td>
              <td className="p-2.5 font-mono font-bold text-slate-800">₱6.8M</td>
              <td className="p-2.5">
                <span className="font-mono text-[0.65rem] font-bold text-emerald-600">100% Contracted</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Pacific Recovery Agency</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#fdab3d] px-2.5 py-1 text-[0.65rem] font-bold text-white">Scoping Audit</span>
              </td>
              <td className="p-2.5 font-mono font-bold text-slate-800">₱3.5M</td>
              <td className="p-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-[60%] rounded-full bg-amber-500" />
                  </div>
                  <span className="font-mono text-[0.65rem] font-bold text-amber-700">60%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 4. Marketing CRM Board */
function MarketingBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Customer Journey Automation</p>
          <p className="text-[0.68rem] text-slate-500">Delinquent 30-DPD Multi-Touch Sequence · NPC DPA Compliant</p>
        </div>
        <span className="rounded-md bg-pink-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          Lift: +4.5x
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Sequence Step</th>
              <th className="p-2.5">Channel</th>
              <th className="p-2.5">Execution Status</th>
              <th className="p-2.5">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">1. Delinquency Trigger</td>
              <td className="p-2.5">Status Webhook</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">1,840 Enrolled</span>
              </td>
              <td className="p-2.5 font-mono text-emerald-600 font-bold">100% Triggered</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">2. Portal Link SMS</td>
              <td className="p-2.5">SMS Gateway</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Dispatched</span>
              </td>
              <td className="p-2.5 font-mono text-blue-600 font-bold">42.1% Click-Through</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">3. AI Voice Escalation</td>
              <td className="p-2.5">BITSagent Voice</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#a25ddc] px-2.5 py-1 text-[0.65rem] font-bold text-white">Conditional (48h)</span>
              </td>
              <td className="p-2.5 font-mono text-violet-600 font-bold">68% Resolution</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 5. Commerce CRM Board */
function CommerceBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Subscription & Usage Billing Core</p>
          <p className="text-[0.68rem] text-slate-500">PCI-DSS Level 1 Ready · Automated Dunning Recovery</p>
        </div>
        <span className="rounded-md bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          99.99% Precision
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Subscription Item</th>
              <th className="p-2.5">Billing Model</th>
              <th className="p-2.5">Payment Status</th>
              <th className="p-2.5">Dunning Recovery</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">100-Seat Contact Core</td>
              <td className="p-2.5">Monthly Retainer</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Auto-Debited</span>
              </td>
              <td className="p-2.5 font-mono text-emerald-600">Zero Default</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">SIP Minutes (42,500 mins)</td>
              <td className="p-2.5">Usage Metered</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Billed on 1st</span>
              </td>
              <td className="p-2.5 font-mono text-blue-600">Auto-Reconciled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 6. BITS Accounting & ERP Board (SAP-Grade Core) */
function AccountingBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-2xs">
            <Landmark className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Enterprise General Ledger & SAP-Grade Financial Cockpit</p>
            <p className="text-[0.68rem] text-slate-500">BIR CAS Certified (RR 9-2009) · Real-Time 3-Way PO Matching · IFRS/GAAP</p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-white animate-pulse" /> 0-Day Close
        </span>
      </div>

      {/* 4 Financial Health KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-2 text-left">
          <span className="text-[0.62rem] font-bold text-slate-500 uppercase tracking-wider block">YTD Revenue</span>
          <span className="font-mono text-xs font-bold text-slate-900">₱142,850,000</span>
          <span className="text-[0.6rem] font-semibold text-emerald-600 block">+14.2% YoY</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-2 text-left">
          <span className="text-[0.62rem] font-bold text-slate-500 uppercase tracking-wider block">EBITDA Margin</span>
          <span className="font-mono text-xs font-bold text-slate-900">31.4%</span>
          <span className="text-[0.6rem] font-semibold text-blue-600 block">GAAP Compliant</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-2 text-left">
          <span className="text-[0.62rem] font-bold text-slate-500 uppercase tracking-wider block">Bank Rec Rate</span>
          <span className="font-mono text-xs font-bold text-slate-900">99.8%</span>
          <span className="text-[0.6rem] font-semibold text-emerald-600 block">Auto-Cleared</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-2 text-left">
          <span className="text-[0.62rem] font-bold text-slate-500 uppercase tracking-wider block">Fiscal Period</span>
          <span className="font-mono text-xs font-bold text-slate-900">P09 / FY2026</span>
          <span className="text-[0.6rem] font-semibold text-amber-600 block">Open for Entries</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Account Code & Description</th>
              <th className="p-2.5">Entity / Cost Center</th>
              <th className="p-2.5">Debit / Credit</th>
              <th className="p-2.5">SAP Document Status</th>
              <th className="p-2.5">Audit Lineage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5">
                <span className="font-mono font-bold text-slate-900">1010-00 Cash & Bank Feeds</span>
                <span className="text-[0.62rem] text-slate-500 block">BDO / BPI Corporate Clearing</span>
              </td>
              <td className="p-2.5 text-slate-700 font-medium">BITS Corp HQ</td>
              <td className="p-2.5 font-mono text-emerald-700 font-bold">DR ₱24,500,000</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">Posted & Cleared</span>
              </td>
              <td className="p-2.5 font-mono text-[0.65rem] text-slate-600">MT940 Live Feed</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5">
                <span className="font-mono font-bold text-slate-900">1200-00 Trade Accounts Receivable</span>
                <span className="text-[0.62rem] text-slate-500 block">Enterprise Client Portfolios</span>
              </td>
              <td className="p-2.5 text-slate-700 font-medium">BITS BPO Ops Inc.</td>
              <td className="p-2.5 font-mono text-blue-700 font-bold">CR ₱18,200,000</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">Auto-Balanced</span>
              </td>
              <td className="p-2.5 font-mono text-[0.65rem] text-slate-600">BITScrm Direct Sync</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5">
                <span className="font-mono font-bold text-slate-900">2010-00 Accounts Payable (PO Clearing)</span>
                <span className="text-[0.62rem] text-slate-500 block">Dell / Supermicro Server Upgrades</span>
              </td>
              <td className="p-2.5 text-slate-700 font-medium">Datacenter Infra</td>
              <td className="p-2.5 font-mono text-amber-700 font-bold">DR ₱4,750,000</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#a25ddc] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">3-Way PO Matched</span>
              </td>
              <td className="p-2.5 font-mono text-[0.65rem] text-slate-600">Inv #PO-8841-A</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5">
                <span className="font-mono font-bold text-slate-900">4010-00 Enterprise Software Revenue</span>
                <span className="text-[0.62rem] text-slate-500 block">ASC 606 / IFRS 15 Recognized</span>
              </td>
              <td className="p-2.5 text-slate-700 font-medium">Consolidated Corp</td>
              <td className="p-2.5 font-mono text-purple-700 font-bold">CR ₱119,900,000</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#579bfc] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs">Audited & Locked</span>
              </td>
              <td className="p-2.5 font-mono text-[0.65rem] text-slate-600">WORM Ledger Hash</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[0.68rem] text-slate-500 pt-1">
        <span>Intercompany Eliminations: Balanced (₱0 Net Variance)</span>
        <span>Daily FX Multi-Currency Revaluation: Auto-Executed</span>
      </div>
    </div>
  );
}

/* 7. BITS HRMS Board */
function HrmsBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">24/7 BPO Multi-Shift Roster</p>
          <p className="text-[0.68rem] text-slate-500">Biometric Facial Clock-In · 94/96 Seats Active Floor Headcount</p>
        </div>
        <span className="rounded-md bg-amber-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          DOLE Aligned
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Shift Window</th>
              <th className="p-2.5">Operations Team</th>
              <th className="p-2.5">Attendance</th>
              <th className="p-2.5">Differential Rules</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Shift A (06:00 - 15:00)</td>
              <td className="p-2.5">Team Alpha (32 Agents)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">100% Present</span>
              </td>
              <td className="p-2.5 text-slate-600">Standard Rate</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Shift C (22:00 - 07:00)</td>
              <td className="p-2.5">Team US-East (24 Agents)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#a25ddc] px-2.5 py-1 text-[0.65rem] font-bold text-white">Night Shift Active</span>
              </td>
              <td className="p-2.5 font-mono text-purple-700 font-bold">+10% Night Diff Auto</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 7. BITS Payroll Board */
function PayrollBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Statutory Tax & Direct Bank Feeds</p>
          <p className="text-[0.68rem] text-slate-500">TRAIN Law Tax Tables · SSS, PhilHealth, Pag-IBIG Auto-Deductions</p>
        </div>
        <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          100% Math Certified
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Batch Name</th>
              <th className="p-2.5">Deduction Rules</th>
              <th className="p-2.5">Disbursement</th>
              <th className="p-2.5">Bank File Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Floor Operations (88 Staff)</td>
              <td className="p-2.5 text-slate-600">SSS + PhilHealth + BIR TRAIN</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Disbursed</span>
              </td>
              <td className="p-2.5 font-mono text-emerald-700 font-bold">BDO Direct Batch Ready</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Supervisors & QA (18 Staff)</td>
              <td className="p-2.5 text-slate-600">13th Month Accrual Reserved</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Approved</span>
              </td>
              <td className="p-2.5 font-mono text-blue-700 font-bold">BPI Direct Batch Ready</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 8. BITS Construction & Project Tracker Board */
function ConstructionBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Project: Skyline Tower Phase 2</p>
          <p className="text-[0.68rem] text-slate-500">Jobsite Milestones & CAD Revisions · Interconnected with Payroll & Inventory</p>
        </div>
        <span className="rounded-md bg-amber-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          68% On Schedule
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Milestone / Work Item</th>
              <th className="p-2.5">Lead Engineer</th>
              <th className="p-2.5">Status</th>
              <th className="p-2.5">System Interconnect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Level 8 HVAC Ducting Inspection</td>
              <td className="p-2.5">Engr. M. Velasco</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Punchlist Passed</span>
              </td>
              <td className="p-2.5 text-blue-700 font-semibold">→ 48 Laborers to BITS Payroll</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Curtain Wall Glass Facade</td>
              <td className="p-2.5">Engr. K. Ramos</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#fdab3d] px-2.5 py-1 text-[0.65rem] font-bold text-white">Working on it</span>
              </td>
              <td className="p-2.5 text-emerald-700 font-semibold">→ 140MT Rebar from Inventory</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 9. BITS Inventory Board */
function InventoryBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Multi-Warehouse Stock Radar</p>
          <p className="text-[0.68rem] text-slate-500">Real-Time RFID Scanning · Automated Par-Level Triggers</p>
        </div>
        <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          99.8% Accuracy
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">SKU & Item Name</th>
              <th className="p-2.5">Warehouse Depot</th>
              <th className="p-2.5">Stock Level</th>
              <th className="p-2.5">Automation Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">MT-RB-32MM (Rebar High-Tensile)</td>
              <td className="p-2.5">Central Hub</td>
              <td className="p-2.5 font-mono text-emerald-700 font-bold">840 Units (Healthy)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Par OK</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">EL-CV-400A (Circuit Breakers)</td>
              <td className="p-2.5">Jobsite Depot B</td>
              <td className="p-2.5 font-mono text-amber-700 font-bold">18 Units (Min: 50)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#fdab3d] px-2.5 py-1 text-[0.65rem] font-bold text-white">Auto-PO Fired</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 10. BITS Logistics Board */
function LogisticsBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Fleet Operations & AI Dispatch</p>
          <p className="text-[0.68rem] text-slate-500">14 Active Routes · Real-Time GPS Tracking & Electronic POD</p>
        </div>
        <span className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          98.2% On-Time
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Vehicle / Fleet #</th>
              <th className="p-2.5">Assigned Driver</th>
              <th className="p-2.5">Route Status</th>
              <th className="p-2.5">ePOD Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Truck #12 (Isuzu Giga 10W)</td>
              <td className="p-2.5">R. Santos</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">ETA 14m (En Route)</span>
              </td>
              <td className="p-2.5 text-emerald-700 font-semibold">Digital Signature Ready</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Van #04 (HiAce Express)</td>
              <td className="p-2.5">K. Dizon</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Delivered</span>
              </td>
              <td className="p-2.5 text-emerald-700 font-semibold">Geotag Lat 14.55 Verified</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 11. BITS AI Sports Scoring Board */
function SportsAiBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Computer Vision Sports Scoring & AI Coach</p>
          <p className="text-[0.68rem] text-slate-500">Video Ingestion from Smartphone or GoPro · Automated Match Analytics</p>
        </div>
        <span className="rounded-md bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          &lt; 90s Turnaround
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Match Footage</th>
              <th className="p-2.5">Calculated Score</th>
              <th className="p-2.5">Peak Smash Speed</th>
              <th className="p-2.5">AI Coach Insight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Men&apos;s Singles Championship</td>
              <td className="p-2.5 font-mono font-bold text-emerald-700">21-18 · 19-21 · 21-16</td>
              <td className="p-2.5 font-mono text-cyan-700 font-bold">312 km/h</td>
              <td className="p-2.5 text-slate-700 font-medium">Timestamp [14:32] Footwork Recovery Drill Linked</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Women&apos;s Doubles Semifinal</td>
              <td className="p-2.5 font-mono font-bold text-emerald-700">21-14 · 21-19</td>
              <td className="p-2.5 font-mono text-cyan-700 font-bold">284 km/h</td>
              <td className="p-2.5 text-slate-700 font-medium">8 Highlight Reels Auto-Clipped</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 13. BITS Sports Arena & Venue Hub Board */
function SportsHubBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Sports Venue Operations & Live Court Queuing Hub</p>
          <p className="text-[0.68rem] text-slate-500">Overhead TV Court Display Screen · Tournament Elo Ladders</p>
        </div>
        <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono flex items-center gap-1">
          <Tv className="size-3" /> TV Display Live
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Court / Sport</th>
              <th className="p-2.5">Scheduled Players</th>
              <th className="p-2.5">Current Match State</th>
              <th className="p-2.5">Queue Assignment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Court 1 (Badminton)</td>
              <td className="p-2.5">Metro Spikers</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Match On (18m left)</span>
              </td>
              <td className="p-2.5 text-slate-600">Game 2 (14 - 11)</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Court 2 (Pickleball)</td>
              <td className="p-2.5">Net Raiders vs Smashers</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Calling Players</span>
              </td>
              <td className="p-2.5 text-blue-700 font-semibold">DUPR Rating: 1,420</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 13. BITS Booking System Board */
function BookingBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Multi-Industry Reservation Engine</p>
          <p className="text-[0.68rem] text-slate-500">Hotels, Sports Courts & Consulting · Real-Time Availability</p>
        </div>
        <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          +42% Direct Bookings
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Booking Folio</th>
              <th className="p-2.5">Resource / Room</th>
              <th className="p-2.5">Reservation State</th>
              <th className="p-2.5">Deposit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">#BK-9021 (Dr. Karen Cruz)</td>
              <td className="p-2.5">Executive Suite 402</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Confirmed</span>
              </td>
              <td className="p-2.5 font-mono text-emerald-700 font-bold">₱2,500 Tokenized Escrow</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">#BK-9022 (A. Reyes)</td>
              <td className="p-2.5">Tennis Court A (2h)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">QR Pass Sent</span>
              </td>
              <td className="p-2.5 font-mono text-blue-700 font-bold">Instant WhatsApp Voucher</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 14. BITS Smart Queuing Board */
function QueuingBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Digital Queuing & Overhead TV Floor Dispatch</p>
          <p className="text-[0.68rem] text-slate-500">Mobile QR Virtual Passes · Retail, Clinics & Arenas</p>
        </div>
        <span className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          -52% Wait Time
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Virtual Ticket</th>
              <th className="p-2.5">Service Type</th>
              <th className="p-2.5">Queue Status</th>
              <th className="p-2.5">Assigned Counter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">TICKET #A-042</td>
              <td className="p-2.5">Collections Consultation</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#0073ea] px-2.5 py-1 text-[0.65rem] font-bold text-white">Now Serving</span>
              </td>
              <td className="p-2.5 font-mono text-blue-700 font-bold">Proceed to Counter 3</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">TICKET #A-043</td>
              <td className="p-2.5">Account Settlement</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#fdab3d] px-2.5 py-1 text-[0.65rem] font-bold text-white">Next in Line (~3m)</span>
              </td>
              <td className="p-2.5 font-mono text-amber-700 font-bold">SMS Alert Paged</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 15. BITS RAG Knowledge Engine Board */
function RagBoard() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Universal Enterprise RAG Knowledge Layer</p>
          <p className="text-[0.68rem] text-slate-500">148,200 Vector Embeddings · Zero Hallucination Policy Grounding</p>
        </div>
        <span className="rounded-md bg-violet-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
          99.4% Factual
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Source Repository</th>
              <th className="p-2.5">Document Scope</th>
              <th className="p-2.5">Indexing Status</th>
              <th className="p-2.5">Retrieval Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">BSP Circular 454/857 Manual</td>
              <td className="p-2.5 text-slate-600">Statutory Rules PDF (v4.2)</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#00c875] px-2.5 py-1 text-[0.65rem] font-bold text-white">Grounded</span>
              </td>
              <td className="p-2.5 font-mono text-emerald-700 font-bold">118ms (Cosine 0.94)</td>
            </tr>
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="p-2.5 font-bold text-slate-900">Enterprise SQL & ERP Lake</td>
              <td className="p-2.5 text-slate-600">Product & Inventory Catalog</td>
              <td className="p-2.5">
                <span className="rounded-md bg-[#a25ddc] px-2.5 py-1 text-[0.65rem] font-bold text-white">Real-Time CDC</span>
              </td>
              <td className="p-2.5 font-mono text-purple-700 font-bold">142ms Hybrid Search</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 16. BITS Smart NFC Business & Identity Card Board */
function NfcCardBoard() {
  const [activeTab, setActiveTab] = React.useState<"simulator" | "multipurpose" | "security">("simulator");
  const [isLocked, setIsLocked] = React.useState(false);
  const [tapped, setTapped] = React.useState(false);

  const handleSimulateTap = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 2000);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Value Banner: 1 Card for Life & Zero App Required */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-200 bg-cyan-50/70 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-600 text-white shadow-2xs">
            <Radio className="size-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-slate-900">
                BITS Tap™ Contactless Smart NFC Architecture
              </p>
              <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[0.62rem] font-extrabold text-emerald-800 uppercase">
                1 Card for Life
              </span>
            </div>
            <p className="text-[0.68rem] text-slate-600">
              Zero recipient app required · Works natively on 99% of iOS &amp; Android devices
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex rounded-lg border border-cyan-200 bg-white p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("simulator")}
            className={cn(
              "cursor-pointer rounded-md px-2.5 py-1 text-[0.68rem] font-bold transition-all",
              activeTab === "simulator"
                ? "bg-cyan-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Tap Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("multipurpose")}
            className={cn(
              "cursor-pointer rounded-md px-2.5 py-1 text-[0.68rem] font-bold transition-all",
              activeTab === "multipurpose"
                ? "bg-cyan-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Multipurpose Embeds
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={cn(
              "cursor-pointer rounded-md px-2.5 py-1 text-[0.68rem] font-bold transition-all",
              activeTab === "security"
                ? "bg-cyan-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Security &amp; Remote Lock
          </button>
        </div>
      </div>

      {/* Tab 1: Physical Card & Live Phone Simulator */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left: Physical Smart Card Mockup */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 text-white shadow-md">
            <div>
              {/* Card Header with Contactless Symbol & Brand */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-cyan-400 backdrop-blur-xs border border-white/10">
                    <Radio className="size-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.72rem] font-extrabold tracking-widest text-white">
                      BITS<span className="text-cyan-400">TAP</span>
                    </span>
                    <span className="block text-[0.55rem] tracking-wider text-slate-400 uppercase font-mono">
                      Encrypted Smart NFC
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[0.62rem] font-bold">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      isLocked ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                    )}
                  />
                  <span className={isLocked ? "text-amber-300" : "text-emerald-300"}>
                    {isLocked ? "Card Frozen" : "Ready to Tap"}
                  </span>
                </div>
              </div>

              {/* NFC Chip Graphic */}
              <div className="mt-8 flex items-center gap-3">
                <div className="size-9 rounded-md border border-amber-400/40 bg-gradient-to-br from-amber-300/20 to-amber-600/30 p-1">
                  <div className="h-full w-full rounded-xs border border-amber-400/30 grid grid-cols-2 gap-0.5 p-0.5">
                    <span className="bg-amber-400/30 rounded-2xs" />
                    <span className="bg-amber-400/30 rounded-2xs" />
                    <span className="bg-amber-400/30 rounded-2xs" />
                    <span className="bg-amber-400/30 rounded-2xs" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[0.65rem] font-mono">
                  <span>((( · )))</span>
                  <span>Contactless Proximity</span>
                </div>
              </div>

              {/* Cardholder Information */}
              <div className="mt-6">
                <h4 className="text-base font-bold tracking-tight text-white">
                  Alexander Vance
                </h4>
                <p className="text-[0.72rem] font-medium text-cyan-300">
                  VP of Enterprise Architecture &amp; Partnerships
                </p>
                <p className="text-[0.65rem] text-slate-400">
                  Boundless IT Solutions (BITS)
                </p>
              </div>
            </div>

            {/* Card Footer: Material Badge & Interactive Tap Button */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[0.6rem] text-slate-400 uppercase tracking-wider">
                Titanium Brushed Metal · ID: #BITS-8821
              </span>
              <button
                type="button"
                onClick={handleSimulateTap}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                  tapped
                    ? "bg-emerald-500 text-white shadow-md scale-95"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm"
                )}
              >
                {tapped ? "✓ Tapped Phone!" : "Simulate Tap"}
              </button>
            </div>
          </div>

          {/* Right: Instant Smartphone Digital Profile Preview */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="size-4 text-cyan-600" />
                <span className="text-xs font-bold text-slate-800">
                  Recipient Smartphone View (No App Needed)
                </span>
              </div>
              <span className="rounded bg-emerald-50 text-emerald-700 font-mono text-[0.62rem] font-bold px-1.5 py-0.5 border border-emerald-200">
                Instant Safari / Chrome Sheet
              </span>
            </div>

            {/* Mobile Sheet Content */}
            <div className="mt-3 space-y-3">
              {/* Profile Card Header */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
                <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold text-sm shadow-2xs">
                  AV
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      Alexander Vance
                    </p>
                    <CheckCircle2 className="size-3.5 text-blue-600 shrink-0" />
                  </div>
                  <p className="text-[0.68rem] text-slate-500 truncate">
                    Boundless IT Solutions · Enterprise Lead
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[0.6rem] font-bold text-blue-700">
                  Verified
                </span>
              </div>

              {/* Primary 1-Tap Action: Save to Contacts */}
              <button
                type="button"
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
              >
                <Check className="size-3.5" />
                <span>Save Contact to Phone (.vCard)</span>
              </button>

              {/* Embedded Quick Links */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 hover:border-blue-300 transition-colors">
                  <Globe className="size-3.5 text-blue-600 shrink-0" />
                  <div className="truncate">
                    <p className="font-bold text-slate-900 text-[0.7rem] truncate">Company Website</p>
                    <p className="text-[0.62rem] text-slate-500 truncate">bits-solutions.ph</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 hover:border-blue-300 transition-colors">
                  <CalendarCheck className="size-3.5 text-indigo-600 shrink-0" />
                  <div className="truncate">
                    <p className="font-bold text-slate-900 text-[0.7rem] truncate">Book Strategy Call</p>
                    <p className="text-[0.62rem] text-slate-500 truncate">15-min Meeting</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 hover:border-blue-300 transition-colors">
                  <Share2 className="size-3.5 text-sky-600 shrink-0" />
                  <div className="truncate">
                    <p className="font-bold text-slate-900 text-[0.7rem] truncate">LinkedIn &amp; Socials</p>
                    <p className="text-[0.62rem] text-slate-500 truncate">@alexandervance</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 hover:border-blue-300 transition-colors">
                  <CreditCard className="size-3.5 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <p className="font-bold text-slate-900 text-[0.7rem] truncate">GCash / Maya / Bank</p>
                    <p className="text-[0.62rem] text-slate-500 truncate">Tap to Send Payment</p>
                  </div>
                </div>
              </div>

              {/* Lead Exchange Mini-Form */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] font-bold text-slate-800">
                    Direct Lead Capture Box
                  </span>
                  <span className="text-[0.6rem] font-mono text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                    Syncs to BITScrm
                  </span>
                </div>
                <p className="mt-1 text-[0.65rem] text-slate-600">
                  Recipients can send back their details with 1 tap—automatically populating your BITScrm pipeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Multipurpose Embed Showcase */}
      {activeTab === "multipurpose" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              One Smart Card Embeds Your Entire Digital Footprint
            </h4>
            <p className="mt-0.5 text-[0.7rem] text-slate-600">
              Businesses and individuals can embed any link, media, payment method, or operational workflow with instant zero-reprint dynamic updates.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2 text-blue-600">
                <Users className="size-4" />
                <span className="text-xs font-bold text-slate-900">Complete Contact Info</span>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                Full name, direct mobile, office lines, WhatsApp, email, physical office address, and downloadable .vCard that saves directly to Apple Contacts or Google Contacts with 1 tap.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">.vCard</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">WhatsApp</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Direct Call</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2 text-indigo-600">
                <Globe className="size-4" />
                <span className="text-xs font-bold text-slate-900">Websites &amp; Portfolios</span>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                Embed your company website, Behance / Dribbble portfolio, GitHub repositories, Google Drive pitch decks, product catalogs, and custom landing page links.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Pitch Decks</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Catalog PDF</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Portfolio</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2 text-pink-600">
                <Share2 className="size-4" />
                <span className="text-xs font-bold text-slate-900">All Social Media Hub</span>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                Consolidate your entire social reach: LinkedIn, Instagram, X (Twitter), YouTube, Facebook, TikTok, and Telegram into one curated, brand-aligned tap page.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">LinkedIn</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Instagram</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">YouTube</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2 text-cyan-600">
                <CalendarCheck className="size-4" />
                <span className="text-xs font-bold text-slate-900">Meeting &amp; Calendar Booking</span>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                Eliminate email back-and-forth at conferences. Connect Google Meet, Calendly, or BITS Booking engine so clients can book consultations instantly.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Calendly</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Google Meet</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">BITS Booking</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2 text-emerald-600">
                <CreditCard className="size-4" />
                <span className="text-xs font-bold text-slate-900">Payments &amp; Banking</span>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                Accept client deposits and invoices on the fly. Embed GCash QR, Maya, PayPal, Stripe payment links, or Philippine bank account numbers (BDO/BPI/UBP).
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">GCash / Maya</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Stripe / PayPal</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Bank Details</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2 text-amber-600">
                <Sparkles className="size-4" />
                <span className="text-xs font-bold text-slate-900">Lead Capture &amp; Reviews</span>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                Equip your sales reps with digital lead capture that pipes leads into BITScrm in real time. Also embed Google Reviews links to boost venue or retail ratings.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">BITScrm Lead Sync</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Google Reviews</span>
                <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-700">Wi-Fi Share</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Remote Lock Dashboard */}
      {activeTab === "security" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Enterprise Security &amp; Instant Remote Lock
                </h4>
              </div>
              <p className="mt-0.5 text-[0.7rem] text-slate-600">
                Unlike paper business cards that anyone can exploit or lose, BITS Smart NFC Cards give you total cloud control over your identity.
              </p>
            </div>

            {/* Interactive Remote Freeze Switch */}
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-[0.68rem] font-bold text-slate-700">
                Remote Card Lock:
              </span>
              <button
                type="button"
                onClick={() => setIsLocked(!isLocked)}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider transition-all",
                  isLocked
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "bg-emerald-600 text-white shadow-2xs"
                )}
              >
                {isLocked ? "Frozen (Locked)" : "Active (Tap On)"}
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <span className="text-[0.65rem] font-mono font-bold text-blue-600 uppercase">
                Hardware Protection
              </span>
              <p className="mt-1 text-xs font-bold text-slate-900">
                NTAG 424 DNA Cryptographic Chip
              </p>
              <p className="mt-1 text-[0.65rem] text-slate-600">
                AES-128 cryptographic challenge-response authentication. Zero static PII stored on physical chip.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <span className="text-[0.65rem] font-mono font-bold text-emerald-600 uppercase">
                Instant Cloud Kill-Switch
              </span>
              <p className="mt-1 text-xs font-bold text-slate-900">
                1-Click Remote Deactivation
              </p>
              <p className="mt-1 text-[0.65rem] text-slate-600">
                Card misplaced or stolen? Freeze it instantly from your mobile portal so no unauthorized person can read your profile.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <span className="text-[0.65rem] font-mono font-bold text-indigo-600 uppercase">
                Field-Level Privacy
              </span>
              <p className="mt-1 text-xs font-bold text-slate-900">
                PIN-Protected Sensitive Data
              </p>
              <p className="mt-1 text-[0.65rem] text-slate-600">
                Lock confidential pitch decks, executive mobile numbers, or banking details behind a 4-digit PIN access code.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
              <span className="text-[0.65rem] font-mono font-bold text-purple-600 uppercase">
                Real-Time Telemetry
              </span>
              <p className="mt-1 text-xs font-bold text-slate-900">
                Live Tap Analytics &amp; Geo-Log
              </p>
              <p className="mt-1 text-[0.65rem] text-slate-600">
                See exact date, time, and engagement metrics every time your card is tapped at client meetings or expos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
