import type { Answer, User, Vote, Poll } from "@poll/prisma";

import type {
  PaginationParams,
  PaginationResponse,
  SortingParams,
} from "./global.d.ts";

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
    params: PaginationParams & SortingParams<SortPollsFields>
  ) => Promise<PaginationResponse<Poll[]>>;
  getUserVotes: (
    params: PaginationParams & SortingParams<SortVotesFields>
  ) => Promise<PaginationResponse<GetUserVotesResponse>>;
}

// Backend
export interface Services {
  updateUser: (userId: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (userId: string) => Promise<undefined>;
  getUserPolls: (
    params: PaginationParams & {
      userId: string;
      skip: number;
    } & SortingParams<SortPollsFields>
  ) => Promise<PaginationResponse<Poll[]>>;
  getUserVotes: (
    params: PaginationParams & {
      userId: string;
      skip: number;
    } & SortingParams<SortVotesFields>
  ) => Promise<PaginationResponse<GetUserVotesResponse>>;
}
