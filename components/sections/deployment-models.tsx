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
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
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
  Copy,
  CheckCheck,
  Laptop,
  Building2,
  Lock,
} from "lucide-react";

const tierTelemetryDetails = [
  {
    tierBadge: "AGILE BOUTIQUE",
    badgeColor: "border-sky-400/50 bg-sky-950/70 text-sky-300",
    formFactor: "1U Mini-Rack / Tower",
    concurrentAudio: "Up to 75 Simultaneous SIP Channels",
    voiceBandwidth: "~2.5 Mbps Dedicated Voice (DSCP EF)",
    recordingVault: "2 TB Local Encrypted Archive (90+ Days)",
    dbThroughput: "3,500 IOPS NVMe WAL Cache",
    failoverTime: "< 4s Local Service Restart",
    powerBudget: "250W Typical (Standard AC)",
    oemList: "Dell PowerEdge T340/R240 · HPE MicroServer · Tower Workstation · Proxmox Single Node",
    summary: "Optimized for boutique agencies, pilot campaigns, and branch collections desks needing sovereign air-gapped data ownership with zero waste.",
    rackUnit: "1U / Tower",
  },
  {
    tierBadge: "MOST DEPLOYED",
    badgeColor: "border-amber-400/60 bg-amber-950/70 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    formFactor: "2U Enterprise Dual-Power Rackmount",
    concurrentAudio: "Up to 300 Simultaneous SIP Channels",
    voiceBandwidth: "~10 Mbps Dedicated Voice (DSCP EF Priority)",
    recordingVault: "8 TB Encrypted RAID-5 Vault (180+ Days)",
    dbThroughput: "12,000 IOPS NVMe WAL + Redis Queue",
    failoverTime: "< 1.5s SIP Carrier Failover",
    powerBudget: "450W Dual Redundant (1+1) PSU",
    oemList: "Dell PowerEdge R640/R740 · HPE ProLiant DL360 Gen10 · Cisco UCS C220 · VMware ESXi / Proxmox VE",
    summary: "Standard high-velocity production floor configuration. Handles aggressive predictive dialing, supervisor real-time audio monitoring, and instant CRM screen-pops.",
    rackUnit: "2U Rack",
  },
  {
    tierBadge: "BANK & ENTERPRISE HA",
    badgeColor: "border-emerald-400/60 bg-emerald-950/70 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    formFactor: "4U+ Clustered High-Availability Array",
    concurrentAudio: "1,000+ Simultaneous Carrier SIP Channels",
    voiceBandwidth: "~40 Mbps Redundant QoS SFP+ Pipe",
    recordingVault: "Multi-TB NVMe RAID-10 + S3 MinIO (7-Year Statutory BSP Vault)",
    dbThroughput: "45,000+ IOPS Distributed WAL Engine",
    failoverTime: "Sub-Second Automatic Cluster Failover",
    powerBudget: "850W+ Redundant Dual-Feed (A+B Grid)",
    oemList: "Dell PowerEdge R840 / PowerStore · HPE Synergy · Supermicro SuperServer Cluster · Nutanix AHV / K8s",
    summary: "Engineered for statutory tier-1 banks and major BPO contact centers. Zero single point of failure, multi-carrier SIP trunking, and immutable audit logging.",
    rackUnit: "4U+ Cluster",
  },
];

