import { useInfiniteQuery } from "@tanstack/react-query";
import { getPolls } from "../services/api";
import { pollKeys } from "../queries/poll";

export const usePolls = () => {
  return useInfiniteQuery({
    queryKey: pollKeys.all,
    queryFn: ({ pageParam = 1 }) => getPolls(pageParam, 10),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};
