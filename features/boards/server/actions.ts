"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/actions";

import * as Repo from "./repository";
import { BoardFormSchemaTypes, BoardFormSchema } from "../schema";
import { nameToSlug } from "../utils";

export const fetchBoards = async () => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const boards = await Repo.getBoardsByUserId(user.id);
    return { data: boards };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch boards. Please try again." };
  }
};

export const createBoard = async (values: BoardFormSchemaTypes) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const result = BoardFormSchema.safeParse(values);
  if (!result.success) return { error: "Invalid form data" };

  const { board_name, columns } = result.data;
  const slug = nameToSlug(board_name);

  try {
    await Repo.createBoardWithColumns(board_name, slug, user.id, columns);
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath("/boards");
  return { success: true, slug };
};

export const fetchBoardBySlug = async (slug: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const board = await Repo.getBoardBySlug(user.id, slug);
    if (!board) {
      return { error: "Board not found" };
    }
    return { data: board };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch board. Please try again." };
  }
};

export const editBoard = async (
  values: { board_id: string; userId: string } & BoardFormSchemaTypes,
) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const result = BoardFormSchema.safeParse(values);
  if (!result.success) return { error: "Invalid form data" };

  const slug = nameToSlug(values.board_name);

  try {
    await Repo.updateBoard(
      values.board_id,
      user.id,
      result.data.board_name,
      slug,
      result.data.columns,
    );
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath(`/boards/${slug}`);
  return { success: true, slug };
};

export const reorderColumns = async (
  boardSlug: string,
  columnIds: string[],
) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  if (!boardSlug || !columnIds.length) return { error: "Invalid Data" };

  try {
    await Repo.reorderColumns(user.id, boardSlug, columnIds);
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath(`/boards/${boardSlug}`);
  return { success: true };
};

export const deleteBoardBySlug = async (slug: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    await Repo.deleteBoard(user.id, slug);
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  revalidatePath("/boards");
  return { success: true };
};
