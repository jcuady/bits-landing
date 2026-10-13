"use client";

/**
 * Shared "a route-level error boundary is showing" flag.
 *
 * The cookie banner originally learned about this via a `window` CustomEvent
 * dispatched from `app/error.tsx`'s effect. That lost a race: on an SSR error
 * the boundary's effect can run before `CookieConsent` has attached its
 * listener, so the event is dropped and the banner stays up — covering the
 * error page's "Try again" button at short viewport heights.
 *
 * A module-level flag plus a subscription is order-independent: a subscriber
 * that arrives late reads the current value instead of missing the update.
 */

let pageErrored = false;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) {
    try {
      fn();
    } catch {
      // A broken subscriber must not break the others.
    }
  }
}

export function markPageErrored() {
  if (pageErrored) return;
  pageErrored = true;
  emit();
}

export function markPageRecovered() {
  if (!pageErrored) return;
  pageErrored = false;
  emit();
}

export function isPageErrored() {
  return pageErrored;
}

export function subscribeToPageError(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}