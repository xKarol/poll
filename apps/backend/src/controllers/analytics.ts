import type { Analytics } from "@poll/types";
import type { Handler, NextFunction, Request, Response } from "express";

import { getUserPollVotesData } from "../services/tinybird";

export const GetUserPollVotesData: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user!;
    const { data } = await getUserPollVotesData({ ownerId: userId });
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

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
