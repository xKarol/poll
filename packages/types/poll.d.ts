import type { Poll, Answer } from "prisma";

export type CreatePollData = {
  question: string;
  answers: { text: string }[];
};

export type DeletePollData = {
  pollId: string;
};

export type GetPollData = {
  pollId: string;
};

export type Services = {
  getPoll: (pollId: string) => Promise<Poll & { answers: Answer[] }>;
  createPoll: (pollData: CreatePollData) => Promise<Poll>;
  deletePoll: (pollId: string) => Promise<void>;
};
