import type { Poll } from "@poll/types";
import type { NextFunction, Request, Response } from "express";

import {
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
  votePoll,
} from "../services/poll";

export const Get = async (
  req: Request<unknown, unknown, unknown, Poll.GetPollsData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const data = await getPolls(+page, +limit);

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const GetOne = async (
  req: Request<Poll.GetPollData>,
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
  req: Request<unknown, unknown, Poll.CreatePollData>,
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
  req: Request<Poll.DeletePollData>,
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

export const Vote = async (
  req: Request<Poll.VotePollData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pollId, answerId } = req.params;
    const data = await votePoll(pollId, answerId);

    return res.send(data);
  } catch (error) {
    next(error);
  }
};
