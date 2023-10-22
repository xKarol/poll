import type { Poll, Answer, User, Vote } from "@poll/prisma";

import type { PaginationResult } from "./global.d.ts";

export type CreatePollData = {
  userId?: string;
  question: string;
  answers: Pick<Answer, "text">[];
  isPublic?: boolean;
  requireRecaptcha?: boolean;
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

export type UpdatePollData = Partial<
  Pick<Poll, "isPublic" | "requireRecaptcha" | "question">
>;

// Frontend
export interface Api {
  getPoll: (
    pollId: string
  ) => Promise<Poll & { answers: Answer[]; user: User | null }>;
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
  updatePoll: (data: UpdatePollData) => Promise<Poll>;
  votePoll: (
    pollId: string,
    answerId: string,
    reCaptchaToken: string
  ) => Promise<Vote>;
  getPollVoters: (pollId: string) => Promise<User[]>;
  getPollUserAnswerChoice: (pollId: string) => Promise<Vote | null>;
}

// Backend
export interface Services extends Api {
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
  updatePoll: (pollId: string, data: UpdatePollData) => Promise<Poll>;
  votePoll: (params: {
    userId?: string;
    pollId: string;
    answerId: string;
  }) => Promise<Vote>;
  getPollUserAnswerChoice: (
    userId: string,
    pollId: string
  ) => Promise<Vote | null>;
}
