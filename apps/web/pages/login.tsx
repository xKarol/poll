import { LoadingButton } from "@mui/lab";
import { NextSeo } from "next-seo";

import Header from "../components/header";
import { useSignIn } from "../hooks/use-sign-in";

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
