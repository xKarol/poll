import { NextSeo } from "next-seo";

import { MyVotesPage } from "../../features/dashboard";
import { useUnauthorizedRedirect } from "../../hooks/use-unauthorized-redirect";

export default function Page() {
  useUnauthorizedRedirect();

  return (
    <>
      <NextSeo title="My votes" />
      <MyVotesPage />
    </>
  );
}
