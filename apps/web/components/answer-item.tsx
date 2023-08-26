import React from "react";
import { Progress } from "./progress";

type AnswerItemVariants = "default" | "checked";

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
  ...rest
}: AnswerItemProps) => {
  return (
    <div className="flex space-x-4" {...rest}>
      <div className="min-w-[40px] flex justify-end">
        {variant === "checked" && (
          <span className="text-end">{value.toFixed(0)}%</span>
        )}
        {variant === "default" && RadioComponent}
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <label className="font-bold">{text}</label>
        <Progress value={value} />
      </div>
    </div>
  );
};
