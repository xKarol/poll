import { cn } from "@poll/lib";
import { Button, Icon } from "@poll/ui";
import React from "react";

type MobileHeaderProps = {
  MenuComponent?: JSX.Element;
  onOpen?: () => void;
} & Omit<React.ComponentPropsWithoutRef<"header">, "children">;

// TODO reuse this component from /features/settings folder
function MobileHeader({
  MenuComponent = <Icon.Menu />,
  onOpen,
  className,
  ...props
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "container fixed left-0 right-0 top-0 flex max-w-5xl items-center border border-neutral-200/50 bg-neutral-100 py-2 dark:border-neutral-800/50 dark:bg-neutral-800/25",
        className
      )}
      {...props}>
      <Button
        variant="text"
        className="rounded-[4px] p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        onClick={onOpen}
        asChild>
        {MenuComponent}
      </Button>
    </header>
  );
}

export default MobileHeader;
