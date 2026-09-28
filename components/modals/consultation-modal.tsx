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
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };

const INTEREST_OPTIONS = [
  { id: "ops", label: "Operations 360 Cockpit", value: "OPERATIONS 360 — Integrated Operations Platform (Flagship)" },
  { id: "crm", label: "BITScrm Collections", value: "BITScrm Collections Core (Banking & Lending)" },
  { id: "ai", label: "BITSagent AI Voice Dialer", value: "BITSagent Autonomous Voice AI" },
  { id: "erp", label: "Sovereign On-Premises ERP", value: "Sovereign On-Premises Deployment & Hardware Scoping" },
  { id: "suite", label: "Full Custom Software Suite", value: "Custom Multi-Product Bundle (Combine Multiple Engines)" },
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
          <div className="p-8 sm:p-10 flex flex-col items-center text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-[0.72rem] font-black uppercase tracking-wider text-emerald-700">
              Request Received · Blueprint Scheduled
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Thank you! We&apos;ve reserved your consultation.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-md">
              A senior BITS solutions architect is reviewing your operational requirements. We have sent a confirmation email with your preliminary blueprint details.
            </p>

            <div className="mt-6 w-full rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-left">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Fast-Track Option
              </p>
              <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                Need an immediate 20-minute discussion today? Choose an open slot directly on our live calendar:
              </p>
              <a
                href="https://cal.com/boundlessits/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-colors"
              >
                <span>Select Calendar Time Slot</span>
                <span>→</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-8 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex size-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[0.72rem] font-black uppercase tracking-[0.16em] text-blue-600">
                  Direct Architecture Intake · 20-Min Call
                </span>
              </div>
              <DialogTitle className="text-2xl font-extrabold tracking-tight text-slate-900">
                Book a Free Architecture Consultation
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600 leading-relaxed">
                Simple words, direct answers. Tell us what your operations need and our engineering leads will show you an exact system blueprint.
              </DialogDescription>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  What is your primary focus?
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((opt) => {
                    const isSelected = selectedInterest === opt.value;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedInterest(opt.value)}
                        className={cn(
                          "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 text-left",
                          isSelected
                            ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="interest" value={selectedInterest} />
              </div>

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 mb-1">
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
                      "h-10 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400",
                      "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                      state.errors.name ? "border-rose-400" : "border-slate-200 hover:border-slate-300"
                    )}
                  />
                  {state.errors.name && (
                    <p className="mt-1 text-[0.72rem] text-rose-600 font-medium">{state.errors.name[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 mb-1">
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
                      "h-10 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400",
                      "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                      state.errors.email ? "border-rose-400" : "border-slate-200 hover:border-slate-300"
                    )}
                  />
                  {state.errors.email && (
                    <p className="mt-1 text-[0.72rem] text-rose-600 font-medium">{state.errors.email[0]}</p>
                  )}
                </div>
              </div>

              {/* Company & Phone / Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-company" className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-company"
                    name="company"
                    type="text"
                    required
                    placeholder="e.g. Apex Financial Corp"
                    defaultValue={state.values.company || ""}
                    className={cn(
                      "h-10 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400",
                      "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                      state.errors.company ? "border-rose-400" : "border-slate-200 hover:border-slate-300"
                    )}
                  />
                  {state.errors.company && (
                    <p className="mt-1 text-[0.72rem] text-rose-600 font-medium">{state.errors.company[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-primaryChallenge" className="block text-xs font-bold text-slate-700 mb-1">
                    Team Size / Call Seats
                  </label>
                  <select
                    id="modal-companySize"
                    name="companySize"
                    defaultValue={state.values.companySize || "11-50"}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20"
                  >
                    <option value="1-10">1 – 10 Team Members</option>
                    <option value="11-50">11 – 50 Team Members</option>
                    <option value="51-200">51 – 200 Team Members</option>
                    <option value="201-500">201 – 500 Team Members</option>
                    <option value="500+">500+ Enterprise Scale</option>
                  </select>
                </div>
              </div>

              {/* Brief challenge or requirements */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-bold text-slate-700 mb-1">
                  What operational challenge do you want to solve?
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={2}
                  placeholder="e.g. Current dialer is disjointed from accounting, or high delinquent debt volume with manual followup..."
                  defaultValue={state.values.message || ""}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20 hover:border-slate-300 resize-none"
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className={cn(
                    "group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98]",
                    pending && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {pending ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Scheduling Consultation...</span>
                    </span>
                  ) : (
                    <>
                      <span>Confirm 20-Min Consultation</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>→</span>
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[0.72rem] text-slate-500 font-medium">
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
