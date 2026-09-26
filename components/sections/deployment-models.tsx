"use client";

import * as React from "react";
import Link from "next/link";
import {
  deploymentModels,
  hardwareScopingTiers,
  scopingProcessSteps,
} from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";
import {
  Cloud,
  Server,
  Cpu,
  HardDrive,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Network,
  Terminal,
  Activity,
  Zap,
  Sliders,
  Users,
  CheckCircle2,
  Search,
  Boxes,
  Workflow,
  Database,
} from "lucide-react";

export function DeploymentModels() {
  const [selectedModel, setSelectedModel] = React.useState<"cloud" | "on-prem">("cloud");
  const [selectedTier, setSelectedTier] = React.useState<number>(1);

  const activeData =
    selectedModel === "cloud" ? deploymentModels[0] : deploymentModels[1];
  const activeScopingTier = hardwareScopingTiers[selectedTier];

  return (
    <Section id="deployment" className="relative overflow-hidden bg-white text-slate-900 py-20 sm:py-28 border-t border-slate-200/80">
      {/* Light Ambient Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute inset-0 bg-grid-light" />
        <div className="absolute -top-36 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-[140px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Flexible Hosting Options
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Cloud-Hosted or Your Own Office Servers:{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Run BITS Your Way
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-3xl text-pretty text-slate-600 font-normal">
              Every engine in our 18-product catalog can be run in our secure <strong className="text-slate-900 font-bold">Managed Cloud</strong> with zero hardware needed, or installed directly on <strong className="text-slate-900 font-bold">Your Own Office Servers</strong> for complete privacy and one-time setup ownership.
            </p>
          </Reveal>

          {/* Interactive Deployment Switcher Pill: Clean Light Mode */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1.5 shadow-xs">
              <button
                type="button"
                onClick={() => setSelectedModel("cloud")}
                className={cn(
                  "inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm",
                  selectedModel === "cloud"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                )}
              >
                <Cloud className={cn("size-4", selectedModel === "cloud" ? "text-white" : "text-slate-500")} />
                <span>Managed Cloud</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider",
                    selectedModel === "cloud"
                      ? "bg-white/20 text-white"
                      : "bg-emerald-100 text-emerald-800"
                  )}
                >
                  Recommended
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedModel("on-prem")}
                className={cn(
                  "inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm",
                  selectedModel === "on-prem"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                )}
              >
                <Server className={cn("size-4", selectedModel === "on-prem" ? "text-white" : "text-slate-500")} />
                <span>Your Own Office Servers</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Dynamic Model Deep-Dive Showcase: Clean Light Card */}
        <div className="mx-auto mt-10 max-w-6xl">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left Overview Column (7 Cols) */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-blue-700 border border-blue-200">
                      {activeData.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-medium">
                      {activeData.idealFor}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {activeData.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 font-semibold">
                    {activeData.tagline}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {activeData.description}
                  </p>

                  {/* Operational Advantages List */}
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <h4 className="text-[0.7rem] font-bold uppercase tracking-wider text-blue-700 font-mono">
                      Key Operational Benefits
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {activeData.advantages.map((adv) => (
                        <li key={adv} className="flex items-start gap-3 text-xs text-slate-700">
                          <span
                            className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[0.65rem] font-bold"
                            aria-hidden
                          >
                            <Check className="size-3 stroke-[2.5]" />
                          </span>
                          <span className="leading-snug">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Specs & Financial Architecture Box (5 Cols) */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 lg:col-span-5 shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                        System Overview
                      </span>
                      <span className="font-mono text-[0.65rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Production Ready
                      </span>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      {activeData.specs.map((spec) => (
                        <div key={spec.label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                            {spec.label}
                          </p>
                          <p className="mt-1 font-mono text-xs font-bold text-slate-900">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Investment & Setup Fee Model */}
                    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
                      <div className="flex items-center gap-2">
                        <Zap className="size-3.5 text-blue-600 fill-blue-600" />
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-blue-800">
                          {activeData.financialModel.type}
                        </span>
                      </div>

                      <div className="mt-2.5 space-y-2 text-xs">
                        <div>
                          <p className="font-bold text-slate-900 text-[0.72rem]">
                            Setup & Implementation:
                          </p>
                          <p className="mt-0.5 text-[0.7rem] text-slate-600 leading-relaxed">
                            {activeData.financialModel.setupDetails}
                          </p>
                        </div>
                        <div className="border-t border-blue-200/80 pt-2">
                          <p className="font-bold text-slate-900 text-[0.72rem]">
                            Ongoing Support & Updates:
                          </p>
                          <p className="mt-0.5 text-[0.7rem] text-slate-600 leading-relaxed">
                            {activeData.financialModel.ongoingDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <Magnetic className="w-full">
                      <Link
                        href={
                          selectedModel === "on-prem"
                            ? "/#contact?package=on-premises"
                            : "/#contact?package=managed-cloud"
                        }
                        className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                      >
                        <span>
                          {selectedModel === "on-prem"
                            ? "Plan Your Office Server Setup"
                            : "Configure Your Cloud Setup"}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </Magnetic>
                    <p className="mt-2 text-center text-[0.68rem] text-slate-500">
                      Mutual NDA provided · Technical blueprint included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Multi-Product Interoperability & Architecture Stacking Banner */}
        <div className="mx-auto mt-12 max-w-6xl">
          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-blue-300">
                    <Boxes className="size-3.5 text-blue-400" />
                    <span>Multi-Product Modular Architecture</span>
                  </div>
                  <h3 className="mt-2.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Combine Any of Our 18 Products into a Unified Deployment
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our modular engines share a single database layer, unified event streaming, and role-based permissions. Whether running our high-throughput predictive dialer alongside ERP payroll or deploying a full 18-product sovereign operational suite, there is zero duplicate server footprint and zero custom glue code required.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800/80 px-2.5 py-1 text-[0.7rem] font-mono text-slate-300 border border-slate-700/60">
                      <Check className="size-3 text-emerald-400 shrink-0" />
                      Shared PostgreSQL &amp; Redis Bus
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800/80 px-2.5 py-1 text-[0.7rem] font-mono text-slate-300 border border-slate-700/60">
                      <Check className="size-3 text-emerald-400 shrink-0" />
                      Centralized SSO &amp; RBAC
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800/80 px-2.5 py-1 text-[0.7rem] font-mono text-slate-300 border border-slate-700/60">
                      <Check className="size-3 text-emerald-400 shrink-0" />
                      Zero Duplicated Infrastructure
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800/80 px-2.5 py-1 text-[0.7rem] font-mono text-slate-300 border border-slate-700/60">
                      <Check className="size-3 text-emerald-400 shrink-0" />
                      Hybrid Cloud/On-Prem Ready
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    href="/#solutions"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all hover:bg-blue-500"
                  >
                    <span>Open Solution Stacking Studio</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href="/#contact?package=custom-deployment"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                  >
                    <span>Custom Deployment Scoping</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Continuous System Improvements & Proactive Security Evolution */}
        <div className="mx-auto mt-12 max-w-6xl">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-blue-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/80 bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-blue-700 shadow-2xs">
                    <Sparkles className="size-3 text-blue-600" />
                    <span>Continuous Evolution Guarantee</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Continuous Improvements &amp; Automatic Security
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Your software always stays fresh. Whether on our cloud or your office servers, BITS receives continuous performance and security upgrades with zero headaches.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 text-left sm:text-center shadow-2xs">
                    <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Included Support</span>
                    <span className="font-mono text-sm font-extrabold text-blue-600">Active Lifecycle Updates</span>
                  </div>
                </div>
              </div>

              {/* 3 Pillars: Continuous Security, Tech Evolution, Bespoke Requests */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2.5 text-blue-600">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <ShieldCheck className="size-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Automatic Security Updates
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    Regular security patches, automatic data protection, and strict privacy controls to keep your customer records safe at all times.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-semibold text-slate-700">
                    <Check className="size-3 text-emerald-600" /> Proactively patched
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2.5 text-blue-600">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Zap className="size-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Modern AI &amp; Speed Upgrades
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    As newer voice tools, faster speech processing, and better calling technology emerge, BITS automatically updates your system so you stay ahead.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-semibold text-slate-700">
                    <Check className="size-3 text-emerald-600" /> Continuous engine upgrades
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2.5 text-blue-600">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <Sliders className="size-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Custom Features On Demand
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    Need custom reports, special approval steps, or a direct link to your existing software? Our team builds tailored features for your exact business.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[0.65rem] font-semibold text-blue-700">
                    <span>Tailored scope & engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Existing Servers Scoping & Hardware Sizing Blueprint: Enterprise Cockpit */}
        <div className="mx-auto mt-16 max-w-6xl">
          <Reveal delay={0.12}>
            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-slate-200/80">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 font-mono text-[0.72rem] font-bold text-blue-700">
                  <Terminal className="size-3.5 text-blue-600" />
                  <span>OFFICE SERVER SETUP</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Already Have Computers or Servers? We Set Up Everything For You
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Keep using your existing equipment. Our technical team checks your current office computers or server room and sets up BITS so you don&apos;t have to buy expensive new hardware.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <span>Zero Hardware Waste Guarantee</span>
              </div>
            </div>

            {/* Floor Sizing Segmented Control (Responsive Grid to prevent any pill wrapping) */}
            <div className="mt-8">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Contact Center Floor Scale:
                </span>
                <span className="font-mono text-[0.72rem] text-blue-700 font-semibold">
                  3 Presets Available · Custom Sizing on Demand
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 rounded-2xl border border-slate-200/90 bg-slate-100/80 p-2 shadow-inner">
                {hardwareScopingTiers.map((tier, idx) => (
                  <button
                    key={tier.floorSize}
                    type="button"
                    onClick={() => setSelectedTier(idx)}
                    className={cn(
                      "group relative flex min-h-[54px] cursor-pointer flex-col justify-center rounded-xl px-4 py-2.5 text-left transition-all duration-200",
                      selectedTier === idx
                        ? "bg-white text-slate-900 shadow-md ring-1 ring-blue-600/30"
                        : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 rounded-full transition-colors",
                            selectedTier === idx ? "bg-blue-600" : "bg-slate-300 group-hover:bg-slate-400"
                          )}
                        />
                        <span className="font-mono text-xs font-bold tracking-tight">
                          {tier.floorSize}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide transition-colors",
                          selectedTier === idx
                            ? "bg-blue-50 text-blue-700 border border-blue-200/80"
                            : "bg-slate-200/70 text-slate-600"
                        )}
                      >
                        {idx === 0 ? "Boutique" : idx === 1 ? "Mid-Floor" : "Enterprise"}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.72rem] text-slate-500 font-medium">
                      {tier.tier}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Specification Cockpit Blueprint */}
            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50">
              {/* Cockpit Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                    Datacenter Blueprint Specification
                  </span>
                  <span className="hidden text-slate-300 sm:inline">|</span>
                  <span className="hidden font-mono text-[0.75rem] font-semibold text-slate-500 sm:inline">
                    {activeScopingTier.tier}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[0.72rem] font-bold text-blue-700">
                    <Users className="size-3.5 text-blue-600" />
                    <span>Target: {activeScopingTier.floorSize}</span>
                  </span>
                </div>
              </div>

              {/* Certified Hardware Ecosystem Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-2 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-1.5 font-medium">
                  <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                  <span>Hardware Compatibility Certified:</span>
                  <span className="font-semibold text-slate-700">
                    Dell PowerEdge · HPE ProLiant · Supermicro · Cisco UCS · Proxmox VE · VMware ESXi
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[0.68rem] text-slate-400">
                  <Zap className="size-3 text-amber-500" />
                  <span>QoS & SIP Sizing v4.2</span>
                </div>
              </div>

              {/* 6 High-Contrast Dimension Specification Cards */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Compute (CPU) */}
                  <div className="group rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-4.5 transition-all hover:border-indigo-300 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100">
                          <Cpu className="size-4" />
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          Compute (CPU)
                        </span>
                      </div>
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-indigo-700">
                        Ded. Cores
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm font-bold text-slate-900">
                      {activeScopingTier.cpu}
                    </p>
                    <p className="mt-2 text-[0.72rem] text-slate-500 leading-relaxed">
                      Dimensioned for zero-throttle audio encoding, SIP transcoding, and real-time CRM queue routing.
                    </p>
                  </div>

                  {/* System Memory (RAM) */}
                  <div className="group rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-4.5 transition-all hover:border-violet-300 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-violet-600">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-violet-50 border border-violet-100">
                          <Layers className="size-4" />
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          System Memory (RAM)
                        </span>
                      </div>
                      <span className="rounded-md bg-violet-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-violet-700">
                        ECC Verified
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm font-bold text-slate-900">
                      {activeScopingTier.ram}
                    </p>
                    <p className="mt-2 text-[0.72rem] text-slate-500 leading-relaxed">
                      Dedicated Redis telemetry buffers, PostgreSQL shared memory, and in-memory agent presence state.
                    </p>
                  </div>

                  {/* Storage Subsystem */}
                  <div className="group rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-4.5 transition-all hover:border-emerald-300 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                          <HardDrive className="size-4" />
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          Storage Array (NVMe / SAS)
                        </span>
                      </div>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-emerald-700">
                        RAID Ready
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm font-bold text-slate-900">
                      {activeScopingTier.storage}
                    </p>
                    <p className="mt-2 text-[0.72rem] text-slate-500 leading-relaxed">
                      High-IOPS NVMe WAL caching for live database writes paired with high-capacity encrypted call audio vaults.
                    </p>
                  </div>

                  {/* Networking & Voice QoS */}
                  <div className="group rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-4.5 transition-all hover:border-cyan-300 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-cyan-600">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-50 border border-cyan-100">
                          <Network className="size-4" />
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          Networking & Voice QoS
                        </span>
                      </div>
                      <span className="rounded-md bg-cyan-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-cyan-700">
                        &lt; 15ms Jitter
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm font-bold text-slate-900">
                      {activeScopingTier.network}
                    </p>
                    <p className="mt-2 text-[0.72rem] text-slate-500 leading-relaxed">
                      DSCP EF priority voice packet tagging ensures crystal-clear call audio even during bulk operations.
                    </p>
                  </div>

                  {/* Telephony Interconnect */}
                  <div className="group rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-4.5 transition-all hover:border-amber-300 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-amber-600">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-amber-50 border border-amber-100">
                          <Activity className="size-4" />
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          Telephony Interconnect
                        </span>
                      </div>
                      <span className="rounded-md bg-amber-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-amber-700">
                        Carrier Grade
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm font-bold text-slate-900">
                      {activeScopingTier.telephony}
                    </p>
                    <p className="mt-2 text-[0.72rem] text-slate-500 leading-relaxed">
                      Direct integration with local telco SIP providers, legacy E1/PRI gateways, or international SIP carriers.
                    </p>
                  </div>

                  {/* Hypervisor / OS Support */}
                  <div className="group rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-4.5 transition-all hover:border-blue-300 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 border border-blue-100">
                          <Server className="size-4" />
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                          Hypervisor / OS Support
                        </span>
                      </div>
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-blue-700">
                        No Lock-in
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-sm font-bold text-slate-900">
                      {activeScopingTier.deploymentEnv}
                    </p>
                    <p className="mt-2 text-[0.72rem] text-slate-500 leading-relaxed">
                      Deploy directly onto bare-metal Linux or within existing VMware, Proxmox, or Nutanix hypervisors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cockpit Bottom Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/80 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shrink-0">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Complimentary Infrastructure Scoping Session Included
                    </p>
                    <p className="text-[0.72rem] text-slate-600">
                      Under mutual NDA, we deliver an exact Bill of Materials (BOM), Visio rack cabling diagram, and power budget.
                    </p>
                  </div>
                </div>

                <Link
                  href="/#contact?package=on-premises"
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600/50"
                >
                  <span>Request Hardware Audit</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4-Step Technical Scoping Methodology */}
        <div className="mx-auto mt-14 max-w-6xl">
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-blue-700">
                  TURNKEY DEPLOYMENT METHODOLOGY
                </span>
                <h4 className="mt-1 text-lg font-bold text-slate-900">
                  End-to-End On-Premises Engineering Delivery Workflow
                </h4>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Guided step-by-step setup from initial review to live operations
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {scopingProcessSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700 border border-blue-200/80">
                        STEP {step.step}
                      </span>
                      <div className="flex size-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {idx === 0 && <Search className="size-3.5" />}
                        {idx === 1 && <Cpu className="size-3.5" />}
                        {idx === 2 && <Terminal className="size-3.5" />}
                        {idx === 3 && <CheckCircle2 className="size-3.5" />}
                      </div>
                    </div>

                    <h5 className="mt-3.5 text-sm font-bold text-slate-900">
                      {step.title}
                    </h5>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="font-mono text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
                      Deliverable:
                    </span>
                    <span className="text-[0.72rem] font-semibold text-slate-700 mt-0.5 block">
                      {idx === 0 && "Hardware BOM & Server Audit Report"}
                      {idx === 1 && "Capacity & QoS Dimensioning Blueprint"}
                      {idx === 2 && "Hardened Cluster & SIP Interconnect"}
                      {idx === 3 && "UAT Sign-off & 24/7 Operations Runbook"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
