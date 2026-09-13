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
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { pressed?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      aria-pressed={pressed}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-linelight bg-white px-3.5 text-[0.8rem] font-semibold text-ink transition duration-200 hover:bg-cloud active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-600/15",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white",
        pressed && "border-electric-600/40 bg-electric-600/10 text-electric-700",
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
      <span className="text-[0.7rem] font-semibold tracking-[0.06em] text-slateblue uppercase sm:sr-only">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-11 w-full min-w-[160px] cursor-pointer rounded-xl border border-linelight bg-white px-3 text-[0.85rem] text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/12 sm:w-auto"
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
