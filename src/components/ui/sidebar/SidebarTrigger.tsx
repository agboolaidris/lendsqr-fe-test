"use client";

import { useSidebar } from "./sidebarProvider";
import { Menu } from "lucide-react";
import { Button } from "@ui/button";

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
      <Menu size={18} />
    </Button>
  );
}
