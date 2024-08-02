import React from "react";

import PollPage from "../../features/poll";
import { BaseLayout } from "../../layouts";
import { getLayout } from "../../utils/get-layout";

const Page = () => {
  return <PollPage />;
};
export default Page;

Page.getLayout = getLayout(BaseLayout);
