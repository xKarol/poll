type ROUTE = string | ((...args: string[]) => string);

export const routes = {
  HOME: "/",
  CREATE_POLL: "/create",
  PRICING: "/pricing",
  FEATURES: "/", //TODO change
  PUBLIC_POLLS: "/public",
  LOGIN: "/login",
  USER_POLLS: "/account/polls",
  poll: (pollId: string) => `/${pollId}` as const,
} as const satisfies Record<string, ROUTE>;
