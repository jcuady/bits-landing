"use client";

import * as React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { markPageErrored, markPageRecovered } from "@/lib/page-error-state";

/**
 * Route-level error boundary.
 *
 * Without this, any uncaught render error inside a segment surfaces as a blank
 * page in production. This gives visitors a recoverable state and keeps the
 * error details in the console for developers.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Keep the detail in the console for debugging; never render it to the user
    // (it can contain internal paths or query values).
    console.error("[app-error]", error);

    // The cookie banner is a fixed bottom-left overlay; on a short viewport it
    // covers this page's recovery buttons. Ask it to stand down, and re-arm it
    // if `reset()` brings the app back to a working page. Uses the shared flag
    // rather than a window event — the boundary can mount before the banner has
    // subscribed, which would silently drop the notification.
    markPageErrored();
    return () => {
      markPageRecovered();
    };
  }, [error]);

  return (
    <main
      id="content"
      className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-[#0a2046] px-6 py-16 text-center text-slate-100"
    >
      <span className="rounded-2xl bg-white/10 p-4">
        <AlertTriangle className="size-7 text-amber-300" aria-hidden />
      </span>

      <div className="max-w-md">
        <h1 className="text-xl font-bold text-white">Something went wrong</h1>
        <p className="mt-2 text-sm leading-relaxed text-sky-200/80">
          This section failed to load. You can try again, or head back to the main site.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-sky-200/50">
            Reference: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <RotateCcw className="size-4" aria-hidden />
          Try again
        </button>
        <a
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sky-400/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          <Home className="size-4" aria-hidden />
          Back to home
        </a>
      </div>
    </main>
  );
}