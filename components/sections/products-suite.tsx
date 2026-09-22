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
  Palette,
  Play,
  Pause,
  Send,
  FileCheck,
  RefreshCw,
  ExternalLink,
  Eye,
} from "lucide-react";

const categoryFilters = [
  { id: "all", label: "All Products (18)", count: 18, color: "blue" },
  { id: "flagship", label: "Core Flagships", count: 2, color: "indigo" },
  { id: "crm", label: "CRM Variants", count: 4, color: "emerald" },
  { id: "operations", label: "ERP, Finance & Operations", count: 6, color: "amber" },
  { id: "sports", label: "Sports, Booking & Queuing", count: 4, color: "rose" },
  { id: "identity", label: "Smart NFC & Identity", count: 1, color: "cyan" },
  { id: "ai", label: "AI & Knowledge", count: 2, color: "purple" },
  { id: "whitelabel", label: "White Label", count: 1, color: "orange" },
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
      case "white-label":
        return Palette;
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
      case "white-label":
        return "from-orange-500 to-amber-600 text-orange-700 bg-orange-50 border-orange-200";
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
export function ProductMockupBoard({ productId }: { productId: string }) {
  const [filter, setFilter] = React.useState<"all" | "active" | "resolved">("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="relative font-sans">
      {/* Real-Time Floating Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-12 left-1/2 z-50 flex w-[94%] -translate-x-1/2 items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-900/95 px-3.5 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-2"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
          <p className="flex-1 font-medium leading-tight">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}

      {/* Interactive Board Switcher */}
      {(() => {
        switch (productId) {
          case "service":
            return <ServiceBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "ai-agent":
            return <AiAgentBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "sales":
            return <SalesBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "marketing":
            return <MarketingBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "commerce":
            return <CommerceBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "accounting":
            return <AccountingBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "hrms":
            return <HrmsBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "payroll":
            return <PayrollBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "construction":
            return <ConstructionBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "inventory":
            return <InventoryBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "logistics":
            return <LogisticsBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "sports-ai":
            return <SportsAiBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "sports-hub":
            return <SportsHubBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "booking":
            return <BookingBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "queuing":
            return <QueuingBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "rag-engine":
            return <RagBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
          case "nfc-card":
            return <NfcCardBoard onAction={triggerToast} />;
          case "white-label":
            return <WhiteLabelBoard onAction={triggerToast} />;
          default:
            return <ServiceBoard onAction={triggerToast} filter={filter} setFilter={setFilter} />;
        }
      })()}
    </div>
  );
}

/* ── 1. Flagship Customer Service CRM Board ── */
function ServiceBoard({
  onAction,
  filter,
  setFilter,
}: {
  onAction: (msg: string) => void;
  filter: "all" | "active" | "resolved";
  setFilter: (f: "all" | "active" | "resolved") => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      id: "4920",
      account: "Carlos Mendoza (#4920)",
      assignee: "MT",
      assigneeBg: "bg-blue-100 text-blue-700",
      status: "Active Call",
      statusColor: "bg-[#0073ea]",
      balance: "₱48,500",
      commitment: "₱20,000 via GCash",
      sla: "On Track",
      slaColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      type: "active",
      action: "Send GCash QR Link",
      actionToast: "Dispatched tokenized GCash QR to Carlos Mendoza (₱20,000 PTP).",
      detail: "45 DPD · Softphone connected (03:42) · Debtor committed to 50% downpayment.",
    },
    {
      id: "4921",
      account: "Elena Santos (#4921)",
      assignee: "AI",
      assigneeBg: "bg-violet-100 text-violet-700",
      status: "PTP Logged",
      statusColor: "bg-[#00c875]",
      balance: "₱32,000",
      commitment: "₱15,000 (Inst 1/2)",
      sla: "Auto SMS Fired",
      slaColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      type: "resolved",
      action: "Re-verify Maya Receipt",
      actionToast: "Maya transaction webhook verified: ₱15,000 credited to account #4921.",
      detail: "Automated SMS sent at 14:02. Payment confirmed by Maya merchant webhook.",
    },
    {
      id: "4924",
      account: "Roberto Gomez (#4924)",
      assignee: "RC",
      assigneeBg: "bg-amber-100 text-amber-700",
      status: "Hardship Review",
      statusColor: "bg-[#fdab3d]",
      balance: "₱78,000",
      commitment: "25% Waiver Request",
      sla: "Supervisor Queue",
      slaColor: "bg-amber-50 text-amber-700 border-amber-200",
      type: "active",
      action: "Approve 25% Restructure",
      actionToast: "Restructure waiver approved by supervisor floor desk for Roberto Gomez.",
      detail: "90 DPD · Medical hardship documented. Collector requested supervisor discount approval.",
    },
  ];

  const displayedRows = filter === "all" ? rows : rows.filter((r) => r.type === filter);
  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      {/* Concrete Customer ROI & Value Callout */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white p-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-800">
            <strong>Customer Outcome:</strong> Cuts debtor broken-PTP rate by 42% via automated payment SMS &amp; real-time whisper supervision.
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-extrabold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-200 shadow-2xs">
          +₱2.8M Monthly Recovered
        </span>
      </div>

      {/* Top softphone banner with interactive buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <PhoneCall className="size-4 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Active Softphone Call: {activeRecord.account}</p>
            <p className="text-[0.68rem] text-slate-500">Balance: {activeRecord.balance} · Supervisor Whisper Active</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAction("Supervisor initiated private whisper coaching to agent MT.")}
            className="rounded-lg bg-white border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors shadow-2xs min-h-[44px] inline-flex items-center justify-center"
          >
            🎙️ Whisper Coach
          </button>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs min-h-[44px] inline-flex items-center justify-center"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <div className="flex gap-1">
          {(["all", "active", "resolved"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-2 text-[0.68rem] font-bold capitalize transition-all min-h-[44px] inline-flex items-center justify-center",
                filter === f
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {f === "all" ? "All Accounts" : f === "active" ? "Active In-Flight" : "Resolved PTP"}
            </button>
          ))}
        </div>
        <span className="text-[0.65rem] text-slate-500">Click any row to inspect</span>
      </div>

      {/* monday.com Style Table with Clickable Rows */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {displayedRows.map((row, idx) => {
              const isSelected = rows[selectedRow]?.id === row.id;
              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRow(rows.findIndex((r) => r.id === row.id))}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected
                      ? "bg-blue-50/80 font-medium"
                      : "hover:bg-slate-50/70"
                  )}
                >
                  <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    {isSelected && <span className="size-1.5 rounded-full bg-blue-600" />}
                    {row.account}
                  </td>
                  <td className="p-2.5">
                    <span className={cn("inline-flex size-6 items-center justify-center rounded-full text-[0.65rem] font-bold", row.assigneeBg)}>
                      {row.assignee}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-slate-800">{row.commitment}</td>
                  <td className="p-2.5">
                    <span className={cn("rounded px-2 py-0.5 text-[0.65rem] font-bold border", row.slaColor)}>
                      {row.sla}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Row Operational Inspector */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-blue-700 uppercase">Selected Debtor Context:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onAction(`PTP schedule of ${activeRecord.commitment} logged to sovereign vault audit ledger.`)}
            className="rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs min-h-[44px] inline-flex items-center justify-center"
          >
            Audit Record
          </button>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-2xs min-h-[44px] inline-flex items-center justify-center"
          >
            Execute Action
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[0.68rem] text-slate-500 pt-1">
        <span>BSP 454/857 Quiet Hours: Active (10PM - 6AM Protected)</span>
        <span>Dual Channel Audio Retention: 7 Years</span>
      </div>
    </div>
  );
}

/* ── 2. Flagship BITSagent AI Board ── */
function AiAgentBoard({
  onAction,
  filter,
  setFilter,
}: {
  onAction: (msg: string) => void;
  filter: "all" | "active" | "resolved";
  setFilter: (f: "all" | "active" | "resolved") => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      id: "VC-8821",
      type: "Voice Negotiation (#VC-8821)",
      engine: "Sub-300ms Conversational",
      status: "Settlement Done",
      statusColor: "bg-[#00c875]",
      grounding: "Credit Policy v4.2",
      action: "Play Audio Recording",
      actionToast: "Replaying synchronized dual-channel audio for #VC-8821 (Mr. Ramos).",
      detail: "Debtor agreed to two installments of ₱6,000. Sentiment: 94% Cooperative.",
    },
    {
      id: "SM-4902",
      type: "Inbound SMS Portal (#SM-4902)",
      engine: "Autonomous Text Agent",
      status: "Link Dispatched",
      statusColor: "bg-[#0073ea]",
      grounding: "GCash/Maya Tokenized",
      action: "Test Inbound Webhook",
      actionToast: "Simulated incoming SMS keyword 'PAYNOW' - instant response returned in 180ms.",
      detail: "Direct payment link generated with single-use checkout token.",
    },
    {
      id: "QA-1092",
      type: "Live Call QA Audit (#QA-1092)",
      engine: "Real-Time Transcription",
      status: "100% Compliant",
      statusColor: "bg-[#a25ddc]",
      grounding: "BSP Script Checklist",
      action: "Export QA Scorecard",
      actionToast: "Automated QA scorecard exported with zero profanity and 100% script adherence.",
      detail: "Continuous audio analysis scored 98.4/100 across standard debt recovery metrics.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      {/* Customer ROI Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50/90 via-purple-50/50 to-white p-3 text-xs">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-violet-600 shrink-0" />
          <span className="font-semibold text-slate-800">
            <strong>Customer Outcome:</strong> Reduces cost-per-contact from ₱85 to ₱2.20 while handling 24/7 call surges with sub-300ms turn latency.
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-extrabold text-violet-700 bg-white px-2.5 py-1 rounded-full border border-violet-200 shadow-2xs">
          -82% Operating Expense
        </span>
      </div>

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
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-block text-[0.65rem] font-semibold text-violet-700 bg-white/80 px-2 py-0.5 rounded-full border border-violet-200">
            Turn Latency: 284ms · Sentiment: Cooperative (92%) · Zero Hallucination
          </span>
          <button
            type="button"
            onClick={() => onAction("Simulated AI voice turn triggered: 'Next payment scheduled for March 15 via GCash.'")}
            className="rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-violet-700 transition-colors shadow-2xs min-h-[44px] inline-flex items-center justify-center"
          >
            ⚡ Test Voice Turn
          </button>
        </div>
      </div>

      {/* Interactive AI Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-violet-50/70 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-violet-600" />}
                  {row.type}
                </td>
                <td className="p-2.5 text-violet-700 font-semibold">{row.engine}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 text-slate-600">{row.grounding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspector Box */}
      <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-violet-700 uppercase">Live Interaction Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-violet-700 transition-colors shadow-2xs min-h-[44px] inline-flex items-center justify-center"
        >
          {activeRecord.action}
        </button>
      </div>
    </div>
  );
}

/* ── 3. Sales CRM Board ── */
function SalesBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      id: "1",
      name: "Apex Global BPO (120 Seats)",
      stage: "Proposal / CPQ",
      stageColor: "bg-[#0073ea]",
      value: "₱4.2M",
      prob: "75%",
      probWidth: "w-[75%]",
      probColor: "bg-blue-600 text-blue-700",
      action: "Advance to Closed-Won",
      actionToast: "Advanced Apex Global BPO to Closed-Won! 3-year contract provisioned.",
      detail: "Proposal generated via BITS CPQ engine with custom multi-tenant SLA.",
    },
    {
      id: "2",
      name: "Metro Bank Financial",
      stage: "Closed-Won (3 Yr)",
      stageColor: "bg-[#00c875]",
      value: "₱6.8M",
      prob: "100%",
      probWidth: "w-[100%]",
      probColor: "bg-emerald-500 text-emerald-700",
      action: "Export Signed Contract",
      actionToast: "Exported digitally executed SLA and master contract for Metro Bank.",
      detail: "100% contracted. Sovereign on-premises hardware installation scheduled.",
    },
    {
      id: "3",
      name: "Pacific Recovery Agency",
      stage: "Scoping Audit",
      stageColor: "bg-[#fdab3d]",
      value: "₱3.5M",
      prob: "60%",
      probWidth: "w-[60%]",
      probColor: "bg-amber-500 text-amber-700",
      action: "Send Scoping Document",
      actionToast: "Technical scoping audit report dispatched to Pacific Recovery leadership.",
      detail: "Evaluating 60-agent dialer migration from legacy on-prem PBX.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      {/* Customer Outcome ROI Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-white p-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-emerald-600 shrink-0" />
          <span className="font-semibold text-slate-800">
            <strong>Customer Outcome:</strong> Accelerates deal velocity by 38% with automated CPQ proposals, two-way sync, and AI win-probability territory routing.
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
          +₱14.8M Pipeline Accelerated
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Q3 Enterprise Pipeline Kanban</p>
          <p className="text-[0.68rem] text-slate-500">Weighted Deal Value: ₱14.8M · AI Lead Routing Active</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            Win Rate: +38%
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-emerald-300 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer"
          >
            {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-emerald-50/70 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-emerald-600" />}
                  {row.name}
                </td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.stageColor)}>
                    {row.stage}
                  </span>
                </td>
                <td className="p-2.5 font-mono font-bold text-slate-800">{row.value}</td>
                <td className="p-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                      <div className={cn("h-full rounded-full", row.probWidth, row.probColor.split(" ")[0])} />
                    </div>
                    <span className={cn("font-mono text-[0.65rem] font-bold", row.probColor.split(" ")[1])}>{row.prob}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-emerald-700 uppercase">Deal Intel &amp; Next Action:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer"
        >
          Execute Stage Transition
        </button>
      </div>
    </div>
  );
}

