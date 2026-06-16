import { type BoardColumn } from "./types";

export function reorderList<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);

  if (!removed) return list;

  result.splice(endIndex, 0, removed);
  return result;
}

export function moveTask(
  columns: BoardColumn[],
  taskId: string,
  source: { droppableId: string; index: number },
  destination: { droppableId: string; index: number },
) {
  const sourceColumn = columns.find((c) => c.id === source.droppableId);
  const destinationColumn = columns.find(
    (c) => c.id === destination.droppableId,
  );

  if (!sourceColumn || !destinationColumn) return columns;

  const sourceTasks = [...sourceColumn.tasks];
  const [movedTask] = sourceTasks.splice(source.index, 1);
  if (!movedTask || movedTask.id !== taskId) return columns;

  if (source.droppableId === destination.droppableId) {
    sourceTasks.splice(destination.index, 0, movedTask);
    return columns.map((c) =>
      c.id === source.droppableId ? { ...c, tasks: sourceTasks } : c,
    );
  }

  const destinationTasks = [...destinationColumn.tasks];
  destinationTasks.splice(destination.index, 0, movedTask);

  return columns.map((c) => {
    if (c.id === source.droppableId) return { ...c, tasks: sourceTasks };
    if (c.id === destination.droppableId)
      return { ...c, tasks: destinationTasks };
    return c;
  });
}

export function getChangedColumns(
  previous: BoardColumn[],
  next: BoardColumn[],
): { columnId: string; taskIds: string[] }[] {
  return next
    .filter((column) => {
      const previousColumn = previous.find((item) => item.id === column.id);
      if (!previousColumn) return true;

      return (
        previousColumn.tasks.map((task) => task.id).join("|") !==
        column.tasks.map((task) => task.id).join("|")
      );
    })
    .map((column) => ({
      columnId: column.id,
      taskIds: column.tasks.map((task) => task.id),
    }));
}
