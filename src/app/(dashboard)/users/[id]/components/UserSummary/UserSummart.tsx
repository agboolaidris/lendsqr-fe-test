"use client";

import { useParams } from "@hooks/useParams";
import { StarIcon } from "@icons/Star";
import { Avatar } from "@ui/Avatar";
import { Typography } from "@ui/Typography";
import { User } from "src/@types/user";

import styles from "./UserSummary.module.scss";

type TabType = "general" | "documents" | "bank" | "loans" | "savings" | "app";

const tabs: Array<{ id: TabType; label: string }> = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

type UserSummaryProps = {
  user?: User;
  loading?: boolean;
};

export const UserSummary: React.FC<UserSummaryProps> = ({
  user,
  loading,
}: UserSummaryProps) => {
  const { setParams, params } = useParams<{ tab: TabType }>();
  const activeTab: TabType = params.tab || "general";
  if (loading) return <UserSummarySkeleton />;

  const renderStars = (tier: number) => {
    const totalStars = 3;
    return (
      <div className={styles.stars}>
        {Array.from({ length: totalStars }).map((_, index) => (
          <span
            key={index}
            className={`${styles.star} ${index < tier ? styles.filled : ""}`}
          >
            <StarIcon
              width={12}
              height={12}
              fill={index < tier ? "currentColor" : "none"}
            />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.userSummaryContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <Avatar
            src=""
            alt={user?.full_name ?? "NA"}
            size="lg"
            className={styles.avatar}
          />

          <div className={styles.userInfo}>
            <Typography size="xl" variant="secondary" as="h1" weight="semibold">
              {user?.full_name}
            </Typography>
            <Typography size="sm">{user?.id}</Typography>
          </div>
        </div>

        <div className={styles.seperator} />

        <div className={styles.tierSection}>
          <Typography size="sm">User’ s Tier</Typography>
          <div className={styles.userTier}>
            {renderStars(user?.account_summary?.user_tier ?? 0)}
          </div>
        </div>

        <div className={styles.seperator} />

        <div className={styles.accountSection}>
          <Typography variant="secondary" size="xl" weight="semibold">
            {user?.account_summary?.balance}
          </Typography>
          <Typography size="sm" variant="secondary">
            {user?.bank?.account_number}/{user?.bank?.bank_name}
          </Typography>
        </div>
      </div>

      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabItem} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setParams({ tab: tab.id })}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ================= SKELETON ================= */

export const UserSummarySkeleton = () => {
  return (
    <div className={styles.userSummaryContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <div className={`${styles.skeleton} ${styles.skeletonAvatar}`} />

          <div className={styles.userInfo}>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          </div>
        </div>

        <div className={styles.seperator} />

        <div className={styles.tierSection}>
          <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          <div className={styles.userTier}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.skeletonStar}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.seperator} />

        <div className={styles.accountSection}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeleton} ${styles.skeletonText}`} />
        </div>
      </div>

      <div className={styles.tabsList}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.skeleton} ${styles.skeletonTab}`} />
        ))}
      </div>
    </div>
  );
};
