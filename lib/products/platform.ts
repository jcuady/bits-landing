/**
 * Operations 360 — Platform Model
 * Boundless IT Solutions (BITS)
 *
 * This is the homepage's data source (CPO Step 1). Adding a product to the
 * landing page means adding one entry here or in PRODUCT_REGISTRY — not editing
 * section files.
 *
 * POSITIONING (locked): Operations 360 is the platform. BITScrm and BITSagent
 * AI are MODULES inside it, not rival products. Everything else is portfolio —
 * listed and linked, never explained.
 */

import { PRODUCT_REGISTRY, getCanonicalProducts, getHomepageProducts, type ProductMvpConfig } from "./registry";

/** The four capabilities of Operations 360, confirmed by product owner. */
export interface PlatformPillar {
  id: string;
  title: string;
  /** One line. Scannable noun phrase — not a sentence. */
  line: string;
  /** The proof point shown in small caps beneath the card. */
  stat: string;
  /** Short capability chips rendered inside the homepage card. */
  features: string[];
}

export interface PlatformModel {
  id: string;
  name: string;
  tagline: string;
  href: string;
  pillars: PlatformPillar[];
  modules: ProductMvpConfig[];
  /** Portfolio products — shown compactly, one click to the catalogue. */
  portfolio: ProductMvpConfig[];
}

export const OPERATIONS_360: PlatformModel = {
  id: "operations-360",
  name: "Operations 360",
  tagline: "The recovery floor, on one system.",
  href: "/operations-360",
  pillars: [
    {
      id: "collections",
      title: "Collections CRM & PTP",
      line: "360° dossiers, DPD aging, promise-to-pay automation.",
      stat: "0.4s screen-pop",
      features: [
        "Dynamic debtor staging queues",
        "Automated PTP scheduling",
        "Co-maker and interest ledger",
        "Broken-promise alerting",
      ],
    },
    {
      id: "dialer",
      title: "Predictive Dialer",
      line: "Sub-350ms pacing. No desk phones, no PBX.",
      stat: "98.4% live voice",
      features: [
        "In-browser WebRTC softphone",
        "Zero-dead-air pacing",
        "Supervisor listen & barge-in",
        "Dual-SIP redundancy",
      ],
    },
    {
      id: "field",
      title: "BITS FILO",
      line: "Field Intelligence Location Optimization. GPS-geofenced proof-of-visit with debtor e-signature.",
      stat: "10m geofence",
      features: [
        "Satellite-clock timestamping",
        "Watermarked photo proof",
        "On-device e-signature",
        "Works fully offline",
      ],
    },
    {
      id: "qa",
      title: "BITS AIQA",
      line: "Real-time AI QA scoring. Every call audited. Prohibited phrases flagged live.",
      stat: "100% call audit",
      features: [
        "Acoustic & semantic scoring",
        "Sentiment analysis",
        "BSP 454/857 quiet-hour flags",
        "Exportable audit certificates",
      ],
    },
  ],
  modules: [],
  portfolio: [],
};

/**
 * Public copy rule, applied identically everywhere (CPO Step 4).
 *
 * DERIVED, never hardcoded. Two product registries once existed and drifted
 * apart, which made a hardcoded count silently wrong. The number is now
 * computed from the registry so it cannot drift again.
 *
 * Modules (BITScrm, BITSagent AI) count as products in the total — they are
 * separately sellable entry points into the platform.
 */
/**
 * Registry entries whose public product pages now live inside Operations 360.
 *
 * They stay in PRODUCT_REGISTRY on purpose: the legacy `support.*`,
 * `marketing.*` and `commerce.*` subdomains still resolve through proxy.ts
 * and must keep working. They are excluded only from the customer-facing
 * count and the homepage portfolio.
 *
 * Keep in sync with the CRM collapse redirects in next.config.ts.
 */
export const COLLAPSED_INTO_PLATFORM = new Set([
  "crm-support",
  "crm-marketing",
  "crm-commerce",
]);

/** Products a customer can actually buy — excludes aliases and collapsed ones. */
export const CATALOG_COUNT = getCanonicalProducts().filter(
  (p) => !COLLAPSED_INTO_PLATFORM.has(p.id),
).length;

export const CATALOG_CLAIM = `${CATALOG_COUNT} products, ${OPERATIONS_360.pillars.length} of them in Operations 360`;

/**
 * Modules — anything flagged `homepage.platform` in the registry.
 * Currently BITScrm and BITSagent AI.
 */
export const PLATFORM_MODULES: ProductMvpConfig[] = getHomepageProducts().filter(
  (p) => p.homepage?.platform === OPERATIONS_360.id
);

/**
 * Portfolio — every canonical product that is neither the platform nor one of
 * its modules.
 *
 * Sourced from `getCanonicalProducts()`, NOT `getHomepageProducts()`: only the
 * platform and its modules carry a `homepage` block, so filtering on that would
 * return an empty portfolio.
 */
export const PORTFOLIO_PRODUCTS: ProductMvpConfig[] = getCanonicalProducts().filter(
  (p) =>
    p.id !== OPERATIONS_360.id &&
    p.homepage?.platform !== OPERATIONS_360.id &&
    !COLLAPSED_INTO_PLATFORM.has(p.id),
);

/** Portfolio that appears on /products but has no homepage placement. */
export const CATALOGUE_ONLY_PRODUCTS: ProductMvpConfig[] = Object.values(PRODUCT_REGISTRY).filter(
  (p) => !p.aliasOf && !p.homepage
);

/** Fully-resolved platform, ready to render. */
export function getPlatform(): PlatformModel {
  return {
    ...OPERATIONS_360,
    modules: PLATFORM_MODULES,
    portfolio: PORTFOLIO_PRODUCTS,
  };
}