import { cn } from "@poll/lib";
import { Icon } from "@poll/ui";
import dayjs from "dayjs";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import Heading from "../components/heading";
import { useVotesAnalytics } from "../hooks";
import { BaseLayout } from "../layouts";

// TODO change param type
const sortData = (d: unknown[]) => {
  return [
    ...d.map((dd) => ({
      // @ts-expect-error
      totalVotes: dd.totalVotes,
      // @ts-expect-error
      timestamp: dayjs(dd.timestamp).unix(),
    })),
  ];
};

const StatisticsPage = () => {
  const d = useVotesAnalytics();
  console.log(d.data);

  return (
    <BaseLayout>
      <Heading className="mb-5">Statistics</Heading>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <StatisticCard
          className="flex-1"
          heading="Total Views"
          statsValue="0"
          statsDifference="+0% from last month"
          Icon={<Icon.Eye className="h-4 w-4" />}
        />
        <StatisticCard
          className="flex-1"
          heading="Total Votes"
          statsValue="0"
          statsDifference="+0% from last month"
          Icon={<Icon.CheckCircle className="h-4 w-4" />}
        />
        <StatisticCard
          className="flex-1"
          heading="Total Shares"
          statsValue="0"
          statsDifference="+0% from last month"
          Icon={<Icon.Share2 className="h-4 w-4" />}
        />
      </div>
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
            tickFormatter={(tick) => dayjs(tick).format("MMM")}
            type="number"
            scale="time"
            domain={["dataMin", "dataMax"]}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalVotes"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseLayout>
  );
};

export default StatisticsPage;

type StatisticCardProps = {
  heading: string;
  Icon: JSX.Element;
  statsValue: string;
  statsDifference: string;
} & React.ComponentPropsWithoutRef<"section">;

function StatisticCard({
  Icon,
  heading,
  statsValue,
  statsDifference,
  className,
}: StatisticCardProps) {
  return (
    <section
      className={cn(
        "rounded-[4px] border border-neutral-300 p-6 dark:border-neutral-800",
        className
      )}>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-sm font-medium">{heading}</h1>
        {Icon}
      </div>
      <h2 className="text-xl font-bold">{statsValue}</h2>
      <p className="text-xs text-neutral-400">{statsDifference}</p>
    </section>
  );
}
