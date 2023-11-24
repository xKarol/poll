import type { UseQueryOptions } from "@tanstack/react-query";

import { getQRCodeImage } from "../services/api";

export const qrCodeKeys = {
  getQRCode: (text: string) => ["qr", { text }] as const,
};

export const qrCodeOptions = {
  getQRCode: (
    text: string,
    options?: UseQueryOptions<Awaited<ReturnType<typeof getQRCodeImage>>>
  ): UseQueryOptions<Awaited<ReturnType<typeof getQRCodeImage>>> => ({
    cacheTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...options,
    queryKey: qrCodeKeys.getQRCode(text),
    queryFn: () => getQRCodeImage(text),
  }),
} satisfies Record<keyof typeof qrCodeKeys, unknown>;
