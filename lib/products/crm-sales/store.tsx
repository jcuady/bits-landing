"use client";

import * as React from "react";
import { Deal, DealStage, Lead, CPQProductItem } from "./types";
import { INITIAL_DEALS, INITIAL_LEADS, CPQ_CATALOG } from "./mock-data";

interface SalesContextValue {
  deals: Deal[];
  leads: Lead[];
  moveDealStage: (dealId: string, nextStage: DealStage) => void;
  addDeal: (dealData: Omit<Deal, "id">) => void;
  convertLeadToDeal: (leadId: string) => void;
  deleteDeal: (dealId: string) => void;
  metrics: {
    totalPipeline: number;
    weightedPipeline: number;
    closedWonRevenue: number;
    winRate: number;
    activeDealsCount: number;
  };
  // CPQ State
  cpqCatalog: CPQProductItem[];
  toggleCpqItem: (id: string) => void;
  updateCpqQuantity: (id: string, qty: number) => void;
  cpqSeats: number;
  setCpqSeats: (seats: number) => void;
  cpqDiscount: number;
  setCpqDiscount: (pct: number) => void;
  cpqClientCompany: string;
  setCpqClientCompany: (company: string) => void;
  cpqTotals: {
    monthlyRecurring: number;
    annualBase: number;
    discountAmount: number;
    subtotal: number;
    vatAmount: number; // 12%
    totalAnnualPh: number;
  };
}

const SalesContext = React.createContext<SalesContextValue | null>(null);

const STORAGE_DEALS_KEY = "bits_crm_sales_deals_v1";
const STORAGE_LEADS_KEY = "bits_crm_sales_leads_v1";

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const [deals, setDeals] = React.useState<Deal[]>(INITIAL_DEALS);
  const [leads, setLeads] = React.useState<Lead[]>(INITIAL_LEADS);
  const [cpqCatalog, setCpqCatalog] = React.useState<CPQProductItem[]>(CPQ_CATALOG);
  const [cpqSeats, setCpqSeats] = React.useState<number>(25);
  const [cpqDiscount, setCpqDiscount] = React.useState<number>(10);
  const [cpqClientCompany, setCpqClientCompany] = React.useState<string>("SM Prime Holdings, Inc.");

  // Load stored state on mount
  React.useEffect(() => {
    try {
      const storedDeals = localStorage.getItem(STORAGE_DEALS_KEY);
      if (storedDeals) setDeals(JSON.parse(storedDeals));

      const storedLeads = localStorage.getItem(STORAGE_LEADS_KEY);
      if (storedLeads) setLeads(JSON.parse(storedLeads));
    } catch {
      // Ignore
    }
  }, []);

  const saveDeals = (updated: Deal[]) => {
    setDeals(updated);
    try {
      localStorage.setItem(STORAGE_DEALS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const saveLeads = (updated: Lead[]) => {
    setLeads(updated);
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const moveDealStage = (dealId: string, nextStage: DealStage) => {
    const updated = deals.map((d) => {
      if (d.id === dealId) {
        let prob = d.probability;
        if (nextStage === "lead_in") prob = 20;
        else if (nextStage === "qualified") prob = 40;
        else if (nextStage === "proposal") prob = 65;
        else if (nextStage === "negotiation") prob = 85;
        else if (nextStage === "closed_won") prob = 100;
        else if (nextStage === "closed_lost") prob = 0;

        return { ...d, stage: nextStage, probability: prob };
      }
      return d;
    });
    saveDeals(updated);
  };

  const addDeal = (dealData: Omit<Deal, "id">) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now().toString().slice(-4)}`,
    };
    saveDeals([newDeal, ...deals]);
  };

  const convertLeadToDeal = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    // Create new deal
    const newDeal: Deal = {
      id: `deal-${Date.now().toString().slice(-4)}`,
      title: `Enterprise Suite - ${lead.company}`,
      company: lead.company,
      industry: "Enterprise Operations",
      location: lead.location,
      amount: lead.estimatedBudget,
      stage: "qualified",
      probability: 45,
      owner: "Marco Dela Cruz (Sales Director)",
      contactName: lead.name,
      contactEmail: lead.email,
      contactPhone: lead.phone,
      expectedCloseDate: "2026-11-30",
      priority: "high",
      notes: `Converted from AI High Score lead (${lead.aiScore}/100). Source: ${lead.source}`,
    };

    saveDeals([newDeal, ...deals]);

    // Mark lead converted
    const updatedLeads = leads.map((l) => (l.id === leadId ? { ...l, status: "converted" as const } : l));
    saveLeads(updatedLeads);
  };

  const deleteDeal = (dealId: string) => {
    saveDeals(deals.filter((d) => d.id !== dealId));
  };

  // Calculate Metrics
  const metrics = React.useMemo(() => {
    let totalPipeline = 0;
    let weightedPipeline = 0;
    let closedWonRevenue = 0;
    let wonCount = 0;
    let lostCount = 0;
    let activeDealsCount = 0;

    deals.forEach((d) => {
      if (d.stage === "closed_won") {
        closedWonRevenue += d.amount;
        wonCount += 1;
      } else if (d.stage === "closed_lost") {
        lostCount += 1;
      } else {
        totalPipeline += d.amount;
        weightedPipeline += (d.amount * d.probability) / 100;
        activeDealsCount += 1;
      }
    });

    const totalDecided = wonCount + lostCount;
    const winRate = totalDecided > 0 ? (wonCount / totalDecided) * 100 : 75;

    return {
      totalPipeline,
      weightedPipeline: Math.round(weightedPipeline),
      closedWonRevenue,
      winRate: Math.round(winRate * 10) / 10,
      activeDealsCount,
    };
  }, [deals]);

  // CPQ Calculations
  const toggleCpqItem = (id: string) => {
    setCpqCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const updateCpqQuantity = (id: string, qty: number) => {
    setCpqCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
    );
  };

  const cpqTotals = React.useMemo(() => {
    let monthlyPerSeatSum = 0;
    let flatAnnualSum = 0;

    cpqCatalog.forEach((item) => {
      if (item.selected) {
        if (item.monthlyPerSeat > 0) {
          monthlyPerSeatSum += item.monthlyPerSeat;
        }
        if (item.annualFlatPrice) {
          flatAnnualSum += item.annualFlatPrice * item.quantity;
        }
      }
    });

    const monthlyRecurring = monthlyPerSeatSum * cpqSeats;
    const annualBase = monthlyRecurring * 12 + flatAnnualSum;
    const discountAmount = annualBase * (cpqDiscount / 100);
    const subtotal = annualBase - discountAmount;
    const vatAmount = subtotal * 0.12; // 12% PH VAT
    const totalAnnualPh = subtotal + vatAmount;

    return {
      monthlyRecurring,
      annualBase,
      discountAmount,
      subtotal,
      vatAmount,
      totalAnnualPh,
    };
  }, [cpqCatalog, cpqSeats, cpqDiscount]);

  return (
    <SalesContext.Provider
      value={{
        deals,
        leads,
        moveDealStage,
        addDeal,
        convertLeadToDeal,
        deleteDeal,
        metrics,
        cpqCatalog,
        toggleCpqItem,
        updateCpqQuantity,
        cpqSeats,
        setCpqSeats,
        cpqDiscount,
        setCpqDiscount,
        cpqClientCompany,
        setCpqClientCompany,
        cpqTotals,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const ctx = React.useContext(SalesContext);
  if (!ctx) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return ctx;
}
