import type { Poll, Answer, User, Vote } from "@poll/prisma";

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

export type GetVoteUsersData = {
  pollId: string;
};

export type PaginationResult<T = unknown> = {
  data: T;
  nextPage: number | undefined;
};

// Backend
export type Services = {
  getPoll: (
    pollId: string
  ) => Promise<Poll & { answers: Answer[]; user?: User }>;
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
  votePoll: (params: {
    userId?: string;
    pollId: string;
    answerId: string;
  }) => Promise<Vote>;
  getPollVoters: (pollId: string) => Promise<User[]>;
};

// Frontend
export type Api = {
  getPoll: (
    pollId: string
  ) => Promise<Poll & { answers: Answer[]; user?: User }>;
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
  votePoll: (pollId: string, answerId: string) => Promise<Vote>;
  getPollVoters: (pollId: string) => Promise<User[]>;
};
