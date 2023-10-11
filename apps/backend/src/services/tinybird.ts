import { z } from "zod";

import tinybird from "../lib/tinybird";

export const sendPollData = tinybird.buildIngestEndpoint({
  datasource: "poll_views__v1",
  event: z.object({
    id: z.string(),
    // linkId: z.string(),
    // documentId: z.string(),
    // viewId: z.string(),
    // time: z.number().int(),
    // duration: z.number().int(),
    // pageNumber: z.string(),
    // country: z.string().optional().default("Unknown"),
    // city: z.string().optional().default("Unknown"),
    // region: z.string().optional().default("Unknown"),
    // latitude: z.string().optional().default("Unknown"),
    // longitude: z.string().optional().default("Unknown"),
    // ua: z.string().optional().default("Unknown"),
    // browser: z.string().optional().default("Unknown"),
    // browser_version: z.string().optional().default("Unknown"),
    // engine: z.string().optional().default("Unknown"),
    // engine_version: z.string().optional().default("Unknown"),
    // os: z.string().optional().default("Unknown"),
    // os_version: z.string().optional().default("Unknown"),
    // device: z.string().optional().default("Desktop"),
    // device_vendor: z.string().optional().default("Unknown"),
    // device_model: z.string().optional().default("Unknown"),
    // cpu_architecture: z.string().optional().default("Unknown"),
    // bot: z.boolean().optional(),
    // referer: z.string().optional().default("(direct)"),
    // referer_url: z.string().optional().default("(direct)"),
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
