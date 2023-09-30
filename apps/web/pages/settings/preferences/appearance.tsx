import { NextSeo } from "next-seo";

import { PreferencesAppearancePage as SettingsPreferencesAppearancePage } from "../../../features/settings";
import { useUnauthorizedRedirect } from "../../../hooks/use-unauthorized-redirect";

export default function PreferencesAppearancePage() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="Appearance" />
      <SettingsPreferencesAppearancePage />
    </>
  );
}
