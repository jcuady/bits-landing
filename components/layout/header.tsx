"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { navigationSections } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

/* ── Lightweight inline SVG icons for dropdown items ── */
function NavIcon({ name, className }: { name: string; className?: string }) {
  const cls = cn("size-4 shrink-0", className);

  switch (name) {
    case "crm":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case "ai":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "layers":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "headset":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "pipeline":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "accounting":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "lock":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case "server":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case "process":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    case "card":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "help":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

export function Header() {
  const pathname = usePathname();
  const { openModal } = useConsultationModal();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = React.useState<string | null>("platform");
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 140);
  };

  const isHome = pathname === "/";
  const solid = scrolled || mobileOpen || !isHome;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] text-white",
          solid
            ? "border-b border-sky-300/35 shadow-lg shadow-sky-950/15"
            : "border-b border-white/20 shadow-xs shadow-blue-950/5"
        )}
      >
        {/* ── ATMOSPHERIC CLOUD LIGHT BLUE BACKGROUND CANVAS (Matches Hero Sky) ── */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
          aria-hidden
        >
          {/* Base Sky Blue Multi-Stop Gradient Canvas */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300",
              solid
                ? "bg-gradient-to-r from-[#155ec4]/94 via-[#1d6be3]/90 to-[#38bdf8]/85 backdrop-blur-2xl"
                : "bg-gradient-to-r from-[#175ec2]/45 via-[#1e6be3]/40 to-[#38bdf8]/35 backdrop-blur-xl"
            )}
          />

          {/* Layer 1: Drifting Clouds Base */}
          <div
            className={cn(
              "absolute inset-0 mix-blend-screen transition-opacity duration-300",
              solid ? "opacity-55" : "opacity-35"
            )}
          >
            <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
              <Image
                src="/images/hero-sky-bg.jpg"
                alt=""
                fill
                priority
                quality={70}
                className="object-cover object-top scale-125 filter blur-[0.5px]"
              />
            </div>
          </div>

          {/* Layer 2: Counter-Harmonic Cloud Mist */}
          <div
            className={cn(
              "absolute inset-0 mix-blend-screen transition-opacity duration-300",
              solid ? "opacity-45" : "opacity-25"
            )}
          >
            <div className="relative size-full animate-cloud-drift-reverse will-change-transform transform-gpu">
              <Image
                src="/images/hero-sky-bg.jpg"
                alt=""
                fill
                quality={70}
                className="object-cover object-center scale-125"
              />
            </div>
          </div>

          {/* Layer 3: Sky Sunbreak Radiance / Cyan Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.45),transparent_75%)]" />

          {/* Layer 4: Delicate Top Frost Accent Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 md:h-[72px] lg:px-10"
        >
          {/* Logo - Always default white logo on luxury glassmorphism */}
          <Link
            href="/"
            aria-label="BITS - Boundless IT Solutions, home"
            onClick={() => {
              setActiveDropdown(null);
              setMobileOpen(false);
            }}
            className="relative z-10 inline-flex min-h-11 shrink-0 items-center rounded-2xl px-2 py-1 transition-all duration-200 hover:opacity-90"
          >
            <span className="hidden min-[400px]:inline-block">
              <Logo variant="reverse" priority className="h-7 md:h-8" />
            </span>
            <span className="inline-block min-[400px]:hidden">
              <Logo variant="reverse" priority className="h-7" />
            </span>
          </Link>

          {/* Desktop Navigation Pill with Subsections */}
          <ul
            className="hidden items-center gap-1 rounded-full border border-white/20 bg-white/15 p-1.5 shadow-xs backdrop-blur-md lg:flex"
            onMouseLeave={handleMouseLeave}
          >
            {navigationSections.map((section) => {
              if ("dropdown" in section) {
                const isOpen = activeDropdown === section.id;
                const isPageActive =
                  section.id === "platform" &&
                  (pathname.startsWith("/bitscrm") || pathname.startsWith("/bitsagent"));

                return (
                  <li
                    key={section.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(section.id)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : section.id)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.84rem] font-bold transition-all duration-200",
                        isOpen || isPageActive
                          ? "bg-white text-blue-950 shadow-xs ring-1 ring-white/40"
                          : "text-white/90 hover:bg-white/20 hover:text-white"
                      )}
                    >
                      <span>{section.label}</span>
                      <svg
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isOpen ? "rotate-180 text-blue-950" : "text-white/70"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Submenu Dropdown Panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          className={cn(
                            "absolute left-1/2 top-full mt-2.5 -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white/98 shadow-2xl shadow-blue-950/15 backdrop-blur-2xl ring-1 ring-slate-900/5",
                            section.id === "platform"
                              ? "w-[820px] max-w-[calc(100vw-32px)] p-4"
                              : "w-[390px] p-3"
                          )}
                          onMouseEnter={() => handleMouseEnter(section.id)}
                        >
                          {section.id === "platform" && "flagships" in section.dropdown ? (
                            <div>
                              <div className="grid grid-cols-2 gap-4">
                                {/* ── LEFT: CORE PLATFORMS & AUTONOMOUS AI ── */}
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 px-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="relative flex size-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                                        <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
                                      </span>
                                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
                                        Core Platforms &amp; AI
                                      </span>
                                    </div>
                                    <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                                      Flagships
                                    </span>
                                  </div>

                                  <div className="space-y-1">
                                    {section.dropdown.flagships.map((item) => {
                                      const isItemActive = pathname === item.href;
                                      const isOps360 = item.title.startsWith("OPERATIONS 360");
                                      return (
                                        <Link
                                          key={item.title}
                                          href={item.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className={cn(
                                            "group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-150 border",
                                            isOps360
                                              ? "bg-blue-50/60 border-blue-200/70 hover:bg-blue-50 hover:border-blue-300"
                                              : isItemActive
                                              ? "bg-blue-50/80 border-blue-300 ring-1 ring-blue-500/20"
                                              : "border-transparent hover:bg-slate-50 hover:border-slate-200/70"
                                          )}
                                        >
                                          <div
                                            className={cn(
                                              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                                              isOps360
                                                ? "bg-blue-600 text-white shadow-xs"
                                                : isItemActive
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                                            )}
                                          >
                                            <NavIcon name={item.icon} />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                              <span
                                                className={cn(
                                                  "text-xs font-bold transition-colors",
                                                  isOps360
                                                    ? "text-blue-950 font-extrabold"
                                                    : isItemActive
                                                    ? "text-blue-900"
                                                    : "text-slate-900 group-hover:text-blue-600"
                                                )}
                                              >
                                                {item.title}
                                              </span>
                                              {item.badge && (
                                                <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold uppercase text-blue-700">
                                                  {item.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="mt-0.5 text-[11px] text-slate-500 leading-snug line-clamp-1">
                                              {item.description}
                                            </p>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* ── RIGHT: ENTERPRISE BUSINESS ENGINES ── */}
                                <div className="space-y-1.5 border-l border-slate-100 pl-4">
                                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 px-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="size-2 rounded-full bg-slate-400" />
                                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
                                        Enterprise Business Engines
                                      </span>
                                    </div>
                                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                                      Operations
                                    </span>
                                  </div>

                                  <div className="space-y-1">
                                    {section.dropdown.operations.map((item) => {
                                      const isItemActive = pathname === item.href;
                                      return (
                                        <Link
                                          key={item.title}
                                          href={item.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className={cn(
                                            "group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-150 border",
                                            isItemActive
                                              ? "bg-blue-50/80 border-blue-300 ring-1 ring-blue-500/20"
                                              : "border-transparent hover:bg-slate-50 hover:border-slate-200/70"
                                          )}
                                        >
                                          <div
                                            className={cn(
                                              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                                              isItemActive
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                                            )}
                                          >
                                            <NavIcon name={item.icon} />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                              <span
                                                className={cn(
                                                  "text-xs font-bold transition-colors",
                                                  isItemActive
                                                    ? "text-blue-900"
                                                    : "text-slate-900 group-hover:text-blue-600"
                                                )}
                                              >
                                                {item.title}
                                              </span>
                                              {item.badge && (
                                                <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold uppercase text-slate-600">
                                                  {item.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="mt-0.5 text-[11px] text-slate-500 leading-snug line-clamp-1">
                                              {item.description}
                                            </p>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* ── FOOTER ACTION BAR ── */}
                              <div className="mt-3 -mx-4 -mb-4 flex flex-col gap-2 rounded-b-2xl border-t border-slate-100 bg-slate-50/90 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between text-xs">
                                <div className="flex items-center gap-2 text-slate-600">
                                  <span className="flex size-1.5 rounded-full bg-emerald-500" />
                                  <span className="text-[11px] text-slate-600">
                                    Sovereign cloud or air-gapped on-premises. White-label ready.
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <Link
                                    href="/products/crm"
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    View All 18 Products →
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      openModal();
                                    }}
                                    className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
                                  >
                                    Request Blueprint
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Standard 1-column dropdown for Industries & Governance */
                            <div>
                              <div className="mb-2 flex items-center justify-between border-b border-slate-100 px-2 pb-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  {section.dropdown.heading}
                                </span>
                                <span className="size-1 rounded-full bg-blue-500" />
                              </div>

                              <div className="grid gap-1">
                                {section.dropdown.items.map((item) => {
                                  const isItemActive = pathname === item.href;
                                  return (
                                    <Link
                                      key={`${section.id}-${item.title}`}
                                      href={item.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className={cn(
                                        "group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-150 border",
                                        isItemActive
                                          ? "bg-blue-50/80 border-blue-300 ring-1 ring-blue-500/20"
                                          : "border-transparent hover:bg-slate-50 hover:border-slate-200/70"
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          "mt-0.5 flex size-7.5 shrink-0 items-center justify-center rounded-lg transition-colors",
                                          isItemActive
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                                        )}
                                      >
                                        <NavIcon name={item.icon} />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                          <span
                                            className={cn(
                                              "text-xs font-bold transition-colors",
                                              isItemActive
                                                ? "text-blue-900"
                                                : "text-slate-900 group-hover:text-blue-600"
                                            )}
                                          >
                                            {item.title}
                                          </span>
                                          {item.badge && (
                                            <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold uppercase text-blue-700">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="mt-0.5 text-[11px] text-slate-500 leading-snug line-clamp-1">
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={section.id}>
                  <Link
                    href={section.href}
                    className="inline-flex min-h-11 items-center rounded-full px-3.5 py-1 text-[0.84rem] font-bold text-white/90 transition-all duration-200 hover:bg-white/20 hover:text-white"
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right CTA Button */}
          <div className="hidden items-center lg:flex">
            <button
              type="button"
              onClick={() => openModal()}
              className="group flex h-11 items-center justify-center gap-2 rounded-full bg-white hover:bg-blue-50 px-5 text-[0.86rem] font-extrabold text-blue-900 shadow-md shadow-blue-950/20 transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>Book a Consultation</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative z-10 inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-sm backdrop-blur-md hover:bg-white/25 transition-all lg:hidden"
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[2px] w-full rounded-full bg-white transition-transform duration-200 ease-in-out",
                  mobileOpen ? "top-[6px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[2px] w-full rounded-full bg-white transition-transform duration-200 ease-in-out",
                  mobileOpen ? "top-[6px] -rotate-45" : "top-[12px]"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-slate-50 lg:hidden"
          >
            <div className="h-16 shrink-0 md:h-[72px]" aria-hidden />

            <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-4 pb-6 sm:px-8">
              <div className="space-y-3">
                {navigationSections.map((section) => {
                  if ("dropdown" in section) {
                    const isExpanded = expandedMobileSection === section.id;
                    return (
                      <div
                        key={section.id}
                        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedMobileSection(isExpanded ? null : section.id)}
                          className="flex w-full items-center justify-between p-4 text-left font-bold text-slate-900"
                        >
                          <span className="text-base">{section.label}</span>
                          <svg
                            className={cn(
                              "size-4 text-slate-400 transition-transform duration-200",
                              isExpanded && "rotate-180 text-blue-600"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isExpanded && (
                          <div className="space-y-3 border-t border-slate-100 bg-slate-50/50 p-2.5">
                            {section.id === "platform" && "flagships" in section.dropdown ? (
                              <>
                                <div>
                                  <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    Core Platforms &amp; AI
                                  </p>
                                  <div className="space-y-1">
                                    {section.dropdown.flagships.map((item) => (
                                      <Link
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-white border border-transparent hover:border-slate-200/60"
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                                            <NavIcon name={item.icon} />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-900">{item.title}</p>
                                            <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                                          </div>
                                        </div>
                                        {item.badge && (
                                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700 shrink-0 ml-2">
                                            {item.badge}
                                          </span>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-slate-200/70">
                                  <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    Enterprise Business Engines
                                  </p>
                                  <div className="space-y-1">
                                    {section.dropdown.operations.map((item) => (
                                      <Link
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-white border border-transparent hover:border-slate-200/60"
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <div className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0">
                                            <NavIcon name={item.icon} />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-900">{item.title}</p>
                                            <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                                          </div>
                                        </div>
                                        {item.badge && (
                                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-600 shrink-0 ml-2">
                                            {item.badge}
                                          </span>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              section.dropdown.items.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-white border border-transparent hover:border-slate-200/60"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                                      <NavIcon name={item.icon} />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                                    </div>
                                  </div>
                                  {item.badge && (
                                    <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[9px] font-bold text-slate-600 shrink-0 ml-2">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              ))
                            )}

                            {section.id === "platform" && (
                              <div className="pt-2 border-t border-slate-200/80">
                                <Link
                                  href="/products/crm"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center justify-between rounded-xl bg-blue-50/90 p-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                                >
                                  <span>View All 18 Software Products</span>
                                  <span>→</span>
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={section.id}
                      href={section.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-2xl border border-slate-200/80 bg-white p-4 text-base font-bold text-slate-900 transition-colors hover:bg-slate-50"
                    >
                      {section.label}
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Drawer Actions */}
              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openModal();
                  }}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-base font-bold text-white shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
