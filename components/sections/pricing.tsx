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
} from "lucide-react";

const universalGuarantees = [
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
    icon: Server,
    label: "Data Integrity",
    detail: "256-Bit TLS & Audits",
    subtext: "Tamper-evident logs",
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
                Modular Solution Packages
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Technology Sized to Your Operation
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600">
              BITS solutions are modular operational paths, not rigid licensing templates.
              Select a baseline configuration and tailor modules, dialing volume, and AI agents around your exact floor workflows.
            </p>
          </Reveal>

          {/* Operational Audience Filter Tabs */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
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
                  "cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
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
                  "cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
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
                  "cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200",
                  activeTab === "enterprise"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                Enterprise / Banks
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3 Solution Tiers Grid with Strict Alignment & Spacing */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {solutionPackages.map((pkg, i) => {
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
                        <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-white shadow-xs">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5 text-cyan-400" />
                            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-cyan-300">
                              Sovereign & Dedicated SLA
                            </span>
                          </div>
                          <span className="font-mono text-[0.65rem] font-semibold text-slate-300">
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

                      {/* Operational Deployment Scope Box (Consistent Height) */}
                      <div
                        className={cn(
                          "mt-5 min-h-[7.5rem] rounded-2xl border p-4 transition-colors",
                          isPopular
                            ? "border-blue-200/90 bg-blue-50/70"
                            : "border-slate-150 bg-slate-50/80"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                            Deployment Scope
                          </p>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold text-emerald-700">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Scoped
                          </span>
                        </div>

                        <p className="mt-1.5 text-sm font-bold text-slate-900">
                          {pkg.pricingModel}
                        </p>
                        <p className="mt-0.5 text-[0.72rem] text-slate-500 leading-normal">
                          {pkg.pricingSubtext}
                        </p>

                        <div className="mt-3 flex items-center gap-2 border-t border-slate-200/70 pt-2.5 text-[0.72rem] font-medium text-slate-700">
                          <span className="size-1.5 rounded-full bg-blue-500" />
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
                            "group flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98]",
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

        {/* Interactive Feature Matrix Accordion Toggle */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 max-w-6xl text-center">
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-blue-400 hover:text-blue-600 hover:shadow-sm active:scale-[0.98]"
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
              <div className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      Full Capability & Statutory SLA Comparison
                    </h3>
                    <p className="text-xs text-slate-300">
                      Transparent technical evaluation for Operations Heads, CTOs, and Compliance Directors.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-blue-500/20 px-3 py-1 font-mono text-[0.7rem] font-semibold text-cyan-300 border border-cyan-400/30">
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

            <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
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
          </div>
        </Reveal>

        {/* Sovereign Private VPC / On-Premises Callout Banner */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-blue-900/30 bg-gradient-to-r from-slate-950 via-[#071739] to-slate-950 p-6 text-white shadow-xl shadow-blue-950/20 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-cyan-300">
                    Custom Sovereign & On-Premises Architecture
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                  Require private cloud data residency, custom banking ETLs, or bespoke CRM schemas?
                </h3>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-300">
                  Our engineering team works under mutual NDA to design custom digital infrastructure, proprietary scoring workflows, and dedicated telco interconnects.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/35 active:scale-[0.98]"
              >
                <span>Request Architecture Review</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
