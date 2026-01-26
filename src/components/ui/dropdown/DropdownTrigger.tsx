"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.scss";
import clsx from "clsx";

interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Trigger
> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export function DropdownTrigger({
  children,
  asChild = false,
  className,
  ...props
}: DropdownTriggerProps) {
  return (
    <DropdownMenu.Trigger
      className={clsx(styles.dropdownTrigger, className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </DropdownMenu.Trigger>
  );
}

DropdownTrigger.displayName = "DropdownTrigger";
