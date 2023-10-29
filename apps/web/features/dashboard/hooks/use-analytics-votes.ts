import type { Analytics } from "@poll/types";
import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsVotes = (
  params: Analytics.getUserPollVotesParams = { interval: "hour" }
) => useQuery(analyticsOptions.getUserPollsVotes(params));

export default useAnalyticsVotes;
