import { MAX_POLL_OPTIONS } from "@poll/config";
import type { Poll } from "@poll/types";
import { z } from "zod";

export const createPollSchema: z.ZodSchema<Poll.CreatePollData> = z.object({
  question: z.string().min(3),
  answers: z
    .array(
      z.object({
        text: z.string({ required_error: "Answer should not be empty" }).min(1),
      })
    )
    .min(2)
    .max(MAX_POLL_OPTIONS),
  isPublic: z.boolean().optional(),
  requireRecaptcha: z.boolean().optional(),
});
