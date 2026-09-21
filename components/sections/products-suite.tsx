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
  Lock,
  Layers,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  MapPin,
  QrCode,
  Tv,
  FileCheck,
} from "lucide-react";

const categoryFilters = [
  { id: "all", label: "All Products (15)" },
  { id: "flagship", label: "Core Flagships (2)" },
  { id: "crm", label: "CRM Variants (4)" },
  { id: "operations", label: "Operations & Supply Chain (5)" },
  { id: "sports", label: "Sports, Booking & Queuing (4)" },
  { id: "ai", label: "AI & Knowledge (2)" },
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
      default:
        return Layers;
    }
  };

  return (
    <Section id="products-suite" className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      {/* Background Architectural Patterns */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.07),transparent)]" />
        <div className="absolute left-1/2 -top-24 size-[650px] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-3xl" />
        <div className="absolute inset-0 bg-grid-light opacity-50" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Enterprise Product Ecosystem
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              One Unified Operational Engine.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Every Department Connected.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600">
              Anchored by our flagship <strong className="text-slate-900">BITScrm Customer Service</strong> platform and{" "}
              <strong className="text-slate-900">BITSagent AI</strong> operations, explore specialized software engines
              for CRM variants, workforce payroll, construction & logistics, sports video AI, booking, and smart queuing.
            </p>
          </Reveal>

          {/* Category Filter Pills */}
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {categoryFilters.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.id);
                      // Auto-select first product in this category if active isn't in it
                      const matching =
                        tab.id === "all"
                          ? bitsProducts
                          : tab.id === "flagship"
                          ? bitsProducts.filter((p) => p.isFlagship)
                          : tab.id === "crm"
                          ? bitsProducts.filter((p) => p.category === "crm" || p.id === "service")
                          : tab.id === "ai"
                          ? bitsProducts.filter((p) => p.category === "ai" || p.id === "ai-agent")
                          : bitsProducts.filter((p) => p.category === tab.id);

                      if (matching.length > 0 && !matching.some((p) => p.id === activeProductId)) {
                        setActiveProductId(matching[0].id);
                      }
                    }}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm",
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/20"
                        : "border border-slate-200 bg-white/90 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Product Selector Horizontal Scroller */}
        <div className="mt-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-3 min-w-max px-2">
            {filteredProducts.map((prod) => {
              const isSelected = activeProduct.id === prod.id;
              const Icon = getProductIcon(prod.id);

              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setActiveProductId(prod.id)}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200",
                    isSelected
                      ? "border-blue-600 bg-white shadow-lg shadow-blue-900/10 ring-2 ring-blue-500/20"
                      : "border-slate-200/90 bg-white/80 hover:border-slate-300 hover:bg-white text-slate-700"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 sm:text-sm">{prod.name}</p>
                      {prod.isFlagship && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[0.62rem] font-bold text-blue-700 uppercase">
                          Flagship
                        </span>
                      )}
                    </div>
                    <p className="text-[0.72rem] text-slate-500 line-clamp-1">{prod.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Product Detailed Showcase */}
        <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
          {/* Flagship Notice Ribbon if Flagship */}
          {activeProduct.isFlagship && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 border border-blue-200/60">
              <Zap className="size-4 text-blue-600 fill-blue-600" />
              <p className="text-xs font-bold text-blue-900">
                Core Flagship Platform · Mission-Critical Operational Hub
              </p>
              <span className="ml-auto font-mono text-[0.68rem] text-blue-600 font-semibold">
                SLA: 99.99% Guaranteed
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Product Information */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[0.72rem] font-bold text-blue-800 uppercase tracking-wider">
                    {activeProduct.categoryLabel}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.72rem] font-semibold text-slate-600">
                    {activeProduct.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {activeProduct.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-blue-600 sm:text-base">
                  {activeProduct.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {activeProduct.description}
                </p>
              </div>

              {/* Performance / ROI Metric Card */}
              <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="text-3xl font-extrabold text-blue-700 font-mono sm:text-4xl">
                  {activeProduct.metrics.value}
                </div>
                <div className="border-l border-blue-200 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Performance Benchmark
                  </p>
                  <p className="text-xs font-semibold text-slate-800">
                    {activeProduct.metrics.label}
                  </p>
                </div>
              </div>

              {/* Compliance & Regulatory Badges */}
              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Compliance & Regulatory Alignment
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.complianceBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.72rem] font-semibold text-slate-700 shadow-2xs"
                    >
                      <ShieldCheck className="size-3.5 text-blue-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Feature Capabilities Grid */}
              <div className="space-y-2 pt-2">
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400">
                  Key Engineered Capabilities
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {activeProduct.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="size-4 shrink-0 text-blue-600 mt-0.5" />
                      <span className="leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href={activeProduct.ctaHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <span>{activeProduct.ctaText}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Magnetic>
                <Link
                  href="/#contact"
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Request Architecture Scoping →
                </Link>
              </div>
            </div>

            {/* Right Column: High-Fidelity Interactive UI Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-2xl">
                <ProductMockupPreview productId={activeProduct.id} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── Dedicated High-Fidelity UI Mockups for Each Product ── */
function ProductMockupPreview({ productId }: { productId: string }) {
  switch (productId) {
    case "service":
      return <ServiceCrmMockup />;
    case "ai-agent":
      return <BitsAgentMockup />;
    case "sales":
      return <SalesCrmMockup />;
    case "marketing":
      return <MarketingCrmMockup />;
    case "commerce":
      return <CommerceCrmMockup />;
    case "hrms":
      return <HrmsMockup />;
    case "payroll":
      return <PayrollMockup />;
    case "construction":
      return <ConstructionMockup />;
    case "inventory":
      return <InventoryMockup />;
    case "logistics":
      return <LogisticsMockup />;
    case "sports-ai":
      return <SportsAiMockup />;
    case "sports-hub":
      return <SportsHubMockup />;
    case "booking":
      return <BookingMockup />;
    case "queuing":
      return <QueuingMockup />;
    case "rag-engine":
      return <RagEngineMockup />;
    default:
      return <ServiceCrmMockup />;
  }
}

/* 1. Flagship Customer Service CRM Mockup */
function ServiceCrmMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-white">BITScrm Service Core</span>
          <span className="rounded bg-blue-900/60 px-2 py-0.5 text-[0.62rem] text-blue-300 border border-blue-500/30">
            Softphone Connected
          </span>
        </div>
        <span className="font-mono text-[0.68rem] text-slate-400">Queue: Delinquent Tier-1</span>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-900/60 to-slate-900 p-3 border border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <PhoneCall className="size-4 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Active Call: Michael Tan (Acc #4920)</p>
            <p className="text-[0.65rem] text-slate-300">Balance: ₱48,500 · 45 DPD · Disposition: PTP Negotiation</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-bold text-cyan-300">03:42</span>
          <p className="text-[0.62rem] text-emerald-400">Recording Active</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-slate-900/90 p-2.5 text-xs border border-slate-800">
          <div>
            <span className="font-bold text-white">#SRV-1084 · Promise-to-Pay Confirmation</span>
            <p className="text-[0.68rem] text-slate-400">Debtor agreed to ₱15,000 via GCash · Installment 1/3</p>
          </div>
          <span className="rounded-full bg-emerald-950/80 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-400 border border-emerald-500/30">
            PTP Logged
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-900/90 p-2.5 text-xs border border-slate-800">
          <div>
            <span className="font-bold text-white">#SRV-1085 · Hardship Settlement Review</span>
            <p className="text-[0.68rem] text-slate-400">Supervisor approval requested · 25% waiver request</p>
          </div>
          <span className="rounded-full bg-amber-950/80 px-2 py-0.5 text-[0.65rem] font-semibold text-amber-400 border border-amber-500/30">
            Pending Escalate
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[0.65rem] text-slate-400">
        <span>SLA Resolution: 98.4%</span>
        <span>Supervisor Whisper: Available</span>
        <span>RBAC: Level 2 Agent</span>
      </div>
    </div>
  );
}

/* 2. Flagship BITSagent AI Mockup */
function BitsAgentMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-900/40 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-white">BITSagent Voice AI</span>
        </div>
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[0.65rem] text-cyan-300 font-mono">
          Latency: 284ms
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-slate-900 p-4 border border-blue-500/20 text-center">
        <div className="flex justify-center items-center gap-1 h-8">
          {[40, 75, 95, 60, 85, 100, 70, 90, 45, 80, 60, 30].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400 animate-pulse"
            />
          ))}
        </div>
        <p className="mt-2 text-xs font-bold text-white">
          &ldquo;I understand Mr. Ramos. We can split your balance into two installments of ₱6,000.&rdquo;
        </p>
        <span className="mt-1 inline-block text-[0.62rem] text-cyan-400">
          Intent: Settlement Agreement · Sentiment: Cooperative (92%)
        </span>
      </div>

      <div className="mt-3 space-y-2 text-[0.72rem]">
        <div className="rounded-lg bg-blue-950/40 p-2.5 border border-blue-800/40">
          <span className="font-bold text-cyan-300">Customer:</span> &ldquo;Can you send the payment link via SMS?&rdquo;
        </div>
        <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
          <span className="font-bold text-emerald-400">BITSagent:</span> &ldquo;Link dispatched to 0917-***-4921 with reference PTP-8841.&rdquo;
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>RAG Grounding: BSP Policy Manual v4.2</span>
        <span className="text-emerald-400">Zero Script Deviation</span>
      </div>
    </div>
  );
}

