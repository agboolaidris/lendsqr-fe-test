"use client";

import { ChevronDownIcon } from "@icons/Chevron";
import { OrganizationIcon } from "@icons/Organization";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@ui/Dropdown";
import React from "react";

import styles from "./Sidebar.module.scss";
const organizations = [
  { name: "Organization 1", id: 1 },
  { name: "Organization 2", id: 2 },
  { name: "Organization 3", id: 3 },
];

type Props = {
  collapse?: boolean;
};

export const SidebarOrganizationDropdown: React.FC<Props> = ({ collapse }) => {
  return (
    <Dropdown>
      <DropdownTrigger className={styles.trigger}>
        <OrganizationIcon className={styles.icon} />
        {!collapse && (
          <>
            <span>Select Organization</span>
            <ChevronDownIcon className={styles.icon} />
          </>
        )}
      </DropdownTrigger>

      <DropdownContent className={styles.content} align="center">
        {organizations.map((org) => (
          <DropdownItem key={org.id}>{org.name}</DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
