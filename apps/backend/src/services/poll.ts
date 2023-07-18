import type * as PollSchema from "../schemas/poll";
import createError from "http-errors";
import prisma from "prisma";

export const getPoll = async (pollId: string) => {
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

export const createPoll = async (data: PollSchema.CreatePoll["body"]) => {
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

export const deletePoll = async (pollId: string) => {
  try {
    const response = await prisma.poll.delete({
      where: { id: pollId },
    });
    return response;
  } catch {
    throw createError(400, "Could not delete poll.");
  }
};
