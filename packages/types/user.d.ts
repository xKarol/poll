import type { User } from "@poll/prisma";

export type UpdateUserData = Partial<Pick<User, "email" | "name" | "image">>;

// Frontend
export interface Api {
  updateUser: (data: UpdateUserData) => Promise<User>;
}

// Backend
export interface Services {
  updateUser: (userId: string, data: UpdateUserData) => Promise<User>;
}
