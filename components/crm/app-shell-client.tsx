"use client";

import * as React from "react";
import { AppSidebar } from "@/components/crm/app-sidebar";
import { AppTopbar } from "@/components/crm/app-topbar";
import { MobileNav } from "@/components/crm/mobile-nav";

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

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-cloud">
      <AppSidebar className="hidden lg:flex" />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar userName={userName} userEmail={userEmail} onMenuClick={() => setNavOpen(true)} />
        <main id="content" className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
