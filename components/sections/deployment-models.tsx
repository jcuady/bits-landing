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
} from "lucide-react";

export function DeploymentModels() {
  const [selectedModel, setSelectedModel] = React.useState<"cloud" | "on-prem">("on-prem");
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
                Flexible Deployment Architecture
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Cloud-Hosted or On-Premises:{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Deploy on Your Terms
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              Whether you want rapid cloud onboarding or need to leverage existing in-house server infrastructure,
              BITS delivers battle-tested deployment architectures with full engineering scoping.
            </p>
          </Reveal>

          {/* Interactive Deployment Switcher Pill: Clean Light Mode */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1.5 shadow-xs">
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
                <span>On-Premises Deployment (Bare-Metal & Sovereign)</span>
              </button>

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
                <span>Managed Cloud Deployment (Rapid 1–2 Weeks)</span>
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
                      Key Architectural Advantages
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
                        Technical Delivery Specs
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
                            Setup & Implementation Scope:
                          </p>
                          <p className="mt-0.5 text-[0.7rem] text-slate-600 leading-relaxed">
                            {activeData.financialModel.setupDetails}
                          </p>
                        </div>
                        <div className="border-t border-blue-200/80 pt-2">
                          <p className="font-bold text-slate-900 text-[0.72rem]">
                            Ongoing Operational Model:
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
                        href="/#contact"
                        className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                      >
                        <span>
                          {selectedModel === "on-prem"
                            ? "Request On-Prem Hardware Scoping"
                            : "Configure Cloud Solution"}
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

        {/* Existing Servers Scoping & Hardware Sizing Blueprint: Clean Light Mode */}
        <div className="mx-auto mt-14 max-w-6xl">
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-blue-600" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-blue-700">
                    Infrastructure Requirement Scoping
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  Have Existing Servers? We Engineer the Full Sizing & Migration
                </h3>
                <p className="mt-1 max-w-2xl text-xs text-slate-600">
                  Don&apos;t discard existing IT investments. We audit your Dell, HPE, Supermicro, or virtualization clusters and dimension exact CPU, RAM, storage, and telephony interconnects.
                </p>
              </div>

              {/* Scoping Floor Size Tabs */}
              <div className="flex flex-wrap gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
                {hardwareScopingTiers.map((tier, idx) => (
                  <button
                    key={tier.floorSize}
                    type="button"
                    onClick={() => setSelectedTier(idx)}
                    className={cn(
                      "inline-flex min-h-[44px] items-center cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold transition-all",
                      selectedTier === idx
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {tier.floorSize}
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Specification Card for Selected Floor Tier: Clean Light Mode */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs font-bold uppercase text-slate-900">
                    Hardware Specification Blueprint: {activeScopingTier.tier}
                  </span>
                </div>
                <span className="font-mono text-[0.68rem] text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">
                  Target: {activeScopingTier.floorSize}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Cpu className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      Compute (CPU)
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-bold text-slate-900">
                    {activeScopingTier.cpu}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Layers className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      System Memory (RAM)
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-bold text-slate-900">
                    {activeScopingTier.ram}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-2 text-blue-600">
                    <HardDrive className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      Storage Array (NVMe / SAS)
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-bold text-slate-900">
                    {activeScopingTier.storage}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Network className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      Networking & Voice QoS
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-bold text-slate-900">
                    {activeScopingTier.network}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Activity className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      Telephony Interconnect
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-bold text-slate-900">
                    {activeScopingTier.telephony}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Server className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      Hypervisor / OS Support
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-bold text-slate-900">
                    {activeScopingTier.deploymentEnv}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4-Step Technical Scoping Methodology */}
        <div className="mx-auto mt-12 max-w-6xl">
          <Reveal delay={0.15}>
            <div className="border-b border-slate-200 pb-2.5">
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400 font-mono">
                End-to-End On-Premises Engineering Delivery Workflow
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {scopingProcessSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs transition-all hover:border-slate-300 hover:shadow-sm"
                >
                  <span className="font-mono text-xs font-bold text-blue-600">
                    STEP // {step.step}
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-[0.68rem] text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
