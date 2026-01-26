import React from "react";
import clsx from "clsx";
import styles from "./sidebar.module.scss";
import { useSidebar } from "./sidebarProvider";

type Props = { children: React.ReactNode };

export const SidebarInset = ({ children }: Props) => {
  const { isMobile, isCollapsed } = useSidebar();

  return (
    <div
      className={clsx(
        styles.sidebarInsect,
        !isMobile && isCollapsed && styles.sidebarInsectCollapsed,
      )}
    >
      {children}
    </div>
  );
};
