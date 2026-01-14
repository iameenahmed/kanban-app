"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    return null;
  }

  return session.user;
};
