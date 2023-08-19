import { useQuery } from "@tanstack/react-query";
import { getPolls } from "../services/api";

export const usePolls = () => {
  // TODO use useInfiniteQuery
  return useQuery({ queryKey: ["polls"], queryFn: () => getPolls(1, 10) });
};
