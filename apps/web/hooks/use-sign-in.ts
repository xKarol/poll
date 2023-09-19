import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { routes } from "../config/routes";

type Providers = "google";

const initialLoadingData: Record<Providers, boolean> = {
  google: false,
};

export const useSignIn = (
  {
    redirectUrl,
  }: {
    redirectUrl?: string;
  } = { redirectUrl: routes.HOME }
) => {
  const [loading, setLoading] = useState(initialLoadingData);

  const data = useMutation({
    mutationFn: (provider: Providers) => {
      setLoading((prevData) => ({ ...prevData, [provider]: true }));
      return signIn(provider, {
        callbackUrl: redirectUrl,
        redirect: !!redirectUrl,
      });
    },
    onError: () => {
      setLoading(() => ({ ...initialLoadingData }));
    },
  });
  return { ...data, isLoading: loading };
};
