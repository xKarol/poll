import { useInfiniteQuery } from "@tanstack/react-query";

import { userOptions } from "../../../queries/user";

const useUserPolls = (...args: Parameters<typeof userOptions.getUserPolls>) => {
  return useInfiniteQuery(userOptions.getUserPolls(...args));
};
export default useUserPolls;
