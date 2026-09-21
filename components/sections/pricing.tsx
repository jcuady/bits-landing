"use client";

import * as React from "react";
import Link from "next/link";
import { solutionPackages } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const universalGuarantees = [
  { label: "High-Availability SLA", detail: "99.9% Telephony Uptime" },
  { label: "Regulatory Alignment", detail: "BSP & NPC DPA Principles" },
  { label: "Access Security", detail: "Granular Role-Based Access (RBAC)" },
  { label: "Data Integrity", detail: "256-Bit TLS & Immutable Audits" },
  { label: "Onboarding Support", detail: "Assisted Migration & Floor Training" },
] as const;

export function Pricing() {
  const [activeTab, setActiveTab] = React.useState<"all" | "starter" | "growth" | "enterprise">("all");

  return (
    <Section id="solutions" className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      {/* Anchor alias for backwards compatibility */}
      <div id="pricing" className="sr-only" />

      {/* Subtle architectural ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(59,130,246,0.08),transparent)]" />
        <div className="absolute left-1/2 -top-24 size-[600px] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-500/15 bg-white px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
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

          {/* Audience Filter Pills for Fast Evaluation */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                  activeTab === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                All Packages
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("starter")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                  activeTab === "starter"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                1 – 15 Seats (Starter)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("growth")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                  activeTab === "growth"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                16 – 100+ Floor (Growth)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("enterprise")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                  activeTab === "enterprise"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                Enterprise / Banks
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3 Solution Tiers Grid */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-3 lg:gap-8">
          {solutionPackages.map((pkg, i) => {
            const isPopular = pkg.popular;
            const isDimmed = activeTab !== "all" && activeTab !== pkg.id;

            return (
              <Reveal
                key={pkg.id}
                delay={0.06 * i}
                className={cn(
                  "flex transition-all duration-300",
                  isDimmed ? "opacity-35 scale-[0.98]" : "opacity-100 scale-100"
                )}
              >
                <article
                  className={cn(
                    "relative flex w-full flex-col justify-between rounded-[2rem] p-7 transition-all duration-300 sm:p-9",
                    isPopular
                      ? "border-2 border-blue-600 bg-gradient-to-b from-blue-50/40 via-white to-white shadow-2xl shadow-blue-600/12 ring-4 ring-blue-500/10 lg:-translate-y-3"
                      : "border border-slate-200/90 bg-white/95 shadow-sm hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/5"
                  )}
                >
                  {/* Top Floating Badge for Growth Card */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-blue-600/25 ring-2 ring-white">
                        <span className="size-1.5 rounded-full bg-white animate-pulse" aria-hidden />
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Top Content Group */}
                  <div>
                    {/* Header Row: Tier Code & Audience Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-mono text-xs font-bold uppercase tracking-widest",
                          isPopular ? "text-blue-600" : "text-slate-500"
                        )}
                      >
                        TIER // {pkg.tier}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[0.68rem] font-semibold text-slate-600">
                        {pkg.teamScope}
                      </span>
                    </div>

                    {/* Tier Title */}
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      {pkg.title}
                    </h3>

                    {/* Tagline */}
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {pkg.tagline}
                    </p>

                    {/* Operational Scope Container */}
                    <div
                      className={cn(
                        "mt-5 rounded-2xl border p-4 transition-colors",
                        isPopular
                          ? "border-blue-200/80 bg-blue-50/60"
                          : "border-slate-100 bg-slate-50/70"
                      )}
                    >
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                        Deployment Scope
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {pkg.pricingModel}
                      </p>
                      <p className="mt-0.5 text-[0.72rem] text-slate-500">
                        {pkg.pricingSubtext}
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5 border-t border-slate-200/60 pt-2 text-[0.72rem] font-medium text-slate-600">
                        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                        <span>{pkg.deployment}</span>
                      </div>
                    </div>

                    {/* Feature Highlights List */}
                    <div className="mt-7 border-t border-slate-100 pt-6">
                      <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                        Included Platform Capabilities
                      </p>
                      <ul className="mt-3.5 space-y-3">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-xs text-slate-700">
                            <span
                              className={cn(
                                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold",
                                isPopular
                                  ? "bg-blue-600 text-white shadow-xs"
                                  : "bg-blue-50 text-blue-600"
                              )}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span className="font-medium leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-9 pt-4 border-t border-slate-100">
                    <Magnetic className="w-full">
                      <Link
                        href="/#contact"
                        className={cn(
                          "group flex h-12 w-full items-center justify-center gap-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-[0.98]",
                          isPopular
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/35"
                            : "border border-slate-200/90 bg-white text-slate-800 shadow-2xs hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                        )}
                      >
                        <span>{pkg.primaryCta}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </Link>
                    </Magnetic>
                    <p className="mt-2.5 text-center text-[0.68rem] text-slate-400">
                      Technical blueprint included · Zero free trial lock-in
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Universal Guarantees Trust Strip */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                Guaranteed in Every BITS Deployment
              </span>
              <span className="font-mono text-[0.68rem] font-semibold text-emerald-600">
                100% Policy-Enforced
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {universalGuarantees.map((item) => (
                <div key={item.label} className="space-y-0.5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Custom Sovereign / On-Premises Callout Banner */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-blue-900/30 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-xl shadow-blue-950/20 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-cyan-400" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-cyan-300">
                    Custom Sovereign & On-Premises Architecture
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                  Require private cloud data residency, custom banking ETLs, or bespoke CRM schemas?
                </h3>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-300">
                  Our engineering team works under mutual NDA to design custom digital infrastructure, proprietary scoring workflows, and dedicated telco interconnects.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500 px-6 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/35 active:scale-[0.98]"
              >
                <span>Request Architecture Review</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
