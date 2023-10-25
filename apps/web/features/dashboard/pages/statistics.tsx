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

import { TopDevices } from "../components";
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
      <div className="flex h-full space-x-8">
        <div className="flex-1 rounded-[4px] border border-neutral-300 dark:border-neutral-800">
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
        </div>
        <div className="flex flex-col space-y-4">
          <section className="w-60 space-y-2">
            <h1 className="text-sm font-medium">Top countries</h1>
            <div className="flex flex-col space-y-1">
              <Country
                countryName="Poland"
                countryFlag={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="10"
                    id="Flag of Poland"
                    viewBox="0 0 16 10">
                    <rect width="16" height="10" fill="#fff" />
                    <rect width="16" height="5" fill="#dc143c" y="5" />
                  </svg>
                }
                value={124}
              />
              <Country
                countryName="USA"
                countryFlag={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="10"
                    viewBox="0 0 7410 3900">
                    <rect width="7410" height="3900" fill="#b22234" />
                    <path
                      d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
                      stroke="#fff"
                      stroke-width="300"
                    />
                    <rect width="2964" height="2100" fill="#3c3b6e" />
                    <g fill="#fff">
                      <g id="s18">
                        <g id="s9">
                          <g id="s5">
                            <g id="s4">
                              <path
                                id="s"
                                d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"
                              />
                              <use y="420" />
                              <use y="840" />
                              <use y="1260" />
                            </g>
                            <use y="1680" />
                          </g>
                          <use x="247" y="210" />
                        </g>
                        <use x="494" />
                      </g>
                      <use x="988" />
                      <use x="1976" />
                      <use x="2470" />
                    </g>
                  </svg>
                }
                value={87}
              />
            </div>
          </section>
          <TopDevices />
        </div>
      </div>
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

type CountryProps = {
  countryFlag: JSX.Element;
  countryName: string;
  value: number;
} & React.ComponentPropsWithoutRef<"section">;

function Country({ countryFlag, countryName, value, className }: CountryProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between rounded-[4px] bg-neutral-100 px-4 py-2 text-xs dark:bg-neutral-800",
        className
      )}>
      <div className="flex items-center space-x-4">
        {countryFlag}
        <span>{countryName}</span>
      </div>

      <div className="flex items-center space-x-1">
        <span className="font-medium">{value}</span>
        <Icon.BarChart2 className="h-3 w-3" />
      </div>
    </div>
  );
}
