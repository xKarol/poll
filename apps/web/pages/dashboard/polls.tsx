import { NextSeo } from "next-seo";

import { MyPollsPage } from "../../features/dashboard";

export default function Page() {
  return (
    <>
      <NextSeo title="My polls" />
      <MyPollsPage />
    </>
  );
}
