"use client";

/**
 * Shared demo surface primitives for BITS product sandboxes.
 *
 * These exist so every sandbox module (Sales, Support, Marketing, Commerce)
 * renders the same visual language instead of each page inventing its own
 * cards. Everything here is presentation-only and Supabase-free: state lives in
 * the module's local store, seeded with clearly-labelled demo data.
 *
 * Backgrounds are fixed by design (navy workspace + sky/electric accents).
 * Foregrounds are chosen to clear WCAG AA against those backgrounds.
 */

import * as React from "react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

/* ── Panel ──────────────────────────────────────────────────────────────── */

export function Panel({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-sky-400/20 bg-[#0d2a5c]/60 backdrop-blur-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  subtitle,
  icon: Icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-sky-400/15 px-5 py-4">
      <div className="flex items-start gap-2.5">
        {Icon && <Icon className="mt-0.5 size-4 shrink-0 text-sky-300" aria-hidden />}
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs leading-relaxed text-sky-200/80">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ── Stat ───────────────────────────────────────────────────────────────── */

export function Stat({
  label,
  value,
  delta,
  icon: Icon,
  accent = "sky",
}: {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon?: LucideIcon;
  accent?: "sky" | "emerald" | "amber" | "violet";
}) {
  const accentRing = {
    sky: "text-sky-300",
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    violet: "text-violet-300",
  }[accent];

  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-200/70">
            {label}
          </p>
          <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-white">{value}</p>
          {delta && (
            <p
              className={`mt-1.5 inline-flex items-center gap-1 text-xs font-semibold ${
                delta.positive ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {delta.positive ? (
                <TrendingUp className="size-3" aria-hidden />
              ) : (
                <TrendingDown className="size-3" aria-hidden />
              )}
              {delta.value}
            </p>
          )}
        </div>
        {Icon && (
          <span className="rounded-xl bg-white/10 p-2.5">
            <Icon className={`size-5 ${accentRing}`} aria-hidden />
          </span>
        )}
      </div>
    </Panel>
  );
}

/* ── Status pill ────────────────────────────────────────────────────────── */

const STATUS_STYLES: Record<string, string> = {
  neutral: "border-slate-400/30 bg-slate-400/15 text-slate-200",
  info: "border-sky-400/30 bg-sky-400/15 text-sky-200",
  success: "border-emerald-400/30 bg-emerald-400/15 text-emerald-200",
  warning: "border-amber-400/30 bg-amber-400/15 text-amber-200",
  danger: "border-rose-400/30 bg-rose-400/15 text-rose-200",
  violet: "border-violet-400/30 bg-violet-400/15 text-violet-200",
};

export function StatusPill({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof STATUS_STYLES;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}

/* ── Buttons ────────────────────────────────────────────────────────────── */

export function DemoButton({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  disabled,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 shadow-sm shadow-blue-600/30 border border-blue-500",
    secondary:
      "bg-white/10 text-white hover:bg-white/15 border border-sky-400/30",
    ghost:
      "bg-transparent text-sky-200 hover:bg-white/10 hover:text-white border border-transparent",
    danger:
      "bg-rose-600/90 text-white hover:bg-rose-500 border border-rose-500/50",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // min-h-11 (44px) satisfies the touch-target floor in docs/UI_STANDARDS.md.
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Form controls ──────────────────────────────────────────────────────── */

export function DemoField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  const id = React.useId();
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-wider text-sky-200/80"
      >
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ id?: string }>, { id })
        : children}
      {hint && <p className="text-[11px] text-sky-200/60">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full min-h-10 rounded-lg border border-sky-400/25 bg-[#081f4d] px-3 text-sm text-white placeholder-sky-300/40 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-400/30";

/* ── Table ──────────────────────────────────────────────────────────────── */

export function DemoTable({
  head,
  children,
}: {
  head: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-sky-400/20">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-sky-200/70"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-sky-400/10">{children}</tbody>
      </table>
    </div>
  );
}

/* ── Empty state ────────────────────────────────────────────────────────── */

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {Icon && (
        <span className="rounded-2xl bg-white/10 p-3">
          <Icon className="size-6 text-sky-300" aria-hidden />
        </span>
      )}
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-sky-200/70">{body}</p>
      </div>
      {action}
    </div>
  );
}

/* ── Demo-data banner ───────────────────────────────────────────────────── */

/**
 * Every sandbox shows this so a viewer never mistakes seeded figures for real
 * customer data.
 */
export function DemoDataBanner({ note }: { note?: string }) {
  return (
    <p className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-2.5 text-xs text-amber-100">
      <span className="font-semibold">Demo data —</span>{" "}
      {note ?? "synthetic sample records for evaluation. Not live customer data."}
    </p>
  );
}

/* ── Progress meter ─────────────────────────────────────────────────────── */

export function Meter({
  value,
  max = 100,
  tone = "sky",
  label,
}: {
  value: number;
  max?: number;
  tone?: "sky" | "emerald" | "amber" | "rose";
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const bar = {
    sky: "bg-sky-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
  }[tone];

  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-[11px] text-sky-200/80">
          <span>{label}</span>
          <span className="font-mono tabular-nums">
            {Math.round(pct)}%
          </span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ── Page scaffold ──────────────────────────────────────────────────────── */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-sky-200/80">{description}</p>
      </div>
      {action}
    </div>
  );
}

/** Shared PHP peso formatter for every sandbox module. */
export function peso(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `₱${(value / 1_000_000).toFixed(2)}M`;
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `₱${(value / 1_000).toFixed(0)}K`;
  }
  return `₱${value.toLocaleString("en-PH", { maximumFractionDigits: 2 })}`;
}