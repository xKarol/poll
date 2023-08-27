import type { Poll, Answer } from "prisma";

export type CreatePollData = {
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

export type GetPollsData = {
  page?: string;
  limit?: string;
};

export type VotePollData = {
  pollId: string;
  answerId: string;
};

export type PaginationResult<T> = {
  data: T;
  nextPage: number | undefined;
};

export type Services = {
  getPoll: (pollId: string) => Promise<Poll & { answers: Answer[] }>;
  getPolls: (
    page?: number,
    limit?: number
  ) => Promise<PaginationResult<Poll[]>>;
  createPoll: (pollData: CreatePollData) => Promise<Poll>;
  deletePoll: (pollId: string) => Promise<void>;
  votePoll: (
    pollId: string,
    answerId: string
  ) => Promise<Poll & { answers: Answer[] }>;
};
