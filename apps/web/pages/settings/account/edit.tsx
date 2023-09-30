import { NextSeo } from "next-seo";

import { AccountEditPage as SettingsEditPage } from "../../../features/settings";
import { useUnauthorizedRedirect } from "../../../hooks/use-unauthorized-redirect";

export default function AccountPage() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="Edit account" />
      <SettingsEditPage />
    </>
  );
}
