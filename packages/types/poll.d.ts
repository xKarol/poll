import type { Poll, Answer, User, Vote } from "@poll/prisma";

import type {
  PaginationParams,
  PaginationResponse,
  SortingParams,
} from "./global.d.ts";

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

export type SortPollFields = Extract<keyof Poll, "createdAt" | "totalVotes">;

export type UpdatePollData = Partial<
  Pick<Poll, "isPublic" | "requireRecaptcha" | "question">
>;

// Frontend
export interface Api {
  getPoll: (
    pollId: string
  ) => Promise<Poll & { answers: Answer[]; user: User | null }>;
  getPolls: (
    params: PaginationParams & SortingParams<SortPollFields>
  ) => Promise<
    PaginationResponse<(Poll & { user: User; userId: string | null })[]>
  >;
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
// @ts-expect-error
export interface Services extends Api {
  getPolls: (
    params: PaginationParams & {
      skip: number;
    } & SortingParams<SortPollFields>
  ) => Promise<
    PaginationResponse<(Poll & { user: User; userId: string | null })[]>
  >;
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
