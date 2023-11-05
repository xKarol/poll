import {
  DEFAULT_ANALYTICS_INTERVAL,
  validAnalyticsIntervals,
} from "@poll/config";
import type { Analytics } from "@poll/types";
import dayjs from "dayjs";
import { useQueryState } from "next-usequerystate";

const intervals: Record<
  Analytics.Interval,
  readonly [number, Analytics.GroupBy]
> = {
  "1h": [60, "minute"],
  "24h": [24, "hour"],
  "7d": [7, "day"],
  "30d": [30, "day"],
  "1y": [12, "month"],
} as const;

export default function useAnalyticsQueryParams() {
  const [interval] = useQueryState("interval");
  const isValidInterval = validAnalyticsIntervals.includes(
    interval as unknown as Analytics.Interval
  );
  const [, groupBy] = isValidInterval ? intervals[interval] : [24, "hour"];
  const { dateFrom, dateTo } = calculateDate(interval);
  return {
    dateFrom,
    dateTo,
    groupBy,
    interval: isValidInterval ? interval : DEFAULT_ANALYTICS_INTERVAL,
    queryParams: { interval },
  };
}

function calculateDate(value: string) {
  if (value === "1h") return dateDiff(1, "hour");
  if (value === "24h") return dateDiff(24, "hour");
  if (value === "7d") return dateDiff(7, "day");
  if (value === "30d") return dateDiff(30, "day");
  if (value === "1y") return dateDiff(12, "month");
  return dateDiff(24, "h");
}

function dateDiff(diff: number, unit: dayjs.ManipulateType) {
  return {
    dateFrom: dayjs().subtract(diff, unit).unix(),
    dateTo: dayjs().unix(),
  };
}