/* ── 4. Marketing CRM Board ── */
function MarketingBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      step: "1. Delinquency Trigger",
      channel: "Status Webhook",
      status: "1,840 Enrolled",
      statusColor: "bg-[#00c875]",
      perf: "100% Triggered",
      perfColor: "text-emerald-600",
      action: "Test Webhook Ingestion",
      actionToast: "Tested webhook ingestion: 42 new accounts successfully enrolled in journey.",
      detail: "Trigger fires instantly when ERP logs accounts exceeding 30 DPD.",
    },
    {
      step: "2. Portal Link SMS",
      channel: "SMS Gateway",
      status: "Dispatched",
      statusColor: "bg-[#0073ea]",
      perf: "42.1% Click-Through",
      perfColor: "text-blue-600",
      action: "Send Blast Preview",
      actionToast: "Dispatched preview SMS to admin test device (+63 917 *** 0000).",
      detail: "Personalized short links with 1-click GCash/Maya settlement payment portal.",
    },
    {
      step: "3. AI Voice Escalation",
      channel: "BITSagent Voice",
      status: "Conditional (48h)",
      statusColor: "bg-[#a25ddc]",
      perf: "68% Resolution",
      perfColor: "text-violet-600",
      action: "Simulate 48h Escalation",
      actionToast: "Simulated escalation: 120 unresponsive accounts routed to BITSagent auto-dial queue.",
      detail: "Fires only if debtor does not click link within 48 hours of initial SMS delivery.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      {/* Customer Outcome ROI Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50/90 via-rose-50/50 to-white p-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-pink-600 shrink-0" />
          <span className="font-semibold text-slate-800">
            <strong>Customer Outcome:</strong> Boosts multichannel engagement by 4.5x with automated SMS/email customer journeys while ensuring 100% NPC RA 10173 consent compliance.
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-extrabold text-pink-700 bg-white px-2.5 py-1 rounded-full border border-pink-200 shadow-2xs">
          42.1% SMS Click-Through
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-pink-200 bg-pink-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Customer Journey Automation</p>
          <p className="text-[0.68rem] text-slate-500">Delinquent 30-DPD Multi-Touch Sequence · NPC DPA Compliant</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-pink-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            Lift: +4.5x
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-pink-300 px-3 py-2 text-xs font-bold text-pink-700 hover:bg-pink-100 shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer"
          >
            {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.step}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-pink-50/70 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-pink-600" />}
                  {row.step}
                </td>
                <td className="p-2.5 text-slate-700">{row.channel}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className={cn("p-2.5 font-mono font-bold", row.perfColor)}>{row.perf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-pink-100 bg-pink-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-pink-700 uppercase">Workflow Trigger Details:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-pink-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-pink-700 shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer"
        >
          Run Trigger
        </button>
      </div>
    </div>
  );
}

