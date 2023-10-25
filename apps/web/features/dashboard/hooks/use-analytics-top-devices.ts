import { useQuery } from "@tanstack/react-query";

import { analyticsOptions } from "../../../queries/analytics";

const useAnalyticsTopDevices = () =>
  useQuery(analyticsOptions.getUserPollTopDevices);

export default useAnalyticsTopDevices;
