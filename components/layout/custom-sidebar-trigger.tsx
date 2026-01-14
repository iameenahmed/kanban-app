"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";

export const CustomSidebarTrigger = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <div className="absolute bottom-8 left-0 z-100 hidden md:block">
      <Button
        variant="ghost"
        asChild
        className="text-medium-grey hover:bg-purple/10 hover:text-purple cursor-pointer rounded-l-none rounded-r-full border-0"
        onClick={toggleSidebar}
      >
        {open ? (
          <div className="flex h-12 w-69 items-center justify-start gap-2">
            <EyeOffIcon className="ml-4 h-4 w-4.5" />
            <span>Hide Sidebar</span>
          </div>
        ) : (
          <div className="bg-purple hover:bg-purple-hover w-14 text-white">
            <EyeIcon className="h-4 w-4.5" />
            <span className="sr-only">Show Sidebar</span>
          </div>
        )}
      </Button>
    </div>
  );
};
