import createError from "http-errors";

import { prisma } from "../lib/prisma";
import type { CreatePollData } from "../types/poll";

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

export const createPoll = async (data: CreatePollData) => {
  try {
    const response = await prisma.poll.create({
      data: {
        question: data.poll,
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
