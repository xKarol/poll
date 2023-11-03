import { DEFAULT_ANALYTICS_INTERVAL } from "@poll/config";
import type { Analytics } from "@poll/types";
import dayjs from "dayjs";
import type { NextFunction, Request, Response } from "express";
import z from "zod";

import { defaultParameters } from "../schemas/analytics";
import { parseInterval } from "../utils/parse-interval";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      analytics: {
        groupBy: Analytics.GroupBy;
        dateFrom: number;
        dateTo: number;
        limit: number;
      };
    }
  }
}

export const analyticsParamsSchema = z
  .object({
    interval: z
      .string()
      .default(DEFAULT_ANALYTICS_INTERVAL)
      .transform(parseInterval),
  })
  .extend(defaultParameters);

const groupByName = {
  h: "hour",
  d: "day",
  m: "month",
  y: "year",
} as const;

export const withAnalyticsParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      interval,
      limit = 50,
      dateTo = dayjs().unix(),
      ...params
    } = analyticsParamsSchema.parse(req.query);

    const [value, unit] = interval;
    const fullInterval = `${value}${unit}`;

    const getGroupBy = (interval: string): Analytics.GroupBy => {
      if (interval === "1h") return "minute";
      if (interval === "1y") return "month";
      // @ts-expect-error never
      return groupByName[unit];
    };

    req.analytics = {
      ...params,
      groupBy: getGroupBy(fullInterval),
      dateFrom:
        params.dateFrom || dayjs().subtract(value, groupByName[unit]).unix(),
      dateTo,
      limit,
    };

    next();
  } catch (error) {
    next(error);
  }
};
