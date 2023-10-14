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
    ...Array.from({ length: 11 }, (_, index) => ({
      name: dayjs().set("M", index).format("MMM"),
      totalVotes: 0,
      time: 0,
    })),
    ...d.map((dd) => ({
      // @ts-expect-error
      name: dayjs(dd.time).format("MMM"),
      totalVotes: d.filter(
        // @ts-expect-error
        (ddd) => dayjs(ddd.time).day() === dayjs(dd.time).day()
      ).length,
      // @ts-expect-error
      time: dd.time,
    })),
  ];
};

const StatisticsPage = () => {
  const d = useVotesAnalytics();
  console.log(d.data);

  return (
    <BaseLayout>
      <Heading className="mb-5">Statistics</Heading>
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
            dataKey="time"
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
