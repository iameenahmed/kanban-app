"use client";

import { useState } from "react";
import { MoreVerticalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type RowActionMenuProps = {
  selectedBoard: string;
  onDelete: () => void | Promise<void>;
  onEdit: () => void;
};

export const BoardActionMenu = ({
  selectedBoard,
  onDelete,
  onEdit,
}: RowActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
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
              disabled={!selectedBoard}
              onSelect={onEdit}
              className="text-medium-grey cursor-pointer font-medium focus:bg-transparent"
            >
              Edit Board
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!selectedBoard}
              onSelect={() => setIsOpen(true)}
              className="text-red focus:text-red-hover cursor-pointer font-medium focus:bg-transparent"
            >
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this Board?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {selectedBoard} board? This
              action will remove all columns and tasks and cannot be reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
