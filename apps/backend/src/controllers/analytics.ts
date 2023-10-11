import type { Analytics } from "@poll/types";
import type { NextFunction, Request, Response } from "express";

export const GetPollData = async (
  req: Request<Analytics.GetPollData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pollId } = req.params;

    return res.send(pollId);
  } catch (error) {
    next(error);
  }
};
