import Image from "next/image";
import { MoonStar, Sun } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { BoardsList } from "@/features/boards/components/boards-list";
import { fetchBoards } from "@/features/boards/server/actions";

export const AppSidebar = async () => {
  const boards = await fetchBoards();

  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="bg-white p-6">
        <Image src="/logo-dark.svg" alt="Kanban" width={153} height={26} />
      </SidebarHeader>
      <SidebarContent className="bg-white pt-4">
        <BoardsList boards={boards} />
      </SidebarContent>
      <SidebarFooter className="absolute bottom-20 w-full bg-white">
        <Button
          className="text-medium-grey bg-light-grey hover:bg-light-grey mx-4"
          asChild
        >
          <div className="cursor-pointer">
            <Label htmlFor="toggle-theme">
              <Sun />
            </Label>
            <Switch id="toggle-theme" className="bg-purple mx-2" />
            <Label htmlFor="toggle-theme">
              <MoonStar />
            </Label>
          </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
