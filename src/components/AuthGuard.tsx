"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "src/context/AuthContext";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) return <div>Loading...</div>;

  return <>{children}</>;
};