/* ── 5. Commerce CRM Board ── */
function CommerceBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      item: "100-Seat Contact Core",
      model: "Monthly Retainer",
      status: "Auto-Debited",
      statusColor: "bg-[#00c875]",
      recovery: "Zero Default",
      action: "Simulate Auto-Debit",
      actionToast: "Simulated auto-debit: ₱350,000 processed via corporate card token.",
      detail: "Enterprise retainer cleared on 1st of every month. Next cycle: Oct 1.",
    },
    {
      item: "SIP Minutes (42,500 mins)",
      model: "Usage Metered",
      status: "Billed on 1st",
      statusColor: "bg-[#0073ea]",
      recovery: "Auto-Reconciled",
      action: "Reconcile Telephony CDRs",
      actionToast: "Reconciled 42,500 SIP call detail records against billing ledger.",
      detail: "Usage metered in real-time from SBC softswitch with sub-second accuracy.",
    },
    {
      item: "Dedicated Cloud Bridge",
      model: "Annual Enterprise",
      status: "Paid (₱180,000)",
      statusColor: "bg-[#a25ddc]",
      recovery: "Contract Bound",
      action: "Issue BIR Tax Invoice",
      actionToast: "Generated BIR CAS-compliant E-Invoice with official electronic stamp.",
      detail: "12-month dedicated VPN bridge with 99.99% uptime SLA.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      {/* Customer Outcome ROI Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-200 bg-gradient-to-r from-cyan-50/90 via-sky-50/50 to-white p-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-cyan-600 shrink-0" />
          <span className="font-semibold text-slate-800">
            <strong>Customer Outcome:</strong> Recovers 9.2% monthly recurring revenue otherwise lost to card failures through smart automated dunning and BIR CAS e-invoicing.
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-extrabold text-cyan-700 bg-white px-2.5 py-1 rounded-full border border-cyan-200 shadow-2xs">
          99.99% Billing Precision
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-200 bg-cyan-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Subscription &amp; Usage Billing Core</p>
          <p className="text-[0.68rem] text-slate-500">PCI-DSS Level 1 Ready · Automated Dunning Recovery</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            99.99% Precision
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-cyan-300 px-3 py-2 text-xs font-bold text-cyan-800 hover:bg-cyan-100 shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer"
          >
            {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.item}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-cyan-50/70 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-cyan-600" />}
                  {row.item}
                </td>
                <td className="p-2.5 text-slate-600">{row.model}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-cyan-800 font-bold">{row.recovery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-cyan-700 uppercase">Billing Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-cyan-700 shadow-2xs min-h-[44px] inline-flex items-center justify-center cursor-pointer"
        >
          Execute Billing Action
        </button>
      </div>
    </div>
  );
}

