import { cn } from "@poll/lib";
import { Icon } from "@poll/ui";
import React from "react";

import {
  Header,
  TopCountries,
  TopDevices,
  VotesLineChart,
} from "../components";
import { BaseLayout } from "../layouts";

const AnalyticsPage = () => {
  return (
    <BaseLayout>
      <Header heading="Analytics" />
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
        <VotesLineChart />
        <div className="flex flex-col space-y-4">
          <TopCountries />
          <TopDevices />
        </div>
      </div>
    </BaseLayout>
  );
};

export default AnalyticsPage;

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
