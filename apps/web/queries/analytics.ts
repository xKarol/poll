import type { UseQueryOptions } from "@tanstack/react-query";

import { getAnalyticsUserPollVotes } from "../services/api";

export const analyticsKeys = {
  getUserPollsVotes: ["analytics.votes"] as const,
};

export const analyticsOptions = {
  getUserPollsVotes: {
    queryKey: analyticsKeys.getUserPollsVotes,
    queryFn: getAnalyticsUserPollVotes,
  } satisfies UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollVotes>>
  >,
} satisfies Record<keyof typeof analyticsKeys, unknown>;
