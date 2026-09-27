"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/lib/products/demo-store";
import { getProductById } from "@/lib/products/registry";
import { DemoToolbar } from "@/components/products/demo-toolbar";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  FileSpreadsheet,
  Building2,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const DEFAULT_PRODUCT_NAV: Record<string, NavItem[]> = {
  "crm-sales": [
    {
      label: "Sales Dashboard",
      href: "/crm-sales",
      icon: LayoutDashboard,
    },
    {
      label: "Deals Pipeline",
      href: "/crm-sales/pipeline",
      icon: KanbanSquare,
      badge: "Kanban",
    },
    {
      label: "Inbound Leads",
      href: "/crm-sales/leads",
      icon: Users,
      badge: "AI Scored",
    },
    {
      label: "CPQ Quoting & Proposals",
      href: "/crm-sales/cpq",
      icon: FileSpreadsheet,
      badge: "1-Click",
    },
  ],
};

interface ProductShellProps {
  productId: string;
  navItems?: NavItem[];
  children: React.ReactNode;
}

export function ProductShell({ productId, navItems, children }: ProductShellProps) {
  const pathname = usePathname();
  const product = getProductById(productId);
  const effectiveNavItems = navItems || DEFAULT_PRODUCT_NAV[productId] || [];
  const {
    persona,
    isWhiteLabelPreview,
    whiteLabelClientName,
    whiteLabelLogoText,
    whiteLabelBrandColor,
  } = useDemo();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-slate-950 text-slate-100 antialiased font-sans">
      {/* 1. Global Sticky Testing Toolbar */}
      <DemoToolbar productId={productId} />

      {/* 2. Main Double-Bezel Frame */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800 bg-slate-900/70 backdrop-blur-md">
          {/* Product Brand Header */}
          <div className="flex h-16 items-center justify-between px-5 border-b border-slate-800/80">
            {isWhiteLabelPreview ? (
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white shadow-inner"
                  style={{ backgroundColor: whiteLabelBrandColor }}
                >
                  {whiteLabelLogoText.slice(0, 1)}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate max-w-[150px]">
                    {whiteLabelLogoText}
                  </div>
                  <div className="text-[10px] text-slate-400">Powered by BITS</div>
                </div>
              </div>
            ) : (
              <Link href={product?.demoPath.replace("/(products)", "") || "/crm-sales"} className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-electric-600 flex items-center justify-center font-bold text-white shadow-md shadow-electric-600/30">
                  B
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight text-white">
                    {product?.shortName || "BITS Suite"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Enterprise v4.2</div>
                </div>
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            {effectiveNavItems.map((item) => {
              const Icon = item.icon;
              // Check if active (handle base path and subpaths)
              const isActive =
                pathname === item.href ||
                (item.href !== "/crm-sales" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-electric-600 text-white shadow-sm shadow-electric-600/20 font-semibold"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Sidebar Box: Testing Context Info */}
          <div className="p-3 border-t border-slate-800/80">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
                <span>Active Persona</span>
                <span className="text-electric-400 font-mono text-[10px] uppercase">{persona}</span>
              </div>
              <p className="mt-1 text-[10px] text-slate-400 leading-normal">
                Pre-seeded Philippine enterprise pipeline & verified tax/currency standards.
              </p>
              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>Currency</span>
                <strong className="text-emerald-400 font-mono">PHP (₱)</strong>
              </div>
            </div>

            {/* Logout button */}
            <form action={logoutAction} className="mt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 py-1.5 text-xs font-medium text-slate-400 hover:bg-red-950/30 hover:text-red-300 hover:border-red-900/40 transition cursor-pointer"
              >
                <LogOut className="h-3 w-3" />
                <span>Exit Sandbox</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-navy-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-72 bg-slate-900 p-4 border-r border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="font-bold text-white">{product?.name || "BITS"}</div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-1">
                  {effectiveNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${
                          isActive ? "bg-electric-600 text-white" : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <form action={logoutAction} className="pt-4 border-t border-slate-800">
                <Button type="submit" variant="outline" size="sm" className="w-full justify-center text-xs">
                  Exit Sandbox
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Main Workspace Column */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          {/* Topbar */}
          <header className="flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-900/50 px-4 sm:px-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="outline" className="border-slate-700 bg-slate-800 text-slate-300 text-xs font-medium">
                  {product?.categoryLabel || "Enterprise Suite"}
                </Badge>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <span className="text-xs font-semibold text-slate-200">
                  {product?.name}
                </span>
              </div>
            </div>

            {/* Quick Actions & Status */}
            <div className="flex items-center gap-3">
              {/* Manila Server Indicator */}
              <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/40 border border-slate-800 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Manila Cloud • 24ms</span>
              </div>

              {/* View Matrix link */}
              <Link
                href="/demo"
                className="hidden sm:flex items-center gap-1 text-xs text-electric-400 hover:text-electric-300 font-medium transition"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>All 18 Engines</span>
              </Link>
            </div>
          </header>

          {/* Scrollable Content Body */}
          <main className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
