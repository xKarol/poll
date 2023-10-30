import type { Analytics } from "@poll/types";
import type { Handler, NextFunction, Request, Response } from "express";

import type { GetAllPollVoteData } from "../schemas/analytics";
import {
  getUserPollTopDevices,
  getUserPollVotesData,
  getUserPollTopCountries,
} from "../services/tinybird";

export const GetUserPollVotesData = async (
  req: Request<GetAllPollVoteData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, ...params } =
      req.query as Analytics.getUserPollVotesParams;
    const { id: userId } = req.user!;

    const { data } = await getUserPollVotesData({
      ownerId: userId,
      start_date: startDate,
      end_date: endDate,
      ...params,
    });
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
    const { startDate, endDate, ...params } =
      req.query as Analytics.DefaultAnalyticsProps;
    const { id: userId } = req.user!;
    const { data: rawData } = await getUserPollTopDevices({
      ownerId: userId,
      start_date: startDate,
      end_date: endDate,
      ...params,
    });

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

export const GetUserPollTopCountriesData: Handler = async (req, res, next) => {
  try {
    const { startDate, endDate, ...params } =
      req.query as Analytics.DefaultAnalyticsProps;
    const { id: userId } = req.user!;
    const { data: rawData } = await getUserPollTopCountries({
      ownerId: userId,
      start_date: startDate,
      end_date: endDate,
      ...params,
    });

    const data = rawData.filter(
      (countryData) => countryData.country_code.length === 2
    );

    return res.send(data);
  } catch (error) {
    next(error);
  }
};
