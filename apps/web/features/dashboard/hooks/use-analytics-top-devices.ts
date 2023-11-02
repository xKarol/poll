import type { Analytics } from "@poll/types";
import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsTopDevices = (params?: Analytics.ClientAnalyticsParams) =>
  useQuery(analyticsOptions.getUserPollTopDevices(params));

export default useAnalyticsTopDevices;
