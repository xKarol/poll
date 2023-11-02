import dayjs from "dayjs";
import { useQueryState } from "next-usequerystate";

const intervals = {
  "1h": [1, "hour"],
  "1d": [1, "day"],
  "7d": [7, "day"],
  "30d": [30, "day"],
} as const;

const convertIntervals = {
  "1h": "1h",
  "1d": "24h",
  "7d": "7d",
  "30d": "30d",
};

export default function useAnalyticsQueryParams() {
  const [interval] = useQueryState("interval");
  const [, groupBy] = intervals[interval] || [24, "hour"];
  const { dateFrom, dateTo } = calculateDate(interval);
  return {
    dateFrom,
    dateTo,
    groupBy,
    interval: interval || "24h",
    queryParams: { interval },
  };
}

function calculateDate(value: string) {
  const convertedValue = convertIntervals[value];
  if (convertedValue === "1h") return dateDiff(1, "hour");
  if (convertedValue === "24h") return dateDiff(24, "hour");
  if (convertedValue === "7d") return dateDiff(7, "day");
  if (convertedValue === "30d") return dateDiff(30, "day");
  return dateDiff(24, "h");
}

function dateDiff(diff: number, unit: dayjs.ManipulateType) {
  return {
    dateFrom: dayjs().subtract(diff, unit).unix(),
    dateTo: dayjs().unix(),
  };
}
