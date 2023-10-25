import { cn } from "@poll/lib";
import { Icon } from "@poll/ui";
import React from "react";

import { useAnalyticsTopDevices } from "../hooks";

type TopDevicesProps = React.ComponentPropsWithoutRef<"div">;

export default function TopDevices({ className, ...props }: TopDevicesProps) {
  const topDevices = useAnalyticsTopDevices();
  console.log(topDevices);
  return (
    <div className={cn("w-60 space-y-2", className)} {...props}>
      <h1 className="text-sm font-medium">Top devices</h1>
      <div className="flex flex-col space-y-1">
        <div className="relative flex w-full items-center justify-between rounded-[4px] bg-neutral-100 px-4 py-2 text-xs dark:bg-neutral-800">
          <div className="flex items-center space-x-4">
            <Icon.Tablet className="h-4 w-4" />
            <span>Tablet</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-medium">100</span>
            <Icon.BarChart2 className="h-3 w-3" />
          </div>
        </div>
        <div className="relative flex w-full items-center justify-between rounded-[4px] bg-neutral-100 px-4 py-2 text-xs dark:bg-neutral-800">
          <div className="flex items-center space-x-4">
            <Icon.Smartphone className="h-4 w-4" />
            <span>Mobile</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-medium">50</span>
            <Icon.BarChart2 className="h-3 w-3" />
          </div>
        </div>
        <div className="relative flex w-full items-center justify-between rounded-[4px] bg-neutral-100 px-4 py-2 text-xs dark:bg-neutral-800">
          <div className="flex items-center space-x-4">
            <Icon.Monitor className="h-4 w-4" />
            <span>Desktop</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-medium">150</span>
            <Icon.BarChart2 className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
