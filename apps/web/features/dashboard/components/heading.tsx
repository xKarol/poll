import { cn } from "@poll/lib";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"h1">;

const Heading = ({ className, children, ...props }: Props) => {
  return (
    <h1 className={cn("text-lg font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

export default Heading;
