"use server";

import { getCurrentUser } from "@/features/auth/actions";

import * as Repo from "./repository";
import { TaskWithSubtasks } from "../types";
import { TaskFormSchema } from "../schema";

export const fetchColumnsWithTasks = async (boardSlug: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

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
  if (!user) return { error: "Unauthorized" };

  try {
    const columns = await Repo.getColumns(user.id, boardSlug);
    return { data: columns };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch Columns. Please try again." };
  }
};

export const fetchTask = async (taskId: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const task = await Repo.getTaskById(taskId, user.id);
    return { data: task };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch Task. Please try again." };
  }
};

export const createTaskWithSubtasks = async (data: TaskWithSubtasks) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const validatedData = TaskFormSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid Data" };

  try {
    await Repo.createTaskWitSubtasks(validatedData.data);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to Create Task. Please try again." };
  }
};

export const editTaskWithSubtasks = async (
  data: TaskWithSubtasks,
  taskId: string,
) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const validatedData = TaskFormSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid Data" };

  try {
    await Repo.updateTaskWithSubtasks(validatedData.data, taskId, user.id);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to Update Task. Please try again." };
  }
};

export const updateSubtaskCompletionStatus = async (
  subtaskId: string,
  isCompleted: boolean,
) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const res = await Repo.toggleCompletionStatus(
      subtaskId,
      user.id,
      isCompleted,
    );
    if (res.count === 0) return { error: "Failed to update." };
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  return { success: true };
};

export const updateTaskColumn = async (taskId: string, columnId: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const res = await Repo.updateTaskColumn(taskId, user.id, columnId);
    if (res.count === 0) return { error: "Failed to update." };
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  return { success: true };
};

export const reorderTasks = async (
  boardSlug: string,
  columns: { columnId: string; taskIds: string[] }[],
) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  if (!boardSlug || !columns.length) return { error: "Invalid Data" };

  try {
    await Repo.reorderTasks(user.id, boardSlug, columns);
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  return { success: true };
};

export const deleteTask = async (taskId: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const res = await Repo.deleteTask(taskId, user.id);
    if (res.count === 0) return { error: "Failed to delete." };
  } catch (e) {
    console.error(e);
    return { error: "Database failure. Please try again." };
  }

  return { success: true };
};
