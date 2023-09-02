import { useQuery } from "@tanstack/react-query";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";

import { routes } from "../config/routes";

export default function Page() {
  const { data: session } = useQuery({ queryFn: () => getSession() });
  return (
    <>
      <Link className="border border-black p-2 px-4" href={routes.CREATE_POLL}>
        Create Poll
      </Link>
      <Link className="border border-black p-2 px-4" href={routes.PUBLIC_POLLS}>
        Public Polls
      </Link>
      <Link className="border border-black p-2 px-4" href={routes.LOGIN}>
        Login
      </Link>
      {session ? (
        <button
          className="border border-black p-2 px-4"
          onClick={() => signOut()}>
          Logout
        </button>
      ) : null}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
