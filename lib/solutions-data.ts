/**
 * Buyer-language solution tracks.
 *
 * Single source of truth for both the homepage "What are you trying to improve?"
 * finder and the dedicated /solutions page, so the two never drift apart.
 */

export interface SolutionTrack {
  /** Zero-padded display index, e.g. "01". */
  track: string;
  /** Short internal id, used for anchors and JSON-LD ids. */
  id: string;
  category: string;
  /** The operational goal, stated the way the buyer would say it. */
  goal: string;
  /** What is actually going wrong today, in plain words. */
  problem: string;
  /** What BITS puts in place to fix it. */
  approach: string[];
  /** The recommended product. */
  product: string;
  /** Canonical product URL. */
  href: string;
  /** One-line summary shown on compact cards. */
  description: string;
  badge: string;
  accentBorder: string;
  glowColor: string;
}

export const solutionTracks: SolutionTrack[] = [
  {
    track: "01",
    id: "collections-and-field",
    category: "COLLECTIONS & FIELD // OPERATIONS",
    goal: "Collect payments faster, automate calls, and track field reps on the road",
    problem:
      "Account balances live in spreadsheets, field collectors work from paper, and nobody can prove where a rep actually was. Promise-to-Pay commitments slip because nothing chases them.",
    approach: [
      "One account dossier carrying balance, status, history, and assignment",
      "Promise-to-Pay tracking with automatic alerts when a commitment breaks",
      "Browser softphone and auto-dialing built into the same account record",
      "Mobile field app with GPS-tagged visits, photos, and disposition logging",
    ],
    product: "Operations 360 & Field App",
    href: "/operations-360",
    description:
      "Call center CRM, predictive dialer, QA scorecards, plus a mobile field app with live GPS visit timestamps and offline logging.",
    badge: "Recovery Flagship",
    accentBorder: "hover:border-blue-400/50",
    glowColor: "from-blue-500/15 via-sky-400/10 to-transparent",
  },
  {
    track: "02",
    id: "voice-ai-and-autonomy",
    category: "VOICE AI // AUTONOMY",
    goal: "Automate customer phone calls, SMS follow-ups, and negotiation emails",
    problem:
      "Repetitive inbound calls eat agent hours. After-hours callers wait. Every answer to a routine question still costs a person on a salary.",
    approach: [
      "Conversational voice AI that answers, negotiates, and schedules on its own",
      "Email and SMS intake handled without an agent touching the queue",
      "Answers grounded in your own SOPs, not generic internet content",
      "Warm transfer to a live agent with the full account already on screen",
    ],
    product: "BITSagent AI",
    href: "/operations-360/ai",
    description:
      "Realistic human-sounding voice AI that handles calls and customer inquiries around the clock with zero wait times.",
    badge: "Sub-300ms Voice",
    accentBorder: "hover:border-indigo-400/50",
    glowColor: "from-indigo-500/15 via-blue-400/10 to-transparent",
  },
  {
    track: "03",
    id: "sales-and-support",
    category: "SALES // PIPELINE",
    goal: "Track sales deals, send instant price quotes, and manage support tickets",
    problem:
      "Deals sit in one tool, support tickets in another, and marketing in a third. Nobody can answer how many opportunities turned into invoices.",
    approach: [
      "Visual pipeline with lead scoring and territory routing",
      "Quotation and CPQ generation without rebuilding the document by hand",
      "Omnichannel ticket queue with P1–P4 priorities and SLA countdowns",
      "Marketing journeys and recurring billing on the same customer record",
    ],
    product: "BITScrm Suite",
    href: "/operations-360/crm",
    description:
      "Visual sales pipelines, automated client quotations, customer help desk, and recurring billing all in one CRM.",
    badge: "Sales & Support",
    accentBorder: "hover:border-sky-400/50",
    glowColor: "from-sky-500/15 via-blue-400/10 to-transparent",
  },
  {
    track: "04",
    id: "isp-service-desk-and-pbx",
    category: "SERVICE DESK // TELEPHONY",
    goal: "Unify ISP subscriber records, outage tickets, and Asterisk PBX calls on one screen",
    problem:
      "Support agents look up subscribers in one tab, log outage tickets in another, and answer calls on a separate PBX with no automatic call recording link.",
    approach: [
      "Subscriber directory with plan, ONU/serial, billing status, and ticket history",
      "Built-in Asterisk PBX softphone, call log, recordings, and live supervisor monitor",
      "GoIP GSM gateway support for multi-SIM outbound and inbound routing",
      "Strict two-tier access separation between ISP client staff and BITS vendor engineering",
    ],
    product: "BITS CRMPBX",
    href: "/products/crmpbx",
    description:
      "Customer service CRM and Asterisk PBX telephony built for internet service providers and high-volume service desks.",
    badge: "ISP & Service Desk",
    accentBorder: "hover:border-cyan-400/50",
    glowColor: "from-cyan-500/15 via-sky-400/10 to-transparent",
  },
  {
    track: "05",
    id: "workforce-and-payroll",
    category: "ROSTERING // PAYROLL",
    goal: "Automate 24/7 shift rostering, biometric timekeeping, and Philippine statutory payroll",
    problem:
      "Shift schedules live on brittle spreadsheets, biometric clocks sit disconnected from leave balances, and payroll deductions are calculated by hand before every payout.",
    approach: [
      "24/7 multi-shift rostering with night-differential, overtime, and holiday rules",
      "Direct biometric clock-in integration feeding attendance and leave in one pass",
      "Automated SSS, PhilHealth, Pag-IBIG, and TRAIN Law withholding tax computations",
      "13th-month pay automation and one-click bank batch disbursement exports",
    ],
    product: "BITS HRMS & Payroll",
    href: "/products/hrms",
    description:
      "Unified 24/7 workforce rostering, biometric attendance, DOLE compliance, and automated Philippine statutory payroll.",
    badge: "DOLE & TRAIN Aligned",
    accentBorder: "hover:border-emerald-400/50",
    glowColor: "from-emerald-500/15 via-teal-400/10 to-transparent",
  },
  {
    track: "06",
    id: "messaging-and-community",
    category: "MESSAGING // COMMUNITY CLOUD",
    goal: "Connect teams and local communities with real-time chat, voice/video rooms, and local radar",
    problem:
      "Teams and communities juggle separate apps for direct chat, group channels, drop-in voice calls, and local updates without privacy controls.",
    approach: [
      "Direct and group chats with channels, file sharing, and 37 animated Ulap Barkada stickers",
      "Drop-in voice and video call rooms with screen sharing across Web, Android, iOS, and Desktop",
      "Cloud 9 24-hour status stories and opt-in Passing Clouds nearby discovery (~1km privacy zone)",
      "Maritess Hub local community radar with Totoo / Hindi Totoo verification and local Marketplace",
    ],
    product: "BITS ULAP",
    href: "/products/ulap",
    description:
      "Filipino-built messaging and community cloud uniting chats, channels, voice/video rooms, Maritess Hub radar, and local marketplace.",
    badge: "Live at chat.boundlessits.com",
    accentBorder: "hover:border-violet-400/50",
    glowColor: "from-violet-500/15 via-indigo-400/10 to-transparent",
  },
];

/** Industry sectors, mapped to the tracks that serve them best. */
export const sectorTrackMap: Record<string, string[]> = {
  bpo: ["collections-and-field", "voice-ai-and-autonomy", "workforce-and-payroll"],
  collections: ["collections-and-field", "voice-ai-and-autonomy", "sales-and-support"],
  banking: ["collections-and-field", "workforce-and-payroll", "sales-and-support"],
  "growing-businesses": [
    "sales-and-support",
    "isp-service-desk-and-pbx",
    "workforce-and-payroll",
    "messaging-and-community",
  ],
};