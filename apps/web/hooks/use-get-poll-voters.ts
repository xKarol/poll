import { useQuery } from "@tanstack/react-query";

import { pollOptions } from "../queries/poll";

export const useGetPollVoters = (
  ...args: Parameters<typeof pollOptions.getPollVoters>
) => {
  return useQuery(pollOptions.getPollVoters(...args));
};
