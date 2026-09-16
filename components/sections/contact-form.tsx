"use client";

import * as React from "react";
import { useActionState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { contactInterests } from "@/lib/site";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialContactState: ContactState = { ok: false, errors: {}, values: {} };

const fieldOrder = ["name", "email", "company", "interest", "message"] as const;

const inputClass = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-base text-ink shadow-[0_1px_2px_rgb(6_22_47/0.04)] transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] placeholder:text-slateblue/50",
    "focus-visible:border-electric-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-600/15",
    invalid
      ? "border-red-500/70"
      : "border-linelight [@media(hover:hover)_and_(pointer:fine)]:hover:border-navy-700/30"
  );

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.8rem] font-medium text-red-600">
      {errors[0]}
    </p>
  );
}

function Bezel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.75rem] bg-white/70 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-navy-700/10 sm:rounded-[2rem] sm:p-2">
      <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
        {children}
      </div>
    </div>
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
      <Bezel>
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[28rem] flex-col justify-center px-6 py-10 sm:px-8"
        >
          <p className="text-[0.82rem] font-semibold text-ink">Consultation request</p>
          <h3 className="mt-3 text-[1.35rem] font-bold tracking-[-0.015em] text-ink">
            Message received.
          </h3>
          <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-relaxed text-pretty text-slateblue">
            A senior teammate will read your note and reply with what to build first.
          </p>
        </div>
      </Bezel>
    );
  }

  return (
    <Bezel>
      <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="text-[0.82rem] font-semibold text-ink">Consultation request</p>
          <p className="truncate text-[0.72rem] text-slateblue">BITS · senior team</p>
        </div>
        <span className="hidden rounded-full border border-navy-700/10 bg-cloud px-2.5 py-1 text-[0.68rem] font-semibold text-slateblue sm:inline">
          Direct
        </span>
      </div>

      <form
        action={formAction}
        noValidate
        aria-busy={pending}
        className="relative px-4 py-5 sm:px-6 sm:py-6"
        key={`${state.values.name ?? ""}-${state.values.email ?? ""}-${state.values.interest ?? ""}-${Object.keys(state.errors).join(",")}`}
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
                  Select a solution area…
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
              placeholder="Where is the floor slowing down…"
            />
            <FieldError id="message-error" errors={state.errors.message} />
          </div>
        </div>

        <div className="absolute left-[-9999px] top-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[36ch] text-[0.78rem] leading-relaxed text-slateblue">
            Your message goes to the senior team. No newsletters, no spam.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="group h-12 min-h-12 w-full shrink-0 rounded-full pr-2 pl-6 sm:w-auto"
          >
            <span className="inline-grid justify-items-center">
              <span className="invisible col-start-1 row-start-1" aria-hidden>
                Book a consultation
              </span>
              <span className="col-start-1 row-start-1">
                {pending ? "Sending…" : "Book a consultation"}
              </span>
            </span>
            <span
              className="flex size-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
              aria-hidden
            >
              <ArrowRight className="size-4" />
            </span>
          </Button>
        </div>
      </form>
    </Bezel>
  );
}
