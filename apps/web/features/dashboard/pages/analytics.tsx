import { DEFAULT_ANALYTICS_INTERVAL } from "@poll/config";
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
import numeral from "numeral";
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
          <Select
            onValueChange={setInterval}
            defaultValue={interval || DEFAULT_ANALYTICS_INTERVAL}>
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
          lastMonthValue={0}
          StatIcon={<Icon.Eye className="h-4 w-4" />}
        />
        <StatisticCard
          heading="Total Votes"
          statsValue={0}
          lastMonthValue={0}
          StatIcon={<Icon.CheckCircle className="h-4 w-4" />}
        />
        <StatisticCard
          heading="Total Shares"
          statsValue={0}
          lastMonthValue={0}
          StatIcon={<Icon.Share2 className="h-4 w-4" />}
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
  StatIcon: JSX.Element;
  statsValue: number;
  lastMonthValue: number;
} & React.ComponentPropsWithoutRef<"section">;

const pFormatter = (percent: number) => {
  return numeral(percent).format("+0.[00]a%").toUpperCase();
};

function StatisticCard({
  StatIcon,
  heading,
  statsValue,
  lastMonthValue,
  className,
}: StatisticCardProps) {
  const percent = (statsValue - lastMonthValue) / lastMonthValue;
  const monthDiffPercent = pFormatter(percent);
  const status =
    percent > 0 ? "increase" : percent < 0 ? "decrease" : "neutral";
  return (
    <section
      className={cn(
        "rounded border border-neutral-300 p-6 dark:border-neutral-800",
        className
      )}>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-sm font-medium">{heading}</h1>
        {StatIcon}
      </div>
      <h2 className="text-xl font-bold">{nFormatter(statsValue)}</h2>
      <p className="flex items-center space-x-1 text-xs text-neutral-400">
        {status === "increase" && (
          <Icon.ArrowUpRight className="h-3 w-3 text-green-400" />
        )}
        {status === "decrease" && (
          <Icon.ArrowDownRight className="h-3 w-3 text-red-400" />
        )}
        <span>{monthDiffPercent} from last month</span>
      </p>
    </section>
  );
}
