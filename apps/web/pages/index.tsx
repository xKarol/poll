import { routes } from "../config/routes";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link className="border border-black p-2 px-4" href={routes.CREATE_POLL}>
        Create Poll
      </Link>
      <Link className="border border-black p-2 px-4" href={routes.PUBLIC_POLLS}>
        Public Polls
      </Link>
    </>
  );
}
