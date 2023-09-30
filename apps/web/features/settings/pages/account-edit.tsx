import React from "react";

import SettingsHeader from "../components/settings-header";
import { BaseLayout } from "../layouts";

export default function AccountEditPage() {
  return (
    <BaseLayout>
      <SettingsHeader heading="Edit" description="Edit your account" />
    </BaseLayout>
  );
}
