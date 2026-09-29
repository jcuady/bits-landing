"use client";

import * as React from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <p className="mt-3 text-[0.85rem] font-bold text-emerald-400">
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
        className="h-11 flex-1 rounded-full border border-white/15 bg-white/[0.06] px-4 text-base text-white placeholder:text-slate-400 focus:border-sky-400 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-sky-400/25 backdrop-blur-sm transition-all"
      />

      <button
        type="submit"
        className="h-11 shrink-0 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-500 px-5 text-[0.82rem] font-bold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
      >
        Subscribe
      </button>
    </form>
  );
}
