import type { Metadata } from "next";
import { BitsAgentPageContent } from "@/components/sections/bits-agent-page-content";

export const metadata: Metadata = {
  title: "BITSagent — Autonomous AI Voice & Multichannel Collections Agent",
  description:
    "Deploy human-sounding AI agents for high-volume collections, customer support, and surveys. Handles inbound/outbound calls, email follow-ups, and PTP negotiations 24/7.",
  openGraph: {
    title: "BITSagent — Autonomous AI Voice & Multichannel Collections Agent",
    description:
      "Deploy human-sounding AI agents for high-volume collections, customer support, and surveys. Handles inbound/outbound calls, email follow-ups, and PTP negotiations 24/7.",
  },
};

export default function BitsAgentPage() {
  return (
    <main id="content">
      <BitsAgentPageContent />
    </main>
  );
}
