"use client";

import { useState } from "react";
import { PlusIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { TaskFormSchema, TaskFormSchemaTypes } from "../schema";
import { TaskWithSubtasks, Column } from "../types";

type TaskFormProps = {
  isEditing: boolean;
  task?: TaskWithSubtasks | null;
  columns: Column[];
};

export const TaskForm = ({ isEditing, task, columns }: TaskFormProps) => {
  const [error, setError] = useState<string | undefined>();

  const form = useForm<TaskFormSchemaTypes>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      subtasks: task?.subtasks || [{ title: "" }],
      columnId: columns[0]?.id || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const onSubmit = async (values: unknown) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Take coffee break" />
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
              <FormLabel className="text-sm font-bold">Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g. Take coffee break" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="text-sm">Subtasks</div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-full items-center gap-2">
              <FormField
                control={form.control}
                name={`subtasks.${index}.title`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="e.g. Make coffee" />
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

        {!!error && (
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <Button
          variant="secondary"
          className="w-full rounded-full text-sm font-bold"
          onClick={() => append({ title: "" })}
        >
          <PlusIcon className="size-4" />
          Add New SubTask
        </Button>

        <FormField
          control={form.control}
          name="columnId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
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

        <Button type="submit" className="w-full rounded-full">
          {isEditing ? "Save Changes" : "Create New Task"}
        </Button>
      </form>
    </Form>
  );
};
