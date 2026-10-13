"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  X,
  Check,
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
import { useCrm } from "@/lib/crm/store";

export function AppTopbar({
  userName,
  userEmail,
  onMenuClick,
}: {
  userName: string;
  userEmail: string;
  onMenuClick: () => void;
}) {
  const {
    notifications,
    dismissNotification,
    markAllNotificationsRead,
    markNotificationRead,
  } = useCrm();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDark, setIsDark] = React.useState(false);
  const [timeline, setTimeline] = React.useState<"today" | "7d" | "30d" | "90d">("7d");
  const [alertsOpen, setAlertsOpen] = React.useState(false);
  const alertsRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  // Check initial theme from localStorage or document
  React.useEffect(() => {
    const saved = localStorage.getItem("bits_theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("bits_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("bits_theme", "light");
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-blue-100/80 bg-white/75 backdrop-blur-2xl px-4 md:h-18 md:px-6 shadow-[0_4px_20px_-10px_rgba(0,102,255,0.06)] z-10 relative dark:border-white/10 dark:bg-[#070e1c]/90 dark:backdrop-blur-2xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Left: Mobile trigger & Page Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-blue-100/80 bg-white/80 text-slate-800 transition hover:bg-white lg:hidden cursor-pointer dark:border-white/10 dark:bg-black/30 dark:text-white"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#00b153] animate-pulse" />
          <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight hidden sm:inline-block">
            BITS RevOps Engine
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden md:inline-block">
            · Command Center
          </span>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden md:flex max-w-sm flex-1 px-4">
        <InputGroup className="h-10 w-full rounded-xl border-blue-100/80 bg-white/80 backdrop-blur-md px-2.5 shadow-xs dark:border-white/10 dark:bg-black/40">
          <InputGroupAddon className="text-slate-400 dark:text-slate-500 pl-0">
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="crm-global-search"
            placeholder="Search deals, accounts, vitals..."
            aria-label="Search deals, accounts and workspace vitals"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <kbd className="pointer-events-none rounded bg-slate-100 px-1.5 py-0.5 text-[0.65rem] font-mono font-medium text-slate-500 border border-slate-200 dark:bg-white/10 dark:border-white/10 dark:text-slate-400">
            ⌘K
          </kbd>
        </InputGroup>
      </div>

      {/* Right: Timeline Selector, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2">
        {/* Timeline Pill Selector */}
        <div className="hidden xl:flex items-center rounded-xl border border-blue-100/80 bg-white/80 backdrop-blur-md p-1 shadow-xs dark:border-white/10 dark:bg-black/40">
          {(["today", "7d", "30d", "90d"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeline(t)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize transition-all cursor-pointer ${
                timeline === t
                  ? "bg-white text-blue-700 shadow-xs dark:bg-white/10 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
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
          className="size-9 rounded-xl border-blue-100/80 bg-white/80 backdrop-blur-md shadow-xs cursor-pointer hover:bg-white text-slate-700 dark:border-white/10 dark:bg-black/40 dark:hover:bg-white/10 dark:text-slate-200"
        >
          {isDark ? (
            <Sun className="size-4 text-amber-400" />
          ) : (
            <Moon className="size-4 text-slate-700" />
          )}
        </Button>

        {/* Operational Notifications Popover / Dialog */}
        <div className="relative" ref={alertsRef}>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setAlertsOpen((v) => !v)}
            className="relative size-9 rounded-xl border-blue-100/80 bg-white/80 backdrop-blur-md shadow-xs cursor-pointer hover:bg-white text-slate-700 dark:border-white/10 dark:bg-black/40 dark:hover:bg-white/10 dark:text-slate-200"
            aria-label="Notifications"
            aria-expanded={alertsOpen}
            aria-controls="crm-alerts"
          >
            <Bell className="size-4 text-slate-500 dark:text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex size-2.5 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
            )}
          </Button>

          {alertsOpen && (
            <div
              id="crm-alerts"
              role="dialog"
              aria-label="Notifications"
              className="absolute top-[calc(100%+8px)] right-0 z-50 w-84 rounded-2xl border border-blue-100 bg-white/95 backdrop-blur-3xl p-3 shadow-2xl animate-in fade-in zoom-in-95 dark:border-white/10 dark:bg-[#0b1324]/95 text-slate-900 dark:text-white"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10 mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Operational Alerts</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[0.65rem] font-bold text-blue-700 dark:text-blue-300">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[0.68rem] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground">
                  No active alerts
                </div>
              ) : (
                <ul className="space-y-1 max-h-72 overflow-y-auto no-scrollbar">
                  {notifications.map((alert) => (
                    <li
                      key={alert.id}
                      className={`group relative flex items-start justify-between gap-2 rounded-xl p-2 transition-colors ${
                        alert.read ? "hover:bg-muted/60 opacity-80" : "bg-muted/40 hover:bg-muted"
                      }`}
                    >
                      <Link
                        href={alert.href}
                        onClick={() => {
                          markNotificationRead(alert.id);
                          setAlertsOpen(false);
                        }}
                        className="flex flex-col gap-0.5 flex-1 min-w-0 cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-foreground flex items-center gap-1.5 truncate">
                            {alert.urgent ? (
                              <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                            ) : (
                              <CheckCircle2 className="size-3.5 text-[#00b153] shrink-0" />
                            )}
                            <span className="truncate">{alert.title}</span>
                          </span>
                          <span className="text-[0.65rem] text-muted-foreground font-mono shrink-0 ml-1">
                            {alert.time}
                          </span>
                        </div>
                        <p className="text-[0.7rem] text-muted-foreground pl-5 leading-relaxed">
                          {alert.desc}
                        </p>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(alert.id);
                        }}
                        className="shrink-0 p-1 text-muted-foreground/60 hover:text-foreground rounded-md hover:bg-background transition-colors cursor-pointer"
                        title="Dismiss alert"
                      >
                        <X className="size-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                onClick={() => setAlertsOpen(false)}
                className="mt-2.5 w-full rounded-xl border border-blue-100 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-blue-100/80 bg-white/80 backdrop-blur-md p-1 pr-2.5 transition shadow-xs hover:bg-white cursor-pointer dark:border-white/10 dark:bg-black/30 dark:hover:bg-white/10"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-2xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[100px]">
                  {userName}
                </span>
                <span className="text-[0.65rem] text-slate-500 dark:text-slate-400 leading-tight truncate max-w-[100px]">
                  {userEmail}
                </span>
              </div>
              <ChevronDown className="size-3 text-slate-400 dark:text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[#0b1324] border-blue-100 dark:border-white/10 text-slate-900 dark:text-white shadow-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white">{userName}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{userEmail}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />
            <DropdownMenuItem asChild>
              <Link href="/app/settings" className="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-blue-600">
                Settings &amp; Workspace
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />
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
            className="h-9 gap-1.5 rounded-xl border border-blue-100/80 bg-white/80 backdrop-blur-md px-3 text-xs font-semibold shadow-xs text-slate-600 hover:bg-white hover:text-slate-900 cursor-pointer dark:border-white/10 dark:bg-black/30 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <LogOut className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
