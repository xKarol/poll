import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertTitle,
  Icon,
  LoadingButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

export default function AccountGeneralPage() {
  return (
    <BaseLayout>
      <SettingsHeader
        heading="General"
        description="Manage your account preferences"
      />
      <EditAccountForm />
    </BaseLayout>
  );
}

type FormValues = {
  language: string;
  clockType: string;
  timeZone: string;
};

export const updateUserSchema = z.object({
  language: z.string().nonempty(),
  clockType: z.string().nonempty(),
  timeZone: z.string().nonempty(),
});

function EditAccountForm() {
  const { update } = useSession();

  const form = useForm<FormValues>({
    // @ts-expect-error TODO FIX
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      language: "English",
      clockType: "12h",
      timeZone: "Europe/Warsaw",
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
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue="English"
                        placeholder="Select a language"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clockType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clock type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue="12 hours"
                        placeholder="Select a clock type"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="12h">12 hours</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeZone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue="Europe/Warsaw"
                        placeholder="Select your timezone"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* TODO optimize this and add scroll */}
                    {/* @ts-ignore */}
                    {Intl.supportedValuesOf("timeZone").map((timezone) => (
                      <SelectItem key={timezone} value={timezone}>
                        {timezone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
