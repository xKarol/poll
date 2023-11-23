import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsVotes = (
  ...args: Parameters<typeof analyticsOptions.getUserPollsVotes>
) => useQuery(analyticsOptions.getUserPollsVotes(...args));

export default useAnalyticsVotes;
