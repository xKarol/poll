import type { Poll } from "prisma";

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
  getPoll: (pollId: string) => Promise<Poll>;
  createPoll: (pollData: CreatePollData) => Promise<Poll>;
  deletePoll: (pollId: string) => Promise<void>;
};
