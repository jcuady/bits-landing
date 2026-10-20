"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * ProofBand — the closing trust argument.
 *
 * The homepage stated trust at position 2 and then forgot it for the next ten
 * screens. This puts it where a buyer actually asks the question — after
 * seeing the product work, before the price.
 *
 * The standards row scrolls on a slow marquee, mirroring monday.com's
 * `scrollMarquee` (21s infinite). The global prefers-reduced-motion rule in
 * app/globals.css stops it dead for anyone who has asked for less motion —
 * the row simply becomes a static, wrapped band.
 *
 * A pause on hover is a usability requirement, not decoration: a marqueer you
 * cannot stop is a WCAG 2.2.2 problem.
 */

const PROOF = [
  { label: "Zero per-seat", note: "No seat tax, ever" },
  { label: "Sub-350ms", note: "Predictive dialer" },
  { label: "98.4%", note: "Live voice" },
  { label: "100%", note: "Calls audited" },
  { label: "10m", note: "Geofence accuracy" },
  { label: "One database", note: "No replatforming" },
  { label: "Cloud or on-prem", note: "Your infrastructure" },
  { label: "24/7", note: "Always current" },
];

export function ProofBand() {
  return (
    <section
      id="proof-band"
      className="relative scroll-mt-20 overflow-hidden border-y border-slate-200/60 bg-white py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1">
                <ShieldCheck className="size-3.5 text-blue-600" aria-hidden />
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  What the platform guarantees
                </span>
              </p>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                What your operations team actually gets
              </h2>
            </div>
            <Link
              href="/security"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 bg-white px-6 font-semibold text-slate-900 transition-all hover:border-blue-300 hover:shadow-md"
            >
              See the security posture
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* ── Marquee: one duplicated track, so the loop is seamless ── */}
      <Reveal delay={0.1}>
        <div className="group relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-[bits-marquee_28s_linear_infinite] gap-4 group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 gap-4"
                aria-hidden={copy === 1}
              >
                {PROOF.map((standard) => (
                  <li
                    key={`${copy}-${standard.label}`}
                    className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/70 px-5 py-3 backdrop-blur-md"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                    <span className="text-sm font-semibold text-slate-900">
                      {standard.label}
                    </span>
                    <span className="text-xs text-slate-500">{standard.note}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="sr-only">
        Platform guarantees: {PROOF.map((p) => p.label).join(", ")}.
      </p>
    </section>
  );
}
