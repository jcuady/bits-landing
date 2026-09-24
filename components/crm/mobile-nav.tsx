"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Activity } from "lucide-react";
import { BionisLogo } from "@/components/bionis/logo";
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
    <div className="bionis-dashboard fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="CRM navigation">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-xs transition-opacity"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(100%,300px)] flex-col bg-background text-foreground border-r border-border shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <BionisLogo className="size-6 text-[#1975f2]" />
            <span className="text-sm font-bold tracking-tight text-foreground">BITScrm · Bionis</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav aria-label="Mobile CRM" className="flex-1 overflow-y-auto px-3 py-4 space-y-4 no-scrollbar">
          <div>
            <p className="mb-2 px-2 text-[0.66rem] font-semibold tracking-wider text-muted-foreground uppercase">
              Platform HUD
            </p>
            <Link
              href="/app/bionis"
              onClick={onClose}
              className={cn(
                "flex h-11 items-center justify-between rounded-xl border px-3 text-sm font-medium transition-all",
                pathname === "/app/bionis"
                  ? "border-border bg-card text-foreground font-semibold shadow-xs"
                  : "border-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Activity className="size-4 text-[#1975f2]" />
                <span>Bionis Vitals HUD</span>
              </div>
              <span className="rounded bg-[#1975f2] px-1.5 py-0.5 text-[0.62rem] font-bold text-white">
                Live
              </span>
            </Link>
          </div>

          {crmNav.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-[0.66rem] font-semibold tracking-wider text-muted-foreground uppercase">
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
                            ? "border-border bg-card font-medium text-foreground shadow-xs"
                            : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
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
