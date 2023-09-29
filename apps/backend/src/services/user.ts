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

export const getUserVotes: User.Services["getUserVotes"] = async (
  userId,
  { page = 1, skip, limit = 10 }
) => {
  const response = await prisma.vote.findMany({
    skip: skip,
    take: limit + 1,
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: { poll: true, answer: true },
  });
  return {
    data: response.slice(0, limit),
    nextPage: response.length > limit ? page + 1 : undefined,
  };
};
