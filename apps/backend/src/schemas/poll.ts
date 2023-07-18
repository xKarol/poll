import { z } from "zod";

export const getPoll = z.object({
  params: z.object({
    pollId: z.string().nonempty(),
  }),
});
export type GetPoll = z.infer<typeof getPoll>;

export const createPoll = z.object({
  body: z.object({
    poll: z.string().min(3),
  }),
});
export type CreatePoll = z.infer<typeof createPoll>;

export const deletePoll = z.object({
  params: z.object({
    pollId: z.string().nonempty(),
  }),
});
export type DeletePoll = z.infer<typeof deletePoll>;
