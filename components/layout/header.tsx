"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { navigationSections } from "@/lib/site";
import { Logo } from "@/components/ui/logo";

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

  const solid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          solid
            ? "border-b border-slate-200/70 bg-white/90 shadow-xs backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 md:h-[72px] lg:px-10"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="BITS - Boundless IT Solutions, home"
            onClick={() => {
              setActiveDropdown(null);
              setMobileOpen(false);
            }}
            className="relative z-10 inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-md transition-opacity hover:opacity-90"
          >
            <span className="hidden min-[400px]:inline-block">
              <Logo variant="horizontal" priority className="h-7 md:h-8" />
            </span>
            <span className="inline-block min-[400px]:hidden">
              <Logo variant="tile" priority className="h-9" />
            </span>
          </Link>

          {/* Desktop Navigation Pill with Subsections */}
          <ul
            className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/80 p-1.5 shadow-xs backdrop-blur-md lg:flex"
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
                        "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.84rem] font-bold transition-all duration-200",
                        isOpen || isPageActive
                          ? "bg-white text-blue-600 shadow-xs ring-1 ring-slate-200/80"
                          : "text-slate-600 hover:bg-white/80 hover:text-blue-600"
                      )}
                    >
                      <span>{section.label}</span>
                      <svg
                        className={cn(
                          "size-3.5 text-slate-400 transition-transform duration-200",
                          isOpen && "rotate-180 text-blue-600"
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
                            "absolute left-1/2 top-full mt-2.5 -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-2xl shadow-blue-950/15 backdrop-blur-xl",
                            section.dropdown.items.length > 4 ? "w-[720px]" : "w-[380px]"
                          )}
                          onMouseEnter={() => handleMouseEnter(section.id)}
                        >
                          <div className="mb-2 flex items-center justify-between border-b border-slate-100 px-2 pb-2">
                            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                              {section.dropdown.heading}
                            </span>
                            <span className="size-1 rounded-full bg-blue-500" />
                          </div>

                          <div
                            className={cn(
                              "grid gap-1",
                              section.dropdown.items.length > 4 ? "grid-cols-2" : "grid-cols-1"
                            )}
                          >
                            {section.dropdown.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-blue-50/70"
                              >
                                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                  <NavIcon name={item.icon} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="text-[0.84rem] font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                      {item.title}
                                    </p>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.2 text-[0.62rem] font-semibold text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700">
                                      {item.badge}
                                    </span>
                                  </div>
                                  <p className="mt-0.5 line-clamp-1 text-[0.74rem] text-slate-500">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
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
                    className="inline-flex min-h-9 items-center rounded-full px-3.5 py-1 text-[0.84rem] font-bold text-slate-600 transition-all duration-200 hover:bg-white/80 hover:text-blue-600"
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right CTA Button */}
          <div className="hidden items-center lg:flex">
            <Link
              href="/#contact"
              className="group flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-[0.86rem] font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98]"
            >
              <span>Book a Consultation</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative z-10 inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[2px] w-full rounded-full bg-slate-900 transition-transform duration-200 ease-in-out",
                  mobileOpen ? "top-[6px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[2px] w-full rounded-full bg-slate-900 transition-transform duration-200 ease-in-out",
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
                          <div className="space-y-1 border-t border-slate-100 bg-slate-50/50 p-2.5">
                            {section.dropdown.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <NavIcon name={item.icon} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                                    <p className="text-[0.72rem] text-slate-500">{item.description}</p>
                                  </div>
                                </div>
                                <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[0.62rem] font-bold text-slate-600">
                                  {item.badge}
                                </span>
                              </Link>
                            ))}
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
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-13 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-base font-bold text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                >
                  <span>Book a Consultation</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
