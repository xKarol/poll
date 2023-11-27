// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/dashboard",
          destination: "/dashboard/analytics",
        },
        {
          source: "/settings",
          destination: "/settings/account/general",
        },
      ],
    };
  },
};

/** @type {import('@sentry/nextjs').SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  hideSourceMaps: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
