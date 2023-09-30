import { useTheme } from "next-themes";
import React from "react";

import { RadioGroup, RadioGroupItem } from "../../../components/radio-group";
import { SettingsHeader, ThemeCard } from "../components";
import { BaseLayout } from "../layouts";

export default function AccountGeneralPage() {
  const { theme, setTheme } = useTheme();
  return (
    <BaseLayout>
      <SettingsHeader
        heading="Appearance"
        description="Manage your account preferences"
      />
      <RadioGroup
        className="flex space-x-4"
        defaultValue={theme}
        onValueChange={(theme) => setTheme(theme)}>
        <ThemeCard
          variant="light"
          RadioInput={
            <RadioGroupItem
              //   className="!border-neutral-700/50"
              value={"light"}
            />
          }
        />
        <ThemeCard
          variant="dark"
          RadioInput={
            <RadioGroupItem
              //   className="!border-neutral-700/50"
              value={"dark"}
            />
          }
        />
        <ThemeCard
          variant="system"
          RadioInput={
            <RadioGroupItem
              //   className="!border-neutral-700/50"
              value={"system"}
            />
          }
        />
      </RadioGroup>
    </BaseLayout>
  );
}
