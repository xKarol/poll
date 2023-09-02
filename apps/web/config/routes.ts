type ROUTE = string | ((...args: string[]) => string);

export const routes = {
  HOME: "/",
  CREATE_POLL: "/create",
  PUBLIC_POLLS: "/public",
  LOGIN: "/login",
  poll: (pollId: string) => `/${pollId}`,
} satisfies Record<string, ROUTE>;
