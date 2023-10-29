import type { SortingParams, Poll } from "@poll/types";
import type {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  getPoll,
  getPollUserAnswerChoice,
  getPollVoters,
  getPolls,
} from "../services/api";

export const pollKeys = {
  all: (
    { sortBy, orderBy }: SortingParams<Poll.SortPollFields> = {
      sortBy: "createdAt",
      orderBy: "desc",
    }
  ) => {
    return ["poll", { sortBy, orderBy }] as const;
  },
  single: (pollId: string) => [...pollKeys.all(), pollId] as const,
  getPollVoters: (pollId: string) => ["poll-voters", pollId] as const,
  getPollAnswerUserChoice: (pollId: string) =>
    ["poll-answer-user-choice", pollId] as const,
};

export const pollOptions = {
  all: (
    sortParams?: SortingParams<Poll.SortPollFields>
  ): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPolls>>> => ({
    queryKey: pollKeys.all(sortParams),
    queryFn: ({ pageParam = 1 }) => {
      return getPolls({ page: pageParam, limit: 10, ...sortParams });
    },
    getNextPageParam: ({ nextPage }) => nextPage,
  }),
  single: (
    pollId: string
  ): UseQueryOptions<Awaited<ReturnType<typeof getPoll>>> => ({
    queryKey: pollKeys.single(pollId),
    queryFn: () => getPoll(pollId),
    enabled: !!pollId,
  }),
  getPollVoters: (
    pollId: string
  ): UseQueryOptions<Awaited<ReturnType<typeof getPollVoters>>> => ({
    queryKey: pollKeys.getPollVoters(pollId),
    queryFn: () => getPollVoters(pollId),
    enabled: !!pollId,
  }),
  getPollAnswerUserChoice: (
    pollId: string
  ): UseQueryOptions<Awaited<ReturnType<typeof getPollUserAnswerChoice>>> => ({
    queryKey: pollKeys.getPollAnswerUserChoice(pollId),
    queryFn: () => getPollUserAnswerChoice(pollId),
    enabled: !!pollId,
  }),
} satisfies Record<keyof typeof pollKeys, unknown>;
