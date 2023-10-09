import { Icon, LoadingButton } from "@poll/ui";
import React from "react";

import type { Providers } from "../types";

export type AuthProviderProps = { variant: Providers } & Omit<
  React.ComponentProps<typeof LoadingButton>,
  "variant"
>;

const variantIcons: Record<Providers, JSX.Element> = {
  google: <Icon.Google />,
};

export default function AuthProvider({ variant, ...props }: AuthProviderProps) {
  return (
    <LoadingButton
      isLoading={false}
      type="button"
      variant="secondary"
      className="space-x-4 border border-neutral-200 dark:border-none dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-700/50"
      {...props}>
      {variantIcons[variant]}
      <span>
        Continue with <span className="capitalize">{variant}</span>
      </span>
    </LoadingButton>
  );
}
