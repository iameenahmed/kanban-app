"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TaskForm } from "./task-form";
import { TaskWithSubtasks, Column } from "../types";

type TaskDialogProps = {
  isOpen: boolean;
  mode?: "create" | "edit" | "view";
  task?: TaskWithSubtasks | null;
  columns: Column[];
};

export const TaskDialog = ({
  isOpen,
  mode,
  task,
  columns,
}: TaskDialogProps) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={() => router.back()}>
      <DialogContent className="border-0" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm isEditing={mode === "edit"} task={task} columns={columns} />
      </DialogContent>
    </Dialog>
  );
};
