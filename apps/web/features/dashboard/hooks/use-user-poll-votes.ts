import { useInfiniteQuery } from "@tanstack/react-query";

import { userOptions } from "../../../queries/user";

const useUserPollVotes = (
  ...args: Parameters<typeof userOptions.getUserPollVotes>
) => {
  return useInfiniteQuery(userOptions.getUserPollVotes(...args));
};

export default useUserPollVotes;
