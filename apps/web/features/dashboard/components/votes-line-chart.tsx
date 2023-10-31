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
  type TooltipProps,
} from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import { nFormatter } from "../../../utils/misc";
import { useAnalyticsParams, useAnalyticsVotes } from "../hooks";

type VotesLineChartProps = React.ComponentProps<typeof ResponsiveContainer>;

// TODO improve
const formatTick = (tick: string, unit: "h" | "d" | "m") => {
  if (unit === "d") return dayjs(tick).format("DD.MM");
  return dayjs(tick).format("HH:mm");
};

export default function VotesLineChart({
  className,
  ...props
}: VotesLineChartProps) {
  const { interval, startDate, endDate } = useAnalyticsParams();
  const { data } = useAnalyticsVotes({
    interval,
    startDate,
    endDate,
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
      <LineChart
        data={data?.length ? sortData(data) : []}
        margin={{ left: 8, bottom: 8 }}>
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
          domain={[startDate, endDate]}
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
        <Line
          type="monotone"
          dataKey="total"
          stroke="#98FB98"
          activeDot={{ r: 8 }}
        />
      </LineChart>
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
