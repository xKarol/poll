import type { Analytics } from "@poll/types";
import type { UseQueryOptions } from "@tanstack/react-query";

import {
  getAnalyticsUserPollTopCountries,
  getAnalyticsUserPollTopDevices,
  getAnalyticsUserPollVotes,
} from "../services/api";

export const analyticsKeys = {
  getUserPollsVotes: ({ interval }: Analytics.ClientAnalyticsParams) =>
    ["analytics.votes", { interval }] as const,
  getUserPollTopDevices: ({ interval }: Analytics.ClientAnalyticsParams) =>
    ["analytics.top-devices", { interval }] as const,
  getUserPollTopCountries: ({ interval }: Analytics.ClientAnalyticsParams) =>
    ["analytics.top-countries", { interval }] as const,
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
    queryKey: analyticsKeys.getUserPollTopDevices({
      interval: params.interval,
    }),
    queryFn: () => getAnalyticsUserPollTopDevices(params),
  }),
  getUserPollTopCountries: (
    params: Analytics.ClientAnalyticsParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollTopCountries>>
  > => ({
    queryKey: analyticsKeys.getUserPollTopCountries({
      interval: params.interval,
    }),
    queryFn: () => getAnalyticsUserPollTopCountries(params),
  }),
} satisfies Record<keyof typeof analyticsKeys, unknown>;
