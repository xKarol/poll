type ROUTE = string | ((...args: string[]) => string);

export const routes = {
  HOME: "/",
  CREATE_POLL: "/create",
  PUBLIC_POLLS: "/public",
  poll: (pollId: string) => `/${pollId}`,
} satisfies Record<string, ROUTE>;
