import { Avatar } from "@mui/material";
import { cn } from "@poll/lib";
import { Button, Logo } from "@poll/ui";
import { signOut, useSession } from "next-auth/react";
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
    href: routes.FEATURES,
  },
  {
    text: "Pricing",
    href: routes.PRICING,
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
          "container flex items-center justify-between py-6",
          className
        )}
        {...rest}>
        <Logo className="z-50" />
        {isOpen ? (
          <nav className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-neutral-50 dark:bg-neutral-900">
            <div className="container flex flex-col items-center space-y-8 pt-[7.5rem]">
              <ul className="flex w-full flex-col items-center space-y-8 text-xl font-semibold">
                {navLinks.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
                {session ? (
                  <li className="cursor-pointer" onClick={() => signOut()}>
                    Logout
                  </li>
                ) : null}
              </ul>
              {session ? (
                <div className="flex items-center justify-center space-x-2">
                  <Avatar
                    src={session.user.image}
                    sx={{ width: "32px", height: "32px" }}>
                    {session.user.name[0]}
                  </Avatar>
                  <span>{session.user.name}</span>
                </div>
              ) : (
                <Button asChild variant="secondary" className="!bg-green-500">
                  <Link href={routes.LOGIN}>Login</Link>
                </Button>
              )}
            </div>
          </nav>
        ) : null}
        <nav className="hidden items-center space-x-12 xl:flex">
          <ul className="flex space-x-12 font-semibold">
            {navLinks.map((link) => (
              <li key={link.text}>
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>

          {session ? (
            <div className="flex items-center justify-center space-x-2">
              <Avatar
                src={session.user.image}
                sx={{ width: "32px", height: "32px" }}>
                {session.user.name[0]}
              </Avatar>
              <span>{session.user.name}</span>
            </div>
          ) : (
            <Button asChild variant="secondary" className="!bg-green-500">
              <Link href={routes.LOGIN}>Login</Link>
            </Button>
          )}
        </nav>
        <HamburgerMenu className="z-50 xl:hidden" />
      </header>
    </HeaderContext.Provider>
  );
};

export default Header;

type HamburgerMenuProps = React.ComponentPropsWithoutRef<"div">;

function HamburgerMenu({ className, ...rest }: HamburgerMenuProps) {
  const { setIsOpen, isOpen } = useHeaderContext();
  const isDesktop = useMedia("(min-width: 1280px)", true);

  useEffect(() => {
    setIsOpen(false);
  }, [isDesktop, setIsOpen]);

  return (
    <div
      onClick={() => setIsOpen((current) => !current)}
      className={cn(
        "relative flex h-[20px] w-[30px] cursor-pointer flex-col items-end gap-1.5",
        className
      )}
      {...rest}>
      <div
        className={cn(
          "absolute top-0 h-0.5 w-6 rounded-[0.25rem] bg-neutral-900 transition-all dark:bg-neutral-50",
          isOpen && "top-1/2 w-full -translate-y-1/2 -rotate-45"
        )}></div>
      <div
        className={cn(
          "absolute top-1/2 h-0.5 w-full -translate-y-1/2 rounded-[0.25rem] bg-neutral-900 transition-all dark:bg-neutral-50",
          isOpen && "top-1/2 w-full -translate-y-1/2 rotate-45"
        )}></div>
      <div
        className={cn(
          "absolute bottom-0 h-0.5 w-5 rounded-[0.25rem] bg-neutral-900 transition-all dark:bg-neutral-50",
          isOpen && "top-1/2 w-full -translate-y-1/2 -rotate-45 opacity-0"
        )}></div>
    </div>
  );
}
