import type { Answer, User, Vote } from "@poll/prisma";

export type UpdateUserData = Partial<
  Pick<User, "email" | "name" | "image" | "timeZone" | "clockType">
>;

// TODO import this style
export type PaginationResult<T = unknown> = {
  data: T;
  nextPage: number | undefined;
};

export type GetUserVotesResponse = (Vote & {
  // poll: Poll; TODO FIX include this and fix error in /backend/services/user file
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
