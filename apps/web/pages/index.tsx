import prisma from "@poll/prisma";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { routes } from "../config/routes";

type Stats = {
  totalPolls: number;
  totalVotes: number;
  totalUsers: number;
};

export async function getServerSideProps() {
  const stats = {
    totalPolls: await prisma.poll.count(),
    totalVotes: 0, // todo await prisma.vote.count(),
    totalUsers: await prisma.user.count(),
  };
  return { props: { stats } };
}

export default function Page({ stats }: { stats: Stats }) {
  const { data: session } = useSession();
  return (
    <>
      <Link className="border border-black p-2 px-4" href={routes.CREATE_POLL}>
        Create Poll
      </Link>
      <Link className="border border-black p-2 px-4" href={routes.PUBLIC_POLLS}>
        Public Polls
      </Link>

      {session ? (
        <>
          <Link
            className="border border-black p-2 px-4"
            href={routes.USER_POLLS}>
            Your Polls
          </Link>
          <button
            className="border border-black p-2 px-4"
            onClick={() => signOut()}>
            Logout
          </button>
        </>
      ) : (
        <Link className="border border-black p-2 px-4" href={routes.LOGIN}>
          Login
        </Link>
      )}
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
    </>
  );
}
