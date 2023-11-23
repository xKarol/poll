import { useInfiniteQuery } from "@tanstack/react-query";

import { pollOptions } from "../queries/poll";

export const usePolls = (...args: Parameters<typeof pollOptions.all>) => {
  return useInfiniteQuery(pollOptions.all(...args));
};
