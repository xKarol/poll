import { cn } from "@poll/lib";
import { Button, Icon } from "@poll/ui";
import React from "react";

export type InfiniteScrollContainerProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  fetchNextPage: (...args: unknown[]) => unknown;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};
export function InfiniteScrollContainer<
  T extends React.ElementType = "section",
>({
  className,
  as,
  children,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  ...props
}: InfiniteScrollContainerProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof InfiniteScrollContainerProps<T>
  >) {
  const Component = as || "section";
  return (
    <Component className={cn("flex flex-col space-y-8", className)} {...props}>
      <div className="flex flex-col">{children}</div>
      <div className="mx-auto my-8">
        {isFetchingNextPage && <Icon.Loader2 className="animate-spin" />}
        {!isFetchingNextPage && hasNextPage && (
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        )}
      </div>
    </Component>
  );
}
