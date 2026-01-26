"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  dir?: "ltr" | "rtl";
}

export function Dropdown({
  children,
  open,
  onOpenChange,
  modal = true,
  dir = "ltr",
}: DropdownProps) {
  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
      dir={dir}
    >
      {children}
    </DropdownMenu.Root>
  );
}

Dropdown.displayName = "Dropdown";
