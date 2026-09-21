"use client";

import * as React from "react";
import { useActionState } from "react";
import { consultationOptions, site } from "@/lib/site";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };
const fieldOrder = [
  "name",
  "email",
  "company",
  "companySize",
  "industry",
  "currentSystem",
  "primaryChallenge",
  "preferredMethod",
  "message",
] as const;

const inputClass = (invalid: boolean) =>
  cn(
    "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400",
    "focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
    invalid ? "border-rose-400" : "border-slate-200 hover:border-slate-300"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1 text-xs font-medium text-rose-600">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);

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
        className="flex min-h-[30rem] flex-col justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-12"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-widest text-emerald-600">
          Request Received
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Thank you. We&apos;ve received your consultation request.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          A BITS solutions architect will review your operational requirements and reach out
          {state.values.email ? ` to ${state.values.email}` : ""} within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-busy={pending}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
      key={`${state.values.name ?? ""}-${state.values.email ?? ""}-${Object.keys(state.errors).join(",")}-${state.formError ?? ""}`}
    >
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl font-bold text-slate-900">
          Book an Operational Blueprint Consultation
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Fill out your organization&apos;s details below. We read every request and prepare a tailored architecture discussion.
        </p>
      </div>

      {state.formError ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700"
        >
          {state.formError}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-bold text-slate-700">
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
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold text-slate-700">
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
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-xs font-bold text-slate-700">
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

        {/* Company Size */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="companySize" className="text-xs font-bold text-slate-700">
            Operational Team Size
          </label>
          <div className="relative">
            <select
              id="companySize"
              name="companySize"
              defaultValue={state.values.companySize ?? ""}
              className={cn(inputClass(false), "appearance-none pr-9 text-xs")}
            >
              <option value="">Select team size</option>
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

        {/* Industry */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="industry" className="text-xs font-bold text-slate-700">
            Industry / Sector
          </label>
          <div className="relative">
            <select
              id="industry"
              name="industry"
              defaultValue={state.values.industry ?? ""}
              className={cn(inputClass(false), "appearance-none pr-9 text-xs")}
            >
              <option value="">Select industry</option>
              {consultationOptions.industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* Current System */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentSystem" className="text-xs font-bold text-slate-700">
            Current Primary Tooling
          </label>
          <div className="relative">
            <select
              id="currentSystem"
              name="currentSystem"
              defaultValue={state.values.currentSystem ?? ""}
              className={cn(inputClass(false), "appearance-none pr-9 text-xs")}
            >
              <option value="">Select current system</option>
              {consultationOptions.currentSystems.map((sys) => (
                <option key={sys} value={sys}>
                  {sys}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* Primary Challenge */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="primaryChallenge" className="text-xs font-bold text-slate-700">
            Primary Operational Challenge
          </label>
          <div className="relative">
            <select
              id="primaryChallenge"
              name="primaryChallenge"
              defaultValue={state.values.primaryChallenge ?? ""}
              className={cn(inputClass(false), "appearance-none pr-9 text-xs")}
            >
              <option value="">Select primary challenge</option>
              {consultationOptions.primaryChallenges.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredMethod" className="text-xs font-bold text-slate-700">
            Preferred Consultation Format
          </label>
          <div className="relative">
            <select
              id="preferredMethod"
              name="preferredMethod"
              defaultValue={state.values.preferredMethod ?? ""}
              className={cn(inputClass(false), "appearance-none pr-9 text-xs")}
            >
              <option value="">Select preferred method</option>
              {consultationOptions.preferredMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* Operational Message / Requirements */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-bold text-slate-700">
            What are you looking to improve or build? <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            defaultValue={state.values.message ?? ""}
            aria-invalid={!!state.errors.message}
            aria-describedby={state.errors.message ? "message-error" : undefined}
            className={cn(inputClass(!!state.errors.message), "h-auto min-h-[6.5rem] resize-y py-3 text-xs")}
            placeholder="Tell us about your portfolio volume, dialing workflows, team structure, or required system integrations..."
          />
          <FieldError id="message-error" errors={state.errors.message} />
        </div>
      </div>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Footer Submit Bar */}
      <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.72rem] text-slate-500">
          Confidential. We never share operational or customer data.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-7 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Submitting Request…" : "Book a Consultation"}
        </button>
      </div>
    </form>
  );
}
