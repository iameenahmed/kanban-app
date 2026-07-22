import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { PanelsLeftBottom, PlusIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BoardsList } from "@/features/boards/components/boards-list";
import { BoardsListSkeleton } from "@/features/boards/components/boards-list-skeleton";
import { fetchBoards } from "@/features/boards/server/actions";
import { ThemeToggle } from "./theme-toggle";

const AsyncBoardsList = async () => {
  const result = await fetchBoards();
  const boards = result.error ? [] : result.data || [];
  return <BoardsList boards={boards} />;
};

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <Image
          src="/logo-dark.svg"
          alt="Kanban"
          width={153}
          height={26}
          className="block dark:hidden"
        />
        <Image
          src="/logo-light.svg"
          alt="Kanban"
          width={153}
          height={26}
          className="hidden dark:block"
        />
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <Suspense fallback={<BoardsListSkeleton />}>
          <AsyncBoardsList />
        </Suspense>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="hover:text-purple-hover text-purple h-12 cursor-pointer pl-6 hover:bg-transparent"
          >
            <Link href="/boards/new">
              <PanelsLeftBottom />
              <div className="flex items-center">
                <PlusIcon className="size-3" />
                Create New Board
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter className="mb-6 w-full md:mb-20">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};
