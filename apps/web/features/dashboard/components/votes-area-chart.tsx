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
  AreaChart,
  type TooltipProps,
  Area,
} from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import { nFormatter } from "../../../utils/misc";
import { useAnalyticsParams, useAnalyticsVotes } from "../hooks";

type VotesAreaChartProps = Omit<
  React.ComponentProps<typeof ResponsiveContainer>,
  "children"
>;

// TODO improve
const formatTick = (tick: number, unit: "h" | "d" | "m") => {
  if (unit === "d") return dayjs(tick).format("DD.MM");
  return dayjs(tick).format("HH:mm");
};

export default function VotesAreaChart({
  className,
  ...props
}: VotesAreaChartProps) {
  const { interval, dateFrom, dateTo } = useAnalyticsParams();
  const { data } = useAnalyticsVotes({
    interval,
    dateFrom,
    dateTo,
  });

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      aspect={16 / 9}
      className={cn(
        "rounded-[4px] border border-neutral-300 dark:border-neutral-800",
        className
      )}
      {...props}>
      <AreaChart
        data={data?.length ? sortData(data) : []}
        margin={{ left: 8, bottom: 8 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#98FB98" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#98FB98" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3"
          strokeWidth={1}
          vertical={false}
          stroke="#A3A3A3"
          strokeOpacity={0.1}
        />
        <XAxis
          tickMargin={10}
          axisLine={false}
          height={30}
          dataKey="timestamp"
          // TODO get unit from queryparams hook
          tickFormatter={(tick) => formatTick(tick, interval?.[0])}
          type="number"
          tickCount={24}
          domain={[dateFrom * 1000, dateTo * 1000]}
        />
        <YAxis
          tickMargin={10}
          axisLine={false}
          width={30}
          allowDecimals={false}
          type="number"
          domain={[0, "auto"]}
          tickFormatter={nFormatter}
        />
        <Tooltip content={<CustomTooltip />} />

        <Area
          dataKey="total"
          type="monotone"
          stroke="#98FB98"
          fill={`url(#colorUv)`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[4px] border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p>
          <strong className="font-medium">Date:</strong>{" "}
          <span>{dayjs(label).format("DD MMM YYYY  HH:mm:ss")}</span>
        </p>
        <p>
          <strong className="font-medium">Total:</strong>{" "}
          <span>{nFormatter(+payload[0].value)}</span>
        </p>
      </div>
    );
  }

  return null;
}

function sortData(data: Analytics.VotesData[]) {
  return [
    ...data
      .map((voteData) => ({
        ...voteData,
        timestamp: voteData.timestamp * 1000,
      }))
      .sort((a, b) => a.timestamp - b.timestamp),
  ];
}
