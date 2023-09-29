export const userKeys = {
  userPolls: ["user.polls"] as const,
  getPollVotes: ["user.votes"] as const,
};

export const userOptions = {
  userPolls: {},
  getPollVotes: {},
} satisfies Record<keyof typeof userKeys, unknown>;
