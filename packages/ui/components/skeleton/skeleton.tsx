import { cn } from "@poll/lib";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[4px] bg-neutral-100 dark:bg-neutral-800 [&>div]:bg-neutral-200 [&>div]:dark:bg-neutral-700",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
