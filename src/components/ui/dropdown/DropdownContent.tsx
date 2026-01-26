"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.scss";
import clsx from "clsx";

interface DropdownContentProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Content
> {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null | Array<Element | null>;
  collisionPadding?: number;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
}

export function DropdownContent({
  children,
  className,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  alignOffset = 0,
  avoidCollisions = true,
  collisionBoundary,
  collisionPadding = 0,
  arrowPadding = 0,
  sticky = "partial",
  hideWhenDetached = false,
  ...props
}: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={clsx(
          styles.dropdownContent,
          styles[`dropdownContent--${side}`],
          styles[`dropdownContent--${align}`],
          className,
        )}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        arrowPadding={arrowPadding}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

DropdownContent.displayName = "DropdownContent";
