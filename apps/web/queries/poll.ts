import type { UseQueryOptions } from "@tanstack/react-query";

import { getPoll } from "../services/api";

export const pollKeys = {
  all: ["poll"] as const,
  single: (pollId: string) => [...pollKeys.all, pollId] as const,
};

export const pollOptions = {
  all: {},
  single: (
    pollId: string
  ): UseQueryOptions<Awaited<ReturnType<typeof getPoll>>> => ({
    queryKey: pollKeys.single(pollId),
    queryFn: () => getPoll(pollId),
    enabled: !!pollId,
  }),
} satisfies Record<keyof typeof pollKeys, unknown>;
