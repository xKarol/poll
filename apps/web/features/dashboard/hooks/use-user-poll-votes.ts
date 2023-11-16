import { useInfiniteQuery } from "@tanstack/react-query";

import { userKeys } from "../../../queries/user";
import { getUserVotes } from "../../../services/api";

const useUserPollVotes = () => {
  return useInfiniteQuery({
    queryKey: userKeys.getPollVotes,
    queryFn: ({ pageParam = 1 }) =>
      getUserVotes({ page: pageParam, limit: 10 }),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};

export default useUserPollVotes;
