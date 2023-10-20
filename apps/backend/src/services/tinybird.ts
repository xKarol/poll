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
    country: z.string().optional().default("Unknown"),
    city: z.string().optional().default("Unknown"),
    region: z.string().optional().default("Unknown"),
    latitude: z.string().optional().default("Unknown"),
    longitude: z.string().optional().default("Unknown"),
    browser: z.string().optional().default("Unknown"),
    browser_version: z.string().optional().default("Unknown"),
    os: z.string().optional().default("Unknown"),
    os_version: z.string().optional().default("Unknown"),
    device: z.string().optional().default("Desktop"),
  }),
});

export const getUserPollVotesData = tinybird.buildPipe({
  pipe: process.env.TINYBIRD_PIPE_USER_ALL_VOTES_ID as string,
  parameters: z.object({
    ownerId: z.string(),
  }),
  data: z.object({
    timestamp: z.string(),
    totalVotes: z.number().positive(),
  }),
});
