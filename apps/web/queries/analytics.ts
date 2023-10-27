import type { UseQueryOptions } from "@tanstack/react-query";

import {
  getAnalyticsUserPollTopCountries,
  getAnalyticsUserPollTopDevices,
  getAnalyticsUserPollVotes,
} from "../services/api";

export const analyticsKeys = {
  getUserPollsVotes: ["analytics.votes"] as const,
  getUserPollTopDevices: ["analytics.top-devices"] as const,
  getUserPollTopCountries: ["analytics.top-countries"] as const,
};

export const analyticsOptions = {
  getUserPollsVotes: {
    queryKey: analyticsKeys.getUserPollsVotes,
    queryFn: getAnalyticsUserPollVotes,
  } satisfies UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollVotes>>
  >,
  getUserPollTopDevices: {
    queryKey: analyticsKeys.getUserPollTopDevices,
    queryFn: getAnalyticsUserPollTopDevices,
  } satisfies UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollTopDevices>>
  >,
  getUserPollTopCountries: {
    queryKey: analyticsKeys.getUserPollTopCountries,
    queryFn: getAnalyticsUserPollTopCountries,
  } satisfies UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollTopCountries>>
  >,
} satisfies Record<keyof typeof analyticsKeys, unknown>;
