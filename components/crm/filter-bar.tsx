"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className={cn("mb-4 flex flex-col gap-2 sm:flex-row sm:items-center", className)}>
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slateblue" aria-hidden />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-linelight bg-white pr-3 pl-9 text-[0.88rem] text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/12"
        />
      </label>
      {children}
    </div>
  );
}