/* ── 6. BITS Accounting & ERP Board (SAP-Grade Core) ── */
function AccountingBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      code: "1010-00 Cash & Bank Feeds",
      desc: "BDO / BPI Corporate Clearing",
      entity: "BITS Corp HQ",
      debit: "DR ₱24,500,000",
      status: "Posted & Cleared",
      statusColor: "bg-[#00c875]",
      lineage: "MT940 Live Feed",
      action: "Reconcile MT940 Feed",
      actionToast: "Reconciled MT940 daily statement: ₱24,500,000 cleared across BDO and BPI accounts.",
      detail: "Live automated bank synchronization with 0 variance against cash ledger.",
    },
    {
      code: "1200-00 Trade Accounts Receivable",
      desc: "Enterprise Client Portfolios",
      entity: "BITS BPO Ops Inc.",
      debit: "CR ₱18,200,000",
      status: "Auto-Balanced",
      statusColor: "bg-[#0073ea]",
      lineage: "BITScrm Direct Sync",
      action: "Sync Receivables Ledger",
      actionToast: "Synchronized 1,420 debtor settlement commitments directly to General Ledger.",
      detail: "Direct bidirectional sync with collections CRM engine.",
    },
    {
      code: "2010-00 Accounts Payable (PO Clearing)",
      desc: "Dell / Supermicro Server Upgrades",
      entity: "Datacenter Infra",
      debit: "DR ₱4,750,000",
      status: "3-Way PO Matched",
      statusColor: "bg-[#a25ddc]",
      lineage: "Inv #PO-8841-A",
      action: "Approve 3-Way Match",
      actionToast: "3-Way PO Match approved: Purchase Order, Delivery Receipt, and Invoice reconciled.",
      detail: "Zero price discrepancy. Payment scheduled for next disbursement run.",
    },
    {
      code: "4010-00 Enterprise Software Revenue",
      desc: "ASC 606 / IFRS 15 Recognized",
      entity: "Consolidated Corp",
      debit: "CR ₱119,900,000",
      status: "Audited & Locked",
      statusColor: "bg-[#579bfc]",
      lineage: "WORM Ledger Hash",
      action: "Export BIR CAS Report",
      actionToast: "Generated BIR CAS Form 2550M/Q with SHA-256 tamper-proof ledger audit hash.",
      detail: "Period locked. Certified compliant with BIR Revenue Regulation RR 9-2009.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      {/* Customer Outcome Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-white p-3 text-xs">
        <div className="flex items-center gap-2">
          <Landmark className="size-4 text-emerald-600 shrink-0" />
          <span className="font-semibold text-slate-800">
            <strong>Customer Outcome:</strong> Closes financial books in 0 days with automated 3-way PO matching, live MT940 bank feeds, and BIR CAS audit lineage.
          </span>
        </div>
        <span className="font-mono text-[0.68rem] font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
          0-Day Period Close
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-2xs">
            <Landmark className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Enterprise General Ledger &amp; SAP-Grade Cockpit</p>
            <p className="text-[0.68rem] text-slate-500">BIR CAS Certified (RR 9-2009) · 3-Way PO Matching · IFRS/GAAP</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white animate-pulse" /> Live Balance
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-emerald-300 px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
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

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">Account Code &amp; Description</th>
              <th className="p-2.5">Entity</th>
              <th className="p-2.5">Debit / Credit</th>
              <th className="p-2.5">Document Status</th>
              <th className="p-2.5">Audit Lineage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            {rows.map((row, idx) => (
              <tr
                key={row.code}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-emerald-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-emerald-600" />}
                  <div>
                    <span>{row.code}</span>
                    <span className="text-[0.62rem] text-slate-500 block font-normal">{row.desc}</span>
                  </div>
                </td>
                <td className="p-2.5 text-slate-700">{row.entity}</td>
                <td className="p-2.5 font-mono font-bold text-slate-800">{row.debit}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-[0.65rem] text-slate-600">{row.lineage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-emerald-700 uppercase">Audit Lineage Inspector:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
        >
          Verify Cryptographic Hash
        </button>
      </div>
    </div>
  );
}

/* ── 7. BITS HRMS Board ── */
function HrmsBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      shift: "Shift A (06:00 - 15:00)",
      team: "Team Alpha (32 Agents)",
      status: "100% Present",
      statusColor: "bg-[#00c875]",
      diff: "Standard Rate",
      action: "Approve Attendance Log",
      actionToast: "Approved Shift A attendance roster (32/32 active biometric scans).",
      detail: "Zero tardiness. 32 facial biometric scans synced at main lobby turnstiles.",
    },
    {
      shift: "Shift B (14:00 - 23:00)",
      team: "Team Beta (38 Agents)",
      status: "2 On Leave (Covered)",
      statusColor: "bg-[#0073ea]",
      diff: "Standard + 1h ND",
      action: "Authorize Overtime Float",
      actionToast: "Approved 2 float agents to cover Shift B customer service queue.",
      detail: "2 approved vacation leaves covered by cross-trained float roster.",
    },
    {
      shift: "Shift C (22:00 - 07:00)",
      team: "Team US-East (24 Agents)",
      status: "Night Shift Active",
      statusColor: "bg-[#a25ddc]",
      diff: "+10% Night Diff Auto",
      action: "Compute Night Differential",
      actionToast: "Computed DOLE-compliant +10% Night Shift Differential for 24 agents.",
      detail: "Automatic DOLE statutory compliance: +10% rate calculated from 10PM to 6AM.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">24/7 BPO Multi-Shift Roster</p>
          <p className="text-[0.68rem] text-slate-500">Biometric Facial Clock-In · 94/96 Seats Active Headcount</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-amber-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            DOLE Aligned
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-amber-300 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.shift}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-amber-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-amber-600" />}
                  {row.shift}
                </td>
                <td className="p-2.5 text-slate-700">{row.team}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-mono font-bold text-amber-800">{row.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-amber-700 uppercase">Workforce Roster Context:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-bold text-white hover:bg-amber-700"
        >
          Push to Payroll
        </button>
      </div>
    </div>
  );
}

