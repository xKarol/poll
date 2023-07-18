import type { NextFunction, Request, Response } from "express";

import { createQuestion } from "../services/question";
import type { CreateQuestionData } from "../types/question";

export const create = async (
  req: Request<unknown, unknown, CreateQuestionData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const question = await createQuestion(data);

    return res.send(question);
  } catch (error) {
    next(error);
  }
};
