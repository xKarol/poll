import { MoonIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import Header from "../components/header";
import prisma from "../lib/prisma";

type Stats = {
  totalPolls: number;
  totalVotes: number;
  totalUsers: number;
};

export async function getServerSideProps() {
  const stats = {
    totalPolls: await prisma.poll.count(),
    totalVotes: await prisma.vote.count(),
    totalUsers: await prisma.user.count(),
  };
  return { props: { stats } };
}

export default function Page({ stats }: { stats: Stats }) {
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();

  console.log({ session });

  return (
    <>
      <Header />

      <section className="border-b-2 border-t-2 border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-800/25">
        <div className="container flex max-w-4xl flex-col items-center space-y-4 py-8 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
          <div className="flex flex-1 flex-col items-center">
            <p className="text-4xl font-bold uppercase md:text-5xl">
              {stats.totalPolls}
            </p>
            <p className="text-base font-semibold uppercase md:text-lg">
              Polls
            </p>
          </div>
          <div className="hidden h-[50px] w-[1px] bg-neutral-100 dark:bg-neutral-800 md:block"></div>
          <div className="flex flex-1 flex-col items-center">
            <p className="text-4xl font-bold uppercase md:text-5xl">
              {stats.totalVotes}
            </p>
            <p className="text-base font-semibold uppercase md:text-lg">
              Votes
            </p>
          </div>
          <div className="hidden h-[50px] w-[1px] bg-neutral-100 dark:bg-neutral-800 md:block"></div>

          <div className="flex flex-1 flex-col items-center">
            <p className="text-4xl font-bold uppercase md:text-5xl">
              {stats.totalUsers}
            </p>
            <p className="text-base font-semibold uppercase md:text-lg">
              Users
            </p>
          </div>
        </div>
      </section>
      <MoonIcon
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      {session ? (
        <button
          className="border border-black p-2 px-4"
          onClick={() => signOut()}>
          Logout
        </button>
      ) : null}
    </>
  );
}
