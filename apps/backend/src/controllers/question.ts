import type { NextFunction, Request, Response } from "express";

import { createQuestion, deleteQuestion } from "../services/question";
import type { CreateQuestionData, DeleteQuestionData } from "../types/question";

export const Create = async (
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

export const Delete = async (
  req: Request<DeleteQuestionData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { questionId } = req.params;
    await deleteQuestion(questionId);

    return res.status(200);
  } catch (error) {
    next(error);
  }
};
