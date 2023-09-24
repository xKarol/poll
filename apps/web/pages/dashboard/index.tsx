import { NextSeo } from "next-seo";
import Link from "next/link";

import { routes } from "../../config/routes";

export default function DashboardPage() {
  return (
    <>
      <NextSeo title="Dashboard" />
      <h1 className="mb-5">Dashboard</h1>
      <div className="flex flex-col space-y-5">
        <Link href={routes.DASHBOARD.POLLS}>Polls</Link>
        <Link href={routes.HOME}>Settings</Link>
      </div>
    </>
  );
}
