"use client";

import * as React from "react";

export type DemoPersona = "po_demo" | "pm_qa" | "dev_admin" | "sales_rep" | "sales_director" | "cfo";

export interface DemoSettings {
  persona: DemoPersona;
  isWhiteLabelPreview: boolean;
  whiteLabelClientName: string;
  whiteLabelLogoText: string;
  whiteLabelBrandColor: string;
  isSandboxResetting: boolean;
}

const DEFAULT_SETTINGS: DemoSettings = {
  persona: "sales_director",
  isWhiteLabelPreview: false,
  whiteLabelClientName: "Acme Enterprises (Philippines)",
  whiteLabelLogoText: "ACME OPERATIONS",
  whiteLabelBrandColor: "#0284c7",
  isSandboxResetting: false,
};

interface DemoContextValue extends DemoSettings {
  setPersona: (persona: DemoPersona) => void;
  toggleWhiteLabel: () => void;
  setWhiteLabelClientName: (name: string) => void;
  resetSandboxData: () => void;
}

const DemoContext = React.createContext<DemoContextValue | null>(null);

const STORAGE_KEY = "bits_demo_settings_v1";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<DemoSettings>(DEFAULT_SETTINGS);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveSettings = (newSettings: DemoSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // Ignore
    }
  };

  const setPersona = (persona: DemoPersona) => {
    saveSettings({ ...settings, persona });
  };

  const toggleWhiteLabel = () => {
    saveSettings({ ...settings, isWhiteLabelPreview: !settings.isWhiteLabelPreview });
  };

  const setWhiteLabelClientName = (name: string) => {
    saveSettings({ ...settings, whiteLabelClientName: name });
  };

  const resetSandboxData = () => {
    setSettings((prev) => ({ ...prev, isSandboxResetting: true }));
    try {
      localStorage.removeItem("bits_crm_sales_data_v1");
      localStorage.removeItem("bits_pipeline_deals_v1");
    } catch {
      // Ignore
    }
    setTimeout(() => {
      setSettings((prev) => ({ ...prev, isSandboxResetting: false }));
      window.location.reload();
    }, 600);
  };

  const value: DemoContextValue = {
    ...settings,
    setPersona,
    toggleWhiteLabel,
    setWhiteLabelClientName,
    resetSandboxData,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = React.useContext(DemoContext);
  if (!ctx) {
    return {
      ...DEFAULT_SETTINGS,
      setPersona: () => {},
      toggleWhiteLabel: () => {},
      setWhiteLabelClientName: () => {},
      resetSandboxData: () => {},
    };
  }
  return ctx;
}
