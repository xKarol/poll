import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@mui/material";
import { Alert, AlertTitle, Input, LoadingButton } from "@poll/ui";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
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
  const { mutate, isLoading } = useSignIn();
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
        <div className="max-w-[360px] mt-16 mx-auto flex flex-col">
          {form.formState.errors.root?.message ? (
            <Alert variant="error" className="mb-8">
              <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          ) : null}
          <h1 className="text-[32px] font-bold mb-16 text-center">Log In</h1>
          <LoadingButton
            type="button"
            isLoading={isLoading.google}
            onClick={() => mutate("google")}
            variant="secondary"
            className="border dark:border-none border-neutral-200 dark:text-white dark:bg-neutral-700 hover:dark:bg-neutral-700/50">
            Continue with Google
          </LoadingButton>
          <Divider className="border-neutral-200 dark:border-neutral-600 !mt-12 !mb-8" />
          <div className="space-y-16 flex flex-col">
            <div className="justify-center flex flex-col">
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
                        <FormLabel>Email</FormLabel>
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
                    className="underline font-medium text-sm text-center text-neutral-400">
                    Forgot Password?
                  </Link>
                </form>
              </Form>
            </div>
            <span className="text-neutral-400 text-center font-normal text-sm">
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
