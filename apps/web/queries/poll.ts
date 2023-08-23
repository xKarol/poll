export const pollKeys = {
  all: ["poll"] as const,
  single: (slug: string) => [...pollKeys.all, slug] as const,
};
