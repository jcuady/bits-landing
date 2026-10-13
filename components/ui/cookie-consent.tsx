"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Cookie, Settings2, Check, X, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { isPageErrored, subscribeToPageError } from "@/lib/page-error-state";

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "bits_cookie_consent_v1";

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("bits_open_cookie_preferences"));
  }
}

export function CookieConsent() {
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  /**
   * Suppressed while a route-level error boundary is showing. The banner is a
   * fixed overlay at `bottom-4 left-4`; on a short viewport it covers the error
   * page's "Try again" / "Back to home" actions entirely, blocking recovery until
   * the visitor deals with consent. It is also simply wrong to ask for consent
   * on a page that failed to render.
   */
  const [suppressed, setSuppressed] = React.useState(() => isPageErrored());
  const [preferences, setPreferences] = React.useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
    timestamp: "",
  });

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setPreferences(parsed);
      } else {
        // No consent given yet; show banner after a brief initial pause for smooth page entrance
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled or corrupted
      setIsOpen(true);
    }
  }, []);

  React.useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const hideForError = () => setSuppressed(true);
    const restoreAfterRecovery = () => setSuppressed(false);
    window.addEventListener("bits_open_cookie_preferences", handleOpenModal);
    // Late subscribers must still see the current value, so sync once on mount
    // in addition to listening for changes.
    const unsubscribe = subscribeToPageError(() => {
      setSuppressed(isPageErrored());
    });
    setSuppressed(isPageErrored());
    return () => {
      window.removeEventListener("bits_open_cookie_preferences", handleOpenModal);
      unsubscribe();
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      const payload = {
        ...prefs,
        necessary: true,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setPreferences(payload);
      setIsOpen(false);
      setIsModalOpen(false);

      // Dispatch global event for analytics trackers / telemetry modules
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("bits_cookie_consent_update", { detail: payload }));
      }
    } catch {
      setIsOpen(false);
      setIsModalOpen(false);
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  // The preferences drawer is an aria-modal dialog: move focus into it on open,
  // cycle Tab inside it, and restore focus to the trigger on close. Without this
  // a keyboard user can tab straight through into the page behind the overlay.
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isModalOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const node = dialogRef.current;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(node?.querySelectorAll<HTMLElement>(selector) ?? []).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    // Prefer the close button, which is the conventional first stop.
    (node?.querySelector<HTMLElement>('[data-autofocus="true"]') ?? focusables()[0])?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsModalOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !node?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [isModalOpen]);

  // Both guards sit AFTER every hook. An early return above the focus-trap
  // effect would make React see a different hook count between renders.
  if (!mounted || suppressed) return null;

  return (
    <>
      {/* ── Persistent Floating Re-open Badge (Bottom-Left) ── */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[#082252]/85 px-3 py-1.5 text-[11px] font-semibold text-white/90 shadow-lg shadow-blue-950/25 backdrop-blur-xl hover:bg-white hover:text-blue-950 hover:border-white transition-all duration-200 cursor-pointer group"
          aria-label="Manage Cookie & Privacy Preferences"
          title="Cookie & Privacy Settings"
        >
          <Cookie className="size-3.5 text-sky-400 group-hover:text-blue-900 transition-colors" />
          <span className="hidden sm:inline">Cookie Preferences</span>
        </motion.button>
      )}

      {/* ── Initial Bottom Consent Banner ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 rounded-2xl border border-sky-400/35 bg-[#071f49]/95 p-5 text-white shadow-2xl shadow-blue-950/40 backdrop-blur-2xl ring-1 ring-white/10"
            role="region"
            aria-label="Cookie consent banner"
            aria-live="polite"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 border border-sky-400/30 text-sky-300">
                <Cookie className="size-5" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  {/*
                    Not a heading. This banner is a `role="region"` landmark that
                    floats over the page; an <h3> here would enter the document
                    outline as the next heading after the page <h1> on any page
                    that has no intervening <h2>. The region already carries
                    aria-label="Cookie consent banner".
                  */}
                  <p className="text-sm font-bold text-white tracking-tight">Sovereign Privacy &amp; Cookies</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    <ShieldCheck className="size-3" />
                    DPA 2012 Aligned
                  </span>
                </div>
                <p className="text-xs text-sky-100/85 leading-relaxed">
                  Boundless IT Solutions uses essential cookies for secure session authentication, and optional telemetry to improve platform velocity. We do not sell your personal data or execute third-party ad retargeting.
                </p>
                <div className="pt-0.5">
                  <Link
                    href="/cookies"
                    className="inline-flex min-h-11 items-center gap-1 py-2 text-[11px] font-medium text-sky-300 hover:text-white underline decoration-sky-400/40 transition-colors"
                  >
                    Read our sovereign Cookie Policy
                    <ChevronRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center min-h-11 rounded-xl bg-white px-4 py-2 text-xs font-bold text-blue-950 shadow-sm hover:bg-sky-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center min-h-11 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-xl border border-sky-400/30 bg-blue-600/20 px-3 py-2 text-xs font-semibold text-sky-200 hover:bg-blue-600/35 hover:text-white transition-all cursor-pointer"
                title="Fine-tune cookie categories"
              >
                <Settings2 className="size-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Preferences</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cookie Preferences Modal Drawer ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-blue-950/70 backdrop-blur-md"
            />

            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl border border-sky-400/30 bg-gradient-to-b from-[#0b2961] to-[#071d44] p-6 text-white shadow-2xl shadow-blue-950/60 backdrop-blur-2xl ring-1 ring-white/15"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-preferences-title"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-500/20 border border-sky-400/35 text-sky-300">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h2 id="cookie-preferences-title" className="text-base font-bold text-white tracking-tight">
                      Cookie &amp; Privacy Preferences
                    </h2>
                    <p className="text-xs text-sky-200">
                      Manage how Boundless IT Solutions uses cookies on your device
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  data-autofocus="true"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1.5 text-white/70 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close preferences"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Categories */}
              <div className="mt-5 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
                {/* 1. Necessary */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="size-4 text-emerald-300" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                        Strictly Necessary Cookies
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                      Always Active
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                    Essential for secure authentication (Supabase session tokens), load-balancer routing, and CSRF protection. Cannot be deactivated.
                  </p>
                </div>

                {/*
                  The two optional toggles below were REPLACED on 8 Oct 2026.

                  Both were dead controls. "Performance & Telemetry" claimed to
                  measure page load times, edge latency and dialer websocket
                  stability — but there is no analytics script, telemetry beacon
                  or third-party tracker anywhere in this application: no GA,
                  PostHog, Plausible, Clarity, Hotjar, trackEvent or sendBeacon.
                  "Attribution & Preferences" claimed to record a referral
                  source and hardware-calculator preferences — but no UTM or
                  referrer capture exists, and no calculator writes any such key.

                  Offering an opt-in switch for collection that does not happen
                  is worse than offering none: it implies a live data flow and
                  invites a user to rely on a control that does nothing.

                  The `analytics` / `marketing` keys REMAIN in the stored
                  preference shape so existing consent records stay valid and
                  nobody is re-prompted; they are simply no longer editable here.
                */}
                {/* 2. Performance & Telemetry — nothing is collected */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 id="cookie-cat-analytics" className="text-xs font-bold uppercase tracking-wider text-white">
                        Performance &amp; Telemetry
                      </h3>
                      <p className="text-[11px] text-sky-200">Nothing is collected</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-200">
                      Not active
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                    There is no analytics script, telemetry beacon or third-party tracker on this
                    site, and no dialer or latency measurement of any kind. If that ever changes it
                    will be disclosed here — with provider and retention — before it ships.
                  </p>
                </div>

                {/* 3. Attribution & Preferences — nothing is tracked */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 id="cookie-cat-marketing" className="text-xs font-bold uppercase tracking-wider text-white">
                        Attribution &amp; Preferences
                      </h3>
                      <p className="text-[11px] text-sky-200">No cross-site tracking</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-200">
                      Not tracked
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                    We do not record where you came from, and we set no marketing cookies. Your demo
                    configuration and workspace edits are stored locally in your own browser and are
                    never uploaded.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
                <Link
                  href="/cookies"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs text-sky-300 hover:text-white underline decoration-sky-400/40 transition-colors"
                >
                  View full Cookie Policy
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="min-h-11 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="inline-flex items-center gap-1.5 min-h-11 rounded-xl bg-white px-4 py-2 text-xs font-bold text-blue-950 shadow-md hover:bg-sky-50 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Check className="size-3.5 text-blue-900" />
                    Save Choices
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
