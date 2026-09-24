"use client";

import * as React from "react";
import Link from "next/link";
import {
  solutionPackages,
  pricingComparisonMatrix,
  bitsProducts,
  suiteBundlePresets,
} from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Activity,
  Lock,
  Headphones,
  Sliders,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Server,
  Cloud,
  Palette,
  Layers,
  Radio,
  Boxes,
  CheckCircle2,
  Workflow,
  Cpu,
} from "lucide-react";

const universalGuarantees = [
  {
    icon: Cloud,
    label: "Flexible Deployment",
    detail: "Cloud (Recommended) or On-Prem",
    subtext: "Bare-metal or 1–2 wk cloud",
  },
  {
    icon: Sparkles,
    label: "Continuous Evolution",
    detail: "Security & Tech Updates",
    subtext: "Bespoke requests on demand*",
  },
  {
    icon: Activity,
    label: "High-Availability SLA",
    detail: "99.9% Telephony Uptime",
    subtext: "Carrier-grade SIP routing",
  },
  {
    icon: ShieldCheck,
    label: "Statutory Alignment",
    detail: "BSP & NPC DPA Principles",
    subtext: "Circulars 454/857, RA 10173",
  },
  {
    icon: Lock,
    label: "Granular Security",
    detail: "Strict RBAC Permissions",
    subtext: "Supervisor separation of duties",
  },
  {
    icon: Headphones,
    label: "Assisted Rollout",
    detail: "Migration & Training",
    subtext: "Direct engineering support",
  },
] as const;

