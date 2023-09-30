import { cn } from "@poll/lib";
import React from "react";

import { Sidebar } from "../components";

type Props = React.ComponentPropsWithoutRef<"div">;

export default function BaseLayout({ className, children, ...props }: Props) {
  return (
    <main className={cn("flex", className)} {...props}>
      <Sidebar />
      <div className="container flex max-w-5xl flex-1 flex-col space-y-6 py-12">
        {children}
      </div>
    </main>
  );
}
