"use client";

import * as React from "react";
import { useActionState } from "react";
import { consultationOptions, contactInterests, site } from "@/lib/site";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { FormTermsConsent } from "@/components/ui/form-terms-consent";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };
const fieldOrder = [
  "name",
  "email",
  "company",
  "interest",
  "companySize",
  "industry",
  "currentSystem",
  "primaryChallenge",
  "preferredMethod",
  "message",
] as const;

const QUICK_SOLUTIONS = [
  {
    id: "ops360",
    label: "Operations 360 (OMS)",
    badge: "Flagship",
    value: "OPERATIONS 360 — Integrated Operations Platform (Flagship)",
  },
  {
    id: "voice-ai",
    label: "BITSagent Voice AI",
    badge: "Sub-300ms",
    value: "BITSagent — Conversational Voice AI",
  },
  {
    id: "accounting",
    label: "Accounting & ERP",
    badge: "BIR CAS",
    value: "BITS Accounting & ERP",
  },
  {
    id: "crm",
    label: "BITScrm Suite",
    badge: "Sales & Support",
    value: "BITScrm — Collections & Operations Core",
  },
  {
    id: "custom",
    label: "Custom System Bundle",
    badge: "Multi-Engine",
    value: "Custom Multi-Product Bundle (Combine Multiple Engines)",
  },
] as const;

