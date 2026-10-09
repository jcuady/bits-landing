"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { PRODUCT_COUNT } from "@/lib/site";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductModule {
  name: string;
  badge: string;
  href: string;
}

interface ProductCategory {
  id: string;
  code: string;
  title: string;
  problem: string;
  summary: string;
  visual: string;
  alt: string;
  capabilityTag: string;
  benchmark: string;
  pulseColor: string;
  glowColor: string;
  accentBorder: string;
  href: string;
  products: ProductModule[];
}

const productCategories: ProductCategory[] = [
  {
    id: "oms-360",
    code: "CATEGORY 01",
    title: "OPERATIONS 360",
    problem: "Unify collections, PTP tracking, and field operations",
    summary:
      "The top OMS and collections CRM. 360° account dossiers, PTP watchdog, mobile field agent GPS app, QA scorecards, and live supervisor dashboards.",
    visual: "/brand/families/family-customer-operations.jpg",
    alt: "BITS OPERATIONS 360 3D collections telemetry and operations core",
    capabilityTag: "Collections CRM · Field App · QA HUD · Dashboards",
    benchmark: "GPS Tagged Visits · Session-Gated Security",
    pulseColor: "bg-blue-500",
    glowColor: "from-blue-500/15 via-sky-400/10 to-transparent",
    accentBorder: "hover:border-blue-400/50",
    href: "/#operations-360",
    products: [
      { name: "Collections CRM", badge: "360° Account Dossiers", href: "/#operations-360" },
      { name: "PTP Watchdog", badge: "Automated Alerts", href: "/#operations-360" },
      { name: "Field Agent App", badge: "GPS-Tagged Visits", href: "/#operations-360" },
      { name: "QA & Scorecards", badge: "Supervisor HUD", href: "/#operations-360" },
    ],
  },
  {
    id: "ai-agents",
    code: "CATEGORY 02",
    title: "BITSagent AI",
    problem: "Automate calls, emails, and handoffs with human-like AI",
    summary:
      "Human-like voice and email agents that work 24/7. Multi-agent teams with shared customer context. Self-healing, with seamless human handoff when escalation is needed.",
    visual: "/brand/families/family-platform-ai.jpg",
    alt: "BITSagent AI autonomous voice and email neural engine",
    capabilityTag: "Voice Agents · Email Outreach · Multi-Agent · Handoff",
    benchmark: "Autonomous Resolution · Zero Wait Times",
    pulseColor: "bg-violet-500",
    glowColor: "from-violet-500/15 via-purple-400/10 to-transparent",
    accentBorder: "hover:border-violet-400/50",
    href: "/bitsagent",
    products: [
      { name: "Voice Agent", badge: "Human-Like Calls", href: "/bitsagent" },
      { name: "Email Agent", badge: "Autonomous Outreach", href: "/bitsagent" },
      { name: "Multi-Agent Teams", badge: "Shared Context", href: "/bitsagent" },
      { name: "Human Handoff", badge: "Seamless Escalation", href: "/bitsagent" },
    ],
  },
  {
    id: "crm-suite",
    code: "CATEGORY 03",
    title: "BITScrm Suite",
    problem: "Sales, support, and marketing in one connected platform",
    summary:
      "Three connected modules: Sales CRM with visual pipelines, Customer Support with omnichannel ticket queue and SLA tracking, and Marketing Automation with journey builders.",
    visual: "/brand/families/family-crm-suite.jpg",
    alt: "BITScrm Suite sales pipelines and omnichannel support desk",
    capabilityTag: "Sales Pipeline · Support Tickets · Marketing Journeys",
    benchmark: "Unified CRM Schema · Zero Replatforming",
    pulseColor: "bg-emerald-500",
    glowColor: "from-emerald-500/15 via-teal-400/10 to-transparent",
    accentBorder: "hover:border-emerald-400/50",
    href: "/products/crm",
    products: [
      { name: "Sales CRM", badge: "Pipeline & CPQ", href: "/products/sales" },
      { name: "Customer Support", badge: "SLA & Ticketing", href: "/products/support" },
      { name: "Marketing Automation", badge: "Journey Builder", href: "/products/marketing" },
    ],
  },
  {
    id: "enterprise",
    code: "CATEGORY 04",
    title: "BITS Enterprise",
    problem: "Automate payroll compliance and workforce at scale",
    summary:
      "BITS Payroll with 100% statutory compliance (SSS, PhilHealth, Pag-IBIG, BIR TRAIN Law) and direct bank disbursement. BITS HRMS with biometric shift rostering and automated leave management.",
    visual: "/brand/families/family-business-operations.jpg",
    alt: "BITS Enterprise payroll engine and workforce HRMS",
    capabilityTag: "Statutory Payroll · TRAIN Law · Biometrics · HRMS",
    benchmark: "100% Statutory Compliance · Direct Bank Feeds",
    pulseColor: "bg-amber-500",
    glowColor: "from-amber-500/15 via-orange-400/10 to-transparent",
    accentBorder: "hover:border-amber-400/50",
    href: "/products/payroll",
    products: [
      { name: "BITS Payroll", badge: "TRAIN Law · Bank Feeds", href: "/products/payroll" },
      { name: "BITS HRMS", badge: "Biometric · Rostering", href: "/products/hrms" },
    ],
  },
  {
    id: "custom-solutions",
    code: "CATEGORY 05",
    title: "BITS Custom Solutions",
    problem: "Software built exactly around how your business works",
    summary:
      "When off-the-shelf doesn't fit, we build it. Discovery, design, and delivery of bespoke operational software on the BITS sovereign stack — from concept to production.",
    visual: "/brand/families/family-customer-experience.jpg",
    alt: "BITS Custom bespoke software engineering",
    capabilityTag: "Discovery Workshop · Bespoke Architecture · SLAs",
    benchmark: "Dedicated Stack · Sovereign Code Ownership",
    pulseColor: "bg-sky-500",
    glowColor: "from-sky-500/15 via-blue-400/10 to-transparent",
    accentBorder: "hover:border-sky-400/50",
    href: "/#contact",
    products: [
      { name: "Discovery Workshop", badge: "Requirements Mapping", href: "/#contact" },
      { name: "Custom Architecture", badge: "Sovereign Stack", href: "/#contact" },
      { name: "Bespoke Modules", badge: "Tailored Workflows", href: "/#contact" },
      { name: "Enterprise Support", badge: "Dedicated SLA", href: "/#contact" },
    ],
  },
];

