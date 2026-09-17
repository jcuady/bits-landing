"use client";

import * as React from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <p className="mt-3 text-[0.85rem] font-medium text-signal-300">
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
        placeholder="Enter your email address"
        aria-label="Email for newsletter"
        className="h-10 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-[0.85rem] text-white placeholder:text-white/30 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
      />
      <button
        type="submit"
        className="h-10 shrink-0 cursor-pointer rounded-lg bg-electric-600 px-4 text-[0.82rem] font-semibold text-white transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
      >
        Subscribe
      </button>
    </form>
  );
}
