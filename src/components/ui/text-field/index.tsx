"use client";

import React, { useId } from "react";
import clsx from "clsx";
import styles from "./text-field.module.scss";

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  addon?: React.ReactNode;
  labelClassName?: string;
  wrapperClassName?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      addon,
      labelClassName,
      wrapperClassName,
      className,
      id: externalId,
      size = "md",
      fullWidth = true,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId || generatedId;

    return (
      <div
        className={clsx(
          styles.field,
          fullWidth && styles.fieldFullWidth,
          wrapperClassName,
        )}
      >
        {(label || hint) && (
          <div className={styles.header}>
            {label && (
              <label
                htmlFor={id}
                className={clsx(styles.label, labelClassName)}
              >
                {label}
                {props.required && (
                  <span className={styles.requiredMark}>*</span>
                )}
              </label>
            )}

            {hint && !error && <span className={styles.hint}>{hint}</span>}
          </div>
        )}

        <div className={styles.control}>
          {leftIcon && (
            <div className={styles.leftIcon} aria-hidden="true">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={clsx(
              styles.input,
              styles[`input--${size}`],
              leftIcon && styles.inputHasLeftIcon,
              rightIcon && styles.inputHasRightIcon,
              error && styles.inputError,
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </div>

        {error && (
          <div
            id={`${id}-error`}
            className={styles.error}
            role="alert"
            aria-live="assertive"
          >
            <span>{error}</span>
          </div>
        )}

        {addon && <div className={styles.addon}>{addon}</div>}
      </div>
    );
  },
);

TextField.displayName = "TextField";
