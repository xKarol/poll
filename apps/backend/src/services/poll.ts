import createError from "http-errors";
import prisma from "prisma";
import type { Poll } from "types";

export const getPolls: Poll.Services["getPolls"] = async (
  page = 1,
  limit = 10
) => {
  page = page <= 1 ? 0 : page - 1;
  try {
    const response = await prisma.poll.findMany({
      skip: page * limit,
      take: limit,
    });
    return response;
  } catch {
    throw createError(400, "Could not find polls.");
  }
};

export const getPoll: Poll.Services["getPoll"] = async (pollId) => {
  try {
    const response = await prisma.poll.findUniqueOrThrow({
      where: {
        id: pollId,
      },
      include: { answers: true },
    });
    return response;
  } catch {
    throw createError(400, "Could not find poll.");
  }
};

export const createPoll: Poll.Services["createPoll"] = async (data) => {
  try {
    const response = await prisma.poll.create({
      data: {
        question: data.question,
        answers: {
          createMany: { data: data.answers },
        },
      },
    });
    return response;
  } catch {
    throw createError(400, "Could not create poll.");
  }
};

export const deletePoll: Poll.Services["deletePoll"] = async (pollId) => {
  try {
    await prisma.poll.delete({
      where: { id: pollId },
    });
  } catch {
    throw createError(400, "Could not delete poll.");
  }
};

export const votePoll: Poll.Services["votePoll"] = async (
  pollId: string,
  answerId: string
) => {
  try {
    const response = await prisma.poll.update({
      where: { id: pollId },
      data: {
        answers: {
          update: {
            where: {
              id: answerId,
            },
            data: { votes: { increment: 1 } },
          },
        },
      },
      include: { answers: true },
    });
    return response;
  } catch {
    throw createError(400, "Could not vote in the poll.");
  }
};
