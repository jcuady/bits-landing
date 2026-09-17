"use client";

import * as React from "react";
import { useActionState } from "react";
import { contactInterests } from "@/lib/site";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };

const fieldOrder = ["name", "email", "company", "interest", "message"] as const;

const inputClass = (invalid: boolean) =>
  cn(
    "h-14 w-full rounded-2xl border bg-white px-5 text-[0.95rem] font-medium text-slate-900 shadow-sm transition-all duration-300 placeholder:text-slate-400",
    "focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20",
    invalid
      ? "border-red-300 bg-red-50/30"
      : "border-slate-200 hover:border-slate-300"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-2 text-[0.85rem] font-semibold text-red-500">
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
        className="flex min-h-[32rem] flex-col justify-center px-8 py-12 text-center sm:px-12"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <span className="text-2xl font-bold">✓</span>
        </div>
        <p className="text-[0.85rem] font-bold uppercase tracking-widest text-emerald-600">Request Sent</p>
        <h3 className="mt-4 text-[1.75rem] font-bold tracking-tight text-slate-900">
          Message received.
        </h3>
        <p className="mx-auto mt-4 max-w-[36ch] text-[1rem] leading-relaxed text-slate-500">
          A senior teammate will read your note and reply with what to build first.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-5">
        <div>
          <p className="text-[0.9rem] font-bold text-slate-900">Consultation request</p>
          <p className="text-[0.75rem] font-medium text-slate-500">BITS · senior team</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
          Direct
        </span>
      </div>

      <form
        action={formAction}
        noValidate
        aria-busy={pending}
        className="px-6 py-8 sm:px-8 sm:py-10"
        key={`${state.values.name ?? ""}-${state.values.email ?? ""}-${state.values.interest ?? ""}-${Object.keys(state.errors).join(",")}`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-[0.85rem] font-bold text-slate-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              defaultValue={state.values.name ?? ""}
              aria-invalid={!!state.errors.name}
              aria-describedby={state.errors.name ? "name-error" : undefined}
              className={inputClass(!!state.errors.name)}
            />
            <FieldError id="name-error" errors={state.errors.name} />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-[0.85rem] font-bold text-slate-700">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              defaultValue={state.values.email ?? ""}
              aria-invalid={!!state.errors.email}
              aria-describedby={state.errors.email ? "email-error" : undefined}
              className={inputClass(!!state.errors.email)}
            />
            <FieldError id="email-error" errors={state.errors.email} />
          </div>

          <div>
            <label htmlFor="company" className="mb-2 block text-[0.85rem] font-bold text-slate-700">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              defaultValue={state.values.company ?? ""}
              aria-invalid={!!state.errors.company}
              aria-describedby={state.errors.company ? "company-error" : undefined}
              className={inputClass(!!state.errors.company)}
            />
            <FieldError id="company-error" errors={state.errors.company} />
          </div>

          <div>
            <label htmlFor="interest" className="mb-2 block text-[0.85rem] font-bold text-slate-700">
              What can we help you with?
            </label>
            <div className="relative">
              <select
                id="interest"
                name="interest"
                required
                defaultValue={state.values.interest ?? ""}
                aria-invalid={!!state.errors.interest}
                aria-describedby={state.errors.interest ? "interest-error" : undefined}
                className={cn(inputClass(!!state.errors.interest), "appearance-none pr-12")}
              >
                <option value="" disabled>
                  Select a solution area…
                </option>
                {contactInterests.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[0.8rem] font-bold text-slate-400">
                ▼
              </span>
            </div>
            <FieldError id="interest-error" errors={state.errors.interest} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 flex items-baseline gap-2">
              <span className="text-[0.85rem] font-bold text-slate-700">Message</span>
              <span className="text-[0.8rem] font-medium text-slate-400">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={state.values.message ?? ""}
              aria-invalid={!!state.errors.message}
              aria-describedby={state.errors.message ? "message-error" : undefined}
              className={cn(inputClass(!!state.errors.message), "h-auto min-h-[8rem] resize-y py-4")}
              placeholder="Where is the floor slowing down…"
            />
            <FieldError id="message-error" errors={state.errors.message} />
          </div>
        </div>

        <div className="absolute left-[-9999px] top-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-8">
          <div>
            <p className="max-w-[36ch] text-[0.85rem] leading-relaxed text-slate-500">
              Direct connection with our solutions architects. No newsletters, zero sales spam.
            </p>
            <p className="mt-1 text-[0.72rem] font-medium text-slate-400">
              🔒 Bank-Grade 256-Bit SSL · Strict Non-Disclosure (NDA)
            </p>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 disabled:opacity-70 active:scale-[0.98] sm:w-auto"
          >
            <span className="relative">
              {pending ? "Scheduling Demo…" : "Request Live Walkthrough"}
            </span>
            {!pending && (
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