export function Pricing() {
  const [activeTierFilter, setActiveTierFilter] = React.useState<
    "all" | "starter" | "growth" | "enterprise"
  >("all");
  const [showMatrix, setShowMatrix] = React.useState(false);

  // Multi-Product Bundle Builder State
  const [selectedProductIds, setSelectedProductIds] = React.useState<string[]>([
    "collections",
    "ai-agent",
    "rag-engine",
  ]);
  const [activePreset, setActivePreset] = React.useState<string>("collections-bpo");
  const [bundleDeployment, setBundleDeployment] = React.useState<"cloud" | "on-prem">("cloud");

  // Handle preset selection
  const handleSelectPreset = (presetId: string) => {
    setActivePreset(presetId);
    const preset = suiteBundlePresets.find((p) => p.id === presetId);
    if (preset) {
      setSelectedProductIds([...preset.productIds]);
    }
  };

  // Toggle individual product selection
  const handleToggleProduct = (productId: string) => {
    setActivePreset("custom");
    setSelectedProductIds((prev) => {
      if (prev.includes(productId)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Product categories for the bundling matrix
  const productGroups = [
    {
      group: "CRM & Telephony",
      products: bitsProducts.filter((p) =>
        ["collections", "sales", "support", "marketing", "commerce"].includes(p.id)
      ),
    },
    {
      group: "Autonomous AI",
      products: bitsProducts.filter((p) =>
        ["ai-agent", "rag-engine"].includes(p.id)
      ),
    },
    {
      group: "ERP & Operations",
      products: bitsProducts.filter((p) =>
        ["accounting", "hrms", "payroll", "construction", "inventory", "logistics"].includes(p.id)
      ),
    },
    {
      group: "Venues, Hubs & Identity",
      products: bitsProducts.filter((p) =>
        ["pickleball", "sports-hub", "booking", "queuing", "nfc-card"].includes(p.id)
      ),
    },
  ];

  return (
    <Section id="solutions" className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-28">
      {/* Anchor alias for backwards compatibility */}
      <div id="pricing" className="sr-only" />

      {/* Subtle architectural ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.08),transparent_75%)]" />
        <div className="absolute left-1/2 -top-24 size-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-3xl" />
        <div className="absolute inset-0 bg-grid-light opacity-60" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Modular Enterprise Investment · Flexible Scoping
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Technology Sized to Your Operation
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-3xl text-pretty text-slate-600">
              Avail individual engines or combine our 18 enterprise products into a unified, single-tenant or cloud operational cockpit. We do not enforce rigid, inflated per-seat pricing. Every deployment is scoped directly to your team size, transaction volume, and regulatory mandates.
            </p>
          </Reveal>
        </div>

        {/* ── FEATURE 1: INTERACTIVE PRODUCT COMBINATION & SOLUTION BUILDER ── */}
        <div className="mx-auto mt-12 max-w-6xl">
          <Reveal delay={0.08}>
            {/* Outer Doppelrand Shell */}
            <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 p-2 sm:p-3 ring-1 ring-slate-900/[0.08] shadow-2xl backdrop-blur-xl">
              {/* Inner Workstation Core */}
              <div className="overflow-hidden rounded-[calc(2.5rem-8px)] sm:rounded-[calc(2.5rem-12px)] border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs">
                {/* Workstation Header Bar */}
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]" aria-hidden />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]" aria-hidden />
                      <span className="size-2.5 rounded-full bg-[#27C93F]" aria-hidden />
                      <span className="ml-2 font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                        BITS Modular Architecture &amp; Solution Stacking Studio
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600">
                      Click any product below to combine into your organization&apos;s custom operational stack.
                    </p>
                  </div>

                  {/* Deployment Choice Toggle for the Bundle */}
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => setBundleDeployment("cloud")}
                      className={cn(
                        "inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
                        bundleDeployment === "cloud"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      <Cloud className="size-3.5" />
                      <span>Managed Cloud</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBundleDeployment("on-prem")}
                      className={cn(
                        "inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
                        bundleDeployment === "on-prem"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      <Server className="size-3.5" />
                      <span>On-Premises / Sovereign</span>
                    </button>
                  </div>
                </div>

                {/* Quick Presets Strip */}
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Quick Solution Presets:
                    </span>
                    <span className="text-[0.68rem] text-blue-700 font-semibold">
                      Click to load proven industry stacks
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suiteBundlePresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        className={cn(
                          "inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all",
                          activePreset === preset.id
                            ? "border-blue-600 bg-blue-50/90 text-blue-700 shadow-2xs ring-1 ring-blue-500/20"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                        )}
                      >
                        <Workflow className="size-3 text-blue-600" />
                        <span>{preset.name}</span>
                        <span className="rounded-full bg-slate-100 px-1.5 py-0.2 text-[0.62rem] font-mono text-slate-600">
                          {preset.productIds.length}
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setActivePreset("all-18");
                        setSelectedProductIds(bitsProducts.map((p) => p.id));
                      }}
                      className={cn(
                        "inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all",
                        activePreset === "all-18"
                          ? "border-indigo-600 bg-indigo-50/90 text-indigo-700 shadow-2xs ring-1 ring-indigo-500/20"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                      )}
                    >
                      <Boxes className="size-3 text-indigo-600" />
                      <span>Full Sovereign Platform (All 18)</span>
                    </button>
                  </div>
                </div>

                {/* 18 Products Interactive Selection Grid */}
                <div className="mt-8 space-y-6">
                  {productGroups.map((group) => (
                    <div key={group.group}>
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          {group.group}
                        </span>
                        <span className="text-[0.65rem] text-slate-400">
                          ({group.products.length} Modular Engines)
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                        {group.products.map((product) => {
                          const isSelected = selectedProductIds.includes(product.id);
                          return (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleToggleProduct(product.id)}
                              className={cn(
                                "group relative flex min-h-[58px] cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all duration-200",
                                isSelected
                                  ? "border-blue-600 bg-blue-50/50 shadow-2xs ring-1 ring-blue-500/20"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                              )}
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={cn(
                                      "flex size-4.5 shrink-0 items-center justify-center rounded-md border text-white transition-colors",
                                      isSelected
                                        ? "border-blue-600 bg-blue-600"
                                        : "border-slate-300 bg-white group-hover:border-slate-400"
                                    )}
                                  >
                                    {isSelected && <Check className="size-3 stroke-[3]" />}
                                  </div>
                                  <span className="text-xs font-bold text-slate-900 leading-tight">
                                    {product.name}
                                  </span>
                                </div>
                              </div>
                              <p className="mt-1 text-[0.68rem] text-slate-500 line-clamp-1">
                                {product.tagline}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Solution Architecture HUD & Direct Consultative CTA Bar */}
                <div className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-600 px-3 py-1 font-mono text-[0.7rem] font-bold text-white shadow-2xs">
                          {selectedProductIds.length} Products Active in Stack
                        </span>
                        <span className="font-mono text-xs font-semibold text-blue-700">
                          Unified Single Sign-On (SSO) &amp; Shared Data Model
                        </span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800 border border-emerald-200">
                          {bundleDeployment === "cloud" ? "Managed Cloud" : "On-Premises Bare-Metal"}
                        </span>
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                          <span>Zero per-seat penalties</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                          <span>Inter-engine automated webhooks</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                          <span>99.9% Telephony &amp; API SLA</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                          <span>Continuous security &amp; CVE patches</span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        <strong>Investment Model:</strong> Modular consultative licensing based on your operational volume, floor headcount, and deployment tier.
                      </p>
                    </div>

                    {/* High-Converting Button-in-Button CTA */}
                    <div className="shrink-0">
                      <Magnetic>
                        <Link
                          href={`/#contact?bundle=${encodeURIComponent(
                            selectedProductIds.join(",")
                          )}&deployment=${bundleDeployment}`}
                          className="group relative inline-flex min-h-[48px] items-center justify-between gap-3 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/35 active:scale-[0.98]"
                        >
                          <span>Request Proposal for Selected Stack ({selectedProductIds.length} Products)</span>
                          <span className="flex size-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <ArrowRight className="size-3.5" />
                          </span>
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── FEATURE 2: CONSULTATIVE SOLUTION TIERS CARDS ── */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Turnkey Baseline Tiers
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Select an indicative deployment scope below, or combine custom capabilities above.
            </p>
          </div>

          {/* Operational Audience Filter Tabs */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
            {(["all", "starter", "growth", "enterprise"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTierFilter(tab)}
                className={cn(
                  "inline-flex min-h-[44px] items-center cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all duration-200",
                  activeTierFilter === tab
                    ? "bg-slate-900 text-white shadow-xs"
                    : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                {tab === "all"
                  ? "All Packages"
                  : tab === "starter"
                  ? "1 – 15 Seats (Starter)"
                  : tab === "growth"
                  ? "16 – 100+ Floor (Growth)"
                  : "Enterprise / Banks"}
              </button>
            ))}
          </div>

          {/* 3 Solution Tiers Grid with Strict Alignment & Spacing */}
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
            {solutionPackages
              .filter((pkg) => pkg.id !== "whitelabel")
              .map((pkg, i) => {
                const isPopular = pkg.popular;
                const isEnterprise = pkg.id === "enterprise";
                const isDimmed = activeTierFilter !== "all" && activeTierFilter !== pkg.id;

                return (
                  <Reveal
                    key={pkg.id}
                    delay={0.06 * i}
                    className={cn(
                      "flex flex-col transition-all duration-300",
                      isDimmed ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100"
                    )}
                  >
                    {/* Outer wrapper: For popular card, radiant gradient border; standard for others */}
                    <div
                      className={cn(
                        "flex h-full flex-col rounded-[2.25rem] transition-all duration-300",
                        isPopular
                          ? "p-[2px] bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-400 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.22)] ring-4 ring-blue-500/10"
                          : "border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/5"
                      )}
                    >
                      <article
                        className={cn(
                          "relative flex h-full flex-col justify-between rounded-[2.125rem] p-7 transition-colors sm:p-8",
                          isPopular
                            ? "bg-gradient-to-b from-blue-50/50 via-white to-white"
                            : "bg-white"
                        )}
                      >
                        {/* Top Content Area */}
                        <div>
                          {/* Synchronized Top Banner for 100% Horizontal Parity */}
                          {isPopular ? (
                            <div className="mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-3.5 py-1.5 text-white shadow-xs">
                              <div className="flex items-center gap-1.5">
                                <Sparkles className="size-3.5 text-cyan-200" />
                                <span className="text-[0.68rem] font-bold uppercase tracking-wider">
                                  Recommended for Scaling Teams
                                </span>
                              </div>
                              <span className="size-1.5 rounded-full bg-white animate-pulse" />
                            </div>
                          ) : isEnterprise ? (
                            <div className="mb-4 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 text-indigo-900 shadow-2xs">
                              <div className="flex items-center gap-1.5">
                                <ShieldCheck className="size-3.5 text-indigo-600" />
                                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-indigo-800">
                                  Sovereign &amp; Dedicated SLA
                                </span>
                              </div>
                              <span className="font-mono text-[0.65rem] font-semibold text-indigo-700">
                                Bank-Grade
                              </span>
                            </div>
                          ) : (
                            <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-100/90 px-3.5 py-1.5 text-slate-700">
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-blue-500" />
                                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-700">
                                  Core Operational Baseline
                                </span>
                              </div>
                              <span className="font-mono text-[0.65rem] font-semibold text-slate-500">
                                Boutique
                              </span>
                            </div>
                          )}

                          {/* Header Row: Tier Indicator & Team Scope Pill */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "size-2 rounded-full",
                                  isPopular
                                    ? "bg-blue-600 animate-pulse"
                                    : isEnterprise
                                    ? "bg-indigo-600"
                                    : "bg-slate-400"
                                )}
                                aria-hidden
                              />
                              <span
                                className={cn(
                                  "font-mono text-[0.75rem] font-bold uppercase tracking-wider",
                                  isPopular
                                    ? "text-blue-600"
                                    : isEnterprise
                                    ? "text-indigo-700"
                                    : "text-slate-600"
                                )}
                              >
                                {pkg.tier}
                              </span>
                            </div>

                            <span className="shrink-0 rounded-full border border-slate-200/90 bg-slate-100/90 px-3 py-1 font-mono text-[0.68rem] font-semibold text-slate-700">
                              {pkg.teamScope}
                            </span>
                          </div>

                          {/* Tier Title */}
                          <h4 className="mt-4 flex min-h-[3.25rem] items-center text-xl font-bold tracking-tight text-slate-900 sm:text-[1.35rem]">
                            {pkg.title}
                          </h4>

                          {/* Tagline / Audience */}
                          <p className="mt-2 min-h-[2.75rem] text-xs leading-relaxed text-slate-600">
                            {pkg.tagline}
                          </p>

                          {/* Consultative Investment & Scoping Scope Block (No Numeric Prices) */}
                          <div
                            className={cn(
                              "mt-5 rounded-2xl border p-4 transition-colors",
                              isPopular
                                ? "border-blue-200/90 bg-blue-50/70"
                                : "border-slate-150 bg-slate-50/80"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                                Licensing &amp; Investment Scope
                              </p>
                              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold text-emerald-700">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Transparent ROI
                              </span>
                            </div>

                            <div className="mt-2">
                              <span className="font-mono text-lg font-bold tracking-tight text-slate-900 sm:text-xl block">
                                {pkg.investmentModel}
                              </span>
                              <span className="text-[0.75rem] font-medium text-slate-500 block mt-0.5">
                                {pkg.billingCadence}
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-1.5 border-t border-slate-200/60 pt-2 text-[0.72rem] font-medium text-slate-600">
                              <Sparkles className="size-3 text-blue-600 shrink-0" />
                              <span className="leading-tight">{pkg.roiBenchmark}</span>
                            </div>

                            <div className="mt-2 flex items-center gap-2 border-t border-slate-200/60 pt-2 text-[0.72rem] font-medium text-slate-700">
                              <span className="size-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span className="truncate">{pkg.deployment}</span>
                            </div>
                          </div>

                          {/* Feature Highlights List */}
                          <div className="mt-6 border-t border-slate-100 pt-5">
                            <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                              Included Capabilities &amp; Deliverables
                            </p>
                            <ul className="mt-3.5 space-y-3">
                              {pkg.highlights.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-xs text-slate-700">
                                  <span
                                    className={cn(
                                      "mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full text-[0.68rem]",
                                      isPopular
                                        ? "bg-blue-600 text-white shadow-2xs"
                                        : "bg-blue-50 text-blue-700 border border-blue-200/60"
                                    )}
                                    aria-hidden="true"
                                  >
                                    <Check className="size-3 stroke-[2.5]" />
                                  </span>
                                  <span className="font-medium leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Card Bottom CTA (Button-in-Button) */}
                        <div className="mt-8 border-t border-slate-100 pt-5">
                          <Magnetic className="w-full">
                            <Link
                              href={pkg.ctaHref}
                              className={cn(
                                "group flex h-12 w-full min-h-[48px] items-center justify-between rounded-full px-5 text-xs font-bold transition-all duration-300 active:scale-[0.98]",
                                isPopular
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 hover:bg-blue-700 hover:shadow-blue-600/35"
                                  : isEnterprise
                                  ? "bg-slate-900 text-white shadow-md shadow-slate-950/20 hover:bg-slate-800"
                                  : "border border-slate-300 bg-white text-slate-800 shadow-2xs hover:border-blue-600 hover:bg-blue-50/50 hover:text-blue-700"
                              )}
                            >
                              <span>{pkg.primaryCta}</span>
                              <span
                                className={cn(
                                  "flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                  isPopular || isEnterprise
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white"
                                )}
                              >
                                <ArrowRight className="size-3.5" />
                              </span>
                            </Link>
                          </Magnetic>

                          <p className="mt-3 text-center font-mono text-[0.68rem] text-slate-400">
                            {pkg.pricingSubtext}
                          </p>
                        </div>
                      </article>
                    </div>
                  </Reveal>
                );
              })}
          </div>
        </div>

        {/* ── BITS TAP NFC & WHITE LABEL RESELLER ADD-ONS ── */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          {/* BITS Tap NFC Card Callout */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white p-6 sm:p-7 shadow-sm">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-emerald-700">
                    Hardware + Digital Smart Card Solution
                  </span>
                </div>
                <h4 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                  BITS Tap™ Encrypted Smart NFC Cards — Single or Corporate Batch
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Replace traditional paper business cards with cryptographic titanium or matte smart cards. Single tap displays your live verified executive profile with 1-click vCard download, meeting schedulers, and payment links. Remote freeze available instantly if misplaced.
                </p>
                <div className="mt-3.5 rounded-xl border border-emerald-200/80 bg-white/80 p-3 text-xs">
                  <p className="font-semibold text-emerald-900">
                    <strong>Investment Model:</strong> Turnkey hardware provisioning with centralized cloud directory admin for teams. Zero recurring monthly individual fees.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-emerald-100 pt-4">
                <Link
                  href="/products/nfc-card"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-2xs"
                >
                  View NFC Hardware Specs
                </Link>
                <Link
                  href="/#contact?package=nfc"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <span>Order Executive Cards</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* White-Label Reseller Callout */}
          <Reveal delay={0.14}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-white p-6 sm:p-7 shadow-sm">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-orange-700">
                    White-Label &amp; Custom Branding Add-On
                  </span>
                </div>
                <h4 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                  Deploy Any BITS Product Under Your Own Agency Brand
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Deploy any combination of our 18 enterprise engines with your logo, custom domain (app.yourbrand.com), and corporate styling. Complete NDA protection with zero BITS attribution. Resell to clients under your own retainer contracts with 100% markup ownership.
                </p>
                <div className="mt-3.5 rounded-xl border border-orange-200/80 bg-white/80 p-3 text-xs">
                  <p className="font-semibold text-orange-900">
                    <strong>Investment Model:</strong> Turnkey reseller licensing scoped on top of any active engine tier. Wholesale infrastructure rates with total client pricing freedom.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-orange-100 pt-4">
                <Link
                  href="/products/white-label"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-orange-300 bg-white px-4 py-2 text-xs font-bold text-orange-800 hover:bg-orange-50 transition-colors shadow-2xs"
                >
                  <Palette className="size-3.5 mr-1" />
                  View White-Label Specs
                </Link>
                <Link
                  href="/#contact?package=whitelabel"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-5 py-2 text-xs font-bold text-white hover:bg-orange-700 transition-colors shadow-xs"
                >
                  <span>Request White-Label Proposal</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── INTERACTIVE FEATURE MATRIX TOGGLE ── */}
        <Reveal delay={0.16}>
          <div className="mx-auto mt-12 max-w-6xl text-center">
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-blue-400 hover:text-blue-600 hover:shadow-sm active:scale-[0.98]"
            >
              <Sliders className="size-3.5 text-blue-600" />
              <span>
                {showMatrix
                  ? "Hide Detailed Capability Comparison Matrix"
                  : "Compare All 21 Capabilities & SLA Specifications Side-by-Side"}
              </span>
              {showMatrix ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </button>
          </div>
        </Reveal>

        {/* Detailed Side-by-Side Comparison Matrix */}
        {showMatrix && (
          <Reveal delay={0.05}>
            <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-950/5">
              <div className="border-b border-slate-200 bg-slate-50/90 px-6 py-5 text-slate-900">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                      Full Capability &amp; Statutory SLA Comparison
                    </h4>
                    <p className="text-xs text-slate-600">
                      Transparent technical evaluation for Operations Heads, CTOs, and Compliance Directors.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 font-mono text-[0.7rem] font-bold text-blue-700 border border-blue-200">
                    21 Scoped Deliverables
                  </span>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                      <th className="p-4 pl-6 font-bold uppercase tracking-wider text-[0.7rem] text-slate-400">
                        Operational Capability
                      </th>
                      <th className="p-4 font-bold text-slate-900 w-1/4">
                        Starter Tier
                        <span className="block font-mono text-[0.65rem] font-normal text-slate-500">1–15 Seats</span>
                      </th>
                      <th className="p-4 font-bold text-blue-600 w-1/4 bg-blue-50/40">
                        Growth Tier
                        <span className="block font-mono text-[0.65rem] font-normal text-blue-500">16–100+ Seats</span>
                      </th>
                      <th className="p-4 pr-6 font-bold text-slate-900 w-1/4">
                        Enterprise Tier
                        <span className="block font-mono text-[0.65rem] font-normal text-slate-500">100+ Seats / Sovereign</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-700">
                    {pricingComparisonMatrix.map((section) => (
                      <React.Fragment key={section.category}>
                        <tr className="bg-slate-100/70">
                          <td
                            colSpan={4}
                            className="px-6 py-2.5 font-bold uppercase tracking-wider text-[0.68rem] text-slate-500"
                          >
                            {section.category}
                          </td>
                        </tr>
                        {section.features.map((feat) => (
                          <tr key={feat.name} className="transition-colors hover:bg-slate-50/70">
                            <td className="p-4 pl-6 font-medium text-slate-800">{feat.name}</td>
                            <td className="p-4 text-slate-600">{feat.starter}</td>
                            <td className="p-4 font-semibold text-blue-700 bg-blue-50/20">{feat.growth}</td>
                            <td className="p-4 pr-6 font-semibold text-slate-900">{feat.enterprise}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        )}

        {/* Universal Technical Guarantees Strip */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-6xl rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-blue-600" />
                <span className="text-[0.72rem] font-bold uppercase tracking-widest text-slate-500">
                  Universal Technical Standards in Every BITS Deployment
                </span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[0.68rem] font-semibold text-emerald-700 border border-emerald-200/60">
                100% Policy-Enforced
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {universalGuarantees.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Icon className="size-3.5 shrink-0" />
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 truncate">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-slate-900">{item.detail}</p>
                    <p className="text-[0.68rem] text-slate-500">{item.subtext}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 border-t border-slate-100 pt-3 text-center text-[0.68rem] text-slate-500">
              * Continuous system improvements and proactive security updates included in every plan. Custom bespoke feature requests and specialized ERP connectors scoped upon request (costs vary by complexity).
            </p>
          </div>
        </Reveal>

        {/* Final Consultative Architecture Callout */}
        <Reveal delay={0.24}>
          <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-white p-6 text-slate-900 shadow-xl shadow-blue-900/5 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-blue-700">
                    Custom Sovereign &amp; Multi-Product Architecture
                  </span>
                </div>
                <h4 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                  Require private cloud data residency, custom banking ETLs, or bespoke CRM schemas?
                </h4>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600">
                  Our engineering team works under mutual NDA to design custom digital infrastructure, proprietary scoring workflows, and dedicated telco interconnects tailored to your exact stack.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/#deployment"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 text-xs font-bold text-blue-700 shadow-2xs transition-all hover:bg-blue-50 active:scale-[0.98]"
                >
                  <Server className="size-3.5 text-blue-600" />
                  <span>Cloud vs. On-Prem Specs</span>
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.98]"
                >
                  <span>Request Architecture Review</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
