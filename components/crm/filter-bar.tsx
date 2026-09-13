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
        <span className="mb-1 block text-[0.7rem] font-semibold tracking-[0.06em] text-slateblue uppercase sm:sr-only">
          Search
        </span>
        <span className="relative block">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slateblue"
            aria-hidden
          />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-full cursor-text rounded-xl border border-linelight bg-white pr-3 pl-9 text-[0.88rem] text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/12"
          />
        </span>
      </label>
      {children ? <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end">{children}</div> : null}
    </div>
  );
}
