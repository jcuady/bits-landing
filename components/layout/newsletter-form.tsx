"use client";

import * as React from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <p className="mt-3 text-[0.85rem] font-bold text-emerald-600">
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form
      className="mt-3 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        placeholder="Enter your work email"
        aria-label="Email for newsletter"
        className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
      />
      <button
        type="submit"
        className="h-11 shrink-0 cursor-pointer rounded-xl bg-blue-600 px-4 text-[0.82rem] font-bold text-white transition-colors duration-200 hover:bg-blue-700"
      >
        Subscribe
      </button>
    </form>
  );
}
