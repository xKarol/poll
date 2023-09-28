import type { Answer, User, Vote } from "@poll/prisma";

export type UpdateUserData = Partial<Pick<User, "email" | "name" | "image">>;

// Frontend
export interface Api {
  updateUser: (data: UpdateUserData) => Promise<User>;
}

// Backend
export interface Services {
  updateUser: (userId: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (userId: string) => Promise<undefined>;
  getUserVotes: (userId: string) => Promise<
    (Vote & {
      // poll: Poll; TODO FIX include this and fix error in /backend/services/user file
      answer: Answer;
    })[]
  >;
}