export function DeploymentModels() {
  const { openModal } = useConsultationModal();
  const [selectedModel, setSelectedModel] = React.useState<"cloud" | "on-prem">("cloud");
  const [selectedTier, setSelectedTier] = React.useState<number>(1);
  const [copiedSpec, setCopiedSpec] = React.useState(false);

  const activeData =
    selectedModel === "cloud" ? deploymentModels[0] : deploymentModels[1];
  const activeScopingTier = hardwareScopingTiers[selectedTier];
  const currentTelemetry = tierTelemetryDetails[selectedTier];

  const handleCopySpec = () => {
    const tier = hardwareScopingTiers[selectedTier];
    const telemetry = tierTelemetryDetails[selectedTier];
    const text = `BITS Sovereign Datacenter Blueprint Specification
==================================================
Target Floor: ${tier.floorSize} (${tier.tier})
Form Factor: ${telemetry.formFactor}
Concurrent Audio: ${telemetry.concurrentAudio}
Bandwidth: ${telemetry.voiceBandwidth}
Recording Vault: ${telemetry.recordingVault}
--------------------------------------------------
• Compute (CPU): ${tier.cpu}
• System Memory (RAM): ${tier.ram}
• Storage Array: ${tier.storage}
• Network & QoS: ${tier.network}
• Telephony Interconnect: ${tier.telephony}
• Hypervisor & OS: ${tier.deploymentEnv}
--------------------------------------------------
Certified OEMs: ${telemetry.oemList}
Compliance: BSP Circular 808 Aligned · NPC RA 10173 DPA Compliant · Zero Hardware Waste Guarantee`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2500);
    }
  };

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
                      <button
                        type="button"
                        onClick={() =>
                          openModal(
                            selectedModel === "on-prem"
                              ? "On-Premises Dedicated Server Architecture Scoping"
                              : "Managed Cloud VPC Infrastructure Setup"
                          )
                        }
                        className="group flex h-11 min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                      >
                        <span>
                          {selectedModel === "on-prem"
                            ? "Plan Your Office Server Setup"
                            : "Configure Your Cloud Setup"}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
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
                  <button
                    type="button"
                    onClick={() => openModal("Custom Enterprise Deployment & Migration Scoping")}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white active:scale-[0.98]"
                  >
                    <span>Custom Deployment Scoping</span>
                  </button>
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

        {/* ── BITS SOVEREIGN HARDWARE AUDIT & DATACENTER BLUEPRINT COCKPIT ── */}
        <div id="hardware-scoping" className="mx-auto mt-20 sm:mt-28 max-w-6xl scroll-mt-28">
          <Reveal delay={0.1}>
            {/* Header Block with Cloud-Horizon & Bedrock Styling */}
            <div className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/80 via-white to-blue-50/30 p-6 sm:p-10 shadow-lg shadow-slate-200/50 overflow-hidden">
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-blue-500/[0.08] blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-sky-400/[0.06] blur-3xl" aria-hidden />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-slate-200/80">
                <div className="max-w-3xl">
                  {/* Eyebrow Capsule */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/95 px-3.5 py-1.5 shadow-2xs backdrop-blur-md">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
                    </span>
                    <span className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-blue-900">
                      OFFICE SERVER SETUP · ZERO HARDWARE WASTE
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.12]">
                    Already Have Computers or Servers?{" "}
                    <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                      We Turn Your Floor into a Sovereign Cloud.
                    </span>
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                    Eliminate forced hardware turnover. BITS senior systems engineers audit your current workstations, local server towers, and telco lines to deploy an air-gapped or hybrid operational powerhouse with <strong className="text-slate-900 font-semibold">100% data residency and zero capital waste</strong>.
                  </p>
                </div>

                {/* 3 Regulatory & Safety Guarantees */}
                <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50/90 px-3.5 py-2 rounded-xl border border-emerald-200/80 shadow-2xs">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>Zero Hardware Waste Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50/90 px-3.5 py-2 rounded-xl border border-blue-200/80 shadow-2xs">
                    <Building2 className="size-4 text-blue-600 shrink-0" />
                    <span>100% On-Premise Sovereign Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-2xs">
                    <CheckCircle2 className="size-4 text-sky-600 shrink-0" />
                    <span>BSP 808 &amp; NPC DPA Compliant</span>
                  </div>
                </div>
              </div>

              {/* Floor Sizing Segmented Control (High Tactile Command Console) */}
              <div className="relative z-10 mt-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Sliders className="size-3.5 text-blue-600" />
                    <span>Select Contact Center Floor Scale:</span>
                  </span>
                  <span className="font-mono text-[0.72rem] text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/80">
                    3 Real-Time Blueprint Presets · Custom Sizing on Demand
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {hardwareScopingTiers.map((tier, idx) => {
                    const telemetry = tierTelemetryDetails[idx];
                    const isSelected = selectedTier === idx;
                    return (
                      <button
                        key={tier.floorSize}
                        type="button"
                        onClick={() => setSelectedTier(idx)}
                        className={cn(
                          "group relative flex min-h-[78px] cursor-pointer flex-col justify-between rounded-2xl p-4 text-left transition-all duration-200 active:scale-[0.99]",
                          isSelected
                            ? "bg-gradient-to-b from-[#091E42] to-[#040E24] text-white shadow-xl shadow-blue-950/20 ring-2 ring-sky-400"
                            : "bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50/90 hover:border-slate-300 shadow-xs"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "flex size-3 items-center justify-center rounded-full border transition-all",
                                isSelected
                                  ? "border-sky-400 bg-sky-400/30"
                                  : "border-slate-300 bg-slate-100 group-hover:border-slate-400"
                              )}
                            >
                              {isSelected && <span className="size-1.5 rounded-full bg-sky-300 animate-pulse" />}
                            </span>
                            <span className={cn("font-mono text-sm font-extrabold tracking-tight", isSelected ? "text-white" : "text-slate-900")}>
                              {tier.floorSize}
                            </span>
                          </div>

                          <span
                            className={cn(
                              "rounded-md px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider border",
                              isSelected
                                ? telemetry.badgeColor
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            )}
                          >
                            {telemetry.tierBadge}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                          <p className={cn("text-xs font-semibold", isSelected ? "text-sky-200" : "text-slate-600")}>
                            {tier.tier}
                          </p>
                          <span className={cn("font-mono text-[0.68rem]", isSelected ? "text-slate-300" : "text-slate-500")}>
                            {telemetry.rackUnit}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── DOUBLE-BEZEL DATACENTER BLUEPRINT COCKPIT (SOVEREIGN BEDROCK CANVAS) ── */}
          <Reveal delay={0.14}>
            <div className="mt-8 rounded-[2rem] sm:rounded-[2.5rem] p-2.5 sm:p-4 bg-gradient-to-b from-slate-900/95 via-[#071738] to-[#020817] border border-sky-400/30 shadow-[0_20px_70px_rgba(2,132,199,0.22)] relative overflow-hidden backdrop-blur-2xl">
              {/* Ethereal Atmospheric Cloud & Horizon Illumination */}
              <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(37,99,235,0.1)_50%,transparent_75%)] blur-[80px]" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" aria-hidden />

              {/* Concentric Inner Core */}
              <div className="relative z-10 rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.625rem)] bg-[#030A1A]/95 border border-white/10 p-5 sm:p-8 backdrop-blur-md">

                {/* Cockpit Command Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 backdrop-blur-xs">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="font-mono text-[0.7rem] font-bold text-emerald-300 tracking-wide">
                        LIVE SPECIFICATION MATRIX
                      </span>
                    </div>

                    <span className="text-white/20 hidden sm:inline">|</span>
                    <span className="font-mono text-xs font-bold text-white tracking-tight">
                      {activeScopingTier.tier}
                    </span>
                    <span className="rounded-md bg-white/[0.08] px-2 py-0.5 font-mono text-[0.68rem] text-sky-300 border border-white/10">
                      SPEC-REV-2026.4
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-950/60 px-3 py-1 font-mono text-xs font-bold text-sky-200">
                      <Users className="size-3.5 text-sky-400" />
                      <span>Target: {activeScopingTier.floorSize}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-xs text-slate-300">
                      <Server className="size-3.5 text-slate-400" />
                      <span>{currentTelemetry.formFactor}</span>
                    </span>
                  </div>
                </div>

                {/* Real-Time Telemetry HUD Strip (4 Dynamic Dimension Counters) */}
                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Voice QoS Bandwidth</span>
                      <Network className="size-3.5 text-cyan-400" />
                    </div>
                    <p className="mt-1.5 font-mono text-xs sm:text-sm font-extrabold text-white">
                      {currentTelemetry.voiceBandwidth}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">&lt; 15ms Jitter Guaranteed</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Concurrent SIP Streams</span>
                      <Activity className="size-3.5 text-amber-400" />
                    </div>
                    <p className="mt-1.5 font-mono text-xs sm:text-sm font-extrabold text-white">
                      {currentTelemetry.concurrentAudio}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Zero-Drop Call Transcoding</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Audio Recording Vault</span>
                      <HardDrive className="size-3.5 text-emerald-400" />
                    </div>
                    <p className="mt-1.5 font-mono text-xs sm:text-sm font-extrabold text-white">
                      {currentTelemetry.recordingVault}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">AES-256 Encrypted at Rest</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Database IOPS &amp; WAL</span>
                      <Database className="size-3.5 text-violet-400" />
                    </div>
                    <p className="mt-1.5 font-mono text-xs sm:text-sm font-extrabold text-white">
                      {currentTelemetry.dbThroughput}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Sub-0.4s Screen-Pop Speed</p>
                  </div>
                </div>

                {/* Certified Hardware OEM Ecosystem Strip */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-slate-300">
                  <div className="flex flex-wrap items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white">Hardware Compatibility Certified:</span>
                    <span className="text-slate-300 font-mono text-[11px]">
                      {currentTelemetry.oemList}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
                    <Zap className="size-3.5 text-amber-400 fill-amber-400" />
                    <span>Power Budget: {currentTelemetry.powerBudget}</span>
                  </div>
                </div>

                {/* 6 High-Contrast Dimension Specification Cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Compute (CPU) */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/50 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-indigo-950/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-indigo-400">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-500/30">
                          <Cpu className="size-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                          Compute (CPU)
                        </span>
                      </div>
                      <span className="rounded-md border border-indigo-400/30 bg-indigo-950/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-indigo-200">
                        Ded. Cores
                      </span>
                    </div>
                    <p className="mt-3.5 font-mono text-sm sm:text-base font-extrabold text-white">
                      {activeScopingTier.cpu}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      Dimensioned for zero-throttle audio encoding, SIP transcoding, and real-time CRM queue routing.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Architecture</span>
                      <span className="text-indigo-300 font-semibold">x86-64 Enterprise</span>
                    </div>
                  </div>

                  {/* System Memory (RAM) */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-200 hover:border-violet-400/50 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-violet-950/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-violet-400">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-violet-950/80 border border-violet-500/30">
                          <Layers className="size-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                          System Memory (RAM)
                        </span>
                      </div>
                      <span className="rounded-md border border-violet-400/30 bg-violet-950/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-violet-200">
                        ECC Verified
                      </span>
                    </div>
                    <p className="mt-3.5 font-mono text-sm sm:text-base font-extrabold text-white">
                      {activeScopingTier.ram}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      Dedicated Redis telemetry buffers, PostgreSQL shared memory, and in-memory agent presence state.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Integrity</span>
                      <span className="text-violet-300 font-semibold">Multi-Bit Error Check</span>
                    </div>
                  </div>

                  {/* Storage Subsystem */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-200 hover:border-emerald-400/50 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-emerald-950/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-emerald-400">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/30">
                          <HardDrive className="size-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                          Storage Array (NVMe/SAS)
                        </span>
                      </div>
                      <span className="rounded-md border border-emerald-400/30 bg-emerald-950/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-emerald-200">
                        RAID Ready
                      </span>
                    </div>
                    <p className="mt-3.5 font-mono text-sm sm:text-base font-extrabold text-white">
                      {activeScopingTier.storage}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      High-IOPS NVMe WAL caching for live database writes paired with high-capacity encrypted call audio vaults.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Encryption</span>
                      <span className="text-emerald-300 font-semibold">AES-256 at Rest</span>
                    </div>
                  </div>

                  {/* Networking & Voice QoS */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/50 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan-950/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-cyan-400">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/30">
                          <Network className="size-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                          Networking &amp; Voice QoS
                        </span>
                      </div>
                      <span className="rounded-md border border-cyan-400/30 bg-cyan-950/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-cyan-200">
                        &lt; 15ms Jitter
                      </span>
                    </div>
                    <p className="mt-3.5 font-mono text-sm sm:text-base font-extrabold text-white">
                      {activeScopingTier.network}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      DSCP EF priority voice packet tagging ensures crystal-clear call audio even during bulk operations.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Prioritization</span>
                      <span className="text-cyan-300 font-semibold">DSCP 46 / CoS 5 Voice</span>
                    </div>
                  </div>

                  {/* Telephony Interconnect */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-200 hover:border-amber-400/50 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-amber-950/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-amber-400">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-500/30">
                          <Activity className="size-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                          Telephony Interconnect
                        </span>
                      </div>
                      <span className="rounded-md border border-amber-400/30 bg-amber-950/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-amber-200">
                        Carrier Grade
                      </span>
                    </div>
                    <p className="mt-3.5 font-mono text-sm sm:text-base font-extrabold text-white">
                      {activeScopingTier.telephony}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      Direct integration with local telco SIP providers, legacy E1/PRI gateways, or international SIP carriers.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Redundancy</span>
                      <span className="text-amber-300 font-semibold">{currentTelemetry.failoverTime}</span>
                    </div>
                  </div>

                  {/* Hypervisor / OS Support */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-200 hover:border-sky-400/50 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-sky-950/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-sky-400">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-sky-950/80 border border-sky-500/30">
                          <Server className="size-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                          Hypervisor / OS Support
                        </span>
                      </div>
                      <span className="rounded-md border border-sky-400/30 bg-sky-950/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-sky-200">
                        No Lock-in
                      </span>
                    </div>
                    <p className="mt-3.5 font-mono text-sm sm:text-base font-extrabold text-white">
                      {activeScopingTier.deploymentEnv}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      Deploy directly onto bare-metal Linux or within existing VMware, Proxmox, or Nutanix hypervisors.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Sovereignty</span>
                      <span className="text-sky-300 font-semibold">100% Offline Capable</span>
                    </div>
                  </div>
                </div>

                {/* Visual Floor-to-Server Interconnect Topology */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4.5 backdrop-blur-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3 text-xs">
                    <span className="font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                      <Workflow className="size-3.5 shrink-0" />
                      <span>Zero-Waste Integration Architecture</span>
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400 shrink-0">● 100% Non-Disruptive Hot Cutover</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
                        <Laptop className="size-4 text-sky-400" />
                        <span>1. Existing Computers</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Chrome/Edge WebRTC softphones run directly on agents&apos; current Windows/Mac PCs with zero client upgrades.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
                        <Network className="size-4 text-cyan-400" />
                        <span>2. Office LAN Switch</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Existing network switches tag audio with DSCP EF (Expedited Forwarding) for jitter-free floor audio.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
                        <Server className="size-4 text-blue-400" />
                        <span>3. BITS Sovereign Node</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Installed on your existing server room hardware or rack, running the complete dialer and database.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
                        <Activity className="size-4 text-amber-400" />
                        <span>4. Telco SIP / PRI</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Direct connection to your current telecom provider lines or SIP gateway with automated carrier failover.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cockpit Bottom Action Deck */}
                <div className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-5 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 shrink-0 shadow-sm">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <span>Complimentary Infrastructure Scoping Session Included</span>
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                          100% Free Audit
                        </span>
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Under mutual NDA, we deliver an exact Bill of Materials (BOM), Visio rack cabling elevation, and power/cooling budget.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={handleCopySpec}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2.5 font-mono text-xs font-bold text-slate-200 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {copiedSpec ? (
                        <>
                          <CheckCheck className="size-4 text-emerald-400" />
                          <span className="text-emerald-300">Blueprint Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-4 text-slate-400" />
                          <span>Copy Sizing Specs</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openModal(`Complimentary Hardware Audit & Visio Rack Blueprint (${activeScopingTier.floorSize})`)
                      }
                      className="inline-flex min-h-[46px] flex-1 lg:flex-none items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Request Hardware Audit</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>

        {/* ── 4-STEP TECHNICAL SCOPING METHODOLOGY ── */}
        <div className="mx-auto mt-16 max-w-6xl">
          <Reveal delay={0.16}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-blue-600" />
                  <span>TURNKEY DEPLOYMENT METHODOLOGY</span>
                </span>
                <h4 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  End-to-End On-Premises Engineering Delivery Workflow
                </h4>
              </div>
              <p className="text-xs text-slate-600 font-medium max-w-sm sm:text-right">
                Zero business downtime. Proven turnkey cutover protocol executed by experienced senior infrastructure architects.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {scopingProcessSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                      <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-extrabold text-blue-700 border border-blue-200/80">
                        STEP {step.step}
                      </span>
                      <div className="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                        {idx === 0 && <Search className="size-4" />}
                        {idx === 1 && <Cpu className="size-4" />}
                        {idx === 2 && <Terminal className="size-4" />}
                        {idx === 3 && <CheckCircle2 className="size-4" />}
                      </div>
                    </div>

                    <div className="mt-3 inline-block rounded-md bg-slate-100/90 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {idx === 0 && "Days 1 – 2"}
                      {idx === 1 && "Days 3 – 5"}
                      {idx === 2 && "Days 6 – 10"}
                      {idx === 3 && "Days 11 – 14"}
                    </div>

                    <h5 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h5>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Deliverable:
                    </span>
                    <span className="text-xs font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-blue-600" />
                      <span>
                        {idx === 0 && "Hardware BOM & Server Audit Report"}
                        {idx === 1 && "Capacity & QoS Dimensioning Blueprint"}
                        {idx === 2 && "Hardened Cluster & SIP Interconnect"}
                        {idx === 3 && "UAT Sign-off & 24/7 Operations Runbook"}
                      </span>
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
