"use client";

import * as React from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <p className="mt-3 text-[0.85rem] font-bold text-emerald-700">
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form
      id="newsletter-subscription-form"
      name="newsletter-subscription"
      aria-label="Newsletter Subscription Form"
      className="mt-3 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        id="newsletter-email"
        name="newsletter_email"
        type="email"
        required
        placeholder="Enter work email"
        aria-label="Work email for newsletter"
        className="h-11 flex-1 rounded-full border border-slate-200/90 bg-white/95 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
      />

      <button
        type="submit"
        className="h-11 min-h-[44px] shrink-0 cursor-pointer rounded-full bg-slate-950 hover:bg-slate-800 px-5 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      >
        Subscribe
      </button>
    </form>
  );
}
