"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import styles from "./Dropdown.module.scss";

interface DropdownGroupProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Group
> {
  children: React.ReactNode;
  className?: string;
}

export function DropdownGroup({
  children,
  className,
  ...props
}: DropdownGroupProps) {
  return (
    <DropdownMenu.Group
      className={clsx(styles.dropdownGroup, className)}
      {...props}
    >
      {children}
    </DropdownMenu.Group>
  );
}

DropdownGroup.displayName = "DropdownGroup";
