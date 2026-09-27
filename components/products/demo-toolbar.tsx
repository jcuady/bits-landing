"use client";

import * as React from "react";
import Link from "next/link";
import { useDemo, type DemoPersona } from "@/lib/products/demo-store";
import { getProductById } from "@/lib/products/registry";
import {
  Sparkles,
  RotateCcw,
  Palette,
  ExternalLink,
  Layers,
  ChevronDown,
  Check,
  UserCheck,
  ShieldCheck,
  Terminal,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DemoToolbarProps {
  productId: string;
}

const PERSONA_LABELS: Record<
  DemoPersona,
  { label: string; icon: React.ComponentType<{ className?: string }>; desc: string }
> = {
  sales_director: {
    label: "Sales Director",
    icon: UserCheck,
    desc: "Executive forecasting, quota tracking, CPQ margin approvals",
  },
  sales_rep: {
    label: "Sales Representative",
    icon: UserCheck,
    desc: "Daily deal pipeline, lead assignment, call logging",
  },
  po_demo: {
    label: "Product Owner / Demo",
    icon: ShieldCheck,
    desc: "Full enterprise showcase with all workflows unlocked",
  },
  pm_qa: {
    label: "Project Manager / QA",
    icon: Check,
    desc: "Acceptance criteria, test records, telemetry audit",
  },
  dev_admin: {
    label: "Full-Stack Dev",
    icon: Terminal,
    desc: "Telemetry HUD, simulated latency, sandbox store controls",
  },
  cfo: {
    label: "Chief Financial Officer",
    icon: ShieldCheck,
    desc: "BIR CAS compliance, financial rollups, general ledger",
  },
};

export function DemoToolbar({ productId }: DemoToolbarProps) {
  const product = getProductById(productId);
  const {
    persona,
    setPersona,
    isWhiteLabelPreview,
    toggleWhiteLabel,
    resetSandboxData,
    isSandboxResetting,
    whiteLabelClientName,
  } = useDemo();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activePersonaInfo = PERSONA_LABELS[persona] || PERSONA_LABELS.sales_director;
  const ActiveIcon = activePersonaInfo.icon;

  return (
    <div className="sticky top-0 z-50 w-full border-b border-navy-800/40 bg-navy-950/95 backdrop-blur-md text-white px-4 py-2 text-xs shadow-md transition-all">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-7xl">
        {/* Left: Product & Environment Badge */}
        <div className="flex items-center gap-2.5">
          <Badge
            variant="outline"
            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 text-[10px] tracking-wide uppercase flex items-center gap-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live MVP Sandbox
          </Badge>
          <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
            {product?.name || "BITS Enterprise Product"}
          </span>
        </div>

        {/* Center: Persona Switcher & White-Label Toggle */}
        <div className="flex items-center gap-2">
          {/* Persona Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <ActiveIcon className="h-3.5 w-3.5 text-electric-400 shrink-0" />
              <span>Role: <strong className="text-white font-semibold">{activePersonaInfo.label}</strong></span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-xl border border-slate-700 bg-navy-900 p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Testing Persona
                </div>
                {(Object.keys(PERSONA_LABELS) as DemoPersona[]).map((pKey) => {
                  const item = PERSONA_LABELS[pKey];
                  const Icon = item.icon;
                  const isSelected = persona === pKey;
                  return (
                    <button
                      key={pKey}
                      onClick={() => {
                        setPersona(pKey);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 rounded-lg p-2 text-left text-xs transition cursor-pointer ${
                        isSelected
                          ? "bg-electric-600/20 text-white font-medium border border-electric-500/40"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? "text-electric-400" : "text-slate-400"}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          {isSelected && <Check className="h-3 w-3 text-electric-400" />}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* White-Label Rebranding Toggle */}
          <button
            onClick={toggleWhiteLabel}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              isWhiteLabelPreview
                ? "border-sky-500/50 bg-sky-500/20 text-sky-200"
                : "border-slate-700/80 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
            title="Preview how this software looks branded for your client enterprise"
          >
            <Palette className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden md:inline">
              {isWhiteLabelPreview ? `Previewing: ${whiteLabelClientName}` : "White-Label Preview"}
            </span>
            <span className="md:hidden">Brand</span>
          </button>

          {/* Reset Sandbox Data */}
          <button
            onClick={resetSandboxData}
            disabled={isSandboxResetting}
            className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-red-950/40 hover:text-red-300 hover:border-red-800/60 transition cursor-pointer disabled:opacity-50"
            title="Reset deals, leads, and quotes to clean initial seed state"
          >
            <RotateCcw className={`h-3 w-3 ${isSandboxResetting ? "animate-spin text-red-400" : ""}`} />
            <span className="hidden sm:inline">Reset Data</span>
          </button>
        </div>

        {/* Right: Directory Hub & Architecture Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1.5 text-slate-200 hover:bg-slate-700 hover:text-white transition"
          >
            <Layers className="h-3 w-3 text-amber-400" />
            <span>All 18 Engines</span>
          </Link>

          {product?.marketingUrl && (
            <Link
              href={product.marketingUrl}
              target="_blank"
              className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-slate-200 transition text-[11px]"
            >
              <span>Product Specs</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          )}

          <Button
            asChild
            size="sm"
            className="h-7 text-xs bg-electric-600 hover:bg-electric-500 font-semibold px-2.5 py-1"
          >
            <Link href="/contact">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Book Strategy Call</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
