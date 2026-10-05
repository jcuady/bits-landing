"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { crmNav } from "@/lib/crm/nav";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Activity,
} from "lucide-react";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[260px] shrink-0 flex-col border-r border-linelight/60 bg-cloud/70 backdrop-blur-3xl shadow-[4px_0_24px_-12px_rgba(0,0,0,0.08)] z-10 transition-all",
        className
      )}
    >
      {/* Workspace / Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/20 dark:border-white/10 px-4">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-2.5 rounded-lg py-1 transition-opacity hover:opacity-90"
          aria-label="BITScrm Enterprise Dashboard"
        >
          <Logo variant="tile" className="size-7 shrink-0 rounded-lg shadow-xs" />
          <div className="flex flex-col">
            <span className="text-[0.92rem] font-bold tracking-tight text-foreground flex items-center gap-1.5">
              BITScrm
              <span className="rounded-full bg-[#1975f2]/10 px-1.5 py-0.2 text-[0.62rem] font-semibold text-[#1975f2]">
                Enterprise
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
                          ? "border-white/50 bg-white/70 font-medium text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/[0.08]"
                          : "border-transparent text-muted-foreground hover:bg-white/40 hover:text-foreground dark:hover:bg-white/5"
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

      {/* BITS Copilot Hardware & Engine Status Card */}
      <div className="p-3 border-t border-white/20 dark:border-white/10">
        <div className="relative overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-3 shadow-[inset_0_1px_4px_rgba(255,255,255,0.6)] backdrop-blur-md dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.02] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[#1975f2]" />
              <span className="text-[0.72rem] font-bold text-foreground">BITS Copilot Active</span>
            </div>
            <span className="size-2 rounded-full bg-[#00b153] animate-pulse" />
          </div>
          <p className="mt-1 text-[0.68rem] text-muted-foreground leading-relaxed">
            Real-time pipeline vitals, collections predictive pacing &amp; telephony AI synced.
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-blue-200/40 dark:border-white/10">
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
