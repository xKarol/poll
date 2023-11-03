import type { Analytics } from "@poll/types";

export const DEFAULT_ANALYTICS_INTERVAL: Analytics.Interval = "24h" as const;
// @ts-ignore
export const validAnalyticsIntervals: Analytics.Interval[] = [
  "1h",
  "24h",
  "7d",
  "30d",
  "1y",
] as const;
