"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  deploymentModels,
  hardwareScopingTiers,
  scopingProcessSteps,
  PRODUCT_COUNT,
} from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";


export function DeploymentModels() {
  const { openModal } = useConsultationModal();
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
              Every engine in our {PRODUCT_COUNT}-product catalog can be run in our secure <strong className="text-slate-900 font-bold">Managed Cloud</strong> with zero hardware needed, or installed directly on <strong className="text-slate-900 font-bold">Your Own Office Servers</strong> for complete privacy and one-time setup ownership.
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
                <span
                  className={cn(
                    "font-mono text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider",
                    selectedModel === "cloud"
                      ? "bg-white/20 text-white"
                      : "bg-sky-100 text-blue-700"
                  )}
                >
                  Cloud
                </span>
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
                <span
                  className={cn(
                    "font-mono text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider",
                    selectedModel === "on-prem"
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  )}
                >
                  On-Prem
                </span>
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
                            className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-mono text-[10px] font-bold"
                            aria-hidden
                          >
                            ✓
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
                        <span className="font-mono text-[11px] font-black text-blue-600">⚡</span>
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
                        <span className="text-xs font-bold transition-transform duration-200 group-hover:translate-x-1">→</span>
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
            <div className="relative overflow-hidden rounded-3xl border border-sky-300/40 bg-gradient-to-br from-[#103d85] via-[#164ba8] to-[#1e5ecc] p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20">
              {/* Soft ambient sheen */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-sky-300/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-white/15 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-sky-100 backdrop-blur-xs">
                    <span className="font-mono text-[10px] font-black text-sky-200">[01/18]</span>
                    <span>Multi-Product Modular Architecture</span>
                  </div>
                  <h3 className="mt-2.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Combine Any of Our {PRODUCT_COUNT} Products into a Unified Deployment
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                    Our modular engines share a single database layer and one operational record. Whether starting with the collections CRM alongside ERP payroll or deploying a full {PRODUCT_COUNT}-product sovereign operational suite, there is zero duplicate server footprint and zero custom glue code required. Access is gated by a server-side session check; there is no role-based permission matrix in this build.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[0.7rem] font-mono text-sky-100 border border-white/20 backdrop-blur-xs">
                      <span className="font-mono text-emerald-300 font-bold text-[10px]">✓</span>
                      Shared PostgreSQL &amp; Redis Bus
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[0.7rem] font-mono text-sky-100 border border-white/20 backdrop-blur-xs">
                      <span className="font-mono text-emerald-300 font-bold text-[10px]">✓</span>
                      {/* SYSTEM_AUDIT.md §50. Was "Centralized SSO & RBAC" behind
                          a green tick. No SSO or SAML integration exists — the
                          only occurrences in this codebase are a mock ticket cell
                          and a mock email subject — and RBAC is not enforced:
                          requireCrmUser() authenticates a session and never reads
                          a role, so any signed-in user can read every CRM record.
                          Both are banned attestations. Replaced with the control
                          that is real and equally deployable. */}
                      Session-Gated CRM &amp; RLS
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[0.7rem] font-mono text-sky-100 border border-white/20 backdrop-blur-xs">
                      <span className="font-mono text-emerald-300 font-bold text-[10px]">✓</span>
                      Zero Duplicated Infrastructure
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[0.7rem] font-mono text-sky-100 border border-white/20 backdrop-blur-xs">
                      <span className="font-mono text-emerald-300 font-bold text-[10px]">✓</span>
                      Hybrid Cloud/On-Prem Ready
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    href="/#solutions"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-extrabold text-blue-950 shadow-md transition-all hover:bg-sky-50 active:scale-[0.98]"
                  >
                    <span>Open Solution Stacking Studio</span>
                    <span className="text-blue-700 font-bold text-xs">→</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => openModal("Custom Enterprise Deployment & Migration Scoping")}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-xs transition-colors hover:bg-white/20 active:scale-[0.98]"
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
                    <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
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
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-black shadow-2xs">
                      01
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Automatic Security Updates
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    Regular security patches, automatic data protection, and strict privacy controls to keep your customer records safe at all times.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-semibold text-slate-700">
                    <span className="font-mono text-emerald-600 font-bold text-[10px]">✓</span> Proactively patched
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-mono text-xs font-black shadow-2xs">
                      02
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Modern AI &amp; Speed Upgrades
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    As newer voice tools, faster speech processing, and better calling technology emerge, BITS automatically updates your system so you stay ahead.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-semibold text-slate-700">
                    <span className="font-mono text-emerald-600 font-bold text-[10px]">✓</span> Continuous engine upgrades
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 font-mono text-xs font-black shadow-2xs">
                      03
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Custom Features On Demand
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    Need custom reports, special approval steps, or a direct link to your existing software? Our team builds tailored features for your exact business.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[0.65rem] font-semibold text-blue-700">
                    <span>Tailored scope &amp; engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Existing Servers Scoping & Hardware Sizing Blueprint: Elevated Hero Cloud Cockpit */}
        <div className="mx-auto mt-16 sm:mt-24 max-w-6xl">
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-12 text-white shadow-2xl shadow-blue-600/25 border border-sky-300/40 bg-gradient-to-br from-[#124294] via-[#1b55c6] to-[#2563eb]">
              {/* Atmospheric Animated Drifting Clouds Canvas (Matching Hero Aesthetic) */}
              <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
                {/* Layer 1: High-Definition Sky & Cloud Horizon with Fluid Drift */}
                <div className="absolute inset-0">
                  <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
                    <Image
                      src="/images/hero-sky-bg.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-cover object-center opacity-55 scale-105 select-none"
                    />
                  </div>
                </div>

                {/* Layer 2: Counter-Harmonic Cloud Mist Flow */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen">
                  <div className="relative size-full animate-cloud-drift-reverse will-change-transform transform-gpu">
                    <Image
                      src="/images/hero-sky-bg.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      quality={75}
                      className="object-cover object-top select-none scale-110 filter blur-[1px]"
                    />
                  </div>
                </div>

                {/* Layer 3: Celestial Radial Sunbreak Bloom */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[380px] w-[1100px] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),rgba(56,189,248,0.25)_40%,transparent_75%)] blur-[80px]" />

                {/* Layer 4: Azure Color Calibration Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-700/40 via-blue-600/30 to-blue-900/60 mix-blend-overlay" />

                {/* Layer 5: Precision Architectural Matrix Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10">
                {/* Header Block */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/20">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 font-mono text-[0.72rem] font-bold text-white shadow-sm backdrop-blur-md">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                      </span>
                      <span>OFFICE SERVER SETUP · ZERO HARDWARE WASTE</span>
                    </div>
                    <h3 className="mt-3.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl drop-shadow-sm">
                      Already Have Computers or Servers? We Set Up Everything For You
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
                      Keep using your existing equipment. Our technical engineering team audits your current office PCs or server racks and deploys BITS OMS on-premise—zero expensive new hardware required.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-200 bg-emerald-950/40 px-4 py-2.5 rounded-2xl border border-emerald-400/30 backdrop-blur-md shadow-sm">
                    <span className="font-mono text-[10px] font-black text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40">✓ PASS</span>
                    <span>Zero Hardware Waste Guarantee</span>
                  </div>
                </div>

                {/* Floor Sizing Segmented Control */}
                <div className="mt-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-sky-200">
                      Select Contact Center Floor Scale:
                    </span>
                    <span className="font-mono text-[0.75rem] text-white/90 font-semibold bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                      {/* §89 — "3 Presets Available" was TRUE (hardwareScopingTiers has exactly 3
                      entries) but hand-typed, with its referent imported into this
                      very file. §87 flagged it as "needs checking"; checked. */}
                      {hardwareScopingTiers.length} Presets Available · Custom Sizing on Demand
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 rounded-2xl border border-white/25 bg-white/10 p-2 shadow-2xl backdrop-blur-xl">
                    {hardwareScopingTiers.map((tier, idx) => (
                      <button
                        key={tier.floorSize}
                        type="button"
                        onClick={() => setSelectedTier(idx)}
                        className={cn(
                          "group relative flex min-h-[58px] cursor-pointer flex-col justify-center rounded-xl px-4 py-2.5 text-left transition-all duration-200",
                          selectedTier === idx
                            ? "bg-white text-slate-900 shadow-xl shadow-blue-950/20 ring-2 ring-sky-300"
                            : "text-white/90 hover:bg-white/15 hover:text-white"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "size-2.5 rounded-full transition-colors",
                                selectedTier === idx ? "bg-blue-600" : "bg-white/40 group-hover:bg-white"
                              )}
                            />
                            <span className="font-mono text-xs font-extrabold tracking-tight">
                              {tier.floorSize}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "rounded-md px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide transition-colors",
                              selectedTier === idx
                                ? "bg-blue-50 text-blue-700 border border-blue-200/80"
                                : "bg-white/15 text-white border border-white/20"
                            )}
                          >
                            {idx === 0 ? "Boutique" : idx === 1 ? "Mid-Floor" : "Enterprise"}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-1 text-[0.72rem] font-medium",
                            selectedTier === idx ? "text-slate-600" : "text-blue-100/80"
                          )}
                        >
                          {tier.tier}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hardware Specification Cockpit Blueprint */}
                <div className="mt-6 overflow-hidden rounded-3xl border border-white/30 bg-white/[0.12] backdrop-blur-2xl shadow-2xl shadow-blue-950/30">
                  {/* Cockpit Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-white/[0.08] px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-white">
                        Datacenter Blueprint Specification
                      </span>
                      <span className="hidden text-white/40 sm:inline">|</span>
                      <span className="hidden font-mono text-[0.75rem] font-semibold text-blue-100 sm:inline">
                        {activeScopingTier.tier}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 font-mono text-[0.72rem] font-bold text-white shadow-xs">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        <span>Target: {activeScopingTier.floorSize}</span>
                      </span>
                    </div>
                  </div>

                  {/* Certified Hardware Ecosystem Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.05] px-6 py-2.5 text-xs text-white/90">
                    <div className="flex flex-wrap items-center gap-1.5 font-medium">
                      <span className="font-mono text-emerald-400 font-bold text-xs">✓</span>
                      <span>Hardware Compatibility Certified:</span>
                      <span className="font-bold text-white">
                        Dell PowerEdge · HPE ProLiant · Supermicro · Cisco UCS · Proxmox VE · VMware ESXi
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[0.7rem] text-sky-200">
                      <span className="font-mono text-[11px] text-amber-300">⚡</span>
                      <span>QoS &amp; Session Sizing v4.2</span>
                    </div>
                  </div>

                  {/* 6 High-Contrast Glass Specification Cards */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Compute (CPU) */}
                      <div className="group rounded-2xl border border-white/20 bg-white/[0.14] hover:bg-white/[0.22] hover:border-white/45 p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-sky-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 border border-white/30 shadow-xs font-mono text-[10px] font-black text-sky-300">
                              CPU
                            </div>
                            <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-sky-100">
                              Compute (CPU)
                            </span>
                          </div>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-white border border-white/25">
                            Ded. Cores
                          </span>
                        </div>
                        <p className="mt-3.5 font-mono text-base font-extrabold text-white tracking-tight">
                          {activeScopingTier.cpu}
                        </p>
                        <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                          Dimensioned for zero-throttle request handling and real-time CRM queue routing.
                        </p>
                      </div>

                      {/* System Memory (RAM) */}
                      <div className="group rounded-2xl border border-white/20 bg-white/[0.14] hover:bg-white/[0.22] hover:border-white/45 p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-indigo-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 border border-white/30 shadow-xs font-mono text-[10px] font-black text-indigo-300">
                              RAM
                            </div>
                            <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-sky-100">
                              System Memory (RAM)
                            </span>
                          </div>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-white border border-white/25">
                            ECC Verified
                          </span>
                        </div>
                        <p className="mt-3.5 font-mono text-base font-extrabold text-white tracking-tight">
                          {activeScopingTier.ram}
                        </p>
                        <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                          Dedicated Redis telemetry buffers, PostgreSQL shared memory, and in-memory agent presence state.
                        </p>
                      </div>

                      {/* Storage Subsystem */}
                      <div className="group rounded-2xl border border-white/20 bg-white/[0.14] hover:bg-white/[0.22] hover:border-white/45 p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 border border-white/30 shadow-xs font-mono text-[10px] font-black text-emerald-300">
                              SSD
                            </div>
                            <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-sky-100">
                              Storage Array (NVMe / SAS)
                            </span>
                          </div>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-white border border-white/25">
                            RAID Ready
                          </span>
                        </div>
                        <p className="mt-3.5 font-mono text-base font-extrabold text-white tracking-tight">
                          {activeScopingTier.storage}
                        </p>
                        <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                          High-IOPS NVMe WAL caching for live database writes paired with high-capacity encrypted call audio vaults.
                        </p>
                      </div>

                      {/* Networking & Voice QoS */}
                      <div className="group rounded-2xl border border-white/20 bg-white/[0.14] hover:bg-white/[0.22] hover:border-white/45 p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 border border-white/30 shadow-xs font-mono text-[10px] font-black text-cyan-300">
                              QOS
                            </div>
                            <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-sky-100">
                              Networking &amp; Voice QoS
                            </span>
                          </div>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-white border border-white/25">
                            &lt; 15ms Jitter
                          </span>
                        </div>
                        <p className="mt-3.5 font-mono text-base font-extrabold text-white tracking-tight">
                          {activeScopingTier.network}
                        </p>
                        <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                          DSCP EF priority voice packet tagging ensures crystal-clear call audio even during bulk operations.
                        </p>
                      </div>

                      {/* SYSTEM_AUDIT.md §53. This card was "SIP / Telephony Interconnect / Carrier
                        Grade" with a `telephony` figure on each tier. There is no
                        telephony in this build, so the whole card is replaced by
                        the equivalent data-plane card. */}
                      <div className="group rounded-2xl border border-white/20 bg-white/[0.14] hover:bg-white/[0.22] hover:border-white/45 p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-amber-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 border border-white/30 shadow-xs font-mono text-[10px] font-black text-amber-300">
                              DB
                            </div>
                            <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-sky-100">
                              Data Interconnect
                            </span>
                          </div>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-white border border-white/25">
                            Row-Level Security
                          </span>
                        </div>
                        <p className="mt-3.5 font-mono text-base font-extrabold text-white tracking-tight">
                          {activeScopingTier.telephony}
                        </p>
                        <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                          No telephony integration is part of this build; data access is via REST and server actions,
                          with row-level security verified against the anon role.
                        </p>
                      </div>

                      {/* Hypervisor / OS Support */}
                      <div className="group rounded-2xl border border-white/20 bg-white/[0.14] hover:bg-white/[0.22] hover:border-white/45 p-5 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 text-white">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 border border-white/30 shadow-xs font-mono text-[10px] font-black text-sky-300">
                              OS
                            </div>
                            <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-sky-100">
                              Hypervisor / OS Support
                            </span>
                          </div>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-white border border-white/25">
                            No Lock-in
                          </span>
                        </div>
                        <p className="mt-3.5 font-mono text-base font-extrabold text-white tracking-tight">
                          {activeScopingTier.deploymentEnv}
                        </p>
                        <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                          Deploy directly onto bare-metal Linux or within existing VMware, Proxmox, or Nutanix hypervisors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cockpit Bottom Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 bg-white/[0.08] px-6 py-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 border border-white/30 text-emerald-300 font-mono text-xs font-black shrink-0 shadow-xs">
                        NDA
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Complimentary Infrastructure Scoping Session Included
                        </p>
                        <p className="text-xs text-blue-100/80">
                          Under mutual NDA, we deliver an exact Bill of Materials (BOM), Visio rack cabling diagram, and power budget.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openModal("Complimentary Hardware Audit & Rack Diagram (On-Premises)")}
                      className="group inline-flex min-h-[46px] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white hover:bg-blue-50 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-blue-900 shadow-xl shadow-blue-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Request Hardware Audit</span>
                      <span className="text-blue-700 font-bold text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>

                {/* 4-Step Technical Scoping Methodology */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-4">
                    <div>
                      <span className="font-mono text-[0.72rem] font-extrabold uppercase tracking-widest text-sky-200">
                        TURNKEY DEPLOYMENT METHODOLOGY
                      </span>
                      <h4 className="mt-1 text-lg sm:text-xl font-extrabold text-white">
                        End-to-End On-Premises Engineering Delivery Workflow
                      </h4>
                    </div>
                    <p className="text-xs text-blue-100/90 font-medium">
                      Guided step-by-step setup from initial review to live operations
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {scopingProcessSteps.map((step, idx) => (
                      <div
                        key={step.step}
                        className="group relative flex flex-col justify-between rounded-2xl border border-white/20 bg-white/[0.12] hover:bg-white/[0.2] p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3">
                            <span className="inline-flex items-center justify-center rounded-lg bg-white/20 px-2.5 py-1 font-mono text-xs font-bold text-white border border-white/30">
                              STEP {step.step}
                            </span>
                            <div className="flex size-7 items-center justify-center rounded-md bg-white/20 font-mono text-xs font-black text-white group-hover:bg-white group-hover:text-blue-900 transition-colors">
                              0{idx + 1}
                            </div>
                          </div>

                          <h5 className="mt-3.5 text-sm font-bold text-white">
                            {step.title}
                          </h5>
                          <p className="mt-2 text-xs text-blue-100/90 leading-relaxed font-normal">
                            {step.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/15">
                          <span className="font-mono text-[0.65rem] font-bold text-sky-200 uppercase tracking-wider block">
                            Deliverable:
                          </span>
                          <span className="text-[0.72rem] font-semibold text-white mt-0.5 block">
                            {idx === 0 && "Hardware BOM & Server Audit Report"}
                            {idx === 1 && "Capacity & QoS Dimensioning Blueprint"}
                            {idx === 2 && "Hardened Cluster & Session Interconnect"}
                            {idx === 3 && "UAT Sign-off & 24/7 Operations Runbook"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
