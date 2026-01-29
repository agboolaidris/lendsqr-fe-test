"use client";

import { useResponsive } from "@hooks/useResponsive";
import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  toggleOpen: () => void;
  toggleCollapse: () => void;
  setIsOpen: (open: boolean) => void;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-close mobile drawer when switching to desktop
  if (!isMobile && isOpen) {
    setIsOpen(false);
  }

  // Reset collapsed state when switching to mobile
  if (isMobile && isCollapsed) {
    setIsCollapsed(false);
  }

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        isMobile,
        toggleOpen,
        toggleCollapse,
        setIsOpen,
        setIsCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
