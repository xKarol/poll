import { Avatar } from "@mui/material";
import { cn } from "@poll/lib";
import { Logo } from "@poll/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { routes } from "../config/routes";

type HeaderProps = React.ComponentPropsWithoutRef<"header">;

const navLinks = [
  {
    text: "Create Poll",
    href: routes.CREATE_POLL,
  },
  {
    text: "Public Polls",
    href: routes.PUBLIC_POLLS,
  },
  {
    text: "Features",
    href: routes.HOME, //TODO change
  },
  {
    text: "Pricing",
    href: routes.HOME, //TODO change
  },
];

const Header = ({ className, ...rest }: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "container py-6 flex justify-between items-center",
        className
      )}
      {...rest}>
      <Logo />
      <nav className="hidden xl:flex space-x-12 items-center">
        <ul className="flex space-x-12 font-semibold">
          {navLinks.map((link) => (
            <li key={link.text}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>

        {session ? (
          <div className="flex justify-center space-x-2 items-center">
            <Avatar
              src={session.user.image}
              sx={{ width: "32px", height: "32px" }}>
              {session.user.name[0]}
            </Avatar>
            <span>{session.user.name}</span>
          </div>
        ) : (
          <Link
            href={routes.LOGIN}
            className="p-2 px-4 bg-green-500 rounded-md text-neutral-900 font-medium">
            Login
          </Link>
        )}
      </nav>
      <HamburgerMenu className="xl:hidden" />
    </header>
  );
};

export default Header;

type HamburgerMenuProps = React.ComponentPropsWithoutRef<"div">;

function HamburgerMenu({ className, ...rest }: HamburgerMenuProps) {
  return (
    <div
      className={cn("flex flex-col items-end w-[30px] gap-1.5", className)}
      {...rest}>
      <div className="w-6 h-0.5 bg-neutral-900 dark:bg-neutral-50 rounded-[0.25rem]"></div>
      <div className="w-full h-0.5 bg-neutral-900 dark:bg-neutral-50 rounded-[0.25rem]"></div>
      <div className="w-5 h-0.5 bg-neutral-900 dark:bg-neutral-50 rounded-[0.25rem]"></div>
    </div>
  );
}
