import { useQueryState } from "next-usequerystate";

const intervals = {
  "1h": [1, "hour"],
  "1d": [1, "day"],
  "7d": [7, "day"],
  "30d": [30, "day"],
} as const;

export default function useAnalyticsQueryParams() {
  const [interval] = useQueryState("interval");
  const [value, intervalName] = intervals?.[interval] || [undefined, undefined];
  return {
    interval: intervalName,
    value,
  };
}
