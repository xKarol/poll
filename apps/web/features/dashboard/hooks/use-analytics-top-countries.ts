import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsTopCountries = (
  ...args: Parameters<typeof analyticsOptions.getUserPollTopCountries>
) => useQuery(analyticsOptions.getUserPollTopCountries(...args));

export default useAnalyticsTopCountries;
