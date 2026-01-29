import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonVariant =
  | "primary"
  | "ghost"
  | "primary-outline"
  | "neutral-outline"
  | "danger-outline";

type ButtonSize = "icon" | "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  size = "md",
  variant = "primary",
  loading = false,
  asChild = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={clsx(
        styles.button,
        styles[`button--${size}`],
        styles[`button--${variant}`],
        loading && styles["button--loading"],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className={styles.content}>
        {loading && (
          <svg
            className="spinner"
            width="16"
            height="16"
            viewBox="0 0 50 50"
            fill="none"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
            />
          </svg>
        )}
        {children}
      </span>
    </Component>
  );
}
