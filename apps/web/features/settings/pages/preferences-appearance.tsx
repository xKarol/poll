import React from "react";

import { SettingsHeader, ThemeCard } from "../components";
import { BaseLayout } from "../layouts";

export default function AccountGeneralPage() {
  return (
    <BaseLayout>
      <SettingsHeader
        heading="Appearance"
        description="Manage your account preferences"
      />
      <div className="flex space-x-4">
        <ThemeCard variant="dark" />
        <ThemeCard variant="light" />
        <ThemeCard variant="system" />
      </div>
    </BaseLayout>
  );
}