/* 3. BITScrm Sales Mockup */
function SalesCrmMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold text-white">BITScrm Sales Pipeline</span>
        </div>
        <span className="font-mono text-[0.68rem] text-emerald-400">Q3 Weighted: ₱14.8M</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div className="flex justify-between text-[0.65rem] font-bold text-slate-400 border-b border-slate-800 pb-1.5">
            <span>SCOPING (3)</span>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="rounded bg-slate-950 p-2 text-[0.7rem] border border-slate-800">
              <p className="font-bold text-white">Apex Lending Inc</p>
              <span className="mt-1 inline-block text-[0.6rem] text-blue-400">Prob: 65%</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div className="flex justify-between text-[0.65rem] font-bold text-blue-400 border-b border-slate-800 pb-1.5">
            <span>PROPOSAL (2)</span>
          </div>
          <div className="mt-2">
            <div className="rounded bg-slate-950 p-2 text-[0.7rem] border border-blue-500/30">
              <p className="font-bold text-white">Metro Bank Financial</p>
              <span className="mt-1 inline-block text-[0.6rem] text-emerald-400">CPQ Ready</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div className="flex justify-between text-[0.65rem] font-bold text-emerald-400 border-b border-slate-800 pb-1.5">
            <span>WON (4)</span>
          </div>
          <div className="mt-2">
            <div className="rounded bg-emerald-950/40 p-2 text-[0.7rem] border border-emerald-500/30">
              <p className="font-bold text-white">FastRecovery BPO</p>
              <p className="text-[0.62rem] text-emerald-300">Signed (3 Yr)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>AI Scoring: Enabled</span>
        <span>Territory: Automated Routing</span>
      </div>
    </div>
  );
}

