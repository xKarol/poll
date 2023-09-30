import { NextSeo } from "next-seo";

import { AccountGeneralPage as SettingsGeneralPage } from "../../../features/settings";
import { useUnauthorizedRedirect } from "../../../hooks/use-unauthorized-redirect";

export default function AccountPage() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="Account" />
      <SettingsGeneralPage />
    </>
  );
}
