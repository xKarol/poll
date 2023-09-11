import type { UseQueryOptions } from "@tanstack/react-query";

import {
  getPoll,
  getPollUserAnswerChoice,
  getPollVoters,
} from "../services/api";

export const pollKeys = {
  all: ["poll"] as const,
  single: (pollId: string) => [...pollKeys.all, pollId] as const,
  getPollVoters: (pollId: string) => ["poll-voters", pollId] as const,
  getPollAnswerUserChoice: (pollId: string) =>
    ["poll-answer-user-choice", pollId] as const,
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
