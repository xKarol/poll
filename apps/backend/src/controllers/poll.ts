import prisma from "@poll/prisma";
import type { Poll, SortingParams } from "@poll/types";
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
import { verifyReCaptcha } from "../services/recaptcha";
import * as Analytics from "../services/tinybird";

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = req.pagination;
    const { sortBy, orderBy } =
      req.sorting as SortingParams<Poll.SortPollFields>;

    const data = await getPolls({ page, limit, skip, sortBy, orderBy });

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
    return res.status(200).send(null);
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
    const { reCaptchaToken } = req.body as { reCaptchaToken: string };
    const { id: userId } = req.user || {};

    const { requireRecaptcha: isReCaptchaRequired, userId: ownerId } =
      await prisma.poll.findUniqueOrThrow({
        where: { id: pollId },
        select: { requireRecaptcha: true, userId: true },
      });
    if (isReCaptchaRequired) {
      const { success: isValidCaptcha } = await verifyReCaptcha(reCaptchaToken);
      if (!isValidCaptcha) throw new Error("Invalid reCAPTCHA verification.");
    }

    const data = await votePoll({ userId, pollId, answerId });

    await Analytics.sendPollVoteData({
      userId,
      pollId,
      ownerId: ownerId || "unknown",
      voteId: data.id,
      answerId,
      timestamp: Date.now(),
    }).catch((e) => {
      console.log("Vote Analytics error:", e);
      return null;
    });

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
