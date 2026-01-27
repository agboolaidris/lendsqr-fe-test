import React from "react";
import clsx from "clsx";
import styles from "./user-statistic-card.module.scss";

export type UserStatisticCardVariant = "purple" | "indigo" | "orange" | "pink";

export type UserStatisticCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: UserStatisticCardVariant;
  className?: string;
};

export const UserStatisticCard: React.FC<UserStatisticCardProps> = ({
  label,
  value,
  icon,
  variant = "purple",
  className,
}) => {
  return (
    <div className={clsx(styles.card, className)}>
      {icon && (
        <div className={clsx(styles.icon, styles[`icon--${variant}`])}>
          {icon}
        </div>
      )}

      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
