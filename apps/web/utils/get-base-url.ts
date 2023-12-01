/* eslint-disable turbo/no-undeclared-env-vars */
export const getBaseUrl = () => {
  const isServer = typeof window === "undefined";

  if (!isServer) return window.location.origin;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
