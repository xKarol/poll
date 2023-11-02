import type { Analytics } from "@poll/types";
import { z } from "zod";

export const getPollData: z.Schema<{ params: Analytics.GetPollData }> =
  z.object({
    params: z.object({
      pollId: z.string().nonempty(),
    }),
  });

export const defaultParameters = {
  limit: z.coerce.number().positive().optional(),
  dateFrom: z.coerce.number().positive().optional(),
  dateTo: z.coerce.number().positive().optional(),
};
