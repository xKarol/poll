import React from "react";

import Footer from "../components/footer";
import { Header } from "../components/header";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="my-16 md:my-32">{children}</main>
      <Footer />
    </>
  );
}