/* ── 8. BITS Payroll Board ── */
function PayrollBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      batch: "Floor Operations (88 Staff)",
      rules: "SSS + PhilHealth + BIR TRAIN",
      disburse: "Disbursed",
      statusColor: "bg-[#00c875]",
      bank: "BDO Direct Batch Ready",
      action: "Generate BDO Batch File",
      actionToast: "Generated BDO corporate banking disbursement batch file (88 employees, ₱1.42M net).",
      detail: "Full statutory contributions computed with TRAIN tax brackets.",
    },
    {
      batch: "Supervisors & QA (18 Staff)",
      rules: "13th Month Accrual Reserved",
      disburse: "Approved",
      statusColor: "bg-[#0073ea]",
      bank: "BPI Direct Batch Ready",
      action: "Export BIR 2316 Certificates",
      actionToast: "Exported 18 BIR 2316 Withholding Tax Certificates with digital company seal.",
      detail: "13th month proportionate accrual booked to accounting ledger.",
    },
    {
      batch: "Executive Management (6 Staff)",
      rules: "Executive Tax Plan",
      disburse: "Pending Sign-Off",
      statusColor: "bg-[#fdab3d]",
      bank: "Security Bank Encrypted",
      action: "Release Executive Pay",
      actionToast: "Executive batch authorized with two-person dual-signature key.",
      detail: "Confidential salary tier with encrypted bank ledger export.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Statutory Tax &amp; Direct Bank Feeds</p>
          <p className="text-[0.68rem] text-slate-500">TRAIN Law Tax Tables · SSS, PhilHealth, Pag-IBIG Auto-Deductions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            100% Math Certified
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-emerald-300 px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.batch}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-emerald-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-emerald-600" />}
                  {row.batch}
                </td>
                <td className="p-2.5 text-slate-600">{row.rules}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.disburse}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-emerald-800 font-bold">{row.bank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-emerald-700 uppercase">Payroll Compliance Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
        >
          Disburse Batch
        </button>
      </div>
    </div>
  );
}

/* ── 9. BITS Construction & Project Tracker Board ── */
function ConstructionBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      item: "Level 8 HVAC Ducting Inspection",
      lead: "Engr. M. Velasco",
      status: "Punchlist Passed",
      statusColor: "bg-[#00c875]",
      interconnect: "→ 48 Laborers to BITS Payroll",
      action: "Sign-off HVAC Inspection",
      actionToast: "Signed off Level 8 HVAC inspection. 48 technician timesheets approved for payroll.",
      detail: "Air balance testing passed with 0 air leakage. Signed off on mobile tablet.",
    },
    {
      item: "Curtain Wall Glass Facade",
      lead: "Engr. K. Ramos",
      status: "Working on it",
      statusColor: "bg-[#fdab3d]",
      interconnect: "→ 140MT Rebar from Inventory",
      action: "Requisition Fasteners",
      actionToast: "Dispatched automated inventory requisition for 400 structural anchor bolts.",
      detail: "Level 14 panel placement at 72% completion. Delivery on schedule.",
    },
    {
      item: "Tower 2 Foundation Pour",
      lead: "Engr. D. Santos",
      status: "QA Certified",
      statusColor: "bg-[#0073ea]",
      interconnect: "→ 4,000 PSI Test Verified",
      action: "Export 28-Day Strength Test",
      actionToast: "Exported accredited laboratory 28-day concrete cylinder compression report (4,250 PSI).",
      detail: "Exceeded 4,000 PSI engineering specifications. Structural safety sign-off complete.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Project: Skyline Tower Phase 2</p>
          <p className="text-[0.68rem] text-slate-500">Jobsite Milestones &amp; CAD Revisions · Linked with Payroll &amp; Inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-amber-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            68% On Schedule
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-amber-300 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.item}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-amber-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-amber-600" />}
                  {row.item}
                </td>
                <td className="p-2.5 text-slate-700">{row.lead}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-medium text-blue-700">{row.interconnect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-amber-700 uppercase">Jobsite Inspection Context:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-bold text-white hover:bg-amber-700"
        >
          Sign-Off Milestone
        </button>
      </div>
    </div>
  );
}

/* ── 10. BITS Inventory Board ── */
function InventoryBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      sku: "MT-RB-32MM (Rebar High-Tensile)",
      depot: "Central Hub",
      stock: "840 Units (Healthy)",
      status: "Par OK",
      statusColor: "bg-[#00c875]",
      action: "Scan Warehouse Barcode",
      actionToast: "Scanned Barcode MT-RB-32MM. Live count confirmed at 840 bundles.",
      detail: "Stock level optimal for next 45 project days. RFID sensor calibrated.",
    },
    {
      sku: "EL-CV-400A (Circuit Breakers)",
      depot: "Jobsite Depot B",
      stock: "18 Units (Min: 50)",
      status: "Auto-PO Fired",
      statusColor: "bg-[#fdab3d]",
      action: "Trigger Auto-PO (+100 Units)",
      actionToast: "Generated Purchase Order #PO-9912 for 100 Schneider 400A circuit breakers.",
      detail: "Stock dropped below minimum par safety margin. Restock PO dispatched to vendor.",
    },
    {
      sku: "PL-PPR-50MM (Industrial Piping)",
      depot: "North Depot",
      stock: "320 Units",
      status: "Verified",
      statusColor: "bg-[#0073ea]",
      action: "Transfer to Central Hub",
      actionToast: "Initiated inter-warehouse transfer of 60 pipe bundles to Central Hub.",
      detail: "Batch inspected for ASTM hydrostatic pressure compliance.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-200 bg-blue-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Multi-Warehouse Stock Radar</p>
          <p className="text-[0.68rem] text-slate-500">Real-Time RFID Scanning · Automated Par-Level Triggers</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            99.8% Accuracy
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-blue-300 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2.5">SKU &amp; Item Name</th>
              <th className="p-2.5">Warehouse Depot</th>
              <th className="p-2.5">Stock Level</th>
              <th className="p-2.5">Automation Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.72rem]">
            {rows.map((row, idx) => (
              <tr
                key={row.sku}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-blue-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-blue-600" />}
                  {row.sku}
                </td>
                <td className="p-2.5 text-slate-600">{row.depot}</td>
                <td className="p-2.5 font-mono text-slate-900 font-bold">{row.stock}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-blue-700 uppercase">Warehouse Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-700"
        >
          Execute Action
        </button>
      </div>
    </div>
  );
}

/* ── 11. BITS Logistics Board ── */
function LogisticsBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      vehicle: "Truck #12 (Isuzu Giga 10W)",
      driver: "R. Santos",
      status: "ETA 14m (En Route)",
      statusColor: "bg-[#0073ea]",
      epod: "Digital Signature Ready",
      action: "Optimize Fleet Route",
      actionToast: "Re-calculated route for Truck #12: Bypassed C5 congestion, saving 22 minutes.",
      detail: "Carrying 14 pallets of drywall. GPS telematics active with temperature sensor.",
    },
    {
      vehicle: "Van #04 (HiAce Express)",
      driver: "K. Dizon",
      status: "Delivered",
      statusColor: "bg-[#00c875]",
      epod: "Geotag Lat 14.55 Verified",
      action: "Verify Geotagged Signature",
      actionToast: "Verified electronic proof of delivery signature with GPS coordinates (14.5547° N, 121.0244° E).",
      detail: "Client signed on mobile glass. PDF proof-of-delivery emailed to customer automatically.",
    },
    {
      vehicle: "Motorcycle Fleet #08",
      driver: "J. Alcantara",
      status: "Dispatched",
      statusColor: "bg-[#a25ddc]",
      epod: "Express Document Courier",
      action: "Broadcast Urgent Dispatch",
      actionToast: "Assigned high-priority notarized escrow documents to Motorcycle #08.",
      detail: "Target delivery window: 45 minutes across BGC-Makati corridor.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Fleet Operations &amp; AI Dispatch</p>
          <p className="text-[0.68rem] text-slate-500">14 Active Routes · Real-Time GPS Tracking &amp; Electronic POD</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            98.2% On-Time
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-indigo-300 px-2.5 py-1 text-xs font-bold text-indigo-800 hover:bg-indigo-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.vehicle}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-indigo-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-indigo-600" />}
                  {row.vehicle}
                </td>
                <td className="p-2.5 text-slate-700">{row.driver}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 text-emerald-700 font-semibold">{row.epod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-indigo-700 uppercase">Driver &amp; Route Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-700"
        >
          Verify Geotag
        </button>
      </div>
    </div>
  );
}

