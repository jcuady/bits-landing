import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BrandbookShell — atmospheric shell that wraps every brandbook route.
 *
 * Inherits the BITS landing-page design language verbatim:
 * - Pinned azure sky + cumulus clouds backdrop
 * - Sapphire depth scrim for white text legibility
 * - BITS infinity-B wordmark header (every page)
 * - Breadcrumb-style chapter nav
 *
 * Pages render their own content inside the shell; the chrome is shared.
 */
export function BrandbookShell({
  children,
  currentChapter,
}: {
  children: React.ReactNode;
  currentChapter?:
    | "hub"
    | "manifesto"
    | "logo"
    | "colors"
    | "typography"
    | "architecture"
    | "components"
    | "assets";
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030d1c] text-white">
      {/* ── Pinned Atmospheric Backdrop ──
          Sticky sky canvas extends through the document so the atmosphere
          stays consistent across the hub and every chapter. */}
      <div
        className="pointer-events-none fixed inset-0 z-0 select-none"
        aria-hidden="true"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 0: Radiant Azure Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1362df] via-[#2377f3] 45% via-[#3c8bf6] 75% to-[#5ea2f9]" />

          {/* Layer 1: Static Sky & Clouds */}
          <div className="relative size-full">
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

          {/* Layer 2: Subtle Sunbreak Bloom at Top */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(255,255,255,0.22),transparent_65%)] pointer-events-none" />

          {/* Layer 3: Sapphire Vignette for White Text Legibility */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_24%,rgba(10,50,135,0.32),transparent_75%)] pointer-events-none" />
        </div>
      </div>

      {/* ── Brandbook Header ── */}
      <BrandbookHeader currentChapter={currentChapter} />

      {/* ── Page Content ── */}
      <main className="relative z-10">{children}</main>

      {/* ── Brandbook Footer ── */}
      <BrandbookFooter />
    </div>
  );
}

function BrandbookHeader({
  currentChapter,
}: {
  currentChapter?: string;
}) {
  return (
    <header className="relative z-20 pt-8 pb-4 sm:pt-10 sm:pb-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* Brand mark */}
        <Link
          href="/brandbook"
          className="group flex items-center gap-3 sm:gap-3.5"
          aria-label="BITS — Brandbook home"
        >
          <span className="relative flex size-10 sm:size-12 items-center justify-center rounded-2xl border border-white/40 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/bits-monogram-official.png"
              alt="BITS — official monogram: capital B above a horizontal interlocked infinity"
              width={120}
              height={120}
              priority
              sizes="48px"
              className="size-7 sm:size-8 object-contain"
            />
          </span>
          <span className="flex flex-col">
            <span className="font-sans text-base sm:text-lg font-extrabold leading-none tracking-tight text-white">
              BITS
            </span>
            <span className="mt-0.5 font-sans text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80">
              Brandbook
            </span>
          </span>
        </Link>

        {/* Chapter nav (small, top right) + back-to-main button */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
            aria-label="Back to BITS main website"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
            <span>Main Site</span>
          </Link>
          <ChapterNavInline currentChapter={currentChapter} />
        </div>
      </div>
    </header>
  );
}

function ChapterNavInline({
  currentChapter,
}: {
  currentChapter?: string;
}) {
  const chapters: { id: string; label: string; href: string }[] = [
    { id: "manifesto", label: "Manifesto", href: "/brandbook/manifesto" },
    { id: "logo", label: "Logo", href: "/brandbook/logo" },
    { id: "colors", label: "Colors", href: "/brandbook/colors" },
    { id: "typography", label: "Type", href: "/brandbook/typography" },
    { id: "architecture", label: "Architecture", href: "/brandbook/architecture" },
    { id: "components", label: "Components", href: "/brandbook/components" },
    { id: "assets", label: "Assets", href: "/brandbook/assets" },
  ];

  return (
    <nav
      className="hidden md:flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1.5 shadow-sm backdrop-blur-md"
      aria-label="Brandbook chapters"
    >
      <Link
        href="/brandbook"
        className={cn(
          "rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors",
          currentChapter === "hub" || !currentChapter
            ? "bg-white text-slate-900"
            : "text-white/80 hover:text-white"
        )}
      >
        Hub
      </Link>
      {chapters.map((c) => (
        <Link
          key={c.id}
          href={c.href}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors",
            currentChapter === c.id
              ? "bg-white text-slate-900"
              : "text-white/80 hover:text-white"
          )}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}

function BrandbookFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/15 bg-[#030d1c]/70 py-10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-signal-300">
            Authoritative Brand Identity & Design System Dossier
          </p>
          <p className="text-sm font-medium text-white/80">
            Boundless IT Solutions (BITS) · 2026 Edition · Design System v3.4
          </p>
          <p className="font-mono text-[0.68rem] text-white/55">
            Public / Brand Guidelines · www.boundlessits.com/brandbook
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/brandbook/assets"
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Download Asset Pack
          </Link>
          <Link
            href="/brandbook"
            className="rounded-full px-4 py-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
          >
            Hub →
          </Link>
        </div>
      </div>
    </footer>
  );
}
