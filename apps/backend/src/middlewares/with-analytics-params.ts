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
        groupBy: "hour" | "minute" | "day";
        dateFrom: number;
        dateTo: number;
        limit: number;
      };
    }
  }
}

export const analyticsParamsSchema = z
  .object({
    interval: z.string().transform(parseInterval),
  })
  .extend(defaultParameters);

const groupByName = {
  D: "day",
  m: "minute",
  H: "hour",
} as const;

export const withAnalyticsParams =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        interval,
        limit = 50,
        dateTo = Date.now(),
        ...params
      } = analyticsParamsSchema.parse(req.query);

      const [value, unit] = interval;

      req.analytics = {
        ...params,
        groupBy: groupByName[unit],
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