/* ── 12. BITS AI Sports Scoring Board ── */
function SportsAiBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      match: "Men's Singles Championship",
      score: "21-18 · 19-21 · 21-16",
      speed: "312 km/h",
      insight: "Timestamp [14:32] Footwork Recovery Drill Linked",
      action: "Clip 312 km/h Smash Video",
      actionToast: "Generated 1080p 60fps instant replay clip of 312 km/h smash at Match Point.",
      detail: "Computer vision analyzed 1,840 frames. Identified 4 unforced errors on backhand cross-court.",
    },
    {
      match: "Women's Doubles Semifinal",
      score: "21-14 · 21-19",
      speed: "284 km/h",
      insight: "8 Highlight Reels Auto-Clipped",
      action: "Export TikTok / Reels Highlights",
      actionToast: "Exported 8 vertical 9:16 highlight reels ready for social media posting.",
      detail: "Rally tracking detected 34-shot rally with automated crowd reaction audio tagging.",
    },
    {
      match: "Varsity Training Camp",
      score: "Drill Metric: 94%",
      speed: "245 km/h",
      insight: "Automated Biomechanics Scorecard",
      action: "Generate Coaching Summary",
      actionToast: "Generated PDF coaching report with player shoulder rotation angles.",
      detail: "Pose estimation tracked 18 skeletal landmarks across 12 amateur student athletes.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-200 bg-cyan-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Computer Vision Sports Scoring &amp; AI Coach</p>
          <p className="text-[0.68rem] text-slate-500">Video Ingestion from Smartphone or GoPro · Automated Match Analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            &lt; 90s Turnaround
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-cyan-300 px-2.5 py-1 text-xs font-bold text-cyan-800 hover:bg-cyan-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.match}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-cyan-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-cyan-600" />}
                  {row.match}
                </td>
                <td className="p-2.5 font-mono font-bold text-emerald-700">{row.score}</td>
                <td className="p-2.5 font-mono text-cyan-700 font-bold">{row.speed}</td>
                <td className="p-2.5 text-slate-700 font-medium">{row.insight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-cyan-700 uppercase">Vision Processing Breakdown:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-cyan-600 px-3 py-1 text-xs font-bold text-white hover:bg-cyan-700"
        >
          Run Vision Pipeline
        </button>
      </div>
    </div>
  );
}

/* ── 13. BITS Sports Arena & Venue Hub Board ── */
function SportsHubBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      court: "Court 1 (Badminton)",
      players: "Metro Spikers vs Shuttle Lords",
      status: "Match On (18m left)",
      statusColor: "bg-[#00c875]",
      queue: "Game 2 (14 - 11)",
      action: "Push Score to TV Display",
      actionToast: "Live score 14-11 broadcast to Arena Overhead TV Display screens.",
      detail: "Court sensor active. Players registered via mobile QR court kiosk.",
    },
    {
      court: "Court 2 (Pickleball)",
      players: "Net Raiders vs Smashers",
      status: "Calling Players",
      statusColor: "bg-[#0073ea]",
      queue: "DUPR Rating: 1,420",
      action: "Call Next Players (SMS)",
      actionToast: "Sent SMS chime to Net Raiders: 'Court 2 is ready. Please step onto court.'",
      detail: "Automated 5-minute grace period initiated before next reservation forfeits.",
    },
    {
      court: "Court 3 (Basketball Half)",
      players: "Hoops Academy (3x3)",
      status: "Reserved (17:00)",
      statusColor: "bg-[#fdab3d]",
      queue: "Tournament Bracket R2",
      action: "Advance Tournament Bracket",
      actionToast: "Advanced Hoops Academy to Round 2 of City Invitational Tournament.",
      detail: "Referee digital scorecard connected via iPad floor console.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Sports Venue Operations &amp; Live Court Queuing Hub</p>
          <p className="text-[0.68rem] text-slate-500">Overhead TV Court Display Screen · Tournament Elo Ladders</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white font-mono flex items-center gap-1">
            <Tv className="size-3" /> TV Display Live
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-emerald-300 px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.court}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-emerald-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-emerald-600" />}
                  {row.court}
                </td>
                <td className="p-2.5 text-slate-700">{row.players}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-medium text-slate-700">{row.queue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-emerald-700 uppercase">Court Sensor &amp; TV Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
        >
          Broadcast Update
        </button>
      </div>
    </div>
  );
}

