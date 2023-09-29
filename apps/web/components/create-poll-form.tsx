import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@poll/lib";
import type { Poll } from "@poll/types";
import {
  Button,
  LoadingButton,
  Input,
  Switch,
  Alert,
  AlertTitle,
} from "@poll/ui";
import { useRouter } from "next/router";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import { routes } from "../config/routes";
import { useCreatePoll } from "../hooks/use-create-poll";
import { getErrorMessage } from "../utils/error";

export type CreatePollFormProps = Omit<
  React.ComponentPropsWithoutRef<"form">,
  "children"
>;

// TODO reuse schema from global `schemas` package
export const createPollSchema = z.object({
  question: z.string().min(3),
  answers: z
    .array(
      z.object({
        text: z
          .string({ required_error: "Answer should not be empty" })
          .nonempty(),
      })
    )
    .min(2),
  isPublic: z.boolean().optional(),
  requireRecaptcha: z.boolean().optional(),
});

type FormValues = Poll.CreatePollData;

export const CreatePollForm = ({
  className,
  ...props
}: CreatePollFormProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    // @ts-expect-error TODO FIX
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: "",
      answers: Array.from({ length: 2 }, () => ({ text: "" })),
      isPublic: true,
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "answers",
  });
  const { mutateAsync, isLoading } = useCreatePoll();

  const onSubmit = form.handleSubmit(async (data: FormValues) => {
    try {
      console.log(data);
      const response = await mutateAsync(data);
      form.reset();
      await router.push(routes.poll(response.id));
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col", className)}
        {...props}>
        {form.formState.errors.root?.message ? (
          <Alert variant="error" className="mb-8">
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        ) : null}
        <div className="mb-8 flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Create Poll</h1>
          <p className="text-lg font-medium text-neutral-400">
            Craft Your questions, gather opinions and make decisions.
          </p>
        </div>

        <div className="mb-8 space-y-3">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="Your question..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-3">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={`answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Answer options</FormLabel>}
                      <FormControl>
                        <Input placeholder={`Option ${index + 1}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="w-full bg-neutral-200 hover:bg-neutral-200/50 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700/90"
            onClick={() => append({ text: "" })}>
            Add option
          </Button>
        </div>

        <div className="mb-8 space-y-2">
          <h2 className="text-normal font-medium">Settings</h2>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-sm border-2 border-neutral-100 bg-white px-4 py-3 dark:border-none dark:bg-neutral-800">
                  <div className="space-y-2">
                    <FormLabel>Public</FormLabel>
                    <FormDescription className="text-sm font-medium">
                      Make this poll public
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requireRecaptcha"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-sm border-2 border-neutral-100 bg-white px-4 py-3 dark:border-none dark:bg-neutral-800">
                  <div className="space-y-2">
                    <FormLabel>Require ReCAPTCHA</FormLabel>
                    <FormDescription className="text-sm font-medium">
                      Require ReCAPTCHA
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <LoadingButton
          className="ml-auto min-w-[100px]"
          type="submit"
          isLoading={isLoading}>
          Create
        </LoadingButton>
      </form>
    </Form>
  );
};
