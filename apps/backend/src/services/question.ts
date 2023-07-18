import createError from "http-errors";

import { prisma } from "../lib/prisma";

export const createQuestion = async (data: unknown) => {
  try {
    const data = await prisma.question.create({
      // @ts-expect-error fix later
      data: {
        // TODO complete
        question: "",
        // answers:
      },
    });
    return data;
  } catch {
    throw createError(400, "Could not create question.");
  }
};
