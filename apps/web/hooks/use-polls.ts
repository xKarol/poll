import { useInfiniteQuery } from "@tanstack/react-query";

import { pollKeys } from "../queries/poll";
import { getPolls } from "../services/api";

export const usePolls = () => {
  return useInfiniteQuery({
    queryKey: pollKeys.all,
    queryFn: ({ pageParam = 1 }) => getPolls({ page: pageParam, limit: 10 }),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};
