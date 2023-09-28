import { NextSeo } from "next-seo";

import { HomePage as DashboardHomePage } from "../../features/dashboard";

export default function DashboardPage() {
  return (
    <>
      <NextSeo title="Dashboard" />
      <DashboardHomePage />
    </>
  );
}
