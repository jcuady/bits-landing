"use client";

import dynamic from "next/dynamic";

const PlatformVitalsDemo = dynamic(
  () => import("@/components/bionis/demo"),
  { ssr: false }
);

export default function PlatformTelemetryPage() {
  return (
    <div className="-m-3 sm:-m-5 lg:-m-6 h-[calc(100dvh-4rem)]">
      <PlatformVitalsDemo />
    </div>
  );
}
