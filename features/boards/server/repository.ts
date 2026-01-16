import { prisma } from "@/lib/db";

export async function getBoardsByUserId(userId: string) {
  return await prisma.board.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
}

export async function createBoardWithColumns(
  board_name: string,
  slug: string,
  userId: string,
  columns: {
    title: string;
    position: number;
  }[],
) {
  return await prisma.board.create({
    data: {
      name: board_name,
      slug,
      userId,
      columns: {
        create: columns.map((column) => ({
          title: column.title,
          position: column.position,
        })),
      },
    },
  });
}
