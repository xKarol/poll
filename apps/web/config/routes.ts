type ROUTE =
  | (string | ((...args: string[]) => string))
  | Record<string, string | ((...args: string[]) => string)>;

export const routes = {
  HOME: "/",
  CREATE_POLL: "/create",
  PRICING: "/pricing",
  FEATURES: "/", //TODO change
  PUBLIC_POLLS: "/public",
  LOGIN: "/login",
  DASHBOARD: {
    HOME: "/dashboard",
    POLLS: "/dashboard/polls",
    VOTES: "/dashboard/votes",
    STATISTICS: "/dashboard/statistics",
  },
  poll: (pollId: string) => `/${pollId}` as const,
} as const satisfies Record<string, ROUTE>;
