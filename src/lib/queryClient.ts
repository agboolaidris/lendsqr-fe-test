// lib/queryClient.ts
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";

// Configure the default cache time for queries
const CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_TIME,
    },
  },
});

// Create a persister that uses localStorage
// This is a client-side only function, so it needs to be used correctly in Next.js
export const localStoragePersister =
  typeof window !== "undefined"
    ? createSyncStoragePersister({ storage: window.localStorage })
    : null;
