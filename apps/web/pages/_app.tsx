import { TooltipProvider } from "@poll/ui";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { NextComponentType, NextPageContext } from "next";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppInitialProps } from "next/app";
import { Inter } from "next/font/google";
import type { Router } from "next/router";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import SEO from "../config/next-seo";
import { queryClientConfig } from "../config/query-client";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppProps<P = any> = AppInitialProps<P> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: React.ElementType;
  };
  router: Router;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <style jsx global>{`
                :root {
                  --font-inter: ${inter.style.fontFamily};
                }
              `}</style>
              <TooltipProvider>
                {Component.Layout !== undefined ? (
                  <Component.Layout>
                    <Component {...pageProps} />
                  </Component.Layout>
                ) : (
                  <Component {...pageProps} />
                )}
                <div>
                  <Toaster position="bottom-right" />
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
                {showDevtools && (
                  <React.Suspense fallback={null}>
                    <ReactQueryDevtoolsProduction />
                  </React.Suspense>
                )}
              </TooltipProvider>
            </ThemeProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
