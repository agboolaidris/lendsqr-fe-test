"use client";

import { DashboardIcon } from "@icons/Dashboard";
import { SidebarGuarantorIcon, SidebarUserIcon } from "@icons/User";
import { CompanyLogo } from "@ui/CompanyLogo";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useCallback, useMemo } from "react";

import styles from "./Sidebar.module.scss";
import { SidebarOrganizationDropdown } from "./SidebarOrganizationDropdown";
import { useSidebar } from "./SidebarProvider";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavGroup {
  title?: string;
  children: NavItem[];
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const NAV_ITEMS: NavGroup[] = [
  {
    children: [{ href: "/", label: "Dashboard", icon: DashboardIcon }],
  },
  {
    title: "Users",
    children: [
      { href: "/users", label: "Users", icon: SidebarUserIcon },
      { href: "#", label: "Guarantors", icon: SidebarGuarantorIcon },
      { href: "#", label: "Loans", icon: DashboardIcon },
      { href: "#", label: "Decision Models", icon: DashboardIcon },
      { href: "#", label: "Savings", icon: SidebarGuarantorIcon },
      { href: "#", label: "Loan Requests", icon: SidebarUserIcon },
    ],
  },
];

const NavGroupItem = memo(function NavGroupItem({
  group,
  isCollapsed,
  pathname,
  handleNavClick,
}: {
  group: NavGroup;
  isCollapsed: boolean;
  pathname: string;
  handleNavClick: () => void;
}) {
  return (
    <div className={styles.navGroup}>
      {!isCollapsed && group.title && (
        <div className={styles.navGroupTitle}>{group.title}</div>
      )}
      <ul className={styles.navList}>
        {group.children.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href + item.label} className={styles.navItem}>
              <Link
                href={item.href}
                className={clsx(
                  styles.navLink,
                  isActive && styles.navLinkActive,
                )}
                onClick={handleNavClick}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={styles.navIcon} aria-hidden="true" />
                {!isCollapsed && (
                  <span className={styles.navLabel}>{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

NavGroupItem.displayName = "NavGroupItem";

// Main Sidebar Component
export const Sidebar = memo(function Sidebar({
  className,
  ...props
}: SidebarProps) {
  const { isOpen, isCollapsed, setIsOpen, isMobile } = useSidebar();
  const pathname = usePathname();

  // Memoized event handlers
  const handleOverlayClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleNavClick = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen]);

  // Memoized navigation groups
  const navGroups = useMemo(
    () =>
      NAV_ITEMS.map((group, idx) => (
        <NavGroupItem
          key={idx + (group.title || "")}
          group={group}
          isCollapsed={isCollapsed}
          pathname={pathname}
          handleNavClick={handleNavClick}
        />
      )),
    [isCollapsed, pathname, handleNavClick],
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(styles.overlay, isOpen && styles.overlayVisible)}
        onClick={handleOverlayClick}
        aria-hidden="true"
        role="presentation"
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          styles.sidebar,
          isCollapsed && !isMobile && styles.collapsed,
          isOpen && styles.open,
          className,
        )}
        aria-label="Main navigation"
        {...props}
      >
        <div className={styles.sidebarContent}>
          <nav className={styles.nav} aria-label="Primary">
            <div className={styles.navHeader}>
              <CompanyLogo type={isCollapsed ? "icon" : "full"} />
            </div>

            <div className={styles.navOrganization}>
              <SidebarOrganizationDropdown collapse={isCollapsed} />
            </div>

            <div className={styles.navContent} role="navigation">
              {navGroups}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
