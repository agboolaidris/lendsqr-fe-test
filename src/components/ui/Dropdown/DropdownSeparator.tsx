"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import styles from "./Dropdown.module.scss";

interface DropdownSeparatorProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Separator
> {
  className?: string;
}

export function DropdownSeparator({
  className,
  ...props
}: DropdownSeparatorProps) {
  return (
    <DropdownMenu.Separator
      className={clsx(styles.dropdownSeparator, className)}
      {...props}
    />
  );
}

DropdownSeparator.displayName = "DropdownSeparator";
