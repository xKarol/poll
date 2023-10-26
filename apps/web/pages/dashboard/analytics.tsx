import { NextSeo } from "next-seo";

import { AnalyticsPage } from "../../features/dashboard";
import { useUnauthorizedRedirect } from "../../hooks/use-unauthorized-redirect";

export default function Page() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="Analytics" />
      <AnalyticsPage />
    </>
  );
}
