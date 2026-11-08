"use client";

import * as React from "react";

const TRUNKLINE_HREF = "tel:+639568457404";
const TRUNKLINE_DISPLAY = "+63 956 845 7404";
const TRUNKLINE_SECONDARY = "+63 955 019 9324";

const AIRA_CLOUD_BUTTON_HTML = `
  <span class="aira-cloud-pill" aria-hidden="true">
    <span class="aira-cloud-pill-kicker">
      <span class="aira-cloud-pill-dot"></span>
      BITS AiRA
    </span>
    <span class="aira-cloud-pill-title">AI Call Assistant</span>
  </span>
  <svg
    viewBox="0 0 80 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    data-aira-cloud-svg="true"
    class="aira-cloud-svg"
  >
    <defs>
      <linearGradient id="bits-aira-cloud-fill" x1="12" y1="5" x2="66" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="50%" stop-color="#2377F3" />
        <stop offset="100%" stop-color="#1D4ED8" />
      </linearGradient>
      <linearGradient id="bits-aira-cloud-rim" x1="40" y1="5" x2="40" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.96" />
        <stop offset="55%" stop-color="#E0F2FE" stop-opacity="0.78" />
        <stop offset="100%" stop-color="#7DD3FC" stop-opacity="0.62" />
      </linearGradient>
      <linearGradient id="bits-aira-cloud-sheen" x1="38" y1="6" x2="38" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.44" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Outer Cumulus Cloud Silhouette -->
    <path
      d="M19.5 49.5H61.2C70.1 49.5 76.5 42.9 76.5 34.4C76.5 26.2 70.1 19.4 61.5 18.9C58.1 10.6 49.9 5 40.2 5C29.8 5 21.1 11.4 18.2 20.6C10.4 21.6 4.5 27.9 4.5 35.8C4.5 43.6 11.1 49.5 19.5 49.5Z"
      fill="url(#bits-aira-cloud-fill)"
      stroke="url(#bits-aira-cloud-rim)"
      stroke-width="2"
      stroke-linejoin="round"
    />

    <!-- Inner Top Cumulus Specular Highlight -->
    <path
      d="M20.5 22.2C23.1 13.6 30.9 7.8 40.2 7.8C49.1 7.8 56.6 13.1 59.6 21C60.2 20.9 60.9 20.9 61.5 20.9C67.8 20.9 73 25.4 73.8 31.3C64.2 27.2 52.1 25.2 39.5 25.2C27.4 25.2 16.2 27.1 7.2 30.8C8.3 26.1 13.7 22.6 20.5 22.2Z"
      fill="url(#bits-aira-cloud-sheen)"
    />

    <!-- Crisp White Chat Bubble + AI Sparkle Emblem Inside the Cloud -->
    <g transform="translate(24.5, 17)">
      <!-- Rounded Speech Bubble with Tail -->
      <path
        d="M4 5.5C4 3.57 5.57 2 7.5 2H20.5C22.43 2 24 3.57 24 5.5V14.5C24 16.43 22.43 18 20.5 18H11.8L7.2 21.6C6.54 22.12 5.6 21.65 5.6 20.8V18C4.67 17.52 4 16.14 4 14.5V5.5Z"
        fill="#FFFFFF"
      />
      <!-- Three Conversational Dots Inside Bubble -->
      <circle cx="10.2" cy="10" r="1.45" fill="#1D4ED8" />
      <circle cx="14" cy="10" r="1.45" fill="#2377F3" />
      <circle cx="17.8" cy="10" r="1.45" fill="#0284C7" />
      <!-- AI Four-Point Sparkle Star -->
      <path
        d="M27.2 0.8L28.1 3.3L30.6 4.2L28.1 5.1L27.2 7.6L26.3 5.1L23.8 4.2L26.3 3.3L27.2 0.8Z"
        fill="#FFFFFF"
      />
    </g>

    <!-- Live AI Status Dot on the Cloud Crest -->
    <circle cx="62.5" cy="16.5" r="4.5" fill="#10B981" stroke="#FFFFFF" stroke-width="1.75" />
  </svg>
`;

const AIRA_HEADER_CLOUD_ICON_HTML = `
  <svg viewBox="0 0 36 26" width="28" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;">
    <path
      d="M8.8 23H27.6C31.7 23 34.5 20 34.5 16.1C34.5 12.4 31.6 9.3 27.7 9.1C26.2 5.3 22.5 2.8 18.1 2.8C13.4 2.8 9.5 5.7 8.2 9.9C4.7 10.3 2 13.2 2 16.8C2 20.3 5 23 8.8 23Z"
      fill="rgba(255,255,255,0.22)"
      stroke="#FFFFFF"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <circle cx="14" cy="14" r="1.3" fill="#FFFFFF" />
    <circle cx="18" cy="14" r="1.3" fill="#FFFFFF" />
    <circle cx="22" cy="14" r="1.3" fill="#FFFFFF" />
  </svg>
`;

