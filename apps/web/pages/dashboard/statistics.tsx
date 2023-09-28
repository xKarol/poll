import { NextSeo } from "next-seo";

import { StatisticsPage } from "../../features/dashboard";

export default function Page() {
  return (
    <>
      <NextSeo title="Statistics" />
      <StatisticsPage />
    </>
  );
}
