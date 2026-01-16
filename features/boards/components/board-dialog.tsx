"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { BoardFormSchema, BoardFormSchemaTypes } from "../schema";
import { createBoard } from "../server/actions";

type BoardDialogProps = {
  isEditing?: boolean;
};

export const BoardDialog = ({ isEditing = false }: BoardDialogProps) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();

  const form = useForm<BoardFormSchemaTypes>({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {
      board_name: "",
      columns: [
        { column_title: "Todo" },
        { column_title: "Doing" },
        { column_title: "Done" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = async (values: BoardFormSchemaTypes) => {
    const res = await createBoard(values);

    if (res.error) {
      setError(res.error);
      return;
    }

    router.push(`/boards/${res.slug}`);
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="border-0" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Board" : "Add New Board"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="board_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Web Design" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="text-sm">Columns</div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex w-full items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`columns.${index}.column_title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Stage name" />
                        </FormControl>
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

            <div className="flex w-full flex-col gap-y-6">
              <Button
                variant="secondary"
                className="rounded-full text-sm font-bold"
                onClick={() => append({ column_title: "" })}
              >
                <PlusIcon className="size-4" />
                Add New Column
              </Button>
              <Button type="submit" className="rounded-full">
                {isEditing ? "Save Changes" : "Create New Board"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
