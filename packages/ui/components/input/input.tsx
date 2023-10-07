import { cn } from "@poll/lib";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  LeftIcon?: JSX.Element;
  RightIcon?: JSX.Element;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ LeftIcon, RightIcon, className, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center [&>svg:first-child]:absolute [&>svg:first-child]:left-2 [&>svg:first-child]:top-1/2 [&>svg:first-child]:-translate-y-1/2 [&>svg:last-child]:absolute [&>svg:last-child]:right-2 [&>svg:last-child]:top-1/2 [&>svg:last-child]:-translate-y-1/2 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:cursor-pointer">
        {LeftIcon}
        <input
          type={type}
          className={cn(
            "ring-offset-background flex h-10 w-full rounded-sm border-2 border-neutral-100 bg-white px-4 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-none dark:bg-neutral-800",
            className
          )}
          ref={ref}
          {...props}
        />
        {RightIcon}
      </div>
    );
  }
);
Input.displayName = "Input";
