import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { routes } from "../config/routes";
import { LoginPage as LoginPageContainer, AuthLayout } from "../features/auth";
import { getServerSession } from "../utils/get-server-session";

export default function LoginPage() {
  return (
    <>
      <NextSeo title="Login" />
      <LoginPageContainer />
    </>
  );
}

LoginPage.Layout = AuthLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession({ req, res });
  if (session) {
    return {
      redirect: {
        destination: routes.HOME,
        permanent: false,
      },
    };
  }
  return { props: {} };
};
