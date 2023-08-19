import { useRouter } from "next/router";
import { routes } from "../constants/routes";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <button
        className="border border-black p-2 px-4"
        onClick={() => router.push(routes.CREATE_POLL)}
      >
        Create Poll
      </button>
    </>
  );
}
