import "../config/env";

import { z } from "zod";

import tinybird from "../lib/tinybird";

export const sendPollVoteData = tinybird.buildIngestEndpoint({
  datasource: "analytics_poll-vote__v1",
  event: z.object({
    voteId: z.string(),
    userId: z.string().optional(),
    pollId: z.string(),
    answerId: z.string(),
    time: z.number().int(),
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

export const getPollData = tinybird.buildPipe({
  pipe: "poll_v1",
  parameters: z.object({
    id: z.string(),
  }),
  data: z.object({
    pageNumber: z.string(),
    avg_duration: z.number(),
  }),
});
