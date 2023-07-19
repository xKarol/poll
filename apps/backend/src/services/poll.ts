import createError from "http-errors";
import prisma from "prisma";
import type { Poll } from "types";

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
