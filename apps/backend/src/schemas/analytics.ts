import type { Analytics } from "@poll/types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { z } from "zod";

dayjs.extend(customParseFormat);

export const getPollData: z.Schema<{ params: Analytics.GetPollData }> =
  z.object({
    params: z.object({
      pollId: z.string().nonempty(),
    }),
  });

export const defaultParameters = z.object({
  limit: z.coerce.number().positive().optional(),
  dateFrom: z.coerce.number().positive().optional(),
  // TODO fix validating unix timestamp, 122121 - this should fail
  // .refine((date) => !dayjs(date, "X", true).isValid(), {
  //   message: "Invalid dateFrom unix time.",
  // })
  dateTo: z.coerce.number().positive().optional(),
  // TODO fix validating unix timestamp, 122121 - this should fail
  // .refine(
  //   (date) => {
  //     if (date) return true;
  //     if (dayjs(date).unix() <= dayjs().unix()) return true;
  //     // if (!dayjs(date, "X", true).isValid()) return false;
  //     return false;
  //   },
  //   {
  //     message: "Invalid dateTo unix time.",
  //   }
  // ),
});
