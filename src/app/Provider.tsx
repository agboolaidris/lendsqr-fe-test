"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import { AuthProvider } from "src/context/AuthContext";
import { localStoragePersister, queryClient } from "src/lib/queryClient";

type Props = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  if (!localStoragePersister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export const RootProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
