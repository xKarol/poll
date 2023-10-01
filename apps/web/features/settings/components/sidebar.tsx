import { Avatar } from "@mui/material";
import { cn } from "@poll/lib";
import { Icon } from "@poll/ui";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { routes } from "../../../config/routes";

type Props = React.ComponentPropsWithoutRef<"aside">;

type SidebarLinks = {
  category: string;
  tabs: { text: string; href: string; IconElement: JSX.Element }[];
}[];

export const sidebarLinks: SidebarLinks = [
  {
    category: "Account",
    tabs: [
      {
        text: "General",
        href: routes.SETTINGS.ACCOUNT.GENERAL,
        IconElement: <Icon.Hexagon />,
      },
      {
        text: "Edit profile",
        href: routes.SETTINGS.ACCOUNT.EDIT,
        IconElement: <Icon.User2 />,
      },
    ],
  },
  {
    category: "Preferences",
    tabs: [
      {
        text: "Appearance",
        href: routes.SETTINGS.PREFERENCES.APPEARANCE,
        IconElement: <Icon.Palette />,
      },
    ],
  },
  {
    category: "Billing",
    tabs: [
      {
        text: "My plan",
        href: routes.SETTINGS.BILLING.MY_PLAN,
        IconElement: <Icon.CreditCard />,
      },
    ],
  },
];

const Sidebar = ({ className, ...props }: Props) => {
  const router = useRouter();

  return (
    <aside
      className={cn(
        "sticky bottom-0 left-0 top-0 flex h-screen w-[220px] flex-col border-r border-neutral-200/50 bg-neutral-100 px-2 py-4 dark:border-neutral-800/50 dark:bg-neutral-800/25",
        className
      )}
      {...props}>
      <SidebarNavigationLink
        as={Link}
        href={routes.DASHBOARD.HOME}
        className="mb-2"
        IconElement={<Icon.ArrowLeft />}>
        Back
      </SidebarNavigationLink>

      <div className="flex flex-1 flex-col justify-between">
        <nav className="space-y-4">
          {sidebarLinks.map(({ category, tabs }) => (
            <div key={category}>
              {category ? (
                <span className="px-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {category}
                </span>
              ) : null}
              <div className="space-y-[0.125rem]">
                {tabs.map((link) => (
                  <SidebarNavigationLink
                    key={link.text}
                    as={Link}
                    href={link.href}
                    IconElement={link.IconElement}
                    isActive={router.asPath === link.href}>
                    {link.text}
                  </SidebarNavigationLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div>
          <SidebarNavigationLink IconElement={<Icon.HelpCircle />}>
            Support Center
          </SidebarNavigationLink>
          <SidebarNavigationLink
            IconElement={<Icon.LogOut />}
            onClick={() => signOut()}>
            Log Out
          </SidebarNavigationLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

export type SidebarNavigationLinkProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
  isActive?: boolean;
  IconElement: JSX.Element;
};

export function SidebarNavigationLink<T extends React.ElementType = "button">({
  isActive,
  IconElement,
  className,
  children,
  as,
  ...props
}: SidebarNavigationLinkProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof SidebarNavigationLinkProps<T>
  >) {
  const Component = as || "div";
  return (
    <Component
      className={cn(
        "flex cursor-pointer items-center space-x-2 rounded-[4px] p-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-200 hover:text-black dark:text-neutral-200 hover:dark:bg-neutral-800 hover:dark:text-white [&_svg]:h-4 [&_svg]:w-4",
        isActive && "bg-neutral-200 dark:bg-neutral-800",
        className
      )}
      {...props}>
      {IconElement}
      <span>{children}</span>
    </Component>
  );
}

export type SidebarUserProps = {
  avatarUrl?: string;
  username: string;
} & React.ComponentPropsWithoutRef<"div">;

export function SidebarUser({
  avatarUrl,
  username,
  className,
  ...props
}: SidebarUserProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center space-x-2 rounded-[4px] p-2 text-sm transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800",
        className
      )}
      {...props}>
      <Avatar sx={{ width: 20, height: 20 }} src={avatarUrl}>
        {username[0]}
      </Avatar>
      <div className="flex items-center space-x-2">
        <span>{username}</span>
        <Icon.ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}
