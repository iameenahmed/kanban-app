import { prisma } from "@/lib/db";

export async function getBoardsByUserId(userId: string) {
  return await prisma.board.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createBoardWithColumns(
  board_name: string,
  slug: string,
  userId: string,
  columns: { title: string }[],
) {
  return await prisma.board.create({
    data: {
      name: board_name,
      slug,
      userId,
      columns: {
        create: columns.map((column, index) => ({
          title: column.title,
          position: index,
        })),
      },
    },
  });
}

export async function getBoardBySlug(userId: string, slug: string) {
  return await prisma.board.findFirst({
    where: { userId, slug },
    select: {
      id: true,
      name: true,
      userId: true,
      columns: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

export async function updateBoard(
  board_id: string,
  userId: string,
  name: string,
  slug: string,
  columns: { id?: string; title: string }[],
) {
  return await prisma.$transaction(async (tx) => {
    await tx.board.update({
      where: { id: board_id, userId },
      data: { name, slug },
    });

    const existingColumns = columns.filter((c) => c.id);
    const newColumns = columns.filter((c) => !c.id);
    const existingIds = existingColumns.map((c) => c.id!);

    await tx.column.deleteMany({
      where: {
        boardId: board_id,
        id: { notIn: existingIds },
      },
    });

    await Promise.all(
      existingColumns.map((c, index) =>
        tx.column.update({
          where: { id: c.id! },
          data: { title: c.title, position: index },
        }),
      ),
    );

    await Promise.all(
      newColumns.map((c, index) =>
        tx.column.create({
          data: {
            title: c.title,
            position: existingColumns.length + index,
            boardId: board_id,
          },
        }),
      ),
    );
  });
}

export async function deleteBoard(userId: string, slug: string) {
  return await prisma.board.delete({
    where: { userId_slug: { userId, slug } },
  });
}
