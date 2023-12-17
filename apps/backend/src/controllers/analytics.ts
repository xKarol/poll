import { hasUserPermission } from "@poll/lib";
import type { Plan } from "@poll/prisma";
import type { Analytics } from "@poll/types";
import dayjs from "dayjs";
import type { NextFunction, Request, Response } from "express";
import httpError from "http-errors";

import type { AnalyticsPollQueryParams } from "../schemas/analytics";
import {
  getUserPollTopDevices,
  getUserPollVotesData,
  getUserPollTopCountries,
} from "../services/tinybird";

export const GetUserPollVotesData = async (
  req: Request,
  res: Response<Analytics.ApiResponse["getUserPollVotes"]>,
  next: NextFunction
) => {
  try {
    const params = req.analytics;
    const { pollId = undefined } = req.query as AnalyticsPollQueryParams;
    const { id: userId, plan } = req.user.data!;

    checkPermissions(params.dateFrom, params.dateTo, plan);

    const { data } = await getUserPollVotesData({
      pollId,
      ownerId: userId,
      ...params,
    });
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const GetUserPollTopDevicesData = async (
  req: Request,
  res: Response<Analytics.ApiResponse["getUserPollTopDevices"]>,
  next: NextFunction
) => {
  try {
    const params = req.analytics;
    const { pollId = undefined } = req.query as AnalyticsPollQueryParams;
    const { id: userId, plan } = req.user.data!;

    checkPermissions(params.dateFrom, params.dateTo, plan);

    const { data: rawData } = await getUserPollTopDevices({
      pollId,
      ownerId: userId,
      ...params,
    });

    const data = {
      mobile: rawData.find((d) => d.device === "mobile")?.total || 0,
      tablet: rawData.find((d) => d.device === "tablet")?.total || 0,
      desktop: rawData.find((d) => d.device === "desktop")?.total || 0,
    };

    const sortedData = Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}) as typeof data;

    return res.send(sortedData);
  } catch (error) {
    next(error);
  }
};

export const GetUserPollTopCountriesData = async (
  req: Request,
  res: Response<Analytics.ApiResponse["getUserPollTopCountries"]>,
  next: NextFunction
) => {
  try {
    const params = req.analytics;
    const { pollId = undefined } = req.query as AnalyticsPollQueryParams;
    const { id: userId, plan } = req.user.data!;

    checkPermissions(params.dateFrom, params.dateTo, plan);

    const { data: rawData } = await getUserPollTopCountries({
      pollId,
      ownerId: userId,
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

function checkPermissions(dateFrom: number, dateTo: number, plan: Plan) {
  if (
    dayjs(dateTo).diff(dateFrom, "year") >= 1 &&
    !hasUserPermission("BASIC", plan)
  ) {
    throw httpError.Forbidden("Basic plan or higher is required.");
  }
}
