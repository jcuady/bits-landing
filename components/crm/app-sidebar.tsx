"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BionisLogo } from "@/components/bionis/logo";
import { crmNav } from "@/lib/crm/nav";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Activity,
  ChevronRight,
  LogOut,
  Shield,
  CreditCard,
  User,
  Zap,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bionis-dashboard flex h-full w-[260px] shrink-0 flex-col border-r border-[#eeefe9] bg-[#fafafa] dark:border-[#222] dark:bg-[#111] transition-all",
        className
      )}
    >
      {/* Workspace / Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-[#eeefe9] dark:border-[#222] px-4">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-2.5 rounded-lg py-1 transition-opacity hover:opacity-90"
          aria-label="BITScrm Bionis Dashboard"
        >
          <BionisLogo className="size-7 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[0.92rem] font-bold tracking-tight text-foreground flex items-center gap-1.5">
              BITScrm
              <span className="rounded-full bg-[#1975f2]/10 px-1.5 py-0.2 text-[0.62rem] font-semibold text-[#1975f2]">
                Bionis
              </span>
            </span>
            <span className="text-[0.68rem] text-muted-foreground">
              Enterprise RevOps HUD
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav aria-label="CRM" className="flex-1 overflow-y-auto px-3 py-4 space-y-5 no-scrollbar">
        {/* Quick Bionis Telemetry Highlight Link */}
        <div>
          <p className="mb-2 px-2 text-[0.66rem] font-semibold tracking-wider text-muted-foreground uppercase">
            Platform HUD
          </p>
          <Link
            href="/app/bionis"
            aria-current={pathname === "/app/bionis" ? "page" : undefined}
            className={cn(
              "flex h-11 cursor-pointer items-center justify-between rounded-xl border px-3 text-[0.85rem] font-medium transition-all active:scale-[0.98]",
              pathname === "/app/bionis"
                ? "border-border bg-background text-foreground shadow-[1px_2px_12px_rgba(158,158,158,0.08)] dark:border-transparent dark:bg-neutral-800"
                : "border-transparent text-muted-foreground hover:bg-neutral-200/50 hover:text-foreground dark:hover:bg-neutral-800/60"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="size-4 text-[#1975f2]" />
              <span>Bionis Vitals HUD</span>
            </div>
            <span className="rounded bg-[#1975f2] px-1.5 py-0.5 text-[0.62rem] font-bold text-white shadow-2xs">
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
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex h-10 cursor-pointer items-center justify-between rounded-xl border px-3 text-[0.84rem] transition-all active:scale-[0.98]",
                        active
                          ? "border-border bg-background font-medium text-foreground shadow-[1px_2px_12px_rgba(158,158,158,0.08)] dark:border-transparent dark:bg-neutral-800"
                          : "border-transparent text-muted-foreground hover:bg-neutral-200/50 hover:text-foreground dark:hover:bg-neutral-800/60"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            active ? "text-[#1975f2]" : "text-muted-foreground group-hover:text-foreground"
                          )}
                          aria-hidden
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {active && (
                        <span className="size-1.5 rounded-full bg-[#1975f2]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bionis Promo / Hardware Status Card */}
      <div className="p-3 border-t border-[#eeefe9] dark:border-[#222]">
        <div className="relative overflow-hidden rounded-xl border border-blue-200/70 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 p-3 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-neutral-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[#1975f2]" />
              <span className="text-[0.72rem] font-bold text-foreground">Bionis Copilot Active</span>
            </div>
            <span className="size-2 rounded-full bg-[#00b153] animate-pulse" />
          </div>
          <p className="mt-1 text-[0.68rem] text-muted-foreground leading-relaxed">
            Real-time pipeline vitals, collections predictive pacing &amp; telephony AI synced.
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-blue-200/50 dark:border-blue-900/40">
            <span className="text-[0.64rem] font-mono font-medium text-muted-foreground">
              Latency: 14ms
            </span>
            <span className="text-[0.64rem] font-bold text-[#1975f2]">
              SLA 99.98%
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
