import { useQuery } from "@tanstack/react-query";
import { getPolls } from "../services/api";
import { pollKeys } from "../queries/poll";

export const usePolls = () => {
  // TODO use useInfiniteQuery
  return useQuery({ queryKey: pollKeys.all, queryFn: () => getPolls(1, 10) });
};
