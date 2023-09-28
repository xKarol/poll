import { NextSeo } from "next-seo";

import { MyVotesPage } from "../../features/dashboard";

export default function Page() {
  return (
    <>
      <NextSeo title="My votes" />
      <MyVotesPage />
    </>
  );
}
