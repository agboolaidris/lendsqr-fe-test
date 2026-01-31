import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./Avatar.module.scss";

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Image source URL */
  src?: string;
  /** Alt text for the image - also used for fallback initials */
  alt: string;
  /** Size of the avatar */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Shape of the avatar */
  shape?: "circle" | "square";
  /** CSS class name */
  className?: string;
  /** Whether the avatar has a border */
  bordered?: boolean;
  /** Whether the avatar is interactive (clickable) */
  interactive?: boolean;
  /** Loading behavior for Next.js Image */
  loading?: "lazy" | "eager";
}

/**
 * Extract initials from alt text
 * Example: "Agboola Idris" -> "AI"
 */
const getInitials = (alt: string): string => {
  if (!alt) return "U";

  const words = alt.trim().split(/\s+/);
  if (words.length === 0) return "U";

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export function Avatar({
  src,
  alt,
  size = "md",
  shape = "circle",
  className,
  bordered = false,
  interactive = false,
  loading = "lazy",
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const showFallback = !src || hasError;
  const initials = getInitials(alt);

  const handleImageError = () => {
    setHasError(true);
  };

  const avatarClasses = clsx(
    styles.avatar,
    styles[`avatar--${size}`],
    styles[`avatar--${shape}`],
    bordered && styles.avatarBordered,
    interactive && styles.avatarInteractive,
    showFallback && styles.avatarFallback,
    className,
  );

  return (
    <div
      className={avatarClasses}
      role={interactive ? "button" : "img"}
      aria-label={alt}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {showFallback ? (
        <span className={styles.avatarInitials}>{initials}</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.avatarImage}
          onError={handleImageError}
          loading={loading}
          sizes={`${size === "xl" ? "56px" : size === "lg" ? "48px" : size === "md" ? "40px" : size === "sm" ? "32px" : "24px"}`}
        />
      )}
    </div>
  );
}
