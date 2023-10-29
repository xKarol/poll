import type { Poll, SortingParams } from "@poll/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { pollOptions } from "../queries/poll";

export const usePolls = (sortParams?: SortingParams<Poll.SortPollFields>) => {
  return useInfiniteQuery(pollOptions.all(sortParams));
};
