import { DEFAULT_ANALYTICS_INTERVAL } from "@poll/config";
import dayjs from "dayjs";
import { useQueryState } from "next-usequerystate";

const intervals = {
  "1h": [1, "hour"],
  "24h": [24, "hour"],
  "7d": [7, "day"],
  "30d": [30, "day"],
} as const;

export default function useAnalyticsQueryParams() {
  const [interval] = useQueryState("interval");
  const [, groupBy] = intervals[interval] || [24, "hour"];
  const { dateFrom, dateTo } = calculateDate(interval);
  return {
    dateFrom,
    dateTo,
    groupBy,
    interval: interval || DEFAULT_ANALYTICS_INTERVAL,
    queryParams: { interval },
  };
}

function calculateDate(value: string) {
  if (value === "1h") return dateDiff(1, "hour");
  if (value === "24h") return dateDiff(24, "hour");
  if (value === "7d") return dateDiff(7, "day");
  if (value === "30d") return dateDiff(30, "day");
  return dateDiff(24, "h");
}

function dateDiff(diff: number, unit: dayjs.ManipulateType) {
  return {
    dateFrom: dayjs().subtract(diff, unit).unix(),
    dateTo: dayjs().unix(),
  };
}
