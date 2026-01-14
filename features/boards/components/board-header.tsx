"use client";

import { usePathname } from "next/navigation";
import { PlusIcon, MoreVerticalIcon } from "lucide-react";

import { slugToName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const BoardHeader = () => {
  const pathname = usePathname();
  const selectedBoard = slugToName(pathname.split("/")[2]);

  return (
    <div className="flex h-20 w-full items-center justify-between bg-white px-6">
      <h1 className="text-2xl">{selectedBoard}</h1>
      <div className="flex items-center gap-3">
        <Button className="w-41 rounded-full font-bold">
          <PlusIcon />
          <span>Add New Task</span>
        </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Open menu"
              className="rounded-full"
            >
              <MoreVerticalIcon className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-3 h-24 w-48 p-4" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {}}
                className="text-medium-grey cursor-pointer font-medium"
              >
                Edit Board
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {}}
                className="text-red focus:text-red-hover cursor-pointer font-medium"
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
