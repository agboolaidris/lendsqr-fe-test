"use client";

import { useSidebar } from "./sidebarProvider";
import clsx from "clsx";
import styles from "./sidebar.module.scss";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  CreditCard,
} from "lucide-react";
import { CompanyLogo } from "@ui/logo";

const navItems = [
  {
    title: "Users",
    children: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/dashboard/users", label: "Users", icon: Users },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/reports", label: "Reports", icon: FileText },
      { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },

  {
    title: "Settings",
    children: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/dashboard/users", label: "Users", icon: Users },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/reports", label: "Reports", icon: FileText },
      { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar({ className, ...props }: SidebarProps) {
  const { isOpen, isCollapsed, setIsOpen, isMobile } = useSidebar();

  const pathname = usePathname();

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(styles.overlay, isOpen && styles.overlayVisible)}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          styles.sidebar,
          isCollapsed && !isMobile && styles.collapsed,
          isOpen && styles.open,
          className,
        )}
        {...props}
      >
        <div className={styles.sidebarContent}>
          <nav className={styles.nav}>
            <div className={styles.navHeader}>
              {/* <div className={styles.logo}>
                <div className={styles.logoIcon}>D</div>
                {!isCollapsed && (
                  <span className={styles.logoText}>Dashboard</span>
                )}
              </div> */}
              <CompanyLogo type={isCollapsed ? "icon" : "full"} />
            </div>

            <div className={styles.navContent}>
              {navItems.map((group) => (
                <div key={group.title} className={styles.navGroup}>
                  {!isCollapsed && (
                    <div className={styles.navGroupTitle}>{group.title}</div>
                  )}
                  <ul className={styles.navList}>
                    {group.children.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <li key={item.href} className={styles.navItem}>
                          <Link
                            href={item.href}
                            className={clsx(
                              styles.navLink,
                              isActive && styles.navLinkActive,
                            )}
                            onClick={handleNavClick}
                          >
                            <Icon className={styles.navIcon} />
                            {!isCollapsed && (
                              <span className={styles.navLabel}>
                                {item.label}
                              </span>
                            )}
                            {isActive && (
                              <div className={styles.activeIndicator} />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
