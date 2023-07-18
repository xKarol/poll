import createError from "http-errors";

import { prisma } from "../lib/prisma";
import type { CreateQuestionData } from "../types/question";

export const getQuestion = async (questionId: string) => {
  try {
    const response = await prisma.question.findUniqueOrThrow({
      where: {
        id: questionId,
      },
      include: { answers: true },
    });
    return response;
  } catch {
    throw createError(400, "Could not find question.");
  }
};

export const createQuestion = async (data: CreateQuestionData) => {
  try {
    const response = await prisma.question.create({
      data: {
        question: data.question,
        answers: {
          createMany: { data: data.answers },
        },
      },
    });
    return response;
  } catch {
    throw createError(400, "Could not create question.");
  }
};

export const deleteQuestion = async (questionId: string) => {
  try {
    const response = await prisma.question.delete({
      where: { id: questionId },
    });
    return response;
  } catch {
    throw createError(400, "Could not delete question.");
  }
};
