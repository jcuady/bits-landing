"use client";

import * as React from "react";
import Link from "next/link";
import { solutionPackages, pricingComparisonMatrix } from "@/lib/site";
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
  const [activeTab, setActiveTab] = React.useState<"all" | "starter" | "growth" | "enterprise">("all");
  const [currency, setCurrency] = React.useState<"PHP" | "USD">("PHP");
  const [showMatrix, setShowMatrix] = React.useState(false);

  return (
    <Section id="solutions" className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-28">
      {/* Anchor alias for backwards compatibility */}
      <div id="pricing" className="sr-only" />

      {/* Subtle architectural ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
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
                Transparent Solution Investment
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Technology Sized to Your Operation
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600">
              BITS solutions are modular operational paths deployable via <strong className="font-semibold text-slate-900">Managed Cloud (Recommended for 1–2 week activation)</strong> or <strong className="font-semibold text-slate-900">On-Premises</strong>. Every tier includes continuous architectural improvements, CVE patching, and security updates.
            </p>
          </Reveal>

          {/* Operational Audience Filter Tabs + Currency Switcher */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between max-w-4xl">
              {/* Audience Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "inline-flex min-h-[44px] items-center cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
                    activeTab === "all"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  All Packages
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("starter")}
                  className={cn(
                    "inline-flex min-h-[44px] items-center cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
                    activeTab === "starter"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  1 – 15 Seats (Starter)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("growth")}
                  className={cn(
                    "inline-flex min-h-[44px] items-center cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
                    activeTab === "growth"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  16 – 100+ Floor (Growth)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("enterprise")}
                  className={cn(
                    "inline-flex min-h-[44px] items-center cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
                    activeTab === "enterprise"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  Enterprise / Banks
                </button>
              </div>

              {/* Currency Switcher */}
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setCurrency("PHP")}
                  className={cn(
                    "inline-flex min-h-[36px] min-w-[76px] items-center justify-center rounded-full px-3 py-1 font-mono text-xs font-bold transition-all",
                    currency === "PHP"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  🇵🇭 ₱ PHP
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={cn(
                    "inline-flex min-h-[36px] min-w-[76px] items-center justify-center rounded-full px-3 py-1 font-mono text-xs font-bold transition-all",
                    currency === "USD"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  🇺🇸 $ USD
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3 Solution Tiers Grid with Strict Alignment & Spacing */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {solutionPackages.filter((pkg) => pkg.id !== "whitelabel").map((pkg, i) => {
            const isPopular = pkg.popular;
            const isEnterprise = pkg.id === "enterprise";
            const isDimmed = activeTab !== "all" && activeTab !== pkg.id;

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
                              Sovereign & Dedicated SLA
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

                      {/* Tier Title (Consistent Height) */}
                      <h3 className="mt-4 flex min-h-[3.25rem] items-center text-xl font-bold tracking-tight text-slate-900 sm:text-[1.35rem]">
                        {pkg.title}
                      </h3>

                      {/* Tagline / Audience (Consistent Height) */}
                      <p className="mt-2 min-h-[2.75rem] text-xs leading-relaxed text-slate-600">
                        {pkg.tagline}
                      </p>

                      {/* Price & Billing Scope Block */}
                      <div
                        className={cn(
                          "mt-5 rounded-2xl border p-4 transition-colors",
                          isPopular
                            ? "border-blue-200/90 bg-blue-50/70"
                            : "border-slate-150 bg-slate-50/80"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                            Indicative Investment
                          </p>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold text-emerald-700">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Transparent ROI
                          </span>
                        </div>

                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="font-mono text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                            {currency === "PHP" ? pkg.pricePhp : pkg.priceUsd}
                          </span>
                          <span className="text-[0.75rem] font-medium text-slate-500">
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
                          Included Capabilities & Deliverables
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

                    {/* Card Bottom CTA & Footnote (Strict Bottom Alignment) */}
                    <div className="mt-8 border-t border-slate-100 pt-5">
                      <Magnetic className="w-full">
                        <Link
                          href="/#contact"
                          className={cn(
                            "group flex h-12 min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98]",
                            isPopular
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/35"
                              : isEnterprise
                                ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md"
                                : "border border-slate-300 bg-white text-slate-900 shadow-2xs hover:bg-slate-50 hover:border-slate-400"
                          )}
                        >
                          <span>{pkg.primaryCta}</span>
                          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </Magnetic>
                      <p className="mt-2.5 text-center text-[0.68rem] text-slate-400">
                        Technical architecture included · Zero lock-in
                      </p>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── BITS TAP NFC SMART BUSINESS CARD TIER ── */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white shadow-xl shadow-emerald-900/5">
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-emerald-700">
                    Hardware + Digital Smart Card Solution
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                  BITS Tap™ NFC Digital Business Card — 1 Card for Lifetime Networking
                </h3>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600">
                  Eliminate recurring paper card printing forever. Tap on any iPhone or Android to instantly share your verified vCard, company website, portfolio, and social channels. Real-time cryptographic remote lock and revocation if a card is lost. Zero recurring monthly subscription fees for individual cards.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-extrabold text-slate-900">
                      {currency === "PHP" ? "₱1,499" : "$28"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">one-time / card</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-xs text-slate-600">
                    <strong className="text-emerald-700 font-bold">Corporate Batch (25+ Cards):</strong>{" "}
                    {currency === "PHP" ? "₱999" : "$18"} / card with centralized team directory admin
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "1 Card Only Needed",
                    "Zero Monthly Subscription",
                    "Instant Remote Lock If Lost",
                    "Tap to Share vCard & Socials",
                    "Dynamic Live Cloud Profile",
                    "Custom Corporate Matte / Metal",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-emerald-800"
                    >
                      <Check className="size-2.5 text-emerald-600 stroke-[3]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/products/nfc-card"
                  className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 text-xs font-bold text-emerald-700 shadow-2xs transition-all hover:bg-emerald-50 active:scale-[0.98]"
                >
                  <span>Explore NFC Tech Specs</span>
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-xs font-bold text-white shadow-md shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
                >
                  <span>Order Executive Cards</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── WHITE LABEL ADD-ON CALLOUT ── */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50/80 via-amber-50/60 to-white shadow-xl shadow-orange-900/5">
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-orange-700">
                    White Label & Custom Branding Add-On
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                  Launch BITS products under your own brand — logo, domain, and color identity
                </h3>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600">
                  Any BITS product can be deployed as a fully white-labeled platform under your company&apos;s branding. Ideal for software resellers, enterprise groups, and agencies that want to own the client relationship. Zero mention of BITS required. NDA-protected.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-extrabold text-slate-900">
                      {currency === "PHP" ? "₱35,000" : "$650"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">one-time branding onboarding</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-xs text-slate-600">
                    <strong className="text-orange-700 font-bold">Reseller License:</strong> Deploy across unlimited client sub-accounts with 100% markup flexibility
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Custom Domain & SSL",
                    "Logo & Brand Colors",
                    "NDA-Protected",
                    "Reseller Licensing",
                    "Full Help Center Rebranding",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-orange-800"
                    >
                      <Palette className="size-2.5 text-orange-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/products/white-label"
                  className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white px-5 text-xs font-bold text-orange-700 shadow-2xs transition-all hover:bg-orange-50 active:scale-[0.98]"
                >
                  <Palette className="size-3.5 text-orange-600" />
                  <span>View White Label Specs</span>
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 text-xs font-bold text-white shadow-md shadow-orange-600/25 transition-all hover:bg-orange-700 active:scale-[0.98]"
                >
                  <span>Request White Label Proposal</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive Feature Matrix Accordion Toggle */}
        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 max-w-6xl text-center">
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
              {showMatrix ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
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
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      Full Capability & Statutory SLA Comparison
                    </h3>
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
                            <td className="p-4 pl-6 font-medium text-slate-800">
                              {feat.name}
                            </td>
                            <td className="p-4 text-slate-600">
                              {feat.starter}
                            </td>
                            <td className="p-4 font-semibold text-blue-700 bg-blue-50/20">
                              {feat.growth}
                            </td>
                            <td className="p-4 pr-6 font-semibold text-slate-900">
                              {feat.enterprise}
                            </td>
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

        {/* Universal Guarantees Trust Strip with Icons */}
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
                    <p className="text-xs font-bold text-slate-900">
                      {item.detail}
                    </p>
                    <p className="text-[0.68rem] text-slate-500">
                      {item.subtext}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 border-t border-slate-100 pt-3 text-center text-[0.68rem] text-slate-500">
              * Continuous system improvements and proactive security updates included in every plan. Custom bespoke feature requests and specialized ERP connectors scoped upon request (costs vary by complexity).
            </p>
          </div>
        </Reveal>

        {/* Sovereign Private VPC / On-Premises Callout Banner: Light Mode */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-white p-6 text-slate-900 shadow-xl shadow-blue-900/5 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-blue-700">
                    Custom Sovereign & On-Premises Architecture
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                  Require private cloud data residency, custom banking ETLs, or bespoke CRM schemas?
                </h3>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600">
                  Our engineering team works under mutual NDA to design custom digital infrastructure, proprietary scoring workflows, and dedicated telco interconnects.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/#deployment"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 text-xs font-bold text-blue-700 shadow-2xs transition-all hover:bg-blue-50 active:scale-[0.98]"
                >
                  <Server className="size-3.5 text-blue-600" />
                  <span>Cloud vs. On-Prem Specs</span>
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.98]"
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
