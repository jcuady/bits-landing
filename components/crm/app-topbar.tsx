"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, LogOut, Bell } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

const DEMO_ALERTS = [
  { id: "1", text: "Voltgrid deal stalled 12 days", meta: "2h ago", href: "/app/opportunities/op-3" },
  { id: "2", text: "Elise Navarro replied on SLA draft", meta: "4h ago", href: "/app/conversations" },
  { id: "3", text: "Q3 nurture campaign hit 38 conversions", meta: "1d ago", href: "/app/campaigns" },
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
  const [alertsOpen, setAlertsOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!alertsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setAlertsOpen(false);
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

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-linelight bg-white px-3 sm:px-5">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex size-10 min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg border border-linelight text-ink transition hover:bg-cloud lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.82rem] font-medium text-slateblue">BITS CRM · Demo</p>
      </div>

      <div className="relative" ref={panelRef}>
        <button
          type="button"
          onClick={() => setAlertsOpen((v) => !v)}
          className="relative inline-flex size-10 min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg text-slateblue transition hover:bg-cloud hover:text-ink"
          aria-label="Notifications"
          aria-expanded={alertsOpen}
          aria-controls="crm-alerts"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-electric-600" aria-hidden />
        </button>
        {alertsOpen ? (
          <div
            id="crm-alerts"
            role="dialog"
            aria-label="Notifications"
            className="absolute top-[calc(100%+8px)] right-0 z-40 w-[min(100vw-2rem,320px)] rounded-xl border border-linelight bg-white p-2 shadow-[0_16px_40px_-20px_rgb(6_22_47/0.35)]"
          >
            <p className="px-2.5 py-2 text-[0.72rem] font-semibold tracking-wide text-slateblue uppercase">
              Alerts
            </p>
            <ul>
              {DEMO_ALERTS.map((a) => (
                <li key={a.id}>
                  <Link
                    href={a.href}
                    onClick={() => setAlertsOpen(false)}
                    className="block cursor-pointer rounded-lg px-2.5 py-2 transition hover:bg-cloud"
                  >
                    <p className="text-[0.84rem] font-medium text-ink">{a.text}</p>
                    <p className="text-[0.72rem] text-slateblue">{a.meta}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setAlertsOpen(false)}
              className="mt-1 min-h-10 w-full cursor-pointer rounded-lg border border-linelight py-2 text-[0.78rem] font-semibold text-ink transition hover:bg-cloud"
            >
              Dismiss
            </button>
          </div>
        ) : null}
      </div>

      <div className="hidden min-w-0 text-right sm:block">
        <p className="truncate text-[0.82rem] font-semibold text-ink">{userName}</p>
        <p className="truncate text-[0.72rem] text-slateblue">{userEmail}</p>
      </div>

      <form action={logoutAction}>
        <Button type="submit" variant="ghostLight" size="sm" className="cursor-pointer gap-1.5 px-2.5">
          <LogOut className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Log out</span>
        </Button>
      </form>
    </header>
  );
}
