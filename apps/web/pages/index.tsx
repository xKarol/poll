import { useRouter } from "next/router";
import { routes } from "../config/routes";
import { usePolls } from "../hooks/use-polls";
import { getErrorMessage } from "../utils/error";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { data, isLoading, isFetched, error } = usePolls();
  return (
    <>
      <button
        className="border border-black p-2 px-4"
        onClick={() => router.push(routes.CREATE_POLL)}
      >
        Create Poll
      </button>
      {error && <div>{getErrorMessage(error)}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col space-y-2">
          {data?.map((poll) => (
            <Link
              key={poll.id}
              href={routes.poll(poll.id)}
              className="border border-black px-4 py-2"
            >
              {poll.question}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
