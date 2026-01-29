"use client";
import { Typography } from "@ui/Typography";
import clsx from "clsx";
import { User } from "src/@types/user";

import styles from "./UserInformation.module.scss";

interface UserInformationProps {
  user?: User;
  loading?: boolean;
}

export const UserInformation = ({ user, loading }: UserInformationProps) => {
  if (loading) return <UserInformationSkeleton />;

  const guarantors = user?.guarantors ?? [];
  const e = user?.education_and_employment;
  const s = user?.socials;

  return (
    <div className={styles.detailsContainer}>
      <Section title="Personal Information">
        <InfoRow label="FULL NAME" value={user?.full_name} />
        <InfoRow label="PHONE NUMBER" value={user?.phone_number} />
        <InfoRow label="EMAIL ADDRESS" value={user?.email_address} />
        <InfoRow label="BVN" value={user?.bvn} />
        <InfoRow label="GENDER" value={user?.gender} />
        <InfoRow label="MARITAL STATUS" value={user?.marital_status} />
        <InfoRow label="CHILDREN" value={user?.children} />
        <InfoRow label="TYPE OF RESIDENCE" value={user?.type_of_residence} />
      </Section>

      <Divider />

      <Section title="Education and Employment">
        <InfoRow label="LEVEL OF EDUCATION" value={e?.level_of_education} />
        <InfoRow label="EMPLOYMENT STATUS" value={e?.employment_status} />
        <InfoRow label="SECTOR OF EMPLOYMENT" value={e?.sector_of_employment} />
        <InfoRow
          label="DURATION OF EMPLOYMENT"
          value={e?.duration_of_employment}
        />
        <InfoRow label="OFFICE EMAIL" value={e?.office_email} />
        <InfoRow
          label="MONTHLY INCOME"
          value={
            e?.max_monthly_income && e?.min_monthly_income
              ? `${e?.max_monthly_income} - ${e?.min_monthly_income}`
              : "—"
          }
        />
        <InfoRow label="LOAN REPAYMENT" value={e?.loan_repayment} />
      </Section>

      <Divider />

      <Section title="Socials">
        <InfoRow label="TWITTER" value={s?.twitter} />
        <InfoRow label="FACEBOOK" value={s?.facebook} />
        <InfoRow label="INSTAGRAM" value={s?.instagram} />
      </Section>

      <Divider />

      <Section title="Guarantors" asChild>
        {guarantors.length === 0 && (
          <Typography size="sm">No guarantor added</Typography>
        )}

        {guarantors.map((g, i) => (
          <div
            key={i}
            className={clsx(styles.guarantorBlock, styles.sectionContent)}
          >
            <InfoRow label="FULL NAME" value={g.full_name} />
            <InfoRow label="PHONE NUMBER" value={g.phone_number} />
            <InfoRow label="EMAIL ADDRESS" value={g.email_address} />
            <InfoRow label="RELATIONSHIP" value={g.relationship} />
          </div>
        ))}
      </Section>
    </div>
  );
};

function Section({
  title,
  children,
  asChild,
}: {
  title: string;
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <section className={styles.section}>
      <Typography weight="semibold" variant="secondary" size="lg" as="h2">
        {title}
      </Typography>
      {asChild ? (
        children
      ) : (
        <div className={styles.sectionContent}>{children}</div>
      )}
    </section>
  );
}

function Divider() {
  return <div className={styles.divider} />;
}

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value || "—"}</span>
    </div>
  );
}

export function UserInformationSkeleton() {
  return (
    <div className={styles.detailsContainer}>
      {[8, 7, 3, 4].map((count, sectionIndex) => (
        <div key={sectionIndex}>
          <section className={styles.section}>
            <div
              className={`${styles.skeleton} ${styles.skeletonValue}`}
              style={{ width: 180 }}
            />

            <div className={styles.sectionContent}>
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={styles.infoRow}>
                  <div
                    className={`${styles.skeleton} ${styles.skeletonLabel}`}
                  />
                  <div
                    className={`${styles.skeleton} ${styles.skeletonValue}`}
                  />
                </div>
              ))}
            </div>
          </section>

          {sectionIndex !== 3 && <Divider />}
        </div>
      ))}
    </div>
  );
}
