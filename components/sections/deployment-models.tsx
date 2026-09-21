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
    <Section id="deployment" className="relative overflow-hidden bg-slate-900 text-white py-20 sm:py-28">
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden>
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-36 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-cyan-300">
                Flexible Deployment Architecture
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Cloud-Hosted or On-Premises:{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Deploy on Your Terms
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-300">
              Whether you want rapid cloud onboarding or need to leverage existing in-house server infrastructure,
              BITS delivers battle-tested deployment architectures with full engineering scoping.
            </p>
          </Reveal>

          {/* Interactive Deployment Switcher Pill */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-9 inline-flex rounded-full border border-slate-750 bg-slate-950/80 p-1.5 shadow-2xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setSelectedModel("on-prem")}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200",
                  selectedModel === "on-prem"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Server className="size-4 text-cyan-300" />
                <span>On-Premises Deployment (Bare-Metal & Sovereign)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedModel("cloud")}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200",
                  selectedModel === "cloud"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Cloud className="size-4 text-cyan-300" />
                <span>Managed Cloud Deployment (Rapid 1–2 Weeks)</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Dynamic Model Deep-Dive Showcase */}
        <div className="mx-auto mt-12 max-w-6xl">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left Overview Column (7 Cols) */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-cyan-300 border border-cyan-400/30">
                      {activeData.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {activeData.idealFor}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activeData.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {activeData.tagline}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {activeData.description}
                  </p>

                  {/* Operational Advantages List */}
                  <div className="mt-7 border-t border-slate-800/80 pt-6">
                    <h4 className="text-[0.7rem] font-bold uppercase tracking-wider text-cyan-400">
                      Key Architectural Advantages
                    </h4>
                    <ul className="mt-3.5 space-y-3">
                      {activeData.advantages.map((adv) => (
                        <li key={adv} className="flex items-start gap-3 text-xs text-slate-200">
                          <span
                            className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-blue-600/30 border border-blue-400/40 text-cyan-300 text-[0.65rem]"
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
                <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 lg:col-span-5">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                        Technical Delivery Specs
                      </span>
                      <span className="font-mono text-[0.65rem] font-semibold text-emerald-400">
                        Production Ready
                      </span>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {activeData.specs.map((spec) => (
                        <div key={spec.label} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
                          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                            {spec.label}
                          </p>
                          <p className="mt-1 font-mono text-xs font-bold text-white">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Investment & Setup Fee Model (Zero Numerical Values) */}
                    <div className="mt-5 rounded-xl border border-blue-900/40 bg-blue-950/30 p-4.5">
                      <div className="flex items-center gap-2">
                        <Zap className="size-3.5 text-cyan-400" />
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-cyan-300">
                          {activeData.financialModel.type}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2.5 text-xs">
                        <div>
                          <p className="font-bold text-white">
                            Setup & Implementation Scope:
                          </p>
                          <p className="mt-0.5 text-[0.75rem] text-slate-300 leading-relaxed">
                            {activeData.financialModel.setupDetails}
                          </p>
                        </div>
                        <div className="border-t border-slate-800/80 pt-2.5">
                          <p className="font-bold text-white">
                            Ongoing Operational Model:
                          </p>
                          <p className="mt-0.5 text-[0.75rem] text-slate-300 leading-relaxed">
                            {activeData.financialModel.ongoingDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <Magnetic className="w-full">
                      <Link
                        href="/#contact"
                        className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
                      >
                        <span>
                          {selectedModel === "on-prem"
                            ? "Request On-Prem Hardware Scoping"
                            : "Configure Cloud Solution"}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </Magnetic>
                    <p className="mt-2 text-center text-[0.68rem] text-slate-400">
                      Mutual NDA provided · Technical blueprint included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Existing Servers Scoping & Hardware Sizing Blueprint */}
        <div className="mx-auto mt-16 max-w-6xl">
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-cyan-400" />
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-cyan-300">
                    Infrastructure Requirement Scoping
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Have Existing Servers? We Engineer the Full Sizing & Migration
                </h3>
                <p className="mt-1 max-w-2xl text-xs text-slate-300">
                  Don&apos;t discard existing IT investments. We audit your Dell, HPE, Supermicro, or virtualization clusters and dimension exact CPU, RAM, storage, and telephony interconnects.
                </p>
              </div>

              {/* Scoping Floor Size Tabs */}
              <div className="flex flex-wrap gap-1.5 rounded-full border border-slate-800 bg-slate-950 p-1">
                {hardwareScopingTiers.map((tier, idx) => (
                  <button
                    key={tier.floorSize}
                    type="button"
                    onClick={() => setSelectedTier(idx)}
                    className={cn(
                      "cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold transition-all",
                      selectedTier === idx
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {tier.floorSize}
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Specification Card for Selected Floor Tier */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase text-white">
                    Hardware Specification Blueprint: {activeScopingTier.tier}
                  </span>
                </div>
                <span className="font-mono text-[0.68rem] text-cyan-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                  Target: {activeScopingTier.floorSize}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Cpu className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      Compute (CPU)
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-white">
                    {activeScopingTier.cpu}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Layers className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      System Memory (RAM)
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-white">
                    {activeScopingTier.ram}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <HardDrive className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      Storage Array (NVMe / SAS)
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-white">
                    {activeScopingTier.storage}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Network className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      Networking & Voice QoS
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-white">
                    {activeScopingTier.network}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Activity className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      Telephony Interconnect
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-white">
                    {activeScopingTier.telephony}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Server className="size-4" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      Hypervisor / OS Support
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-white">
                    {activeScopingTier.deploymentEnv}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4-Step Technical Scoping Methodology */}
        <div className="mx-auto mt-14 max-w-6xl">
          <Reveal delay={0.15}>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                End-to-End On-Premises Engineering Delivery Workflow
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {scopingProcessSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition-colors hover:border-slate-700"
                >
                  <span className="font-mono text-sm font-bold text-blue-400">
                    STEP // {step.step}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Architectural Cost Comparison Strip (Transparent Models, Zero Arbitrary Values) */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-12 max-w-6xl rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  Cost Architecture & Financial Comparison
                </h4>
                <p className="text-xs text-slate-400">
                  How organizations budget for Cloud vs. On-Premises deployments.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[0.68rem] font-semibold text-emerald-400 border border-emerald-500/20">
                Transparent Scoping Framework
              </span>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[0.68rem]">
                    <th className="py-3 pr-4">Dimension</th>
                    <th className="py-3 px-4 text-blue-300 w-5/12">Cloud Deployment</th>
                    <th className="py-3 pl-4 text-cyan-300 w-5/12">On-Premises Deployment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Budget Model</td>
                    <td className="py-3 px-4">Operational Expenditure (OpEx) monthly/annual</td>
                    <td className="py-3 pl-4">Capital Expenditure (CapEx) optimization + annual SLA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Server Hardware</td>
                    <td className="py-3 px-4">Zero hardware procurement or facility overhead</td>
                    <td className="py-3 pl-4">Deploy on existing server fleet or custom procured servers</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Setup & Onboarding</td>
                    <td className="py-3 px-4">Data migration, queue configuration & agent training</td>
                    <td className="py-3 pl-4">Hardware audit, OS hardening, local PBX interconnect & UAT</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Long-Term Cost Advantage</td>
                    <td className="py-3 px-4">Low barrier to start; scale up or down without penalty</td>
                    <td className="py-3 pl-4">Eliminates cloud server markup; maximum ROI over multi-year scale</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Data Control & Isolation</td>
                    <td className="py-3 px-4">Dedicated cloud VPC with 256-bit encryption</td>
                    <td className="py-3 pl-4">100% physically contained inside your corporate network</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
