import { z } from "zod";

import tinybird from "../lib/tinybird";

export const sendPollVoteData = tinybird.buildIngestEndpoint({
  datasource: "analytics_poll_vote__v1",
  event: z.object({
    voteId: z.string(),
    userId: z.string().optional(),
    ownerId: z.string(),
    pollId: z.string(),
    answerId: z.string(),
    timestamp: z.number().int(),
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
    latitude: z.string().optional().default("0"),
    longitude: z.string().optional().default("0"),
  }),
});

export const getUserPollVotesData = tinybird.buildPipe({
  pipe: process.env.TINYBIRD_PIPE_USER_POLL_TOP_DEVICES_ID as string,
  parameters: z.object({
    ownerId: z.string(),
  }),
  data: z.object({
    timestamp: z.string(),
    totalVotes: z.number().positive(),
  }),
});

export const getUserPollTopDevices = tinybird.buildPipe({
  pipe: process.env.TINYBIRD_PIPE_USER_POLL_TOP_DEVICES_ID as string,
  parameters: z.object({
    ownerId: z.string(),
  }),
  data: z.object({
    device: z.string(),
    total: z.number().positive(),
  }),
});
