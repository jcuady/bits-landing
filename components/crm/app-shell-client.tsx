"use client";

import * as React from "react";
import { AppSidebar } from "@/components/crm/app-sidebar";
import { AppTopbar } from "@/components/crm/app-topbar";
import { MobileNav } from "@/components/crm/mobile-nav";
import { useCrm } from "@/lib/crm/store";
import { cn } from "@/lib/utils";

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
    <div className="bionis-dashboard flex h-[100dvh] overflow-hidden bg-background text-foreground antialiased">
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
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 bg-background/50"
        >
          <div className="mx-auto max-w-[1360px] pb-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
