import { z } from "zod";

import tinybird from "../lib/tinybird";
import * as AnalyticsSchema from "../schemas/analytics";

export const sendPollVoteData = tinybird.buildIngestEndpoint({
  datasource: "analytics_poll_vote__v1",
  event: z.object({
    voteId: z.string(),
    userId: z.string().optional().default("Unknown"),
    ownerId: z.string().optional().default("Unknown"),
    pollId: z.string(),
    answerId: z.string(),
    timestamp: z.string(),
    browser: z.string().optional().default("Unknown"),
    browser_version: z.string().optional().default("Unknown"),
    os: z.string().optional().default("Unknown"),
    os_version: z.string().optional().default("Unknown"),
    device: z.string().optional().default("desktop"),
    device_vendor: z.string().optional().default("Unknown"),
    device_model: z.string().optional().default("Unknown"),
    region: z.string().optional().default("Unknown"),
    country_code: z.string().optional().default("Unknown"),
    country_name: z.string().optional().default("Unknown"),
    latitude: z.number().optional().default(0.01),
    longitude: z.number().optional().default(0.01),
  }),
});

export const getUserPollVotesData = tinybird.buildPipe({
  pipe: process.env.TINYBIRD_PIPE_USER_ALL_VOTES_ID as string,
  parameters: z
    .object({
      ownerId: z.string(),
      interval: AnalyticsSchema.interval,
    })
    .extend(AnalyticsSchema.defaultParameters),
  data: z.object({
    timestamp: z.string(),
    total: z.number().positive(),
  }),
});

export const getUserPollTopDevices = tinybird.buildPipe({
  pipe: process.env.TINYBIRD_PIPE_USER_POLL_TOP_DEVICES_ID as string,
  parameters: z
    .object({
      ownerId: z.string(),
    })
    .extend(AnalyticsSchema.defaultParameters),
  data: z.object({
    device: z.string(),
    total: z.number().positive(),
  }),
});

export const getUserPollTopCountries = tinybird.buildPipe({
  pipe: process.env.TINYBIRD_PIPE_USER_TOP_COUNTRIES_ID as string,
  parameters: z
    .object({
      ownerId: z.string(),
    })
    .extend(AnalyticsSchema.defaultParameters),
  data: z.object({
    country_name: z.string(),
    country_code: z.string(),
    total: z.number().positive(),
  }),
});
