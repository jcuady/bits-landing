"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Header() {
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
            ? "border-b border-linelight/80 bg-white/80 shadow-[0_8px_28px_-18px_rgb(6_22_47/0.18)] backdrop-blur-xl"
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
            className="relative z-10 inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-md"
          >
            <span className="hidden min-[400px]:inline-block">
              <Logo variant="horizontal" priority className="h-7 md:h-8" />
            </span>
            <span className="inline-block min-[400px]:hidden">
              <Logo variant="tile" priority className="h-9" />
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9rem] font-medium text-slateblue transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-navy-700/[0.05] [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="#solutions"
              className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.88rem] font-semibold text-navy-700 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-electric-600"
            >
              Explore solutions
            </a>
            <Button
              asChild
              size="sm"
              className="group h-11 min-h-11 rounded-full pr-1.5 pl-4"
            >
              <a href="#contact">
                Book a consultation
                <span
                  className="flex size-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <ArrowRight className="size-3.5" />
                </span>
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-navy-700/[0.06] lg:hidden"
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  open ? "top-[6px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  open ? "top-[6px] -rotate-45" : "top-[13px]"
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
            className="fixed inset-0 z-40 flex flex-col bg-cloud lg:hidden"
          >
            <div className="h-16 shrink-0 md:h-[72px]" aria-hidden />
            <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-5 pt-4 sm:px-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + i * 0.04,
                    duration: 0.28,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-3 py-3.5 text-[1.5rem] font-semibold tracking-[-0.02em] text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.22,
                duration: 0.28,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="pb-safe flex flex-col gap-3 px-6 pb-10 sm:px-8"
            >
              <Button asChild size="lg" className="group h-12 min-h-12 rounded-full pr-2 pl-6">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Book a consultation
                  <span
                    className="flex size-8 items-center justify-center rounded-full bg-white/20"
                    aria-hidden
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 min-h-12 rounded-full bg-white"
              >
                <a href="#solutions" onClick={() => setOpen(false)}>
                  Explore solutions
                </a>
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
