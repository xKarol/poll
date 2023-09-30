import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@poll/types";
import { Alert, AlertTitle, Button, Input } from "@poll/ui";
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
import { BaseLayout } from "../layouts";

export const updateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
});

type FormValues = User.UpdateUserData;

export default function AccountEditPage() {
  const { data: session } = useSession();
  const form = useForm<FormValues>({
    // @ts-expect-error TODO FIX
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: session?.user.email ?? "",
      image: session?.user.image ?? "",
      name: session?.user.name ?? "",
    },
  });
  const hasChanges =
    JSON.stringify(form.formState.defaultValues) !==
    JSON.stringify(form.getValues());

  const onSubmit = form.handleSubmit(async (data: FormValues) => {
    try {
      console.log(data);

      form.reset();
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });
  return (
    <BaseLayout>
      <SettingsHeader heading="Edit" description="Edit your account" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex flex-col"}>
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

            <Button type="submit" disabled={!hasChanges}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </BaseLayout>
  );
}