export function ProductFamilies() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Pin the container and animate cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return; // Skip the first card as it's already in place

        // Animate the current card up
        tl.fromTo(
          card,
          { y: "100vh", opacity: 0.5, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "none" }
        );

        // Animate all previous cards to scale down and dim slightly
        const previousCards = cards.slice(0, index);
        tl.to(
          previousCards,
          {
            scale: (i) => 1 - (index - i) * 0.04,
            y: (i) => -(index - i) * 20,
            opacity: (i) => 1 - (index - i) * 0.15,
            duration: 1,
            ease: "none",
          },
          "<"
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <Section id="product-families" className="relative bg-slate-50 overflow-hidden">
      {/* Background styling for premium look */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-sky-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-top opacity-20 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]" />
      </div>

      <div
        ref={containerRef}
        className="relative h-screen w-full flex flex-col items-center justify-center pt-16 pb-8 px-4 sm:px-6"
      >
        <div className="text-center mb-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">
            Product Categories
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Explore our {PRODUCT_COUNT} purpose-built categories. Scroll to uncover the ecosystem.
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-[65vh] sm:h-[70vh]">
          {productCategories.map((category, idx) => (
            <div
              key={category.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full p-6 sm:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col justify-between"
              style={{ zIndex: idx, transformOrigin: "top center" }}
            >
              <div className="flex flex-col md:flex-row gap-8 h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-blue-600 font-mono text-sm uppercase tracking-[0.2em] mb-4 font-bold">
                    {category.code}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6 font-medium max-w-md">
                    {category.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {category.products.map((prod) => (
                      <Link
                        href={prod.href}
                        key={prod.name}
                        className="group bg-slate-50/80 border border-slate-200/60 rounded-xl p-3 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all backdrop-blur-md"
                      >
                        <div className="text-slate-900 font-bold text-sm group-hover:text-blue-600 transition-colors">
                          {prod.name}
                        </div>
                        <div className="text-slate-500 text-xs mt-1 font-medium">{prod.badge}</div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={category.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 self-start"
                  >
                    <span>Explore {category.title}</span>
                    <span>→</span>
                  </Link>
                </div>
                <div className="flex-1 relative h-full min-h-[250px] md:min-h-0 rounded-3xl overflow-hidden border border-slate-200/50 shadow-inner hidden sm:block bg-gradient-to-br from-blue-50/50 to-slate-50/50">
                  <Image src={category.visual} alt={category.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
