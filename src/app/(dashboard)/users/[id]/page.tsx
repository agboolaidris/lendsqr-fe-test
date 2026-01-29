"use client";
import { useUser } from "@hooks/useUsers";
import { MoveLeftIcon } from "@icons/Move";
import { Button } from "@ui/Button";
import { Typography } from "@ui/Typography";
import { useParams, useRouter } from "next/navigation";

import { UserInformation } from "./components/UserInformation";
import { UserSummary } from "./components/UserSummary";
import styles from "./page.module.scss";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useUser(id!);
  return (
    <main className={styles.page}>
      {/* Back */}
      <Button
        variant="ghost"
        className={styles.backButton}
        onClick={() => router.replace("/users")}
      >
        <MoveLeftIcon />
        Back to Users
      </Button>

      {/* Header */}
      <section className={styles.header}>
        <Typography weight="medium" size="2xl">
          User Details
        </Typography>

        <div className={styles.headerActions}>
          <Button variant="danger-outline">Blacklist User</Button>
          <Button variant="primary-outline">Activate User</Button>
        </div>
      </section>

      {/* Summary */}
      <section className={styles.section}>
        <UserSummary loading={isLoading} user={data} />
      </section>

      {/* Information */}
      <section className={styles.section}>
        <UserInformation loading={isLoading} user={data} />
      </section>
    </main>
  );
};

export default Page;
