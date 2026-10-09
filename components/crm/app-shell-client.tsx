"use client";

import * as React from "react";
import { AppSidebar } from "@/components/crm/app-sidebar";
import { AppTopbar } from "@/components/crm/app-topbar";
import { MobileNav } from "@/components/crm/mobile-nav";
import { useCrm } from "@/lib/crm/store";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { ToastProvider } from "@/components/crm/crm-toast";

export function AppShellClient({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
}) {
  const [navOpen, setNavOpen] = React.useState(false);
  const { displayName } = useCrm();

  return (
    <ToastProvider>
      {/* ── DUAL-MODE ATMOSPHERIC CANVAS: Light Mode Clouds & Dark Mode Obsidian Space ── */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* LIGHT MODE: Ultra HD Drifting Clouds & Sky Horizon */}
        <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-700">
          {/* Base Sky Image with Cloud Drift Animation */}
          <div className="absolute inset-0">
            <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
              <Image
                src="/images/crm-sky-cloud-bg.jpg"
                alt="Atmospheric sky background with drifting clouds"
                fill
                priority
                quality={90}
                className="object-cover object-top select-none opacity-85 scale-105"
              />
            </div>
          </div>
          {/* Celestial Sunbreak Bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.85),rgba(219,234,254,0.45)_35%,transparent_75%)]" />
          {/* Frosted Atmospheric Veil for crisp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-blue-50/85 backdrop-blur-[1.5px]" />
        </div>

        {/* DARK MODE: Deep Cosmic Obsidian with Glowing HUD Aura */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700 bg-[#040914]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#040914] via-[#071124] to-[#030611]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,99,219,0.18),rgba(0,166,255,0.06)_40%,transparent_75%)]" />
          <div className="absolute inset-0 bg-grid-dark opacity-35" />
        </div>
      </div>

      <div className="crm-dashboard flex h-[100dvh] overflow-hidden text-foreground antialiased bg-transparent">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-md focus:ring-2 focus:ring-[#1975f2]"
        >
          Skip to content
        </a>
        <AppSidebar className="hidden lg:flex" />
        <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <AppTopbar
            userName={displayName || userName}
            userEmail={userEmail}
            onMenuClick={() => setNavOpen(true)}
          />
          <main
            id="content"
            tabIndex={-1}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 bg-transparent"
          >
            <div className="mx-auto max-w-[1360px] pb-12">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
