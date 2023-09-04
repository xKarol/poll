export const userKeys = {
  userPolls: ["user.polls"] as const,
};

export const pollOptions = {
  userPolls: {},
} satisfies Record<keyof typeof userKeys, unknown>;
