import { z } from "zod";

export const getQuestion = z.object({
  params: z.object({
    questionId: z.string().nonempty(),
  }),
});
export type GetQuestion = z.infer<typeof getQuestion>;

export const createQuestion = z.object({
  body: z.object({
    question: z.string().min(3),
  }),
});
export type CreateQuestion = z.infer<typeof createQuestion>;

export const deleteQuestion = z.object({
  params: z.object({
    questionId: z.string().nonempty(),
  }),
});
export type DeleteQuestion = z.infer<typeof deleteQuestion>;
