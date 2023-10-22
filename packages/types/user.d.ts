import type { Answer, User, Vote } from "@poll/prisma";

import type { PaginationResult } from "./global.d.ts";

export type UpdateUserData = Partial<
  Pick<User, "email" | "name" | "image" | "timeZone" | "clockType">
>;

export type GetUserVotesResponse = (Vote & {
  poll: Poll;
  answer: Answer;
})[];

// Frontend
export interface Api {
  updateUser: (data: UpdateUserData) => Promise<User>;
  deleteUser: () => Promise<undefined>;
  getUserVotes: (
    page?: number,
    limit?: number
  ) => Promise<PaginationResult<GetUserVotesResponse>>;
}

// Backend
export interface Services {
  updateUser: (userId: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (userId: string) => Promise<undefined>;
  getUserVotes: (
    userId: string,
    params: {
      page?: number;
      skip: number;
      limit?: number;
    }
  ) => Promise<PaginationResult<GetUserVotesResponse>>;
}