const inputClass = (invalid: boolean) =>
  cn(
    "h-10 w-full rounded-xl border bg-white px-3.5 text-xs sm:text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400",
    "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
    invalid ? "border-rose-400 bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1">
      <svg className="size-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
      <span>{errors[0]}</span>
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const [selectedInterest, setSelectedInterest] = React.useState<string>(
    state.values.interest ?? QUICK_SOLUTIONS[0].value
  );
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    const bundle = params.get("bundle");
    const product = params.get("product");
    if (pkg === "operations-360" || pkg === "ops" || product === "operations-360") {
      setSelectedInterest("OPERATIONS 360 — Integrated Operations Platform (Flagship)");
    } else if (bundle || pkg === "custom-deployment") {
      setSelectedInterest("Custom Multi-Product Bundle (Combine Multiple Engines)");
    } else if (pkg === "starter") {
      setSelectedInterest("OPERATIONS 360 — Integrated Operations Platform (Flagship)");
    } else if (pkg === "growth") {
      setSelectedInterest("BITS Suite (CRM + AI Operations)");
    } else if (pkg === "enterprise" || pkg === "on-premises") {
      setSelectedInterest("Sovereign On-Premises Deployment & Hardware Scoping");
    } else if (pkg === "managed-cloud") {
      setSelectedInterest("Secure Managed Cloud Deployment");
    } else if (pkg === "whitelabel") {
      setSelectedInterest("White Label SaaS Platform");
    } else if (pkg === "nfc") {
      setSelectedInterest("Smart NFC & Identity Card Solutions");
    } else if (product) {
      setSelectedInterest(product);
    }
  }, []);

  React.useEffect(() => {
    if (state.ok) return;
    const first = fieldOrder.find((key) => state.errors[key]?.length);
    if (!first) return;
    document.getElementById(first)?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[22rem] flex-col justify-center rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-xl shadow-slate-900/5 relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-400" />
        
        <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-600 shadow-xs">
          <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-700">
            Blueprint Request Received
          </p>
        </div>

        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Thank you! We&apos;ve received your consultation request.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          A BITS solutions architect will review your operational requirements and reach out
          {state.values.email ? ` to ${state.values.email}` : ""} within 2 business hours with your custom software blueprint.
        </p>

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-blue-950 uppercase tracking-wider">Fast-Track 20-Min Call</p>
              <p className="text-xs text-blue-800 mt-0.5">Want to skip email back-and-forth and lock in a live architecture demo right now?</p>
            </div>
            <a
              href="https://cal.com/boundlessits/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <span>Book Slot</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-consultation-form"
      name="contact-consultation"
      aria-label="Enterprise Blueprint Consultation Request Form"
      action={formAction}
      noValidate
      aria-busy={pending}
      className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl shadow-slate-900/5 relative overflow-hidden"
      key={`${state.values.name ?? ""}-${state.values.email ?? ""}-${Object.keys(state.errors).join(",")}-${state.formError ?? ""}`}
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex size-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Direct Engineering Intake
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Request Your Custom Blueprint &amp; Live Demo
            </h3>
          </div>
          <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
            2-Hour SLA
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          Tell us about your team and what you want to improve. No high-pressure sales pitch—just straightforward answers and tailored software architecture.
        </p>
      </div>

      {state.formError ? (
        <div
          role="alert"
          className="mt-3.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700 flex items-start gap-2"
        >
          <span className="text-base leading-none">⚠️</span>
          <span>{state.formError}</span>
        </div>
      ) : null}

      <div className="mt-4 space-y-4">
        {/* Step 1: Solution Area of Interest (Intuitive Chips) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            1. What system are you interested in?
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_SOLUTIONS.map((sol) => {
              const isSelected = selectedInterest === sol.value;
              return (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => setSelectedInterest(sol.value)}
                  className={cn(
                    "group inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer border text-left",
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20"
                      : "border-slate-200/80 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  )}
                >
                  <span>{sol.label}</span>
                  <span
                    className={cn(
                      "text-[10px] font-normal px-1.5 py-0.2 rounded-md transition-colors",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/70 text-slate-600 group-hover:bg-slate-300/70"
                    )}
                  >
                    {sol.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fallback full select dropdown for any other specific engine */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[11px] text-slate-500">Or choose specific engine:</span>
            <div className="relative flex-1">
              <select
                id="interest"
                name="interest"
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-700 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600/20 appearance-none pr-6"
              >
                {contactInterests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-slate-400">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Core Contact Info (3 clean fields) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            2. Your Details
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="e.g. Maria Santos"
                defaultValue={state.values.name ?? ""}
                aria-invalid={!!state.errors.name}
                aria-describedby={state.errors.name ? "name-error" : undefined}
                className={inputClass(!!state.errors.name)}
              />
              <FieldError id="name-error" errors={state.errors.name} />
            </div>

            {/* Work Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                placeholder="name@company.com"
                defaultValue={state.values.email ?? ""}
                aria-invalid={!!state.errors.email}
                aria-describedby={state.errors.email ? "email-error" : undefined}
                className={inputClass(!!state.errors.email)}
              />
              <FieldError id="email-error" errors={state.errors.email} />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                placeholder="e.g. Apex Operations Group"
                defaultValue={state.values.company ?? ""}
                aria-invalid={!!state.errors.company}
                aria-describedby={state.errors.company ? "company-error" : undefined}
                className={inputClass(!!state.errors.company)}
              />
              <FieldError id="company-error" errors={state.errors.company} />
            </div>

            {/* Team Size */}
            <div>
              <label htmlFor="companySize" className="block text-xs font-semibold text-slate-700 mb-1">
                Operational Team Size
              </label>
              <div className="relative">
                <select
                  id="companySize"
                  name="companySize"
                  defaultValue={state.values.companySize ?? "16 - 50 seats"}
                  className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
                >
                  {consultationOptions.companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400">
                  ▾
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Plain-Language Goal / Problem */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            3. What are you looking to improve or solve? <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            required
            defaultValue={state.values.message ?? ""}
            aria-invalid={!!state.errors.message}
            aria-describedby={state.errors.message ? "message-error" : undefined}
            className={cn(
              inputClass(!!state.errors.message),
              "h-auto min-h-[4.5rem] resize-y py-2.5 text-xs sm:text-sm leading-relaxed"
            )}
            placeholder="Tell us what you want to automate, consolidate, or replace (e.g., replacing manual spreadsheets, setting up automated voice follow-ups, or connecting operations with accounting)..."
          />
          <FieldError id="message-error" errors={state.errors.message} />
        </div>

        {/* Optional Operational Details Toggle */}
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-3.5 transition-colors">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex w-full items-center justify-between text-left text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span>{showAdvanced ? "▼" : "▶"}</span>
              <span>Additional Details (Industry, Current Tools &amp; Format)</span>
              <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            </span>
            <span className="text-[11px] text-blue-600 font-medium">
              {showAdvanced ? "Hide" : "Add Details"}
            </span>
          </button>

          {showAdvanced ? (
            <div className="mt-3.5 grid gap-3 sm:grid-cols-2 pt-3 border-t border-slate-200/60 animate-in fade-in duration-200">
              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Industry / Sector
                </label>
                <div className="relative">
                  <select
                    id="industry"
                    name="industry"
                    defaultValue={state.values.industry ?? ""}
                    className={cn(inputClass(false), "h-9 text-xs appearance-none pr-8")}
                  >
                    <option value="">Select industry</option>
                    {consultationOptions.industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-400">
                    ▾
                  </span>
                </div>
              </div>

              {/* Current Tooling */}
              <div>
                <label htmlFor="currentSystem" className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Current Primary Tooling
                </label>
                <div className="relative">
                  <select
                    id="currentSystem"
                    name="currentSystem"
                    defaultValue={state.values.currentSystem ?? ""}
                    className={cn(inputClass(false), "h-9 text-xs appearance-none pr-8")}
                  >
                    <option value="">Select current system</option>
                    {consultationOptions.currentSystems.map((sys) => (
                      <option key={sys} value={sys}>
                        {sys}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-400">
                    ▾
                  </span>
                </div>
              </div>

              {/* Primary Challenge */}
              <div>
                <label htmlFor="primaryChallenge" className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Primary Operational Challenge
                </label>
                <div className="relative">
                  <select
                    id="primaryChallenge"
                    name="primaryChallenge"
                    defaultValue={state.values.primaryChallenge ?? ""}
                    className={cn(inputClass(false), "h-9 text-xs appearance-none pr-8")}
                  >
                    <option value="">Select primary challenge</option>
                    {consultationOptions.primaryChallenges.map((ch) => (
                      <option key={ch} value={ch}>
                        {ch}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-400">
                    ▾
                  </span>
                </div>
              </div>

              {/* Preferred Meeting Format */}
              <div>
                <label htmlFor="preferredMethod" className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Preferred Consultation Format
                </label>
                <div className="relative">
                  <select
                    id="preferredMethod"
                    name="preferredMethod"
                    defaultValue={state.values.preferredMethod ?? "Video Consultation (Google Meet)"}
                    className={cn(inputClass(false), "h-9 text-xs appearance-none pr-8")}
                  >
                    {consultationOptions.preferredMethods.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-400">
                    ▾
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Hidden default values when collapsed to preserve schema compatibility
            <>
              <input type="hidden" name="industry" value={state.values.industry ?? ""} />
              <input type="hidden" name="currentSystem" value={state.values.currentSystem ?? ""} />
              <input type="hidden" name="primaryChallenge" value={state.values.primaryChallenge ?? ""} />
              <input type="hidden" name="preferredMethod" value={state.values.preferredMethod ?? "Video Consultation (Google Meet)"} />
            </>
          )}
        </div>
      </div>

      {/* Honeypot for bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Terms and Privacy Consent */}
      <div className="mt-3.5">
        <FormTermsConsent id="contact-form-terms" variant="light" />
      </div>

      {/* Footer Submit Bar */}
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <svg className="size-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Confidential · NDA protected · Zero spam</span>
        </div>

        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] disabled:opacity-60 sm:w-auto cursor-pointer",
            pending && "opacity-75 cursor-not-allowed"
          )}
        >
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Preparing Blueprint...</span>
            </span>
          ) : (
            <>
              <span>Get Free Blueprint &amp; Live Demo</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
