import { cn } from "@poll/lib";
import type { Analytics } from "@poll/types";
import { Icon, Skeleton } from "@poll/ui";
import React from "react";

import { useAnalyticsParams, useAnalyticsTopDevices } from "../hooks";

type TopDevicesProps = React.ComponentPropsWithoutRef<"div">;

const deviceIcon: Record<Analytics.Devices, JSX.Element> = {
  mobile: <Icon.Smartphone className="h-4 w-4" />,
  tablet: <Icon.Tablet className="h-4 w-4" />,
  desktop: <Icon.Monitor className="h-4 w-4" />,
};

export default function TopDevices({ className, ...props }: TopDevicesProps) {
  const { startDate, endDate } = useAnalyticsParams();
  const { data, isSuccess, isError, isLoading } = useAnalyticsTopDevices({
    startDate,
    endDate,
  });
  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props}>
      <h1 className="text-sm font-medium">Top devices</h1>
      {isError && (
        <span className="mx-auto text-xs text-neutral-400 dark:text-neutral-300">
          Something went wrong...
        </span>
      )}
      {isLoading && (
        <div className="flex flex-col space-y-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex w-full items-center justify-between px-4 py-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </Skeleton>
          ))}
        </div>
      )}
      {isSuccess && (
        <div className="flex flex-col space-y-1">
          {Object.entries(data).map(([deviceName, total]) => (
            <div
              key={deviceName}
              className="relative flex w-full items-center justify-between rounded-[4px] bg-neutral-100 px-4 py-2 text-xs dark:bg-neutral-800">
              <div className="flex items-center space-x-4">
                {deviceIcon[deviceName]}
                <span className="capitalize">{deviceName}</span>
              </div>

              <div className="flex items-center space-x-1">
                <span className="font-medium">{total}</span>
                <Icon.BarChart2 className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
