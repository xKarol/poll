import { useQuery } from "@tanstack/react-query";
import { getPoll } from "../services/api";

export const useGetPoll = (pollId: string) => {
  return useQuery({ queryKey: ["poll"], queryFn: () => getPoll(pollId) });
};
