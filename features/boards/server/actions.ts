"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/actions";

import { canCreateBoard, canReadBoards } from "./policy";
import { createBoardWithColumns, getBoardsByUserId } from "./repository";
import { BoardFormSchemaTypes, BoardFormSchema } from "../schema";
import { prepareBoardData } from "../utils";

export const fetchBoards = async () => {
  const user = await getCurrentUser();

  if (!user || !canReadBoards(user.id)) {
    throw new Error("Unauthorized");
  }

  return await getBoardsByUserId(user.id);
};

export const createBoard = async (values: BoardFormSchemaTypes) => {
  const user = await getCurrentUser();

  if (!user || !canCreateBoard(user.id)) {
    throw new Error("Unauthorized");
  }

  const result = BoardFormSchema.safeParse(values);
  if (!result.success) {
    return { error: "Invalid form data" };
  }
  const { board_name, columns } = result.data;
  const { slug, columnsWithPositions } = prepareBoardData(board_name, columns);

  try {
    await createBoardWithColumns(
      board_name,
      slug,
      user.id,
      columnsWithPositions,
    );
  } catch (e) {
    console.log(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath("/boards");
  return { success: true, slug };
};
