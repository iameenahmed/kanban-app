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
