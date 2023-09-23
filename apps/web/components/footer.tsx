import { cn } from "@poll/lib";
import { Icon, Logo } from "@poll/ui";
import Link from "next/link";
import React from "react";

import { routes } from "../config/routes";

type FooterProps = React.ComponentPropsWithoutRef<"footer">;

const navLinks = [
  {
    heading: "Product",
    links: [
      { name: "Pricing", href: routes.HOME },
      { name: "FAQ", href: routes.HOME },
      { name: "Help Center", href: routes.HOME },
    ],
  },
  {
    heading: "Actions",
    links: [
      { name: "Create Poll", href: routes.CREATE_POLL },
      { name: "Public Polls", href: routes.PUBLIC_POLLS },
      { name: "Lorem", href: routes.HOME },
    ],
  },

  {
    heading: "Company",
    links: [
      { name: "Contact", href: routes.HOME },
      { name: "About Us", href: routes.HOME },
    ],
  },
];

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn("container py-16", className)} {...props}>
      <div className="mb-8 flex flex-col space-y-16">
        <Logo />
        <p className="text-neutral-600 dark:text-neutral-300">
          Discover, Share, and Engage with Quick Poll – Your Polling Partner!
        </p>
      </div>
      <nav className="mb-16 flex justify-between">
        {navLinks.map((linksGroup) => (
          <div className="flex flex-col space-y-8" key={linksGroup.heading}>
            <p className="font-semibold uppercase">{linksGroup.heading}</p>
            <ul className="space-y-4">
              {linksGroup.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mb-16 flex justify-between">
        <ul className="flex space-x-4 text-neutral-600 dark:text-neutral-300">
          <li>
            <Link href={"twitter.com"}>
              <Icon.Twitter />
            </Link>
          </li>
          <li>
            <Link href={"instagram.com"}>
              <Icon.Instagram />
            </Link>
          </li>
          <li>
            <Link href={"facebook.com"}>
              <Icon.Facebook />
            </Link>
          </li>
        </ul>
        <div className="flex space-x-4 text-neutral-600 dark:text-neutral-300">
          <Icon.Globe />
          <div className="flex space-x-2">
            <span>English</span>
            <Icon.ChevronDown />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <span>
          © {new Date().getFullYear()} Quick Poll. All rights reserved.
        </span>
        <div className="space-x flex space-x-4 underline">
          <Link href={routes.HOME}>Privacy Policy</Link>
          <Link href={routes.HOME}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
