import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsTopCountries = () =>
  useQuery(analyticsOptions.getUserPollTopCountries);

export default useAnalyticsTopCountries;
