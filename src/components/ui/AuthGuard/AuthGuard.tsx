"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "src/context/AuthContext";

import styles from "./AuthGuard.module.scss";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className={styles.authGuardLoading} role="status" aria-live="polite">
        <div data-testid="spinner" className={styles.spinner}></div>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};
