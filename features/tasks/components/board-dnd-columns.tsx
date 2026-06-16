"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { TriangleAlertIcon, PlusIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { reorderColumns } from "@/features/boards/server/actions";
import { reorderTasks } from "../server/actions";
import { ColumnItem } from "./column-item";
import { reorderList, moveTask, getChangedColumns } from "../utils";
import { type BoardColumn } from "../types";

export const BoardDndColumns = ({
  columns,
  slug,
}: {
  columns: BoardColumn[];
  slug: string;
}) => {
  const router = useRouter();
  const [items, setItems] = useState(columns);
  const [error, setError] = useState<string | undefined>();

  const handleDragEnd = async ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setError(undefined);
    const previousItems = items;

    if (type === "column") {
      const nextItems = reorderList(items, source.index, destination.index);
      setItems(nextItems);
      const res = await reorderColumns(
        slug,
        nextItems.map((c) => c.id),
      );
      if (res.error) {
        setError(res.error);
        setItems(previousItems);
        router.refresh();
      }
      return;
    }

    const nextItems = moveTask(items, draggableId, source, destination);
    setItems(nextItems);
    const changedColumns = getChangedColumns(previousItems, nextItems);
    if (changedColumns.length) {
      const res = await reorderTasks(slug, changedColumns);
      if (res.error) {
        setError(res.error);
        setItems(previousItems);
      }
    }
    router.refresh();
  };

  return (
    <div className="min-w-0 flex-1 overflow-auto p-6">
      {!!error && (
        <Alert variant="destructive" className="mb-4 w-70">
          <TriangleAlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="board-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="flex min-w-max gap-x-4"
              {...provided.droppableProps}
            >
              {items.map((column, index) => (
                <ColumnItem
                  key={column.id}
                  column={column}
                  slug={slug}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <div className="mt-11 flex w-70 items-center justify-center rounded-md bg-[#E9EFFA] dark:bg-[#2B2C37]">
                <Link
                  href={`/boards/${slug}/edit`}
                  className="hover:text-purple text-medium-grey flex cursor-pointer items-baseline text-2xl"
                >
                  <PlusIcon className="mr-1 size-4 stroke-4" />
                  New Column
                </Link>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
