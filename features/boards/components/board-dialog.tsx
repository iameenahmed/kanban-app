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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { BoardFormSchema, BoardFormSchemaTypes } from '../schema';
import { createBoard, editBoard } from '../server/actions';
import { BoardWithColumns } from '../types';

type BoardDialogProps = {
  isEditing?: boolean;
  board?: BoardWithColumns | null;
};

export const BoardDialog = ({ isEditing = false, board }: BoardDialogProps) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string | undefined;

  const [open, setOpen] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const handleClose = (targetSlug = slug) => {
    setOpen(false);
    if (targetSlug) {
      router.push(`/boards/${targetSlug}`);
    } else {
      router.push('/boards');
    }
  };

  const form = useForm<BoardFormSchemaTypes>({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {
      board_name: board?.name || '',
      columns: board?.columns || [
        { title: 'Todo' },
        { title: 'Doing' },
        { title: 'Done' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });

  const onSubmit = async (values: BoardFormSchemaTypes) => {
    const res =
      isEditing && board
        ? await editBoard({
            ...values,
            board_id: board.id,
          })
        : await createBoard(values);

    if (res.error) {
      setError(res.error);
      return;
    }

    handleClose(res?.slug);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="border-0" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Board' : 'Add New Board'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="board_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Name</FormLabel>
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
                    name={`columns.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Stage name" />
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

            <div className="flex w-full flex-col gap-y-6">
              <Button
                variant="secondary"
                className="rounded-full text-sm font-bold"
                onClick={() => append({ title: '' })}
              >
                <PlusIcon className="size-4" />
                Add New Column
              </Button>
              <Button type="submit" className="rounded-full">
                {isEditing ? 'Save Changes' : 'Create New Board'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
