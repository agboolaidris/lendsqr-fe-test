"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.scss";
import clsx from "clsx";

interface DropdownLabelProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Label
> {
  children: React.ReactNode;
  className?: string;
}

export function DropdownLabel({
  children,
  className,
  ...props
}: DropdownLabelProps) {
  return (
    <DropdownMenu.Label
      className={clsx(styles.dropdownLabel, className)}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  );
}

DropdownLabel.displayName = "DropdownLabel";
