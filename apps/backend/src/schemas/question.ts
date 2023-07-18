import { z } from "zod";

export const create = z.object({
  body: z.object({
    question: z.string().min(3),
  }),
});
export type Create = z.infer<typeof create>;
