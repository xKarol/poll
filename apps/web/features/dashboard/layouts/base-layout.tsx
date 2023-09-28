import { cn } from "@poll/lib";
import React from "react";

import { Sidebar } from "../components";

type Props = React.ComponentPropsWithoutRef<"div">;

export default function BaseLayout({ className, children, ...props }: Props) {
  return (
    <main className={cn("flex", className)} {...props}>
      <Sidebar />
      <div className="flex flex-1 flex-col px-12 py-8">{children}</div>
    </main>
  );
}
