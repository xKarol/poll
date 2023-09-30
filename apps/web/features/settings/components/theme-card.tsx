import { cn } from "@poll/lib";
import Image from "next/image";
import React from "react";

import darkThemePreview from "../../../public/dark-theme-preview.svg";
import lightThemePreview from "../../../public/light-theme-preview.svg";
import systemThemePreview from "../../../public/system-theme-preview.svg";

type Props = {
  variant: "dark" | "light" | "system";
} & React.ComponentPropsWithoutRef<"div">;

const variantPreview = {
  light: lightThemePreview,
  dark: darkThemePreview,
  system: systemThemePreview,
};

function ThemeCard({ variant, className, ...props }: Props) {
  return (
    <div
      className={cn("rounded-[4px] border border-neutral-700/50", className)}
      {...props}>
      <div className="flex h-[200px] w-full items-center justify-center bg-neutral-800 px-6 py-4">
        <Image src={variantPreview[variant]} alt={`${variant} theme preview`} />
      </div>
      <div className="flex items-center space-x-2 p-4 text-sm">
        {/* TODO radio input */}
        <div className="h-4 w-4 rounded-full border border-neutral-700/50"></div>
        <p className="capitalize">{variant} theme</p>
      </div>
    </div>
  );
}

export default ThemeCard;
