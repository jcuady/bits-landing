"use client";

import * as React from "react";
import { useActionState } from "react";
import { contactInterests, site } from "@/lib/site";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };
const fieldOrder = ["name", "email", "company", "interest", "message"] as const;

const inputClass = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-ink transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-mist",
    "focus-visible:border-electric-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-600/20",
    invalid ? "border-red-400" : "border-linelight hover:border-mist"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.82rem] font-medium text-red-600">
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
        className="flex min-h-[28rem] flex-col justify-center rounded-2xl border border-linelight bg-white px-7 py-12 sm:px-10"
      >
        <p className="text-overline text-electric-600">Inquiry sent</p>
        <h3 className="mt-3 text-[1.65rem] font-semibold tracking-[-0.03em] text-ink">
          We have your note.
        </h3>
        <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-slateblue">
          {state.values.email
            ? `We will reply at ${state.values.email}.`
            : "We will reply at the email you sent."}{" "}
          Usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-busy={pending}
      className="rounded-2xl border border-linelight bg-white p-6 sm:p-8"
      key={`${state.values.name ?? ""}-${state.values.email ?? ""}-${Object.keys(state.errors).join(",")}-${state.formError ?? ""}`}
    >
      <div className="border-b border-linelight pb-5">
        <p className="text-[1.05rem] font-semibold text-ink">Send an inquiry</p>
        <p className="mt-1 text-[0.82rem] text-slateblue">
          Required fields are marked. We reply from {site.inquiryEmail}.
        </p>
      </div>

      {state.formError ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.88rem] font-medium text-red-700"
        >
          {state.formError}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[0.85rem] font-medium text-ink">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[0.85rem] font-medium text-ink">
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
            aria-describedby={state.errors.email ? "email-error" : "email-hint"}
            className={inputClass(!!state.errors.email)}
          />
          <p id="email-hint" className="text-[0.75rem] text-slateblue">
            We use this only to reply to your inquiry.
          </p>
          <FieldError id="email-error" errors={state.errors.email} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-[0.85rem] font-medium text-ink">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="interest" className="text-[0.85rem] font-medium text-ink">
            Topic
          </label>
          <div className="relative">
            <select
              id="interest"
              name="interest"
              required
              defaultValue={state.values.interest ?? ""}
              aria-invalid={!!state.errors.interest}
              aria-describedby={state.errors.interest ? "interest-error" : undefined}
              className={cn(inputClass(!!state.errors.interest), "appearance-none pr-11")}
            >
              <option value="" disabled>
                Choose a topic
              </option>
              {contactInterests.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[0.7rem] text-slateblue" aria-hidden>
              ▾
            </span>
          </div>
          <FieldError id="interest-error" errors={state.errors.interest} />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-[0.85rem] font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={state.values.message ?? ""}
            aria-invalid={!!state.errors.message}
            aria-describedby={state.errors.message ? "message-error" : "message-hint"}
            className={cn(inputClass(!!state.errors.message), "h-auto min-h-[8.5rem] resize-y py-3")}
            placeholder="Team size, campaigns, and what you need from BITS"
          />
          <p id="message-hint" className="text-[0.75rem] text-slateblue">
            A few sentences is enough. 10–2000 characters.
          </p>
          <FieldError id="message-error" errors={state.errors.message} />
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-linelight pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[36ch] text-[0.8rem] leading-relaxed text-slateblue">
          No free trials or unpaid pilots. We reply to serious operational inquiries.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 min-h-11 w-full items-center justify-center rounded-full bg-electric-600 px-7 text-[0.92rem] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] disabled:opacity-70 sm:w-auto [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
        >
          {pending ? "Sending inquiry…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
