import type { Poll } from "@poll/types";
import type { NextFunction, Request, Response } from "express";

import {
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
  getPollVoters,
  votePoll,
  getPollUserAnswerChoice,
} from "../services/poll";

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = req.pagination;
    const data = await getPolls({ page, limit, skip });

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

    const poll = await createPoll({
      ...data,
      userId: req.user?.id,
    });

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
    const { id: userId } = req.user || {};
    const data = await votePoll({ userId, pollId, answerId });

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const GetPollVoters = async (
  req: Request<Poll.GetVoteUsersData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pollId } = req.params;
    const data = await getPollVoters(pollId);

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const GetPollUserAnswerChoice = async (
  req: Request<Poll.GetPollData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pollId } = req.params;
    const { id: userId } = req.user || {};

    if (!userId) return res.status(200).send({});

    const data = await getPollUserAnswerChoice(userId, pollId);

    return res.send(data);
  } catch (error) {
    next(error);
  }
};
