import { Avatar } from "@mui/material";
import { cn } from "@poll/lib";
import { Logo } from "@poll/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMedia, useLockBodyScroll } from "react-use";

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

type HeaderContextValue = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const HeaderContext = React.createContext<HeaderContextValue>(
  {} as HeaderContextValue
);

const useHeaderContext = () => {
  const headerContext = React.useContext(HeaderContext);

  return headerContext;
};

const Header = ({ className, ...rest }: HeaderProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  useLockBodyScroll(isOpen);

  return (
    <HeaderContext.Provider value={{ isOpen, setIsOpen }}>
      <header
        className={cn(
          "container py-6 flex justify-between items-center",
          className
        )}
        {...rest}>
        <Logo className="z-50" />
        {isOpen ? (
          <nav className="bg-neutral-50 dark:bg-neutral-900 fixed top-0 left-0 right-0 bottom-0">
            <div className="container flex flex-col items-center pt-[7.5rem] space-y-8">
              <ul className="w-full items-center flex flex-col space-y-8 text-xl font-semibold">
                {navLinks.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
              <Link
                href={routes.LOGIN}
                className="p-2 px-4 bg-green-500 rounded-md text-neutral-900 font-medium">
                Login
              </Link>
            </div>
          </nav>
        ) : null}
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
        <HamburgerMenu className="xl:hidden z-50" />
      </header>
    </HeaderContext.Provider>
  );
};

export default Header;

type HamburgerMenuProps = React.ComponentPropsWithoutRef<"div">;

function HamburgerMenu({ className, ...rest }: HamburgerMenuProps) {
  const { setIsOpen } = useHeaderContext();
  const isDesktop = useMedia("(min-width: 1280px)");

  useEffect(() => {
    setIsOpen(false);
  }, [isDesktop, setIsOpen]);

  return (
    <div
      onClick={() => setIsOpen((current) => !current)}
      className={cn(
        "cursor-pointer flex flex-col items-end w-[30px] gap-1.5",
        className
      )}
      {...rest}>
      <div className="w-6 h-0.5 bg-neutral-900 dark:bg-neutral-50 rounded-[0.25rem]"></div>
      <div className="w-full h-0.5 bg-neutral-900 dark:bg-neutral-50 rounded-[0.25rem]"></div>
      <div className="w-5 h-0.5 bg-neutral-900 dark:bg-neutral-50 rounded-[0.25rem]"></div>
    </div>
  );
}
