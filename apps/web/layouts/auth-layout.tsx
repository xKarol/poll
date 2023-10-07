import { useSession } from "next-auth/react";
import React from "react";

import { HeaderLogo, HeaderRoot } from "../components/header";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <>
      <HeaderRoot session={session}>
        <HeaderLogo />
      </HeaderRoot>
      <main>{children}</main>
    </>
  );
}
