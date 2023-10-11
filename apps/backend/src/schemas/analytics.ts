import type { Analytics } from "@poll/types";
import { z } from "zod";

export const getPollData: z.Schema<{ params: Analytics.GetPollData }> =
  z.object({
    params: z.object({
      pollId: z.string().nonempty(),
    }),
  });
