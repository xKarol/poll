import { NextSeo } from "next-seo";

import { AccountPage as SettingsHomePage } from "../../features/settings";
import { useUnauthorizedRedirect } from "../../hooks/use-unauthorized-redirect";

export default function AccountPage() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="Account" />
      <SettingsHomePage />
    </>
  );
}
