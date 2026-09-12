"use client";

import * as React from "react";
import { useActionState } from "react";
import { ChevronDown, CircleCheck, Send } from "lucide-react";
import { contactInterests } from "@/lib/site";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };

const inputClass = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-ink shadow-[0_1px_2px_rgb(6_22_47/0.04)] transition-[border-color,box-shadow] duration-200 placeholder:text-slateblue/50",
    "focus:border-electric-600 focus:outline-none focus:ring-4 focus:ring-electric-600/15",
    invalid ? "border-red-500/70" : "border-linelight hover:border-navy-700/30"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.8rem] font-medium text-red-600">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-linelight bg-white p-10 text-center shadow-card"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-skywash text-electric-600">
          <CircleCheck className="size-7" aria-hidden />
        </span>
        <h3 className="mt-6 text-[1.4rem] font-bold tracking-[-0.015em] text-ink">
          Message received.
        </h3>
        <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-relaxed text-slateblue">
          Thank you for reaching out. A senior member of our team will review your note and
          get back to you.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-linelight bg-white p-6 shadow-card sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[0.85rem] font-semibold text-ink">
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
          <label htmlFor="email" className="mb-2 block text-[0.85rem] font-semibold text-ink">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values.email ?? ""}
            aria-invalid={!!state.errors.email}
            aria-describedby={state.errors.email ? "email-error" : undefined}
            className={inputClass(!!state.errors.email)}
          />
          <FieldError id="email-error" errors={state.errors.email} />
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-[0.85rem] font-semibold text-ink">
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
          <label htmlFor="interest" className="mb-2 block text-[0.85rem] font-semibold text-ink">
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
              className={cn(inputClass(!!state.errors.interest), "appearance-none pr-11")}
            >
              <option value="" disabled>
                Select a solution area
              </option>
              {contactInterests.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slateblue"
              aria-hidden
            />
          </div>
          <FieldError id="interest-error" errors={state.errors.interest} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-[0.85rem] font-semibold text-ink">
            Message <span className="font-normal text-slateblue">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={state.values.message ?? ""}
            aria-invalid={!!state.errors.message}
            aria-describedby={state.errors.message ? "message-error" : undefined}
            className={cn(inputClass(!!state.errors.message), "h-auto min-h-[7.5rem] resize-y py-3")}
            placeholder="Where is your operation slowing down?"
          />
          <FieldError id="message-error" errors={state.errors.message} />
        </div>
      </div>

      {/* Honeypot: hidden from humans, irresistible to bots */}
      <div className="absolute left-[-9999px] top-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.78rem] leading-relaxed text-slateblue">
          Your message goes directly to our senior team. No newsletters, no spam.
        </p>
        <Button type="submit" size="lg" disabled={pending} className="shrink-0">
          {pending ? "Sending…" : "Start a Conversation"}
          {!pending && <Send aria-hidden />}
        </Button>
      </div>
    </form>
  );
}
