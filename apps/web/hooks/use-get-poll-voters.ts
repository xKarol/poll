import { useQuery } from "@tanstack/react-query";

import { pollOptions } from "../queries/poll";

export const useGetPollVoters = (pollId: string | undefined) => {
  return useQuery(pollOptions.getPollVoters(pollId));
};
