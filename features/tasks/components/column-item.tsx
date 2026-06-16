import { GripVerticalIcon } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { type CSSProperties } from "react";
import { type BoardColumn } from "../types";
import { TaskList } from "./task-list";

export const ColumnItem = ({
  column,
  slug,
  index,
}: {
  column: BoardColumn;
  slug: string;
  index: number;
}) => (
  <Draggable key={column.id} draggableId={column.id} index={index}>
    {(provided, snapshot) => {
      const { style, ...draggableProps } = provided.draggableProps;
      return (
        <section
          ref={provided.innerRef}
          style={style as CSSProperties}
          className={cn(
            "flex w-73 flex-col",
            snapshot.isDragging && "opacity-80",
          )}
          {...draggableProps}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-medium-grey hover:text-purple -ml-1 flex size-6 cursor-grab items-center justify-center rounded active:cursor-grabbing"
              aria-label={`Move ${column.title} column`}
              {...provided.dragHandleProps}
            >
              <GripVerticalIcon className="size-4" />
            </button>
            <h3 className="text-medium-grey text-sm">
              {column.title} ({column.tasks.length})
            </h3>
          </div>
          <TaskList column={column} slug={slug} />
        </section>
      );
    }}
  </Draggable>
);