/* 4. BITScrm Marketing Mockup */
function MarketingCrmMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-purple-400" />
          <span className="font-mono text-xs font-bold text-white">BITScrm Marketing Journey</span>
        </div>
        <span className="font-mono text-[0.68rem] text-purple-300">Re-Engagement 30-DPD</span>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <span className="flex size-6 items-center justify-center rounded-full bg-blue-600 text-[0.65rem] font-bold">1</span>
          <div>
            <p className="font-bold text-white">Trigger: Account Enters 30+ DPD</p>
            <p className="text-[0.65rem] text-slate-400">Audience: 1,420 Enrolled</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <span className="flex size-6 items-center justify-center rounded-full bg-indigo-600 text-[0.65rem] font-bold">2</span>
          <div>
            <p className="font-bold text-white">Action: Automated SMS Alert with Portal Link</p>
            <p className="text-[0.65rem] text-emerald-400">Delivered: 99.2%</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Opt-Out Rate: 0.12%</span>
        <span>NPC DPA Verified</span>
      </div>
    </div>
  );
}

/* 5. BITScrm Commerce Mockup */
function CommerceCrmMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-white">BITScrm Commerce</span>
        </div>
        <span className="font-mono text-[0.68rem] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
          PCI-DSS Level 1 Ready
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-slate-900 p-3 border border-slate-800 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <p className="font-bold text-white">Recurring Subscription #SUB-9021</p>
          <span className="font-mono text-emerald-400">Auto-Paid</span>
        </div>
        <div className="mt-2 space-y-1 text-[0.7rem] text-slate-300">
          <div className="flex justify-between">
            <span>Base Platform Tier (100 Seats):</span>
            <span className="font-mono text-white">Scoped Retainer</span>
          </div>
          <div className="flex justify-between">
            <span>SIP Minutes (42,500 mins):</span>
            <span className="font-mono text-white">Usage Metered</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Tokenized TLS Gateways</span>
        <span>Dunning Recovery: 91.2%</span>
      </div>
    </div>
  );
}

