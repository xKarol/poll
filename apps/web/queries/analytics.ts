import type { Analytics } from "@poll/types";
import type { UseQueryOptions } from "@tanstack/react-query";

import {
  getAnalyticsUserPollTopCountries,
  getAnalyticsUserPollTopDevices,
  getAnalyticsUserPollVotes,
} from "../services/api";

export const analyticsKeys = {
  getUserPollsVotes: ({
    interval = "hour",
  }: Analytics.getUserPollVotesParams) =>
    ["analytics.votes", { interval }] as const,
  getUserPollTopDevices: ["analytics.top-devices"] as const,
  getUserPollTopCountries: ["analytics.top-countries"] as const,
};

export const analyticsOptions = {
  getUserPollsVotes: (
    params: Analytics.getUserPollVotesParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollVotes>>
  > => ({
    queryKey: analyticsKeys.getUserPollsVotes(params),
    queryFn: () => getAnalyticsUserPollVotes(params),
  }),
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
