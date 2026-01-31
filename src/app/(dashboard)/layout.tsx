"use client";

import { AuthGuard } from "@ui/AuthGuard";

import { DashboardHeader } from "./components/DashboardHeader";
import { Sidebar, SidebarInset, SidebarProvider } from "./components/Sidebar";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className={styles.dashboard}>
          <Sidebar />
          <SidebarInset>
            <header className={styles.header}>
              <DashboardHeader />
            </header>
            <main className={styles.main}>{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
