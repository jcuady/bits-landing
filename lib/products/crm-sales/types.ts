/**
 * Types for BITScrm Sales Suite MVP
 * Boundless IT Solutions (BITS)
 */

export type DealStage = "lead_in" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";

export interface Deal {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string; // e.g. "BGC, Taguig", "Makati CBD"
  amount: number; // In Philippine Pesos (₱)
  stage: DealStage;
  probability: number; // 0 - 100%
  owner: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  expectedCloseDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  estimatedBudget: number; // In ₱
  aiScore: number; // 0 - 100
  scoreReason: string;
  source: "Web Inbound" | "Executive Referral" | "Architecture Consultation" | "Webinar";
  status: "new" | "contacted" | "qualified" | "converted";
  createdAt: string;
}

export interface CPQProductItem {
  id: string;
  name: string;
  description: string;
  monthlyPerSeat: number; // ₱
  annualFlatPrice?: number; // ₱
  selected: boolean;
  quantity: number;
}

export interface CPQQuote {
  id: string;
  dealId?: string;
  clientCompany: string;
  preparedFor: string;
  items: CPQProductItem[];
  seats: number;
  discountPercentage: number;
  vatRate: number; // 0.12 for 12% PH VAT
  requiresDirectorApproval: boolean;
  isApproved: boolean;
  status: "draft" | "pending_approval" | "sent_to_client" | "accepted";
}
