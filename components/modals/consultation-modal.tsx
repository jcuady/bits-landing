"use client";

import * as React from "react";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { FormTermsConsent } from "@/components/ui/form-terms-consent";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };

const INTEREST_OPTIONS = [
  { id: "ops", label: "Operations 360 (OMS)", value: "OPERATIONS 360 — Integrated Operations Platform (Flagship)", badge: "Flagship" },
  { id: "ai", label: "BITSagent Voice AI", value: "BITSagent — Conversational Voice AI", badge: "Sub-300ms" },
  { id: "erp", label: "Accounting & ERP", value: "BITS Accounting & ERP", badge: "BIR CAS" },
  { id: "crm", label: "BITScrm Suite", value: "BITScrm — Collections & Operations Core", badge: "Sales & Support" },
  { id: "custom", label: "Custom Solution", value: "Custom Multi-Product Bundle (Combine Multiple Engines)", badge: "Multi-Engine" },
];

export function ConsultationModal({
  isOpen,
  onClose,
  defaultInterest,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
}) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const [selectedInterest, setSelectedInterest] = React.useState<string>(
    defaultInterest || INTEREST_OPTIONS[0].value
  );

  React.useEffect(() => {
    if (defaultInterest) {
      setSelectedInterest(defaultInterest);
    }
  }, [defaultInterest]);

  // Reset or focus errors
  React.useEffect(() => {
    if (state.ok) return;
    const errorKeys = Object.keys(state.errors) as (keyof typeof state.errors)[];
    if (errorKeys.length > 0) {
      const firstField = errorKeys[0];
      const el = document.getElementById(`modal-${firstField}`);
      if (el) el.focus();
    }
  }, [state]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl sm:rounded-[2rem] p-0 overflow-hidden border-slate-200/90 shadow-2xl">
        {state.ok ? (
          <div className="p-7 sm:p-10 flex flex-col items-center text-center relative">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-400" />
            
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs">
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-[0.72rem] font-bold uppercase tracking-wider text-emerald-700">
              Request Received · Blueprint Scheduled
            </span>
            
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Thank you! We&apos;ve reserved your consultation.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-md">
              A senior BITS solutions architect is reviewing your operational requirements. We have sent a confirmation email with your preliminary blueprint details.
            </p>

            <div className="mt-6 w-full rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-left">
              <p className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                Fast-Track Option
              </p>
              <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                Need an immediate 20-minute discussion today? Choose an open slot directly on our live calendar:
              </p>
              <a
                href="https://cal.com/boundlessits/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-colors"
              >
                <span>Select Calendar Time Slot</span>
                <span aria-hidden>→</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-8 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />
            
            <DialogHeader className="mb-5 text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex size-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[0.72rem] font-black uppercase tracking-[0.16em] text-blue-600">
                  Direct Engineering Intake · 2-Hour Response
                </span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Book a Free Architecture Consultation
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Straightforward answers without tech jargon. Tell us what your team needs, and our software engineers will provide an exact architecture blueprint and live demo.
              </DialogDescription>
            </DialogHeader>

            <form action={formAction} className="space-y-3.5">
              {/* Hidden honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Area of Interest (Interactive Pills) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. What system do you need?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {INTEREST_OPTIONS.map((opt) => {
                    const isSelected = selectedInterest === opt.value;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedInterest(opt.value)}
                        className={cn(
                          "rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 text-left border cursor-pointer inline-flex items-center gap-1.5",
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20"
                            : "border-slate-200/80 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                        )}
                      >
                        <span>{opt.label}</span>
                        <span
                          className={cn(
                            "text-[10px] font-normal px-1 py-0.2 rounded transition-colors",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-200/70 text-slate-600"
                          )}
                        >
                          {opt.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="interest" value={selectedInterest} />
              </div>

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Reyes"
                    defaultValue={state.values.name || ""}
                    className={cn(
                      "h-10 w-full rounded-xl border bg-white px-3 text-base text-slate-900 transition-colors placeholder:text-slate-400",
                      "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                      state.errors.name ? "border-rose-400 bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
                    )}
                  />
                  {state.errors.name && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{state.errors.name[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    defaultValue={state.values.email || ""}
                    className={cn(
                      "h-10 w-full rounded-xl border bg-white px-3 text-base text-slate-900 transition-colors placeholder:text-slate-400",
                      "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                      state.errors.email ? "border-rose-400 bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
                    )}
                  />
                  {state.errors.email && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{state.errors.email[0]}</p>
                  )}
                </div>
              </div>

              {/* Company & Team Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-company" className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-company"
                    name="company"
                    type="text"
                    required
                    placeholder="e.g. Apex Operations Group"
                    defaultValue={state.values.company || ""}
                    className={cn(
                      "h-10 w-full rounded-xl border bg-white px-3 text-base text-slate-900 transition-colors placeholder:text-slate-400",
                      "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                      state.errors.company ? "border-rose-400 bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
                    )}
                  />
                  {state.errors.company && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{state.errors.company[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-companySize" className="block text-xs font-semibold text-slate-700 mb-1">
                    Team Size / Call Seats
                  </label>
                  <div className="relative">
                    <select
                      id="modal-companySize"
                      name="companySize"
                      defaultValue={state.values.companySize || "16 - 50 seats"}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20 appearance-none pr-8"
                    >
                      <option value="1 - 15 seats">1 – 15 Team Members</option>
                      <option value="16 - 50 seats">16 – 50 Team Members</option>
                      <option value="51 - 200 seats">51 – 200 Team Members</option>
                      <option value="200+ seats">200+ Enterprise Scale</option>
                      <option value="Enterprise / Multi-location">Multi-Branch Enterprise</option>
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400">
                      ▾
                    </span>
                  </div>
                </div>
              </div>

              {/* What do you want to solve */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  What are you looking to improve or replace? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  minLength={10}
                  rows={2}
                  placeholder="e.g. We want to replace manual spreadsheets, automate follow-up calls, or connect accounting with operations..."
                  defaultValue={state.values.message || ""}
                  className={cn(
                    "w-full rounded-xl border bg-white p-3 text-base text-slate-900 transition-colors placeholder:text-slate-400",
                    "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20 resize-none",
                    state.errors.message ? "border-rose-400 bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
                  )}
                />
                {state.errors.message && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium">{state.errors.message[0]}</p>
                )}
              </div>

              {/* Terms and Privacy Consent */}
              <div className="pt-0.5">
                <FormTermsConsent id="modal-terms-consent" variant="light" />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={pending}
                  className={cn(
                    "group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] cursor-pointer",
                    pending && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {pending ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Preparing Blueprint...</span>
                    </span>
                  ) : (
                    <>
                      <span>Request Free Blueprint &amp; Live Demo</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[11px] text-slate-500 font-medium">
                  Zero spam · 100% confidential under NDA · Immediate email confirmation
                </p>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
