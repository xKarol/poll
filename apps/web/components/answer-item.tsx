import { cn } from "@poll/lib";
import { CheckCircle2 } from "lucide-react";
import React from "react";

import { Progress } from "./progress";

type AnswerItemVariants = "default" | "result" | "selected";

export type AnswerItemProps = {
  variant?: AnswerItemVariants;
  text: string;
  value: number;
  RadioComponent: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export const AnswerItem = ({
  RadioComponent,
  text,
  value,
  variant = "default",
  className,
  ...rest
}: AnswerItemProps) => {
  const showProgressElement = variant === "result" || variant === "selected";
  const showPercentage = variant === "result" || variant === "selected";
  return (
    <div
      className={cn(
        "flex space-x-4 px-4 py-3",
        variant === "selected" &&
          "border border-neutral-900 dark:border-green-500 rounded-[4px]",
        className
      )}
      {...rest}>
      <div className="flex justify-end">
        {showPercentage && (
          <span className="text-end text-lg font-normal my-auto md:text-xl">
            {value.toFixed(0)}%
          </span>
        )}
        {variant === "default" && RadioComponent}
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between items-center">
          <label className="font-bold text-base md:text-lg">{text}</label>
          {variant === "selected" && (
            <CheckCircle2 className="text-neutral-900 dark:text-green-500" />
          )}
        </div>
        {showProgressElement && <Progress value={value} />}
      </div>
    </div>
  );
};
