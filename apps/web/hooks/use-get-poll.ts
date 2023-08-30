import { useQuery } from "@tanstack/react-query";

import { pollOptions } from "../queries/poll";

export const useGetPoll = (pollId: string | undefined) => {
  return useQuery(pollOptions.single(pollId));
};
