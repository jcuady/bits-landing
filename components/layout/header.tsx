"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

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

  return (
    <>
      <motion.header
        initial={false}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-linelight bg-white/90 shadow-[0_8px_32px_-16px_rgb(6_22_47/0.14)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/70 backdrop-blur-md"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 md:h-[72px] lg:px-10"
        >
          <Link
            href="/"
            aria-label="BITS - Boundless IT Solutions, home"
            className="relative z-10 shrink-0 rounded-md"
          >
            <span className="hidden min-[400px]:inline-block">
              <Logo variant="horizontal" priority className="h-7 md:h-8" />
            </span>
            <span className="inline-block min-[400px]:hidden">
              <Logo variant="tile" priority className="h-9" />
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-[0.9rem] font-medium text-slateblue transition-colors duration-200 hover:bg-navy-700/[0.05] hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-[0.85rem] font-medium text-slateblue transition-colors hover:bg-navy-700/[0.05] hover:text-ink"
            >
              CRM Sign in
            </Link>
            <Button asChild variant="ghostLight" size="sm">
              <a href="#solutions">Explore Solutions</a>
            </Button>
            <Button asChild size="sm">
              <a href="#contact">
                Book a Consultation
                <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-navy-700/[0.06] lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-navy-900 lg:hidden"
          >
            <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="relative flex h-16 items-center px-5" />
            <ul className="relative flex flex-1 flex-col justify-center gap-1 px-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-4 text-[1.65rem] font-semibold tracking-[-0.02em] text-white/90 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pb-safe relative flex flex-col gap-3 px-8 pb-10"
            >
              <Button asChild size="lg">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Book a Consultation
                  <ArrowRight aria-hidden />
                </a>
              </Button>
              <Button asChild variant="ghostDark" size="lg">
                <a href="#solutions" onClick={() => setOpen(false)}>
                  Explore Solutions
                </a>
              </Button>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="py-2 text-center text-[0.95rem] font-medium text-white/70 transition-colors hover:text-white"
              >
                CRM Sign in
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
