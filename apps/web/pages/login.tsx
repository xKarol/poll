import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@mui/material";
import { Alert, AlertTitle, Input, LoadingButton, Icon } from "@poll/ui";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import Header from "../components/header";
import { routes } from "../config/routes";
import { useSignIn } from "../hooks/use-sign-in";
import { getErrorMessage } from "../utils/error";
import { getServerSession } from "../utils/get-server-session";

type FormValues = {
  email: string;
  password: string;
};

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Page() {
  const router = useRouter();
  const { mutate, isLoading } = useSignIn({
    redirectUrl: router.query.redirect as string | undefined,
  });
  const form = useForm<FormValues>({
    // @ts-expect-error
    resolver: zodResolver(credentialsSchema),
  });

  const onSubmit = form.handleSubmit(async (data: FormValues) => {
    try {
      console.log(data);
      form.reset();
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });
  return (
    <>
      <Header />

      <NextSeo title="Login" />
      <main className="container">
        <div className="mx-auto my-16 flex max-w-[360px] flex-col">
          {form.formState.errors.root?.message ? (
            <Alert variant="error" className="mb-8">
              <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          ) : null}
          <h1 className="mb-16 text-center text-[32px] font-bold">Log In</h1>
          <LoadingButton
            type="button"
            isLoading={isLoading.google}
            onClick={() => mutate("google")}
            variant="secondary"
            className="border border-neutral-200 dark:border-none dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-700/50">
            <Icon.Google className="mr-2" />
            <span>Continue with Google</span>
          </LoadingButton>
          <Divider className="!mb-8 !mt-12 border-neutral-200 dark:border-neutral-600" />
          <div className="flex flex-col space-y-16">
            <div className="flex flex-col justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••••"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton
                    isLoading={false}
                    type="submit"
                    className="w-full">
                    Submit
                  </LoadingButton>
                  <Link
                    href="/"
                    className="text-center text-sm font-medium text-neutral-400 underline">
                    Forgot Password?
                  </Link>
                </form>
              </Form>
            </div>
            <span className="text-center text-sm font-normal text-neutral-400">
              By clicking &quot;Continue with Google&quot; ...{" "}
              <u>Terms & Conditions</u> and <u>Privacy Policy</u>.
            </span>
          </div>
        </div>
      </main>
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
