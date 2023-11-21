import { DEFAULT_ANALYTICS_INTERVAL } from "@poll/config";
import { Icon } from "@poll/ui";
import { useQueryState } from "next-usequerystate";
import React from "react";

import { useHasPermission } from "../../../hooks/use-has-permission";
import {
  AnalyticsCard,
  AnalyticsIntervalSelect,
  Header,
  TopCountries,
  TopDevices,
  VotesAreaChart,
} from "../components";
import { BaseLayout } from "../layouts";

const AnalyticsPage = () => {
  const [interval, setInterval] = useQueryState("interval");
  const { hasPermission } = useHasPermission();
  const hasBasicPlan = hasPermission("BASIC");
  return (
    <BaseLayout>
      <Header
        heading="Analytics"
        ActionComponent={
          <AnalyticsIntervalSelect
            hasBasicPlan={hasBasicPlan}
            onValueChange={setInterval}
            value={interval || DEFAULT_ANALYTICS_INTERVAL}
          />
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

export default AnalyticsPage;
