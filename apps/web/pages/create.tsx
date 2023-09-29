import { NextSeo } from "next-seo";

import { CreatePollForm } from "../components/create-poll-form";
import Header from "../components/header";

export default function Page() {
  return (
    <>
      <NextSeo title="Create your poll" />
      <Header />
      <div className="container my-4 mb-8 flex max-w-3xl flex-col rounded-[4px] text-neutral-900 dark:text-neutral-50 md:my-8 xl:my-16 xl:border xl:border-neutral-100 xl:bg-white xl:px-8 xl:py-16 xl:dark:border-neutral-800 xl:dark:bg-neutral-800/25">
        <CreatePollForm />
      </div>
    </>
  );
}
