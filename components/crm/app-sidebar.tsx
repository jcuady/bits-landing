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
        "flex h-full w-[260px] shrink-0 flex-col border-r border-blue-100/80 bg-white/75 backdrop-blur-2xl shadow-[4px_0_24px_-10px_rgba(0,102,255,0.06)] z-10 transition-all",
        "dark:border-white/10 dark:bg-[#070e1c]/90 dark:backdrop-blur-2xl dark:shadow-[4px_0_24px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Workspace / Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-blue-100/70 dark:border-white/10 px-4">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-2.5 rounded-lg py-1 transition-opacity hover:opacity-90"
          aria-label="BITScrm Enterprise Dashboard"
        >
          <Logo variant="tile" className="size-7 shrink-0 rounded-lg shadow-xs" />
          <div className="flex flex-col">
            <span className="text-[0.92rem] font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              BITScrm
              <span className="rounded-full bg-blue-600/10 dark:bg-blue-500/20 px-1.5 py-0.5 text-[0.62rem] font-bold text-blue-700 dark:text-blue-300">
                Enterprise
              </span>
            </span>
            <span className="text-[0.68rem] text-slate-500 dark:text-slate-400">
              Enterprise RevOps HUD
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav aria-label="CRM" className="flex-1 overflow-y-auto px-3 py-4 space-y-5 no-scrollbar">
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
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex h-10 cursor-pointer items-center justify-between rounded-xl border px-3 text-[0.84rem] transition-all active:scale-[0.98]",
                        active
                          ? "border-blue-200/80 bg-white/95 font-bold text-blue-700 shadow-xs dark:border-white/15 dark:bg-white/[0.08] dark:text-white dark:shadow-none"
                          : "border-transparent text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            active
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200"
                          )}
                          aria-hidden
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {active && (
                        <span className="size-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-xs shadow-blue-500/50" />
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
      <div className="p-3 border-t border-blue-100/70 dark:border-white/10">
        <div className="relative overflow-hidden rounded-xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-white/90 p-3 shadow-xs backdrop-blur-md dark:border-white/10 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[0.72rem] font-bold text-slate-900 dark:text-white">BITS Copilot Active</span>
            </div>
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="mt-1 text-[0.68rem] text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-time pipeline vitals, collections predictive pacing &amp; telephony AI synced.
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-blue-200/50 dark:border-white/10">
            <span className="text-[0.64rem] font-mono font-medium text-slate-500 dark:text-slate-400">
              Latency: 14ms
            </span>
            <span className="text-[0.64rem] font-bold text-blue-600 dark:text-cyan-400">
              SLA 99.98%
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
