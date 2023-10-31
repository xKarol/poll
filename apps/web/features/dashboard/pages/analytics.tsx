import { cn } from "@poll/lib";
import {
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@poll/ui";
import { useQueryState } from "next-usequerystate";
import React from "react";

import { nFormatter } from "../../../utils/misc";
import {
  Header,
  TopCountries,
  TopDevices,
  VotesAreaChart,
} from "../components";
import { BaseLayout } from "../layouts";

const AnalyticsPage = () => {
  const [interval, setInterval] = useQueryState("interval");
  return (
    <BaseLayout>
      <Header
        heading="Analytics"
        ActionComponent={
          <Select onValueChange={setInterval} defaultValue={interval || "24h"}>
            <SelectTrigger className="min-w-[180px] max-w-max">
              <div className="flex items-center space-x-2">
                <Icon.Calendar className="h-4 w-4" />
                <SelectValue placeholder="Select a language" />
              </div>
            </SelectTrigger>
            <SelectContent
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatisticCard
          heading="Total Views"
          statsValue={0}
          statsDifference="+0% from last month"
          Icon={<Icon.Eye className="h-4 w-4" />}
        />
        <StatisticCard
          heading="Total Votes"
          statsValue={0}
          statsDifference="+0% from last month"
          Icon={<Icon.CheckCircle className="h-4 w-4" />}
        />
        <StatisticCard
          heading="Total Shares"
          statsValue={0}
          statsDifference="+0% from last month"
          Icon={<Icon.Share2 className="h-4 w-4" />}
        />
        <VotesAreaChart className="row-span-2 h-[300px] sm:col-span-2 lg:h-[500px]" />
        <div className="flex flex-wrap gap-4 lg:flex-col lg:flex-nowrap lg:gap-0 lg:space-y-8">
          <TopCountries className="min-w-[160px] flex-1" />
          <TopDevices className="min-w-[160px] flex-1" />
        </div>
      </div>
    </BaseLayout>
  );
};

export default AnalyticsPage;

type StatisticCardProps = {
  heading: string;
  Icon: JSX.Element;
  statsValue: number;
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
      <h2 className="text-xl font-bold">{nFormatter(statsValue)}</h2>
      <p className="text-xs text-neutral-400">{statsDifference}</p>
    </section>
  );
}
