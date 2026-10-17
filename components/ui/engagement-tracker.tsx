"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

/**
 * EngagementTracker — the measurement gate for the homepage rewrite.
 *
 * Answers the three questions the structure work could not:
 *   1. Does anyone reach the bottom?      scroll_depth at 25/50/75/100
 *   2. Which sections convert?            cta_click, tagged per section
 *   3. Does the new hub get seen?          platform_index_view
 *
 * Deliberately passive — it never blocks or re-renders. Scroll depth is
 * reported once per threshold per session, so a reader who jumps back to
 * the top and scrolls again does not double-count.
 *
 * No PII is captured. Section names are static strings defined here.
 */

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

/** Sections we want per-section signal on. Keys are ids already in the DOM. */
const TRACKED_SECTIONS = [
  "trust-strip",
  "platform-index",
  "credibility",
  "the-difference",
  "security",
  "pricing",
  "faq",
] as const;

export function EngagementTracker() {
  const sentDepths = useRef<Set<number>>(new Set());
  const viewedPlatform = useRef(false);

  useEffect(() => {
    const reportDepth = (depth: number) => {
      if (sentDepths.current.has(depth)) return;
      sentDepths.current.add(depth);
      track("scroll_depth", {
        depth: `${depth}%`,
        path: window.location.pathname,
      });
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const t of SCROLL_THRESHOLDS) {
        if (pct >= t) reportDepth(t);
      }
    };

    // Depth 100 only fires if the last scroll lands exactly at the bottom,
    // which is rare. Check on load and on scroll-to-end.
    const reportIfAtEnd = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY >= scrollable - 8) reportDepth(100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", reportIfAtEnd);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", reportIfAtEnd);
    };
  }, []);

  /** Observe which sections enter the viewport. */
  useEffect(() => {
    const targets = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          track("section_view", { section: id });
          if (id === "platform-index" && !viewedPlatform.current) {
            viewedPlatform.current = true;
            track("platform_index_view");
          }
        }
      },
      { threshold: 0.35 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

/**
 * useTrackCta — tag a CTA so its click is attributable to a section.
 * Returns an onClick to spread onto the link.
 */
export function useTrackCta(section: string, label: string) {
  return () => {
    track("cta_click", { section, label });
  };
}