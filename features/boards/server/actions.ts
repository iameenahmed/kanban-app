"use server";

import { canReadBoards } from "./policy";
import { getBoardsByUserId } from "./repository";
import { getCurrentUser } from "@/features/auth/actions";

export const fetchBoards = async () => {
  const user = await getCurrentUser();

  if (!user || !canReadBoards(user.id)) {
    throw new Error("Unauthorized");
  }

  return await getBoardsByUserId(user.id);
};
