export const userKeys = {
  userPolls: ["user.polls"] as const,
};

export const userOptions = {
  userPolls: {},
} satisfies Record<keyof typeof userKeys, unknown>;
