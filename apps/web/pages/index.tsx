import { MoonIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

import Header from "../components/header";
import { routes } from "../config/routes";
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
  return (
    <>
      <Header />

      {session ? (
        <button
          className="border border-black p-2 px-4"
          onClick={() => signOut()}>
          Logout
        </button>
      ) : null}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <section className="flex space-x-5">
        <div>
          <p>Total Polls</p>
          <span>{stats.totalPolls}</span>
        </div>
        <div>
          <p>Total Votes</p>
          <span>{stats.totalVotes}</span>
        </div>
        <div>
          <p>Total Users</p>
          <span>{stats.totalUsers}</span>
        </div>
      </section>
      <MoonIcon
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </>
  );
}
