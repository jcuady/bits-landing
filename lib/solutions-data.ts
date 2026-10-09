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
    href: "/products/crm",
    description:
      "Visual sales pipelines, automated client quotations, customer help desk, and recurring billing all in one CRM.",
    badge: "Sales & Support",
    accentBorder: "hover:border-sky-400/50",
    glowColor: "from-sky-500/15 via-blue-400/10 to-transparent",
  },
  {
    track: "04",
    id: "ledger-and-payroll",
    category: "LEDGER // PAYROLL",
    goal: "Automate company accounting, staff timekeeping, and Philippine payroll",
    problem:
      "Bookkeeping is closed manually at month end. Attendance is a separate biometric box. Payroll is exported to a file and retyped, so errors reach the bank feed.",
    approach: [
      "Double-entry general ledger with AP 3-way matching and AR credit control",
      "BIR CAS-ready schemas and one-click financial statements",
      "Biometric clock-in feeding rosters, leave, and payroll in one pass",
      "Statutory TRAIN and 13th-month calculations with bank batch output",
    ],
    product: "Accounting, HRMS & Payroll",
    href: "/products/accounting",
    description:
      "BIR CAS-ready bookkeeping, biometric clock-in integration, automated 13th-month & TRAIN tax calculations.",
    badge: "BIR CAS Aligned",
    accentBorder: "hover:border-emerald-400/50",
    glowColor: "from-emerald-500/15 via-teal-400/10 to-transparent",
  },
  {
    track: "05",
    id: "dispatch-and-inventory",
    category: "DISPATCH // INVENTORY",
    goal: "Track multi-warehouse inventory, company vehicles, and verified delivery",
    problem:
      "Stock counts are wrong because every location keeps its own sheet. Dispatchers assign runs by phone. There is no proof a delivery actually happened.",
    approach: [
      "Live stock levels across every warehouse and lot location",
      "Barcode scanning that updates inventory at scan time, not at month end",
      "Route optimization and driver assignment with live GPS tracking",
      "Digital proof-of-delivery signature captured at the drop",
    ],
    product: "Inventory & Logistics",
    href: "/products/inventory",
    description:
      "Live GPS vehicle tracking, barcode scanning, driver route optimization, and digital proof-of-delivery signatures.",
    badge: "Fleet & Warehouse",
    accentBorder: "hover:border-teal-400/50",
    glowColor: "from-teal-500/15 via-emerald-400/10 to-transparent",
  },
  {
    track: "06",
    id: "booking-queuing-and-venues",
    category: "BOOKING // SMART NFC",
    goal: "Book appointments, manage customer lines, and issue smart tap cards",
    problem:
      "Appointments are booked by phone and confirmed by memory. Queues are managed on a whiteboard. Staff and members carry cards nobody can update.",
    approach: [
      "Online booking with live availability and automatic reminders",
      "Queue numbers on screen and by SMS so nobody waits uninformed",
      "Court, court-side, and venue scheduling with rotation rules",
      "NFC business cards that update themselves when details change",
    ],
    product: "Booking, Queuing & Sports Hub",
    href: "/products/booking",
    description:
      "Live online appointment booking, SMS queue alerts, court reservations, and contactless BITS Tap NFC business cards.",
    badge: "Venue & Smart NFC",
    accentBorder: "hover:border-amber-400/50",
    glowColor: "from-amber-500/15 via-orange-400/10 to-transparent",
  },
];

/** Industry sectors, mapped to the tracks that serve them best. */
export const sectorTrackMap: Record<string, string[]> = {
  bpo: ["collections-and-field", "voice-ai-and-autonomy", "sales-and-support"],
  collections: ["collections-and-field", "voice-ai-and-autonomy"],
  banking: ["collections-and-field", "ledger-and-payroll"],
  "growing-businesses": [
    "sales-and-support",
    "ledger-and-payroll",
    "dispatch-and-inventory",
    "booking-queuing-and-venues",
  ],
};