import { NextSeo } from "next-seo";

import { BillingMyPlanPage as SettingsBillingMyPlanPage } from "../../../features/settings";
import { useUnauthorizedRedirect } from "../../../hooks/use-unauthorized-redirect";

export default function BillingMyPlanPage() {
  useUnauthorizedRedirect();
  return (
    <>
      <NextSeo title="My Plan" />
      <SettingsBillingMyPlanPage />
    </>
  );
}
