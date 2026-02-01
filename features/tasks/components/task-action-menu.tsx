"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

import { deleteTask } from "../server/actions";

export const TaskActionMenu = ({
  setError,
}: {
  setError: (error: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("edit", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onDelete = async () => {
    const taskId = searchParams.get("task");
    const res = await deleteTask(taskId!);
    if (res.error) {
      setError(res.error);
    }
    if (res.success) {
      router.back();
    }
  };

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
              onSelect={onEdit}
              className="text-medium-grey cursor-pointer font-medium focus:bg-transparent"
            >
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setIsOpen(true)}
              className="text-red focus:text-red-hover cursor-pointer font-medium focus:bg-transparent"
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this Task?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the this task and its subtasks?
              This action cannot be reversed.
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
