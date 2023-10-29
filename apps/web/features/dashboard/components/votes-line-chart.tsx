import { cn } from "@poll/lib";
import type { Analytics } from "@poll/types";
import dayjs from "dayjs";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { useAnalyticsQueryParams, useAnalyticsVotes } from "../hooks";

type VotesLineChartProps = React.ComponentPropsWithoutRef<"div">;

const sortData = (d: Analytics.VotesData[]) => {
  return [
    ...d.map((dd) => ({
      total: dd.total,
      timestamp: dayjs(dd.timestamp).unix() * 1000,
    })),
  ];
};

const dateDiff = (diff: number, unit: "h" | "d" | "m") => ({
  startDate: dayjs().subtract(diff, unit).unix() * 1000,
  endDate: dayjs().unix() * 1000,
});

const calculateDate = (value: string) => {
  if (value === "1h") return dateDiff(60, "m");
  if (value === "24h") return dateDiff(24, "h");
  if (value === "7d") return dateDiff(7, "d");
  if (value === "30d") return dateDiff(30, "d");
  return dateDiff(60, "m");
};

// TODO improve
const formatTick = (tick: string, unit: "h" | "d" | "m") => {
  if (unit === "d") return dayjs(tick).format("DD.MM");
  return dayjs(tick).format("HH:mm");
};

export default function VotesLineChart({
  className,
  ...props
}: VotesLineChartProps) {
  const { interval, queryParam } = useAnalyticsQueryParams();
  const d = useAnalyticsVotes({
    interval,
  });
  const { startDate, endDate } = calculateDate(queryParam);

  return (
    <div
      className={cn(
        "flex-1 rounded-[4px] border border-neutral-300 dark:border-neutral-800",
        className
      )}
      {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={d.isSuccess ? sortData(d.data) : []}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#A3A3A3"
            strokeOpacity={0.2}
          />
          <XAxis
            dataKey="timestamp"
            // TODO get unit from queryparams hook
            tickFormatter={(tick) => formatTick(tick, interval?.[0])}
            type="number"
            tickCount={24}
            domain={[startDate, endDate]}
          />
          <YAxis type="number" domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#98FB98"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
