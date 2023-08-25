import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "../globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientConfig } from "../config/query-client";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <main className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
