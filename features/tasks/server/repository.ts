import { prisma } from "@/lib/db";

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
