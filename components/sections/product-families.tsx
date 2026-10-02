"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const productFamilies = [
  {
    id: "customer-operations",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 8v6l4 2" />
      </svg>
    ),
    title: "Customer Operations",
    problem: "Run collections, contact centers, and customer relationships",
    products: ["Operations 360", "BITScrm Suite", "BITSagent AI"],
    href: "/#operations-360",
    accent: "from-blue-600 to-indigo-600",
    lightAccent: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    id: "business-operations",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="20" height="16" rx="2" />
        <path d="M4 12h20M10 6v16" />
      </svg>
    ),
    title: "Business Operations",
    problem: "Connect finance, workforce, and supply chain",
    products: ["Accounting & ERP", "HRMS & Payroll", "Inventory & Logistics"],
    href: "/products/accounting",
    accent: "from-emerald-600 to-teal-600",
    lightAccent: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    id: "customer-experience",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" />
      </svg>
    ),
    title: "Customer Experience",
    problem: "Manage bookings, queues, venues, and identity",
    products: ["Booking System", "Smart Queuing", "Sports & Venue Hub", "Smart NFC Card"],
    href: "/products/booking",
    accent: "from-amber-500 to-orange-500",
    lightAccent: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    id: "platform-ai",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 14h16M14 6v16" />
        <circle cx="14" cy="14" r="3" />
        <circle cx="14" cy="14" r="10" strokeDasharray="3 3" />
      </svg>
    ),
    title: "Platform & AI",
    problem: "Ground AI in your data, integrate systems, deploy anywhere",
    products: ["RAG Knowledge Engine", "White-Label Deployment", "Custom Engineering"],
    href: "/products/rag-engine",
    accent: "from-violet-600 to-purple-600",
    lightAccent: "bg-violet-50 border-violet-200 text-violet-700",
  },
];

export function ProductFamilies() {
  return (
    <Section
      id="product-families"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 shadow-2xs">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-700 font-mono">
                18 Products · 4 Families
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              One Platform. Every Operation.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Your Starting Point.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty">
              BITS products are organized into four connected families. Start with the family that solves your most pressing need, then expand across departments.
            </p>
          </Reveal>
        </div>

        {/* Product Family Cards */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2">
          {productFamilies.map((family, idx) => (
            <Reveal key={family.id} delay={0.06 + idx * 0.04}>
              <Link
                href={family.href}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
              >
                {/* Icon + Title Row */}
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                    family.accent
                  )}>
                    {family.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {family.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {family.problem}
                    </p>
                  </div>
                </div>

                {/* Product Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {family.products.map((product) => (
                    <span
                      key={product}
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold",
                        family.lightAccent
                      )}
                    >
                      {product}
                    </span>
                  ))}
                </div>

                {/* View Products Link */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>View products</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* View All Products CTA */}
        <Reveal delay={0.3}>
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md hover:border-slate-400"
            >
              <span>View All 18 Products</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
