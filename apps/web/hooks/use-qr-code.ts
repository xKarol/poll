import { useQuery } from "@tanstack/react-query";

import { qrCodeOptions } from "../queries/qr";

export const useQRCode = (
  ...args: Parameters<typeof qrCodeOptions.getQRCode>
) => {
  return useQuery({
    ...qrCodeOptions.getQRCode(...args),
  });
};
