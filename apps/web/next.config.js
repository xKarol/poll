module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/dashboard",
          destination: "/dashboard/polls",
        },
        {
          source: "/settings",
          destination: "/settings/account/general",
        },
      ],
    };
  },
};
