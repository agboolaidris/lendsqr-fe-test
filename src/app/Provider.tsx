"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "src/context/AuthContext";
import { queryClient } from "src/lib/queryClient";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