/* ── 14. BITS Booking System Board ── */
function BookingBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      folio: "#BK-9021 (Dr. Karen Cruz)",
      resource: "Executive Suite 402",
      status: "Confirmed",
      statusColor: "bg-[#00c875]",
      deposit: "₱2,500 Tokenized Escrow",
      action: "Send WhatsApp QR Voucher",
      actionToast: "Dispatched digital QR access pass to Dr. Cruz via WhatsApp (+63 918 *** 9021).",
      detail: "Confirmed booking. Tokenized deposit held in merchant escrow until check-in.",
    },
    {
      folio: "#BK-9022 (A. Reyes)",
      resource: "Tennis Court A (2h)",
      status: "QR Pass Sent",
      statusColor: "bg-[#0073ea]",
      deposit: "Instant Maya Voucher",
      action: "Resend Mobile Entry Pass",
      actionToast: "Re-issued mobile entry pass with smart turnstile PIN code to A. Reyes.",
      detail: "Lighting and court access unlocked automatically for 18:00 - 20:00 session.",
    },
    {
      folio: "#BK-9023 (Consolidated Corp)",
      resource: "Auditorium Hall",
      status: "Pending Deposit",
      statusColor: "bg-[#fdab3d]",
      deposit: "₱15,000 Escrow Invoice",
      action: "Send Maya/GCash Payment Link",
      actionToast: "Dispatched 24-hour payment reminder link to event organizer.",
      detail: "Holding slot for corporate townhall. Automatic release if unpaid in 4 hours.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-200 bg-blue-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Multi-Industry Reservation Engine</p>
          <p className="text-[0.68rem] text-slate-500">Hotels, Sports Courts &amp; Consulting · Real-Time Availability</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            +42% Direct Bookings
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-blue-300 px-2.5 py-1 text-xs font-bold text-blue-800 hover:bg-blue-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.folio}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-blue-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-blue-600" />}
                  {row.folio}
                </td>
                <td className="p-2.5 text-slate-700">{row.resource}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-emerald-700 font-bold">{row.deposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-blue-700 uppercase">Reservation &amp; Escrow Telemetry:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-700"
        >
          Re-send Pass
        </button>
      </div>
    </div>
  );
}

/* ── 15. BITS Smart Queuing Board ── */
function QueuingBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      ticket: "TICKET #A-042",
      service: "Collections Consultation",
      status: "Now Serving",
      statusColor: "bg-[#0073ea]",
      counter: "Proceed to Counter 3",
      action: "Play Overhead Audio Chime",
      actionToast: "Chime played on floor TV: 'Now serving Ticket A-042 at Counter 3.'",
      detail: "Client called to Counter 3. Service duration timer started (01:14).",
    },
    {
      ticket: "TICKET #A-043",
      service: "Account Settlement",
      status: "Next in Line (~3m)",
      statusColor: "bg-[#fdab3d]",
      counter: "SMS Alert Paged",
      action: "Page Next Ticket (A-043)",
      actionToast: "Paged Ticket A-043: SMS notification sent to client phone.",
      detail: "Client waiting in executive lobby. Estimated wait: 2 minutes 40 seconds.",
    },
    {
      ticket: "TICKET #A-044",
      service: "General Information",
      status: "Virtual Queue",
      statusColor: "bg-[#a25ddc]",
      counter: "Window 1 Pre-Assigned",
      action: "Transfer to Counter 2",
      actionToast: "Transferred Ticket A-044 to specialized customer service desk Counter 2.",
      detail: "Client checked in via mobile QR scan at entrance foyer kiosk.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-rose-200 bg-rose-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Digital Queuing &amp; Overhead TV Floor Dispatch</p>
          <p className="text-[0.68rem] text-slate-500">Mobile QR Virtual Passes · Retail, Clinics &amp; Arenas</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            -52% Wait Time
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-rose-300 px-2.5 py-1 text-xs font-bold text-rose-800 hover:bg-rose-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.ticket}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-rose-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-rose-600" />}
                  {row.ticket}
                </td>
                <td className="p-2.5 text-slate-700">{row.service}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-blue-700 font-bold">{row.counter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-rose-700 uppercase">Lobby Display Dispatch:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white hover:bg-rose-700"
        >
          Dispatch to Screen
        </button>
      </div>
    </div>
  );
}

