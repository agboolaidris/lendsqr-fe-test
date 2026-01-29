"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import styles from "./Dropdown.module.scss";

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
