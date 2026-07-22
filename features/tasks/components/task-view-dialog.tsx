'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TriangleAlertIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { TaskActionMenu } from './task-action-menu';
import { TaskWithSubtasks, Column } from '../types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  updateSubtaskCompletionStatus,
  updateTaskColumn,
} from '../server/actions';

type TaskDialogProps = {
  task: TaskWithSubtasks;
  columns: Column[];
};

export const TaskViewDialog = ({ task, columns }: TaskDialogProps) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [open, setOpen] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const handleClose = () => {
    setOpen(false);
    router.push(`/boards/${slug}`);
  };

  const handleCheckedChange = async (
    subtaskId: string,
    isCompleted: boolean,
  ) => {
    const res = await updateSubtaskCompletionStatus(subtaskId, isCompleted);
    if (res.error) {
      setError(res.error);
    }
    if (res.success) {
      router.refresh();
    }
  };

  const handleColumnChange = async (taskId: string, columnId: string) => {
    const res = await updateTaskColumn(taskId, columnId);
    if (res.error) {
      setError(res.error);
    }
    if (res.success) {
      router.refresh();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="border-0 p-8" showCloseButton={false}>
        <div className="absolute top-6 right-4">
          <TaskActionMenu setError={setError} taskId={task.id!} />
        </div>
        <DialogHeader>
          <DialogTitle className="w-8/10 text-lg">{task?.title}</DialogTitle>
          {task?.description && (
            <DialogDescription className="text-medium-grey mt-4 pr-2 text-sm leading-6 font-medium">
              {task.description}
            </DialogDescription>
          )}
        </DialogHeader>
        <FieldSet>
          <FieldGroup className="gap-y-1">
            <FieldLegend
              variant="label"
              className="text-medium-grey mt-2 font-bold"
            >
              Subtasks
            </FieldLegend>
            <ul className="list-none space-y-2">
              {task.subtasks.map(({ id, title, isCompleted }) => (
                <li key={id}>
                  <Field
                    orientation="horizontal"
                    className="bg-light-grey dark:bg-very-dark-grey gap-4 rounded-xs p-3"
                  >
                    <Checkbox
                      id={id}
                      checked={isCompleted}
                      onCheckedChange={() =>
                        handleCheckedChange(id!, !isCompleted)
                      }
                    />
                    <FieldLabel
                      htmlFor={id}
                      className={cn(
                        isCompleted
                          ? 'text-medium-grey line-through'
                          : 'text-sm font-bold text-black dark:text-white',
                      )}
                    >
                      {title}
                    </FieldLabel>
                  </Field>
                </li>
              ))}
            </ul>
          </FieldGroup>
          <Field>
            <FieldLabel className="text-medium-grey font-bold">
              Current Status
            </FieldLabel>
            <Select
              defaultValue={task.columnId}
              onValueChange={(columnId) =>
                handleColumnChange(task.id!, columnId)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {columns.map(({ id, title }) => (
                    <SelectItem key={id} value={id!}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldSet>

        {!!error && (
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};
