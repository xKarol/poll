import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { routes } from "../config/routes";

export const useUnauthorizedRedirect = (
  redirectPath: string = routes.LOGIN
) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(redirectPath);
    }
  }, [status, redirectPath, router]);

  return {
    isLoading: status === "loading",
  };
};
