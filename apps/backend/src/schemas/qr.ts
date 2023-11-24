import type { QR } from "@poll/types";
import { z } from "zod";

export const getQRCode: z.Schema<{ params: QR.GetQRParams }> = z.object({
  params: z.object({
    text: z.string().nonempty(),
  }),
});
export type GetQRCode = z.infer<typeof getQRCode>;
