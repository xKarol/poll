import type { Analytics } from "@poll/types";
import type { UseQueryOptions } from "@tanstack/react-query";

import {
  getAnalyticsUserPollTopCountries,
  getAnalyticsUserPollTopDevices,
  getAnalyticsUserPollVotes,
} from "../services/api";

export const analyticsKeys = {
  getUserPollsVotes: ({ interval = "hour" }: Analytics.ClientAnalyticsParams) =>
    ["analytics.votes", { interval }] as const,
  getUserPollTopDevices: ["analytics.top-devices"] as const,
  getUserPollTopCountries: ["analytics.top-countries"] as const,
};

export const analyticsOptions = {
  getUserPollsVotes: (
    params: Analytics.ClientAnalyticsParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollVotes>>
  > => ({
    queryKey: analyticsKeys.getUserPollsVotes({ interval: params.interval }),
    queryFn: () => getAnalyticsUserPollVotes(params),
  }),
  getUserPollTopDevices: (
    params: Analytics.ClientAnalyticsParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollTopDevices>>
  > => ({
    queryKey: analyticsKeys.getUserPollTopDevices,
    queryFn: () => getAnalyticsUserPollTopDevices(params),
  }),
  getUserPollTopCountries: (
    params: Analytics.ClientAnalyticsParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollTopCountries>>
  > => ({
    queryKey: analyticsKeys.getUserPollTopCountries,
    queryFn: () => getAnalyticsUserPollTopCountries(params),
  }),
} satisfies Record<keyof typeof analyticsKeys, unknown>;
