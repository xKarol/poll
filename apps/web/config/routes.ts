type RouteValue = string | ((...args: string[]) => string);
type Route = {
  [key: string]: RouteValue | Route;
};

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
  SETTINGS: {
    HOME: "/settings",
    ACCOUNT: {
      GENERAL: "/settings/account",
      EDIT: "/settings/account/edit",
    },
    PREFERENCES: {
      THEMES: "/settings/preferences/themes",
    },
  },
  poll: (pollId: string) => `/${pollId}` as const,
} as const satisfies Route;
