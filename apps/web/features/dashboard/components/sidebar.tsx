import { Avatar } from "@mui/material";
import { cn } from "@poll/lib";
import { Icon } from "@poll/ui";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { routes } from "../../../config/routes";

type Props = React.ComponentPropsWithoutRef<"aside">;

export const sidebarLinks = [
  {
    text: "My polls",
    href: routes.DASHBOARD.POLLS,
    IconElement: <Icon.PieChart />,
  },
  {
    text: "My votes",
    href: routes.DASHBOARD.HOME + "#",
    IconElement: <Icon.Vote />,
  },
  {
    text: "Statistics",
    href: routes.DASHBOARD.HOME + "#",
    IconElement: <Icon.BarChart />,
  },
  {
    text: "Settings",
    href: routes.DASHBOARD.HOME + "#",
    IconElement: <Icon.Settings />,
  },
];

const Sidebar = ({ className, ...props }: Props) => {
  const router = useRouter();
  return (
    <aside
      className={cn(
        "flex h-screen w-[220px] flex-col border-r border-neutral-200/50 bg-neutral-100 px-2 py-4 dark:border-neutral-800/50 dark:bg-neutral-800/25",
        className
      )}
      {...props}>
      <SidebarUser username="John Doe" className="mb-6" />
      <div className="flex flex-1 flex-col justify-between">
        <nav className="space-y-[0.125rem]">
          {sidebarLinks.map((link) => (
            <SidebarNavigationLink
              key={link.text}
              as={Link}
              href={link.href}
              IconElement={link.IconElement}
              isActive={router.asPath === link.href}>
              {link.text}
            </SidebarNavigationLink>
          ))}
        </nav>
        <SidebarNavigationLink
          IconElement={<Icon.LogOut />}
          onClick={() => signOut()}>
          Log Out
        </SidebarNavigationLink>
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
