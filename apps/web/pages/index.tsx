import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { routes } from "../config/routes";

export default function Page() {
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
    </>
  );
}
