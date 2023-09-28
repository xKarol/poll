import type { User } from "@poll/types";
import { z } from "zod";

export const updateUser: z.Schema<{ body: User.UpdateUserData }> = z.object({
  body: z.object({
    name: z.string().nonempty().optional(),
    email: z.string().email().optional(),
    image: z.string().url().optional(),
  }),
});
export type UpdateUserData = z.infer<typeof updateUser>;