/* 6. BITS HRMS Mockup */
function HrmsMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-blue-400" />
          <span className="font-mono text-xs font-bold text-white">BITS HRMS · Shift Roster</span>
        </div>
        <span className="font-mono text-[0.68rem] text-emerald-400">Floor Active: 94/96 Seats</span>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div>
            <p className="font-bold text-white">Shift A: Morning (06:00 – 15:00)</p>
            <p className="text-[0.65rem] text-slate-400">Team Alpha · Inbound Care (32 Agents)</p>
          </div>
          <span className="font-mono text-[0.68rem] text-emerald-300">100% Present</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div>
            <p className="font-bold text-white">Shift C: Graveyard (22:00 – 07:00)</p>
            <p className="text-[0.65rem] text-slate-400">Night Diff Auto-Computed (24 Agents)</p>
          </div>
          <span className="font-mono text-[0.68rem] text-purple-300">Biometric Sync</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>DOLE Labor Standards Aligned</span>
        <span>Biometric Facial Sync: Active</span>
      </div>
    </div>
  );
}

/* 7. BITS Payroll Mockup */
function PayrollMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="size-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Payroll Engine</span>
        </div>
        <span className="font-mono text-[0.68rem] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
          TRAIN Law Compliant
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-slate-900 p-3 border border-slate-800 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <p className="font-bold text-white">Batch: Floor Operations (88 Employees)</p>
          <span className="font-mono text-emerald-400 text-[0.72rem] font-bold">DISBURSED</span>
        </div>
        <div className="mt-2 space-y-1 text-[0.7rem] text-slate-300">
          <div className="flex justify-between">
            <span>SSS, PhilHealth & Pag-IBIG:</span>
            <span className="font-mono text-rose-300">Statutory Deducted</span>
          </div>
          <div className="flex justify-between">
            <span>Direct Bank Batch Feed:</span>
            <span className="text-emerald-400 font-mono">BDO / BPI Exported</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Alphalist Export: BIR 2316 Ready</span>
        <span>Zero Error Rate</span>
      </div>
    </div>
  );
}

