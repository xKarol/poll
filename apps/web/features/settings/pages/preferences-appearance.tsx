import { useTheme } from "next-themes";
import React from "react";

import { RadioGroup, RadioGroupItem } from "../../../components/radio-group";
import { SettingsHeader, ThemeCard } from "../components";
import { BaseLayout } from "../layouts";

const themes = ["light", "dark", "system"] as const;

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
        {themes.map((themeName) => (
          <ThemeCard
            key={themeName}
            variant={themeName}
            isActive={theme === themeName}
            RadioInput={
              <RadioGroupItem
                //   className="!border-neutral-700/50"
                value={themeName}
              />
            }
          />
        ))}
      </RadioGroup>
    </BaseLayout>
  );
}
