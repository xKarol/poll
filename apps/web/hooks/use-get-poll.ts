import { useQuery } from "@tanstack/react-query";
import { getPoll } from "../services/api";
import { pollKeys } from "../queries/poll";

export const useGetPoll = (pollId: string | undefined) => {
  return useQuery({
    queryKey: pollKeys.single(pollId),
    queryFn: () => getPoll(pollId),
    enabled: !!pollId,
  });
};
