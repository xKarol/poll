import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@poll/types";
import {
  Alert,
  AlertTitle,
  Icon,
  Input,
  LoadingButton,
  Skeleton,
  toast,
} from "@poll/ui";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/form";
import { getErrorMessage } from "../../../utils/error";
import SettingsHeader from "../components/settings-header";
import { useUpdateAccount } from "../hooks";
import { BaseLayout } from "../layouts";

export const updateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
});

type FormValues = User.UpdateUserData;

export default function AccountEditPage() {
  const { status } = useSession();

  return (
    <BaseLayout>
      <SettingsHeader heading="Edit" description="Edit your account" />
      {status === "loading" ? (
        <div className="flex flex-col space-y-3">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      ) : (
        <EditAccountForm />
      )}
    </BaseLayout>
  );
}

function EditAccountForm() {
  const { data: session, update } = useSession();

  const form = useForm<FormValues>({
    // @ts-expect-error TODO FIX
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: session?.user.email ?? "",
      image: session?.user.image ?? "",
      name: session?.user.name ?? "",
    },
  });
  const { mutateAsync, isLoading } = useUpdateAccount({
    onError: () => {
      toast("Something went wrong...");
    },
  });
  const hasChanges =
    JSON.stringify(form.formState.defaultValues) !==
    JSON.stringify(form.getValues());

  const onSubmit = form.handleSubmit(async (data: FormValues) => {
    try {
      await mutateAsync(data);
      await update();
      toast("Account updated successfully.", { icon: <Icon.Check /> });
      form.reset(data);
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col"}>
        {form.formState.errors.root?.message ? (
          <Alert variant="error" className="mb-8">
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        ) : null}

        <div className="mb-8 space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            disabled={!hasChanges}
            isLoading={isLoading}>
            Update
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
