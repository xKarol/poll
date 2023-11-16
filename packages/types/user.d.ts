import type { Answer, User, Vote, Poll } from "@poll/prisma";

import type { PaginationResult, SortingParams } from "./global.d.ts";

export type UpdateUserData = Partial<
  Pick<User, "email" | "name" | "image" | "timeZone" | "clockType">
>;

export type GetUserVotesResponse = (Vote & {
  poll: Poll;
  answer: Answer;
})[];

export type SortVotesFields = Extract<keyof Vote, "createdAt">;
export type SortPollsFields = Extract<
  keyof Poll,
  "createdAt" | "totalVotes" | "isPublic"
>;

// Frontend
export interface Api {
  updateUser: (data: UpdateUserData) => Promise<User>;
  deleteUser: () => Promise<undefined>;
  getUserPolls: (
    params: {
      page?: number;
      limit?: number;
    } & SortingParams<SortPollsFields>
  ) => Promise<PaginationResult<Poll[]>>;
  getUserVotes: (
    params: {
      page?: number;
      limit?: number;
    } & SortingParams<SortVotesFields>
  ) => Promise<PaginationResult<GetUserVotesResponse>>;
}

// Backend
export interface Services {
  updateUser: (userId: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (userId: string) => Promise<undefined>;
  getUserPolls: (
    params: {
      userId: string;
      page?: number;
      skip: number;
      limit?: number;
    } & SortingParams<SortPollsFields>
  ) => Promise<PaginationResult<Poll[]>>;
  getUserVotes: (
    params: {
      userId: string;
      page?: number;
      skip: number;
      limit?: number;
    } & SortingParams<SortVotesFields>
  ) => Promise<PaginationResult<GetUserVotesResponse>>;
}