/* ── 16. BITS RAG Knowledge Engine Board ── */
function RagBoard({
  onAction,
}: {
  onAction: (msg: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const rows = [
    {
      repo: "BSP Circular 454/857 Manual",
      scope: "Statutory Rules PDF (v4.2)",
      status: "Grounded",
      statusColor: "bg-[#00c875]",
      latency: "118ms (Cosine 0.94)",
      action: "Test Vector Policy Query",
      actionToast: "Vector query executed against BSP 454 embeddings: 100% matched citation returned in 118ms.",
      detail: "Prohibits debt collector contact between 10:00 PM and 6:00 AM. Grounded in sovereign chunk index #482.",
    },
    {
      repo: "Enterprise SQL & ERP Lake",
      scope: "Product & Inventory Catalog",
      status: "Real-Time CDC",
      statusColor: "bg-[#a25ddc]",
      latency: "142ms Hybrid Search",
      action: "Re-Index ERP Masterfile",
      actionToast: "Change Data Capture (CDC) re-indexed 14,200 ERP inventory SKUs to vector store.",
      detail: "Sub-second sync with SAP-grade ERP database for zero-latency price and availability lookups.",
    },
    {
      repo: "Corporate Policy Masterfile",
      scope: "Internal Employee Handbook",
      status: "Indexed",
      statusColor: "bg-[#0073ea]",
      latency: "94ms BM25 + Dense",
      action: "Audit Hallucination Guardrail",
      actionToast: "Hallucination guardrail active: blocked synthetic response with 0% unverified statements.",
      detail: "Dual-layer BM25 keyword + dense vector reranker with cross-encoder verification.",
    },
  ];

  const activeRecord = rows[selectedRow] || rows[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-violet-200 bg-violet-50/70 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Universal Enterprise RAG Knowledge Layer</p>
          <p className="text-[0.68rem] text-slate-500">148,200 Vector Embeddings · Zero Hallucination Policy Grounding</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-violet-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            99.4% Factual
          </span>
          <button
            type="button"
            onClick={() => onAction(activeRecord.actionToast)}
            className="rounded-md bg-white border border-violet-300 px-2.5 py-1 text-xs font-bold text-violet-800 hover:bg-violet-100"
          >
            ⚡ {activeRecord.action}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
            {rows.map((row, idx) => (
              <tr
                key={row.repo}
                onClick={() => setSelectedRow(idx)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRow === idx ? "bg-violet-50/80 font-medium" : "hover:bg-slate-50/70"
                )}
              >
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedRow === idx && <span className="size-1.5 rounded-full bg-violet-600" />}
                  {row.repo}
                </td>
                <td className="p-2.5 text-slate-600">{row.scope}</td>
                <td className="p-2.5">
                  <span className={cn("rounded-md px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-2xs", row.statusColor)}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-emerald-700 font-bold">{row.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[0.65rem] font-mono font-bold text-violet-700 uppercase">Vector Cosine Analysis:</span>
          <p className="font-semibold text-slate-900">{activeRecord.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => onAction(activeRecord.actionToast)}
          className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-bold text-white hover:bg-violet-700"
        >
          Verify Semantic Similarity
        </button>
      </div>
    </div>
  );
}

/* 16. BITS Smart NFC Business & Identity Card Board */
function NfcCardBoard({ onAction }: { onAction?: (msg: string) => void }) {
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
              "cursor-pointer rounded-md px-3 py-2 text-[0.68rem] font-bold transition-all min-h-[44px] inline-flex items-center justify-center",
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
              "cursor-pointer rounded-md px-3 py-2 text-[0.68rem] font-bold transition-all min-h-[44px] inline-flex items-center justify-center",
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
              "cursor-pointer rounded-md px-3 py-2 text-[0.68rem] font-bold transition-all min-h-[44px] inline-flex items-center justify-center",
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
                  "cursor-pointer rounded-lg px-3.5 py-2 text-xs font-bold transition-all min-h-[44px] inline-flex items-center justify-center",
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
                  "cursor-pointer rounded-full px-3.5 py-2 text-[0.65rem] font-extrabold uppercase tracking-wider transition-all min-h-[44px] inline-flex items-center justify-center",
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

/* 18. BITS White Label Platform Board */
function WhiteLabelBoard({ onAction }: { onAction?: (msg: string) => void }) {
  const [activeProduct, setActiveProduct] = React.useState<"crm" | "hrms" | "accounting" | "booking">("crm");

  const brandedProducts = [
    { id: "crm" as const, name: "CRM Suite", status: "Live", color: "emerald" },
    { id: "hrms" as const, name: "HRMS Cloud", status: "Live", color: "emerald" },
    { id: "accounting" as const, name: "Accounting ERP", status: "Staging", color: "amber" },
    { id: "booking" as const, name: "Booking Hub", status: "Pending", color: "blue" },
  ];

  const brandConfig: Record<typeof activeProduct, { name: string; domain: string; primary: string; logo: string }> = {
    crm: { name: "NexaCRM", domain: "nexacrm.yourcompany.com", primary: "#2563EB", logo: "NC" },
    hrms: { name: "PeopleCore", domain: "hr.yourcompany.com", primary: "#7C3AED", logo: "PC" },
    accounting: { name: "LedgerPro", domain: "finance.yourcompany.com", primary: "#059669", logo: "LP" },
    booking: { name: "BookEase", domain: "book.yourcompany.com", primary: "#DC2626", logo: "BE" },
  };

  const cfg = brandConfig[activeProduct];

  return (
    <div className="space-y-4 font-sans">
      {/* Header banner */}
      <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-3">
        <div>
          <p className="text-xs font-bold text-slate-900">White Label Brand Configuration Portal</p>
          <p className="text-[0.68rem] text-slate-500">
            4 Products Branded · NDA Active · Zero BITS Attribution
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="rounded-md bg-orange-600 px-2.5 py-1 text-xs font-bold text-white font-mono">
            100% Yours
          </span>
        </div>
      </div>

      {/* Product selector */}
      <div className="flex flex-wrap gap-2">
        {brandedProducts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveProduct(p.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[0.68rem] font-bold transition-all cursor-pointer min-h-[44px] inline-flex items-center justify-center",
              activeProduct === p.id
                ? "border-orange-400 bg-orange-100 text-orange-800"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-200"
            )}
          >
            <span className={cn(
              "size-1.5 rounded-full",
              p.color === "emerald" ? "bg-emerald-500" : p.color === "amber" ? "bg-amber-500" : "bg-blue-500"
            )} />
            {p.name}
            <span className={cn(
              "rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold",
              p.color === "emerald" ? "bg-emerald-100 text-emerald-700" : p.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
            )}>
              {p.status}
            </span>
          </button>
        ))}
      </div>

      {/* Brand Preview Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Simulated branded header bar */}
        <div
          className="flex items-center gap-3 px-4 py-2.5"
          style={{ backgroundColor: cfg.primary }}
        >
          <div
            className="flex size-7 items-center justify-center rounded-lg bg-white/20 text-[0.65rem] font-black text-white"
          >
            {cfg.logo}
          </div>
          <span className="text-xs font-bold text-white">{cfg.name}</span>
          <span className="ml-auto text-[0.65rem] text-white/70 font-mono">{cfg.domain}</span>
        </div>

        {/* Branding details table */}
        <div className="divide-y divide-slate-100">
          {[
            { label: "Brand Name", value: cfg.name, tag: "Replaced" },
            { label: "Custom Domain", value: cfg.domain, tag: "SSL Active" },
            { label: "Primary Color", value: cfg.primary, tag: "Hex Applied" },
            { label: "BITS Attribution", value: "None — NDA Protected", tag: "Hidden" },
            { label: "Reseller License", value: "Full Sublicensing Rights", tag: "Active" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-2.5 text-xs">
              <span className="font-medium text-slate-500">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{row.value}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[0.6rem] font-bold text-emerald-700">
                  {row.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Reseller Tier", value: "Platinum", color: "orange" },
          { label: "Clients Onboarded", value: "12 Active", color: "emerald" },
          { label: "Margin Control", value: "100% Yours", color: "blue" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <p className={cn(
              "text-[0.6rem] font-mono font-bold uppercase",
              item.color === "orange" ? "text-orange-600" : item.color === "emerald" ? "text-emerald-600" : "text-blue-600"
            )}>{item.label}</p>
            <p className="mt-0.5 text-xs font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
