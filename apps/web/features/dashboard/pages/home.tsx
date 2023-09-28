import Link from "next/link";
import React from "react";

import { routes } from "../../../config/routes";
import { BaseLayout } from "../layouts";

const HomePage = () => {
  return (
    <BaseLayout>
      <h1 className="mb-5">Dashboard</h1>
      <div className="flex flex-col space-y-5">
        <Link href={routes.DASHBOARD.POLLS}>Polls</Link>
        <Link href={routes.HOME}>Settings</Link>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
