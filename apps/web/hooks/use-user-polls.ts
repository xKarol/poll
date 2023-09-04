import { useInfiniteQuery } from "@tanstack/react-query";

import { userKeys } from "../queries/user";
import { getUserPolls } from "../services/api";

export const useUserPolls = () => {
  return useInfiniteQuery({
    queryKey: userKeys.userPolls,
    queryFn: ({ pageParam = 1 }) => getUserPolls(pageParam, 10),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};