/* 8. BITS Construction & Project Tracker Mockup */
function ConstructionMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <HardHat className="size-4 text-amber-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Construction Tracker</span>
        </div>
        <span className="font-mono text-[0.68rem] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
          Project: Skyline Tower Phase 2
        </span>
      </div>

      {/* Progress & Milestone Gantt */}
      <div className="mt-3 space-y-2 text-xs">
        <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-white">Overall Project Progress</span>
            <span className="font-mono font-bold text-emerald-400">68% On Schedule</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-500 to-emerald-400" />
          </div>
        </div>

        {/* Interconnected System Feeds */}
        <div className="grid grid-cols-2 gap-2 text-[0.68rem]">
          <div className="rounded-lg bg-slate-900/90 p-2 border border-blue-500/30">
            <p className="font-bold text-blue-300">→ BITS Payroll Sync</p>
            <p className="text-slate-400">48 Onsite Workers · Hours verified via biometric kiosk</p>
          </div>
          <div className="rounded-lg bg-slate-900/90 p-2 border border-emerald-500/30">
            <p className="font-bold text-emerald-300">→ BITS Inventory Sync</p>
            <p className="text-slate-400">140MT Rebar & Ready-Mix requisitioned</p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 p-2 border border-slate-800 text-[0.7rem]">
          <div className="flex justify-between">
            <span className="font-bold text-slate-200">#PUNCH-104: Level 8 HVAC Ducting</span>
            <span className="font-mono text-emerald-400">INSPECTED</span>
          </div>
          <p className="text-[0.65rem] text-slate-400">CAD Blueprint: Rev_D_Structural.dwg verified</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>OSHA & DOLE Logs: Compliant</span>
        <span>Earned Value: +12% Margin</span>
      </div>
    </div>
  );
}

/* 9. BITS Inventory Mockup */
function InventoryMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Boxes className="size-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Inventory Engine</span>
        </div>
        <span className="font-mono text-[0.68rem] text-cyan-300">3 Warehouses Connected</span>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div>
            <p className="font-bold text-white">SKU: MT-RB-32MM (32mm High-Tensile Rebar)</p>
            <p className="text-[0.65rem] text-slate-400">Warehouse Central · Batch #PH-9821</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-emerald-400 font-bold">840 Units</span>
            <p className="text-[0.6rem] text-slate-400">Healthy Par</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-amber-500/30">
          <div>
            <p className="font-bold text-white">SKU: EL-CV-400A (400A Circuit Breakers)</p>
            <p className="text-[0.65rem] text-slate-400">Stock: 18 Units (Min Par: 50 Units)</p>
          </div>
          <span className="rounded bg-amber-950/80 px-2 py-0.5 text-[0.65rem] font-bold text-amber-400 border border-amber-500/30">
            Auto-PO Fired
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>RFID / Barcode Scanner: Connected</span>
        <span>FIFO Audit Trail: Certified</span>
      </div>
    </div>
  );
}

/* 10. BITS Logistics Mockup */
function LogisticsMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Truck className="size-4 text-indigo-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Logistics & Dispatch</span>
        </div>
        <span className="font-mono text-[0.68rem] text-emerald-400">14 Active Routes (98% On-Time)</span>
      </div>

      <div className="mt-3 rounded-xl bg-slate-900 p-3 border border-slate-800 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div>
            <p className="font-bold text-white">Truck #12 (Isuzu Giga 10-Wheeler)</p>
            <p className="text-[0.65rem] text-slate-400">Driver: R. Santos · Route: Central Hub → Jobsite B</p>
          </div>
          <span className="rounded-full bg-blue-950 px-2 py-0.5 text-[0.65rem] font-mono text-cyan-300 border border-blue-500/30">
            ETA: 14 mins
          </span>
        </div>

        <div className="mt-2.5 space-y-1.5 text-[0.68rem] text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-rose-400 shrink-0" />
            <span>Current GPS: C-5 Highway Northbound (Speed: 52 km/h)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
            <span>ePOD: Digital Receiver Signature & Geotag Verification</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Route AI: Multi-Stop Optimized</span>
        <span>DOT / LTO Compliant</span>
      </div>
    </div>
  );
}

