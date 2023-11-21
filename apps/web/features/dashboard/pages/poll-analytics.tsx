import { DEFAULT_ANALYTICS_INTERVAL } from "@poll/config";
import {
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@poll/ui";
import { useQueryState } from "next-usequerystate";
import React from "react";

import { useHasPermission } from "../../../hooks/use-has-permission";
import {
  AnalyticsCard,
  Header,
  TopCountries,
  TopDevices,
  VotesAreaChart,
} from "../components";
import { BaseLayout } from "../layouts";

const PollAnalyticsPage = () => {
  const [interval, setInterval] = useQueryState("interval");
  const { hasPermission } = useHasPermission();
  const hasBasicPlan = hasPermission("BASIC");
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
              <Tooltip
                open={hasBasicPlan ? false : undefined}
                disableHoverableContent>
                <TooltipTrigger asChild>
                  <SelectItem value="1y" disabled={!hasBasicPlan}>
                    Last year
                  </SelectItem>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent>
                    <p>Basic plan or higher is required to use this option.</p>
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </SelectContent>
          </Select>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AnalyticsCard
          heading="Total Views"
          statsValue={0}
          lastMonthValue={0}
          StatIcon={<Icon.Eye className="h-4 w-4" />}
        />
        <AnalyticsCard
          heading="Total Votes"
          statsValue={0}
          lastMonthValue={0}
          StatIcon={<Icon.CheckCircle className="h-4 w-4" />}
        />
        <AnalyticsCard
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

export default PollAnalyticsPage;
