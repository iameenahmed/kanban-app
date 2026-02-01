import { prisma } from "@/lib/db";
import { TaskFormSchemaTypes } from "../schema";

export async function getColumnsByBoard(userId: string, boardSlug: string) {
  return await prisma.column.findMany({
    where: { board: { userId, slug: boardSlug } },
    select: {
      id: true,
      title: true,
      tasks: {
        select: {
          id: true,
          title: true,
          subtasks: {
            select: { id: true },
          },
          _count: {
            select: {
              subtasks: {
                where: { isCompleted: true },
              },
            },
          },
        },
        orderBy: { position: "asc" },
      },
    },
    orderBy: { position: "asc" },
  });
}

export async function getColumns(userId: string, boardSlug: string) {
  return await prisma.column.findMany({
    where: { board: { userId, slug: boardSlug } },
    select: {
      id: true,
      title: true,
    },
  });
}

export async function getTaskById(id: string) {
  return await prisma.task.findFirst({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      columnId: true,
      subtasks: {
        select: {
          id: true,
          title: true,
          isCompleted: true,
        },
      },
    },
  });
}

export async function createTaskWitSubtasks(data: TaskFormSchemaTypes) {
  const { title, description, columnId, subtasks } = data;

  // Fetch the current maximum position in the column.
  const maxPos = await prisma.task.aggregate({
    where: { columnId },
    _max: { position: true },
  });

  //	Set the new task’s position to max + 1
  const position = (maxPos._max.position ?? 0) + 1;

  return await prisma.task.create({
    data: {
      title,
      description,
      position,
      columnId,
      subtasks: {
        createMany: {
          data: subtasks.map(({ title }) => ({
            title,
          })),
        },
      },
    },
  });
}

export async function updateTaskWithSubtasks(
  data: TaskFormSchemaTypes,
  taskId: string,
  userId: string,
) {
  const { title, description, columnId, subtasks } = data;

  return prisma.$transaction(async (tx) => {
    await tx.task.updateMany({
      where: {
        id: taskId,
        column: { board: { userId } },
      },
      data: {
        title,
        description,
        columnId,
      },
    });

    const existingSubtasks = subtasks.filter((s) => s.id);
    const newSubtasks = subtasks.filter((s) => !s.id);
    const existingIds = existingSubtasks.map((s) => s.id!);

    await tx.subtask.deleteMany({
      where: {
        taskId,
        task: { column: { board: { userId } } },
        id: { notIn: existingIds },
      },
    });

    if (newSubtasks.length) {
      await tx.subtask.createMany({
        data: newSubtasks.map(({ title }) => ({
          title,
          taskId,
        })),
      });
    }

    await Promise.all(
      existingSubtasks.map(({ id, title }) =>
        tx.subtask.update({
          where: { id, task: { column: { board: { userId } } } },
          data: { title },
        }),
      ),
    );
  });
}

export async function toggleCompletionStatus(
  id: string,
  userId: string,
  isCompleted: boolean,
) {
  return await prisma.subtask.updateMany({
    where: { id, task: { column: { board: { userId } } } },
    data: { isCompleted },
  });
}

export async function updateTaskColumn(
  id: string,
  userId: string,
  columnId: string,
) {
  return await prisma.task.updateMany({
    where: { id, column: { board: { userId } } },
    data: { columnId },
  });
}

export async function deleteTask(id: string, userId: string) {
  return await prisma.task.deleteMany({
    where: { id, column: { board: { userId } } },
  });
}
