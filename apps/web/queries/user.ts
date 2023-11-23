import type { UseInfiniteQueryOptions } from "@tanstack/react-query";

import { getUserPolls, getUserVotes } from "../services/api";

export const userKeys = {
  getUserPolls: ["user.polls"] as const,
  getUserPollVotes: ["user.votes"] as const,
};

export const userOptions = {
  getUserPolls: (
    options?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserPolls>>>
  ): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserPolls>>> => ({
    ...options,
    queryKey: userKeys.getUserPolls,
    queryFn: ({ pageParam = 1 }) =>
      getUserPolls({ page: pageParam, limit: 10 }),
    getNextPageParam: ({ nextPage }) => nextPage,
  }),
  getUserPollVotes: (
    options?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserVotes>>>
  ): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserVotes>>> => ({
    ...options,
    queryKey: userKeys.getUserPollVotes,
    queryFn: ({ pageParam = 1 }) =>
      getUserVotes({ page: pageParam, limit: 10 }),
    getNextPageParam: ({ nextPage }) => nextPage,
  }),
} satisfies Record<keyof typeof userKeys, unknown>;
