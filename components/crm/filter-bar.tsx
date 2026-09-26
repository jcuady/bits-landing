"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Standard CRM list filter row: search + optional selects.
 * Spacing: gap-3, mb-5 to match PageHeader rhythm.
 */
export function FilterBar({
  value,
  onChange,
  placeholder = "Search…",
  children,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-3 sm:flex-row sm:items-end",
        className
      )}
    >
      <label className="relative min-w-0 flex-1">
        <span className="mb-1 block text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase sm:sr-only">
          Search
        </span>
        <span className="relative block">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-10 w-full cursor-text rounded-xl border border-border bg-card pr-3 pl-9 text-[0.84rem] text-foreground outline-none transition focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 placeholder:text-muted-foreground"
          />
        </span>
      </label>
      {children ? <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end">{children}</div> : null}
    </div>
  );
}
