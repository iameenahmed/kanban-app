import Link from "next/link";
import { type CSSProperties } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { BoardColumn } from "../types";
export const TaskList = ({
  column,
  slug,
}: {
  column: BoardColumn;
  slug: string;
}) => (
  <ScrollArea className="mt-6 h-[calc(100vh-200px)] w-full">
    <Droppable droppableId={column.id} type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={cn(
            "w-70 space-y-5 rounded-md pb-20 transition-colors",
            snapshot.isDraggingOver && "bg-purple/5",
          )}
          {...provided.droppableProps}
        >
          {column.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => {
                const { style, ...draggableProps } = provided.draggableProps;
                return (
                  <div
                    ref={provided.innerRef}
                    style={style as CSSProperties}
                    className={cn(snapshot.isDragging && "opacity-80")}
                    {...draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Link href={`/boards/${slug}/tasks/${task.id}`}>
                      <Card className="group cursor-grab border-none active:cursor-grabbing">
                        <CardHeader className="px-4">
                          <CardTitle className="group-hover:text-purple text-[15px] leading-5">
                            {task.title}
                          </CardTitle>
                          <CardDescription className="text-medium-grey text-xs">
                            {`${task._count.subtasks} of ${task.subtasks.length} Subtasks`}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </div>
                );
              }}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </ScrollArea>
);
