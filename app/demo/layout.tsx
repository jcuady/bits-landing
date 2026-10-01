import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Demo & Solutions Showcase",
  description:
    "Explore interactive enterprise demonstrations, sovereign collections engines, and AI workflow MVPs built by Boundless IT Solutions (BITS).",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
