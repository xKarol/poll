import { useQuery } from "@tanstack/react-query";

import { pollOptions } from "../queries/poll";

export const useGetPoll = (...args: Parameters<typeof pollOptions.single>) => {
  return useQuery(pollOptions.single(...args));
};
