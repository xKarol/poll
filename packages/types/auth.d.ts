import type { Plan } from "@poll/prisma";

export type JWTPayload = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  plan: Plan;
  timeZone: string;
  clockType: number;
};
