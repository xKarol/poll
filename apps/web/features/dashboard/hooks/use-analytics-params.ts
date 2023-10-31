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
  const [value, intervalName] = intervals?.[interval] || [undefined, undefined];
  const { dateFrom, dateTo } = calculateDate(interval);
  return {
    dateFrom,
    dateTo,
    queryParam: interval,
    interval: intervalName,
    value,
  };
}

function calculateDate(value: string) {
  const convertedValue = convertIntervals[value];
  if (convertedValue === "1h") return dateDiff(1, "h");
  if (convertedValue === "24h") return dateDiff(24, "h");
  if (convertedValue === "7d") return dateDiff(7, "d");
  if (convertedValue === "30d") return dateDiff(30, "d");
  return dateDiff(24, "h");
}

function dateDiff(diff: number, unit: "h" | "d" | "m") {
  return {
    dateFrom: dayjs().subtract(diff, unit).unix() * 1000,
    dateTo: dayjs().unix() * 1000,
  };
}
