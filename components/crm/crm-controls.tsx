"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard CRM control.
 * Touch: min 40px · cursor-pointer · hover/active · disabled clarity
 */
export function CrmButton({
  className,
  pressed,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
  variant?: "default" | "primary" | "destructive" | "outline";
}) {
  return (
    <button
      type="button"
      {...props}
      aria-pressed={pressed}
      className={cn(
        "inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3.5 text-[0.82rem] font-semibold transition duration-150 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1975f2]",
        (variant === "default" || variant === "outline") &&
          "border-border bg-card text-foreground hover:bg-muted hover:text-foreground dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800",
        variant === "primary" &&
          "border-[#1975f2] bg-[#1975f2] text-white hover:bg-[#1975f2]/90 shadow-xs",
        variant === "destructive" &&
          "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/70",
        "disabled:cursor-not-allowed disabled:opacity-40",
        pressed && "border-[#1975f2]/40 bg-[#1975f2]/10 text-[#1975f2] dark:bg-[#1975f2]/20 dark:text-blue-400",
        className
      )}
    />
  );
}

export function StatusFilter({
  value,
  onChange,
  options,
  label = "Status",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
}) {
  return (
    <label className="flex w-full shrink-0 flex-col gap-1 sm:w-auto">
      <span className="text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase sm:sr-only">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-10 w-full min-w-[160px] cursor-pointer rounded-xl border border-border bg-card px-3 text-[0.84rem] text-foreground outline-none transition focus:border-[#1975f2] focus:ring-2 focus:ring-[#1975f2]/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 sm:w-auto"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
