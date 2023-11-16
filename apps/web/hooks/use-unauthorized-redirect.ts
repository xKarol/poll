import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { routes } from "../config/routes";
import { getBaseUrl } from "../utils/get-base-url";

export const useUnauthorizedRedirect = (redirectPath: string | undefined) => {
  const { status } = useSession();
  const router = useRouter();

  redirectPath =
    redirectPath ?? `${routes.LOGIN}?redirect=${getBaseUrl()}${router.asPath}`;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(redirectPath);
    }
  }, [status, redirectPath, router]);

  return {
    isLoading: status === "loading",
  };
};