/* 11. BITS AI Sports Scoring & Match Analysis Mockup */
function SportsAiMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Video className="size-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-white">BITS AI Sports Scoring</span>
        </div>
        <span className="font-mono text-[0.68rem] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          Source: GoPro 4K 60fps
        </span>
      </div>

      {/* Match Score & Set Results */}
      <div className="mt-3 rounded-xl bg-slate-900 p-3 border border-slate-800">
        <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
          <div>
            <p className="font-bold text-white">Player A vs. Player B (Men&apos;s Championship)</p>
            <p className="text-[0.65rem] text-slate-400">Computer Vision Auto-Scored</p>
          </div>
          <span className="font-mono text-xs font-extrabold text-emerald-400">
            21-18 · 19-21 · 21-16
          </span>
        </div>

        {/* Shot & Rally Insights */}
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[0.68rem]">
          <div className="rounded bg-slate-950 p-1.5 border border-slate-800">
            <p className="text-slate-400">Smash Speed</p>
            <p className="font-mono font-bold text-cyan-300">312 km/h</p>
          </div>
          <div className="rounded bg-slate-950 p-1.5 border border-slate-800">
            <p className="text-slate-400">Rallies</p>
            <p className="font-mono font-bold text-white">48 Analyzed</p>
          </div>
          <div className="rounded bg-slate-950 p-1.5 border border-slate-800">
            <p className="text-slate-400">Highlight Reel</p>
            <p className="font-mono font-bold text-emerald-400">8 Moments</p>
          </div>
        </div>
      </div>

      {/* AI Coach Chat Snippet */}
      <div className="mt-2.5 rounded-lg bg-blue-950/30 p-2.5 border border-blue-800/40 text-[0.7rem]">
        <p className="font-bold text-cyan-300 flex items-center gap-1.5">
          <Bot className="size-3.5" /> AI Coach Timestamp Insight:
        </p>
        <p className="mt-1 text-slate-300 leading-relaxed">
          &ldquo;At [14:32], your footwork recovery was 0.38s delayed on backhand deep corner. Recommended drill:
          Split-step reaction drills.&rdquo;
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Court Position Heatmaps: Ready</span>
        <span>Turnaround: &lt; 90s</span>
      </div>
    </div>
  );
}

/* 12. BITS Sports Hub (Sports360-Style) Mockup */
function SportsHubMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Sports Venue HUD</span>
        </div>
        <span className="font-mono text-[0.68rem] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
          <Tv className="size-3" /> Overhead TV Active
        </span>
      </div>

      {/* Live Court Allocation Queuing Board */}
      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-emerald-500/30">
          <div>
            <p className="font-bold text-white">Court 1 (Badminton): In Progress</p>
            <p className="text-[0.65rem] text-slate-400">Set 2 (14 - 11) · Time Remaining: 18 mins</p>
          </div>
          <span className="font-mono text-[0.68rem] text-emerald-400 font-bold">MATCH ON</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div>
            <p className="font-bold text-white">Court 2 (Pickleball): Next Up</p>
            <p className="text-[0.65rem] text-cyan-300">Alpha Smashers vs. Net Raiders</p>
          </div>
          <span className="font-mono text-[0.68rem] text-cyan-300">CALLING PLAYERS</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <div>
            <p className="font-bold text-white">Queue Ticket #Q-08 (Metro Spikers)</p>
            <p className="text-[0.65rem] text-slate-400">Elo / DUPR: 1,420 · Waiting: 4 mins</p>
          </div>
          <span className="font-mono text-[0.68rem] text-amber-300">UP NEXT (COURT 3)</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Multi-Sport: Badminton / Padel / Pickleball</span>
        <span>Auto TV Refresh</span>
      </div>
    </div>
  );
}

