import type { NextFunction, Request, Response } from "express";

import type * as Schema from "../schemas/question";
import { createQuestion } from "../services/question";

export const create = async (
  req: Request<unknown, unknown, Schema.Create["body"]>,
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