/**
 * TrunklineCloud — Floating cloud-shaped BITS Trunkline button & AiRA Cloud logo skin.
 *
 * Replaces the raw green circular call button injected by widget.js and transforms
 * the adjacent AiRA chat button inside its open Shadow DOM into matching sculpted
 * cumulus-cloud silhouettes using the BITS daytime azure sky palette and frosted
 * glass double-bezel geometry.
 */
export function TrunklineCloud() {
  React.useEffect(() => {
    const removeRawWidgetCallButtons = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        `a[href="${TRUNKLINE_HREF}"]:not([data-trunkline-cloud])`,
      );
      links.forEach((el) => {
        if (el.parentElement === document.body) {
          el.remove();
        }
      });
    };

    const harmonizeAiraShadowRoot = () => {
      const children = Array.from(document.body.children);
      for (const el of children) {
        const root = el.shadowRoot;
        if (!root) continue;
        const fab = root.querySelector<HTMLButtonElement>(".fab");
        if (!fab) continue;

        if (el instanceof HTMLElement) {
          el.style.bottom = "15px";
          el.style.right = "16px";
          el.style.display = "flex";
          el.style.alignItems = "center";
        }

        if (!root.querySelector("style[data-bits-cloud-theme]")) {
          const style = document.createElement("style");
          style.setAttribute("data-bits-cloud-theme", "true");
          style.textContent = `
            .fab {
              width: 76px !important;
              height: 58px !important;
              border-radius: 0 !important;
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              overflow: visible !important;
              position: relative !important;
              cursor: pointer !important;
              outline: none !important;
            }
            .fab:focus-visible {
              outline: 2px solid #2563eb !important;
              outline-offset: 4px !important;
              border-radius: 12px !important;
            }
            .aira-cloud-svg {
              width: 76px;
              height: 58px;
              overflow: visible;
              filter: drop-shadow(0 10px 22px rgba(2, 132, 199, 0.38));
              transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .fab:hover .aira-cloud-svg {
              transform: translateY(-4px) scale(1.05);
            }
            .fab:active .aira-cloud-svg {
              transform: scale(0.95);
            }
            .aira-cloud-pill {
              pointer-events: none;
              position: absolute;
              right: 0;
              bottom: 64px;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              border-radius: 16px;
              border: 1px solid rgba(255, 255, 255, 0.82);
              background: rgba(255, 255, 255, 0.92);
              padding: 8px 14px;
              text-align: right;
              opacity: 0;
              transform: translateY(6px);
              box-shadow: 0 8px 32px -8px rgba(6, 22, 47, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.4);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              transition: opacity 0.2s ease, transform 0.2s ease;
              white-space: nowrap;
            }
            .fab:hover .aira-cloud-pill,
            .fab:focus-visible .aira-cloud-pill {
              opacity: 1;
              transform: translateY(0);
            }
            .aira-cloud-pill-kicker {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
              font-size: 9.9px;
              font-weight: 700;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: #2563eb;
              line-height: 1.2;
            }
            .aira-cloud-pill-dot {
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              background: #10b981;
            }
            .aira-cloud-pill-title {
              margin-top: 2px;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: -0.01em;
              color: #0f172a;
              line-height: 1.25;
            }
            .panel {
              bottom: 70px !important;
              border-radius: 22px !important;
              border: 1px solid rgba(255, 255, 255, 0.7) !important;
              box-shadow: 0 24px 60px -12px rgba(6, 22, 47, 0.32) !important;
            }
            .head {
              background: linear-gradient(135deg, #38bdf8 0%, #2377f3 52%, #1d4ed8 100%) !important;
            }
            .head-brand {
              display: flex;
              align-items: center;
              gap: 10px;
            }
          `;
          root.appendChild(style);
        }

        if (!fab.querySelector('[data-aira-cloud-svg="true"]')) {
          fab.innerHTML = AIRA_CLOUD_BUTTON_HTML;
        }

        const headTitleWrap = root.querySelector(".head > div");
        if (headTitleWrap && !headTitleWrap.classList.contains("head-brand")) {
          headTitleWrap.classList.add("head-brand");
          const textWrap = document.createElement("div");
          while (headTitleWrap.firstChild) {
            textWrap.appendChild(headTitleWrap.firstChild);
          }
          headTitleWrap.insertAdjacentHTML("afterbegin", AIRA_HEADER_CLOUD_ICON_HTML);
          headTitleWrap.appendChild(textWrap);
        }
      }
    };

    removeRawWidgetCallButtons();
    harmonizeAiraShadowRoot();

    const observer = new MutationObserver(() => {
      removeRawWidgetCallButtons();
      harmonizeAiraShadowRoot();
    });

    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={TRUNKLINE_HREF}
      data-trunkline-cloud="true"
      aria-label={`Call BITS Trunkline ${TRUNKLINE_DISPLAY}`}
      title={`Call BITS Trunkline ${TRUNKLINE_DISPLAY} · 2nd line ${TRUNKLINE_SECONDARY}`}
      className="group fixed right-[98px] bottom-[15px] z-[2147483000] inline-flex h-[58px] w-[76px] items-center justify-center select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      {/* Hover / Focus Frosted Glass Trunkline Pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-[64px] flex translate-y-1.5 flex-col items-end rounded-2xl border border-white/80 bg-white/92 px-3.5 py-2 text-right opacity-0 shadow-glass-card backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <span className="flex items-center gap-1.5 font-mono text-[0.62rem] font-bold tracking-[0.16em] whitespace-nowrap text-blue-600 uppercase">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          BITS Trunkline
        </span>
        <span className="mt-0.5 text-xs font-extrabold tracking-tight whitespace-nowrap text-slate-900">
          {TRUNKLINE_DISPLAY}
        </span>
      </span>

      {/* Cloud-Shaped Trunkline Logo SVG */}
      <svg
        viewBox="0 0 80 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        data-trunkline-cloud-svg="true"
        className="h-[58px] w-[76px] overflow-visible drop-shadow-[0_10px_22px_rgba(2,132,199,0.38)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.05] group-active:scale-95"
      >
        <defs>
          {/* Daytime Azure Sky -> Electric Royal Blue Cloud Fill */}
          <linearGradient id="bits-trunkline-cloud-fill" x1="14" y1="6" x2="64" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="48%" stopColor="#2377F3" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Double-Bezel Glass Rim Gradient */}
          <linearGradient id="bits-trunkline-cloud-rim" x1="40" y1="5" x2="40" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#E0F2FE" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.6" />
          </linearGradient>

          {/* Upper Cumulus Specular Sheen */}
          <linearGradient id="bits-trunkline-cloud-sheen" x1="38" y1="6" x2="38" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Soft Glass Halo Cloud Silhouette */}
        <path
          d="M19.5 49.5H61.2C70.1 49.5 76.5 42.9 76.5 34.4C76.5 26.2 70.1 19.4 61.5 18.9C58.1 10.6 49.9 5 40.2 5C29.8 5 21.1 11.4 18.2 20.6C10.4 21.6 4.5 27.9 4.5 35.8C4.5 43.6 11.1 49.5 19.5 49.5Z"
          fill="url(#bits-trunkline-cloud-fill)"
          stroke="url(#bits-trunkline-cloud-rim)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner Top Cumulus Specular Highlight */}
        <path
          d="M20.5 22.2C23.1 13.6 30.9 7.8 40.2 7.8C49.1 7.8 56.6 13.1 59.6 21C60.2 20.9 60.9 20.9 61.5 20.9C67.8 20.9 73 25.4 73.8 31.3C64.2 27.2 52.1 25.2 39.5 25.2C27.4 25.2 16.2 27.1 7.2 30.8C8.3 26.1 13.7 22.6 20.5 22.2Z"
          fill="url(#bits-trunkline-cloud-sheen)"
        />

        {/* Crisp White Phone Receiver + Acoustic Signal Waves Inside the Cloud */}
        <g transform="translate(26.5, 17.5)">
          <path
            d="M6.4 3.2C6.9 3.2 7.4 3.5 7.7 4L9.5 7.5C9.8 8 9.7 8.7 9.3 9.1L7.5 10.9C8.7 13.3 10.7 15.3 13.1 16.5L14.9 14.7C15.3 14.3 16 14.2 16.5 14.5L20 16.3C20.5 16.6 20.8 17.1 20.8 17.6V20.5C20.8 21.6 19.8 22.5 18.7 22.4C10.1 21.8 2.2 13.9 1.6 5.3C1.5 4.2 2.4 3.2 3.5 3.2H6.4Z"
            fill="#FFFFFF"
          />
          {/* Inner Acoustic Wave */}
          <path
            d="M14.2 6.8C16.2 7.5 17.7 9.1 18.4 11.1"
            stroke="#E0F2FE"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Outer Acoustic Wave */}
          <path
            d="M15.4 3.4C18.6 4.4 21.1 6.9 22.1 10.1"
            stroke="#BAE6FD"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </g>

        {/* Live Trunkline Status Dot on the Cloud Crest */}
        <circle cx="62.5" cy="16.5" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.75" />
      </svg>
    </a>
  );
}
