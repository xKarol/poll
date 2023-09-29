import prisma from "@poll/prisma";
import type { User } from "@poll/types";

export const updateUserData: User.Services["updateUser"] = async (
  userId,
  data
) => {
  const response = await prisma.user.update({ where: { id: userId }, data });
  return response;
};

export const deleteUser: User.Services["deleteUser"] = async (userId) => {
  await prisma.user.delete({ where: { id: userId } });
};

export const getUserVotes: User.Services["getUserVotes"] = async (userId) => {
  const votes = await prisma.vote.findMany({
    where: { userId: userId },
    include: { poll: true, answer: true },
  });

  return votes;
};