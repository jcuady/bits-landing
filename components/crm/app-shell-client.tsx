"use client";

import * as React from "react";
import { AppSidebar } from "@/components/crm/app-sidebar";
import { AppTopbar } from "@/components/crm/app-topbar";
import { MobileNav } from "@/components/crm/mobile-nav";
import { useCrm } from "@/lib/crm/store";

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
    <div className="flex h-[100dvh] overflow-hidden bg-cloud">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-card focus:ring-4 focus:ring-electric-600/20"
      >
        Skip to content
      </a>
      <AppSidebar className="hidden lg:flex" />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar
          userName={displayName || userName}
          userEmail={userEmail}
          onMenuClick={() => setNavOpen(true)}
        />
        <main id="content" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
