"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import styles from "./Dropdown.module.scss";

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
