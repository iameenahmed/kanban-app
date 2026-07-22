"use client";

import { PanelsLeftBottom } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const BoardsListSkeleton = () => {
  return (
    <SidebarGroup className="p-0 pr-6">
      <SidebarGroupLabel className="text-medium-grey pl-6 text-xs font-bold">
        ALL BOARDS (...)
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu>
          {Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                disabled
                className="h-12 rounded-r-full pl-6 pointer-events-none"
              >
                <PanelsLeftBottom className="text-medium-grey/40" />
                <Skeleton className="h-4 w-28 rounded-sm" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
