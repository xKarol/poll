import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { routes } from "../../../config/routes";
import type { Providers } from "../types";

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
    mutationFn: async (provider: Providers) => {
      setLoading((prevData) => ({ ...prevData, [provider]: true }));
      const res = await signIn(provider, {
        callbackUrl: redirectUrl,
        redirect: !!redirectUrl,
      });
      if (res?.error) throw res.error;
    },
    onError: () => {
      setLoading(() => ({ ...initialLoadingData }));
    },
  });
  return { ...data, isLoading: loading };
};
