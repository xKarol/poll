import type { DefaultSeoProps } from "next-seo";

const nextSeoConfig: DefaultSeoProps = {
  defaultTitle: "Quick Poll",
  titleTemplate: "%s | Quick Poll",
  description:
    "Create and share polls for free. Capture opinions, insights, and feedback. Start polling now!",
  themeColor: "#000",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://poll-web-three.vercel.app",
    siteName: "Quick Poll",
    images: [
      {
        url: "https://poll-web-three.vercel.app/logo-banner.png",
        width: 1200,
        height: 630,
        alt: "quick poll logo",
      },
    ],
  },
};

export default nextSeoConfig;
