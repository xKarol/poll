import type { Analytics } from "@poll/types";
import type { Handler, NextFunction, Request, Response } from "express";

import {
  getUserPollTopDevices,
  getUserPollVotesData,
} from "../services/tinybird";

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

export const GetUserPollTopDevicesData: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user!;
    const { data: rawData } = await getUserPollTopDevices({ ownerId: userId });

    const data = {
      mobile: rawData.find((d) => d.device === "mobile")?.total || 0,
      tablet: rawData.find((d) => d.device === "tablet")?.total || 0,
      desktop: rawData.find((d) => d.device === "desktop")?.total || 0,
    };

    const sortedData = Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    return res.send(sortedData);
  } catch (error) {
    next(error);
  }
};
