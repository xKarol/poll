import { routes } from "../config/routes";
import { usePolls } from "../hooks/use-polls";
import { getErrorMessage } from "../utils/error";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function Page() {
  const {
    data: pages,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  } = usePolls();
  const data = pages?.pages.flatMap(({ data }) => data);
  return (
    <>
      <h1 className="mb-5">Public Polls</h1>
      {error && <div>{getErrorMessage(error)}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col space-y-2">
          {data?.map((poll) => (
            <Link
              key={poll.id}
              href={routes.poll(poll.id)}
              className="border border-black px-4 py-2 flex justify-between">
              <span>{poll.question}</span>
              <span>Total Votes:{poll.totalVotes}</span>
            </Link>
          ))}
          <div className="mx-auto">
            {isFetchingNextPage && <Loader />}
            {hasNextPage && (
              <button onClick={() => fetchNextPage()}>Fetch More</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
