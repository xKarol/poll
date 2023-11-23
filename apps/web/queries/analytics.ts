import type { Analytics } from "@poll/types";
import type { UseQueryOptions } from "@tanstack/react-query";

import {
  getAnalyticsUserPollTopCountries,
  getAnalyticsUserPollTopDevices,
  getAnalyticsUserPollVotes,
} from "../services/api";

export const analyticsKeys = {
  getUserPollsVotes: ({ interval, pollId }: Analytics.ClientAnalyticsParams) =>
    ["analytics.votes", { interval, pollId }] as const,
  getUserPollTopDevices: ({
    interval,
    pollId,
  }: Analytics.ClientAnalyticsParams) =>
    ["analytics.top-devices", { interval, pollId }] as const,
  getUserPollTopCountries: ({
    interval,
    pollId,
  }: Analytics.ClientAnalyticsParams) =>
    ["analytics.top-countries", { interval, pollId }] as const,
};

export const analyticsOptions = {
  getUserPollsVotes: (
    params: Analytics.ClientAnalyticsParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollVotes>>
  > => ({
    queryKey: analyticsKeys.getUserPollsVotes({
      interval: params.interval,
      pollId: params.pollId,
    }),
    queryFn: () => getAnalyticsUserPollVotes(params),
  }),
  getUserPollTopDevices: (
    params: Analytics.ClientAnalyticsParams
  ): UseQueryOptions<
    Awaited<ReturnType<typeof getAnalyticsUserPollTopDevices>>
  > => ({
    queryKey: analyticsKeys.getUserPollTopDevices({
      interval: params.interval,
      pollId: params.pollId,
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
      pollId: params.pollId,
    }),
    queryFn: () => getAnalyticsUserPollTopCountries(params),
  }),
} satisfies Record<keyof typeof analyticsKeys, unknown>;
