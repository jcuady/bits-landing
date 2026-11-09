"use client";

import * as React from "react";
import { X, ArrowUpRight } from "lucide-react";

const ULAP_REGISTER_URL = "https://chat.boundlessits.com/register";

/**
 * UlapFloatingCloud — Top-center floating cloud CTA for BITS ULAP.
 *
 * Displays the official ULAP cloud-infinity emblem inside a sculpted cumulus
 * cloud at the top-middle of the viewport alongside an attention-grabbing
 * "Try our messaging app" registration pill that routes visitors directly to
 * https://chat.boundlessits.com/register.
 */
export function UlapFloatingCloud() {
  const [pillCollapsed, setPillCollapsed] = React.useState(false);

  return (
    <div
      data-ulap-floating-cloud-root="true"
      className="pointer-events-none fixed inset-x-0 top-[68px] md:top-[78px] z-40 flex justify-center px-3"
    >
      <div className="pointer-events-auto relative inline-flex items-center">
        <a
          href={ULAP_REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ulap-floating-cloud="true"
          aria-label="Try our messaging app — Register for BITS ULAP"
          className="group relative inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-white/85 bg-white/92 py-1 pl-1.5 pr-3.5 sm:py-1.5 sm:pl-2 sm:pr-4 shadow-[0_12px_34px_-6px_rgba(2,132,199,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white hover:shadow-[0_16px_40px_-6px_rgba(37,99,235,0.36)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          {/* Sculpted Cumulus Cloud SVG carrying the Official ULAP Cloud-Infinity Emblem */}
          <span className="relative flex items-center justify-center">
            <svg
              viewBox="0 0 80 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              data-ulap-cloud-svg="true"
              className="h-[38px] w-[50px] sm:h-[44px] sm:w-[58px] shrink-0 overflow-visible drop-shadow-[0_6px_14px_rgba(2,132,199,0.35)] transition-transform duration-300 ease-out group-hover:scale-105"
            >
              <defs>
                <linearGradient
                  id="bits-ulap-top-cloud-fill"
                  x1="12"
                  y1="5"
                  x2="66"
                  y2="52"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#1A56D6" />
                  <stop offset="58%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <linearGradient
                  id="bits-ulap-top-cloud-rim"
                  x1="40"
                  y1="5"
                  x2="40"
                  y2="50"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
                  <stop offset="55%" stopColor="#E0F2FE" stopOpacity="0.82" />
                  <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.68" />
                </linearGradient>
                <linearGradient
                  id="bits-ulap-top-cloud-sheen"
                  x1="38"
                  y1="6"
                  x2="38"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Outer Cumulus Cloud Silhouette */}
              <path
                d="M19.5 49.5H61.2C70.1 49.5 76.5 42.9 76.5 34.4C76.5 26.2 70.1 19.4 61.5 18.9C58.1 10.6 49.9 5 40.2 5C29.8 5 21.1 11.4 18.2 20.6C10.4 21.6 4.5 27.9 4.5 35.8C4.5 43.6 11.1 49.5 19.5 49.5Z"
                fill="url(#bits-ulap-top-cloud-fill)"
                stroke="url(#bits-ulap-top-cloud-rim)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Inner Top Cumulus Specular Highlight */}
              <path
                d="M20.5 22.2C23.1 13.6 30.9 7.8 40.2 7.8C49.1 7.8 56.6 13.1 59.6 21C60.2 20.9 60.9 20.9 61.5 20.9C67.8 20.9 73 25.4 73.8 31.3C64.2 27.2 52.1 25.2 39.5 25.2C27.4 25.2 16.2 27.1 7.2 30.8C8.3 26.1 13.7 22.6 20.5 22.2Z"
                fill="url(#bits-ulap-top-cloud-sheen)"
              />

              {/* Official ULAP Inner Cloud Speech Tail + Infinity Loop Mark */}
              <g transform="translate(15.5, 13.5) scale(0.095)">
                <g fill="#FFFFFF">
                  <circle cx="190" cy="206" r="68" />
                  <circle cx="282" cy="172" r="88" />
                  <circle cx="356" cy="226" r="62" />
                  <rect x="104" y="204" width="314" height="148" rx="74" />
                  <path d="M150 318l-28 92 100-62z" />
                </g>
                <path
                  d="M262 270c-18-32-52-42-74-28-22 14-22 42 0 56 22 14 56 4 74-28 18-32 52-42 74-28 22 14 22 42 0 56-22 14-56 4-74-28z"
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="26"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Live Status Dot on Cloud Crest */}
              <circle
                cx="62.5"
                cy="16.5"
                r="4.5"
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth="1.75"
              />
            </svg>
          </span>

          {/* Always-Visible Callout Message (unless minimized by user) */}
          {!pillCollapsed ? (
            <span className="flex flex-col text-left pr-4 sm:pr-5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600 leading-tight">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                <span>BITS ULAP · Free Account</span>
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors whitespace-nowrap">
                <span>Try our messaging app</span>
                <span className="hidden min-[380px]:inline text-blue-600 font-bold">
                  — Register
                </span>
                <ArrowUpRight className="size-3.5 text-blue-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>
          ) : (
            <span className="text-[11px] font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 pr-1">
              ULAP
            </span>
          )}
        </a>

        {/* Subtle minimize/expand toggle so visitors can collapse the text pill if desired */}
        {!pillCollapsed && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPillCollapsed(true);
            }}
            aria-label="Minimize BITS ULAP callout message"
            title="Minimize message"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex size-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="size-3" />
          </button>
        )}
      </div>
    </div>
  );
}

