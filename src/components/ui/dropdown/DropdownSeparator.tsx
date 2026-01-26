"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.scss";
import clsx from "clsx";

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
