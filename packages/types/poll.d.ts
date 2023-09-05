import type { Poll, Answer } from "@poll/prisma";

export type CreatePollData = {
  userId?: string;
  question: string;
  answers: Pick<Answer, "text">[];
  isPublic?: boolean;
};

export type DeletePollData = {
  pollId: string;
};

export type GetPollData = {
  pollId: string;
};

export type VotePollData = {
  pollId: string;
  answerId: string;
};

export type PaginationResult<T = unknown> = {
  data: T;
  nextPage: number | undefined;
};

// Backend
export type Services = {
  getPoll: (pollId: string) => Promise<Poll & { answers: Answer[] }>;
  getPolls: (params: {
    page?: number;
    skip: number;
    limit?: number;
  }) => Promise<PaginationResult<(Poll & { totalVotes: number })[]>>;
  getUserPolls: (
    userId: string,
    params: {
      page?: number;
      skip: number;
      limit?: number;
    }
  ) => Promise<PaginationResult<(Poll & { totalVotes: number })[]>>;
  createPoll: (pollData: CreatePollData) => Promise<Poll>;
  deletePoll: (pollId: string) => Promise<void>;
  votePoll: (
    pollId: string,
    answerId: string
  ) => Promise<Poll & { answers: Answer[] }>;
};

// Frontend
export type Api = {
  getPoll: (pollId: string) => Promise<Poll & { answers: Answer[] }>;
  getPolls: (
    page?: number,
    limit?: number
  ) => Promise<PaginationResult<(Poll & { totalVotes: number })[]>>;
  getUserPolls: (
    page?: number,
    limit?: number
  ) => Promise<PaginationResult<(Poll & { totalVotes: number })[]>>;
  createPoll: (pollData: CreatePollData) => Promise<Poll>;
  deletePoll: (pollId: string) => Promise<void>;
  votePoll: (
    pollId: string,
    answerId: string
  ) => Promise<Poll & { answers: Answer[] }>;
};
