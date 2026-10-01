"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle2, X, ExternalLink, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormTermsConsentProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  error?: string;
  className?: string;
  variant?: "light" | "glass" | "dark";
}

export function FormTermsConsent({
  id = "form-terms-consent",
  name = "termsConsent",
  checked: controlledChecked,
  onChange,
  required = true,
  error,
  className,
  variant = "light",
}: FormTermsConsentProps) {
  const [internalChecked, setInternalChecked] = React.useState(true);
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = (val: boolean) => {
    if (controlledChecked === undefined) {
      setInternalChecked(val);
    }
    onChange?.(val);
  };

  const isGlass = variant === "glass";
  const isDark = variant === "dark";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start gap-2.5">
        <div className="flex h-5 items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            required={required}
            checked={isChecked}
            onChange={(e) => handleToggle(e.target.checked)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "size-4 rounded-sm border cursor-pointer transition-all duration-150 focus:ring-2 focus:ring-offset-1",
              isGlass
                ? "border-white/30 bg-white/10 text-sky-400 focus:ring-sky-400/40"
                : isDark
                ? "border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500/30"
                : "border-slate-300 bg-white text-blue-600 focus:ring-blue-500/25"
            )}
          />
        </div>

        <div className="flex-1 text-[11px] leading-relaxed">
          <label
            htmlFor={id}
            className={cn(
              "cursor-pointer select-none",
              isGlass ? "text-sky-100/90" : isDark ? "text-slate-300" : "text-slate-600"
            )}
          >
            I agree to the{" "}
            <Link
              href="/legal#terms"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-semibold underline underline-offset-2 transition-colors",
                isGlass
                  ? "text-white hover:text-sky-200 decoration-sky-300/40"
                  : "text-blue-700 hover:text-blue-800 decoration-blue-500/30"
              )}
            >
              Terms &amp; Conditions
            </Link>
            ,{" "}
            <Link
              href="/legal#form-terms"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-semibold underline underline-offset-2 transition-colors",
                isGlass
                  ? "text-white hover:text-sky-200 decoration-sky-300/40"
                  : "text-blue-700 hover:text-blue-800 decoration-blue-500/30"
              )}
            >
              Form Submission Policy
            </Link>
            , and{" "}
            <Link
              href="/legal#privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-semibold underline underline-offset-2 transition-colors",
                isGlass
                  ? "text-white hover:text-sky-200 decoration-sky-300/40"
                  : "text-blue-700 hover:text-blue-800 decoration-blue-500/30"
              )}
            >
              Privacy Notice
            </Link>{" "}
            under Philippine RA 10173.
          </label>{" "}
          <button
            type="button"
            onClick={() => setIsQuickViewOpen(true)}
            className={cn(
              "inline-flex items-center gap-1 font-semibold underline underline-offset-2 decoration-dotted text-[11px] transition-colors cursor-pointer",
              isGlass ? "text-sky-300 hover:text-white" : "text-blue-600 hover:text-blue-800"
            )}
            title="Read 30-second summary of commitments"
          >
            <span>(30-sec summary)</span>
          </button>
        </div>
      </div>

      {error && (
        <p id={`${id}-error`} className="text-[11px] font-medium text-rose-500 pl-6.5">
          {error}
        </p>
      )}

      {/* ── Quick Terms Modal (Instant inspection without leaving form) ── */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-blue-950/70 backdrop-blur-md"
            onClick={() => setIsQuickViewOpen(false)}
            aria-hidden="true"
          />

          <div
            className="relative w-full max-w-md rounded-2xl border border-sky-400/30 bg-gradient-to-b from-[#0b2961] to-[#071d44] p-5 sm:p-6 text-white shadow-2xl shadow-blue-950/70 backdrop-blur-2xl ring-1 ring-white/15 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-terms-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/20 border border-sky-400/30 text-sky-300">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 id="quick-terms-title" className="text-sm font-bold text-white tracking-tight">
                    Form Submission Guarantees
                  </h3>
                  <p className="text-[11px] text-sky-200">
                    Boundless IT Solutions · Sovereign Trust Commitments
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickViewOpen(false)}
                className="rounded-lg p-1 text-white/70 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                aria-label="Close summary"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* 4 Core Commitments */}
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                <Lock className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Mutual NDA Protection</h4>
                  <p className="text-[11px] text-sky-100/80 leading-relaxed mt-0.5">
                    Operational metrics, seating capacity, and software stack details shared during consultation are treated as strictly confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                <ShieldCheck className="size-4 text-sky-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Zero Third-Party Resale</h4>
                  <p className="text-[11px] text-sky-100/80 leading-relaxed mt-0.5">
                    We never rent, trade, or broker your corporate contact information with external marketers or lead syndicates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                <CheckCircle2 className="size-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">30-Day Guaranteed Quotes</h4>
                  <p className="text-[11px] text-sky-100/80 leading-relaxed mt-0.5">
                    All technical scoping diagrams and custom software pricing generated from this submission are price-locked for 30 calendar days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                <FileText className="size-4 text-purple-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Philippine RA 10173 DPA Rights</h4>
                  <p className="text-[11px] text-sky-100/80 leading-relaxed mt-0.5">
                    You retain full rights to request immediate inspection, correction, or erasure of your consultation data within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/15">
              <Link
                href="/legal#form-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-300 hover:text-white underline decoration-sky-400/40"
              >
                <span>Read Full Legal Terms</span>
                <ExternalLink className="size-3" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  handleToggle(true);
                  setIsQuickViewOpen(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-blue-950 shadow-md hover:bg-sky-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                <CheckCircle2 className="size-3.5 text-blue-900" />
                <span>Accept &amp; Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
