import { cn } from "@poll/lib";
import React from "react";

// @ts-expect-error
import logoLight from "../../../../apps/web/public/logo-with-label-dark.svg";
// @ts-expect-error
import logoDark from "../../../../apps/web/public/logo-with-label-light.svg";

export type LogoProps = {
  href?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const Logo = ({ href = "/", className, ...rest }: LogoProps) => {
  return (
    <div className={cn("", className)} {...rest}>
      {href ? (
        <a href={href}>
          <img src={logoLight.src} className="dark:block hidden" />
          <img src={logoDark.src} className="block dark:hidden" />
        </a>
      ) : (
        <>
          <img src={logoLight.src} className="dark:block hidden" />
          <img src={logoDark.src} className="block dark:hidden" />
        </>
      )}
    </div>
  );
};
