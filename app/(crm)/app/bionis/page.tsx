"use client";

import dynamic from "next/dynamic";

const BionisDashboardDemo = dynamic(
  () => import("@/components/bionis/demo"),
  { ssr: false }
);

export default function BionisDemoPage() {
  return (
    <div className="-m-3 sm:-m-5 lg:-m-6 h-[calc(100dvh-4rem)]">
      <BionisDashboardDemo />
    </div>
  );
}
