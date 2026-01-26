"use client";

import { SidebarProvider, Sidebar, SidebarInset } from "@ui/sidebar";
import styles from "./dashboard-layout.module.scss";
import { DashboardHeader } from "./components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
