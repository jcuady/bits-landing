import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * PlatformHero — shared atmospheric hero for the Operations 360 platform pages.
 *
 * Mirrors the landing-page hero (components/sections/hero.tsx) exactly: same
 * azure gradient, same static cloud plate, same sunbreak bloom and sapphire
 * vignette, same horizon mist. Extracted so /operations-360, /crm and /ai
 * cannot drift apart.
 *
 * Brand tokens per public/brandbook/bits-tokens.css:
 *   horizon ramp #0284C7 → #2377F3 → #5EA2F9
 *   electric #2563EB · signal #38BDF8 · cloud #F8FAFC
 */

export function PlatformHero({
  eyebrow,
  title,
  lede,
  primaryCta,
  secondaryCta,
  backHref,
  backLabel,
  className,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  backHref?: string;
  backLabel?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#1362df] pb-24 pt-28 sm:pb-32 sm:pt-32 lg:pb-40 lg:pt-36",
        className,
      )}
    >
      {/* ── Atmospheric sky stack (identical to the landing hero) ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1362df] via-[#2377f3] 45% via-[#3c8bf6] 75% to-[#5ea2f9]" />

        <div className="absolute inset-0">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center select-none"
          />
        </div>

        {/* Sunbreak bloom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(255,255,255,0.22),transparent_65%)]" />

        {/* Sapphire vignette — calibrated for white-text legibility without muting the clouds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_24%,rgba(10,50,135,0.28)_0%,transparent_75%)]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          {backHref && backLabel ? (
            <Reveal y={10}>
              <Link
                href={backHref}
                className="mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden>←</span>
                {backLabel}
              </Link>
            </Reveal>
          ) : null}

          <Reveal y={10}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
              {eyebrow}
            </p>
          </Reveal>

          <Reveal y={14}>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>

          <Reveal y={18}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
              {lede}
            </p>
          </Reveal>

          <Reveal y={22}>
            <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-8 font-bold text-slate-900 shadow-xl shadow-blue-950/30 transition-all duration-300 hover:bg-slate-50 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/40 bg-blue-600/90 px-8 font-bold text-white shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all duration-300 hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Horizon mist — blends the sky into the light content that follows,
          matching the landing page's transition into the trust strip. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent sm:h-44"
        aria-hidden="true"
      />
    </section>
  );
}

/**
 * PlatformSection — light content section for the platform pages.
 * Matches the landing page's below-fold treatment: white/sky gradient ground,
 * white cards with sky borders, slate text.
 */
export function PlatformSection({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  tint = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 md:py-28",
        tint ? "bg-sky-50/40" : "bg-white",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || lede) && (
          <div className="max-w-2xl">
            {eyebrow ? (
              <Reveal y={10}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1 shadow-2xs">
                  <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                    {eyebrow}
                  </span>
                </div>
              </Reveal>
            ) : null}

            {title ? (
              <Reveal y={12}>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {title}
                </h2>
              </Reveal>
            ) : null}

            {lede ? (
              <Reveal y={16}>
                <p className="mt-4 text-pretty leading-relaxed text-slate-600">
                  {lede}
                </p>
              </Reveal>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}