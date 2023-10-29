import type { Analytics } from "@poll/types";
import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsTopCountries = (params: Analytics.DefaultAnalyticsProps) =>
  useQuery(analyticsOptions.getUserPollTopCountries(params));

export default useAnalyticsTopCountries;
