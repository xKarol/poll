import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsTopDevices = (
  ...args: Parameters<typeof analyticsOptions.getUserPollTopDevices>
) => useQuery(analyticsOptions.getUserPollTopDevices(...args));

export default useAnalyticsTopDevices;
