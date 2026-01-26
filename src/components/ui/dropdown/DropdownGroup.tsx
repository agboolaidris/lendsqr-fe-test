"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.scss";
import clsx from "clsx";

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
