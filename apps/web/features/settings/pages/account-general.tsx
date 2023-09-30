import React from "react";

import SettingsHeader from "../components/settings-header";
import { BaseLayout } from "../layouts";

export default function AccountGeneralPage() {
  return (
    <BaseLayout>
      <SettingsHeader
        heading="General"
        description="Manage your account preferences"
      />
    </BaseLayout>
  );
}
