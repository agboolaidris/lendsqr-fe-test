"use client";

import { BellIcon } from "@icons/Bell";
import { ChevronDownIcon } from "@icons/Chevron";
import { LogOutIcon } from "@icons/Logout";
import { SearchIcon } from "@icons/Search";
import { SettingIcon } from "@icons/Setting";
import { UserIcon } from "@icons/User";
import { Avatar } from "@ui/Avatar";
import { Button } from "@ui/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@ui/Dropdown";
import { TextField } from "@ui/TextField";
import { useCallback, useState } from "react";
import { useAuth } from "src/context/AuthContext";

import { SidebarTrigger } from "../Sidebar";
import styles from "./DashboardHeader.module.scss";

export function DashboardHeader() {
  const [notificationCount, setNotificationCount] = useState(3);

  const { logout } = useAuth();

  const user = {
    name: "Agboola Idris",
    avatar: undefined,
  };

  const handleNotificationClick = useCallback(() => {
    // Open notifications panel
    console.log("Opening notifications");
    setNotificationCount(0); // Mark all as read
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleSettings = useCallback(() => {
    // Navigate to settings
    console.log("Opening settings");
  }, []);

  const handleProfile = useCallback(() => {
    // Navigate to profile
    console.log("Opening profile");
  }, []);

  return (
    <header className={styles.dashboardHeader}>
      {/* Left section */}
      <div className={styles.leftSection}>
        <SidebarTrigger className={styles.sidebarTrigger} />

        <div className={styles.searchContainer}>
          <TextField
            leftIcon={<SearchIcon width={14} height={14} />}
            placeholder="Search..."
            size="sm"
            className={styles.searchField}
          />
        </div>
      </div>

      {/* Right section */}
      <div className={styles.rightSection}>
        <div className={styles.notificationWrapper}>
          <Button
            variant="ghost"
            size="icon"
            className={styles.notificationButton}
            onClick={handleNotificationClick}
            aria-label={`Notifications (${notificationCount} unread)`}
            data-count={notificationCount > 0 ? notificationCount : undefined}
          >
            <BellIcon className={styles.notificationIcon} />
            {notificationCount > 0 && (
              <span className={styles.notificationBadge} aria-hidden="true">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Button>
        </div>

        {/* User dropdown */}
        <Dropdown>
          <DropdownTrigger className={styles.userDropdownTrigger}>
            <div className={styles.userProfile}>
              <Avatar
                src={user?.avatar}
                alt={user.name}
                size="sm"
                className={styles.userAvatar}
                interactive
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
              </div>
              <ChevronDownIcon className={styles.chevronIcon} />
            </div>
          </DropdownTrigger>

          <DropdownContent align="end" sideOffset={8}>
            <DropdownGroup>
              <DropdownLabel>Account</DropdownLabel>
              <DropdownItem
                onSelect={handleProfile}
                className={styles.dropdownItem}
              >
                <UserIcon className={styles.dropdownItemIcon} />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem
                onSelect={handleSettings}
                className={styles.dropdownItem}
              >
                <SettingIcon className={styles.dropdownItemIcon} />
                <span>Settings</span>
              </DropdownItem>
            </DropdownGroup>

            <DropdownSeparator />

            <DropdownItem
              onSelect={handleLogout}
              className={`${styles.dropdownItem} ${styles.logoutItem}`}
            >
              <LogOutIcon className={styles.dropdownItemIcon} />
              <span>Logout</span>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
}
