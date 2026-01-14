"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { PlusIcon, MoreVerticalIcon, ChevronDown } from "lucide-react";

import { slugToName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

export const BoardHeader = () => {
  const pathname = usePathname();
  const selectedBoard = slugToName(pathname.split("/")[2]);
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <div className="dark:bg-dark-grey flex h-16 w-full items-center justify-between bg-white pl-3 md:h-20 md:px-6">
      <div className="flex items-center">
        <Image
          className="mr-3 md:hidden"
          src="/logo-mobile.svg"
          alt="kanban logo"
          width={24}
          height={25}
        />
        <button
          onClick={toggleSidebar}
          disabled={!isMobile}
          aria-label="open sidebar"
          aria-hidden={!isMobile}
          className="flex items-center gap-1"
        >
          <h1 className="text-lg md:text-xl">{selectedBoard}</h1>
          <ChevronDown className="text-purple size-4 font-bold md:hidden" />
        </button>
      </div>
      <div className="flex items-center md:gap-3">
        <Button className="h-8 w-12 rounded-full font-bold md:h-12 md:w-41">
          <PlusIcon />
          <span className="hidden md:block">Add New Task</span>
        </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Open menu"
              className="rounded-full"
            >
              <MoreVerticalIcon className="size-5 md:size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="dark:bg-very-dark-grey h-24 w-48 border-0 p-4 md:mt-2.5"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {}}
                className="text-medium-grey cursor-pointer font-medium focus:bg-transparent"
              >
                Edit Board
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {}}
                className="text-red focus:text-red-hover cursor-pointer font-medium focus:bg-transparent"
              >
                Delete Board
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
