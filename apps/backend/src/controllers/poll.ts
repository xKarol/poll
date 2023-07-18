import type { NextFunction, Request, Response } from "express";
import type * as PollSchema from "../schemas/poll";
import { createPoll, deletePoll, getPoll } from "../services/poll";
import type {
  CreatePollData,
  DeletePollData,
  GetPollData,
} from "../types/poll";

export const GetOne = async (
  req: Request<PollSchema.GetPoll["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pollId } = req.params;
    const data = await getPoll(pollId);

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const Create = async (
  req: Request<unknown, unknown, PollSchema.CreatePoll["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const poll = await createPoll(data);

    return res.send(poll);
  } catch (error) {
    next(error);
  }
};

export const Delete = async (
  req: Request<PollSchema.DeletePoll["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pollId } = req.params;
    await deletePoll(pollId);

    return res.status(200);
  } catch (error) {
    next(error);
  }
};
