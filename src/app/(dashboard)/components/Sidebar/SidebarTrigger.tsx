"use client";

import { MenuIcon } from "@icons/Menu";
import { Button } from "@ui/Button";

import { useSidebar } from "./SidebarProvider";

type SidebarTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggleOpen, toggleCollapse, isCollapsed, isMobile } = useSidebar();

  const handleClick = () => {
    if (isMobile) {
      toggleOpen();
    } else {
      toggleCollapse();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant="ghost"
      size="icon"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      {...props}
    >
      <MenuIcon width={18} height={18} />
    </Button>
  );
}
