import prisma from "@poll/prisma";
import type { User } from "@poll/types";

export const updateUserData: User.Services["updateUser"] = async (
  userId,
  data
) => {
  const response = await prisma.user.update({ where: { id: userId }, data });
  return response;
};
