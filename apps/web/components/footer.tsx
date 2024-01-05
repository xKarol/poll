import { cn } from "@poll/lib";
import {
  Icon,
  Logo,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@poll/ui";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { routes } from "../config/routes";

type FooterProps = React.ComponentPropsWithoutRef<"footer">;

const navLinks = [
  {
    heading: "Product",
    links: [
      { name: "Pricing", href: routes.PRICING },
      { name: "FAQ", href: routes.FAQ },
      { name: "Help Center", href: routes.HELP },
    ],
  },
  {
    heading: "Actions",
    links: [
      { name: "Create Poll", href: routes.CREATE_POLL },
      { name: "Public Polls", href: routes.PUBLIC_POLLS },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "Contact", href: routes.CONTACT },
      { name: "About Us", href: routes.ABOUT_US },
    ],
  },
  {
    heading: "Legal",
    links: [
      { name: "Privacy Policy", href: routes.HOME },
      { name: "Terms & Conditions", href: routes.HOME },
    ],
  },
];

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn("container pb-8 pt-16", className)} {...props}>
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-16">
        <div className="mb-8 flex flex-wrap items-center gap-4 md:mb-0 md:flex-col md:flex-nowrap md:items-start">
          <Logo className="shrink-0" />
          <p className="max-w-[240px] text-sm text-neutral-600 dark:text-neutral-300">
            Discover, Share, and Engage with Quick Poll – Your Polling Partner!
          </p>
        </div>
        <nav className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mb-0">
          {navLinks.map((linksGroup) => (
            <div
              className="flex flex-col space-y-4 md:space-y-4"
              key={linksGroup.heading}>
              <p className="text-sm font-medium">{linksGroup.heading}</p>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                {linksGroup.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-neutral-900 hover:dark:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mb-8 flex max-w-sm items-center space-x-8 md:mt-8">
        <ul className="flex space-x-4 text-neutral-600 dark:text-neutral-300">
          <li className="transition-colors hover:text-black hover:dark:text-white">
            <Link href={"https://x.com"}>
              <Icon.XTwitter className="h-5 w-5" />
            </Link>
          </li>
          <li className="transition-colors hover:text-black hover:dark:text-white">
            <Link href={"https://instagram.com"}>
              <Icon.Instagram className="h-5 w-5" />
            </Link>
          </li>
          <li className="transition-colors hover:text-black hover:dark:text-white">
            <Link href={"https://facebook.com"}>
              <Icon.Facebook className="h-5 w-5" />
            </Link>
          </li>
        </ul>
        <div className="flex space-x-8">
          <Select>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center space-x-2">
                <Icon.Globe className="h-4 w-4" />
                <SelectValue defaultValue="English" placeholder="English" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <ThemeSwitcher />
        <span className="text-xs text-neutral-600 dark:text-neutral-300">
          © {new Date().getFullYear()} Quick Poll. All rights reserved.
        </span>
        <div />
      </div>
    </footer>
  );
};

export default Footer;

function ThemeSwitcher({
  className,
  onCheckedChange,
  checked,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SwitchPrimitives.Root
      onCheckedChange={(checked) => {
        setTheme(checked ? "dark" : "light");
        onCheckedChange?.(checked);
      }}
      checked={checked || resolvedTheme === "dark"}
      className={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-950 data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:bg-neutral-700",
        className
      )}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 [&>*]:h-4 [&>*]:w-4"
        )}>
        <Icon.Sun className={cn(resolvedTheme !== "light" && "hidden")} />
        <Icon.Moon className={cn(resolvedTheme !== "dark" && "hidden")} />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
}
