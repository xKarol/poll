import type { Analytics } from "@poll/types";
import { z } from "zod";

export const getPollData: z.Schema<{ params: Analytics.GetPollData }> =
  z.object({
    params: z.object({
      pollId: z.string().nonempty(),
    }),
  });

export const interval = z
  .enum<string, [Analytics.Interval, ...Analytics.Interval[]]>([
    "day",
    "hour",
    "minute",
  ])
  .default("hour");

export const defaultParameters = {
  limit: z.coerce.number().positive().optional(),
  date_from: z.coerce.number().positive().optional(),
  date_to: z.coerce.number().positive().optional(),
};

export const getAllPollVoteData: z.Schema = z.object({
  params: z.object({
    interval: interval,
    ...defaultParameters,
  }),
});

export type GetAllPollVoteData = z.infer<typeof getAllPollVoteData>;

export const getAnalyticsData: z.Schema = z.object({
  params: z.object(defaultParameters),
});

export type AnalyticsDataParams = z.infer<typeof getAnalyticsData>;
