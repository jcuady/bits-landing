"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          solid
            ? "border-b border-slate-200/60 bg-white/85 shadow-xs backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 md:h-[72px] lg:px-10"
        >
          <Link
            href="/"
            aria-label="BITS - Boundless IT Solutions, home"
            className="relative z-10 inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-md transition-opacity hover:opacity-90"
          >
            <span className="hidden min-[400px]:inline-block">
              <Logo variant="horizontal" priority className="h-7 md:h-8" />
            </span>
            <span className="inline-block min-[400px]:hidden">
              <Logo variant="tile" priority className="h-9" />
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex bg-slate-50/70 p-1.5 rounded-full border border-slate-200/60 shadow-xs">
            {navItems.map((item) => {
              const isActive =
                (item.href === "/bitscrm" && pathname.startsWith("/bitscrm")) ||
                (item.href === "/bitsagent" && pathname.startsWith("/bitsagent"));

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex min-h-9 items-center rounded-full px-4 text-[0.85rem] font-bold transition-all duration-200 ease-in-out",
                      isActive
                        ? "bg-white text-blue-600 shadow-xs ring-1 ring-slate-200/80"
                        : "text-slate-600 hover:bg-white/80 hover:text-blue-600"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/#ecosystem"
              className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.88rem] font-bold text-slate-700 transition-colors hover:text-blue-600"
            >
              Explore Solutions
            </Link>
            <Link
              href="/#contact"
              className="group flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-[0.88rem] font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]"
            >
              Book a Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[2px] rounded-full w-full bg-slate-900 transition-transform duration-200 ease-in-out",
                  open ? "top-[6px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[2px] rounded-full w-full bg-slate-900 transition-transform duration-200 ease-in-out",
                  open ? "top-[6px] -rotate-45" : "top-[12px]"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
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
            <ul className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 pt-6 sm:px-8">
              {navItems.map((item, i) => {
                const isActive =
                  (item.href === "/bitscrm" && pathname.startsWith("/bitscrm")) ||
                  (item.href === "/bitsagent" && pathname.startsWith("/bitsagent"));

                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 + i * 0.04,
                      duration: 0.28,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-2xl px-4 py-4 text-[1.4rem] font-bold tracking-tight transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-900 hover:bg-slate-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.22,
                duration: 0.28,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="pb-safe flex flex-col gap-4 px-6 pb-10 sm:px-8"
            >
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="group flex h-14 items-center justify-center gap-3 rounded-full bg-blue-600 px-6 text-[1rem] font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
              >
                Book a Consultation
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/#solutions"
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-center rounded-full bg-white border border-slate-200 px-6 text-[1rem] font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
              >
                Explore Solutions
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
