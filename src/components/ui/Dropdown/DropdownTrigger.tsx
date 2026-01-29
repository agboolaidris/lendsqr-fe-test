"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import styles from "./Dropdown.module.scss";

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
