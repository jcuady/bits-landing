"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const DEMO_ALERTS = [
  {
    id: "1",
    title: "Voltgrid Deal Stalled",
    desc: "Stage: Proposal · Stalled 12 days past expected close",
    time: "2h ago",
    href: "/app/opportunities/op-3",
    urgent: true,
  },
  {
    id: "2",
    title: "RPC Lift Flagged",
    desc: "PTP installment cleared for Carlos Mendoza (₱20,000)",
    time: "3h ago",
    href: "/app/pipelines",
    urgent: false,
  },
  {
    id: "3",
    title: "Predictive Pacing Adjusted",
    desc: "AI dialer increased connect frequency by +18%",
    time: "5h ago",
    href: "/app/dashboard",
    urgent: false,
  },
];

export function AppTopbar({
  userName,
  userEmail,
  onMenuClick,
}: {
  userName: string;
  userEmail: string;
  onMenuClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDark, setIsDark] = React.useState(false);
  const [timeline, setTimeline] = React.useState<"today" | "7d" | "30d" | "90d">("7d");
  const [alertsOpen, setAlertsOpen] = React.useState(false);
  const alertsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!alertsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!alertsRef.current?.contains(e.target as Node)) setAlertsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAlertsOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [alertsOpen]);

  // Check initial theme
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="bionis-dashboard flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[#eeefe9] bg-background px-4 md:h-18 md:px-6 dark:border-[#222]">
      {/* Left: Mobile trigger & Page Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition hover:bg-muted lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#00b153] animate-pulse" />
          <span className="text-sm font-semibold text-foreground tracking-tight hidden sm:inline-block">
            Bionis Operations Engine
          </span>
          <span className="text-xs text-muted-foreground hidden md:inline-block">
            · RevOps Telemetry
          </span>
        </div>
      </div>

      {/* Middle: Bionis Search Bar with InputGroup */}
      <div className="hidden md:flex max-w-sm flex-1 px-4">
        <InputGroup className="h-10 w-full rounded-xl border-border bg-muted/60 px-2.5">
          <InputGroupAddon className="text-muted-foreground pl-0">
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search deals, accounts, vitals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs"
          />
          <kbd className="pointer-events-none rounded bg-background px-1.5 py-0.5 text-[0.65rem] font-mono font-medium text-muted-foreground shadow-2xs border border-border">
            ⌘K
          </kbd>
        </InputGroup>
      </div>

      {/* Right: Timeline Selector, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2">
        {/* Timeline Pill Selector */}
        <div className="hidden xl:flex items-center rounded-xl border border-border bg-muted/40 p-1">
          {(["today", "7d", "30d", "90d"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeline(t)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all cursor-pointer ${
                timeline === t
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="size-9 rounded-xl border-border"
        >
          {isDark ? (
            <Sun className="size-4 text-amber-500" />
          ) : (
            <Moon className="size-4 text-slate-700" />
          )}
        </Button>

        {/* Bionis Notifications Popover / Dialog */}
        <div className="relative" ref={alertsRef}>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setAlertsOpen((v) => !v)}
            className="relative size-9 rounded-xl border-border cursor-pointer"
            aria-label="Notifications"
            aria-expanded={alertsOpen}
            aria-controls="crm-alerts"
          >
            <Bell className="size-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#1975f2] ring-2 ring-background" />
          </Button>

          {alertsOpen && (
            <div
              id="crm-alerts"
              role="dialog"
              aria-label="Notifications"
              className="absolute top-[calc(100%+8px)] right-0 z-50 w-80 rounded-2xl border border-border bg-card p-3 shadow-2xl animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border mb-2 px-1">
                <span className="text-xs font-bold text-foreground">Operational Alerts</span>
                <span className="rounded-full bg-[#1975f2]/10 px-2 py-0.5 text-[0.65rem] font-bold text-[#1975f2]">
                  3 New
                </span>
              </div>
              <ul className="space-y-1">
                {DEMO_ALERTS.map((alert) => (
                  <li key={alert.id}>
                    <Link
                      href={alert.href}
                      onClick={() => setAlertsOpen(false)}
                      className="flex flex-col gap-0.5 rounded-xl p-2 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          {alert.urgent ? (
                            <AlertTriangle className="size-3.5 text-amber-500" />
                          ) : (
                            <CheckCircle2 className="size-3.5 text-[#00b153]" />
                          )}
                          {alert.title}
                        </span>
                        <span className="text-[0.65rem] text-muted-foreground font-mono">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-[0.7rem] text-muted-foreground pl-5">
                        {alert.desc}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setAlertsOpen(false)}
                className="mt-2.5 w-full rounded-xl border border-border bg-muted/60 py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 pr-2.5 transition hover:bg-accent cursor-pointer"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#1975f2] text-xs font-bold text-white shadow-2xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-foreground leading-tight truncate max-w-[100px]">
                  {userName}
                </span>
                <span className="text-[0.65rem] text-muted-foreground leading-tight truncate max-w-[100px]">
                  {userEmail}
                </span>
              </div>
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{userName}</span>
                <span className="text-xs text-muted-foreground">{userEmail}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/app/settings" className="cursor-pointer">
                Settings &amp; Workspace
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/bionis" className="cursor-pointer flex items-center justify-between">
                <span>Bionis Telemetry</span>
                <span className="text-[0.62rem] font-bold text-[#1975f2] uppercase">Live</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => logoutAction()}
            >
              <LogOut className="size-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Direct Log Out Button */}
        <form action={logoutAction} className="inline-block">
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 rounded-xl border border-border px-3 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <LogOut className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
