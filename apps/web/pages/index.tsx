import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { routes } from "../config/routes";
import axios from "../lib/axios";

export default function Page() {
  const { data: session } = useSession();
  const query = useQuery({
    queryKey: ["Userpoll"],
    queryFn: () => axios.get("http://localhost:4000/@me/poll"),
  });
  console.log(query.data, query.error);
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