/* 13. BITS Booking System Mockup */
function BookingMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CalendarCheck className="size-4 text-blue-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Booking & Reservations</span>
        </div>
        <span className="font-mono text-[0.68rem] text-blue-300">Hotels, Sports & Services</span>
      </div>

      <div className="mt-3 rounded-xl bg-slate-900 p-3 border border-slate-800 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div>
            <p className="font-bold text-white">Booking #BK-9021 · Executive Suite 402</p>
            <p className="text-[0.65rem] text-slate-400">Guest: Dr. Karen Cruz · Check-In: Today 14:00</p>
          </div>
          <span className="font-mono text-emerald-400 font-bold">CONFIRMED</span>
        </div>

        <div className="mt-2.5 space-y-1 text-[0.68rem] text-slate-300">
          <div className="flex justify-between">
            <span>Room/Court Allocation:</span>
            <span className="text-white font-mono">Reserved & Locked</span>
          </div>
          <div className="flex justify-between">
            <span>Deposit Escrow:</span>
            <span className="text-cyan-300 font-mono">₱2,500 Held via Tokenized Card</span>
          </div>
          <div className="flex justify-between">
            <span>Instant Mobile Pass:</span>
            <span className="text-emerald-400 font-mono">QR Dispatched via WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>PCI-DSS Tokenized Checkout</span>
        <span>Direct Sync with BITS Commerce</span>
      </div>
    </div>
  );
}

/* 14. BITS Smart Queuing System Mockup */
function QueuingMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Ticket className="size-4 text-rose-400" />
          <span className="font-mono text-xs font-bold text-white">BITS Smart Queuing Core</span>
        </div>
        <span className="font-mono text-[0.68rem] text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
          Retail, Clinic & Sports Venue
        </span>
      </div>

      {/* Overhead TV Display Card */}
      <div className="mt-3 rounded-xl bg-gradient-to-r from-rose-950/40 to-slate-900 p-3 border border-rose-500/30 text-center">
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Now Serving</p>
        <div className="text-3xl font-extrabold text-cyan-300 font-mono tracking-wider mt-0.5">
          TICKET #A-042
        </div>
        <p className="text-xs font-bold text-white mt-1">
          Please Proceed to: <span className="text-emerald-400">Counter 3 (Collections Specialist)</span>
        </p>
      </div>

      {/* Queue Velocity & Next In Line */}
      <div className="mt-3 space-y-1.5 text-[0.7rem]">
        <div className="flex justify-between items-center rounded-lg bg-slate-900 p-2 border border-slate-800">
          <span className="text-slate-300">Next In Line: #A-043 (Wait: ~3 min)</span>
          <span className="font-mono text-cyan-300">Paging SMS Dispatched</span>
        </div>
        <div className="flex justify-between items-center rounded-lg bg-slate-900 p-2 border border-slate-800">
          <span className="text-slate-300">Floor Flow: 8 Tellers Active</span>
          <span className="font-mono text-emerald-400">Avg Wait: 4.2 mins</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Virtual QR Code Mobile Passes</span>
        <span>Zero App Installation</span>
      </div>
    </div>
  );
}

/* 15. BITS RAG Enterprise Knowledge Engine Mockup */
function RagEngineMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-950 p-4 font-sans text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-indigo-400" />
          <span className="font-mono text-xs font-bold text-white">BITS RAG Knowledge Layer</span>
        </div>
        <span className="font-mono text-[0.68rem] text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
          148,200 Vector Embeddings
        </span>
      </div>

      {/* Query & Retrieval Trace */}
      <div className="mt-3 space-y-2 text-xs">
        <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800">
          <p className="text-[0.65rem] font-bold text-slate-400">Real-Time Ingestion Pipeline</p>
          <p className="text-white mt-0.5">Policy PDFs + Collections SOPs + ERP Stock Database</p>
        </div>

        <div className="rounded-xl bg-blue-950/30 p-2.5 border border-blue-500/30 text-[0.7rem]">
          <div className="flex justify-between items-center text-cyan-300 font-bold mb-1">
            <span>Query: &ldquo;Statutory Quiet Hours for Debt Collections&rdquo;</span>
            <span className="font-mono text-[0.65rem] text-emerald-400">Latency: 118ms</span>
          </div>
          <p className="text-slate-300 text-[0.65rem] leading-relaxed">
            Matched 3 chunks (Cosine sim 0.94) → Grounded output cite:{" "}
            <span className="text-cyan-400 font-mono">BSP Circular 454/857 §3.2</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-[0.65rem] text-slate-400">
        <span>Universal Connector for BITSagent & CRM</span>
        <span>Zero Hallucinations</span>
      </div>
    </div>
  );
}
