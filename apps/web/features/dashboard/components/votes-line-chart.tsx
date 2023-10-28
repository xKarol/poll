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

import { useVotesAnalytics } from "../hooks";

type VotesLineChartProps = React.ComponentPropsWithoutRef<"div">;

const sortData = (d: Analytics.VotesData[]) => {
  return [
    ...d.map((dd) => ({
      total: dd.total,
      timestamp: dayjs(dd.timestamp).unix() * 1000,
    })),
  ];
};

export default function VotesLineChart({
  className,
  ...props
}: VotesLineChartProps) {
  const d = useVotesAnalytics();

  console.log(d.data);
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
          data={d.isSuccess ? sortData(d.data) : []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tick) => dayjs(tick).format("HH:mm")}
            type="number"
            scale="time"
            domain={["dataMin", "dataMax"]}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
