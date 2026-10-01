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

const inputClass = (invalid: boolean) =>
  cn(
    "h-9 sm:h-9.5 w-full rounded-lg border bg-white px-3 text-xs sm:text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400",
    "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
    invalid ? "border-rose-400" : "border-slate-200 hover:border-slate-300"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-0.5 text-[11px] font-medium text-rose-600">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const [selectedInterest, setSelectedInterest] = React.useState<string>(
    state.values.interest ?? ""
  );

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
        className="flex min-h-[20rem] flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-3.5 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">
          Request Received
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          Thank you. We&apos;ve received your consultation request.
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          A BITS solutions architect will review your operational requirements and reach out
          {state.values.email ? ` to ${state.values.email}` : ""} promptly with your custom blueprint.
        </p>
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
      className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5.5 shadow-2xs"
      key={`${state.values.name ?? ""}-${state.values.email ?? ""}-${Object.keys(state.errors).join(",")}-${state.formError ?? ""}`}
    >
      <div className="border-b border-slate-200/80 pb-3">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          Book a Free Consultation &amp; Live Demo
        </h3>
        <p className="mt-0.5 text-[11px] text-slate-500">
          Fill out your organization details below for a tailored software proposal and live demo.
        </p>
      </div>

      {state.formError ? (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
        >
          {state.formError}
        </p>
      ) : null}

      <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-[11px] font-semibold text-slate-700">
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

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[11px] font-semibold text-slate-700">
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

        {/* Company */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="company" className="text-[11px] font-semibold text-slate-700">
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="e.g. Acme Recovery Services"
            defaultValue={state.values.company ?? ""}
            aria-invalid={!!state.errors.company}
            aria-describedby={state.errors.company ? "company-error" : undefined}
            className={inputClass(!!state.errors.company)}
          />
          <FieldError id="company-error" errors={state.errors.company} />
        </div>

        {/* Solution / Product Interest */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="interest" className="text-[11px] font-semibold text-slate-700">
            Products &amp; Solution Scope of Interest
          </label>
          <div className="relative">
            <select
              id="interest"
              name="interest"
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
              className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
            >
              <option value="">Select product, bundle or consultative scope...</option>
              {contactInterests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* Company Size */}
        <div className="flex flex-col gap-1">
          <label htmlFor="companySize" className="text-[11px] font-semibold text-slate-700">
            Operational Team Size
          </label>
          <div className="relative">
            <select
              id="companySize"
              name="companySize"
              defaultValue={state.values.companySize ?? ""}
              className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
            >
              <option value="">Select team size</option>
              {consultationOptions.companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* Industry */}
        <div className="flex flex-col gap-1">
          <label htmlFor="industry" className="text-[11px] font-semibold text-slate-700">
            Industry / Sector
          </label>
          <div className="relative">
            <select
              id="industry"
              name="industry"
              defaultValue={state.values.industry ?? ""}
              className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
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

        {/* Current System */}
        <div className="flex flex-col gap-1">
          <label htmlFor="currentSystem" className="text-[11px] font-semibold text-slate-700">
            Current Primary Tooling
          </label>
          <div className="relative">
            <select
              id="currentSystem"
              name="currentSystem"
              defaultValue={state.values.currentSystem ?? ""}
              className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
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
        <div className="flex flex-col gap-1">
          <label htmlFor="primaryChallenge" className="text-[11px] font-semibold text-slate-700">
            Primary Operational Challenge
          </label>
          <div className="relative">
            <select
              id="primaryChallenge"
              name="primaryChallenge"
              defaultValue={state.values.primaryChallenge ?? ""}
              className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
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

        {/* Preferred Contact Method */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="preferredMethod" className="text-[11px] font-semibold text-slate-700">
            Preferred Consultation Format
          </label>
          <div className="relative">
            <select
              id="preferredMethod"
              name="preferredMethod"
              defaultValue={state.values.preferredMethod ?? ""}
              className={cn(inputClass(false), "appearance-none pr-8 text-xs sm:text-sm")}
            >
              <option value="">Select preferred method</option>
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

        {/* Operational Message / Requirements */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="message" className="text-[11px] font-semibold text-slate-700">
            Operational Wish List &amp; Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={2}
            required
            defaultValue={state.values.message ?? ""}
            aria-invalid={!!state.errors.message}
            aria-describedby={state.errors.message ? "message-error" : undefined}
            className={cn(inputClass(!!state.errors.message), "h-auto min-h-[3.75rem] resize-y py-2 text-xs sm:text-sm")}
            placeholder="Fragmented tools you're looking to consolidate (CRM, Dialer, QA, Scorecards, LMS, WFM)..."
          />
          <FieldError id="message-error" errors={state.errors.message} />
        </div>
      </div>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Terms and Privacy Consent */}
      <div className="mt-3">
        <FormTermsConsent id="contact-form-terms" variant="light" />
      </div>

      {/* Footer Submit Bar */}
      <div className="mt-3.5 flex flex-col gap-2.5 border-t border-slate-200/80 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-slate-500">
          Confidential · NDA supported · Zero data sharing.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-9 sm:h-9.5 w-full items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60 sm:w-auto cursor-pointer"
        >
          {pending ? "Submitting Request…" : "Request Live Demo & Proposal →"}
        </button>
      </div>
    </form>
  );
}
