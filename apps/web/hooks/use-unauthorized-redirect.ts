import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { routes } from "../config/routes";
import { getBaseUrl } from "../utils/get-base-url";

export const useUnauthorizedRedirect = (redirectPath?: string) => {
  const router = useRouter();
  redirectPath =
    redirectPath ?? `${routes.LOGIN}?redirect=${getBaseUrl()}${router.asPath}`;

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace(redirectPath);
    },
  });

  return {
    isLoading: status === "loading",
  };
};
