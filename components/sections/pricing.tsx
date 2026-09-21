"use client";

import * as React from "react";
import Link from "next/link";
import { solutionPackages } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="solutions" className="relative overflow-hidden bg-slate-50">
      {/* Anchor alias for backwards compatibility */}
      <div id="pricing" className="sr-only" />

      {/* Subtle ambient light */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.06),transparent)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white px-4 py-1.5 backdrop-blur-md shadow-xs">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Modular Solution Packages
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900">
              Technology Sized to Your Operation
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[54ch] text-slate-600">
              BITS solutions are modular solution paths, not rigid licensing templates.
              Select a baseline tier and customize modules, integrations, and AI capabilities around your exact floor requirements.
            </p>
          </Reveal>
        </div>

        {/* 3 Solution Tiers */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {solutionPackages.map((pkg, i) => {
            const isPopular = pkg.popular;
            return (
              <Reveal key={pkg.id} delay={0.08 * i}>
                <article
                  className={cn(
                    "relative flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-300 sm:p-8",
                    isPopular
                      ? "border-2 border-blue-600 bg-white shadow-xl shadow-blue-950/10 ring-4 ring-blue-500/10"
                      : "border border-slate-200/90 bg-white/90 shadow-sm hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 shadow-md">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-white">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">
                        {pkg.tier}
                      </span>
                      {!isPopular && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-bold text-slate-600">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                      {pkg.tier === "STARTER" && "Core Operational Tier"}
                      {pkg.tier === "GROWTH" && "Integrated Scaling Tier"}
                      {pkg.tier === "ENTERPRISE" && "Enterprise Architecture Tier"}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-slate-500">
                      {pkg.tagline}
                    </p>

                    <p className="mt-4 text-[0.88rem] leading-relaxed text-slate-600">
                      {pkg.description}
                    </p>

                    {/* Highlights list */}
                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                        Capabilities & Deliverables
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <span
                              className={cn(
                                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold",
                                isPopular
                                  ? "bg-blue-600 text-white"
                                  : "bg-blue-50 text-blue-600"
                              )}
                            >
                              ✓
                            </span>
                            <span className="font-medium leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-4">
                    <Magnetic className="w-full">
                      <Link
                        href="/#contact"
                        className={cn(
                          "group flex h-12 w-full items-center justify-center gap-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-[0.98]",
                          isPopular
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 hover:bg-blue-700 hover:shadow-blue-600/35"
                            : "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <span>{pkg.primaryCta}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </Link>
                    </Magnetic>
                    <p className="mt-2.5 text-center text-[0.7rem] text-slate-400">
                      Includes custom data mapping & operational consultation
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Custom Architecture Callout Banner */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Need a completely bespoke workflow or sovereign on-premises deployment?
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Our engineering team builds custom operational software, proprietary APIs, and private cloud architecture.
            </p>
          </div>
          <Link
            href="/#contact"
            className="mt-4 inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-slate-900 px-6 text-xs font-bold text-white transition-colors hover:bg-slate-800 sm:mt-0"
          >
            Request Technical Architecture Review
          </Link>
        </div>
      </Container>
    </Section>
  );
}
