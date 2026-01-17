"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelsLeftBottom } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Board } from "../types";

export const BoardsList = ({ boards }: { boards: Board[] }) => {
  const pathname = usePathname();
  const selected = pathname.split("/")[2];

  return (
    <SidebarGroup className="p-0 pr-6">
      <SidebarGroupLabel className="text-medium-grey pl-6 text-xs font-bold">
        {`ALL BOARDS (${boards?.length || 0})`}
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu>
          {boards.map((board) => (
            <SidebarMenuItem key={board.id}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "text-medium-grey h-12 cursor-pointer rounded-r-full pl-6",
                  board.slug === selected
                    ? "bg-purple hover:bg-purple-hover text-white hover:text-white"
                    : "hover:bg-light-grey hover:text-purple",
                )}
              >
                <Link href={`/boards/${board.slug}`}>
                  <PanelsLeftBottom />
                  {board.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
