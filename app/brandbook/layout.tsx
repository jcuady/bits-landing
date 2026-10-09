import type { Metadata, Viewport } from "next";

/**
 * Scoped layout for the /brandbook route group.
 *
 * The brandbook ships as its own Next app with a dark root layout and a
 * dedicated Tailwind preset. Transplanting that root layout wholesale would
 * overwrite the site-wide fonts, metadata and theme, so the dark chrome is
 * scoped here instead — it applies to /brandbook/* only and leaks nowhere.
 *
 * Design tokens (`--color-horizon-*`, `--shadow-glass-*`, `--shadow-cockpit`,
 * `--font-mono`) live in app/globals.css alongside the rest of the BITS system.
 */

export const metadata: Metadata = {
  title: {
    default: "BITS Brandbook — Design System · Boundless IT Solutions",
    template: "%s · BITS Brandbook",
  },
  description:
    "The authoritative BITS brand identity and design system dossier. Logo anatomy, color tokens, typography, glassmorphism architecture, and the full asset library.",
  icons: {
    icon: "/brand/bits-monogram-official.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1362df",
  width: "device-width",
  initialScale: 1,
};

export default function BrandbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-navy-950 font-sans text-white antialiased selection:bg-electric-600 selection:text-white">
      {children}
    </div>
  );
}