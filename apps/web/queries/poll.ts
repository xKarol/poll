export const pollKeys = {
  all: ["poll"] as const,
  single: (pollId: string) => [...pollKeys.all, pollId] as const,
};
