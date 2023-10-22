import type { Poll, SortingParams } from "@poll/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { pollKeys } from "../queries/poll";
import { getPolls } from "../services/api";

export const usePolls = (sortParams?: SortingParams<Poll.SortPollFields>) => {
  return useInfiniteQuery({
    queryKey: pollKeys.all(sortParams),
    queryFn: ({ pageParam = 1 }) => {
      return getPolls({ page: pageParam, limit: 10, ...sortParams });
    },
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};
