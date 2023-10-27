import React from "react";

import Heading from "./heading";

type HeaderProps = {
  heading: string;
  ActionComponent?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export default function Header({
  ActionComponent,
  heading,
  ...props
}: HeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between" {...props}>
      <Heading className="mb-5">{heading}</Heading>
      {ActionComponent}
    </div>
  );
}
