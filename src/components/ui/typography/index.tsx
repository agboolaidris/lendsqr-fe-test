"use client";

import React, { memo, useMemo } from "react";
import styles from "./typography.module.scss";
import clsx from "clsx";

type SizeType =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";
type WeightType = "normal" | "medium" | "semibold" | "bold";
type VariantType =
  | "default"
  | "secondary"
  | "inverse"
  | "danger"
  | "success"
  | "primary";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: SizeType;
  weight?: WeightType;
  variant?: VariantType;
  className?: string;
  children: React.ReactNode;
  truncate?: boolean;
  align?: "left" | "center" | "right" | "justify";
  lineClamp?: 1 | 2 | 3 | 4;
}

// Predefined element mapping for common text types
const defaultElements: Record<SizeType, React.ElementType> = {
  xs: "span",
  sm: "span",
  base: "p",
  lg: "p",
  xl: "h4",
  "2xl": "h3",
  "3xl": "h2",
  "4xl": "h2",
  "5xl": "h1",
  "6xl": "h1",
};

// Memoized component for better performance
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      size = "base",
      weight = "normal",
      variant = "default",
      className,
      children,
      truncate = false,
      align,
      lineClamp,
      style,
      ...props
    },
    ref,
  ) => {
    // Determine the element type
    const Element = as || defaultElements[size];

    // Memoize class names for better performance
    const typographyClasses = useMemo(() => {
      return clsx(
        styles.typography,
        styles[`typography--${size}`],
        styles[`typography--${weight}`],
        styles[`typography--${variant}`],
        truncate && styles.typographyTruncate,
        align && styles[`typography--align-${align}`],
        lineClamp && styles[`typography--line-clamp-${lineClamp}`],
        className,
      );
    }, [size, weight, variant, truncate, align, lineClamp, className]);

    // Memoize styles for better performance
    const mergedStyle = useMemo(() => {
      if (!style) return undefined;
      return style;
    }, [style]);

    return (
      <Element
        ref={ref}
        className={typographyClasses}
        style={mergedStyle}
        data-size={size}
        data-weight={weight}
        data-variant={variant}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

Typography.displayName = "Typography";
