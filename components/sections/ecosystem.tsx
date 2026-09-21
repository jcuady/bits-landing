"use client";

import * as React from "react";
import Link from "next/link";
import { ecosystemPillars } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function Ecosystem() {
  const [activePillarId, setActivePillarId] = React.useState<string>(ecosystemPillars[0].id);

  const activePillar =
    ecosystemPillars.find((p) => p.id === activePillarId) || ecosystemPillars[0];

  return (
    <Section id="ecosystem" className="relative overflow-hidden bg-white">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.06),transparent)]" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-blue-500/[0.03] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Unified Technology Platform
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900">
              The BITS Solutions Ecosystem
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[52ch] text-slate-600">
              A cohesive operational stack combining CRM, workflow automation, autonomous AI agents,
              and enterprise integrations into one unified environment.
            </p>
          </Reveal>
        </div>

        {/* 6-Pillar Interactive Grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Pillar Selector List (Left) */}
          <div className="space-y-3 lg:col-span-5">
            {ecosystemPillars.map((pillar) => {
              const isSelected = pillar.id === activePillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillarId(pillar.id)}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                    isSelected
                      ? "border-blue-500/40 bg-blue-50/50 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20"
                      : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors",
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                    )}
                  >
                    {pillar.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={cn(
                          "text-base font-bold transition-colors",
                          isSelected ? "text-blue-900" : "text-slate-800 group-hover:text-slate-900"
                        )}
                      >
                        {pillar.title}
                      </h3>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider",
                          isSelected
                            ? "bg-blue-200/60 text-blue-800"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {pillar.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep-Dive Card (Right) */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xl shadow-slate-900/5 lg:col-span-7 lg:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">
                  PILLAR {activePillar.index} OF 06
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {activePillar.title}
                </h3>
              </div>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {activePillar.badge}
              </span>
            </div>

            <p className="mt-4 text-base font-medium text-slate-800">
              {activePillar.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {activePillar.description}
            </p>

            {/* Core Capabilities */}
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Capabilities & Architecture
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {activePillar.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-600/10 font-bold text-blue-600">
                      ✓
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={activePillar.link}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                <span>Explore {activePillar.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/#contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                Request Architecture Consultation
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
