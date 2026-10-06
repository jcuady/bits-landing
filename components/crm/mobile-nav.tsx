"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Activity } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { crmNav } from "@/lib/crm/nav";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="CRM navigation">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-xs transition-opacity"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(100%,300px)] flex-col bg-white/95 backdrop-blur-2xl text-slate-900 border-r border-blue-100 shadow-2xl dark:bg-[#070e1c]/95 dark:text-white dark:border-white/10">
        <div className="flex h-16 items-center justify-between border-b border-blue-100/70 dark:border-white/10 px-4">
          <div className="flex items-center gap-2">
            <Logo variant="tile" className="size-6 rounded-md shadow-xs" />
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">BITScrm · Enterprise</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav aria-label="Mobile CRM" className="flex-1 overflow-y-auto px-3 py-4 space-y-4 no-scrollbar">
          {crmNav.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-[0.66rem] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/app/dashboard" && pathname.startsWith(`${item.href}/`));
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex h-10 items-center justify-between rounded-xl border px-3 text-sm transition-all",
                          active
                            ? "border-blue-200/80 bg-white font-bold text-blue-700 shadow-xs dark:border-white/15 dark:bg-white/[0.08] dark:text-white"
                            : "border-transparent text-slate-600 hover:bg-blue-50/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={cn(
                              "size-4 shrink-0",
                              active ? "text-[#1975f2]" : "text-muted-foreground"
                            )}
                            aria-hidden
                          />
                          <span>{item.label}</span>
                        </div>
                        {active && <span className="size-1.5 rounded-full bg-[#1975f2]" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
