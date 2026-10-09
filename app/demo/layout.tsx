import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Demo & Solutions Showcase",
  description:
    "Explore interactive enterprise demonstrations, sovereign collections engines, and AI workflow MVPs built by Boundless IT Solutions (BITS).",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Skip link (WCAG 2.4.1 Bypass Blocks).

        `/demo` is outside the marketing route group and renders its own
        sticky <header> plus a hero, 7 category pills and a search field before
        the engine grid, so a keyboard user has to traverse the whole header to
        reach the content. The marketing, product and CRM shells each provide
        this; `/demo` was the one live route that did not.
      */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-blue-950 focus:shadow-2xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      >
        Skip to main content
      </a>
      {children}
    </>
  );
}
