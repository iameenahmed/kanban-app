'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PlusIcon, TriangleAlertIcon, XIcon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { TaskFormSchema, TaskFormSchemaTypes } from '../schema';
import { TaskWithSubtasks, Column } from '../types';
import {
  createTaskWithSubtasks,
  editTaskWithSubtasks,
} from '../server/actions';

type TaskFormProps = {
  isEditing: boolean;
  task?: TaskWithSubtasks | null;
  columns: Column[];
};

export const TaskFormDialog = ({ isEditing, task, columns }: TaskFormProps) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [open, setOpen] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const handleClose = () => {
    setOpen(false);
    router.push(`/boards/${slug}`);
  };

  const form = useForm<TaskFormSchemaTypes>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      subtasks: task?.subtasks || [{ title: '' }],
      columnId: task?.columnId || columns[0]?.id || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  });

  const onSubmit = async (values: TaskFormSchemaTypes) => {
    const res =
      isEditing && task
        ? await editTaskWithSubtasks(values, task.id!)
        : await createTaskWithSubtasks(values);
    if (res.error) {
      setError(res.error);
    }
    if (res.success) {
      router.refresh();
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="gap-y-6 border-0" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium-grey text-sm font-bold">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Take coffee break"
                      className="placeholder:text-medium-grey text-sm font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium-grey text-sm font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g. It's always good to take a break"
                      className="placeholder:text-medium-grey text-sm font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="text-medium-grey text-sm font-bold">Subtasks</div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex w-full items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`subtasks.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. Make coffee"
                            className="placeholder:text-medium-grey text-sm font-medium"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => remove(index)}
                  >
                    <XIcon
                      className="text-medium-grey size-6 stroke-4"
                      absoluteStrokeWidth
                    />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="secondary"
              className="w-full rounded-full text-sm font-bold"
              onClick={() => append({ title: '' })}
            >
              <PlusIcon className="size-4" />
              Add New SubTask
            </Button>

            <FormField
              control={form.control}
              name="columnId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium-grey text-sm font-bold">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!!error && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <Button type="submit" className="w-full rounded-full">
              {isEditing ? 'Save Changes' : 'Create New Task'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
