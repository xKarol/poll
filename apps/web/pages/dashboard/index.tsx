import { NextSeo } from "next-seo";

import { HomePage as DashboardHomePage } from "../../features/dashboard";
import { useUnauthorizedRedirect } from "../../hooks/use-unauthorized-redirect";

export default function DashboardPage() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="Dashboard" />
      <DashboardHomePage />
    </>
  );
}
