import { cn } from "@poll/lib";
import { Progress } from "@poll/ui";
import { CheckCircle2 } from "lucide-react";
import React, { useId } from "react";

import { Label } from "./label";

type AnswerItemVariants = "default" | "result" | "selected";

export type AnswerItemProps = {
  variant?: AnswerItemVariants;
  text: string;
  value: number;
  RadioComponent: JSX.Element;
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
  const id = useId();
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
        {variant === "default" && React.cloneElement(RadioComponent, { id })}
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between items-center">
          <Label className="font-bold text-base md:text-lg" htmlFor={id}>
            {text}
          </Label>
          {variant === "selected" && (
            <CheckCircle2 className="text-neutral-900 dark:text-green-500" />
          )}
        </div>
        {showProgressElement && (
          <Progress
            value={value}
            className={cn(
              variant === "selected" &&
                "bg-neutral-900/5 dark:bg-green-500/5 [&>*]:dark:bg-green-500 [&>*]:bg-neutral-900"
            )}
          />
        )}
      </div>
    </div>
  );
};
