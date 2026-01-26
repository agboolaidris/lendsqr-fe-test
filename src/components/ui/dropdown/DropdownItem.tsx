"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.scss";
import clsx from "clsx";

interface DropdownItemProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Item
> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  onSelect?: (event: Event) => void;
}

export function DropdownItem({
  children,
  className,
  disabled = false,
  selected = false,
  onSelect,
  ...props
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={clsx(
        styles.dropdownItem,
        disabled && styles.dropdownItemDisabled,
        selected && styles.dropdownItemSelected,
        className,
      )}
      disabled={disabled}
      onSelect={onSelect}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
}

DropdownItem.displayName = "DropdownItem";
