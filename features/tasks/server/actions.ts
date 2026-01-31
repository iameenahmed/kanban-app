"use server";

import { getCurrentUser } from "@/features/auth/actions";

import * as Policy from "./policy";
import * as Repo from "./repository";

export const fetchColumnsWithTasks = async (boardSlug: string) => {
  const user = await getCurrentUser();

  if (!user || !Policy.canReadBoards(user.id)) {
    return { error: "Unauthorized" };
  }

  try {
    const columns = await Repo.getColumnsByBoard(user.id, boardSlug);
    return { data: columns };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch Columns. Please try again." };
  }
};

export const fetchColumns = async (boardSlug: string) => {
  const user = await getCurrentUser();

  if (!user || !Policy.canReadBoards(user.id)) {
    return { error: "Unauthorized" };
  }

  try {
    const columns = await Repo.getColumns(user.id, boardSlug);
    return { data: columns };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch Columns. Please try again." };
  }
};
