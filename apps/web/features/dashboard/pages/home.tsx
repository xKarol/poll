import Link from "next/link";
import React from "react";

import { routes } from "../../../config/routes";
import Sidebar from "../components/sidebar";

type Props = React.ComponentPropsWithRef<"div">;

const HomePage = ({ ...props }: Props) => {
  return (
    <div className="flex" {...props}>
      <Sidebar />

      <h1 className="mb-5">Dashboard</h1>
      <div className="flex flex-col space-y-5">
        <Link href={routes.DASHBOARD.POLLS}>Polls</Link>
        <Link href={routes.HOME}>Settings</Link>
      </div>
    </div>
  );
};

export default HomePage;
