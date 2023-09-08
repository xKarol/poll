import { LoadingButton } from "@mui/lab";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import Header from "../components/header";
import { routes } from "../config/routes";
import { useSignIn } from "../hooks/use-sign-in";
import { getServerSession } from "../utils/get-server-session";

export default function Page() {
  const { mutate, isLoading } = useSignIn();
  return (
    <>
      <Header />

      <NextSeo title="Login" />
      <LoadingButton
        loading={isLoading.google}
        onClick={() => mutate("google")}>
        Login with Google
      </LoadingButton>
    </>
  );
}

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
