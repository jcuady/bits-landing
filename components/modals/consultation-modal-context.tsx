"use client";

import * as React from "react";
import { ConsultationModal } from "@/components/modals/consultation-modal";

interface ConsultationModalContextType {
  isOpen: boolean;
  openModal: (interest?: string) => void;
  closeModal: () => void;
  selectedInterest: string;
}

const ConsultationModalContext = React.createContext<ConsultationModalContextType | undefined>(
  undefined
);

export function ConsultationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedInterest, setSelectedInterest] = React.useState(
    "OPERATIONS 360 — Integrated Operations Platform (Flagship)"
  );

  const openModal = React.useCallback((interest?: string) => {
    if (interest) {
      setSelectedInterest(interest);
    }
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global window event listener to allow zero-prop-drilling triggers anywhere
  React.useEffect(() => {
    const handleGlobalTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ interest?: string }>;
      openModal(customEvent.detail?.interest);
    };

    window.addEventListener("open-consultation-modal", handleGlobalTrigger);
    return () => {
      window.removeEventListener("open-consultation-modal", handleGlobalTrigger);
    };
  }, [openModal]);

  return (
    <ConsultationModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        selectedInterest,
      }}
    >
      {children}
      <ConsultationModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultInterest={selectedInterest}
      />
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = React.useContext(ConsultationModalContext);
  if (!context) {
    throw new Error(
      "useConsultationModal must be used within a ConsultationModalProvider"
    );
  }
  return context;
}

/**
 * Helper to dispatch global event from non-react or leaf components if ever needed
 */
export function triggerConsultationModal(interest?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-consultation-modal", { detail: { interest } })
    );
  }
}
