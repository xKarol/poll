import { cn } from "@poll/lib";
import Image from "next/image";
import React from "react";

import darkThemePreview from "../../../public/dark-theme-preview.svg";
import lightThemePreview from "../../../public/light-theme-preview.svg";
import systemThemePreview from "../../../public/system-theme-preview.svg";

type Props = {
  variant: "dark" | "light" | "system";
  RadioInput: JSX.Element;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

const variantPreview = {
  light: lightThemePreview,
  dark: darkThemePreview,
  system: systemThemePreview,
};

function ThemeCard({ RadioInput, variant, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-[4px] border border-neutral-200 dark:border-neutral-700/50",
        className
      )}
      {...props}>
      <div className="flex h-[200px] w-full items-center justify-center bg-neutral-200 px-6 py-4 dark:bg-neutral-800">
        <Image src={variantPreview[variant]} alt={`${variant} theme preview`} />
      </div>
      <div className="flex items-center space-x-2 p-4 text-sm">
        {RadioInput}
        <p className="capitalize">{variant} theme</p>
      </div>
    </div>
  );
}

export default ThemeCard;
