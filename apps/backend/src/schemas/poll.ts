import type { Poll } from "@poll/types";
import { z } from "zod";

export const getPoll: z.Schema<{ params: Poll.GetPollData }> = z.object({
  params: z.object({
    pollId: z.string().nonempty(),
  }),
});
export type GetPoll = z.infer<typeof getPoll>;

export const createPoll: z.Schema<{ body: Poll.CreatePollData }> = z.object({
  body: z.object({
    question: z.string().min(3),
    answers: z
      .array(
        z.object({
          text: z
            .string({ required_error: "Answer should not be empty" })
            .nonempty(),
        })
      )
      .min(2),
    isPublic: z.boolean().optional(),
    requireReCaptcha: z.boolean().optional(),
  }),
});
export type CreatePoll = z.infer<typeof createPoll>;

export const deletePoll: z.Schema<{ params: Poll.DeletePollData }> = z.object({
  params: z.object({
    pollId: z.string().nonempty(),
  }),
});
export type DeletePoll = z.infer<typeof deletePoll>;

export const votePoll: z.Schema<{ params: Poll.VotePollData }> = z.object({
  params: z.object({
    pollId: z.string().nonempty(),
    answerId: z.string().nonempty(),
  }),
  body: z.object({
    reCaptchaToken: z.string().nonempty(),
  }),
});
export type VotePoll = z.infer<typeof votePoll>;
