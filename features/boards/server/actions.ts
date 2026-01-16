"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/actions";

import {
  canCreateBoard,
  canDeleteBoard,
  canEditBoard,
  canReadBoards,
} from "./policy";
import {
  createBoardWithColumns,
  getBoardBySlug,
  getBoardsByUserId,
  updateBoard,
  deleteBoard,
} from "./repository";
import { BoardFormSchemaTypes, BoardFormSchema } from "../schema";
import { nameToSlug } from "../utils";

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
  const slug = nameToSlug(board_name);

  try {
    await createBoardWithColumns(board_name, slug, user.id, columns);
  } catch (e) {
    console.log(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath("/boards");
  return { success: true, slug };
};

export const fetchBoardBySlug = async (slug: string) => {
  const user = await getCurrentUser();

  if (!user || !canReadBoards(user.id)) {
    throw new Error("Unauthorized");
  }

  return await getBoardBySlug(user.id, slug);
};

export const editBoard = async (
  values: { board_id: string; userId: string } & BoardFormSchemaTypes,
) => {
  const user = await getCurrentUser();

  if (!user || !canEditBoard(user.id, values.userId)) {
    throw new Error("Unauthorized");
  }

  const result = BoardFormSchema.safeParse(values);
  if (!result.success) {
    return { error: "Invalid form data" };
  }

  const slug = nameToSlug(values.board_name);

  try {
    await updateBoard(
      values.board_id,
      result.data.board_name,
      slug,
      result.data.columns,
    );
  } catch (e) {
    console.log(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath(`/boards/${slug}`);
  return { success: true, slug };
};

export const deleteBoardBySlug = async (slug: string) => {
  const user = await getCurrentUser();
  const board = await fetchBoardBySlug(slug);

  if (!board) throw new Error("Board Not found");

  if (!user || !canDeleteBoard(user.id, board.userId)) {
    throw new Error("Unauthorized");
  }

  try {
    await deleteBoard(user.id, slug);
  } catch (e) {
    console.log(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath("/boards");
  return { success: true };
};
