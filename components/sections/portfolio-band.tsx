"use client";

import Link from "next/link";
import { ArrowRight, Building2, Cloud, Cpu, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard, glassCardInteractive } from "@/components/ui/glass-card";
import { PRODUCT_COUNT } from "@/lib/site";

/**
 * PortfolioBand — breadth, right after the depth.
 *
 * The page leads with Operations 360, which is right: it is the flagship and
 * the entry point. But a visitor who arrived from a link, or who is not
 * shopping for a collections CRM, needs to see that BITS is a platform company
 * and not a niche vendor.
 *
 * Three current products are featured — Operations 360, BITS CRMPBX and
 * BITS HRMS — because they serve three different buyers:
 *
 *   Operations 360   collections agencies and BPO operations
 *   BITS CRMPBX      internet service providers
 *   BITS HRMS        workforce and payroll for BPO and enterprise
 *
 * The wider catalogue sits underneath as a quiet row of names, so the scale
 * reads without becoming a wall.
 *
 * Glassmorphic cards throughout, per the brandbook's double-bezel geometry.
 */

const FEATURED = [
  {
    id: "collections",
    name: "Operations 360",
    family: "Collections & Operations",
    buyer: "Collections agencies and BPO operations",
    line: "CRM and OMS on one database — collections, PTP automation, predictive dialing and real-time QA.",
    href: "/operations-360",
    icon: Building2,
    flagship: true,
  },
  {
    id: "crmpbx",
    name: "BITS CRMPBX",
    family: "Customer Service",
    buyer: "Internet service providers",
    line: "Service desk with Asterisk PBX, call recordings and GoIP gateway support, in two isolated access tiers.",
    href: "/products/crmpbx",
    icon: Cpu,
    flagship: false,
  },
  {
    id: "hrms",
    name: "BITS HRMS & Payroll",
    family: "Workforce & Payroll",
    buyer: "BPO and enterprise workforce teams",
    line: "24/7 shift rostering, biometric timekeeping and Philippine statutory payroll built for TRAIN Law compliance.",
    href: "/products/hrms",
    icon: Users,
    flagship: false,
  },
  {
    id: "ulap",
    name: "BITS ULAP",
    family: "Messaging & Community",
    buyer: "Communities, teams and everyday messaging",
    line: "Uniting Lives Across Places — direct and group chats, channels, drop-in voice and video rooms, Maritess Hub local radar and community marketplace.",
    href: "/products/ulap",
    icon: Cloud,
    flagship: false,
  },
] as const;

export function PortfolioBand() {
  return (
    <section
      id="portfolio-band"
      className="relative scroll-mt-20 overflow-hidden border-y border-slate-200/60 bg-gradient-to-b from-slate-50 via-white to-slate-50/70 py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                The live portfolio
              </span>
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              One company. {PRODUCT_COUNT} products. One database.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Operations 360 is where most customers start. These are the other
              three we run today — different buyers, same platform underneath.
            </p>
          </div>
        </Reveal>

        {/* ── The four current products ── */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((product, i) => (
            <Reveal key={product.id} delay={0.06 * i}>
              <GlassCard
                as="article"
                className={glassCardInteractive("h-full")}
                innerClassName="flex h-full flex-col p-7"
              >
                <Link
                  href={product.href}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-blue-200/70 bg-white/70 text-blue-600">
                    <product.icon className="size-5" aria-hidden />
                  </span>

                  <span className="mt-5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-600">
                    {product.family}
                  </span>

                  <h3 className="mt-2 block text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                    {product.name}
                  </h3>

                  <span className="mt-1 block text-sm font-medium text-slate-500">
                    For {product.buyer}
                  </span>

                  <span className="mt-4 block flex-1 text-sm leading-relaxed text-slate-600">
                    {product.line}
                  </span>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    Explore {product.name}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* ── Custom engineering & full catalogue bar ── */}
        <Reveal delay={0.12}>
          <div className="mt-14 rounded-[1.75rem] border border-white/70 bg-white/50 p-7 shadow-glass-card backdrop-blur-xl sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  Compare all {PRODUCT_COUNT} live products or scope a custom build
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Every product runs on our managed cloud or your own office servers, and can be white-labeled under your brand.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 text-sm font-bold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
              >
                Browse the full catalogue
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
