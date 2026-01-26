"use client";

import React, { useState, useCallback } from "react";
import { SidebarTrigger } from "@ui/sidebar/";

import { Dropdown } from "@ui/dropdown";
import { Avatar } from "@ui/avatar";
import { Button } from "@ui/button";
import {
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  SearchIcon,
} from "lucide-react";
import styles from "./dashboard-header.module.scss";
import {
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownGroup,
  DropdownLabel,
} from "@ui/dropdown";
import { TextField } from "@ui/text-field";

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const user = {
    name: "Agboola Idris",
    avatar: undefined,
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      // Search logic would go here
      console.log("Searching for:", value);
    },
    [],
  );

  const handleSearchClear = useCallback(() => {
    setSearchQuery("");
    console.log("Search cleared");
  }, []);

  const handleNotificationClick = useCallback(() => {
    // Open notifications panel
    console.log("Opening notifications");
    setNotificationCount(0); // Mark all as read
  }, []);

  const handleLogout = useCallback(() => {
    // Logout logic
    console.log("Logging out");
  }, []);

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
            leftIcon={<SearchIcon size={14} />}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            size="sm"
            className={styles.searchField}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
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
            <Bell className={styles.notificationIcon} />
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
              <ChevronDown className={styles.chevronIcon} />
            </div>
          </DropdownTrigger>

          <DropdownContent align="end" sideOffset={8}>
            <DropdownGroup>
              <DropdownLabel>Account</DropdownLabel>
              <DropdownItem
                onSelect={handleProfile}
                className={styles.dropdownItem}
              >
                <User className={styles.dropdownItemIcon} />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem
                onSelect={handleSettings}
                className={styles.dropdownItem}
              >
                <Settings className={styles.dropdownItemIcon} />
                <span>Settings</span>
              </DropdownItem>
            </DropdownGroup>

            <DropdownSeparator />

            <DropdownItem
              onSelect={handleLogout}
              className={`${styles.dropdownItem} ${styles.logoutItem}`}
            >
              <LogOut className={styles.dropdownItemIcon} />
              <span>Logout</span>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
}
